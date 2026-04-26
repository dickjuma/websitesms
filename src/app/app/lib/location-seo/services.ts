import { KenyanCounty } from './counties';

export interface LocationService {
  id: string;
  title: string;
  slug: string;
  description: string;
  keywords: string[];
  benefits: string[];
}

export const locationServices: LocationService[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    slug: 'custom-software-development',
    description: 'Custom, SEO-optimized websites designed to convert visitors into customers. Responsive design with modern technologies.',
    keywords: ['web development services', 'custom website design', 'SEO website', 'responsive web design', 'business website'],
    benefits: ['SEO Optimized', 'Mobile Responsive', 'Fast Loading', 'Secure', 'Scalable'],
  },
  {
    id: 'erp-systems',
    title: 'ERP Systems',
    slug: 'erp-systems',
    description: 'Comprehensive enterprise resource planning solutions for operations, finance, HR, and inventory management.',
    keywords: ['ERP systems', 'enterprise resource planning', 'business management software', 'ERP solutions', 'finance software'],
    benefits: ['Centralized Data', 'Real-time Reporting', 'Cost Reduction', 'Workflow Automation'],
  },
  {
    id: 'pos-systems',
    title: 'POS Systems',
    slug: 'pos-systems',
    description: 'Modern point of sale solutions for retail, restaurants, and hospitality businesses.',
    keywords: ['POS systems', 'point of sale', 'retail POS', 'restaurant POS', 'payment processing'],
    benefits: ['Faster Checkout', 'Inventory Sync', 'Multi-payment Support', 'Sales Reports'],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Applications',
    slug: 'mobile-apps',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    keywords: ['mobile app development', 'iOS apps', 'Android apps', 'cross-platform apps', 'mobile application'],
    benefits: ['Native Performance', 'Offline Support', 'Push Notifications', 'App Store Optimized'],
  },
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    slug: 'ai-chatbots',
    description: 'Intelligent AI-powered chatbots for customer service, lead qualification, and 24/7 support.',
    keywords: ['AI chatbots', 'customer service chatbot', 'AI customer support', 'lead generation bot', 'automated support'],
    benefits: ['24/7 Availability', 'Instant Responses', 'Lead Qualification', 'Cost Reduction'],
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management',
    slug: 'inventory-management',
    description: 'Complete inventory tracking and warehouse management solutions for businesses.',
    keywords: ['inventory management', 'stock tracking', 'warehouse management', 'inventory software', 'stock control'],
    benefits: ['Real-time Tracking', 'Low Stock Alerts', 'Barcode Support', 'Multi-location'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    slug: 'ecommerce',
    description: 'Online store solutions with payment integration and inventory management.',
    keywords: ['e-commerce solutions', 'online store', 'e-commerce website', 'online payments', 'shopping cart'],
    benefits: ['Secure Payments', 'Inventory Management', 'Mobile Optimized', 'SEO Ready'],
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    slug: 'business-automation',
    description: 'Workflow automation and process optimization for business efficiency.',
    keywords: ['business automation', 'workflow automation', 'process automation', 'business software', 'automation solutions'],
    benefits: ['Reduce Manual Work', 'Faster Processes', 'Error Reduction', 'Cost Savings'],
  },
];

export const getServiceById = (id: string) => locationServices.find(s => s.id === id);

export const getServiceBySlug = (slug: string) => locationServices.find(s => s.slug === slug);

export const generateLocationServiceMetadata = (county: KenyanCounty, service: LocationService) => {
  const locationKeyword = `${county.name} ${service.title}`;
  const title = `${service.title} in ${county.name} | SMA Systems`;
  const description = `${service.description} Professional ${service.title.toLowerCase()} services in ${county.name}, ${county.region} Kenya. ${county.majorTown} businesses trust us for quality IT solutions.`;
  
  return {
    title,
    description,
    keywords: [
      locationKeyword,
      `${county.majorTown} ${service.title}`,
      ...service.keywords,
      ...county.keywords,
    ],
    openGraph: {
      title,
      description,
    },
  };
};

export const generateLocationPageUrl = (countySlug: string, serviceSlug: string) =>
  `/services/${countySlug}/${serviceSlug}`;

export const generateConstituencyServiceMetadata = (county: KenyanCounty, constituency: string, service: LocationService) => {
  const locationKeyword = `${constituency} ${service.title}`;
  const title = `${service.title} in ${constituency}, ${county.name} | SMA Systems`;
  const description = `${service.description} Professional ${service.title.toLowerCase()} services in ${constituency}, ${county.name}, ${county.region} Kenya. Local businesses trust us for quality IT solutions.`;

  return {
    title,
    description,
    keywords: [
      locationKeyword,
      `${constituency} ${service.title.toLowerCase()}`,
      `${county.name} ${service.title}`,
      ...service.keywords,
      ...county.keywords,
    ],
    openGraph: {
      title,
      description,
    },
  };
};

export const generateConstituencyPageUrl = (countySlug: string, constituencySlug: string, serviceSlug: string) =>
  `/services/${countySlug}/${constituencySlug}/${serviceSlug}`;

export const generateConstituencyUrl = (countySlug: string, constituencySlug: string) =>
  `/services/${countySlug}/${constituencySlug}`;