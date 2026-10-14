// Report: which AI bots read which pages (counts logged by middleware.ts into Upstash Redis).
// Usage: npm run ai-bots            (last 30 days)
//        npm run ai-bots -- 7       (last 7 days)
// Needs KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_*) in .env.local
// — get them with `npx vercel env pull .env.local` or copy them from the Upstash dashboard.
import { readFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
if (!URL || !TOKEN) {
  console.error('Missing KV_REST_API_URL / KV_REST_API_TOKEN in .env.local (see header of this script).');
  process.exit(1);
}

const days = Number(process.argv[2]) || 30;
const keys = [];
for (let i = 0; i < days; i++) {
  keys.push(`ai-bots:${new Date(Date.now() - i * 864e5).toISOString().slice(0, 10)}`);
}

const res = await fetch(`${URL}/pipeline`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(keys.map((k) => ['HGETALL', k])),
});
if (!res.ok) {
  console.error('Redis error', res.status, await res.text());
  process.exit(1);
}
const results = await res.json();

const byBot = new Map();
const byPage = new Map();
results.forEach(({ result }) => {
  if (!result) return;
  for (let i = 0; i < result.length; i += 2) {
    const [bot, path] = result[i].split('|');
    const n = Number(result[i + 1]);
    byBot.set(bot, (byBot.get(bot) || 0) + n);
    const pages = byPage.get(bot) || new Map();
    pages.set(path, (pages.get(path) || 0) + n);
    byPage.set(bot, pages);
  }
});

if (!byBot.size) {
  console.log(`No AI bot visits logged in the last ${days} days.`);
  process.exit(0);
}

console.log(`\nAI bot visits, last ${days} days\n`);
for (const [bot, total] of [...byBot].sort((a, b) => b[1] - a[1])) {
  console.log(`${String(total).padStart(6)}  ${bot}`);
  const top = [...byPage.get(bot)].sort((a, b) => b[1] - a[1]).slice(0, 8);
  for (const [path, n] of top) console.log(`        ${String(n).padStart(5)}  ${path}`);
}
console.log('\n"live, user question" = someone asked that AI something and it read our page to answer.');
