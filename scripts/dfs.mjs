// DataForSEO helper for the content planner. Credentials: DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD (.env.local),
// or none in the cloud routine (network secret injects the header for api.dataforseo.com).
// Markets: us, uk, fr, es (+ ma later). Every call costs a little: keep limits small.
//
//   npm run dfs -- balance
//   npm run dfs -- volume fr "agence automatisation ia" "n8n c'est quoi"     search volume + CPC + competition
//   npm run dfs -- ideas us "whatsapp chatbot" [50]                          related keywords with volume + difficulty
//   npm run dfs -- gap fr nocodefactory.fr [100]                            keywords a competitor ranks for (top 20) and we don't
//   npm run dfs -- ranked us [100]                                          keywords we rank for
//   npm run dfs -- serp fr "agence automatisation ia"                       top 10 + whether an AI Overview shows
//   npm run dfs -- ai-answer us "best ai automation agency"                 ChatGPT's real answer: cited sources, brands, fan-out queries, are we cited?
//   npm run dfs -- ai-volume us "ai lead generation" "chatgpt watermark"   AI search volume (how often people ask AI chats)
//   npm run dfs -- ai-mentions us [domain]                                  questions where ChatGPT / AI Overviews cite a domain (default: ours)
//   npm run dfs -- ai-check                                                 ai-answer for every active keyword target → content/agent/memory/ai-visibility.json
// Add --json for raw-ish JSON output.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
// No credentials in env (cloud routine): the environment's network secret adds the Authorization header.
const AUTH = process.env.DATAFORSEO_LOGIN
  ? 'Basic ' + Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64')
  : null;
const OUR_DOMAIN = 'weautomationagency.com';
const MARKETS = {
  us: { location_code: 2840, language_code: 'en' },
  uk: { location_code: 2826, language_code: 'en' },
  fr: { location_code: 2250, language_code: 'fr' },
  es: { location_code: 2724, language_code: 'es' },
  ma: { location_code: 2504, language_code: 'fr' },
  mx: { location_code: 2484, language_code: 'es' },
};

async function api(path, body) {
  const res = await fetch(`https://api.dataforseo.com/v3/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { ...(AUTH ? { Authorization: AUTH } : {}), 'Content-Type': 'application/json' },
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
} else if (cmd === 'ai-answer' || cmd === 'ai-check') {
  // ChatGPT answer via DataForSEO LLM Scraper (~$0.004 per question).
  const ask = async (m, keyword) => {
    const { result, cost } = await api('ai_optimization/chat_gpt/llm_scraper/live/advanced', { ...MARKETS[m], keyword, force_web_search: true });
    const r = result?.[0] || {};
    const sources = (r.sources || []).map((x) => x.domain);
    const brands = (r.brand_entities || []).map((b) => b.title);
    const all = [...sources, ...(r.search_results || []).map((x) => x.domain)];
    return {
      keyword, market: m, cost,
      cited: sources.some((d) => d?.includes(OUR_DOMAIN)),
      retrieved: all.some((d) => d?.includes(OUR_DOMAIN)),
      sources: [...new Set(sources)].slice(0, 10),
      brands: brands.slice(0, 10),
      fanOut: r.fan_out_queries || [],
      answer: r.markdown || '',
    };
  };
  if (cmd === 'ai-answer') {
    need();
    const a = await ask(marketKey, rest[0]);
    if (asJson) console.log(JSON.stringify(a, null, 2));
    else {
      console.log(`cited: ${a.cited ? 'YES' : 'no'} · retrieved (seen, not cited): ${a.retrieved ? 'YES' : 'no'}`);
      console.log(`sources: ${a.sources.join(', ') || '-'}\nbrands: ${a.brands.join(', ') || '-'}\nfan-out: ${a.fanOut.join(' | ') || '-'}\n\n${a.answer.slice(0, 1500)}`);
    }
    console.error(`cost $${a.cost}`);
  } else {
    const targets = JSON.parse(readFileSync('content/agent/memory/keyword-targets.json', 'utf8')).filter((t) => t.status === 'active');
    const file = 'content/agent/memory/ai-visibility.json';
    const history = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : [];
    const date = new Date().toISOString().slice(0, 10);
    let cost = 0;
    const rows = [];
    for (const t of targets) {
      try {
        const a = await ask(t.market, t.keyword);
        cost += a.cost || 0;
        rows.push({ id: t.id, keyword: t.keyword, market: t.market, cited: a.cited, retrieved: a.retrieved, sources: a.sources, brands: a.brands, fanOut: a.fanOut });
      } catch (e) { console.error(`${t.id}: ${e.message}`); }
    }
    writeFileSync(file, JSON.stringify([{ date, rows }, ...history.filter((h) => h.date !== date)].slice(0, 26), null, 2) + '\n');
    out(rows.map((r) => ({ keyword: r.keyword, market: r.market, cited: r.cited, retrieved: r.retrieved, top: r.sources.slice(0, 3).join(', ') })), cost);
  }
} else if (cmd === 'ai-volume') {
  need();
  const { result, cost } = await api('ai_optimization/ai_keyword_data/keywords_search_volume/live', { ...market, keywords: rest });
  out((result?.[0]?.items || []).map((i) => ({ keyword: i.keyword, aiVolume: i.ai_search_volume })), cost);
} else if (cmd === 'ai-mentions') {
  // ChatGPT data is US/English only; Google AI Overviews follow the market.
  need();
  const domain = rest[0] || OUR_DOMAIN;
  const { result, cost } = await api('ai_optimization/llm_mentions/search_mentions/live', {
    location_code: market.location_code, language_code: market.language_code,
    target: [{ domain, search_scope: ['sources'] }], limit: 20, order_by: ['ai_search_volume,desc'],
  });
  const items = result?.[0]?.items || [];
  console.log(`total questions citing ${domain}: ${result?.[0]?.total_count ?? 0}`);
  out(items.map((i) => ({ platform: i.platform, question: i.question?.slice(0, 80), aiVolume: i.ai_search_volume })), cost);
} else {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(0, 16).join('\n'));
}
