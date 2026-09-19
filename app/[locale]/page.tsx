import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePageClient from '@/components/HomePageClient';
import { NON_DEFAULT_SITE_LOCALES, type SiteLocale } from '@/lib/i18n';

export const dynamicParams = false;

function isNonDefault(l: string): l is SiteLocale {
  return (NON_DEFAULT_SITE_LOCALES as string[]).includes(l);
}

const META: Record<'fr' | 'es', { title: string; description: string }> = {
  fr: {
    title: 'WeAutomationAgency — l’IA pour la croissance de votre entreprise',
    description:
      'Nous créons des chatbots IA, de la génération de leads automatisée, des centres d’appels intelligents et des solutions sur mesure qui font croître votre chiffre d’affaires.',
  },
  es: {
    title: 'WeAutomationAgency — IA para el crecimiento de tu negocio',
    description:
      'Creamos chatbots con IA, generación de leads automatizada, centros de llamadas inteligentes y soluciones a medida que hacen crecer tus ingresos.',
  },
};

export function generateStaticParams() {
  return NON_DEFAULT_SITE_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isNonDefault(params.locale)) return {};
  const m = META[params.locale as 'fr' | 'es'];
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${params.locale}`,
      languages: { en: '/', fr: '/fr', es: '/es', 'x-default': '/' },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://weautomationagency.com/${params.locale}`,
      type: 'website',
    },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isNonDefault(params.locale)) notFound();
  return <HomePageClient locale={params.locale as SiteLocale} />;
}
