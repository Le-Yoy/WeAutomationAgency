import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Call Center & Voice Automation — 24/7 Human-Like Support',
  description:
    'Voice AI that answers calls, books appointments and handles customer requests 24/7, with real-time analytics and reporting. Live in 2-3 weeks.',
  keywords: [
    'AI call center',
    'voice AI',
    'automated call center',
    'AI phone answering service',
    'appointment scheduling automation',
    'voice analytics',
  ],
  alternates: {
    canonical: '/services/call-center',
    languages: {
      en: '/services/call-center',
      fr: '/fr/services/call-center',
      es: '/es/services/call-center',
      'x-default': '/services/call-center',
    },
  },
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
