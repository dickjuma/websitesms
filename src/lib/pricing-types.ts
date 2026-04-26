import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'KES'): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'monthly' | 'one-time';
  popular?: boolean;
  features: string[];
  cta: string;
  href: string;
}

export interface PricingService {
  _id?: string;
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription?: string;
  hero: {
    title: string;
    subtitle: string;
  };
  plans: PricingPlan[];
  features: {
    name: string;
    tiers: (boolean | string)[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Predefined services that are offered
export const PRICING_SERVICES = [
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'Web Development',
    shortName: 'Web',
    description: 'Custom websites and web applications.',
    longDescription: 'Professional web development from landing pages to enterprise web applications. SEO-optimized and mobile-responsive.',
    hero: {
      title: 'Web Development Pricing',
      subtitle: 'Professional web solutions from landing pages to enterprise web applications.',
    },
    plans: [], // Empty initially, admin will add plans
    features: [], // Empty initially, admin will add features
    faqs: [], // Empty initially, admin will add FAQs
  },
  {
    id: 'mobile-apps',
    slug: 'mobile-apps',
    name: 'Mobile App Development',
    shortName: 'Mobile',
    description: 'Native and cross-platform mobile apps.',
    longDescription: 'High-quality mobile apps for iOS and Android. Cross-platform development for maximum reach.',
    hero: {
      title: 'Mobile App Pricing',
      subtitle: 'High-quality mobile apps for iOS and Android tailored to your business.',
    },
    plans: [],
    features: [],
    faqs: [],
  },
  {
    id: 'erp-systems',
    slug: 'erp-systems',
    name: 'ERP Systems',
    shortName: 'ERP',
    description: 'Enterprise resource planning solutions.',
    longDescription: 'Comprehensive ERP systems that integrate finance, inventory, HR, and operations into one unified platform.',
    hero: {
      title: 'ERP System Pricing',
      subtitle: 'Transform your business operations with our comprehensive ERP solutions.',
    },
    plans: [],
    features: [],
    faqs: [],
  },
  {
    id: 'pos-systems',
    slug: 'pos-systems',
    name: 'POS Systems',
    shortName: 'POS',
    description: 'Point of sale solutions with KRA compliance.',
    longDescription: 'Modern POS systems with eTIMS compliance, inventory management, and M-Pesa integration.',
    hero: {
      title: 'POS System Pricing',
      subtitle: 'Streamline your retail operations with our KRA-compliant POS solutions.',
    },
    plans: [],
    features: [],
    faqs: [],
  },
  {
    id: 'school-management',
    slug: 'school-management',
    name: 'School Management',
    shortName: 'School',
    description: 'Complete school management system.',
    longDescription: 'Digital school management for fee collection, attendance, examinations, and parent communication.',
    hero: {
      title: 'School Management Pricing',
      subtitle: 'Digitalize your school operations with our comprehensive education management solution.',
    },
    plans: [],
    features: [],
    faqs: [],
  },
  {
    id: 'hospital-management',
    slug: 'hospital-management',
    name: 'Hospital Management',
    shortName: 'Health',
    description: 'Healthcare management for clinics and hospitals.',
    longDescription: 'Comprehensive healthcare system for patient records, appointments, billing, pharmacy, and reporting.',
    hero: {
      title: 'Healthcare System Pricing',
      subtitle: 'Modern healthcare management solutions for efficient patient care.',
    },
    plans: [],
    features: [],
    faqs: [],
  },
  {
    id: 'api-integrations',
    slug: 'api-integrations',
    name: 'API Integrations',
    shortName: 'APIs',
    description: 'API development and system integration.',
    longDescription: 'Connect your systems with robust APIs. M-Pesa, Stripe, QuickBooks, Xero, and custom integrations.',
    hero: {
      title: 'API Integration Pricing',
      subtitle: 'Connect your systems with robust APIs and integrations.',
    },
    plans: [],
    features: [],
    faqs: [],
  },
  {
    id: 'hotel-management',
    slug: 'hotel-management',
    name: 'Hotel Management',
    shortName: 'Hotel Software',
    description: 'Complete hotel and restaurant management system.',
    longDescription: 'Complete property management system for hotels, guesthouses, lodges, and restaurants.',
    hero: {
      title: 'Hotel Management Pricing',
      subtitle: 'Complete property management system for Kenyan hotels and restaurants.',
    },
    plans: [],
    features: [],
    faqs: [],
  },
];
