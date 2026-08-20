import type { Metadata } from 'next';
import BlogIndex from '@/components/blog/BlogIndex';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — AI, Automation & SEO Insights | WeAutomationAgency',
  description:
    'Straight-talking insights on AI, automation, and SEO for business owners. No hype — just what actually moves the needle.',
  alternates: {
    canonical: '/blog',
    languages: { en: '/blog', fr: '/fr/blog', es: '/es/blog', 'x-default': '/blog' },
  },
  openGraph: {
    title: 'Blog — AI, Automation & SEO Insights | WeAutomationAgency',
    description: 'Straight-talking insights on AI, automation, and SEO for business owners.',
    url: 'https://weautomationagency.com/blog',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function BlogIndexPage() {
  return <BlogIndex locale="en" posts={getAllPosts('en')} />;
}
