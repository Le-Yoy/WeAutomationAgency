// Internal-linking planner. Scores how related every pair of blog posts is, audits the current
// link graph and suggests balanced links. Used by the weekly content routine (and by hand).
//
//   npm run links:internal                     report + suggestions for all posts
//   npm run links:internal -- --new <slug>     focus: links a NEW post must get / give
//   npm run links:internal -- --json           machine-readable output
//
// Rules (keep in sync with content/agent/4-links.md):
//  - relevance(A,B) = 0.55 * TF-IDF cosine of the EN text + 0.30 * keyword overlap + 0.15 * same category
//  - only link when relevance >= MIN_SCORE (no off-topic links just to "balance")
//  - every post: 3–6 links out to other posts, >= 3 links in, and >= 1 link to its service page
//  - a new post gets links FROM its 3 most related posts (those get refreshed anyway) and links TO 3
//  - balance: sources with many links out and targets that already have many links in rank lower
//  - slugs are shared across en/fr/es, so one plan applies to all three (with the /fr, /es prefix)
import { readFileSync, readdirSync } from 'node:fs';
import matter from 'gray-matter';

const MIN_SCORE = 0.15;
const OUT_MIN = 3, OUT_MAX = 6, IN_MIN = 3;
const LOCALES = ['en', 'fr', 'es'];
const SERVICES = [
  ['/services/ai-chatbot', /chatbot|whatsapp|manychat|conversational/i],
  ['/services/ai-search-visibility', /geo|aeo|ai search|ai visibility|ai overview|chatgpt seo|llm|rankings|watermark|fact-check/i],
  ['/services/lead-generation', /lead gen|prospect|outbound|sales navigator|cold email/i],
  ['/services/email-automation', /email automation|newsletter|follow-up|sequence/i],
  ['/services/call-center', /voice agent|call center|phone|calls/i],
];

const args = process.argv.slice(2);
const newSlug = args.includes('--new') ? args[args.indexOf('--new') + 1] : null;
const asJson = args.includes('--json');

const STOP = new Set('the a an and or of to in on for with is are be it this that you your we our as at by from can how what why when which will not do does more than into about their they them its was were has have had but if so all also just like get use using one two any most such each other only over very new may'.split(' '));
const tokens = (s) => s.toLowerCase().replace(/[`*_>#|\[\]()]/g, ' ').match(/[a-z0-9][a-z0-9-]{2,}/g)?.filter((t) => !STOP.has(t)) || [];

function load(locale) {
  const dir = `content/posts/${locale}`;
  return readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => {
    const { data, content } = matter(readFileSync(`${dir}/${f}`, 'utf8'));
    const slug = f.replace(/\.mdx$/, '');
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const outPosts = new Set([...content.matchAll(new RegExp(`\\]\\(${prefix}/blog/([a-z0-9-]+)`, 'g'))].map((m) => m[1]).filter((s) => s !== slug));
    const outServices = new Set([...content.matchAll(new RegExp(`\\]\\(${prefix}(/services/[a-z0-9-]+)`, 'g'))].map((m) => m[1]));
    // Links that forgot the locale prefix in fr/es files (point to the EN page by mistake).
    const wrongLocale = locale === 'en' ? [] : [...content.matchAll(/\]\((\/(?:blog|services)\/[a-z0-9-]+)/g)].map((m) => m[1]);
    return { slug, locale, title: data.title, keywords: data.keywords || [], category: data.category, date: data.date, updated: data.updated, content, outPosts, outServices, wrongLocale };
  });
}

const byLocale = Object.fromEntries(LOCALES.map((l) => [l, load(l)]));
const posts = byLocale.en;
const N = posts.length;

// TF-IDF on EN text (title + keywords weighted x3).
const docs = posts.map((p) => tokens(`${p.title} ${p.keywords.join(' ')} `.repeat(3) + p.content));
const df = new Map();
docs.forEach((d) => new Set(d).forEach((t) => df.set(t, (df.get(t) || 0) + 1)));
const vectors = docs.map((d) => {
  const tf = new Map();
  d.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
  const v = new Map();
  let norm = 0;
  tf.forEach((n, t) => { const w = (n / d.length) * Math.log(1 + N / df.get(t)); v.set(t, w); norm += w * w; });
  norm = Math.sqrt(norm) || 1;
  v.forEach((w, t) => v.set(t, w / norm));
  return v;
});
const cosine = (a, b) => { let s = 0; for (const [t, w] of a) if (b.has(t)) s += w * b.get(t); return s; };
const kwSet = (p) => new Set(p.keywords.flatMap((k) => tokens(k)));
const jaccard = (a, b) => { const i = [...a].filter((x) => b.has(x)).length; return i / (new Set([...a, ...b]).size || 1); };

const score = Array.from({ length: N }, () => Array(N).fill(0));
for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
  const s = 0.55 * cosine(vectors[i], vectors[j]) + 0.3 * jaccard(kwSet(posts[i]), kwSet(posts[j])) + 0.15 * (posts[i].category === posts[j].category ? 1 : 0);
  score[i][j] = score[j][i] = Math.round(s * 100) / 100;
}

const idx = new Map(posts.map((p, i) => [p.slug, i]));
const inCount = new Map(posts.map((p) => [p.slug, 0]));
posts.forEach((p) => p.outPosts.forEach((t) => inCount.has(t) && inCount.set(t, inCount.get(t) + 1)));
const serviceFor = (p) => SERVICES.filter(([, re]) => re.test(`${p.title} ${p.keywords.join(' ')} ${p.category}`)).map(([s]) => s);

// Suggest a link from -> to (existing links skipped). Priority favors relevance, then balance.
const suggestions = [];
const add = (from, to, reason) => {
  const i = idx.get(from), j = idx.get(to);
  if (posts[i].outPosts.has(to) || suggestions.some((s) => s.from === from && s.to === to)) return;
  const s = score[i][j];
  if (s < MIN_SCORE) return;
  suggestions.push({ from, to, score: s, reason, anchorHint: posts[j].keywords[0] || posts[j].title });
};
const related = (slug) => posts.map((q, j) => ({ slug: q.slug, s: score[idx.get(slug)][j] })).filter((r) => r.slug !== slug && r.s >= MIN_SCORE).sort((a, b) => b.s - a.s);

if (newSlug) {
  if (!idx.has(newSlug)) { console.error(`No post ${newSlug} in content/posts/en`); process.exit(1); }
  const rel = related(newSlug);
  // Incoming: most related, prefer sources that don't already link out a lot.
  rel.map((r) => ({ ...r, rank: r.s / (1 + 0.15 * posts[idx.get(r.slug)].outPosts.size) }))
    .sort((a, b) => b.rank - a.rank).slice(0, 3)
    .forEach((r) => add(r.slug, newSlug, 'new post needs links from related posts'));
  // Outgoing: most related, prefer targets with few links in.
  rel.map((r) => ({ ...r, rank: r.s / (1 + 0.15 * inCount.get(r.slug)) }))
    .sort((a, b) => b.rank - a.rank).slice(0, 3)
    .forEach((r) => add(newSlug, r.slug, 'new post links to related posts'));
} else {
  // Fill inbound deficits first (orphans), then outbound deficits.
  for (const p of [...posts].sort((a, b) => inCount.get(a.slug) - inCount.get(b.slug))) {
    const need = IN_MIN - inCount.get(p.slug);
    if (need <= 0) continue;
    related(p.slug).filter((r) => posts[idx.get(r.slug)].outPosts.size < OUT_MAX)
      .map((r) => ({ ...r, rank: r.s / (1 + 0.15 * posts[idx.get(r.slug)].outPosts.size) }))
      .sort((a, b) => b.rank - a.rank).slice(0, need)
      .forEach((r) => add(r.slug, p.slug, `only ${inCount.get(p.slug)} links in`));
  }
  for (const p of posts) {
    const need = OUT_MIN - p.outPosts.size;
    if (need <= 0) continue;
    related(p.slug).filter((r) => !p.outPosts.has(r.slug))
      .map((r) => ({ ...r, rank: r.s / (1 + 0.15 * inCount.get(r.slug)) }))
      .sort((a, b) => b.rank - a.rank).slice(0, need)
      .forEach((r) => add(p.slug, r.slug, `only ${p.outPosts.size} links out`));
  }
}

const audit = posts.map((p) => {
  const wanted = serviceFor(p);
  const issues = [];
  if (inCount.get(p.slug) === 0) issues.push('orphan (no post links to it)');
  else if (inCount.get(p.slug) < IN_MIN) issues.push(`few links in (${inCount.get(p.slug)})`);
  if (p.outPosts.size < OUT_MIN) issues.push(`few links out (${p.outPosts.size})`);
  if (p.outPosts.size > OUT_MAX) issues.push(`too many links out (${p.outPosts.size})`);
  const missingService = wanted.filter((s) => !p.outServices.has(s));
  if (wanted.length && missingService.length === wanted.length) issues.push(`no link to its service page (${wanted[0]})`);
  for (const l of LOCALES.slice(1)) {
    const tr = byLocale[l].find((q) => q.slug === p.slug);
    if (!tr) issues.push(`missing ${l} version`);
    else {
      const diff = [...p.outPosts].filter((t) => !tr.outPosts.has(t));
      if (diff.length) issues.push(`${l} version lacks links to: ${diff.join(', ')}`);
      if (tr.wrongLocale.length) issues.push(`${l} links without /${l} prefix: ${tr.wrongLocale.join(', ')}`);
    }
  }
  return { slug: p.slug, in: inCount.get(p.slug), out: p.outPosts.size, services: [...p.outServices], issues };
});

if (asJson) {
  console.log(JSON.stringify({ audit, suggestions }, null, 2));
} else {
  console.log(`\nInternal links: ${N} posts (EN graph, applies to fr/es with locale prefix)\n`);
  for (const a of audit) console.log(`${a.slug.padEnd(48)} in ${String(a.in).padStart(2)}  out ${String(a.out).padStart(2)}  ${a.issues.length ? '⚠ ' + a.issues.join(' · ') : '✓'}`);
  console.log(`\nSuggested links (${suggestions.length}) — add in context, anchor = natural phrase around the hint:\n`);
  for (const s of suggestions) console.log(`  ${s.from} → ${s.to}  [${s.score}]  "${s.anchorHint}"  (${s.reason})`);
  console.log('\nMost related pairs:');
  const pairs = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) pairs.push([posts[i].slug, posts[j].slug, score[i][j]]);
  pairs.sort((a, b) => b[2] - a[2]).slice(0, 8).forEach(([a, b, s]) => console.log(`  ${s}  ${a} ↔ ${b}`));
}
