import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: { en: '/', fr: '/fr', es: '/es', 'x-default': '/' },
  },
};

export default function HomePage() {
  return <HomePageClient locale="en" />;
}
