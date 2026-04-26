const { writeFileSync } = require('fs');
const { join } = require('path');

const BASE_URL = 'https://smassystems.com';
const today = new Date().toISOString().split('T')[0];

const locationServices = [
  'web-development',
  'erp-systems',
  'pos-systems',
  'mobile-app-development',
  'ai-solutions',
  'inventory-systems',
  'ecommerce-solutions',
  'custom-software-development',
  'school-management',
  'hotel-management',
  'it-consulting',
  'healthcare-management',
  'ui-ux-design',
  'crm-systems',
  'api-development-integrations',
  'data-analytics-bi',
  'cloud-devops',
  'cybersecurity-services',
];

const counties = [
  { slug: 'mombasa', constituencies: ['changamwe', 'jomvu', 'kisauni', 'nyali', 'likoni', 'mvita'] },
  { slug: 'nairobi', constituencies: ['starehe', 'kamukunji', 'dagoretti-north', 'dagoretti-south', 'kasarani', 'roysambu', 'kenyatta', 'makadara', 'langata', 'westlands', 'diani', 'kileleshwa', 'loresho', 'karanga', 'mwiki', 'githurai', 'ruai'] },
  { slug: 'kisumu', constituencies: ['kisumu-west', 'kisumu-east', 'kisumu-central', 'seme', 'nyando', 'muhoroni', 'nyakach'] },
  { slug: 'nakuru', constituencies: ['naivasha', 'gilgil', 'kuresoi-south', 'kuresoi-north', 'molo', 'njoro', 'rongai', 'bahati', 'subukia', 'nakuru-town-west', 'nakuru-town-east'] },
  { slug: 'eldoret', constituencies: ['soy', 'turbo', 'ainabkoi', 'kapseret', 'kesses', 'moiben'] },
  { slug: 'machakos', constituencies: ['masinga', 'yatta', 'kangundo', 'matungulu', 'kathiani', 'mavoko', 'machakos-town', 'mwala'] },
  { slug: 'meru', constituencies: ['igembe-south', 'igembe-central', 'igembe-north', 'tigania-west', 'tigania-east', 'north-imenti', 'buuri', 'central-imenti', 'south-imenti'] },
  { slug: 'kitui', constituencies: ['mwingi-north', 'mwingi-west', 'mwingi-central', 'kitui-west', 'kitui-rural', 'kitui-central', 'kitui-east', 'kitui-south'] },
  { slug: 'garissa', constituencies: ['garissa-township', 'balambala', 'lagdera', 'dadaab', 'fafi', 'ijara'] },
  { slug: 'kilifi', constituencies: ['kilifi-north', 'kilifi-south', 'kaloleni', 'rabai', 'ganze', 'malindi', 'magarini'] },
  { slug: 'kakamega', constituencies: ['lurambi', 'navakholo', 'malava', 'lugari', 'likuyani', 'mumias-west', 'mumias-east', 'matungu', 'butere', 'khwisero', 'shinyalu', 'ikolomani'] },
  { slug: 'kericho', constituencies: ['bomet', 'chepalungu', 'sigowet-soin', 'kipkelion', 'londiani', 'ketu-south', 'ketu-north', 'bureti', 'tinderet'] },
  { slug: 'kiambu', constituencies: ['gatundu-south', 'gatundu-north', 'juja', 'thika-town', 'ruiru', 'githunguri', 'kiambu', 'kiambaa', 'kabete', 'kikuyu', 'limuru', 'lari'] },
  { slug: 'nyeri', constituencies: ['tetu', 'kieni', 'mathira', 'othaya', 'mukurweini', 'nyeri-town'] },
  { slug: 'kisii', constituencies: ['kitutu-chache-north', 'kitutu-chache-south', 'nyaribari-masaba', 'nyaribari-chache', 'bonchari', 'south-mugirango', 'bobasi', 'bomachoge-borabu', 'bomachoge-chache'] },
  { slug: 'migori', constituencies: ['awendo', 'kuria-east', 'kuria-west', 'nyatike', 'rongo', 'sun'] },
  { slug: 'bungoma', constituencies: ['bungoma-north', 'kimilili', 'mt-elgon', 'sirisia', 'kabuchai', 'kanduyi', 'webuye-east', 'webuye-west'] },
  { slug: 'busia', constituencies: ['teso-north', 'teso-south', 'nambale', 'matayos', 'butula', 'funyula', 'bunyala'] },
  { slug: 'kajiado', constituencies: ['kajiado-north', 'kajiado-central', 'kajiado-east', 'kajiado-west', 'kajiado-south'] },
  { slug: 'laikipia', constituencies: ['laikipia-west', 'laikipia-north', 'laikipia-east'] },
  { slug: 'isiolo', constituencies: ['isiolo-north', 'isiolo-south'] },
  { slug: 'marsabit', constituencies: ['moyale', 'north-horr', 'saku', 'laisamis'] },
  { slug: 'turkana', constituencies: ['turkana-north', 'turkana-west', 'turkana-central', 'turkana-east', 'turkana-south', 'loima'] },
  { slug: 'samburu', constituencies: ['samburu-west', 'samburu-north', 'samburu-east'] },
  { slug: 'nyandarua', constituencies: ['kinangop', 'kipipiri', 'ol-kalau', 'ol-jorok', 'ndaragwa'] },
  { slug: 'kirinyaga', constituencies: ['mwea', 'gichuga', 'ndia', 'kirinyaga-central'] },
  { slug: 'muranga', constituencies: ['kangema', 'mathioya', 'kiharu', 'kigumo', 'maragwa', 'kandara', 'gatanga'] },
  { slug: 'embu', constituencies: ['manyatta', 'runyenjes', 'mbeere-south', 'mbeere-north'] },
  { slug: 'makueni', constituencies: ['mbooni', 'kilome', 'kaiti', 'makueni', 'kibwezi-west', 'kibwezi-east'] },
  { slug: 'taita-taveta', constituencies: ['taveta', 'wundanyi', 'mwatate', 'voi'] },
  { slug: 'kwale', constituencies: ['msambweni', 'lungalunga', 'matuga', 'kinango'] },
  { slug: 'lamu', constituencies: ['lamu-east', 'lamu-west'] },
  { slug: 'tana-river', constituencies: ['garsen', 'galole', 'bura'] },
  { slug: 'mandera', constituencies: ['mandera-west', 'banissa', 'mandera-north', 'mandera-south', 'mandera-east', 'lafey'] },
  { slug: 'wajir', constituencies: ['wajir-north', 'wajir-east', 'tarbaj', 'wajir-west', 'eldas', 'wajir-south'] },
  { slug: 'west-pokot', constituencies: ['kapenguria', 'sigor', 'kacheliba', 'pokot-south'] },
  { slug: 'trans-nzoia', constituencies: ['kwanza', 'endebes', 'saboti', 'kiminini', 'cherangany'] },
  { slug: 'uasin-gishu', constituencies: ['soy', 'turbo', 'ainabkoi', 'kapseret', 'kesses', 'moiben'] },
  { slug: 'elgeyo-marakwet', constituencies: ['marakwet-east', 'marakwet-west', 'keiyo-north', 'keiyo-south'] },
  { slug: 'nandi', constituencies: ['tinderet', 'aldai', 'nandi-hills', 'chesumei', 'emgwen', 'mosop'] },
  { slug: 'baringo', constituencies: ['tiaty', 'baringo-north', 'baringo-central', 'mogotio', 'baringo-south'] },
  { slug: 'narok', constituencies: ['narok-north', 'narok-east', 'narok-south', 'narok-west', 'transmara-west', 'transmara-east'] },
  { slug: 'bomet', constituencies: ['bomet-central', 'bomet-east', 'bomet-west', 'chepalungu', 'konoin'] },
  { slug: 'vihiga', constituencies: ['vihiga', 'sabatia', 'hamisi', 'luanda', 'emuhaya'] },
  { slug: 'siaya', constituencies: ['ugenya', 'ugunja', 'alego-usonga', 'gem', 'bondo', 'rarieda'] },
  { slug: 'homa-bay', constituencies: ['ndhiwa', 'kabondo-kasipul', 'kasipul', 'karachuonyo', 'homa-bay-town', 'rangwe', 'suba-north', 'suba-south'] },
  { slug: 'nyamira', constituencies: ['nyamira', 'borabu', 'masaba', 'manga', 'west-mugirango'] },
];

const corePages = [
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/quote',
  '/book-demo',
  '/payment',
  '/payment/success',
  '/services',
  '/services/location',
  '/solutions',
  '/products',
  '/process',
  '/portfolio',
  '/case-studies',
  '/faq',
  '/careers',
  '/chat',
  '/pillar/erp-system',
  '/pillar/pos-system',
  '/pillar/software-development',
  '/buyer-intent/erp-system-kenya-pricing',
  '/buyer-intent/pos-system-small-business-kenya',
  '/buyer-intent/software-development-cost-kenya',
  '/buyer-intent/best-erp-system-kenya',
];

const urls = [];

for (const page of corePages) {
  urls.push({
    url: `${BASE_URL}${page}`,
    changefreq: page === '/' ? 'daily' : 'weekly',
    priority: page === '/' ? '1.0' : '0.8',
  });
}

for (const service of locationServices) {
  urls.push({
    url: `${BASE_URL}/services/${service}`,
    changefreq: 'weekly',
    priority: '0.8',
  });
}

for (const county of counties) {
  const countyPriority = county.slug === 'nairobi' || county.slug === 'mombasa' ? '0.8' : '0.7';

  urls.push({
    url: `${BASE_URL}/services/location/${county.slug}`,
    changefreq: 'weekly',
    priority: countyPriority,
  });

  for (const constituency of county.constituencies) {
    urls.push({
      url: `${BASE_URL}/services/location/${county.slug}/${constituency}`,
      changefreq: 'weekly',
      priority: '0.6',
    });
  }

  for (const service of locationServices) {
    urls.push({
      url: `${BASE_URL}/services/${service}/${county.slug}`,
      changefreq: 'weekly',
      priority: countyPriority,
    });

    for (const constituency of county.constituencies) {
      urls.push({
        url: `${BASE_URL}/services/${service}/${county.slug}/${constituency}`,
        changefreq: 'weekly',
        priority: '0.6',
      });
    }
  }
}

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  ),
  '</urlset>',
].join('\n');

const sitemapIndexXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '  <sitemap>',
  `    <loc>${BASE_URL}/sitemap.xml</loc>`,
  `    <lastmod>${today}</lastmod>`,
  '  </sitemap>',
  '</sitemapindex>',
].join('\n');

const publicDir = join(__dirname, '..', 'public');

writeFileSync(join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
writeFileSync(join(publicDir, 'sitemap-index.xml'), sitemapIndexXml, 'utf8');

console.log(`Generated sitemap.xml with ${urls.length} URLs`);
console.log('Generated sitemap-index.xml');
