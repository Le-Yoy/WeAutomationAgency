// Winnability score: for one topic, which keyword to attack in each country, and can we win it now?
//
//   npm run score -- "ai automation agency" us,uk,fr,es
//   npm run score -- "geo seo" fr --also "seo geo,référencement ia,generative engine optimization"
//   npm run score -- "chatbot whatsapp" es,mx --serp 5 --json
//
// For each market: candidate keywords (topic + --also + DataForSEO related keywords, English terms
// included because people often search them as is) → volume, KD, CPC, intent → the best candidates get a
// look at Google's top 10 (domain/page strength, forums, old pages, AI Overview) → our own GSC position.
//
// score (0–100) = 100 × value × winnability
//   value       = volume (log, 10k/mo = max) × intent (commercial 1 / informational .6 / navigational .3)
//                 × CPC (buyers) × service fit (leads to one of our services) × .8 if an AI Overview shows
//   winnability = how far the KD is above what our authority can take (threshold grows with our rank),
//                 + weak results in the top 10 (forums/UGC, pages with 0 linking domains, weak domains,
//                 old years in titles) + we already rank in GSC (pos ≤30 / ≤60), − a wall of very strong domains
// Verdict: ATTACK NOW (winnable today) / INVEST (worth it, takes links or time) / LATER.
// Cost ≈ $0.05 + $0.03 per market. Credentials: .env.local or the cloud routine's network secret.
import { readFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const AUTH = process.env.DATAFORSEO_LOGIN
  ? 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64')
  : null;
const OUR = 'weautomationagency.com';
const MARKETS = {
  us: [2840, 'en'], uk: [2826, 'en'], ca: [2124, 'en'], au: [2036, 'en'],
  fr: [2250, 'fr'], be: [2056, 'fr'], ch: [2756, 'fr'], ma: [2504, 'fr'],
  es: [2724, 'es'], mx: [2484, 'es'], ar: [2032, 'es'], co: [2170, 'es'],
};
const SERVICE = /chatbot|whatsapp|bot|voice|vocal|voz|call|appel|llamad|lead|prospect|captaci|cold email|email|e-mail|correo|automat|n8n|make|zapier|geo|aeo|seo|chatgpt|ai search|visibil|agency|agence|agencia/i;
const UGC = /(^|\.)(reddit\.com|quora\.com|medium\.com|linkedin\.com|youtube\.com|facebook\.com|stackexchange\.com|community\.|forum\.|discourse\.)/i;

const args = process.argv.slice(2);
const opt = (name, def) => (args.includes(`--${name}`) ? args[args.indexOf(`--${name}`) + 1] : def);
const positional = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
const topic = positional[0];
const markets = (positional[1] || 'us,fr,es').split(',').map((s) => s.trim()).filter((m) => MARKETS[m]);
const also = (opt('also', '') || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
const serpN = Number(opt('serp', 4));
const asJson = args.includes('--json');
if (!topic) { console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(0, 19).join('\n')); process.exit(0); }

let spent = 0;
async function api(path, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${path}`, {
    method: 'POST',
    headers: { ...(AUTH ? { Authorization: AUTH } : {}), 'Content-Type': 'application/json' },
    body: JSON.stringify([body]),
  });
  const task = (await res.json()).tasks?.[0];
  if (!task || task.status_code >= 40000) throw new Error(`${path}: ${task?.status_message || res.status}`);
  spent += task.cost || 0;
  return task.result?.[0];
}

// Our GSC positions (daily snapshot in Redis); optional.
async function gscPositions() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url) return new Map();
  try {
    const res = await fetch(`${url}/get/dash:snapshot`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    const snap = JSON.parse((await res.json()).result || 'null');
    const best = new Map();
    for (const r of snap?.gsc?.queryPages || []) {
      const k = r.query.toLowerCase();
      if (!best.has(k) || best.get(k).position > r.position) best.set(k, { position: r.position, page: r.page, impressions: r.impressions });
    }
    return best;
  } catch { return new Map(); }
}

const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const INTENT = { commercial: 1, transactional: 1, informational: 0.6, navigational: 0.3 };

const gsc = await gscPositions();
const ourRank = (await api('backlinks/bulk_ranks/live', { targets: [OUR], rank_scale: 'one_hundred' }))?.items?.[0]?.rank ?? 0;
const threshold = 12 + ourRank * 0.6; // KD our authority can take today

const output = { topic, ourRank, kdThreshold: Math.round(threshold), markets: {} };

for (const m of markets) {
  const [location_code, language_code] = MARKETS[m];
  // 1. Candidates: topic, --also terms, related keywords.
  const related = await api('dataforseo_labs/google/related_keywords/live', { location_code, language_code, keyword: topic, depth: 1, limit: 25 });
  const cands = [...new Set([topic.toLowerCase(), ...also, ...(related?.items || []).map((i) => i.keyword_data.keyword.toLowerCase())])];
  // 2. Volume, CPC, KD, intent for all.
  const ov = await api('dataforseo_labs/google/keyword_overview/live', { location_code, language_code, keywords: cands, include_serp_info: true });
  let rows = (ov?.items || []).map((i) => {
    const vol = i.keyword_info?.search_volume || 0;
    const cpc = i.keyword_info?.cpc || 0;
    const kd = i.keyword_properties?.keyword_difficulty ?? null;
    const intent = i.search_intent_info?.main_intent || 'informational';
    const aio = (i.serp_info?.serp_item_types || []).includes('ai_overview');
    const V = clamp(Math.log10(vol + 1) / Math.log10(10001), 0, 1);
    const C = clamp(0.5 + Math.log10(1 + cpc) / 2.6, 0.5, 1);
    const F = SERVICE.test(i.keyword) ? 1 : 0.6;
    const value = V * (INTENT[intent] ?? 0.6) * C * F * (aio ? 0.8 : 1);
    const g = gsc.get(i.keyword.toLowerCase());
    let W = kd === null ? 0.5 : clamp(1 - (kd - threshold) / 35, 0.05, 1);
    if (g) W += g.position <= 30 ? 0.2 : g.position <= 60 ? 0.1 : 0;
    return { keyword: i.keyword, volume: vol, kd, cpc: Math.round(cpc * 100) / 100, intent, aio, value, W, gsc: g ? Math.round(g.position) : null, weak: null, wall: null };
  }).filter((r) => r.volume > 0 || r.gsc);
  rows.forEach((r) => (r.score = Math.round(100 * r.value * clamp(r.W, 0, 1))));
  rows.sort((a, b) => b.score - a.score);

  // 3. Top 10 check for the best candidates.
  for (const r of rows.slice(0, serpN)) {
    const serp = await api('serp/google/organic/live/advanced', { location_code, language_code, keyword: r.keyword, depth: 10 });
    const items = serp?.items || [];
    r.aio = items.some((i) => i.type === 'ai_overview');
    const organic = items.filter((i) => i.type === 'organic').slice(0, 10);
    const targets = [...new Set(organic.flatMap((o) => [o.domain, o.url]))];
    const [ranks, rds] = await Promise.all([
      api('backlinks/bulk_ranks/live', { targets, rank_scale: 'one_hundred' }),
      api('backlinks/bulk_referring_domains/live', { targets: organic.map((o) => o.url) }),
    ]);
    const rank = new Map((ranks?.items || []).map((x) => [x.target, x.rank]));
    const rd = new Map((rds?.items || []).map((x) => [x.target, x.referring_domains]));
    r.top10 = organic.map((o) => ({
      pos: o.rank_group, domain: o.domain, domainRank: rank.get(o.domain) ?? null, pageRank: rank.get(o.url) ?? null,
      pageLinkingDomains: rd.get(o.url) ?? null, title: o.title,
    }));
    const weak = r.top10.filter((t) => UGC.test(t.domain) || t.pageLinkingDomains === 0 || (t.domainRank ?? 99) < ourRank + 15 || /\b20(1\d|2[0-4])\b/.test(t.title || ''));
    const domainRanks = r.top10.map((t) => t.domainRank ?? 0).sort((a, b) => a - b);
    const median = domainRanks[Math.floor(domainRanks.length / 2)] ?? 0;
    r.weak = weak.length;
    r.wall = median;
    r.weakExamples = weak.slice(0, 3).map((t) => `#${t.pos} ${t.domain}`);
    r.W += Math.min(0.25, 0.04 * weak.length) - (median > 60 ? 0.15 : 0);
    r.value = r.value / (r.aio ? 1 : 1); // AIO already counted from the overview flag
    r.score = Math.round(100 * r.value * clamp(r.W, 0, 1));
  }
  rows.sort((a, b) => b.score - a.score);
  rows.forEach((r) => {
    r.verdict = r.score >= 40 && (r.kd ?? 99) <= threshold + 8 ? 'ATTACK NOW' : r.score >= 25 ? 'INVEST' : 'LATER';
    delete r.value; r.W = Math.round(r.W * 100) / 100;
  });
  output.markets[m] = rows.slice(0, 15);
}
output.cost = Math.round(spent * 1000) / 1000;

if (asJson) {
  console.log(JSON.stringify(output, null, 2));
} else {
  console.log(`\nTopic "${topic}" · our DataForSEO rank ${ourRank}/100 → KD we can take today ≈ ${Math.round(threshold)}\n`);
  for (const [m, rows] of Object.entries(output.markets)) {
    console.log(`== ${m.toUpperCase()}`);
    console.table(rows.map((r) => ({
      keyword: r.keyword, vol: r.volume, KD: r.kd, CPC: r.cpc, intent: r.intent.slice(0, 5), AIO: r.aio ? 'yes' : '',
      us: r.gsc ?? '', weak: r.weak ?? '', wall: r.wall ?? '', score: r.score, verdict: r.verdict,
    })));
    const best = rows.find((r) => r.verdict === 'ATTACK NOW') || rows[0];
    if (best) console.log(`→ best for ${m.toUpperCase()}: "${best.keyword}" (${best.verdict})${best.weakExamples?.length ? ` · weak spots: ${best.weakExamples.join(', ')}` : ''}\n`);
  }
  console.log('Columns: us = our GSC position · weak = weak results in the top 10 · wall = median domain strength of the top 10 (0–100)');
  console.log(`cost $${output.cost}`);
}
