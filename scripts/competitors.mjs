// Competitor intelligence (DataForSEO). Writes content/agent/memory/competitors.json and link-ideas.json.
//
//   npm run competitors -- refresh [us,uk,fr,es,mx]   who ranks on our service keywords + our targets, per market,
//                                                     classified agency / directory / platform / tool / media,
//                                                     top 20 agencies per market with strength (≈ $0.05/market + $0.05)
//   npm run competitors -- links [market] [n]         sites linking to ≥2 of that market's top agencies but not to us
//                                                     = link ideas (≈ $0.03 per call), saved to link-ideas.json
//   npm run competitors -- show                       print the saved lists
// Monthly (RUNBOOK step 0: when competitors.json is older than 28 days). Rules: content/agent/1-keywords.md.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

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
const FILE = 'content/agent/memory/competitors.json';
const IDEAS = 'content/agent/memory/link-ideas.json';
const TARGETS = 'content/agent/memory/keyword-targets.json';

const MARKETS = {
  us: [2840, 'en'], uk: [2826, 'en'], fr: [2250, 'fr'], es: [2724, 'es'], mx: [2484, 'es'],
};
// Our service keywords per language (+ every keyword target of that market is added).
const SEEDS = {
  en: ['ai automation services', 'ai automation company', 'ai automation agency', 'ai chatbot development company', 'whatsapp chatbot for business', 'ai voice agent for business', 'ai lead generation', 'automated lead generation', 'email automation agency', 'make.com agency', 'n8n agency', 'n8n expert', 'ai chatbot for business', 'generative engine optimization agency', 'ai search visibility'],
  fr: ['agence automatisation', 'agence automatisation ia', 'agence ia', 'chatbot whatsapp', 'agent vocal ia', 'lead generation', 'prospection automatisée', 'agence make', 'agence n8n', 'expert n8n', 'automatisation ia', 'agence geo', 'seo geo', 'chatbot ia entreprise'],
  es: ['agencia de automatización', 'agencia ia', 'chatbot whatsapp', 'agente de voz ia', 'captación de leads', 'automatización con ia', 'agencia n8n', 'seo geo', 'chatbot para empresas', 'bot whatsapp'],
};
// Classification: anything not matched below is treated as an agency candidate (checked by homepage title).
const PLATFORM = /(^|\.)(youtube|linkedin|reddit|facebook|instagram|tiktok|x|twitter|quora|medium|wikipedia|pinterest|github)\.(com|org)$/;
const DIRECTORY = /(clutch\.co|designrush|sortlist|codeur\.com|goodfirms|f6s\.com|upwork|fiverr|malt\.|lespepitestech|cloudlist|digitalagencynetwork|lafabriquedunet|techbehemoths|themanifest|agencyspotter|trustpilot|g2\.com|capterra|producthunt|crunchbase|bark\.com|freelancer\.)/;
const TOOL = /(seranking|sendpulse|cloudtalk|lindy\.ai|nice\.com|chatbot\.com|abbyy|blip\.ai|builderbot|amplemarket|wisepops|zoominfo|bewe\.ai|rumidocs|getgpt|searchable\.com|indexly|search-visibility\.ai|lime-technologies|appvizer|hubspot|salesforce|zapier|make\.com|n8n\.io|botpress|tidio|crisp\.chat|monday\.com|clay\.com|gumloop|latenode|ibm\.com|microsoft|google\.com|jotform|brevo|chatfuel|trengo|clientify|kommo|smartlead|saleshandy|artisan\.co|cm\.com|clickup|textcortex|eesel|b2chat|ringover|manychat|intercom|zendesk|lemlist|apollo\.io|instantly|voiceflow|vapi|retell|twilio|meta\.com|whatsapp\.com|openai|anthropic|activecampaign|mailchimp|sendinblue|notion|airtable|udemy|coursera|semrush|ahrefs|moz\.com|chatbotwhatsapp|wati\.io|respond\.io|landbot|aunoa|gurusup|008agent)/;
const MEDIA = /(impli\.fr|escuela|academy|aprendamos|gouv\.fr|\.gov|blog\.|news|journal|lemagit|seo\.fr|searchengineland|searchenginejournal|forbes|techcrunch|hbr\.org|entrepreneur|lesechos|journaldunet|frenchweb|maddyness)/;

const args = process.argv.slice(2);
const cmd = args[0] || 'show';
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
const load = (f, d) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : d);

async function homepageTitle(domain) {
  try {
    const ctrl = AbortSignal.timeout(8000);
    const html = await (await fetch(`https://${domain}`, { signal: ctrl, headers: { 'User-Agent': 'Mozilla/5.0 (WAA competitor check)' } })).text();
    return (html.match(/<title[^>]*>([^<]{0,140})/i) || [])[1]?.trim() || null;
  } catch { return null; }
}
// Homepage title decides: software/listicle titles are not agencies; an agency says what it is.
const SOFTWARE_TITLE = /software|platform|plateforme|plataforma|\bapp\b|copilot|builder|\btool|outil|herramienta|crm\b|saas|track your|analytics|sin programar|no-code ai tools|writing platform|ai employee/i;
const LIST_TITLE = /\btop \d+|\bbest .*agenc|reviews|compare|comparatif|ranking of|meilleures agences|mejores agencias/i;
const AGENCY_TITLE = /agen(cy|ce|cia)|consult|cabinet|studio|experts?\b|expertos|freelance|development company|desarrollo|développement|services|solutions|partner|automation|automatisation|automatización/i;

function classify(domain) {
  if (domain === OUR || domain.endsWith(`.${OUR}`)) return 'us';
  if (PLATFORM.test(domain)) return 'platform';
  if (DIRECTORY.test(domain)) return 'directory';
  if (TOOL.test(domain)) return 'tool';
  if (MEDIA.test(domain)) return 'media';
  return 'agency';
}

if (cmd === 'refresh') {
  const markets = (args[1] || 'us,uk,fr,es,mx').split(',').filter((m) => MARKETS[m]);
  const targets = load(TARGETS, []);
  const out = load(FILE, { markets: {} });
  for (const m of markets) {
    const [location_code, language_code] = MARKETS[m];
    const keywords = [...new Set([...SEEDS[language_code], ...targets.filter((t) => t.market === m).map((t) => t.keyword)])];
    const r = await api('dataforseo_labs/google/serp_competitors/live', { location_code, language_code, keywords, limit: 80, item_types: ['organic'] });
    const rows = (r?.items || []).map((i) => ({
      domain: i.domain.replace(/^www\./, ''), type: classify(i.domain.replace(/^www\./, '')),
      keywords: i.keywords_count, avgPosition: Math.round(i.avg_position), visibility: Math.round((i.visibility || 0) * 100) / 100,
    })).filter((x) => x.type !== 'us');
    // Rank: how often + how high they appear.
    rows.forEach((x) => (x.presence = Math.round((x.keywords * 10 + x.visibility * 10 - x.avgPosition / 5) * 10) / 10));
    rows.sort((a, b) => b.presence - a.presence);
    // Check agency candidates' homepages (cheap, no API cost) and keep top 20 real agencies.
    const agencies = [];
    for (const x of rows.filter((x) => x.type === 'agency')) {
      if (agencies.length >= 20) break;
      x.title = await homepageTitle(x.domain);
      if (x.title && SOFTWARE_TITLE.test(x.title)) { x.type = 'tool'; continue; }
      if (x.title && LIST_TITLE.test(x.title)) { x.type = 'directory'; continue; }
      if (x.title && !AGENCY_TITLE.test(x.title)) { x.type = 'other'; continue; }
      agencies.push(x);
    }
    // Strength of the top agencies.
    if (agencies.length) {
      const [ranks, rds] = await Promise.all([
        api('backlinks/bulk_ranks/live', { targets: agencies.map((a) => a.domain), rank_scale: 'one_hundred' }),
        api('backlinks/bulk_referring_domains/live', { targets: agencies.map((a) => a.domain) }),
      ]);
      const rank = new Map((ranks?.items || []).map((i) => [i.target, i.rank]));
      const rd = new Map((rds?.items || []).map((i) => [i.target, i.referring_main_domains]));
      agencies.forEach((a) => { a.strength = rank.get(a.domain) ?? null; a.referringDomains = rd.get(a.domain) ?? null; });
    }
    out.markets[m] = {
      updated: new Date().toISOString().slice(0, 10),
      keywordsUsed: keywords.length,
      agencies,
      directories: rows.filter((x) => x.type === 'directory').slice(0, 10),
      platforms: rows.filter((x) => x.type === 'platform').slice(0, 6),
      tools: rows.filter((x) => x.type === 'tool').slice(0, 10).map((x) => x.domain),
      media: rows.filter((x) => x.type === 'media').slice(0, 8).map((x) => x.domain),
    };
    console.log(`${m}: ${agencies.length} agencies, ${out.markets[m].directories.length} directories, ${out.markets[m].platforms.length} platforms`);
  }
  out.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(FILE, JSON.stringify(out, null, 2) + '\n');
  console.log(`saved ${FILE} · cost $${spent.toFixed(3)}`);
} else if (cmd === 'links') {
  const m = args[1] || 'fr';
  const n = Number(args[2] || 100);
  const comp = load(FILE, { markets: {} }).markets[m];
  if (!comp?.agencies?.length) { console.error(`No agencies for ${m}: run refresh first`); process.exit(1); }
  const top = comp.agencies.slice(0, 10).map((a) => a.domain);
  const targets = Object.fromEntries(top.map((d, i) => [String(i + 1), d]));
  const r = await api('backlinks/domain_intersection/live', { targets, exclude_targets: [OUR], intersection_mode: 'partial', limit: n, rank_scale: 'one_hundred' });
  const ideas = (r?.items || []).map((it) => {
    const hits = Object.entries(it.domain_intersection);
    const first = hits[0][1];
    return {
      domain: first.target,
      linksTo: hits.map(([k]) => targets[k]),
      count: it.summary?.intersections_count ?? hits.length,
      rank: Math.max(...hits.map(([, v]) => v.rank || 0)),
      spamScore: Math.max(...hits.map(([, v]) => v.backlinks_spam_score || 0)),
      nofollowShare: (() => {
        const tot = hits.reduce((s, [, v]) => s + (v.referring_pages || 0), 0);
        const nf = hits.reduce((s, [, v]) => s + (v.referring_pages_nofollow || 0), 0);
        return tot ? Math.round((nf / tot) * 100) / 100 : null;
      })(),
    };
  })
    .filter((x) => x.count >= 2 && x.spamScore < 30 && classify(x.domain) !== 'platform')
    .sort((a, b) => b.count - a.count || b.rank - a.rank);
  const all = load(IDEAS, {});
  all[m] = { updated: new Date().toISOString().slice(0, 10), from: top, ideas };
  writeFileSync(IDEAS, JSON.stringify(all, null, 2) + '\n');
  console.table(ideas.slice(0, 30).map((x) => ({ domain: x.domain, competitors: x.count, rank: x.rank, spam: x.spamScore, nofollow: x.nofollowShare })));
  console.log(`saved ${IDEAS} (${ideas.length} ideas for ${m}) · cost $${spent.toFixed(3)} · every idea still goes through the link gate`);
} else {
  const c = load(FILE, { markets: {} });
  for (const [m, d] of Object.entries(c.markets)) {
    console.log(`\n== ${m.toUpperCase()} (updated ${d.updated})`);
    console.table(d.agencies.map((a) => ({ domain: a.domain, keywords: a.keywords, avgPos: a.avgPosition, strength: a.strength, refDomains: a.referringDomains, title: (a.title || '').slice(0, 50) })));
    console.log('directories:', d.directories.map((x) => x.domain).join(', '));
    console.log('platforms:', d.platforms.map((x) => x.domain).join(', '));
  }
}
