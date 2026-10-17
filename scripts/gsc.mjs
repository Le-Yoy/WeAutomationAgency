// Search Console API helper. Key: .gsc-key.json (gitignored) or GSC_KEY_JSON env (for CI/cloud runs).
// Usage: npm run gsc -- sites | npm run gsc -- top [days]
import { readFileSync, existsSync } from 'node:fs';
import { JWT } from 'google-auth-library';

const raw = process.env.GSC_KEY_JSON || (existsSync('.gsc-key.json') ? readFileSync('.gsc-key.json', 'utf8') : null);
if (!raw) { console.error('No key: add .gsc-key.json or GSC_KEY_JSON'); process.exit(1); }
const key = JSON.parse(raw);
const client = new JWT({ email: key.client_email, key: key.private_key, scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] });
const API = 'https://searchconsole.googleapis.com/webmasters/v3';

export async function gsc(path, body) {
  const res = await client.request({ url: API + path, method: body ? 'POST' : 'GET', data: body });
  return res.data;
}

const cmd = process.argv[2] || 'sites';
if (cmd === 'sites') {
  console.log(JSON.stringify(await gsc('/sites'), null, 2));
} else if (cmd === 'top') {
  const days = Number(process.argv[3]) || 28;
  const end = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
  const start = new Date(Date.now() - (days + 2) * 864e5).toISOString().slice(0, 10);
  const site = encodeURIComponent(process.env.GSC_SITE || 'https://weautomationagency.com/');
  const data = await gsc(`/sites/${site}/searchAnalytics/query`, { startDate: start, endDate: end, dimensions: ['page'], rowLimit: 15 });
  console.log(`Top pages ${start} → ${end}`);
  for (const r of data.rows || []) console.log(`${String(r.clicks).padStart(4)} clicks ${String(r.impressions).padStart(6)} impr  ${(r.ctr * 100).toFixed(1).padStart(5)}%  pos ${r.position.toFixed(1).padStart(5)}  ${r.keys[0]}`);
}
