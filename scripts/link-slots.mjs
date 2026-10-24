// Contextual internal links: finds WHERE in a post a link would help the reader (rules: content/agent/4-links.md).
// It only finds candidates. Claude reads both pages and decides (the relevance test); the script never edits posts.
//
//   npm run links:slots                         audit: in-body link slots (intro / middle / late) for every post × locale
//   npm run links:slots -- <slug>               candidates for one post: concept terms already in the text, per slot, with the sentence
//   npm run links:slots -- --new <slug>         reverse: places in OLDER posts where the new post's concepts appear (to link to it)
//   add --locale fr|es to look at one locale (default: all three), --json for raw output
//
// Slots (by word position in the body, short answer and "Keep reading" excluded):
//   intro  = first 25%  → the "basics" link (a prerequisite the reader may lack, with an optional "come back" line)
//   middle = 25–70%     → a sub-concept another page explains in depth
//   late   = 70–100%    → the next step (cost, how-to, case study) before the CTA
// Concept map (which page truly explains which term): content/agent/memory/concepts.json
import { readFileSync } from 'node:fs';
import { loadPosts, relevance } from './lib/relevance.mjs';

const LOCALES = ['en', 'fr', 'es'];
const args = process.argv.slice(2);
const asJson = args.includes('--json');
const only = args.includes('--locale') ? [args[args.indexOf('--locale') + 1]] : LOCALES;
const newSlug = args.includes('--new') ? args[args.indexOf('--new') + 1] : null;
const focus = !newSlug ? args.find((a) => !a.startsWith('--') && !LOCALES.includes(a)) : null;

const { concepts } = JSON.parse(readFileSync('content/agent/memory/concepts.json', 'utf8'));
const byLocale = Object.fromEntries(LOCALES.map((l) => [l, loadPosts(l)]));
const rel = relevance(byLocale.en);
const prefix = (l) => (l === 'en' ? '' : `/${l}`);
const ownerPath = (c, l) => (c.owner.startsWith('/') ? `${prefix(l)}${c.owner}` : `${prefix(l)}/blog/${c.owner}`);
const KEEP = /^## (Keep reading|À lire ensuite|Sigue leyendo)\b/m;

// Body = text after the short-answer blockquote, before "Keep reading". Returns lines with word offsets.
function parse(post) {
  let body = post.content;
  const k = body.search(KEEP);
  if (k >= 0) body = body.slice(0, k);
  const lines = body.split('\n');
  // Skip leading blank lines + the first blockquote (short answer).
  let i = 0;
  while (i < lines.length && !lines[i].trim()) i++;
  if (lines[i]?.startsWith('>')) while (i < lines.length && lines[i].startsWith('>')) i++;
  const out = [];
  let words = 0, inBox = false;
  for (; i < lines.length; i++) {
    const text = lines[i];
    const n = text.split(/\s+/).filter(Boolean).length;
    // Lines inside <KeyTakeaways>/<Callout> boxes: no links there (summaries stay clean).
    if (/^\s*<(KeyTakeaways|Callout)\b/.test(text)) inBox = !/<\/(KeyTakeaways|Callout)>/.test(text);
    const box = inBox || /^\s*<\/?(KeyTakeaways|Callout)\b/.test(text);
    if (/<\/(KeyTakeaways|Callout)>/.test(text)) inBox = false;
    out.push({ text, start: words, heading: /^#{1,6} /.test(text), table: /^\s*\|/.test(text), component: box || /^\s*<\/?[A-Z]/.test(text) });
    words += n;
  }
  return { lines: out, total: words || 1 };
}
const slotOf = (pos, total) => (pos / total < 0.25 ? 'intro' : pos / total < 0.7 ? 'middle' : 'late');

// In-body links to our own pages, with their slot.
function bodyLinks(post) {
  const { lines, total } = parse(post);
  const links = [];
  for (const ln of lines) {
    for (const m of ln.text.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)) {
      const before = ln.text.slice(0, m.index).split(/\s+/).filter(Boolean).length;
      links.push({ anchor: m[1], href: m[2], slot: slotOf(ln.start + before, total) });
    }
  }
  return links;
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Occurrences of a concept's terms in a post (outside headings, existing links, tables, components).
function findTerms(post, concept) {
  const terms = concept.terms[post.locale] || [];
  const cs = new Set(concept.cs || []);
  const { lines, total } = parse(post);
  const hits = [];
  for (const ln of lines) {
    if (ln.heading || ln.table || ln.component || !ln.text.trim()) continue;
    const masked = ln.text.replace(/\[[^\]]*\]\([^)]*\)/g, (s) => ' '.repeat(s.length)).replace(/`[^`]*`/g, (s) => ' '.repeat(s.length));
    for (const term of terms) {
      const re = new RegExp(`(?<![\\p{L}\\p{N}-])${esc(term)}(?![\\p{L}\\p{N}-])`, cs.has(term) ? 'gu' : 'giu');
      const m = re.exec(masked);
      if (!m) continue;
      const before = ln.text.slice(0, m.index).split(/\s+/).filter(Boolean).length;
      const a = Math.max(0, m.index - 90), b = Math.min(ln.text.length, m.index + term.length + 90);
      hits.push({ term: m[0], slot: slotOf(ln.start + before, total), snippet: (a ? '…' : '') + ln.text.slice(a, b).replace(/\s+/g, ' ') + (b < ln.text.length ? '…' : '') });
      break; // first matching term per line is enough
    }
  }
  return hits;
}

const linkedTargets = (links, l) => new Set(links.map((x) => x.href.replace(/#.*$/, '').replace(/\/$/, '')));

function audit() {
  const rows = [];
  for (const l of only) for (const p of byLocale[l]) {
    const links = bodyLinks(p).filter((x) => /\/blog\/|\/services\//.test(x.href));
    const blogs = links.filter((x) => x.href.includes('/blog/'));
    const has = (s) => blogs.some((x) => x.slot === s) || (s === 'late' && links.some((x) => x.slot === 'late'));
    rows.push({ slug: p.slug, locale: l, intro: has('intro'), middle: has('middle'), late: has('late'), inBody: blogs.length });
  }
  return rows;
}

function candidates(slug) {
  const res = [];
  for (const l of only) {
    const p = byLocale[l].find((x) => x.slug === slug);
    if (!p) continue;
    const linked = linkedTargets(bodyLinks(p), l);
    for (const c of concepts) {
      if (c.owner === slug) continue;
      const path = ownerPath(c, l);
      if (linked.has(path)) continue;
      for (const h of findTerms(p, c)) res.push({ locale: l, slot: h.slot, term: h.term, target: path, level: c.level, relevance: c.owner.startsWith('/') ? null : rel(slug, c.owner), explains: c.explains, snippet: h.snippet });
    }
  }
  // Best first: per slot, basics before deep for the intro, then relevance.
  const order = { intro: 0, middle: 1, late: 2 };
  return res.sort((a, b) => a.locale.localeCompare(b.locale) || order[a.slot] - order[b.slot] || (a.slot === 'intro' ? (a.level === 'basics' ? -1 : 0) - (b.level === 'basics' ? -1 : 0) : 0) || (b.relevance ?? 0.3) - (a.relevance ?? 0.3));
}

function reverse(slug) {
  const own = concepts.filter((c) => c.owner === slug);
  if (!own.length) console.error(`⚠ no concept owned by ${slug} in concepts.json — add its concepts first`);
  const res = [];
  for (const l of only) for (const p of byLocale[l]) {
    if (p.slug === slug) continue;
    const path = `${prefix(l)}/blog/${slug}`;
    if (linkedTargets(bodyLinks(p), l).has(path)) continue;
    const hits = own.flatMap((c) => findTerms(p, c));
    const r = rel(p.slug, slug);
    if (hits.length) res.push({ locale: l, from: p.slug, relevance: r, hits: hits.slice(0, 3) });
    else if (r >= 0.2) res.push({ locale: l, from: p.slug, relevance: r, hits: [], note: 'related but the term is absent → a bridge sentence may fit (only if it adds real value)' });
  }
  return res.sort((a, b) => a.locale.localeCompare(b.locale) || b.relevance - a.relevance);
}

if (newSlug) {
  const r = reverse(newSlug);
  if (asJson) console.log(JSON.stringify(r, null, 2));
  else {
    console.log(`\nWhere older posts could link to ${newSlug} (in the body, not "Keep reading"):\n`);
    for (const x of r) {
      console.log(`[${x.locale}] ${x.from}  (relevance ${x.relevance})${x.note ? '  ' + x.note : ''}`);
      for (const h of x.hits) console.log(`   ${h.slot.padEnd(6)} "${h.term}" → ${h.snippet}`);
    }
  }
} else if (focus) {
  const r = candidates(focus);
  if (asJson) console.log(JSON.stringify(r, null, 2));
  else {
    console.log(`\nLink candidates in ${focus} (terms already in the text; judge each with the relevance test):\n`);
    let cur = '';
    for (const c of r) {
      if (c.locale + c.slot !== cur) { cur = c.locale + c.slot; console.log(`\n[${c.locale}] ${c.slot.toUpperCase()}`); }
      console.log(`  "${c.term}" → ${c.target}  (${c.level}${c.relevance !== null ? `, relevance ${c.relevance}` : ''})\n     ${c.snippet}`);
    }
  }
} else {
  const rows = audit();
  if (asJson) console.log(JSON.stringify(rows, null, 2));
  else {
    console.log('\nIn-body link slots (✓ = at least one internal link there; "Keep reading" does not count)\n');
    console.log('post'.padEnd(48) + 'loc  intro middle late  in-body');
    for (const r of rows) console.log(`${r.slug.padEnd(48)}${r.locale.padEnd(5)}${(r.intro ? ' ✓' : ' ✗').padEnd(6)}${(r.middle ? ' ✓' : ' ✗').padEnd(7)}${(r.late ? ' ✓' : ' ✗').padEnd(6)}${r.inBody}`);
    const missing = rows.filter((r) => !r.intro || !r.middle).length;
    console.log(`\n${missing} post×locale missing an intro or middle link. Run "npm run links:slots -- <slug>" for candidates.`);
  }
}
