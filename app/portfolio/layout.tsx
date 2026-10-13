import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio — AI Automation Case Studies & Results',
  description:
    'AI automation case studies: ecommerce chatbots, banking lead qualification, healthcare scheduling and more. See what we built and how it works.',
  keywords: [
    'AI automation case studies',
    'automation portfolio',
    'AI chatbot results',
    'lead generation case study',
    'automation agency portfolio',
  ],
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio — AI Automation Case Studies & Results',
    description:
      '150+ AI automation projects delivered, generating $50M+ in revenue across 45 industries.',
    url: 'https://weautomationagency.com/portfolio',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
