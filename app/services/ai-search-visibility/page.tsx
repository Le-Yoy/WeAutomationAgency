import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import Footer from '@/components/Footer';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import { TIERS, currencyForCountry } from '@/lib/pricing';

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
  alternates: { canonical: '/services/ai-search-visibility' },
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

export default function AISearchVisibilityPage() {
  const country = headers().get('x-vercel-ip-country');
  const defaultCurrency = currencyForCountry(country);

  const stats = [
    { stat: '~97%', label: 'of Google "People Also Ask" is now AI-generated' },
    { stat: '~50%', label: 'of B2B buyers start research in an AI chatbot' },
    { stat: '#1', label: 'question we get: "does AI even know we exist?"' },
  ];

  return (
    <main className="min-h-screen bg-primary text-secondary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 px-5 sm:px-8 lg:px-12 border-b border-grey/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent text-sm font-semibold uppercase tracking-wide mb-4">
            AI Search Visibility
          </p>
          <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-tight mb-6">
            Get your business cited inside ChatGPT, Perplexity &amp; Google AI
            <span className="text-accent">.</span>
          </h1>
          <p className="text-grey text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
            Your customers now ask AI, not just Google. If the AI doesn’t mention you, you don’t
            exist to that buyer. We make your business the answer — and prove it with monitoring.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/start"
              className="bg-accent hover:bg-darker-orange text-secondary font-medium px-8 py-4 rounded-pill transition-colors"
            >
              Get my free AI visibility audit
            </Link>
            <Link
              href="/blog/ai-search-visibility-geo"
              className="text-accent hover:text-darker-orange font-medium"
            >
              What is GEO? Read the guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Urgency stats */}
      <section className="py-16 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-darker-grey/40 border border-grey/10 rounded-2xl p-6">
              <div className="text-3xl font-bold text-accent mb-2">{s.stat}</div>
              <p className="text-grey text-sm leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-t border-grey/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-grey">
              Start free. Scale into setup and ongoing monitoring when you’re ready.
            </p>
          </div>
          <CurrencySwitcher tiers={TIERS} defaultCurrency={defaultCurrency} />
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-t border-grey/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">
            Why us — not a content-only shop
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { t: 'A dashboard that proves it', d: 'You see exactly when ChatGPT, Perplexity & Google AI cite you — not vague promises.' },
              { t: 'Marketing × engineering', d: 'We do the content AND the technical plumbing (schema, automation) a marketing shop can’t.' },
              { t: 'Automation-powered', d: 'Structured data and monitoring kept current automatically, not hand-edited once.' },
              { t: 'Founder-led', d: 'You work with the people who build it — accountable, not a faceless agency.' },
            ].map((x, i) => (
              <div key={i} className="bg-darker-grey/40 border border-grey/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-secondary mb-2">{x.t}</h3>
                <p className="text-grey text-sm leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 border-t border-grey/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See if AI can find you — free
          </h2>
          <p className="text-grey mb-8 max-w-xl mx-auto">
            We’ll check whether the AI engines surface your business and show you exactly what’s
            missing. No pressure.
          </p>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 bg-accent hover:bg-darker-orange text-secondary font-medium px-8 py-4 rounded-pill transition-colors"
          >
            Get my free audit
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
