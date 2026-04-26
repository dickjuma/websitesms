import { kenyanCounties, getConstituencyBySlug } from "@/lib/location-seo/counties";
import { MetadataRoute } from "next";
import { NextResponse } from "next/server";

const BASE_URL = "https://smassystems.com";

export async function GET(): Promise<NextResponse> {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${kenyanCounties.map(county => {
  let xml = `  <url>
    <loc>${BASE_URL}/services/location/${county.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

  county.constituencies.forEach(constituency => {
    xml += `
  <url>
    <loc>${BASE_URL}/services/location/${county.slug}/${constituency.toLowerCase().replace(/\s+/g, '-')}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  return xml;
}).join('\n')}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}