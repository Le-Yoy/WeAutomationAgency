import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Automation & Behavioral Sequences That Convert',
  description:
    'Behavioral email automation with dynamic personalization and A/B testing. 42% open rates, $2.14 revenue per email. Welcome series, cart recovery, re-engagement, and lead nurture.',
  keywords: [
    'email automation',
    'email marketing automation',
    'behavioral email sequences',
    'cart abandonment emails',
    'lead nurture sequences',
    'email personalization',
  ],
  alternates: { canonical: '/services/email-automation' },
  openGraph: {
    title: 'Email Automation & Behavioral Sequences That Convert',
    description:
      'Behavioral email automation with personalization and A/B testing that drives revenue.',
    url: 'https://weautomationagency.com/services/email-automation',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
