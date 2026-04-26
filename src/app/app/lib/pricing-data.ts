export interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceSuffix?: string;
  features: string[];
  popular?: boolean;
  cta: string;
  href: string;
}

export interface PricingService {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  hero: {
    title: string;
    subtitle: string;
  };
  plans: PricingPlan[];
  features: {
    name: string;
    tiers: boolean[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface PricingCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  services: string[];
}

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'enterprise',
    name: 'Enterprise Systems',
    slug: 'enterprise',
    description: 'Large-scale business management solutions',
    icon: 'building-2',
    color: 'blue',
    services: ['erp', 'crm', 'pos'],
  },
  {
    id: 'industry',
    name: 'Industry Solutions',
    slug: 'industry',
    description: 'Sector-specific management systems',
    icon: 'briefcase',
    color: 'emerald',
    services: ['school', 'health', 'hotel'],
  },
  {
    id: 'development',
    name: 'Development',
    slug: 'development',
    description: 'Custom software and web solutions',
    icon: 'code',
    color: 'violet',
    services: ['web-development', 'mobile-apps', 'custom'],
  },
  {
    id: 'services',
    name: 'Professional Services',
    slug: 'services',
    description: 'Technical support and integrations',
    icon: 'wrench',
    color: 'amber',
    services: ['apis', 'hosting', 'maintenance'],
  },
];

export const PRICING_SERVICES: PricingService[] = [
  {
    id: 'erp',
    slug: 'erp',
    name: 'ERP Systems',
    shortName: 'ERP',
    description: 'Enterprise resource planning solutions that integrate all your business processes into a unified system.',
    hero: {
      title: 'ERP System Pricing',
      subtitle: 'Transform your business operations with our comprehensive ERP solutions designed for Kenyan businesses.',
    },
    plans: [
      {
        id: 'erp-starter',
        name: 'Starter ERP',
        description: 'Essential ERP for small businesses',
        price: 250000,
        priceSuffix: 'one-time',
        features: [
          'Finance module',
          'Basic inventory',
          '5 user accounts',
          'Email support',
          'Basic reporting',
        ],
        cta: 'Get Started',
        href: '/contact?plan=erp-starter',
      },
      {
        id: 'erp-growth',
        name: 'Growth ERP',
        description: 'Full-featured ERP for growing companies',
        price: 550000,
        priceSuffix: 'one-time',
        features: [
          'All Starter features',
          'HR module',
          'CRM integration',
          '20 user accounts',
          'Priority support',
          'Advanced analytics',
        ],
        popular: true,
        cta: 'Get Started',
        href: '/contact?plan=erp-growth',
      },
      {
        id: 'erp-enterprise',
        name: 'Enterprise ERP',
        description: 'Complete ERP for large organizations',
        price: 1200000,
        priceSuffix: 'one-time',
        features: [
          'All Growth features',
          'Multi-branch support',
          'Custom integrations',
          'Unlimited users',
          '24/7 dedicated support',
          'White-label options',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=erp-enterprise',
      },
    ],
    features: [
      { name: 'Finance Management', tiers: [true, true, true] },
      { name: 'Inventory Tracking', tiers: [true, true, true] },
      { name: 'HR Module', tiers: [false, true, true] },
      { name: 'CRM Integration', tiers: [false, true, true] },
      { name: 'Multi-branch', tiers: [false, false, true] },
      { name: 'Custom APIs', tiers: [false, false, true] },
    ],
    faqs: [
      {
        question: 'How long does ERP implementation take?',
        answer: 'Implementation timelines vary based on complexity. Starter ERP takes 4-8 weeks, Growth ERP takes 8-16 weeks, and Enterprise ERP takes 16-24 weeks.',
      },
      {
        question: 'Can I migrate from my existing system?',
        answer: 'Yes, we offer data migration services from most legacy systems. Our team ensures minimal downtime during transition.',
      },
      {
        question: 'Do you offer training?',
        answer: 'Yes, all plans include comprehensive training for your team. Enterprise plans include on-site training.',
      },
    ],
  },
  {
    id: 'pos',
    slug: 'pos',
    name: 'POS Systems',
    shortName: 'POS',
    description: 'Modern point of sale systems with KRA compliance, inventory management, and multi-payment integration.',
    hero: {
      title: 'POS System Pricing',
      subtitle: 'Streamline your retail or restaurant operations with our feature-rich POS solutions.',
    },
    plans: [
      {
        id: 'pos-starter',
        name: 'Single Outlet',
        description: 'Perfect for small retail shops',
        price: 85000,
        priceSuffix: 'one-time',
        features: [
          'POS software',
          'Basic inventory',
          'Receipt printing',
          '2 staff accounts',
          'Email support',
        ],
        cta: 'Get Started',
        href: '/contact?plan=pos-starter',
      },
      {
        id: 'pos-growth',
        name: 'Multi-Branch',
        description: 'For growing retail chains',
        price: 220000,
        priceSuffix: 'one-time',
        features: [
          'All Starter features',
          'Multi-branch management',
          'M-Pesa integration',
          'KRA eTIMS ready',
          'Customer loyalty',
          'Advanced reports',
        ],
        popular: true,
        cta: 'Get Started',
        href: '/contact?plan=pos-growth',
      },
      {
        id: 'pos-enterprise',
        name: 'Retail Suite',
        description: 'Enterprise retail management',
        price: 550000,
        priceSuffix: 'one-time',
        features: [
          'All Growth features',
          'ERP integration',
          'E-commerce sync',
          'Custom workflows',
          'API access',
          'Dedicated support',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=pos-enterprise',
      },
    ],
    features: [
      { name: 'POS Software', tiers: [true, true, true] },
      { name: 'Inventory Management', tiers: [true, true, true] },
      { name: 'Multi-branch', tiers: [false, true, true] },
      { name: 'M-Pesa Integration', tiers: [false, true, true] },
      { name: 'KRA eTIMS', tiers: [false, true, true] },
      { name: 'E-commerce Sync', tiers: [false, false, true] },
    ],
    faqs: [
      {
        question: 'Is the POS KRA compliant?',
        answer: 'Yes, all our POS systems are eTIMS ready and comply with KRA requirements for tax invoicing.',
      },
      {
        question: 'What hardware do I need?',
        answer: 'We provide compatible hardware recommendations. Basic setup requires a computer/tablet and receipt printer.',
      },
      {
        question: 'Can I use M-Pesa for payments?',
        answer: 'Yes, our POS systems integrate with M-Pesa for seamless mobile money payments.',
      },
    ],
  },
  {
    id: 'school',
    slug: 'school',
    name: 'School Management',
    shortName: 'School',
    description: 'Complete school management system for fee collection, attendance, examinations, and parent communication.',
    hero: {
      title: 'School Management System Pricing',
      subtitle: 'Digitalize your school operations with our comprehensive education management solution.',
    },
    plans: [
      {
        id: 'school-starter',
        name: 'Primary School',
        description: 'For small to medium schools',
        price: 180000,
        priceSuffix: 'one-time',
        features: [
          'Student records',
          'Fee management',
          'Attendance tracking',
          'SMS notifications',
          'Basic reports',
        ],
        cta: 'Get Started',
        href: '/contact?plan=school-starter',
      },
      {
        id: 'school-growth',
        name: 'Secondary School',
        description: 'For secondary schools and colleges',
        price: 380000,
        priceSuffix: 'one-time',
        features: [
          'All Starter features',
          'Examination management',
          'Parent portal',
          'Library management',
          'Timetable scheduling',
          'Transport tracking',
        ],
        popular: true,
        cta: 'Get Started',
        href: '/contact?plan=school-growth',
      },
      {
        id: 'school-enterprise',
        name: 'Institution Suite',
        description: 'For universities and groups',
        price: 850000,
        priceSuffix: 'one-time',
        features: [
          'All Growth features',
          'Multi-campus support',
          'Online admissions',
          'E-learning integration',
          'Custom reporting',
          'API access',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=school-enterprise',
      },
    ],
    features: [
      { name: 'Student Records', tiers: [true, true, true] },
      { name: 'Fee Management', tiers: [true, true, true] },
      { name: 'Attendance', tiers: [true, true, true] },
      { name: 'Examinations', tiers: [false, true, true] },
      { name: 'Parent Portal', tiers: [false, true, true] },
      { name: 'Multi-campus', tiers: [false, false, true] },
    ],
    faqs: [
      {
        question: 'Can parents view student progress online?',
        answer: 'Yes, the parent portal allows guardians to view attendance, grades, and fee balances in real-time.',
      },
      {
        question: 'Do you support M-Pesa for fee collection?',
        answer: 'Yes, we integrate with M-Pesa for convenient fee payments and automatic reconciliation.',
      },
      {
        question: 'Is exam management included?',
        answer: 'Exam management is available in Growth and Enterprise plans with grade calculation and reporting.',
      },
    ],
  },
  {
    id: 'health',
    slug: 'health',
    name: 'Hospital Management',
    shortName: 'Health',
    description: 'Comprehensive healthcare management system for clinics, hospitals, and medical practices.',
    hero: {
      title: 'Healthcare System Pricing',
      subtitle: 'Modern healthcare management solutions for efficient patient care and hospital operations.',
    },
    plans: [
      {
        id: 'health-starter',
        name: 'Clinic',
        description: 'For small clinics and practices',
        price: 220000,
        priceSuffix: 'one-time',
        features: [
          'Patient records',
          'Appointment booking',
          'Consultation notes',
          'Basic pharmacy',
          'Billing',
        ],
        cta: 'Get Started',
        href: '/contact?plan=health-starter',
      },
      {
        id: 'health-growth',
        name: 'Medical Center',
        description: 'For multi-doctor facilities',
        price: 480000,
        priceSuffix: 'one-time',
        features: [
          'All Clinic features',
          'Lab integration',
          'Insurance billing',
          'Online bookings',
          'Advanced reports',
          'SMS reminders',
        ],
        popular: true,
        cta: 'Get Started',
        href: '/contact?plan=health-growth',
      },
      {
        id: 'health-enterprise',
        name: 'Hospital Suite',
        description: 'For hospitals and chains',
        price: 1100000,
        priceSuffix: 'one-time',
        features: [
          'All Medical Center features',
          'Bed management',
          'Theatre scheduling',
          'Insurance pre-auth',
          'Multi-branch',
          'Custom integrations',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=health-enterprise',
      },
    ],
    features: [
      { name: 'Patient Records', tiers: [true, true, true] },
      { name: 'Appointments', tiers: [true, true, true] },
      { name: 'Pharmacy', tiers: [true, true, true] },
      { name: 'Lab Integration', tiers: [false, true, true] },
      { name: 'Insurance Billing', tiers: [false, true, true] },
      { name: 'Bed Management', tiers: [false, false, true] },
    ],
    faqs: [
      {
        question: 'Is NHIF integration supported?',
        answer: 'Yes, our health systems support NHIF claims processing and verification.',
      },
      {
        question: 'Can patients book appointments online?',
        answer: 'Yes, the online booking system allows patients to schedule appointments through your website.',
      },
      {
        question: 'Do you offer telemedicine features?',
        answer: 'Yes, we can integrate with telemedicine platforms for virtual consultations.',
      },
    ],
  },
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'Web Development',
    shortName: 'Web',
    description: 'Custom website and web application development for businesses of all sizes.',
    hero: {
      title: 'Web Development Pricing',
      subtitle: 'Professional web solutions from landing pages to enterprise web applications.',
    },
    plans: [
      {
        id: 'web-starter',
        name: 'Business Website',
        description: 'Professional business website',
        price: 65000,
        priceSuffix: 'one-time',
        features: [
          'Up to 10 pages',
          'Mobile responsive',
          'Contact forms',
          'Basic SEO',
          'Social media links',
        ],
        cta: 'Get Started',
        href: '/contact?plan=web-starter',
      },
      {
        id: 'web-growth',
        name: 'Business Pro',
        description: 'Feature-rich business website',
        price: 150000,
        priceSuffix: 'one-time',
        features: [
          'Up to 25 pages',
          'CMS included',
          'Blog integration',
          'Advanced SEO',
          'Lead capture forms',
          'Live chat',
        ],
        popular: true,
        cta: 'Get Started',
        href: '/contact?plan=web-growth',
      },
      {
        id: 'web-enterprise',
        name: 'Web Application',
        description: 'Custom web application',
        price: 350000,
        priceSuffix: 'one-time',
        features: [
          'Custom functionality',
          'User authentication',
          'Database integration',
          'API development',
          'Admin dashboard',
          '3 months support',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=web-enterprise',
      },
    ],
    features: [
      { name: 'Pages', tiers: ['10', '25', 'Unlimited'] },
      { name: 'Mobile Responsive', tiers: [true, true, true] },
      { name: 'CMS', tiers: [false, true, true] },
      { name: 'Blog', tiers: [false, true, true] },
      { name: 'Custom Functionality', tiers: [false, false, true] },
      { name: 'API Access', tiers: [false, false, true] },
    ],
    faqs: [
      {
        question: 'How long does it take to build a website?',
        answer: 'Business websites take 2-4 weeks. Web applications take 8-16 weeks depending on complexity.',
      },
      {
        question: 'Do you provide domain and hosting?',
        answer: 'Yes, we can handle everything including domain registration and hosting setup.',
      },
      {
        question: 'Can I update the website myself?',
        answer: 'Yes, all our websites include an easy-to-use content management system.',
      },
    ],
  },
  {
    id: 'mobile-apps',
    slug: 'mobile-apps',
    name: 'Mobile App Development',
    shortName: 'Mobile',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    hero: {
      title: 'Mobile App Pricing',
      subtitle: 'High-quality mobile apps for iOS and Android tailored to your business needs.',
    },
    plans: [
      {
        id: 'mobile-starter',
        name: 'MVP App',
        description: 'Basic mobile application',
        price: 250000,
        priceSuffix: 'one-time',
        features: [
          'iOS & Android',
          'User authentication',
          'Basic UI/UX',
          'Push notifications',
          '2 months support',
        ],
        cta: 'Get Started',
        href: '/contact?plan=mobile-starter',
      },
      {
        id: 'mobile-growth',
        name: 'Business App',
        description: 'Full-featured mobile app',
        price: 550000,
        priceSuffix: 'one-time',
        features: [
          'All MVP features',
          'API integration',
          'Offline mode',
          'Analytics',
          'Admin panel',
          '6 months support',
        ],
        popular: true,
        cta: 'Get Started',
        href: '/contact?plan=mobile-growth',
      },
      {
        id: 'mobile-enterprise',
        name: 'Enterprise App',
        description: 'Complex enterprise mobile solution',
        price: 1200000,
        priceSuffix: 'one-time',
        features: [
          'All Business features',
          'Custom integrations',
          'Advanced security',
          'White-label',
          'Dedicated support',
          '12 months support',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=mobile-enterprise',
      },
    ],
    features: [
      { name: 'iOS App', tiers: [true, true, true] },
      { name: 'Android App', tiers: [true, true, true] },
      { name: 'Offline Mode', tiers: [false, true, true] },
      { name: 'API Integration', tiers: [false, true, true] },
      { name: 'Custom Integrations', tiers: [false, false, true] },
      { name: 'White-label', tiers: [false, false, true] },
    ],
    faqs: [
      {
        question: 'Will my app be available on both iOS and Android?',
        answer: 'Yes, all our apps are developed cross-platform to work on both iOS and Android.',
      },
      {
        question: 'How long does app development take?',
        answer: 'MVP apps take 8-12 weeks. Full-featured apps take 16-24 weeks.',
      },
      {
        question: 'Do you publish to app stores?',
        answer: 'Yes, we handle the entire app store submission process for both Apple App Store and Google Play.',
      },
    ],
  },
  {
    id: 'apis',
    slug: 'apis',
    name: 'API Integrations',
    shortName: 'APIs',
    description: 'Professional API development and system integration services for seamless connectivity.',
    hero: {
      title: 'API Integration Pricing',
      subtitle: 'Connect your systems with robust APIs and integrations for efficient data flow.',
    },
    plans: [
      {
        id: 'api-starter',
        name: 'Single Integration',
        description: 'Connect one external service',
        price: 75000,
        priceSuffix: 'one-time',
        features: [
          'One API connection',
          'Webhook handling',
          'Basic documentation',
          'Error logging',
          '2 weeks delivery',
        ],
        cta: 'Get Started',
        href: '/contact?plan=api-starter',
      },
      {
        id: 'api-growth',
        name: 'Integration Hub',
        description: 'Connect multiple services',
        price: 200000,
        priceSuffix: 'one-time',
        features: [
          'Up to 4 integrations',
          'Data mapping',
          'Retry logic',
          'Admin dashboard',
          '4 weeks delivery',
        ],
        popular: true,
        cta: 'Get Started',
        href: '/contact?plan=api-growth',
      },
      {
        id: 'api-enterprise',
        name: 'Enterprise Layer',
        description: 'Full integration ecosystem',
        price: 500000,
        priceSuffix: 'one-time',
        features: [
          'Unlimited integrations',
          'Custom middleware',
          'Advanced security',
          'Monitoring & alerts',
          'Full documentation',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=api-enterprise',
      },
    ],
    features: [
      { name: 'API Connections', tiers: ['1', '4', 'Unlimited'] },
      { name: 'Webhook Support', tiers: [true, true, true] },
      { name: 'Data Mapping', tiers: [false, true, true] },
      { name: 'Middleware', tiers: [false, false, true] },
      { name: 'Monitoring', tiers: [false, false, true] },
      { name: 'Custom Security', tiers: [false, false, true] },
    ],
    faqs: [
      {
        question: 'What APIs can you integrate with?',
        answer: 'We integrate with M-Pesa,Stripe, PayPal, QuickBooks, Xero, Salesforce, and most REST/SOAP APIs.',
      },
      {
        question: 'How long does integration take?',
        answer: 'Single integrations take 1-2 weeks. Multi-system integrations take 4-8 weeks.',
      },
      {
        question: 'Do you provide API documentation?',
        answer: 'Yes, all integrations include comprehensive API documentation.',
      },
    ],
  },
  {
    id: 'hosting',
    slug: 'hosting',
    name: 'Hosting & Maintenance',
    shortName: 'Hosting',
    description: 'Reliable hosting and ongoing maintenance services to keep your systems running smoothly.',
    hero: {
      title: 'Hosting & Maintenance Pricing',
      subtitle: 'Secure, reliable hosting and proactive maintenance for your web applications.',
    },
    plans: [
      {
        id: 'hosting-starter',
        name: 'Basic Care',
        description: 'Essential maintenance plan',
        price: 15000,
        priceSuffix: '/month',
        features: [
          'Monthly updates',
          'Daily backups',
          'Basic monitoring',
          'Email support',
          'SSL certificate',
        ],
        cta: 'Subscribe',
        href: '/contact?plan=hosting-starter',
      },
      {
        id: 'hosting-growth',
        name: 'Growth Care',
        description: 'Enhanced maintenance',
        price: 45000,
        priceSuffix: '/month',
        features: [
          'Weekly updates',
          'Real-time backups',
          'Performance monitoring',
          'Priority support',
          'Security scans',
          'Uptime checks',
        ],
        popular: true,
        cta: 'Subscribe',
        href: '/contact?plan=hosting-growth',
      },
      {
        id: 'hosting-enterprise',
        name: 'Business SLA',
        description: 'Full support package',
        price: 95000,
        priceSuffix: '/month',
        features: [
          'Real-time updates',
          'Hourly backups',
          'Advanced monitoring',
          '24/7 support',
          'Incident response',
          'Dedicated manager',
        ],
        cta: 'Contact Sales',
        href: '/contact?plan=hosting-enterprise',
      },
    ],
    features: [
      { name: 'Updates', tiers: ['Monthly', 'Weekly', 'Real-time'] },
      { name: 'Backups', tiers: ['Daily', 'Real-time', 'Hourly'] },
      { name: 'Monitoring', tiers: ['Basic', 'Performance', 'Advanced'] },
      { name: 'Support', tiers: ['Email', 'Priority', '24/7'] },
      { name: 'Security Scans', tiers: [false, true, true] },
      { name: 'Incident Response', tiers: [false, false, true] },
    ],
    faqs: [
      {
        question: 'What hosting infrastructure do you use?',
        answer: 'We use AWS, Google Cloud, and DigitalOcean with 99.9% uptime guarantees.',
      },
      {
        question: 'How often are backups performed?',
        answer: 'Backup frequency varies by plan - daily for Starter, real-time for Growth, hourly for Enterprise.',
      },
      {
        question: 'What happens if my site goes down?',
        answer: 'Our monitoring systems alert us immediately. Enterprise plans include 24/7 incident response.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): PricingService | undefined {
  return PRICING_SERVICES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return PRICING_SERVICES.map((service) => service.slug);
}
