import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostView from '@/components/blog/PostView';
import {
  type Locale,
  getSlugs,
  buildPostMetadata,
  NON_DEFAULT_LOCALES,
} from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of NON_DEFAULT_LOCALES) {
    for (const slug of getSlugs(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

function isNonDefaultLocale(l: string): l is Locale {
  return (NON_DEFAULT_LOCALES as string[]).includes(l);
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  if (!isNonDefaultLocale(params.locale)) return {};
  return buildPostMetadata(params.locale as Locale, params.slug);
}

export default function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isNonDefaultLocale(params.locale)) notFound();
  return <PostView locale={params.locale as Locale} slug={params.slug} />;
}
