import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// On the homepage only, send visitors to their language (browser language, with
// Morocco → French bias). Remembered via a cookie so it never fights a manual
// switch, and Googlebot (US, English) still sees the English root — SEO-safe.
export function middleware(req: NextRequest) {
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

export const config = {
  matcher: ['/'],
};
