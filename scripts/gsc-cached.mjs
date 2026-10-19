// Search Console data from the daily snapshot in Redis (written by scripts/snapshot.mjs via GitHub Actions),
// for places without the Google key (the cloud content routine). Token: KV_REST_API_TOKEN, or none when the
// environment's network secret adds the Authorization header for the Upstash host.
//   npm run gsc:cached                 summary + top queries + query→page pairs
//   npm run gsc:cached -- --json       everything as JSON
import { readFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
if (!URL) { console.error('Missing KV_REST_API_URL'); process.exit(1); }
const res = await fetch(`${URL}/get/dash:snapshot`, { headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {} });
if (!res.ok) { console.error('Redis error', res.status, await res.text()); process.exit(1); }
const snap = JSON.parse((await res.json()).result || 'null');
const gsc = snap?.gsc;
if (!gsc) { console.error('No GSC data in snapshot', snap?.errors); process.exit(1); }

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ generatedAt: snap.generatedAt, ...gsc, daily: undefined }, null, 2));
} else {
  const t = gsc.totals;
  console.log(`Snapshot ${snap.generatedAt} · GSC ${gsc.range.start} → ${gsc.range.end}`);
  console.log(`28d: ${t.clicks} clicks, ${t.impressions} impressions, CTR ${(t.ctr * 100).toFixed(1)}%, pos ${t.position.toFixed(1)}\n`);
  console.log('Pages:');
  console.table(gsc.pages.map((p) => ({ url: p.url, impr: p.impressions, clicks: p.clicks, pos: +p.position.toFixed(1), status: p.status })));
  console.log('Query → page (by impressions):');
  console.table((gsc.queryPages || []).slice(0, 80).map((r) => ({ query: r.query, page: r.page, impr: r.impressions, clicks: r.clicks, pos: +r.position.toFixed(1) })));
}
