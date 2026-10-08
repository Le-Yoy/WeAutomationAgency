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
    text: "We use Meta's tracking pixel to measure our ads and show them to the right people (using a scrambled version of the email or phone you give us). It only runs if you accept. Essential cookies (like your language choice) are always on.",
    accept: 'Accept',
    reject: 'Reject',
    policy: 'Cookie policy',
  },
  fr: {
    text: "Nous utilisons le pixel de Meta pour mesurer nos publicités et les montrer aux bonnes personnes (à partir d'une version chiffrée de l'e-mail ou du téléphone que vous nous donnez). Il ne s'active que si vous l'acceptez. Les cookies essentiels (comme votre choix de langue) restent toujours actifs.",
    accept: 'Accepter',
    reject: 'Refuser',
    policy: 'Politique de cookies',
  },
  es: {
    text: 'Usamos el píxel de Meta para medir nuestros anuncios y mostrarlos a las personas adecuadas (con una versión cifrada del email o teléfono que nos das). Solo se activa si lo aceptas. Las cookies esenciales (como tu idioma) siempre están activas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    policy: 'Política de cookies',
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
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:px-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-grey/15 bg-darker-grey p-5 shadow-2xl sm:flex sm:items-center sm:gap-6 sm:p-6">
        <p className="text-sm leading-relaxed text-grey">
          {t.text}{' '}
          <a href="/cookies" className="text-accent hover:underline">
            {t.policy}
          </a>
        </p>
        <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="flex-1 rounded-pill border border-grey/30 px-5 py-2.5 text-sm font-medium text-secondary transition-colors hover:border-secondary sm:flex-none"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="flex-1 rounded-pill bg-accent px-5 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-darker-orange sm:flex-none"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
