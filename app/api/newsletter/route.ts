import { NextResponse } from 'next/server';

// Newsletter signup → adds the subscriber to a Resend Audience + sends a welcome email.
// Uses a SEPARATE Resend account from the lead/contact pipeline (free tier), so set these
// env vars in Vercel (they are independent of RESEND_API_KEY used by /api/contact):
//   RESEND_NEWSLETTER_API_KEY   – API key of the NEW Resend account
//   RESEND_AUDIENCE_ID          – default Audience ID (fallback for every locale)
//   RESEND_AUDIENCE_ID_FR/_EN/_ES – optional per-locale Audiences (overrides the default)
//   NEWSLETTER_FROM_EMAIL       – e.g. "Houssam — WeAutomationAgency <houssam@news.weautomationagency.com>"
//   NEWSLETTER_REPLY_TO         – e.g. support@weautomationagency.com
const NL_API_KEY = process.env.RESEND_NEWSLETTER_API_KEY;
const FROM_EMAIL = process.env.NEWSLETTER_FROM_EMAIL || 'WeAutomationAgency <onboarding@resend.dev>';
const REPLY_TO = process.env.NEWSLETTER_REPLY_TO || 'support@weautomationagency.com';

type NlLocale = 'en' | 'fr' | 'es';

const audienceForLocale = (locale: NlLocale): string | undefined => {
  const perLocale = {
    fr: process.env.RESEND_AUDIENCE_ID_FR,
    en: process.env.RESEND_AUDIENCE_ID_EN,
    es: process.env.RESEND_AUDIENCE_ID_ES,
  }[locale];
  return perLocale || process.env.RESEND_AUDIENCE_ID;
};

// If no audience is pinned via env, discover the account's default audience once
// (Resend's newer UI uses a single default audience, so the ID isn't shown in the dashboard).
let cachedAudienceId: string | null = null;
async function resolveAudienceId(
  headers: Record<string, string>,
  locale: NlLocale
): Promise<string | undefined> {
  const envId = audienceForLocale(locale);
  if (envId) return envId;
  if (cachedAudienceId) return cachedAudienceId;
  try {
    const r = await fetch('https://api.resend.com/audiences', { headers });
    if (r.ok) {
      const j = await r.json();
      const id = j?.data?.[0]?.id;
      if (id) {
        cachedAudienceId = id;
        return id;
      }
    } else {
      console.error('Resend list audiences failed:', r.status, await r.text());
    }
  } catch (err) {
    console.error('Resend list audiences error:', err);
  }
  return undefined;
}

// The newsletter's public name — change here if the brand name changes.
const NL_NAME = { fr: 'Cité par l’IA', en: 'The AI Visibility Brief', es: 'Citado por la IA' };

const escapeHtml = (s: string) =>
  s.replace(/[<>&]/g, (c) => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;'));

const WELCOME: Record<NlLocale, { subject: string; lines: string[]; signoff: string; ps: string }> = {
  fr: {
    subject: `${NL_NAME.fr} — bienvenue, c’est parti`,
    lines: [
      'Bonjour,',
      `Merci de vous être inscrit(e) à <strong>${NL_NAME.fr}</strong>.`,
      'Chaque semaine, je décortique ce qui bouge dans la recherche IA (ChatGPT, Perplexity, Google AI) et je vous donne <strong>une chose concrète à faire</strong> pour que votre entreprise soit trouvée — et citée.',
      'La première édition arrive très bientôt. En attendant, vous pouvez répondre à cet e-mail et me dire sur quoi vous travaillez.',
    ],
    signoff: 'Houssam — Fondateur, WeAutomationAgency',
    ps: 'P.S. Une question ? Répondez simplement à cet e-mail, j’y réponds personnellement.',
  },
  en: {
    subject: `${NL_NAME.en} — welcome aboard`,
    lines: [
      'Hi,',
      `Thanks for subscribing to <strong>${NL_NAME.en}</strong>.`,
      'Every week I break down what’s changing in AI search (ChatGPT, Perplexity, Google AI) and give you <strong>one concrete thing to do</strong> to get your business found — and cited.',
      'The first edition lands soon. In the meantime, feel free to reply and tell me what you’re working on.',
    ],
    signoff: 'Houssam — Founder, WeAutomationAgency',
    ps: 'P.S. Got a question? Just reply to this email — I read and answer them myself.',
  },
  es: {
    subject: `${NL_NAME.es} — te damos la bienvenida`,
    lines: [
      'Hola,',
      `Gracias por suscribirte a <strong>${NL_NAME.es}</strong>.`,
      'Cada semana desgloso lo que cambia en la búsqueda con IA (ChatGPT, Perplexity, Google AI) y te doy <strong>una cosa concreta que hacer</strong> para que tu negocio aparezca — y sea citado.',
      'La primera edición llega pronto. Mientras tanto, puedes responder a este correo y contarme en qué trabajas.',
    ],
    signoff: 'Houssam — Fundador, WeAutomationAgency',
    ps: 'P.S. ¿Alguna pregunta? Responde a este correo — las leo y respondo yo mismo.',
  },
};

const welcomeHtml = (c: { lines: string[]; signoff: string; ps: string }) =>
  `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:15px;line-height:1.7;color:#1a1a1a;max-width:480px;margin:0 auto;padding:8px;">
    ${c.lines.map((l) => `<p style="margin:0 0 16px;">${l}</p>`).join('')}
    <p style="margin:24px 0 4px;">${escapeHtml(c.signoff)}</p>
    <p style="margin:20px 0 0;font-size:13px;color:#777;">${escapeHtml(c.ps)}</p>
  </div>`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawEmail = (body?.email || '').trim().toLowerCase();
    const locale: NlLocale = (['en', 'fr', 'es'].includes(body?.locale) ? body.locale : 'fr') as NlLocale;

    if (!rawEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    const email = rawEmail.slice(0, 200);

    if (!NL_API_KEY) {
      // Not configured yet — log so an early signup is never silently lost.
      console.warn('RESEND_NEWSLETTER_API_KEY not set — newsletter signup NOT stored:', email, locale);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const headers = { Authorization: `Bearer ${NL_API_KEY}`, 'Content-Type': 'application/json' };

    // 1) Add the contact to the Audience (idempotent — re-subscribing is fine).
    const audienceId = await resolveAudienceId(headers, locale);
    if (audienceId) {
      try {
        await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ email, unsubscribed: false }),
        });
      } catch (err) {
        console.error('Resend audience add failed (non-fatal):', err);
      }
    } else {
      console.warn('No RESEND_AUDIENCE_ID configured — welcome sent but contact not stored:', email);
    }

    // 2) Send the localized welcome email (best-effort).
    const c = WELCOME[locale];
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [email],
          reply_to: REPLY_TO,
          subject: c.subject,
          html: welcomeHtml(c),
        }),
      });
      if (!res.ok) console.error('Newsletter welcome failed:', res.status, await res.text());
    } catch (err) {
      console.error('Newsletter welcome error (non-fatal):', err);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// TEMP diagnostic — reports config presence + live Resend reachability (no secret values).
export async function GET() {
  const diag: Record<string, unknown> = {
    hasApiKey: !!NL_API_KEY,
    fromEmail: FROM_EMAIL,
    replyTo: REPLY_TO,
    audienceEnvSet: !!process.env.RESEND_AUDIENCE_ID,
  };
  if (NL_API_KEY) {
    try {
      const r = await fetch('https://api.resend.com/audiences', {
        headers: { Authorization: `Bearer ${NL_API_KEY}` },
      });
      diag.audiencesStatus = r.status;
      if (r.ok) {
        const j = await r.json();
        diag.audienceCount = Array.isArray(j?.data) ? j.data.length : 0;
        diag.firstAudienceId = j?.data?.[0]?.id ?? null;
      } else {
        diag.audiencesError = (await r.text()).slice(0, 200);
      }
    } catch (e) {
      diag.audiencesException = String(e).slice(0, 200);
    }
  }
  return NextResponse.json(diag);
}
