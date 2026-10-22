import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

// AI crawlers / assistants we want to see in the logs. "-User" agents = a live fetch
// for a real person's question; the others crawl for search indexes or training.
const AI_BOTS: [string, string][] = [
  ['ChatGPT-User', 'ChatGPT (live, user question)'],
  ['OAI-SearchBot', 'ChatGPT Search (index)'],
  ['GPTBot', 'OpenAI (training)'],
  ['Perplexity-User', 'Perplexity (live, user question)'],
  ['PerplexityBot', 'Perplexity (index)'],
  ['Claude-User', 'Claude (live, user question)'],
  ['Claude-SearchBot', 'Claude Search (index)'],
  ['ClaudeBot', 'Anthropic (training)'],
  ['MistralAI-User', 'Mistral (live, user question)'],
  ['DuckAssistBot', 'DuckDuckGo AI'],
  ['Applebot', 'Apple (Siri / Apple Intelligence)'],
  ['Meta-ExternalAgent', 'Meta AI'],
  ['meta-webindexer', 'Meta AI (agent / index)'],
  ['Amazonbot', 'Amazon (Alexa)'],
  ['Bytespider', 'ByteDance'],
  ['CCBot', 'Common Crawl'],
  ['bingbot', 'Bing (also feeds Copilot / ChatGPT)'],
  ['Googlebot', 'Google (also feeds AI Overviews / Gemini)'],
];

function detectAiBot(ua: string): string | null {
  const lower = ua.toLowerCase();
  for (const [token, label] of AI_BOTS) {
    if (lower.includes(token.toLowerCase())) return label;
  }
  return null;
}

// Durable counts in Upstash Redis (free tier, added from the Vercel Marketplace).
// Without the env vars the hit is only printed to Vercel's runtime logs.
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function recordAiHit(bot: string, path: string) {
  const day = new Date().toISOString().slice(0, 10);
  console.log(JSON.stringify({ type: 'ai-bot', bot, path, day }));
  if (!REDIS_URL || !REDIS_TOKEN) return;
  const key = `ai-bots:${day}`;
  try {
    await fetch(`${REDIS_URL}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['HINCRBY', key, `${bot}|${path}`, 1],
        ['EXPIRE', key, 60 * 60 * 24 * 400],
      ]),
    });
  } catch (err) {
    console.error('ai-bot log failed (non-fatal):', err);
  }
}

// On the homepage only, send visitors to their language (browser language, with
// Morocco → French bias). Remembered via a cookie so it never fights a manual
// switch, and Googlebot (US, English) still sees the English root — SEO-safe.
function localeRedirect(req: NextRequest) {
  const cookie = req.cookies.get('NEXT_LOCALE')?.value;
  let locale = cookie;

  if (!locale) {
    const country = req.headers.get('x-vercel-ip-country');
    const al = (req.headers.get('accept-language') || '').toLowerCase();
    if (country === 'MA') {
      // Morocco: French sells best; only stay English if the browser clearly prefers it.
      locale = al.startsWith('en') ? 'en' : 'fr';
    } else if (al.startsWith('fr')) {
      locale = 'fr';
    } else if (al.startsWith('es')) {
      locale = 'es';
    } else {
      locale = 'en';
    }
  }

  const oneYear = 60 * 60 * 24 * 365;

  if (locale === 'fr' || locale === 'es') {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    const res = NextResponse.redirect(url);
    res.cookies.set('NEXT_LOCALE', locale, { maxAge: oneYear, path: '/' });
    return res;
  }

  const res = NextResponse.next();
  if (!cookie) res.cookies.set('NEXT_LOCALE', 'en', { maxAge: oneYear, path: '/' });
  return res;
}

// Private dashboard: browser login prompt, password = DASHBOARD_PASSWORD (Vercel env var).
// No env var set = dashboard closed for everyone.
function dashboardAuth(req: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD;
  const header = req.headers.get('authorization') || '';
  if (password && header.startsWith('Basic ')) {
    const decoded = atob(header.slice(6));
    if (decoded.slice(decoded.indexOf(':') + 1) === password) return null;
  }
  return new NextResponse('Login required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="WAA dashboard"', 'X-Robots-Tag': 'noindex' },
  });
}

// Files only machines read (Quentin Yacoub's method, 2026-10-22): AI agents often browse with a normal
// Chrome user agent, so any non-bot hit on these is logged as a probable AI agent.
const AGENT_FILES = /^\/(llms\.txt|llms-full\.txt|.*\.md|.*\.json)$/;

export function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    return dashboardAuth(req) || NextResponse.next({ headers: { 'X-Robots-Tag': 'noindex' } });
  }

  const bot = detectAiBot(req.headers.get('user-agent') || '');
  if (bot) event.waitUntil(recordAiHit(bot, req.nextUrl.pathname));
  else if (AGENT_FILES.test(req.nextUrl.pathname)) {
    // ChatGPT Agent and others sign requests (Web Bot Auth) → name them when we can.
    const signed = req.headers.get('signature-agent');
    event.waitUntil(recordAiHit(signed ? `AI agent (signed: ${signed.slice(0, 40)})` : 'Probable AI agent (browser UA)', req.nextUrl.pathname));
  }

  // Bots keep the plain English root (no redirect, no cookie).
  if (req.nextUrl.pathname === '/' && !bot) return localeRedirect(req);
  return NextResponse.next();
}

export const config = {
  // Every page + robots.txt / sitemap.xml / llms.txt; skip Next assets, images and API.
  matcher: ['/((?!_next/|api/|images/|fonts/|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|css|js|woff2?|mp4)$).*)'],
};
