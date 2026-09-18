// Geo-aware pricing: currency follows the visitor's COUNTRY (Vercel geo-IP),
// independent of the page language. Prices are value-based per market
// (Morocco benchmarked to local competitors; Western markets priced higher).

export type Currency = 'MAD' | 'EUR' | 'GBP' | 'USD';

export const CURRENCIES: Currency[] = ['MAD', 'EUR', 'GBP', 'USD'];

export const CURRENCY_LABEL: Record<Currency, string> = {
  MAD: 'MAD',
  EUR: '€ EUR',
  GBP: '£ GBP',
  USD: '$ USD',
};

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
  cadence: string; // "" | "one-time" | "per month"
  prices: Record<Currency, string>; // display-ready per currency
  features: string[];
  cta: string;
  highlight?: boolean;
}

// Proposed, competitor-benchmarked pricing. Morocco ≈ local market (KamaWeb:
// ~3,000 DH audit, 4,500–12,000 DH/mo). Western markets = international GEO range.
export const TIERS: Tier[] = [
  {
    key: 'audit-free',
    name: 'Free AI Visibility Audit',
    blurb: 'We check whether ChatGPT, Perplexity & Google AI actually surface your business — and show you what’s missing.',
    cadence: '',
    prices: { MAD: 'Free', EUR: 'Free', GBP: 'Free', USD: 'Free' },
    features: [
      'AI-citation check across ChatGPT, Perplexity & Google AI Overviews',
      'Top-line “what’s missing” report',
      'No commitment',
    ],
    cta: 'Get my free audit',
  },
  {
    key: 'audit-plan',
    name: 'GEO Audit + Action Plan',
    blurb: 'The full picture: where you stand in AI answers, every gap, and a prioritized plan to fix it.',
    cadence: 'one-time',
    prices: { MAD: '3,000 DH', EUR: '€690', GBP: '£590', USD: '$790' },
    features: [
      'Deep audit across AI engines + your competitors',
      'Structured-data & content-answer gap analysis',
      'Prioritized, do-this-next action plan',
    ],
    cta: 'Book my audit',
  },
  {
    key: 'setup',
    name: 'GEO Setup',
    blurb: 'We implement the plan — structured data, answer-formatted content, technical fixes — so AI can cite you.',
    cadence: 'one-time',
    prices: { MAD: 'from 7,000 DH', EUR: 'from €2,400', GBP: 'from £2,100', USD: 'from $2,900' },
    features: [
      'Schema / structured-data implementation',
      'Answer-formatted content blocks',
      'Entity & brand setup + technical fixes',
    ],
    cta: 'Start my setup',
  },
  {
    key: 'retainer',
    name: 'GEO Retainer',
    blurb: 'Ongoing visibility — with a live dashboard that proves when AI answers actually cite you.',
    cadence: 'per month',
    prices: { MAD: 'from 4,500 DH', EUR: 'from €890', GBP: 'from £790', USD: 'from $1,190' },
    features: [
      'AI-citation monitoring dashboard (see when you’re cited)',
      'Monthly answer-optimized content',
      'Re-optimization + reporting',
    ],
    cta: 'Talk to us',
    highlight: true,
  },
];
