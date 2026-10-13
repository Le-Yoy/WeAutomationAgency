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
    title: 'Génération de leads automatisée | WeAutomationAgency',
    description: 'Une génération de leads par IA qui trouve, qualifie et relance automatiquement vos clients idéaux : prospection, qualification et séquences de suivi.',
  },
  es: {
    title: 'Generación de leads automatizada | WeAutomationAgency',
    description: 'Generación de leads con IA que encuentra, califica y nutre a tus clientes ideales de forma automática: prospección, cualificación y seguimiento.',
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
