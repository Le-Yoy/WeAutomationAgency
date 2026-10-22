import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutView from '@/components/AboutView';
import { ABOUT } from '@/lib/content/about';
import { NON_DEFAULT_SITE_LOCALES, type SiteLocale } from '@/lib/i18n';

export const dynamicParams = false;

function isNonDefault(l: string): l is SiteLocale {
  return (NON_DEFAULT_SITE_LOCALES as string[]).includes(l);
}

export function generateStaticParams() {
  return NON_DEFAULT_SITE_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isNonDefault(params.locale)) return {};
  const t = ABOUT[params.locale as SiteLocale];
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: { canonical: `/${params.locale}/about`, languages: { en: '/about', fr: '/fr/about', es: '/es/about', 'x-default': '/about' } },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: `https://weautomationagency.com/${params.locale}/about`, type: 'website' },
    robots: { index: true, follow: true },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isNonDefault(params.locale)) notFound();
  return <AboutView locale={params.locale as SiteLocale} />;
}
