// Link mission queue in Redis (`dash:links`), shown on /dashboard.
// npm run links -- load <file.json>   replace the queue (array of {name,url,type,why,steps}); keeps history,
//                                     skips targets already done/skipped, sets today's mission if empty
// npm run links -- show               print today's mission, queue size and history
import { readFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const R_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const R_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = async (commands) =>
  (await (await fetch(`${R_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${R_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  })).json()).map((r) => r.result);

const [raw] = await redis([['GET', 'dash:links']]);
const links = raw ? JSON.parse(raw) : { queue: [], done: [] };
const [cmd, file] = process.argv.slice(2);

if (cmd === 'load') {
  const seen = new Set((links.done || []).map((d) => d.name));
  if (links.today) seen.add(links.today.name);
  links.queue = JSON.parse(readFileSync(file, 'utf8')).filter((t) => !seen.has(t.name));
  if (!links.today && links.queue.length) links.today = { ...links.queue.shift(), date: new Date().toISOString().slice(0, 10) };
  await redis([['SET', 'dash:links', JSON.stringify(links)]]);
}
console.log('Today:', links.today ? `${links.today.name} (${links.today.type}) ${links.today.url}` : 'none');
console.log('Queue:', (links.queue || []).length, 'targets');
for (const d of links.done || []) console.log(`  ${d.date} ${d.status.padEnd(7)} ${d.name}${d.linkType ? ` (${d.linkType})` : ''}`);
