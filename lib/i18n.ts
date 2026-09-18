// Site-wide i18n for the MARKETING pages (home, services, start…).
// English is the default at the root path; FR/ES are prefixed (/fr, /es).
// (The blog has its own locale handling in lib/blog.ts with the same codes.)

export type SiteLocale = 'en' | 'fr' | 'es';
export const SITE_LOCALES: SiteLocale[] = ['en', 'fr', 'es'];
export const NON_DEFAULT_SITE_LOCALES: SiteLocale[] = ['fr', 'es'];
export const DEFAULT_SITE_LOCALE: SiteLocale = 'en';

export const SITE_LOCALE_LABEL: Record<SiteLocale, string> = {
  en: 'EN',
  fr: 'FR',
  es: 'ES',
};

export function isSiteLocale(v: string): v is SiteLocale {
  return (SITE_LOCALES as string[]).includes(v);
}

/** Prefix a base (English) path with the locale (default locale stays unprefixed). */
export function localizedPath(locale: SiteLocale, basePath: string): string {
  const clean = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return locale === DEFAULT_SITE_LOCALE ? clean : `/${locale}${clean}`;
}

/** Given any pathname, return { locale, basePath } (basePath is the unprefixed path). */
export function splitLocale(pathname: string): {
  locale: SiteLocale;
  basePath: string;
} {
  const seg = pathname.split('/');
  if (seg[1] === 'fr' || seg[1] === 'es') {
    const base = '/' + seg.slice(2).join('/');
    return { locale: seg[1] as SiteLocale, basePath: base === '//' ? '/' : base.replace(/\/$/, '') || '/' };
  }
  return { locale: 'en', basePath: pathname.replace(/\/$/, '') || '/' };
}
