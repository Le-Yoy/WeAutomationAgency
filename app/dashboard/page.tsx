import type { Metadata } from 'next';

// Private SEO/GEO dashboard. Password: middleware.ts (DASHBOARD_PASSWORD).
// Data: scripts/snapshot.mjs writes `dash:snapshot` + `dash:daily` to Upstash Redis every morning;
// the daily link mission lives in `dash:links` (scripts/links.mjs).
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Dashboard — WeAutomationAgency',
  robots: { index: false, follow: false },
};

type Row = { clicks: number; impressions: number; ctr: number; position: number };
type Page = Row & { url: string; marketCtr: number; targetCtr: number; status: string };
type Snapshot = {
  generatedAt: string;
  errors: string[];
  gsc: null | {
    range: { start: string; end: string };
    totals: Row;
    previous: Row;
    daily: { date: string; clicks: number; impressions: number; position: number }[];
    pages: Page[];
    queries: (Row & { query: string })[];
    targets?: {
      id: string; keyword: string; market: string; page: string; days: number; status: string;
      firstPosition: number | null; position: number | null; impressions: number; clicks: number;
      rankingPage: string | null; checkpoint: 'd28' | 'd90' | null; trend: 'rising' | 'falling' | 'flat' | null;
    }[];
  };
  bing: null | { totals: { clicks: number; impressions: number }; daily: { date: string; clicks: number; impressions: number }[] };
  aiBots: null | {
    byBot: { bot: string; visits: number; group: string }[];
    topPages: { path: string; visits: number }[];
    daily: { date: string; visits: number }[];
  };
  health: null | { pages: number; broken: { url: string; status: number }[] };
  engine?: {
    lastRun: string | null;
    competitors: null | {
      updated: string;
      markets: Record<string, { agencies: { domain: string; keywords: number; avgPosition: number; strength: number | null }[]; directories: string[] }>;
    };
    linkIdeas: null | Record<string, { updated: string; total: number; top: { domain: string; competitors: number; rank: number }[] }>;
    aiVisibility?: null | {
      date: string; cited: number; total: number; previous: null | { date: string; cited: number };
      rows: { keyword: string; market: string; cited: boolean; retrieved: boolean; top: string[] }[];
    };
    opportunities: null | { updated: string; items: { name: string; status: string; volume?: number; kd?: number; markets?: string[]; sell?: string[]; next?: string }[] };
  };
};
type LinkTarget = { name: string; url: string; type: string; why?: string; steps?: string };
type Links = {
  today?: LinkTarget & { date: string };
  queue?: LinkTarget[];
  done?: { date: string; name: string; status: string; linkType?: string }[];
};

async function redis(commands: unknown[][]) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return (await res.json()).map((r: { result: unknown }) => r.result) as (string | null)[];
}

const num = (n: number) => Math.round(n).toLocaleString('en-US');
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

function Delta({ now, before, invert = false }: { now: number; before: number; invert?: boolean }) {
  if (!before) return <span className="text-medium-grey text-sm">no data before</span>;
  const change = (now - before) / before;
  const good = invert ? change < 0 : change > 0;
  return (
    <span className={`text-sm ${change === 0 ? 'text-medium-grey' : good ? 'text-emerald-400' : 'text-accent'}`}>
      {change > 0 ? '▲' : change < 0 ? '▼' : '='} {Math.abs(change * 100).toFixed(0)}% vs previous 28 days
    </span>
  );
}

function Card({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-darker-grey bg-[#0d0d0d] p-5">
      <div className="text-sm text-grey">{label}</div>
      <div className="mt-1 text-3xl font-bold">{value}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Bars({ data, color = '#F94239', height = 90 }: { data: { label: string; value: number }[]; color?: string; height?: number }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const w = 100 / Math.max(1, data.length);
  return (
    <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 4);
        return (
          <rect key={d.label} x={i * w + w * 0.15} y={height - h} width={w * 0.7} height={h} fill={color} rx={0.4}>
            <title>{`${d.label}: ${d.value}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}

function Section({ id, title, hint, children }: { id?: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-6">
      <h2 className="text-xl font-bold">{title}</h2>
      {hint && <p className="mt-1 text-sm text-grey">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

const STATUS: Record<string, [string, string]> = {
  'above-target': ['✅ Above target', 'text-emerald-400'],
  'above-market': ['🟡 Above market', 'text-yellow-400'],
  'below-market': ['🔴 Below market: rewrite title', 'text-accent'],
  testing: ['🧪 New title, judge after 28 days', 'text-sky-400'],
  'low-data': ['⏳ Not enough data', 'text-medium-grey'],
  'not-page-1': ['📈 Page 2+: needs better ranking', 'text-medium-grey'],
};

const GROUP_LABEL: Record<string, string> = {
  live: 'Live answer to a real person',
  index: 'AI search index',
  training: 'AI training',
  search: 'Google / Bing',
  other: 'Other AI',
};

export default async function Dashboard() {
  const data = await redis([['GET', 'dash:snapshot'], ['GET', 'dash:links']]);
  const snap: Snapshot | null = data?.[0] ? JSON.parse(data[0]) : null;
  const links: Links | null = data?.[1] ? JSON.parse(data[1]) : null;

  if (!snap) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4 text-grey">No snapshot yet. It is created every morning by GitHub Actions (or run npm run snapshot).</p>
      </main>
    );
  }

  const { gsc, bing, aiBots, health } = snap;
  const live = aiBots?.byBot.filter((b) => b.group === 'live').reduce((s, b) => s + b.visits, 0) ?? 0;
  const aiTotal = aiBots?.byBot.filter((b) => b.group !== 'search').reduce((s, b) => s + b.visits, 0) ?? 0;
  const ORDER = ['below-market', 'testing', 'above-market', 'above-target', 'low-data', 'not-page-1'];
  const sortedPages = [...(gsc?.pages ?? [])].sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status) || b.impressions - a.impressions);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-3xl font-bold">SEO / GEO dashboard</h1>
        <p className="text-sm text-grey">
          Updated {new Date(snap.generatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Casablanca' })}
          {gsc && ` · Google data ${gsc.range.start} → ${gsc.range.end}`}
        </p>
      </div>
      <nav className="mt-6 flex flex-wrap gap-2 text-sm">
        {[['#links', '🔗 Link mission'], ['#targets', '🎯 Targets'], ['#engine', '🧠 This week'], ['#opportunities', '💰 Opportunities'], ['#chatgpt', '💬 ChatGPT'], ['#competitors', '🥊 Competitors'], ['#google', '📈 Google'], ['#ai', '🤖 AI visits']].map(([href, label]) => (
          <a key={href} href={href} className="rounded-full border border-darker-grey px-3 py-1 text-grey hover:border-accent hover:text-secondary">{label}</a>
        ))}
      </nav>

      {snap.errors.length > 0 && (
        <p className="mt-4 rounded-xl border border-accent/50 bg-accent/10 p-3 text-sm">⚠️ Some data failed to load: {snap.errors.join(' · ')}</p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Google clicks (28 days)" value={gsc ? num(gsc.totals.clicks) : '–'}>
          {gsc && <Delta now={gsc.totals.clicks} before={gsc.previous.clicks} />}
        </Card>
        <Card label="Google impressions (28 days)" value={gsc ? num(gsc.totals.impressions) : '–'}>
          {gsc && <Delta now={gsc.totals.impressions} before={gsc.previous.impressions} />}
        </Card>
        <Card label="Average position (lower = better)" value={gsc ? gsc.totals.position.toFixed(1) : '–'}>
          {gsc && <Delta now={gsc.totals.position} before={gsc.previous.position} invert />}
        </Card>
        <Card label="AI visits (30 days)" value={num(aiTotal)}>
          <span className="text-sm text-grey">{live} live answers to real people</span>
        </Card>
        <Card label="Bing impressions (28 days)" value={bing ? num(bing.totals.impressions) : '–'}>
          <span className="text-sm text-grey">{bing ? `${num(bing.totals.clicks)} clicks` : ''}</span>
        </Card>
        <Card label="Google CTR (28 days)" value={gsc ? pct(gsc.totals.ctr) : '–'}>
          {gsc && <Delta now={gsc.totals.ctr} before={gsc.previous.ctr} />}
        </Card>
        <Card label="Pages checked today" value={health ? String(health.pages) : '–'}>
          <span className={`text-sm ${health?.broken.length ? 'text-accent' : 'text-emerald-400'}`}>
            {health ? (health.broken.length ? `${health.broken.length} broken` : 'all working') : ''}
          </span>
        </Card>
        <Card label="Links done" value={String(links?.done?.filter((d) => d.status === 'live').length ?? 0)}>
          <span className="text-sm text-grey">{links?.queue?.length ?? 0} targets in the queue</span>
        </Card>
      </div>

      <Section id="links" title="🔗 Today's link mission" hint="One checked link a day. Every target passed the link gate (relevant, real, free, not spammy).">
        {links?.today ? (
          <div className="rounded-2xl border border-darker-grey bg-[#0d0d0d] p-5">
            <div className="flex flex-wrap items-center gap-3">
              <a href={links.today.url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-accent hover:underline">
                {links.today.name} ↗
              </a>
              <span className="rounded-full border border-darker-grey px-2 py-0.5 text-xs text-grey">{links.today.type}</span>
            </div>
            {links.today.why && <p className="mt-2 text-grey">{links.today.why}</p>}
            {links.today.steps && <p className="mt-2 whitespace-pre-line text-sm">{links.today.steps}</p>}
            <form method="post" action="/dashboard/links" className="mt-5 flex flex-wrap items-center gap-3">
              <select name="linkType" defaultValue={links.today.type} className="rounded-lg border border-darker-grey bg-primary px-3 py-2 text-sm">
                <option value="dofollow">dofollow</option>
                <option value="nofollow">nofollow</option>
                <option value="mention only">mention only</option>
                {!['dofollow', 'nofollow', 'mention only'].includes(links.today.type) && <option value={links.today.type}>{links.today.type}</option>}
              </select>
              <input name="profileUrl" placeholder="Our profile / link URL (optional)" className="min-w-[220px] flex-1 rounded-lg border border-darker-grey bg-primary px-3 py-2 text-sm" />
              <button name="action" value="done" className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold">✅ Done</button>
              <button name="action" value="skip" className="rounded-lg border border-darker-grey px-4 py-2 text-sm">Skip</button>
            </form>
          </div>
        ) : (
          <p className="text-grey">No mission set yet.</p>
        )}
        {!!links?.done?.length && (
          <ul className="mt-4 space-y-1 text-sm text-grey">
            {links.done.slice(-8).reverse().map((d) => (
              <li key={d.date + d.name}>
                {d.date} · {d.name} · {d.status}{d.linkType ? ` (${d.linkType})` : ''}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {gsc?.targets && gsc.targets.length > 0 && (
        <Section
          id="targets"
          title="🎯 Keyword targets"
          hint="Every keyword we attack, with its position in its own country (last 28 days). Decisions at 28 and 90 days: rising → strengthen, stuck beyond 30 at 90 days → rewrite or set aside."
        >
          <div className="overflow-x-auto rounded-2xl border border-darker-grey">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-[#111] text-left text-grey">
                <tr>
                  <th className="p-3">Keyword</th>
                  <th className="p-3">Country</th>
                  <th className="p-3">Page</th>
                  <th className="p-3 text-right">Days</th>
                  <th className="p-3 text-right">First → now</th>
                  <th className="p-3 text-right">Impr.</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {gsc.targets.map((t) => (
                  <tr key={t.id} className="border-t border-darker-grey">
                    <td className="p-3">{t.keyword}</td>
                    <td className="p-3 uppercase">{t.market}</td>
                    <td className="max-w-[220px] truncate p-3" title={t.page}>{t.page}</td>
                    <td className="p-3 text-right">{t.days}</td>
                    <td className="p-3 text-right">{t.firstPosition ?? '–'} → {t.position ?? 'not ranking yet'}</td>
                    <td className="p-3 text-right">{num(t.impressions)}</td>
                    <td className={`p-3 ${t.trend === 'rising' ? 'text-emerald-400' : t.trend === 'falling' ? 'text-accent' : 'text-grey'}`}>
                      {t.trend === 'rising' ? '▲ rising' : t.trend === 'falling' ? '▼ falling' : t.trend === 'flat' ? '= flat' : '⏳ waiting'}
                      {t.checkpoint === 'd90' ? ' · 90-day decision' : t.checkpoint === 'd28' ? ' · 28-day check' : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}


      {snap.engine?.lastRun && (
        <Section id="engine" title="🧠 This week: content engine" hint="What the Monday agent did (content/agent/memory/last-run.md). Full report in Notion → Intelligence Hub.">
          <pre className="whitespace-pre-wrap rounded-2xl border border-darker-grey bg-[#0d0d0d] p-5 font-sans text-sm leading-relaxed text-grey">{snap.engine.lastRun}</pre>
        </Section>
      )}

      {snap.engine?.opportunities && (
        <Section id="opportunities" title="💰 Opportunities" hint="Other revenue found by the agent. You decide in Notion (💰 Opportunities): ✅ Go or ❌ No. Nothing is built without ✅ Go.">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {snap.engine.opportunities.items.map((o) => (
              <div key={o.name} className="rounded-2xl border border-darker-grey bg-[#0d0d0d] p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{o.name}</h3>
                  <span className="shrink-0 rounded-full border border-darker-grey px-2 py-0.5 text-xs">{o.status}</span>
                </div>
                <p className="mt-2 text-sm text-grey">
                  {o.volume ? `${num(o.volume)} searches/mo` : ''}{o.kd != null ? ` · KD ${o.kd}` : ''}{o.markets?.length ? ` · ${o.markets.join(', ')}` : ''}
                </p>
                {o.sell?.length ? <p className="mt-1 text-sm">Sell: {o.sell.join(', ')}</p> : null}
                {o.next && <p className="mt-2 text-sm text-grey">Next: {o.next}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {snap.engine?.aiVisibility && (
        <Section id="chatgpt" title={`💬 ChatGPT citations: ${snap.engine.aiVisibility.cited} / ${snap.engine.aiVisibility.total}`} hint={`Each Monday we ask ChatGPT our target keywords (DataForSEO) and check if it cites us. Last check ${snap.engine.aiVisibility.date}${snap.engine.aiVisibility.previous ? `, previous ${snap.engine.aiVisibility.previous.date}: ${snap.engine.aiVisibility.previous.cited} cited` : ''}. "Seen" = ChatGPT read our page but didn't cite it.`}>
          <div className="rounded-2xl border border-darker-grey bg-[#0d0d0d] p-5">
            <ul className="space-y-2 text-sm">
              {snap.engine.aiVisibility.rows.map((r) => (
                <li key={`${r.keyword}-${r.market}`} className="flex flex-wrap justify-between gap-2">
                  <span>{r.cited ? '✅' : r.retrieved ? '👀' : '·'} {r.keyword} <span className="uppercase text-grey">{r.market}</span></span>
                  <span className="text-xs text-grey">cites: {r.top.join(', ') || '–'}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {snap.engine?.competitors && (
        <Section id="competitors" title="🥊 Competitors" hint={`Top 5 agencies per market on our keywords (refreshed monthly, last ${snap.engine.competitors.updated}). Strength 0–100 = their authority. Link ideas = sites linking to ≥2 of them but not to us (vetted before becoming missions).`}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(snap.engine.competitors.markets).map(([m, d]) => (
              <div key={m} className="rounded-2xl border border-darker-grey bg-[#0d0d0d] p-5">
                <h3 className="font-semibold uppercase">{m}</h3>
                <ul className="mt-3 space-y-1 text-sm">
                  {d.agencies.map((a) => (
                    <li key={a.domain} className="flex justify-between gap-3">
                      <a href={`https://${a.domain}`} target="_blank" rel="noopener noreferrer" className="truncate hover:text-accent">{a.domain}</a>
                      <span className="shrink-0 text-grey">strength {a.strength ?? '–'}</span>
                    </li>
                  ))}
                </ul>
                {d.directories.length > 0 && <p className="mt-3 text-xs text-grey">Directories ranking: {d.directories.join(', ')}</p>}
                {snap.engine?.linkIdeas?.[m] && (
                  <p className="mt-2 text-xs text-grey">
                    💡 {snap.engine.linkIdeas[m].total} link ideas · top: {snap.engine.linkIdeas[m].top.slice(0, 3).map((i) => `${i.domain} (${i.competitors})`).join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {gsc && (
        <Section id="google" title="Google: last 90 days" hint="Impressions per day (red) and clicks per day (white). Hover a bar for the number.">
          <div className="rounded-2xl border border-darker-grey bg-[#0d0d0d] p-5">
            <Bars data={gsc.daily.map((d) => ({ label: d.date, value: d.impressions }))} />
            <div className="mt-3" />
            <Bars data={gsc.daily.map((d) => ({ label: d.date, value: d.clicks }))} color="#FFFFFF" height={50} />
            <div className="mt-2 flex justify-between text-xs text-medium-grey">
              <span>{gsc.daily[0]?.date}</span>
              <span>{gsc.daily[gsc.daily.length - 1]?.date}</span>
            </div>
          </div>
        </Section>
      )}

      {gsc && (
        <Section
          title="Click rate vs the market"
          hint="Market click rate by Google position (2026 studies). Our target is 1.4× the market. Below market for 28 days → rewrite the title and description first."
        >
          <div className="overflow-x-auto rounded-2xl border border-darker-grey">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-[#111] text-left text-grey">
                <tr>
                  <th className="p-3">Page</th>
                  <th className="p-3 text-right">Impr.</th>
                  <th className="p-3 text-right">Clicks</th>
                  <th className="p-3 text-right">Position</th>
                  <th className="p-3 text-right">Our CTR</th>
                  <th className="p-3 text-right">Market / target</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedPages.slice(0, 30).map((p) => (
                  <tr key={p.url} className="border-t border-darker-grey">
                    <td className="max-w-[260px] truncate p-3" title={p.url}>{p.url}</td>
                    <td className="p-3 text-right">{num(p.impressions)}</td>
                    <td className="p-3 text-right">{num(p.clicks)}</td>
                    <td className="p-3 text-right">{p.position.toFixed(1)}</td>
                    <td className="p-3 text-right">{pct(p.ctr)}</td>
                    <td className="p-3 text-right text-grey">{pct(p.marketCtr)} / {pct(p.targetCtr)}</td>
                    <td className={`p-3 ${STATUS[p.status]?.[1]}`}>{STATUS[p.status]?.[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {gsc && (
        <Section title="What people search to find us (28 days)">
          <div className="overflow-x-auto rounded-2xl border border-darker-grey">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-[#111] text-left text-grey">
                <tr>
                  <th className="p-3">Search</th>
                  <th className="p-3 text-right">Impr.</th>
                  <th className="p-3 text-right">Clicks</th>
                  <th className="p-3 text-right">Position</th>
                </tr>
              </thead>
              <tbody>
                {gsc.queries.slice(0, 20).map((q) => (
                  <tr key={q.query} className="border-t border-darker-grey">
                    <td className="p-3">{q.query}</td>
                    <td className="p-3 text-right">{num(q.impressions)}</td>
                    <td className="p-3 text-right">{num(q.clicks)}</td>
                    <td className="p-3 text-right">{q.position.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {aiBots && (
        <Section id="ai" title="🤖 AI visits (30 days)" hint="Logged on every page view by an AI bot. 'Live answer' = someone asked that AI a question and it read our page to answer.">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-darker-grey bg-[#0d0d0d] p-5">
              <h3 className="font-semibold">Who visited</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {aiBots.byBot.map((b) => (
                  <li key={b.bot} className="flex justify-between gap-3">
                    <span>
                      {b.bot} <span className="text-medium-grey">· {GROUP_LABEL[b.group]}</span>
                    </span>
                    <span className="font-semibold">{b.visits}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-darker-grey bg-[#0d0d0d] p-5">
              <h3 className="font-semibold">Pages AI reads most (without Google/Bing)</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {aiBots.topPages.map((p) => (
                  <li key={p.path} className="flex justify-between gap-3">
                    <span className="truncate">{p.path}</span>
                    <span className="font-semibold">{p.visits}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Bars data={aiBots.daily.map((d) => ({ label: d.date, value: d.visits }))} height={50} />
              </div>
            </div>
          </div>
        </Section>
      )}

      {health && health.broken.length > 0 && (
        <Section title="⚠️ Broken pages">
          <ul className="space-y-1 text-sm">
            {health.broken.map((b) => (
              <li key={b.url}>{b.status} · {b.url}</li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  );
}
