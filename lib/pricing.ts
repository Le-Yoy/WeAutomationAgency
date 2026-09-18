// Geo-aware pricing: currency follows the visitor's COUNTRY (Vercel geo-IP),
// independent of the page language. Prices are value-based per market
// (Morocco benchmarked to local competitors; Western markets priced higher).
import type { SiteLocale } from './i18n';

export type Currency = 'MAD' | 'EUR' | 'GBP' | 'USD';

// Eurozone ISO country codes → EUR (Spain, France, etc.)
const EUROZONE = new Set([
  'FR', 'ES', 'DE', 'IT', 'PT', 'NL', 'BE', 'IE', 'AT', 'FI',
  'GR', 'LU', 'SK', 'SI', 'EE', 'LV', 'LT', 'CY', 'MT', 'HR',
]);

/** Map a visitor's country code to the currency we show. Default USD. */
export function currencyForCountry(country?: string | null): Currency {
  if (!country) return 'USD';
  const c = country.toUpperCase();
  if (c === 'MA') return 'MAD';
  if (c === 'GB') return 'GBP';
  if (EUROZONE.has(c)) return 'EUR';
  return 'USD';
}

export interface Tier {
  key: string;
  name: string;
  blurb: string;
  cadence: string; // localized display suffix, e.g. "one-time" | "/mo" | ""
  prices: Record<Currency, string>;
  features: string[];
  cta: string;
  highlight?: boolean;
}

// Prices are the same numbers regardless of page language — only currency changes.
const PRICES: Record<string, Record<Currency, string>> = {
  'audit-free': { MAD: 'Free', EUR: 'Free', GBP: 'Free', USD: 'Free' },
  'audit-plan': { MAD: '3,000 DH', EUR: '€690', GBP: '£590', USD: '$790' },
  setup: { MAD: 'from 7,000 DH', EUR: 'from €2,400', GBP: 'from £2,100', USD: 'from $2,900' },
  retainer: { MAD: 'from 4,500 DH', EUR: 'from €890', GBP: 'from £790', USD: 'from $1,190' },
};

type TierText = Omit<Tier, 'prices'>;

const TIER_TEXT: Record<SiteLocale, TierText[]> = {
  en: [
    { key: 'audit-free', name: 'Free AI Visibility Audit', cadence: '', blurb: 'We check whether ChatGPT, Perplexity & Google AI actually surface your business — and show you what’s missing.', features: ['AI-citation check across ChatGPT, Perplexity & Google AI Overviews', 'Top-line “what’s missing” report', 'No commitment'], cta: 'Get my free audit' },
    { key: 'audit-plan', name: 'GEO Audit + Action Plan', cadence: 'one-time', blurb: 'The full picture: where you stand in AI answers, every gap, and a prioritized plan to fix it.', features: ['Deep audit across AI engines + your competitors', 'Structured-data & content-answer gap analysis', 'Prioritized, do-this-next action plan'], cta: 'Book my audit' },
    { key: 'setup', name: 'GEO Setup', cadence: 'one-time', blurb: 'We implement the plan — structured data, answer-formatted content, technical fixes — so AI can cite you.', features: ['Schema / structured-data implementation', 'Answer-formatted content blocks', 'Entity & brand setup + technical fixes'], cta: 'Start my setup' },
    { key: 'retainer', name: 'GEO Retainer', cadence: '/mo', blurb: 'Ongoing visibility — with a live dashboard that proves when AI answers actually cite you.', features: ['AI-citation monitoring dashboard (see when you’re cited)', 'Monthly answer-optimized content', 'Re-optimization + reporting'], cta: 'Talk to us', highlight: true },
  ],
  fr: [
    { key: 'audit-free', name: 'Audit de visibilité IA gratuit', cadence: '', blurb: 'On vérifie si ChatGPT, Perplexity et l’IA de Google font vraiment remonter votre entreprise — et on vous montre ce qui manque.', features: ['Vérification des citations dans ChatGPT, Perplexity & AI Overviews', 'Rapport « ce qui manque » synthétique', 'Sans engagement'], cta: 'Mon audit gratuit' },
    { key: 'audit-plan', name: 'Audit GEO + plan d’action', cadence: 'unique', blurb: 'La vue complète : où vous en êtes dans les réponses IA, chaque lacune, et un plan priorisé pour y remédier.', features: ['Audit approfondi des moteurs IA + vos concurrents', 'Analyse des données structurées & des réponses manquantes', 'Plan d’action priorisé, à faire ensuite'], cta: 'Réserver mon audit' },
    { key: 'setup', name: 'Mise en place GEO', cadence: 'unique', blurb: 'On implémente le plan — données structurées, contenu formaté pour les réponses, correctifs techniques — pour que l’IA vous cite.', features: ['Implémentation des données structurées (schema)', 'Blocs de contenu formatés pour les réponses', 'Configuration entité & marque + correctifs techniques'], cta: 'Lancer ma mise en place' },
    { key: 'retainer', name: 'Suivi GEO (mensuel)', cadence: '/mois', blurb: 'Visibilité continue — avec un tableau de bord qui prouve quand les réponses IA vous citent.', features: ['Tableau de bord de suivi des citations IA (voyez quand on vous cite)', 'Contenu mensuel optimisé pour les réponses', 'Ré-optimisation + reporting'], cta: 'Parlons-en', highlight: true },
  ],
  es: [
    { key: 'audit-free', name: 'Auditoría de visibilidad en IA gratis', cadence: '', blurb: 'Comprobamos si ChatGPT, Perplexity y la IA de Google muestran de verdad tu negocio — y te enseñamos qué falta.', features: ['Comprobación de citas en ChatGPT, Perplexity y AI Overviews', 'Informe resumido de «qué falta»', 'Sin compromiso'], cta: 'Mi auditoría gratis' },
    { key: 'audit-plan', name: 'Auditoría GEO + plan de acción', cadence: 'único', blurb: 'El cuadro completo: dónde estás en las respuestas de IA, cada hueco y un plan priorizado para arreglarlo.', features: ['Auditoría profunda de los motores de IA + tus competidores', 'Análisis de datos estructurados y respuestas que faltan', 'Plan de acción priorizado, qué hacer ya'], cta: 'Reservar mi auditoría' },
    { key: 'setup', name: 'Implementación GEO', cadence: 'único', blurb: 'Implementamos el plan — datos estructurados, contenido formateado para respuestas, arreglos técnicos — para que la IA te cite.', features: ['Implementación de datos estructurados (schema)', 'Bloques de contenido formateados para respuestas', 'Configuración de entidad y marca + arreglos técnicos'], cta: 'Empezar mi implementación' },
    { key: 'retainer', name: 'Retainer GEO (mensual)', cadence: '/mes', blurb: 'Visibilidad continua — con un panel que demuestra cuándo las respuestas de IA te citan.', features: ['Panel de seguimiento de citas de IA (ve cuándo te citan)', 'Contenido mensual optimizado para respuestas', 'Re-optimización + informes'], cta: 'Hablemos', highlight: true },
  ],
};

/** Localized tiers with the correct prices merged in. */
export function getTiers(locale: SiteLocale): Tier[] {
  return TIER_TEXT[locale].map((t) => ({ ...t, prices: PRICES[t.key] }));
}
