import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automated Lead Generation Services That Fill Your Pipeline',
  description:
    'AI-powered lead generation that finds, qualifies, and nurtures your ideal customers automatically. Outreach, smart qualification, and nurture sequences that convert 5x better.',
  keywords: [
    'automated lead generation',
    'lead generation services',
    'B2B lead generation agency',
    'sales automation',
    'lead qualification',
    'marketing automation',
  ],
  alternates: { canonical: '/services/lead-generation' },
  openGraph: {
    title: 'Automated Lead Generation Services That Fill Your Pipeline',
    description:
      'AI systems that find, qualify, and nurture your ideal customers automatically.',
    url: 'https://weautomationagency.com/services/lead-generation',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
