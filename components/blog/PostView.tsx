import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import { notFound } from 'next/navigation';
import BlogArticle from './BlogArticle';
import { mdxComponents } from './mdx-components';
import {
  type Locale,
  getPost,
  getAvailableLocales,
  getHeadings,
  postUrl,
  BASE_URL,
} from '@/lib/blog';

export default function PostView({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const post = getPost(locale, slug);
  if (!post) notFound();
  const { meta, content } = post;
  const available = getAvailableLocales(slug);
  const headings = meta.toc ? getHeadings(content) : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    inLanguage: locale,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(locale, slug) },
    image: meta.heroImage
      ? `${BASE_URL}${meta.heroImage}`
      : `${BASE_URL}/opengraph-image.png`,
    author: {
      '@type': 'Person',
      name: meta.author,
      jobTitle: 'Founder & CEO',
      worksFor: { '@id': `${BASE_URL}/#organization` },
    },
    publisher: { '@id': `${BASE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle meta={meta} availableLocales={available} headings={headings}>
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
        />
      </BlogArticle>
    </>
  );
}
