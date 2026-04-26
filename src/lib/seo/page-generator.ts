import { kenyanCounties } from '@/lib/location-seo/counties';
import { locationServices } from '@/lib/location-seo/services';

export interface GeneratedPage {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  priority: number;
  type: 'service' | 'county' | 'service-county' | 'service-constituency';
  service?: string;
  county?: string;
  constituency?: string;
}

/**
 * Generate all service + location pages programmatically
 */
export function generateAllServiceLocationPages(): GeneratedPage[] {
  const pages: GeneratedPage[] = [];

  locationServices.forEach(service => {
    // Service overview page
    pages.push({
      url: `/services/${service.slug}`,
      title: `${service.title} | Professional Business Software | SMA Systems`,
      description: `${service.description} Trusted by Kenyan businesses for reliable, scalable solutions.`,
      keywords: service.keywords,
      priority: 0.8,
      type: 'service',
      service: service.slug,
    });

    // Service + county pages
    kenyanCounties.forEach(county => {
      pages.push({
        url: `/services/${service.slug}/${county.slug}`,
        title: `${service.title} in ${county.name} | SMA Systems Kenya`,
        description: `${service.description} Professional ${service.title.toLowerCase()} services in ${county.name}, ${county.region} Kenya. ${county.majorTown} businesses trust us for quality IT solutions.`,
        keywords: [
          `${service.title} ${county.name}`,
          `${county.majorTown} ${service.title}`,
          ...service.keywords,
          ...county.keywords,
        ],
        priority: county.slug === 'nairobi' ? 0.9 : 0.7,
        type: 'service-county',
        service: service.slug,
        county: county.slug,
      });

      // Service + constituency pages
      county.constituencies.forEach(constituency => {
        const constituencySlug = constituency.toLowerCase().replace(/\s+/g, '-');
        pages.push({
          url: `/services/${service.slug}/${county.slug}/${constituencySlug}`,
          title: `${service.title} in ${constituency}, ${county.name} | SMA Systems`,
          description: `${service.description} Professional ${service.title.toLowerCase()} services in ${constituency}, ${county.name}, ${county.region} Kenya.`,
          keywords: [
            `${service.title} ${constituency}`,
            `${service.title} ${county.name}`,
            `${constituency} ${service.title.toLowerCase()}`,
            ...service.keywords,
            ...county.keywords,
          ],
          priority: county.slug === 'nairobi' ? 0.8 : 0.6,
          type: 'service-constituency',
          service: service.slug,
          county: county.slug,
          constituency: constituencySlug,
        });
      });
    });
  });

  return pages;
}

/**
 * Generate county location hub pages
 */
export function generateCountyPages(): GeneratedPage[] {
  const pages: GeneratedPage[] = [];

  kenyanCounties.forEach(county => {
    // County hub page
    pages.push({
      url: `/services/location/${county.slug}`,
      title: `IT Services in ${county.name} | Business Software Solutions | SMA Systems`,
      description: `Professional IT and software solutions in ${county.name}, ${county.region} Kenya. POS systems, ERP, web development, and more for ${county.majorTown} businesses.`,
      keywords: [
        `IT services ${county.name}`,
        `software company ${county.name}`,
        `business solutions ${county.majorTown}`,
        ...county.keywords,
      ],
      priority: county.slug === 'nairobi' ? 0.8 : 0.7,
      type: 'county',
      county: county.slug,
    });

    // County constituency pages
    county.constituencies.forEach(constituency => {
      const constituencySlug = constituency.toLowerCase().replace(/\s+/g, '-');
      pages.push({
        url: `/services/location/${county.slug}/${constituencySlug}`,
        title: `Business Software in ${constituency}, ${county.name} | SMA Systems Kenya`,
        description: `IT solutions and business software for ${constituency}, ${county.name} Kenya. Professional technology services for local businesses.`,
        keywords: [
          `IT services ${constituency}`,
          `software ${constituency} ${county.name}`,
          ...county.keywords,
        ],
        priority: county.slug === 'nairobi' ? 0.7 : 0.6,
        type: 'county',
        county: county.slug,
        constituency: constituencySlug,
      });
    });
  });

  return pages;
}

/**
 * Get statistics about generated pages
 */
export function getPageGenerationStats() {
  const serviceLocationPages = generateAllServiceLocationPages();
  const countyPages = generateCountyPages();

  const totalPages = serviceLocationPages.length + countyPages.length;
  const servicePages = serviceLocationPages.filter(p => p.type === 'service').length;
  const serviceCountyPages = serviceLocationPages.filter(p => p.type === 'service-county').length;
  const serviceConstituencyPages = serviceLocationPages.filter(p => p.type === 'service-constituency').length;

  return {
    totalPages,
    servicePages,
    serviceCountyPages,
    serviceConstituencyPages,
    countyPages: countyPages.length,
    servicesCount: locationServices.length,
    countiesCount: kenyanCounties.length,
    constituenciesCount: kenyanCounties.reduce((sum, county) => sum + county.constituencies.length, 0),
  };
}

/**
 * Validate page URLs are properly formatted
 */
export function validatePageUrls(pages: GeneratedPage[]): { valid: GeneratedPage[]; invalid: GeneratedPage[] } {
  const valid: GeneratedPage[] = [];
  const invalid: GeneratedPage[] = [];

  pages.forEach(page => {
    // Check URL format
    if (!page.url.startsWith('/')) {
      invalid.push(page);
      return;
    }

    // Check required fields
    if (!page.title || !page.description || !page.keywords.length) {
      invalid.push(page);
      return;
    }

    // Check service/county relationships
    if (page.type.includes('service') && !page.service) {
      invalid.push(page);
      return;
    }

    if ((page.type === 'county' || page.type.includes('constituency')) && !page.county) {
      invalid.push(page);
      return;
    }

    valid.push(page);
  });

  return { valid, invalid };
}