// SEO check: starts the production build locally, crawls every URL in the
// sitemap and flags SEO problems (title/description length, h1, canonical,
// duplicates, broken internal links). Usage: `npm run build && npm run seo:check`.
// Must report "all pages pass" before any push (see CLAUDE.md → SEO rules).
import { spawn } from 'child_process';

const PORT = 3107;
const LOCAL = `http://localhost:${PORT}`;
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;

const decode = (s) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const server = spawn('npx', ['next', 'start', '-p', String(PORT)], { stdio: 'ignore' });
const stop = () => server.kill();
process.on('exit', stop);

async function waitUp() {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(LOCAL + '/sitemap.xml')).ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('server did not start');
}

await waitUp();
const sitemap = await (await fetch(LOCAL + '/sitemap.xml')).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

const problems = [];
const titles = new Map();
const links = new Map(); // internal href -> first page that links to it
for (const route of urls) {
  const res = await fetch(LOCAL + route);
  if (!res.ok) { problems.push([route, [`HTTP ${res.status}`]]); continue; }
  const html = await res.text();
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const p = [];
  if (!title) p.push('missing <title>');
  else if (title.length > TITLE_MAX) p.push(`title ${title.length} chars (max ${TITLE_MAX}): "${title}"`);
  if (!desc) p.push('missing meta description');
  else if (desc.length > DESC_MAX || desc.length < DESC_MIN)
    p.push(`description ${desc.length} chars (${DESC_MIN}-${DESC_MAX})`);
  if (h1 !== 1) p.push(`${h1} <h1> tags (need exactly 1)`);
  if (!canonical) p.push('no canonical');
  else if ((new URL(canonical).pathname.replace(/\/$/, '') || '/') !== (route.replace(/\/$/, '') || '/'))
    p.push(`canonical points elsewhere: ${canonical}`);
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (!/^\/(_next|fonts|images)\//.test(href) && !links.has(href)) links.set(href, route);
  }
  if (title) titles.set(title, [...(titles.get(title) || []), route]);
  if (p.length) problems.push([route, p]);
}
for (const [href, from] of links) {
  const r = await fetch(LOCAL + href, { redirect: 'follow' });
  if (!r.ok) problems.push([from, [`broken internal link ${href} (HTTP ${r.status})`]]);
}
for (const [t, routes] of titles) if (routes.length > 1) problems.push([routes.join(', '), [`duplicate title "${t}"`]]);

if (!problems.length) console.log('[seo-check] ✅ all pages pass');
else {
  console.log(`[seo-check] ⚠️  ${problems.length} page(s) need fixing:`);
  for (const [r, p] of problems) console.log(`  ${r}\n    - ${p.join('\n    - ')}`);
}
stop();
process.exit(0);
