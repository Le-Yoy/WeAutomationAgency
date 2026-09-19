import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CallCenterView from '@/components/services/CallCenterView';
import { NON_DEFAULT_SITE_LOCALES, type SiteLocale } from '@/lib/i18n';

export const dynamicParams = false;
const BASE = '/services/call-center';

function isNonDefault(l: string): l is SiteLocale {
  return (NON_DEFAULT_SITE_LOCALES as string[]).includes(l);
}

const META: Record<'fr' | 'es', { title: string; description: string }> = {
  fr: {
    title: 'Centre d’appels IA à qualité humaine — WeAutomationAgency',
    description: 'Une IA vocale qui répond aux appels, prend des rendez-vous et gère les demandes clients 24h/24, avec analyses et reporting en temps réel. Lancé en 2-3 semaines.',
  },
  es: {
    title: 'Centro de llamadas con IA de calidad humana — WeAutomationAgency',
    description: 'IA de voz que contesta llamadas, agenda citas y gestiona consultas 24/7, con analítica e informes en tiempo real. En marcha en 2-3 semanas.',
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
  return <CallCenterView locale={params.locale as SiteLocale} />;
}
