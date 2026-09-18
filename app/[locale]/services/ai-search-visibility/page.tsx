import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import AiSearchVisibilityView from '@/components/services/AiSearchVisibilityView';
import { currencyForCountry } from '@/lib/pricing';
import { NON_DEFAULT_SITE_LOCALES, type SiteLocale } from '@/lib/i18n';

const BASE = '/services/ai-search-visibility';

function isNonDefault(l: string): l is SiteLocale {
  return (NON_DEFAULT_SITE_LOCALES as string[]).includes(l);
}

const META: Record<'fr' | 'es', { title: string; description: string }> = {
  fr: {
    title: 'Services de visibilité IA (GEO) — être cité dans ChatGPT & l’IA de Google',
    description:
      'Faites citer votre entreprise dans ChatGPT, Perplexity et les AI Overviews de Google. Audits, mise en place et suivi GEO/AEO — avec un tableau de bord qui le prouve. Audit de visibilité IA gratuit.',
  },
  es: {
    title: 'Servicios de visibilidad en IA (GEO) — que te citen en ChatGPT y la IA de Google',
    description:
      'Haz que citen a tu negocio en ChatGPT, Perplexity y las AI Overviews de Google. Auditorías, implementación y seguimiento GEO/AEO — con un panel que lo demuestra. Auditoría de visibilidad en IA gratis.',
  },
};

// Dynamic (reads geo header for currency) — no generateStaticParams; locale is
// validated below and non-fr/es 404s.
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isNonDefault(params.locale)) return {};
  const locale = params.locale as 'fr' | 'es';
  const m = META[locale];
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${locale}${BASE}`,
      languages: {
        en: BASE,
        fr: `/fr${BASE}`,
        es: `/es${BASE}`,
        'x-default': BASE,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://weautomationagency.com/${locale}${BASE}`,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isNonDefault(params.locale)) notFound();
  const locale = params.locale as SiteLocale;
  const currency = currencyForCountry(headers().get('x-vercel-ip-country'));
  return <AiSearchVisibilityView locale={locale} currency={currency} />;
}
