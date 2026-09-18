'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  type Currency,
  type Tier,
  CURRENCIES,
  CURRENCY_LABEL,
} from '@/lib/pricing';

export default function CurrencySwitcher({
  tiers,
  defaultCurrency,
}: {
  tiers: Tier[];
  defaultCurrency: Currency;
}) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);

  return (
    <div>
      {/* Currency toggle */}
      <div className="flex flex-col items-center gap-3 mb-12">
        <div className="inline-flex flex-wrap justify-center gap-1 bg-darker-grey/50 border border-grey/10 rounded-pill p-1">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              aria-pressed={c === currency}
              className={
                c === currency
                  ? 'px-4 py-2 rounded-pill bg-accent text-secondary text-sm font-medium transition-colors'
                  : 'px-4 py-2 rounded-pill text-grey hover:text-secondary text-sm font-medium transition-colors'
              }
            >
              {CURRENCY_LABEL[c]}
            </button>
          ))}
        </div>
        <p className="text-grey/50 text-xs">
          Prices set by your region — switch currency anytime.
        </p>
      </div>

      {/* Tier cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <div
            key={tier.key}
            className={
              tier.highlight
                ? 'relative flex flex-col bg-darker-grey/60 border border-accent/40 rounded-2xl p-6'
                : 'relative flex flex-col bg-darker-grey/40 border border-grey/10 rounded-2xl p-6'
            }
          >
            {tier.highlight && (
              <span className="absolute -top-3 left-6 bg-accent text-secondary text-xs font-semibold px-3 py-1 rounded-pill">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-secondary mb-2">{tier.name}</h3>
            <div className="mb-4">
              <span className="text-2xl font-bold text-secondary">{tier.prices[currency]}</span>
              {tier.cadence && (
                <span className="text-grey text-sm ml-1">
                  {tier.cadence === 'per month' ? '/mo' : tier.cadence}
                </span>
              )}
            </div>
            <p className="text-grey text-sm leading-relaxed mb-5">{tier.blurb}</p>
            <ul className="space-y-2 mb-6 flex-1">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-grey text-sm">
                  <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/start"
              className={
                tier.highlight
                  ? 'text-center bg-accent hover:bg-darker-orange text-secondary font-medium px-5 py-3 rounded-pill transition-colors'
                  : 'text-center border border-grey/20 hover:border-accent text-secondary font-medium px-5 py-3 rounded-pill transition-colors'
              }
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
