// Daily SEO/GEO snapshot for the private dashboard (/dashboard) and the Monday report.
// Collects Search Console, Bing Webmaster, AI-bot visits (Redis) and a live health check of
// every sitemap URL, then stores it in Upstash Redis: `dash:snapshot` (latest) + `dash:daily`.
// Runs every morning in GitHub Actions (.github/workflows/snapshot.yml). Locally: npm run snapshot
// Needs: .gsc-key.json or GSC_KEY_JSON, BING_WEBMASTER_API_KEY, KV_REST_API_URL, KV_REST_API_TOKEN.
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { JWT } from 'google-auth-library';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const SITE = 'https://weautomationagency.com';
const day = (offset) => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);
const errors = [];

// ---------- Redis ----------
const R_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const R_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
async function redis(commands) {
  const res = await fetch(`${R_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${R_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  return (await res.json()).map((r) => r.result);
}

// ---------- CTR benchmark (BLOG-BIBLE §12: market CTR by position, we target 1.4x) ----------
function marketCtr(pos) {
  if (pos <= 1.5) return 0.28;
  if (pos <= 2.5) return 0.15;
  if (pos <= 3.5) return 0.10;
  if (pos <= 5.5) return 0.06;
  if (pos <= 10.5) return 0.025;
  return 0.01;
}

// Blog post changed in the last 28 days (git) = a title/content test still running: don't judge it yet.
function changedRecently(url) {
  const m = url.match(/^(?:\/(fr|es))?\/blog\/([^/]+)$/);
  if (!m) return false;
  const file = `content/posts/${m[1] || 'en'}/${m[2]}.mdx`;
  try {
    const last = execSync(`git log -1 --format=%cs -- "${file}"`, { encoding: 'utf8' }).trim();
    return !!last && last >= day(28);
  } catch { return false; }
}

// ---------- Search Console ----------
async function searchConsole() {
  const raw = process.env.GSC_KEY_JSON || (existsSync('.gsc-key.json') ? readFileSync('.gsc-key.json', 'utf8') : null);
  if (!raw) throw new Error('no GSC key');
  const key = JSON.parse(raw);
  const client = new JWT({ email: key.client_email, key: key.private_key, scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] });
  const site = encodeURIComponent(`${SITE}/`);
  const q = async (body) =>
    (await client.request({ url: `https://searchconsole.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, method: 'POST', data: body })).data.rows || [];

  // GSC data lags ~2 days.
  const end = day(2), start = day(29), prevEnd = day(30), prevStart = day(57);
  const total = (rows) => {
    const r = rows[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    return { clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position };
  };
  const [cur, prev, daily, pages, queries, queryPages] = await Promise.all([
    q({ startDate: start, endDate: end }),
    q({ startDate: prevStart, endDate: prevEnd }),
    q({ startDate: day(92), endDate: end, dimensions: ['date'] }),
    q({ startDate: start, endDate: end, dimensions: ['page'], rowLimit: 50 }),
    q({ startDate: start, endDate: end, dimensions: ['query'], rowLimit: 30 }),
    // For the weekly content engine: which query lands on which page (gaps, page-2 queries).
    q({ startDate: start, endDate: end, dimensions: ['query', 'page'], rowLimit: 300 }),
  ]);
  return {
    range: { start, end },
    totals: total(cur),
    previous: total(prev),
    daily: daily.map((r) => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: r.position })),
    pages: pages.map((r) => {
      const market = marketCtr(r.position);
      const url = r.keys[0].replace(SITE, '') || '/';
      return {
        url,
        clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
        marketCtr: market, targetCtr: market * 1.4,
        // Only judge pages with enough impressions to mean something.
        // Beyond page 1 nobody clicks whatever the title: the fix there is ranking, not CTR.
        status: r.position > 10.5 ? 'not-page-1'
          : r.impressions < 30 ? 'low-data'
          : r.ctr >= market * 1.4 ? 'above-target'
          : r.ctr >= market ? 'above-market'
          : changedRecently(url) ? 'testing'
          : 'below-market',
      };
    }),
    queries: queries.map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
    queryPages: queryPages.map((r) => ({ query: r.keys[0], page: r.keys[1].replace(SITE, '') || '/', clicks: r.clicks, impressions: r.impressions, position: r.position })),
  };
}

// ---------- Bing ----------
async function bing() {
  const key = process.env.BING_WEBMASTER_API_KEY;
  if (!key) throw new Error('no Bing key');
  const call = async (method, extra = '') => {
    const res = await fetch(`https://ssl.bing.com/webmaster/api.svc/json/${method}?siteUrl=${encodeURIComponent(SITE + '/')}${extra}&apikey=${key}`);
    if (!res.ok) throw new Error(`Bing ${method} ${res.status}`);
    return (await res.json()).d;
  };
  const toDate = (d) => new Date(Number(String(d).match(/\d+/)[0])).toISOString().slice(0, 10);
  const [traffic, quota] = await Promise.all([call('GetRankAndTrafficStats'), call('GetUrlSubmissionQuota')]);
  const daily = (traffic || []).map((r) => ({ date: toDate(r.Date), clicks: r.Clicks, impressions: r.Impressions }));
  const last28 = daily.filter((r) => r.date >= day(28));
  return {
    totals: { clicks: last28.reduce((s, r) => s + r.clicks, 0), impressions: last28.reduce((s, r) => s + r.impressions, 0) },
    daily,
    quota: { daily: quota?.DailyQuota, monthly: quota?.MonthlyQuota },
  };
}

// ---------- AI bots (logged by middleware.ts) ----------
// live = a real person's question right now; index = AI search index; training; search = Google/Bing.
const GROUP = (bot) =>
  /live, user/.test(bot) ? 'live' : /\(index\)/.test(bot) ? 'index' : /training|Common Crawl|ByteDance/.test(bot) ? 'training' : /^(Google|Bing)/.test(bot) ? 'search' : 'other';
async function aiBots() {
  const days = Array.from({ length: 30 }, (_, i) => day(i));
  const results = await redis(days.map((d) => ['HGETALL', `ai-bots:${d}`]));
  const byBot = {}, byPage = {}, daily = [];
  results.forEach((flat, i) => {
    let total = 0;
    for (let j = 0; flat && j < flat.length; j += 2) {
      const [bot, path] = flat[j].split('|');
      const n = Number(flat[j + 1]);
      total += n;
      byBot[bot] = (byBot[bot] || 0) + n;
      if (!/Google|Bing/.test(bot)) byPage[path] = (byPage[path] || 0) + n;
    }
    daily.push({ date: days[i], visits: total });
  });
  return {
    byBot: Object.entries(byBot).sort((a, b) => b[1] - a[1]).map(([bot, visits]) => ({ bot, visits, group: GROUP(bot) })),
    topPages: Object.entries(byPage).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([path, visits]) => ({ path, visits })),
    daily: daily.reverse(),
  };
}

// ---------- Health: every sitemap URL must answer 200 ----------
async function health() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const broken = [];
  for (const u of urls) {
    // Googlebot UA: skips the homepage language redirect, like Google sees it.
    const res = await fetch(u, { redirect: 'manual', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; WAA-snapshot)' } });
    if (res.status !== 200) broken.push({ url: u.replace(SITE, '') || '/', status: res.status });
  }
  return { pages: urls.length, broken };
}

const safe = async (name, fn) => {
  try { return await fn(); } catch (e) { errors.push(`${name}: ${e.message}`); return null; }
};

const snapshot = {
  generatedAt: new Date().toISOString(),
  gsc: await safe('gsc', searchConsole),
  bing: await safe('bing', bing),
  aiBots: await safe('aiBots', aiBots),
  health: await safe('health', health),
};
snapshot.errors = errors;

const today = day(0);
const summary = {
  gscClicks: snapshot.gsc?.totals.clicks ?? null,
  gscImpressions: snapshot.gsc?.totals.impressions ?? null,
  gscPosition: snapshot.gsc?.totals.position ?? null,
  bingImpressions: snapshot.bing?.totals.impressions ?? null,
  aiVisits30d: snapshot.aiBots?.byBot.reduce((s, b) => s + b.visits, 0) ?? null,
  broken: snapshot.health?.broken.length ?? null,
};
await redis([
  ['SET', 'dash:snapshot', JSON.stringify(snapshot)],
  ['HSET', 'dash:daily', today, JSON.stringify(summary)],
]);

console.log(`Snapshot ${today}:`, JSON.stringify(summary));
if (errors.length) {
  console.error('Errors:', errors.join(' | '));
  process.exitCode = 1;
}
