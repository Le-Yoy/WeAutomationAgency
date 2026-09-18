import Link from 'next/link';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getTiers, type Currency } from '@/lib/pricing';
import { localizedPath, type SiteLocale } from '@/lib/i18n';

interface Dict {
  eyebrow: string;
  h1: string;
  sub: string;
  ctaAudit: string;
  ctaGuide: string;
  stats: { stat: string; label: string }[];
  pricingTitle: string;
  pricingSub: string;
  whyTitle: string;
  why: { t: string; d: string }[];
  finalTitle: string;
  finalSub: string;
  finalCta: string;
}

const DICT: Record<SiteLocale, Dict> = {
  en: {
    eyebrow: 'AI Search Visibility',
    h1: 'Get your business cited inside ChatGPT, Perplexity & Google AI',
    sub: 'Your customers now ask AI, not just Google. If the AI doesn’t mention you, you don’t exist to that buyer. We make your business the answer — and prove it with monitoring.',
    ctaAudit: 'Get my free AI visibility audit',
    ctaGuide: 'What is GEO? Read the guide →',
    stats: [
      { stat: '~97%', label: 'of Google "People Also Ask" is now AI-generated' },
      { stat: '~50%', label: 'of B2B buyers start research in an AI chatbot' },
      { stat: '#1', label: 'question we get: "does AI even know we exist?"' },
    ],
    pricingTitle: 'Simple, transparent pricing',
    pricingSub: 'Start free. Scale into setup and ongoing monitoring when you’re ready.',
    whyTitle: 'Why us — not a content-only shop',
    why: [
      { t: 'A dashboard that proves it', d: 'You see exactly when ChatGPT, Perplexity & Google AI cite you — not vague promises.' },
      { t: 'Marketing × engineering', d: 'We do the content AND the technical plumbing (schema, automation) a marketing shop can’t.' },
      { t: 'Automation-powered', d: 'Structured data and monitoring kept current automatically, not hand-edited once.' },
      { t: 'Founder-led', d: 'You work with the people who build it — accountable, not a faceless agency.' },
    ],
    finalTitle: 'See if AI can find you — free',
    finalSub: 'We’ll check whether the AI engines surface your business and show you exactly what’s missing. No pressure.',
    finalCta: 'Get my free audit',
  },
  fr: {
    eyebrow: 'Visibilité dans l’IA',
    h1: 'Faites citer votre entreprise dans ChatGPT, Perplexity & l’IA de Google',
    sub: 'Vos clients interrogent désormais l’IA, pas seulement Google. Si l’IA ne vous mentionne pas, vous n’existez pas pour cet acheteur. On fait de votre entreprise la réponse — et on le prouve par le suivi.',
    ctaAudit: 'Obtenir mon audit de visibilité IA gratuit',
    ctaGuide: 'C’est quoi le GEO ? Lire le guide →',
    stats: [
      { stat: '~97 %', label: 'du bloc « Autres questions » de Google est désormais généré par IA' },
      { stat: '~50 %', label: 'des acheteurs B2B commencent leur recherche dans un chatbot IA' },
      { stat: 'N°1', label: 'question qu’on nous pose : « l’IA sait-elle qu’on existe ? »' },
    ],
    pricingTitle: 'Des tarifs simples et clairs',
    pricingSub: 'Commencez gratuitement. Passez à la mise en place et au suivi quand vous êtes prêt.',
    whyTitle: 'Pourquoi nous — pas une simple agence de contenu',
    why: [
      { t: 'Un tableau de bord qui le prouve', d: 'Vous voyez exactement quand ChatGPT, Perplexity & l’IA de Google vous citent — pas de promesses vagues.' },
      { t: 'Marketing × ingénierie', d: 'On fait le contenu ET la partie technique (schema, automatisation) qu’une agence marketing ne peut pas.' },
      { t: 'Propulsé par l’automatisation', d: 'Données structurées et suivi maintenus à jour automatiquement, pas une seule fois à la main.' },
      { t: 'Dirigé par le fondateur', d: 'Vous travaillez avec ceux qui construisent — responsables, pas une agence sans visage.' },
    ],
    finalTitle: 'Voyez si l’IA vous trouve — gratuitement',
    finalSub: 'On vérifie si les moteurs IA font remonter votre entreprise et on vous montre exactement ce qui manque. Sans pression.',
    finalCta: 'Obtenir mon audit gratuit',
  },
  es: {
    eyebrow: 'Visibilidad en la IA',
    h1: 'Haz que citen a tu negocio en ChatGPT, Perplexity y la IA de Google',
    sub: 'Tus clientes ahora preguntan a la IA, no solo a Google. Si la IA no te menciona, no existes para ese comprador. Hacemos que tu negocio sea la respuesta — y lo demostramos con seguimiento.',
    ctaAudit: 'Conseguir mi auditoría de visibilidad en IA gratis',
    ctaGuide: '¿Qué es el GEO? Lee la guía →',
    stats: [
      { stat: '~97 %', label: 'del bloque «Otras preguntas» de Google ya lo genera la IA' },
      { stat: '~50 %', label: 'de los compradores B2B empiezan su investigación en un chatbot de IA' },
      { stat: 'N.º 1', label: 'pregunta que nos hacen: «¿la IA sabe que existimos?»' },
    ],
    pricingTitle: 'Precios simples y transparentes',
    pricingSub: 'Empieza gratis. Pasa a la implementación y al seguimiento cuando estés listo.',
    whyTitle: 'Por qué nosotros — no una agencia solo de contenido',
    why: [
      { t: 'Un panel que lo demuestra', d: 'Ves exactamente cuándo ChatGPT, Perplexity y la IA de Google te citan — no promesas vagas.' },
      { t: 'Marketing × ingeniería', d: 'Hacemos el contenido Y la parte técnica (schema, automatización) que una agencia de marketing no puede.' },
      { t: 'Impulsado por automatización', d: 'Datos estructurados y seguimiento al día automáticamente, no editados una sola vez a mano.' },
      { t: 'Dirigido por el fundador', d: 'Trabajas con quienes lo construyen — responsables, no una agencia sin rostro.' },
    ],
    finalTitle: 'Comprueba si la IA te encuentra — gratis',
    finalSub: 'Comprobamos si los motores de IA muestran tu negocio y te enseñamos exactamente qué falta. Sin presión.',
    finalCta: 'Conseguir mi auditoría gratis',
  },
};

export default function AiSearchVisibilityView({
  locale,
  currency,
}: {
  locale: SiteLocale;
  currency: Currency;
}) {
  const t = DICT[locale];
  const tiers = getTiers(locale);
  const guideHref = localizedPath(locale, '/blog/ai-search-visibility-geo');

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero */}
      <section className="pt-32 pb-16 px-5 sm:px-8 lg:px-12 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-accent text-sm font-semibold uppercase tracking-wide">{t.eyebrow}</p>
            <LanguageSwitcher theme="light" />
          </div>
          <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] font-bold leading-tight mb-6 text-neutral-900">
            {t.h1}
            <span className="text-accent">.</span>
          </h1>
          <p className="text-neutral-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">{t.sub}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/start" className="bg-accent hover:bg-darker-orange text-white font-medium px-8 py-4 rounded-pill transition-colors">
              {t.ctaAudit}
            </Link>
            <Link href={guideHref} className="text-accent hover:text-darker-orange font-medium">
              {t.ctaGuide}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-3">
          {t.stats.map((s, i) => (
            <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
              <div className="text-3xl font-bold text-accent mb-2">{s.stat}</div>
              <p className="text-neutral-600 text-sm leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-t border-neutral-200 bg-neutral-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-neutral-900">{t.pricingTitle}</h2>
            <p className="text-neutral-600">{t.pricingSub}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className={
                  tier.highlight
                    ? 'relative flex flex-col bg-white border-2 border-accent rounded-2xl p-6 shadow-sm'
                    : 'relative flex flex-col bg-white border border-neutral-200 rounded-2xl p-6'
                }
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-neutral-900">{tier.prices[currency]}</span>
                  {tier.cadence && <span className="text-neutral-500 text-sm ml-1">{tier.cadence}</span>}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-5">{tier.blurb}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-600 text-sm">
                      <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/start"
                  className={
                    tier.highlight
                      ? 'text-center bg-accent hover:bg-darker-orange text-white font-medium px-5 py-3 rounded-pill transition-colors'
                      : 'text-center border border-neutral-300 hover:border-accent text-neutral-900 font-medium px-5 py-3 rounded-pill transition-colors'
                  }
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-neutral-900">{t.whyTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {t.why.map((x, i) => (
              <div key={i} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{x.t}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-neutral-900">{t.finalTitle}</h2>
          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">{t.finalSub}</p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-accent hover:bg-darker-orange text-white font-medium px-8 py-4 rounded-pill transition-colors">
            {t.finalCta}
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
