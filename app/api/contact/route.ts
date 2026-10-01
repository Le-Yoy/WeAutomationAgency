import { NextResponse } from 'next/server';

// Resend sends each lead to your inbox. Set these in .env.local and in Vercel env vars.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
// Address that receives the lead emails (must match your Resend account email until you
// verify your own domain).
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || 'support@weautomationagency.com';
// From address. onboarding@resend.dev works with no domain setup; swap for your domain later.
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'WeAutomationAgency Leads <onboarding@resend.dev>';

const escapeHtml = (s: string) =>
  s.replace(/[<>&]/g, (c) => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;'));

// Auto-confirmation sent to the person who submitted the form (localized).
type ConfLocale = 'en' | 'fr' | 'es';
const CONFIRM: Record<ConfLocale, { subject: string; heading: string; body: (n: string) => string; signoff: string; cta: string }> = {
  en: {
    subject: 'Thanks — we got your request',
    heading: 'Thanks for reaching out',
    body: (n) => `Hi${n ? ' ' + n : ''}, we've received your request. Our team will review it and get back to you within 24 hours.`,
    signoff: 'The WeAutomationAgency team',
    cta: 'Visit our website',
  },
  fr: {
    subject: 'Merci — votre demande est bien reçue',
    heading: 'Merci de nous avoir contactés',
    body: (n) => `Bonjour${n ? ' ' + n : ''}, nous avons bien reçu votre demande. Notre équipe l'examine et vous répondra sous 24 heures.`,
    signoff: 'L’équipe WeAutomationAgency',
    cta: 'Visiter notre site',
  },
  es: {
    subject: 'Gracias — hemos recibido tu solicitud',
    heading: 'Gracias por escribirnos',
    body: (n) => `Hola${n ? ' ' + n : ''}, hemos recibido tu solicitud. Nuestro equipo la revisará y te responderá en 24 horas.`,
    signoff: 'El equipo de WeAutomationAgency',
    cta: 'Visitar nuestra web',
  },
};
const confirmHtml = (c: { heading: string; body: (n: string) => string; signoff: string; cta: string }, name: string) =>
  `<div style="background:#f6f7f9;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #ececec;border-radius:14px;overflow:hidden;">
      <div style="padding:26px 32px 22px;border-bottom:1px solid #f1f1f1;">
        <span style="font-size:16px;font-weight:700;color:#111111;letter-spacing:-0.2px;">WeAutomationAgency<span style="color:#F94239;">.</span></span>
      </div>
      <div style="padding:30px 32px;">
        <h1 style="font-size:20px;line-height:1.35;color:#111111;margin:0 0 14px;font-weight:700;">${c.heading}</h1>
        <p style="font-size:15px;line-height:1.7;color:#4b5563;margin:0 0 24px;">${escapeHtml(c.body(name))}</p>
        <a href="https://weautomationagency.com" style="display:inline-block;background:#F94239;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:999px;">${c.cta}</a>
      </div>
      <div style="padding:20px 32px 26px;border-top:1px solid #f1f1f1;">
        <p style="font-size:13px;color:#9aa0a6;margin:0;line-height:1.6;">${escapeHtml(c.signoff)}<br/><a href="https://weautomationagency.com" style="color:#9aa0a6;text-decoration:underline;">weautomationagency.com</a></p>
      </div>
    </div>
  </div>`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source, formType, locale } = body;

    // Normalize email first, then validate (handles pasted trailing spaces / casing)
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const lead = {
      name: (name || '').trim().slice(0, 200),
      email: cleanEmail.slice(0, 200),
      phone: (phone || '').trim().slice(0, 50),
      source: (source || '').trim().slice(0, 100),
      message: (message || '').trim().slice(0, 5000),
      formType: (formType || 'unknown').trim().slice(0, 50),
      locale: (['en', 'fr', 'es'].includes(locale) ? locale : 'en') as ConfLocale,
      timestamp: new Date().toISOString(),
    };

    if (RESEND_API_KEY) {
      const rows = [
        ['Name', lead.name || '—'],
        ['Email', lead.email],
        ['Phone', lead.phone || '—'],
        ['Where they found us', lead.source || '—'],
        ['Message', lead.message || '—'],
        ['Source form', lead.formType],
      ]
        .map(
          ([label, value]) =>
            `<tr><td style="padding:8px 14px;color:#888;font-family:Arial,sans-serif;font-size:13px;vertical-align:top;">${label}</td><td style="padding:8px 14px;color:#111;font-family:Arial,sans-serif;font-size:14px;font-weight:600;">${escapeHtml(value)}</td></tr>`
        )
        .join('');

      const html = `<div style="background:#f5f5f5;padding:24px;"><div style="max-width:540px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;"><div style="background:#000;padding:18px 24px;"><span style="color:#F94239;font-family:Arial,sans-serif;font-size:18px;font-weight:700;">New Lead</span></div><table style="width:100%;border-collapse:collapse;">${rows}</table></div></div>`;

      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: [NOTIFY_EMAIL],
            reply_to: lead.email,
            subject: `New Lead: ${lead.name || lead.email}${lead.source ? ` — ${lead.source}` : ''}`,
            html,
          }),
        });

        if (!res.ok) {
          console.error('Resend failed:', res.status, await res.text());
          return NextResponse.json(
            { error: 'Could not send your submission. Please try again.' },
            { status: 502 }
          );
        }
      } catch (err) {
        console.error('Resend error:', err);
        return NextResponse.json(
          { error: 'Could not send your submission. Please try again.' },
          { status: 502 }
        );
      }

      // Auto-confirmation to the lead (best-effort — never blocks the response).
      const conf = CONFIRM[lead.locale];
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: [lead.email],
            reply_to: NOTIFY_EMAIL,
            subject: conf.subject,
            html: confirmHtml(conf, lead.name),
          }),
        });
      } catch (err) {
        console.error('Confirmation email failed (non-fatal):', err);
      }
    } else {
      // No email key configured yet — log so nothing is silently lost.
      console.warn('RESEND_API_KEY not set — lead NOT delivered:', lead);
    }

    return NextResponse.json(
      { success: true, message: 'Received. We will get back to you within 24 hours.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
