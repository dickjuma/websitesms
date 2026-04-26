// Comprehensive sitemap generator for all URLs
// This creates a complete sitemap with ALL programmatic SEO pages

import { writeFileSync } from 'fs';
import { join } from 'path';

// Import the location and service data
const BASE_URL = 'https://smassystems.com';

// Kenyan locations (expanded from location-seo-data.ts)
const kenyanLocations = [
  // Major cities (highest priority)
  'nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'thika', 'malindi', 'kitale',
  'kericho', 'kakamega', 'meru', 'nyeri', 'kirinyaga', 'machakos', 'limuru', 'ruiru',
  'kitengela', 'syokimau', 'nairobi-cbd', 'westlands-nairobi', 'kilimani-nairobi',
  'kisumu-cbd', 'mombasa-cbd', 'eldoret-cbd', 'nakuru-cbd',

  // All 47 counties
  'kiambu', 'kajiado', 'uasin-gishu', 'bungoma', 'busia', 'siaya', 'vihiga', 'kwale',
  'kilifi', 'tana-river', 'lamu', 'taita-taveta', 'garissa', 'wajir', 'mandera',
  'marsabit', 'isiolo', 'samburu', 'turkana', 'west-pokot', 'trans-nzoia',
  'nandi', 'baringo', 'laikipia', 'narok', 'kiambu', 'kajiado', 'uasin-gishu',
  'bungoma', 'busia', 'siaya', 'vihiga', 'kwale', 'kilifi', 'tana-river',
  'taita-taveta', 'garissa', 'wajir', 'mandera', 'marsabit', 'isiolo',
  'samburu', 'turkana', 'west-pokot', 'trans-nzoia', 'nandi', 'baringo', 'laikipia'
];

// Services for programmatic pages
const services = [
  'erp-system', 'pos-system', 'school-management-system', 'hospital-system', 'custom-software',
  'inventory-systems', 'crm-systems', 'healthcare-management', 'hotel-management',
  'ecommerce-solutions', 'cloud-devops', 'ui-ux-design', 'api-development-integrations',
  'data-analytics-bi', 'digital-marketing', 'it-consulting', 'cybersecurity-services',
  'qa-software-testing', 'ai-solutions'
];

// Static pages (high priority)
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/about', priority: 0.8, changefreq: 'monthly' },
  { url: '/contact', priority: 0.9, changefreq: 'monthly' },
  { url: '/pricing', priority: 0.9, changefreq: 'weekly' },
  { url: '/quote', priority: 0.9, changefreq: 'weekly' },
  { url: '/book-demo', priority: 0.8, changefreq: 'monthly' },
  { url: '/payment', priority: 0.6, changefreq: 'monthly' },
  { url: '/payment/success', priority: 0.6, changefreq: 'monthly' },
  { url: '/services', priority: 0.9, changefreq: 'weekly' },
  { url: '/it-services', priority: 0.7, changefreq: 'weekly' },
  { url: '/solutions', priority: 0.8, changefreq: 'weekly' },
  { url: '/products', priority: 0.8, changefreq: 'weekly' },
  { url: '/process', priority: 0.7, changefreq: 'monthly' },
  { url: '/portfolio', priority: 0.7, changefreq: 'monthly' },
  { url: '/case-studies', priority: 0.7, changefreq: 'monthly' },
  { url: '/faq', priority: 0.6, changefreq: 'monthly' },
  { url: '/careers', priority: 0.6, changefreq: 'monthly' },
  { url: '/chat', priority: 0.5, changefreq: 'monthly' },
  { url: '/blog', priority: 0.8, changefreq: 'weekly' },
  { url: '/pillar/erp-system', priority: 0.9, changefreq: 'weekly' },
  { url: '/pillar/pos-system', priority: 0.9, changefreq: 'weekly' },
  { url: '/pillar/software-development', priority: 0.9, changefreq: 'weekly' },
  { url: '/buyer-intent/erp-system-kenya-pricing', priority: 0.9, changefreq: 'weekly' },
  { url: '/buyer-intent/pos-system-small-business-kenya', priority: 0.9, changefreq: 'weekly' },
  { url: '/buyer-intent/software-development-cost-kenya', priority: 0.9, changefreq: 'weekly' },
  { url: '/buyer-intent/best-erp-system-kenya', priority: 0.9, changefreq: 'weekly' },
];

// Individual service pages
const servicePages = services.map(service => ({
  url: `/services/${service === 'erp-system' ? 'erp-systems' :
         service === 'pos-system' ? 'pos-systems' :
         service === 'school-management-system' ? 'school-management' :
         service === 'hospital-system' ? 'hospital-system' :
         service.replace(/-/g, '-')}`,
  priority: 0.9,
  changefreq: 'weekly'
}));

// Generate comprehensive sitemap
function generateCompleteSitemap() {
  const today = new Date().toISOString().split('T')[0];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static pages first (highest priority)
  staticPages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Add individual service pages
  servicePages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Add county hub pages
  kenyanLocations.forEach(location => {
    const priority = ['nairobi', 'mombasa', 'kisumu', 'nakuru'].includes(location) ? 0.8 : 0.7;
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}/services/location/${location}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>${priority}</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Add programmatic SEO pages (service + location combinations)
  // This creates ALL possible combinations for maximum coverage
  services.forEach(service => {
    kenyanLocations.forEach(location => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${BASE_URL}/${service}-${location}</loc>\n`;
      sitemap += `    <lastmod>${today}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.8</priority>\n`;
      sitemap += `  </url>\n`;
    });
  });

  sitemap += '</urlset>';

  return sitemap;
}

// Generate and save the complete sitemap
const completeSitemap = generateCompleteSitemap();
const publicDir = join(process.cwd(), 'public');
const sitemapPath = join(publicDir, 'sitemap-complete.xml');

writeFileSync(sitemapPath, completeSitemap, 'utf8');

// Calculate total URLs
const urlCount = completeSitemap.split('<url>').length - 1;
console.log(`✅ Complete sitemap generated with ${urlCount} URLs`);
console.log(`📁 Saved to: ${sitemapPath}`);
console.log(`📊 Breakdown:`);
console.log(`   - Static pages: ${staticPages.length}`);
console.log(`   - Service pages: ${servicePages.length}`);
console.log(`   - County hubs: ${kenyanLocations.length}`);
console.log(`   - Programmatic pages: ${services.length * kenyanLocations.length}`);
console.log(`   - TOTAL: ${urlCount} URLs`);

// Also generate a compressed version for Google (split into multiple sitemaps if needed)
const MAX_URLS_PER_SITEMAP = 50000; // Google's recommended limit
const totalUrls = urlCount;

if (totalUrls > MAX_URLS_PER_SITEMAP) {
  console.log(`⚠️  Sitemap exceeds Google's ${MAX_URLS_PER_SITEMAP} URL limit`);
  console.log(`💡 Consider splitting into multiple sitemaps or using sitemap index`);
}

// Export for use in other scripts
export { generateCompleteSitemap, urlCount };