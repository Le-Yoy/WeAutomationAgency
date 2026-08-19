import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Call Center & Voice Automation — 24/7 Human-Like Support',
  description:
    'Intelligent voice AI that answers calls, schedules appointments, and resolves 85% of inquiries automatically. Under 3s response, $0.08 per call vs $6 for human agents.',
  keywords: [
    'AI call center',
    'voice AI',
    'automated call center',
    'AI phone answering service',
    'appointment scheduling automation',
    'voice analytics',
  ],
  alternates: { canonical: '/services/call-center' },
  openGraph: {
    title: 'AI Call Center & Voice Automation — 24/7 Human-Like Support',
    description:
      'Voice AI that answers calls, books appointments, and resolves inquiries 24/7.',
    url: 'https://weautomationagency.com/services/call-center',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
