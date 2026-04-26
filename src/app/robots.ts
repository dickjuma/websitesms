import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/static/'],
        crawlDelay: 1,
      },
    ],
    sitemap: [
      'https://smassystems.com/sitemap.xml',
      'https://smassystems.com/sitemap-index.xml',
    ],
    host: 'https://smassystems.com',
  };
}
