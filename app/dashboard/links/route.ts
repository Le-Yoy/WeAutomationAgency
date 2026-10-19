import { NextResponse } from 'next/server';

// Link mission buttons on /dashboard (protected by the same login in middleware.ts).
// done = link obtained (keeps the link type), skip = target failed the link gate or isn't worth it.
// Either way the next target from the queue becomes today's mission.
export const dynamic = 'force-dynamic';

async function redis(commands: unknown[][]) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });
  return (await res.json()).map((r: { result: unknown }) => r.result) as (string | null)[];
}

export async function POST(req: Request) {
  const form = await req.formData();
  const action = String(form.get('action'));
  const [raw] = await redis([['GET', 'dash:links']]);
  const links = raw ? JSON.parse(raw) : { queue: [], done: [] };
  const date = new Date().toISOString().slice(0, 10);

  if (links.today && (action === 'done' || action === 'skip')) {
    links.done = [
      ...(links.done || []),
      {
        date,
        name: links.today.name,
        url: links.today.url,
        status: action === 'done' ? 'live' : 'skipped',
        linkType: action === 'done' ? String(form.get('linkType') || links.today.type) : undefined,
        profileUrl: String(form.get('profileUrl') || '') || undefined,
      },
    ];
    const next = (links.queue || []).shift();
    links.today = next ? { ...next, date } : undefined;
    await redis([['SET', 'dash:links', JSON.stringify(links)]]);
  }
  return NextResponse.redirect(new URL('/dashboard#links', req.url), 303);
}
