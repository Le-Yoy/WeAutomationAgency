import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import type { Metadata } from 'next';

export const BASE_URL = 'https://weautomationagency.com';

export type Locale = 'en' | 'fr' | 'es';
export const LOCALES: Locale[] = ['en', 'fr', 'es'];
export const DEFAULT_LOCALE: Locale = 'en';
export const NON_DEFAULT_LOCALES: Locale[] = ['fr', 'es'];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
};

/** The 4 post archetypes the Blog Bible rotates between. */
export type PostType = 'guide' | 'howto' | 'comparison' | 'opinion';
export const POST_TYPES: PostType[] = ['guide', 'howto', 'comparison', 'opinion'];

export interface PostMeta {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  category: string;
  author: string;
  authorRole: string;
  keywords: string[];
  translationStatus?: string;
  // --- Blog Bible variant fields (all optional; sensible defaults) ---
  type?: PostType; // archetype → drives eyebrow + module defaults
  toc?: boolean; // render auto table of contents from H2s
  heroImage?: string; // /images/blog/<slug>.webp (Unsplash, optimized)
  heroAlt?: string; // descriptive alt text (SEO + a11y)
  heroCredit?: string; // "Photo by <name> on Unsplash"
  heroCreditUrl?: string; // link to photographer / source
}

export interface Heading {
  id: string;
  text: string;
}

/** Extract H2 headings (with github-slugger ids that match rehype-slug) for the TOC. */
export function getHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  for (const line of content.split('\n')) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    // strip inline markdown (links, bold, italic, code) for clean TOC text
    const text = m[1]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim();
    headings.push({ id: slugger.slug(text), text });
  }
  return headings;
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function localeDir(locale: Locale): string {
  return path.join(POSTS_DIR, locale);
}

/** All post slugs available for a given locale (files present on disk). */
export function getSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

/** Raw MDX body + parsed frontmatter for one post, or null if missing. */
export function getPost(
  locale: Locale,
  slug: string
): { meta: PostMeta; content: string } | null {
  const file = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    locale,
    title: data.title ?? '',
    description: data.description ?? '',
    excerpt: data.excerpt ?? data.description ?? '',
    date: data.date ?? '',
    dateLabel: data.dateLabel ?? data.date ?? '',
    category: data.category ?? '',
    author: data.author ?? 'WeAutomationAgency',
    authorRole: data.authorRole ?? '',
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    translationStatus: data.translationStatus,
    type: data.type,
    toc: data.toc === true,
    heroImage: data.heroImage,
    heroAlt: data.heroAlt,
    heroCredit: data.heroCredit,
    heroCreditUrl: data.heroCreditUrl,
  };
  return { meta, content };
}

/** All posts for a locale, newest first, for the index page. */
export function getAllPosts(locale: Locale): PostMeta[] {
  return getSlugs(locale)
    .map((slug) => getPost(locale, slug)?.meta)
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Which locales have a translation of this slug — drives hreflang. */
export function getAvailableLocales(slug: string): Locale[] {
  return LOCALES.filter((l) =>
    fs.existsSync(path.join(localeDir(l), `${slug}.mdx`))
  );
}

/** Canonical path for a post in a given locale (default locale is unprefixed). */
export function postPath(locale: Locale, slug: string): string {
  return locale === DEFAULT_LOCALE ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
}

/** Blog index path for a locale. */
export function blogIndexPath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/blog' : `/${locale}/blog`;
}

/** Absolute URL helpers. */
export function postUrl(locale: Locale, slug: string): string {
  return `${BASE_URL}${postPath(locale, slug)}`;
}

/**
 * hreflang alternates as language->path map (Next resolves against metadataBase),
 * including x-default pointing at the default locale (or first available).
 */
export function hreflangAlternates(slug: string): Record<string, string> {
  const available = getAvailableLocales(slug);
  const langs: Record<string, string> = {};
  for (const l of available) langs[l] = postPath(l, slug);
  const xDefaultLocale = available.includes(DEFAULT_LOCALE)
    ? DEFAULT_LOCALE
    : available[0];
  if (xDefaultLocale) langs['x-default'] = postPath(xDefaultLocale, slug);
  return langs;
}

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  es: 'es_ES',
};

/** Full Next.js Metadata for a single post, incl. canonical + hreflang. */
export function buildPostMetadata(locale: Locale, slug: string): Metadata {
  const post = getPost(locale, slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: postPath(locale, slug),
      languages: hreflangAlternates(slug),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: postUrl(locale, slug),
      type: 'article',
      publishedTime: meta.date,
      authors: [meta.author],
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    robots: { index: true, follow: true },
  };
}
