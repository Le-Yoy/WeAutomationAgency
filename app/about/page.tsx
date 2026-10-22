import type { Metadata } from 'next';
import AboutView from '@/components/AboutView';
import { ABOUT } from '@/lib/content/about';

const t = ABOUT.en;
export const metadata: Metadata = {
  title: { absolute: t.metaTitle },
  description: t.metaDescription,
  alternates: { canonical: '/about', languages: { en: '/about', fr: '/fr/about', es: '/es/about', 'x-default': '/about' } },
  openGraph: { title: t.metaTitle, description: t.metaDescription, url: 'https://weautomationagency.com/about', type: 'website' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <AboutView locale="en" />;
}
