import type { MetadataRoute } from 'next';

const BASE_URL = 'https://weautomationagency.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /start is a paid-traffic landing page (noindex); /api has no crawlable content.
      disallow: ['/start', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
