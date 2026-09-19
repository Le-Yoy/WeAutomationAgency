import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AiChatbotView from '@/components/services/AiChatbotView';
import { NON_DEFAULT_SITE_LOCALES, type SiteLocale } from '@/lib/i18n';

export const dynamicParams = false;

const BASE = '/services/ai-chatbot';

function isNonDefault(l: string): l is SiteLocale {
  return (NON_DEFAULT_SITE_LOCALES as string[]).includes(l);
}

const META: Record<'fr' | 'es', { title: string; description: string }> = {
  fr: {
    title: 'Chatbot IA pour ecommerce, banque & support — WeAutomationAgency',
    description:
      'Des chatbots IA sur mesure qui gèrent le support, qualifient les prospects et génèrent des ventes 24h/24. Multilingues, prêts pour WhatsApp, déployés en 24-48 h.',
  },
  es: {
    title: 'Chatbot con IA para e-commerce, banca y soporte — WeAutomationAgency',
    description:
      'Chatbots con IA a medida que gestionan el soporte, califican leads y generan ventas 24/7. Multilingües, listos para WhatsApp, desplegados en 24-48 h.',
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
    alternates: {
      canonical: `/${locale}${BASE}`,
      languages: { en: BASE, fr: `/fr${BASE}`, es: `/es${BASE}`, 'x-default': BASE },
    },
    openGraph: { title: m.title, description: m.description, url: `https://weautomationagency.com/${locale}${BASE}`, type: 'website' },
    robots: { index: true, follow: true },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isNonDefault(params.locale)) notFound();
  return <AiChatbotView locale={params.locale as SiteLocale} />;
}
