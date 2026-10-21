// Monday report: reads the latest snapshot (scripts/snapshot.mjs) from Redis and emails a short
// summary via Resend to LEAD_NOTIFY_EMAIL. Runs Monday mornings in GitHub Actions. Locally:
// npm run weekly-report            (sends)   |   npm run weekly-report -- --dry   (prints only)
import { readFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const R_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const R_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const res = await fetch(`${R_URL}/pipeline`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${R_TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify([['GET', 'dash:snapshot'], ['GET', 'dash:links']]),
});
const [snapRaw, linksRaw] = (await res.json()).map((r) => r.result);
if (!snapRaw) { console.error('No snapshot in Redis'); process.exit(1); }
const s = JSON.parse(snapRaw);
const links = linksRaw ? JSON.parse(linksRaw) : null;

const num = (n) => Math.round(n).toLocaleString('en-US');
const pct = (n) => `${(n * 100).toFixed(1)}%`;
const delta = (now, before, invert = false) => {
  if (!before) return '';
  const c = (now - before) / before;
  const good = invert ? c < 0 : c > 0;
  return ` <span style="color:${c === 0 ? '#888' : good ? '#16a34a' : '#dc2626'}">${c > 0 ? '▲' : c < 0 ? '▼' : '='} ${Math.abs(c * 100).toFixed(0)}%</span>`;
};

// Google: last 7 days vs the 7 before (from the daily series).
const d = s.gsc?.daily || [];
const sum = (rows, k) => rows.reduce((a, r) => a + r[k], 0);
const last7 = d.slice(-7), prev7 = d.slice(-14, -7);

const todo = [];
for (const p of s.gsc?.pages || []) {
  if (p.status === 'below-market') todo.push(`Rewrite title + description of <b>${p.url}</b> (CTR ${pct(p.ctr)} at position ${p.position.toFixed(1)}, market ${pct(p.marketCtr)})`);
}
for (const b of s.health?.broken || []) todo.push(`Fix broken page <b>${b.url}</b> (HTTP ${b.status})`);
if (links?.today) todo.push(`Link mission: <a href="${links.today.url}">${links.today.name}</a>`);
if (s.errors?.length) todo.push(`Data errors to check: ${s.errors.join(' · ')}`);

const live = (s.aiBots?.byBot || []).filter((b) => b.group === 'live');
const aiTotal = (s.aiBots?.byBot || []).filter((b) => b.group !== 'search').reduce((a, b) => a + b.visits, 0);

const targets = s.gsc?.targets || [];
const targetLine = (t) => `${t.keyword} (${t.market.toUpperCase()}): ${t.firstPosition ?? '–'} → ${t.position ?? 'not ranking yet'}${t.trend ? ` · ${t.trend}` : ''}${t.checkpoint ? ` · ${t.checkpoint === 'd90' ? '90-day decision' : '28-day check'}` : ''}`;
for (const t of targets.filter((t) => t.checkpoint)) todo.push(`Keyword target at checkpoint: <b>${targetLine(t)}</b> (${t.page})`);

const row = (label, value) => `<tr><td style="padding:6px 12px 6px 0;color:#555">${label}</td><td style="padding:6px 0"><b>${value}</b></td></tr>`;
const html = `
<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;color:#111">
  <h2 style="margin:0 0 4px">Weekly SEO / GEO report</h2>
  <p style="margin:0 0 16px;color:#666">weautomationagency.com · ${new Date().toISOString().slice(0, 10)}</p>

  <h3>Google, last 7 days</h3>
  <table>
    ${row('Clicks', num(sum(last7, 'clicks')) + delta(sum(last7, 'clicks'), sum(prev7, 'clicks')))}
    ${row('Impressions', num(sum(last7, 'impressions')) + delta(sum(last7, 'impressions'), sum(prev7, 'impressions')))}
    ${s.gsc ? row('Average position (28 days, lower = better)', s.gsc.totals.position.toFixed(1) + delta(s.gsc.totals.position, s.gsc.previous.position, true)) : ''}
  </table>

  <h3>AI &amp; Bing</h3>
  <table>
    ${row('AI bot visits (30 days)', num(aiTotal))}
    ${row('Live answers to real people', live.length ? live.map((b) => `${b.bot.split(' (')[0]} ${b.visits}`).join(', ') : '0')}
    ${s.bing ? row('Bing impressions (28 days)', num(s.bing.totals.impressions)) : ''}
    ${s.health ? row('Pages working', `${s.health.pages - s.health.broken.length} / ${s.health.pages}`) : ''}
  </table>

  ${targets.length ? `<h3>Keyword targets</h3><ul>${targets.map((t) => `<li style="margin-bottom:4px">${targetLine(t)}</li>`).join('')}</ul>` : ''}

  ${s.engine?.lastRun ? `<h3>Content engine this week</h3><pre style="white-space:pre-wrap;font-family:inherit;font-size:13px;color:#444">${s.engine.lastRun.split('\n').slice(0, 12).join('\n').replace(/</g, '&lt;')}</pre>` : ''}
  ${(s.engine?.opportunities?.items || []).filter((o) => /New|discuss/.test(o.status)).length ? `<h3>💰 Opportunities waiting for your decision</h3><ul>${s.engine.opportunities.items.filter((o) => /New|discuss/.test(o.status)).map((o) => `<li>${o.name}${o.volume ? ` (${o.volume}/mo)` : ''}: ${o.next || ''}</li>`).join('')}</ul><p style="color:#666">Decide in Notion → 💰 Opportunities (✅ Go / ❌ No).</p>` : ''}

  <h3>To do this week</h3>
  ${todo.length ? `<ol>${todo.map((t) => `<li style="margin-bottom:6px">${t}</li>`).join('')}</ol>` : '<p>Nothing urgent. Keep publishing and doing the daily link.</p>'}

  <p style="margin-top:24px"><a href="https://weautomationagency.com/dashboard" style="background:#F94239;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Open the dashboard</a></p>
</div>`;

if (process.argv.includes('--dry')) {
  console.log(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  process.exit(0);
}

const mail = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    from: process.env.LEAD_FROM_EMAIL || 'WeAutomationAgency Reports <onboarding@resend.dev>',
    to: process.env.LEAD_NOTIFY_EMAIL,
    subject: `Weekly SEO/GEO report: ${num(sum(last7, 'clicks'))} clicks, ${num(sum(last7, 'impressions'))} impressions`,
    html,
  }),
});
console.log('Resend', mail.status, await mail.text());
if (!mail.ok) process.exitCode = 1;
