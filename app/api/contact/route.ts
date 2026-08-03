import { NextResponse } from 'next/server';

// Resend sends each lead to your inbox. Set these in .env.local and in Vercel env vars.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
// Address that receives the lead emails (must match your Resend account email until you
// verify your own domain).
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || 'ceo@weautomationagency.com';
// From address. onboarding@resend.dev works with no domain setup; swap for your domain later.
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'WeAutomationAgency Leads <onboarding@resend.dev>';

const escapeHtml = (s: string) =>
  s.replace(/[<>&]/g, (c) => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;'));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source, formType } = body;

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
