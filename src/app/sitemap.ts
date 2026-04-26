import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smassystems.com';

  // Return sitemap index instead of individual pages
  // This delegates to the specialized sitemaps
  return [
    {
      url: `${baseUrl}/sitemap-services.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-kenya-counties.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-service-location.xml`,
      lastModified: new Date(),
    },
  ];
}