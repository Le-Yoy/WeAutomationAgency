// DataForSEO helper for the content planner. Credentials: DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD (.env.local).
// Markets: us, uk, fr, es (+ ma later). Every call costs a little: keep limits small.
//
//   npm run dfs -- balance
//   npm run dfs -- volume fr "agence automatisation ia" "n8n c'est quoi"     search volume + CPC + competition
//   npm run dfs -- ideas us "whatsapp chatbot" [50]                          related keywords with volume + difficulty
//   npm run dfs -- gap fr nocodefactory.fr [100]                            keywords a competitor ranks for (top 20) and we don't
//   npm run dfs -- ranked us [100]                                          keywords we rank for
//   npm run dfs -- serp fr "agence automatisation ia"                       top 10 + whether an AI Overview shows
// Add --json for raw-ish JSON output.
import { readFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const AUTH = 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');
const OUR_DOMAIN = 'weautomationagency.com';
const MARKETS = {
  us: { location_code: 2840, language_code: 'en' },
  uk: { location_code: 2826, language_code: 'en' },
  fr: { location_code: 2250, language_code: 'fr' },
  es: { location_code: 2724, language_code: 'es' },
  ma: { location_code: 2504, language_code: 'fr' },
};

async function api(path, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify([body]) : undefined,
  });
  const data = await res.json();
  const task = data.tasks?.[0];
  if (!task || task.status_code >= 40000) throw new Error(`${path}: ${task?.status_message || data.status_message}`);
  return { result: task.result, cost: task.cost };
}

const argv = process.argv.slice(2).filter((a) => a !== '--json');
const asJson = process.argv.includes('--json');
const [cmd, marketKey, ...rest] = argv;
const market = MARKETS[marketKey];
const out = (rows, cost) => {
  if (asJson) console.log(JSON.stringify(rows, null, 2));
  else console.table(rows);
  if (cost !== undefined) console.error(`cost $${cost}`);
};
const need = () => { if (!market) { console.error(`market must be one of ${Object.keys(MARKETS).join(', ')}`); process.exit(1); } };

if (cmd === 'balance') {
  const { result } = await api('appendix/user_data');
  console.log(`balance $${result[0].money.balance}`);
} else if (cmd === 'volume') {
  need();
  const { result, cost } = await api('keywords_data/google_ads/search_volume/live', { ...market, keywords: rest });
  out((result || []).map((r) => ({ keyword: r.keyword, volume: r.search_volume, cpc: r.cpc, competition: r.competition })), cost);
} else if (cmd === 'ideas') {
  need();
  const [seed, limit = 50] = rest;
  const { result, cost } = await api('dataforseo_labs/google/related_keywords/live', { ...market, keyword: seed, limit: Number(limit), depth: 2 });
  const items = result?.[0]?.items || [];
  out(items.map((i) => ({
    keyword: i.keyword_data.keyword,
    volume: i.keyword_data.keyword_info?.search_volume,
    difficulty: i.keyword_data.keyword_properties?.keyword_difficulty,
    intent: i.keyword_data.search_intent_info?.main_intent,
  })).sort((a, b) => (b.volume || 0) - (a.volume || 0)), cost);
} else if (cmd === 'ranked' || cmd === 'gap') {
  need();
  const domain = cmd === 'gap' ? rest[0] : OUR_DOMAIN;
  const limit = Number(cmd === 'gap' ? rest[1] || 100 : rest[0] || 100);
  const ranked = async (target, filters) =>
    (await api('dataforseo_labs/google/ranked_keywords/live', { ...market, target, limit, order_by: ['keyword_data.keyword_info.search_volume,desc'], ...(filters ? { filters } : {}) }));
  const theirs = await ranked(domain, cmd === 'gap' ? [['ranked_serp_element.serp_item.rank_absolute', '<=', 20]] : null);
  const rows = (theirs.result?.[0]?.items || []).map((i) => ({
    keyword: i.keyword_data.keyword,
    volume: i.keyword_data.keyword_info?.search_volume,
    difficulty: i.keyword_data.keyword_properties?.keyword_difficulty,
    intent: i.keyword_data.search_intent_info?.main_intent,
    position: i.ranked_serp_element?.serp_item?.rank_absolute,
    url: i.ranked_serp_element?.serp_item?.relative_url,
  }));
  let cost = theirs.cost;
  if (cmd === 'gap') {
    const ours = await ranked(OUR_DOMAIN, null);
    cost += ours.cost;
    const have = new Set((ours.result?.[0]?.items || []).map((i) => i.keyword_data.keyword));
    out(rows.filter((r) => !have.has(r.keyword)), cost);
  } else out(rows, cost);
} else if (cmd === 'serp') {
  need();
  const { result, cost } = await api('serp/google/organic/live/advanced', { ...market, keyword: rest[0], depth: 10 });
  const items = result?.[0]?.items || [];
  const aiOverview = items.some((i) => i.type === 'ai_overview');
  console.log(`AI Overview: ${aiOverview ? 'YES' : 'no'} · features: ${[...new Set(items.map((i) => i.type))].join(', ')}`);
  out(items.filter((i) => i.type === 'organic').map((i) => ({ pos: i.rank_group, domain: i.domain, title: i.title?.slice(0, 70) })), cost);
} else {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(0, 12).join('\n'));
}
