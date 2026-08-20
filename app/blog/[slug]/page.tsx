import type { Metadata } from 'next';
import PostView from '@/components/blog/PostView';
import { getSlugs, buildPostMetadata } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs('en').map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  return buildPostMetadata('en', params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <PostView locale="en" slug={params.slug} />;
}
