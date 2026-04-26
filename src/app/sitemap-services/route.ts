import { getServiceBySlug } from "@/lib/location-seo/services";
import { kenyanCounties, getConstituencyBySlug } from "@/lib/location-seo/counties";
import { MetadataRoute } from "next";

const BASE_URL = "https://smassystems.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];

  // Add service pages
  const services = [
    { id: "pos-systems", slug: "pos-systems" },
    { id: "erp-systems", slug: "erp-systems" },
    { id: "inventory-systems", slug: "inventory-systems" },
    { id: "web-development", slug: "web-development" },
    { id: "mobile-app-development", slug: "mobile-app-development" },
    { id: "crm-systems", slug: "crm-systems" },
    { id: "ecommerce-solutions", slug: "ecommerce-solutions" },
    { id: "school-management", slug: "school-management" },
    { id: "hotel-management", slug: "hotel-management" },
    { id: "healthcare-management", slug: "healthcare-management" },
    { id: "it-consulting", slug: "it-consulting" },
    { id: "ui-ux-design", slug: "ui-ux-design" },
    { id: "api-development-integrations", slug: "api-development-integrations" },
    { id: "data-analytics-bi", slug: "data-analytics-bi" },
    { id: "cloud-devops", slug: "cloud-devops" },
    { id: "cybersecurity-services", slug: "cybersecurity-services" },
    { id: "custom-software-development", slug: "custom-software-development" }
  ];

  services.forEach(service => {
    // Service overview page
    pages.push({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });

    // Service + county pages
    kenyanCounties.forEach(county => {
      pages.push({
        url: `${BASE_URL}/services/${service.slug}/${county.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });

      // Service + constituency pages
      county.constituencies.forEach(constituency => {
        pages.push({
          url: `${BASE_URL}/services/${service.slug}/${county.slug}/${constituency.toLowerCase().replace(/\s+/g, '-')}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        });
      });
    });
  });

  return pages;
}