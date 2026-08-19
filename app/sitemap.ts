import type { MetadataRoute } from 'next';

const BASE_URL = 'https://weautomationagency.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: {
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
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/blog/claude-ai-watermark-google-rankings', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
