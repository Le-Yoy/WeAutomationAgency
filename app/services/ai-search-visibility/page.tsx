import type { Metadata } from 'next';
import { headers } from 'next/headers';
import AiSearchVisibilityView from '@/components/services/AiSearchVisibilityView';
import { currencyForCountry } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'AI Search Visibility (GEO) Services — Get Cited in ChatGPT & Google AI',
  description:
    'Get your business cited inside ChatGPT, Perplexity, and Google AI Overviews. GEO/AEO audits, setup, and monitoring — with a dashboard that proves when AI cites you. Free AI visibility audit.',
  keywords: [
    'AI search visibility',
    'GEO services',
    'generative engine optimization',
    'AEO agency',
    'get cited by ChatGPT',
    'Google AI Overviews optimization',
  ],
  alternates: {
    canonical: '/services/ai-search-visibility',
    languages: {
      en: '/services/ai-search-visibility',
      fr: '/fr/services/ai-search-visibility',
      es: '/es/services/ai-search-visibility',
      'x-default': '/services/ai-search-visibility',
    },
  },
  openGraph: {
    title: 'AI Search Visibility (GEO) Services — Get Cited in ChatGPT & Google AI',
    description:
      'Get cited inside ChatGPT, Perplexity, and Google AI Overviews. Audits, setup, and monitoring. Free AI visibility audit.',
    url: 'https://weautomationagency.com/services/ai-search-visibility',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Search Visibility (GEO/AEO)',
  serviceType: 'Generative Engine Optimization',
  provider: { '@id': 'https://weautomationagency.com/#organization' },
  areaServed: 'Worldwide',
  description:
    'GEO/AEO services to get a business cited inside ChatGPT, Perplexity, and Google AI Overviews — audit, setup, and monitoring.',
  url: 'https://weautomationagency.com/services/ai-search-visibility',
};

export default function Page() {
  const currency = currencyForCountry(headers().get('x-vercel-ip-country'));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AiSearchVisibilityView locale="en" currency={currency} />
    </>
  );
}
