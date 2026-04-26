import { getServiceBySlug } from "@/lib/location-seo/services";
import { kenyanCounties, getConstituencyBySlug } from "@/lib/location-seo/counties";
import { NextResponse } from "next/server";

const BASE_URL = "https://smassystems.com";

export async function GET(): Promise<NextResponse> {
  const services = [
    { id: "pos-systems", slug: "pos-systems", priority: 0.9 },
    { id: "erp-systems", slug: "erp-systems", priority: 0.9 },
    { id: "inventory-systems", slug: "inventory-systems", priority: 0.8 },
    { id: "web-development", slug: "web-development", priority: 0.8 },
    { id: "mobile-app-development", slug: "mobile-app-development", priority: 0.7 },
    { id: "crm-systems", slug: "crm-systems", priority: 0.7 },
    { id: "ecommerce-solutions", slug: "ecommerce-solutions", priority: 0.7 },
    { id: "school-management", slug: "school-management", priority: 0.6 },
    { id: "hotel-management", slug: "hotel-management", priority: 0.6 },
    { id: "healthcare-management", slug: "healthcare-management", priority: 0.6 },
    { id: "it-consulting", slug: "it-consulting", priority: 0.6 },
    { id: "ui-ux-design", slug: "ui-ux-design", priority: 0.6 },
    { id: "api-development-integrations", slug: "api-development-integrations", priority: 0.5 },
    { id: "data-analytics-bi", slug: "data-analytics-bi", priority: 0.5 },
    { id: "cloud-devops", slug: "cloud-devops", priority: 0.5 },
    { id: "cybersecurity-services", slug: "cybersecurity-services", priority: 0.5 },
    { id: "custom-software-development", slug: "custom-software-development", priority: 0.5 }
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${services.map(service =>
  kenyanCounties.map(county => {
    let xml = `  <url>
    <loc>${BASE_URL}/services/${service.slug}/${county.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${service.priority}</priority>
  </url>`;

    county.constituencies.forEach(constituency => {
      xml += `
  <url>
    <loc>${BASE_URL}/services/${service.slug}/${county.slug}/${constituency.toLowerCase().replace(/\s+/g, '-')}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${(service.priority * 0.8).toFixed(1)}</priority>
  </url>`;
    });

    return xml;
  }).join('\n')
).join('\n')}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}