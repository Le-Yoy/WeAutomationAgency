import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { cookies, headers } from 'next/headers';
import StartForm from '@/components/StartForm';
import { START } from '@/lib/content/start';
import { HOME } from '@/lib/content/home';
import { isSiteLocale, localizedPath, type SiteLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Get Your Free Demo — WeAutomationAgency',
  description:
    'Book your free AI automation demo. Tell us where to reach you and our team will get back to you within 24 hours.',
  robots: { index: false, follow: true },
};

function detectLocale(): SiteLocale {
  const c = cookies().get('NEXT_LOCALE')?.value;
  if (c && isSiteLocale(c)) return c;
  const al = (headers().get('accept-language') || '').toLowerCase();
  if (al.startsWith('fr')) return 'fr';
  if (al.startsWith('es')) return 'es';
  return 'en';
}

export default function StartPage() {
  const locale = detectLocale();
  const t = START[locale];

  return (
    <main className="min-h-[100dvh] bg-primary text-secondary flex flex-col">
      <header className="px-5 sm:px-8 lg:px-12 py-5 sm:py-6">
        <Link href={localizedPath(locale, '/')} aria-label="WeAutomationAgency home" className="inline-block">
          <Image src="/images/logos/WeAutomationAgency-Logo.svg" alt="WeAutomationAgency" width={200} height={50} className="h-7 sm:h-8 w-auto" priority />
        </Link>
      </header>

      <div className="flex-1 flex items-center px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="max-w-container mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-5">{t.eyebrow}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              {t.h1a}<span className="text-accent">{t.h1accent}</span>{t.h1b}
            </h1>
            <p className="text-grey text-base sm:text-lg mt-6 max-w-md leading-relaxed">{t.sub}</p>
            <ul className="mt-8 space-y-3.5">
              {t.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F94239" strokeWidth="2.5"><polyline points="2,6 5,9 10,3" /></svg>
                  </span>
                  <span className="text-secondary/80 text-sm sm:text-base leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-lg lg:justify-self-end">
            <StartForm locale={locale} />
          </div>
        </div>
      </div>

      <footer className="px-5 sm:px-8 lg:px-12 py-6 border-t border-grey/10">
        <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-grey/60 text-xs">© 2026 Boutaleb LLC. {HOME[locale].footer.rights}</p>
          <a href="mailto:ceo@weautomationagency.com" className="text-grey/60 hover:text-secondary text-xs transition-colors">ceo@weautomationagency.com</a>
        </div>
      </footer>
    </main>
  );
}
