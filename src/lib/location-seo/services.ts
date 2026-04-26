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
    slug: 'web-development',
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
    id: 'mobile-app-development',
    title: 'Mobile Applications',
    slug: 'mobile-app-development',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    keywords: ['mobile app development', 'iOS apps', 'Android apps', 'cross-platform apps', 'mobile application'],
    benefits: ['Native Performance', 'Offline Support', 'Push Notifications', 'App Store Optimized'],
  },
  {
    id: 'ai-solutions',
    title: 'AI Chatbots',
    slug: 'ai-solutions',
    description: 'Intelligent AI-powered chatbots for customer service, lead qualification, and 24/7 support.',
    keywords: ['AI chatbots', 'customer service chatbot', 'AI customer support', 'lead generation bot', 'automated support'],
    benefits: ['24/7 Availability', 'Instant Responses', 'Lead Qualification', 'Cost Reduction'],
  },
  {
    id: 'inventory-systems',
    title: 'Inventory Management',
    slug: 'inventory-systems',
    description: 'Complete inventory tracking and warehouse management solutions for businesses.',
    keywords: ['inventory management', 'stock tracking', 'warehouse management', 'inventory software', 'stock control'],
    benefits: ['Real-time Tracking', 'Low Stock Alerts', 'Barcode Support', 'Multi-location'],
  },
  {
    id: 'ecommerce-solutions',
    title: 'E-commerce Solutions',
    slug: 'ecommerce-solutions',
    description: 'Online store solutions with payment integration and inventory management.',
    keywords: ['e-commerce solutions', 'online store', 'e-commerce website', 'online payments', 'shopping cart'],
    benefits: ['Secure Payments', 'Inventory Management', 'Mobile Optimized', 'SEO Ready'],
  },
  {
    id: 'custom-software-development',
    title: 'Business Automation',
    slug: 'custom-software-development',
    description: 'Workflow automation and process optimization for business efficiency.',
    keywords: ['business automation', 'workflow automation', 'process automation', 'business software', 'automation solutions'],
    benefits: ['Reduce Manual Work', 'Faster Processes', 'Error Reduction', 'Cost Savings'],
  },
  {
    id: 'school-management',
    title: 'School Management',
    slug: 'school-management',
    description: 'Complete school administration software for student records, fees, attendance, examinations, and academic reporting.',
    keywords: ['school management software', 'school ERP', 'student management system', 'fee management', 'academic software'],
    benefits: ['Student Records', 'Online Fee Payment', 'Attendance Tracking', 'Academic Reports'],
  },
  {
    id: 'hotel-management',
    title: 'Hotel Management',
    slug: 'hotel-management',
    description: 'Hotel and hospitality management systems for reservations, front desk, housekeeping, billing, and restaurant operations.',
    keywords: ['hotel management system', 'hotel software', 'hospitality software', 'restaurant POS', 'booking system'],
    benefits: ['Online Reservations', 'Front Desk', 'Restaurant POS', 'Billing & Reports'],
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    slug: 'it-consulting',
    description: 'Technology strategy, infrastructure planning, digital transformation, and IT advisory services.',
    keywords: ['IT consulting', 'technology strategy', 'digital transformation', 'IT advisory', 'infrastructure planning'],
    benefits: ['Strategic Planning', 'Infrastructure Audit', 'Cost Optimization', 'Digital Roadmap'],
  },
  {
    id: 'healthcare-management',
    title: 'Healthcare Management',
    slug: 'healthcare-management',
    description: 'Patient management systems for hospitals, clinics, and healthcare providers with EMR andbilling.',
    keywords: ['healthcare software', 'hospital management', 'patient records', 'EMR', 'medical billing'],
    benefits: ['Patient Records', 'Appointment Scheduling', 'Billing', 'Pharmacy Management'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    description: 'Professional UI/UX design services for web, mobile, and enterprise applications.',
    keywords: ['UI design', 'UX design', 'product design', 'interface design', 'design systems'],
    benefits: ['User Research', 'Wireframes', 'Prototyping', 'Design Systems'],
  },
  {
    id: 'crm-systems',
    title: 'CRM Systems',
    slug: 'crm-systems',
    description: 'Customer relationship management solutions for sales, marketing, and customer service teams.',
    keywords: ['CRM software', 'customer relationship management', 'sales CRM', 'lead management', 'pipeline management'],
    benefits: ['Lead Tracking', 'Sales Pipeline', 'Customer Analytics', 'Automation'],
  },
  {
    id: 'api-development-integrations',
    title: 'API Development',
    slug: 'api-development-integrations',
    description: 'Custom API development and system integration services for enterprise connectivity.',
    keywords: ['API development', 'system integration', 'REST API', 'Web services', 'data integration'],
    benefits: ['Custom APIs', 'Third-party Integration', 'Data Sync', 'Documentation'],
  },
  {
    id: 'data-analytics-bi',
    title: 'Data Analytics & BI',
    slug: 'data-analytics-bi',
    description: 'Business intelligence and data analytics solutions for decision-making and reporting.',
    keywords: ['data analytics', 'business intelligence', 'BI dashboards', 'reporting', 'data visualization'],
    benefits: ['Real-time Dashboards', 'Custom Reports', 'Data Visualization', 'Predictive Analytics'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    slug: 'cloud-devops',
    description: 'Cloud infrastructure and DevOps services for reliable application delivery.',
    keywords: ['cloud hosting', 'DevOps', 'AWS', 'Azure', 'cloud migration'],
    benefits: ['Scalable Infrastructure', 'CI/CD', 'Monitoring', 'Security'],
  },
  {
    id: 'cybersecurity-services',
    title: 'Cybersecurity Services',
    slug: 'cybersecurity-services',
    description: 'Enterprise cybersecurity solutions including penetration testing and security audits.',
    keywords: ['cybersecurity', 'penetration testing', 'security audit', 'data protection', 'compliance'],
    benefits: ['Security Audit', 'Penetration Testing', 'Compliance', '24/7 Monitoring'],
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

export const generateLocationPageUrl = (serviceSlug: string, countySlug: string) =>
  `/services/${serviceSlug}/${countySlug}`;

export const generateConstituencyServiceMetadata = (
  county: KenyanCounty,
  constituency: string,
  service: LocationService,
) => {
  const title = `${service.title} in ${constituency}, ${county.name} | SMA Systems`;
  const description = `${service.description} Professional ${service.title.toLowerCase()} services in ${constituency}, ${county.name}, ${county.region} Kenya.`;

  return {
    title,
    description,
    keywords: [
      `${service.title} ${constituency}`,
      `${service.title} ${county.name}`,
      `${constituency} ${service.title.toLowerCase()}`,
      ...service.keywords,
      ...county.keywords,
    ],
    openGraph: {
      title,
      description,
    },
  };
};

export const generateConstituencyPageUrl = (
  serviceSlug: string,
  countySlug: string,
  constituencySlug: string,
) => `/services/${serviceSlug}/${countySlug}/${constituencySlug}`;

export const generateCountyLocationUrl = (countySlug: string) =>
  `/services/location/${countySlug}`;

export const generateCountyConstituencyUrl = (
  countySlug: string,
  constituencySlug: string,
) => `/services/location/${countySlug}/${constituencySlug}`;
