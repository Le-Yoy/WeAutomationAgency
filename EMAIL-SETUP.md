# Lead Emails Setup (one-time, ~2 minutes)

Every submission from **/start** and the **"Get Your Demo" popup** is emailed to your inbox
via Resend. No spreadsheet, no script — just an email per lead you can reply to directly.

## Step 1 — Get a Resend API key
1. Go to <https://resend.com/signup> and sign up (use **leboutaleb@gmail.com** — the same
   inbox where you want to receive leads).
2. Verify your email, then open **API Keys** → **Create API Key** → name it `waa-leads` →
   **Create**.
3. Copy the key (starts with `re_...`). You only see it once.

## Step 2 — Give me the key (or add it yourself)
- **Easiest:** paste the `re_...` key to me in chat and I'll wire it up + test.
- **Or do it yourself:**
  - Local: put it in `.env.local` → `RESEND_API_KEY=re_xxx`
  - Production: Vercel → your project → **Settings → Environment Variables** →
    add `RESEND_API_KEY` = `re_xxx` (Production + Preview + Development) → **Save** →
    redeploy.

That's it. Submit a test on /start and a "New Lead" email lands in your inbox.

## Notes
- Out of the box, emails are sent **from** `onboarding@resend.dev` **to** your account email.
  This works with zero domain setup. The free tier covers 3,000 emails/month.
- **Reply-to** is set to the lead's email, so hitting "Reply" writes straight to them.
- **Later (optional):** verify `weautomationagency.com` in Resend to send from
  `ceo@weautomationagency.com` and deliver to any address. Then set `LEAD_FROM_EMAIL`
  and `LEAD_NOTIFY_EMAIL` env vars accordingly.
