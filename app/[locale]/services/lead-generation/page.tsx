import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LeadGenerationView from '@/components/services/LeadGenerationView';
import { NON_DEFAULT_SITE_LOCALES, type SiteLocale } from '@/lib/i18n';

export const dynamicParams = false;
const BASE = '/services/lead-generation';

function isNonDefault(l: string): l is SiteLocale {
  return (NON_DEFAULT_SITE_LOCALES as string[]).includes(l);
}

const META: Record<'fr' | 'es', { title: string; description: string }> = {
  fr: {
    title: 'Génération de leads automatisée qui remplit votre pipeline — WeAutomationAgency',
    description: 'Une génération de leads par IA qui trouve, qualifie et nourrit automatiquement vos clients idéaux. Prospection, qualification intelligente et séquences de nurturing qui convertissent.',
  },
  es: {
    title: 'Generación de leads automatizada que llena tu pipeline — WeAutomationAgency',
    description: 'Generación de leads con IA que encuentra, califica y nutre automáticamente a tus clientes ideales. Prospección, cualificación inteligente y secuencias de nurturing que convierten.',
  },
};

export function generateStaticParams() {
  return NON_DEFAULT_SITE_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isNonDefault(params.locale)) return {};
  const locale = params.locale as 'fr' | 'es';
  const m = META[locale];
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${locale}${BASE}`, languages: { en: BASE, fr: `/fr${BASE}`, es: `/es${BASE}`, 'x-default': BASE } },
    openGraph: { title: m.title, description: m.description, url: `https://weautomationagency.com/${locale}${BASE}`, type: 'website' },
    robots: { index: true, follow: true },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isNonDefault(params.locale)) notFound();
  return <LeadGenerationView locale={params.locale as SiteLocale} />;
}
