import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogIndex from '@/components/blog/BlogIndex';
import {
  type Locale,
  getAllPosts,
  NON_DEFAULT_LOCALES,
  blogIndexPath,
} from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map((locale) => ({ locale }));
}

function isNonDefaultLocale(l: string): l is Locale {
  return (NON_DEFAULT_LOCALES as string[]).includes(l);
}

const INDEX_META: Record<'fr' | 'es', { title: string; description: string }> = {
  fr: {
    title: 'Blog — IA, automatisation & SEO | WeAutomationAgency',
    description:
      "Des analyses franches sur l'IA, l'automatisation et le SEO pour les dirigeants. Sans hype — juste ce qui fait vraiment la différence.",
  },
  es: {
    title: 'Blog — IA, automatización y SEO | WeAutomationAgency',
    description:
      'Ideas claras sobre IA, automatización y SEO para dueños de negocios. Sin humo — solo lo que de verdad marca la diferencia.',
  },
};

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isNonDefaultLocale(params.locale)) return {};
  const locale = params.locale as 'fr' | 'es';
  const m = INDEX_META[locale];
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: blogIndexPath(locale),
      languages: { en: '/blog', fr: '/fr/blog', es: '/es/blog', 'x-default': '/blog' },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://weautomationagency.com${blogIndexPath(locale)}`,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isNonDefaultLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  return <BlogIndex locale={locale} posts={getAllPosts(locale)} />;
}
