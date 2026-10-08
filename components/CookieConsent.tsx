'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { splitLocale, type SiteLocale } from '@/lib/i18n';
import {
  META_PIXEL_ID,
  OPEN_CONSENT_EVENT,
  loadMetaPixel,
  readConsent,
  trackEvent,
  writeConsent,
  type Consent,
} from '@/lib/tracking';

const COPY: Record<SiteLocale, { text: string; accept: string; reject: string; policy: string }> = {
  en: {
    text: 'We use cookies (Meta Pixel) to measure our ads.',
    accept: 'Accept',
    reject: 'Reject',
    policy: 'Details',
  },
  fr: {
    text: 'Nous utilisons des cookies (pixel Meta) pour mesurer nos publicités.',
    accept: 'Accepter',
    reject: 'Refuser',
    policy: 'En savoir plus',
  },
  es: {
    text: 'Usamos cookies (píxel de Meta) para medir nuestros anuncios.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    policy: 'Más info',
  },
};

export default function CookieConsent() {
  const pathname = usePathname() || '/';
  const { locale } = splitLocale(pathname);
  const t = COPY[locale];
  const [open, setOpen] = useState(false);
  const firstPath = useRef(pathname);

  // On load: apply a stored choice, or ask (only when there is a Pixel to consent to).
  useEffect(() => {
    const stored = readConsent();
    if (stored === 'granted') loadMetaPixel();
    else if (stored === null && META_PIXEL_ID) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Client-side navigations don't reload the page, so report them to the Pixel.
  useEffect(() => {
    if (pathname === firstPath.current) return;
    firstPath.current = pathname;
    trackEvent('PageView');
  }, [pathname]);

  const choose = (value: Consent) => {
    const previous = readConsent();
    writeConsent(value);
    setOpen(false);
    if (value === 'granted') loadMetaPixel();
    // Withdrawing consent after the Pixel loaded: reload so it stops running.
    else if (previous === 'granted' && window.fbq) window.location.reload();
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.policy}
      className="fixed bottom-4 left-4 right-4 z-[100] mb-[env(safe-area-inset-bottom,0px)] sm:right-auto sm:max-w-sm"
    >
      <div className="rounded-xl border border-grey/15 bg-darker-grey/95 p-3 shadow-xl backdrop-blur">
        <p className="text-xs leading-snug text-grey">
          {t.text}{' '}
          <a href="/cookies" className="text-accent hover:underline">
            {t.policy}
          </a>
        </p>
        <div className="mt-2.5 flex gap-2">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="flex-1 rounded-pill border border-grey/30 px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-secondary"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="flex-1 rounded-pill bg-accent px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:bg-darker-orange"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
