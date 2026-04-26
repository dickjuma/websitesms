const SITE_URL_VALUE = process.env.NEXT_PUBLIC_APP_URL || 'https://smassystems.com';

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'SMA Systems';
export const SITE_URL = SITE_URL_VALUE;
export const DEFAULT_OG_IMAGE = `${SITE_URL_VALUE}/og-image.png`;
export const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@smassystems';
export const PHONE = process.env.NEXT_PUBLIC_PHONE || '+254-719-832719';
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'hello@smassystems.com';

export const KEYWORDS = [
  'ERP provider Kenya',
  'POS system Kenya',
  'ERP software Kenya',
  'inventory management system Kenya',
  'CRM Kenya',
  'business automation Kenya',
  'enterprise software Kenya',
  'point of sale Kenya',
  'Nairobi ERP company',
  'POS developers Kenya',
  'web development Kenya',
  'mobile app development Kenya',
  'software company Nairobi',
  'Kenya software development',
  'East Africa ERP',
  'SaaS Kenya',
  'cloud ERP Kenya',
];

export const COUNTRIES_SERVED = [
  'Kenya',
  'Uganda',
  'Tanzania',
  'Rwanda',
  'Democratic Republic of the Congo',
  'South Sudan',
  'Burundi',
  'Ethiopia',
];

export const SERVICES_LIST = [
  'ERP Systems',
  'POS Systems',
  'Inventory Management',
  'CRM Software',
  'Web Development',
  'Mobile App Development',
  'E-commerce Solutions',
  'School Management Software',
  'Hotel Management System',
  'Healthcare Management',
];

export const DEFAULT_SEO = {
  site_name: SITE_NAME,
  site_url: SITE_URL,
  title: `${SITE_NAME} - ERP & POS Provider in Kenya`,
  description:
    'SMA Systems is Kenya\'s leading ERP and POS provider. We build custom ERP systems, POS software, inventory management, CRM, and business automation solutions for enterprises across Africa.',
  keywords: KEYWORDS,
  author: SITE_NAME,
  copyright: `© ${new Date().getFullYear()} ${SITE_NAME}`,
};