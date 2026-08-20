import type { MetadataRoute } from 'next';
import {
  LOCALES,
  getSlugs,
  getAvailableLocales,
  postPath,
  blogIndexPath,
} from '@/lib/blog';

const BASE_URL = 'https://weautomationagency.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services/ai-chatbot', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services/lead-generation', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services/call-center', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services/email-automation', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog index per locale
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}${blogIndexPath(locale)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // Every post, in every locale it exists in, with hreflang alternates
  for (const slug of getSlugs('en')) {
    const available = getAvailableLocales(slug);
    const languages: Record<string, string> = {};
    for (const l of available) languages[l] = `${BASE_URL}${postPath(l, slug)}`;
    for (const l of available) {
      entries.push({
        url: `${BASE_URL}${postPath(l, slug)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
