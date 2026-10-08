// Meta Pixel + consent helpers.
// The Pixel only loads after the visitor clicks "Accept" in the cookie banner
// (EU/FR visitors require opt-in). Both IDs below are public values, not secrets.

/** Meta "dataset" (Pixel) ID from Events Manager. Empty = Pixel and banner stay off. */
export const META_PIXEL_ID = '';

/** Content of the facebook-domain-verification meta tag (Business settings → Brand safety → Domains). */
export const META_DOMAIN_VERIFICATION = '';

export const CONSENT_KEY = 'waa-consent';
export const OPEN_CONSENT_EVENT = 'waa:open-cookie-settings';

export type Consent = 'granted' | 'denied';

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked (private mode etc.) — the choice just won't be remembered.
  }
}

/** Inject Meta's base Pixel snippet once and fire the first PageView. */
export function loadMetaPixel() {
  if (!META_PIXEL_ID || typeof window === 'undefined' || window.fbq) return;

  // Same shape as Meta's official base code: calls are queued until fbevents.js loads.
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod.call(fbq, ...args);
    else fbq.queue!.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
}

/** Fire a standard Meta event — a no-op unless the visitor consented and the Pixel loaded. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', name, params);
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
