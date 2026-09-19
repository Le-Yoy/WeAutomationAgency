import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EmailAutomationView from '@/components/services/EmailAutomationView';
import { NON_DEFAULT_SITE_LOCALES, type SiteLocale } from '@/lib/i18n';

export const dynamicParams = false;
const BASE = '/services/email-automation';

function isNonDefault(l: string): l is SiteLocale {
  return (NON_DEFAULT_SITE_LOCALES as string[]).includes(l);
}

const META: Record<'fr' | 'es', { title: string; description: string }> = {
  fr: {
    title: 'Automatisation d’e-mails qui convertit — WeAutomationAgency',
    description: 'Des séquences d’e-mails intelligentes qui s’adaptent au comportement et délivrent le bon message au bon moment. Personnalisation à grande échelle, tests A/B, optimisation continue.',
  },
  es: {
    title: 'Automatización de e-mails que convierte — WeAutomationAgency',
    description: 'Secuencias de e-mail inteligentes que se adaptan al comportamiento y envían el mensaje correcto en el momento justo. Personalización a escala, tests A/B y optimización continua.',
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
  return <EmailAutomationView locale={params.locale as SiteLocale} />;
}
