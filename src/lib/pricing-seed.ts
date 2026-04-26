import { createPricingService, getPricingServices } from '@/lib/database';

// Sample data for all services with complete pricing information
const SAMPLE_SERVICES_DATA = [
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
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Basic business website with essential features',
        price: 45000,
        priceType: 'one-time' as const,
        features: ['Up to 5 pages', 'Mobile responsive', 'Contact forms', 'Basic SEO'],
        cta: 'Request Quote',
        href: '/quote?service=web-development&plan=starter&type=one-time&price=45000',
      },
      {
        id: 'growth',
        name: 'Growth',
        description: 'Feature-rich business website with advanced functionality',
        price: 95000,
        priceType: 'one-time' as const,
        popular: true,
        features: ['Up to 15 pages', 'CMS included', 'Blog integration', 'Advanced SEO', 'Lead capture forms'],
        cta: 'Request Quote',
        href: '/quote?service=web-development&plan=growth&type=one-time&price=95000',
      },
      {
        id: 'custom',
        name: 'Custom',
        description: 'Tailored web solution for your specific requirements',
        price: 0,
        priceType: 'one-time' as const,
        features: ['Custom development', 'Advanced integrations', 'Scalable architecture', 'Ongoing support'],
        cta: 'Request Quote',
        href: '/quote?service=web-development&plan=custom&type=one-time',
      },
    ],
    features: [
      { name: 'Pages', tiers: ['5', '15', 'Unlimited'] },
      { name: 'CMS', tiers: [false, true, true] },
      { name: 'Custom Development', tiers: [false, false, true] },
    ],
    faqs: [
      { question: 'How long does it take to build a website?', answer: 'Starter websites take 2-3 weeks. Growth packages take 4-6 weeks. Custom projects vary based on complexity.' },
      { question: 'Do you provide domain and hosting?', answer: 'Yes, we can handle domain registration, hosting setup, and SSL certificates.' },
    ],
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
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Basic mobile application with core features',
        price: 120000,
        priceType: 'one-time' as const,
        features: ['iOS & Android', 'User authentication', 'Basic UI/UX', 'Push notifications'],
        cta: 'Request Quote',
        href: '/quote?service=mobile-apps&plan=starter&type=one-time&price=120000',
      },
      {
        id: 'growth',
        name: 'Growth',
        description: 'Feature-rich mobile app with advanced functionality',
        price: 250000,
        priceType: 'one-time' as const,
        popular: true,
        features: ['iOS & Android', 'Advanced UI/UX', 'API integrations', 'Analytics', 'In-app purchases'],
        cta: 'Request Quote',
        href: '/quote?service=mobile-apps&plan=growth&type=one-time&price=250000',
      },
      {
        id: 'custom',
        name: 'Custom',
        description: 'Enterprise-grade mobile solution',
        price: 0,
        priceType: 'one-time' as const,
        features: ['Custom development', 'Complex integrations', 'Scalable architecture', 'Enterprise features'],
        cta: 'Request Quote',
        href: '/quote?service=mobile-apps&plan=custom&type=one-time',
      },
    ],
    features: [
      { name: 'iOS App', tiers: [true, true, true] },
      { name: 'Android App', tiers: [true, true, true] },
      { name: 'Advanced Features', tiers: [false, true, true] },
    ],
    faqs: [
      { question: 'Will my app work on both iOS and Android?', answer: 'Yes, all our apps are developed cross-platform for both iOS and Android.' },
      { question: 'How long does app development take?', answer: 'Starter apps take 8-12 weeks. Growth packages take 16-20 weeks. Custom projects vary.' },
    ],
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
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Basic ERP for small businesses',
        price: 25000,
        priceType: 'monthly' as const,
        features: ['Inventory management', 'Basic reporting', 'User management', 'Email support'],
        cta: 'Get Started',
        href: '/quote?service=erp-systems&plan=starter&type=subscription&price=25000',
      },
      {
        id: 'growth',
        name: 'Professional',
        description: 'Complete ERP suite for growing businesses',
        price: 50000,
        priceType: 'monthly' as const,
        popular: true,
        features: ['All starter features', 'Financial management', 'HR module', 'Advanced reporting', 'API access'],
        cta: 'Get Started',
        href: '/quote?service=erp-systems&plan=growth&type=subscription&price=50000',
      },
      {
        id: 'pro',
        name: 'Enterprise',
        description: 'Full-featured ERP with custom integrations',
        price: 150000,
        priceType: 'monthly' as const,
        features: ['All professional features', 'Custom integrations', 'Multi-company', 'Advanced analytics', 'Priority support'],
        cta: 'Get Started',
        href: '/quote?service=erp-systems&plan=pro&type=subscription&price=150000',
      },
      {
        id: 'custom',
        name: 'Custom',
        description: 'Tailored ERP solution for your industry',
        price: 0,
        priceType: 'monthly' as const,
        features: ['Industry-specific modules', 'Custom workflows', 'Advanced integrations', 'Dedicated support'],
        cta: 'Request Quote',
        href: '/quote?service=erp-systems&plan=custom&type=subscription',
      },
    ],
    features: [
      { name: 'Inventory Management', tiers: [true, true, true, true] },
      { name: 'Financial Management', tiers: [false, true, true, true] },
      { name: 'HR Module', tiers: [false, true, true, true] },
      { name: 'Custom Integrations', tiers: [false, false, true, true] },
    ],
    faqs: [
      { question: 'Can I migrate from my existing system?', answer: 'Yes, we provide data migration services and training for a smooth transition.' },
      { question: 'Is training included?', answer: 'Yes, comprehensive training and documentation are included with all plans.' },
    ],
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
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Basic POS for small retail shops',
        price: 15000,
        priceType: 'monthly' as const,
        features: ['Sales processing', 'Inventory tracking', 'Basic reporting', 'KRA compliance'],
        cta: 'Get Started',
        href: '/quote?service=pos-systems&plan=starter&type=subscription&price=15000',
      },
      {
        id: 'growth',
        name: 'Professional',
        description: 'Advanced POS for retail chains',
        price: 30000,
        priceType: 'monthly' as const,
        popular: true,
        features: ['All starter features', 'Multi-store support', 'Advanced reporting', 'M-Pesa integration', 'Customer loyalty'],
        cta: 'Get Started',
        href: '/quote?service=pos-systems&plan=growth&type=subscription&price=30000',
      },
      {
        id: 'custom',
        name: 'Custom',
        description: 'Tailored POS solution for your business',
        price: 0,
        priceType: 'monthly' as const,
        features: ['Custom integrations', 'Industry-specific features', 'Advanced analytics', 'Dedicated support'],
        cta: 'Request Quote',
        href: '/quote?service=pos-systems&plan=custom&type=subscription',
      },
    ],
    features: [
      { name: 'KRA Compliance', tiers: [true, true, true] },
      { name: 'M-Pesa Integration', tiers: [false, true, true] },
      { name: 'Multi-store', tiers: [false, true, true] },
    ],
    faqs: [
      { question: 'Is the system KRA compliant?', answer: 'Yes, all our POS systems are fully compliant with KRA regulations including eTIMS.' },
      { question: 'Can I accept M-Pesa payments?', answer: 'Yes, Professional and Custom plans include M-Pesa integration.' },
    ],
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
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Basic school management for small institutions',
        price: 20000,
        priceType: 'monthly' as const,
        features: ['Student registration', 'Fee management', 'Basic reporting', 'Parent portal'],
        cta: 'Get Started',
        href: '/quote?service=school-management&plan=starter&type=subscription&price=20000',
      },
      {
        id: 'growth',
        name: 'Professional',
        description: 'Complete school management suite',
        price: 40000,
        priceType: 'monthly' as const,
        popular: true,
        features: ['All starter features', 'Attendance tracking', 'Exam management', 'Timetable', 'SMS notifications'],
        cta: 'Get Started',
        href: '/quote?service=school-management&plan=growth&type=subscription&price=40000',
      },
      {
        id: 'custom',
        name: 'Custom',
        description: 'Tailored solution for educational institutions',
        price: 0,
        priceType: 'monthly' as const,
        features: ['Custom modules', 'Advanced integrations', 'Multi-branch support', 'Dedicated support'],
        cta: 'Request Quote',
        href: '/quote?service=school-management&plan=custom&type=subscription',
      },
    ],
    features: [
      { name: 'Fee Management', tiers: [true, true, true] },
      { name: 'Exam Management', tiers: [false, true, true] },
      { name: 'SMS Integration', tiers: [false, true, true] },
    ],
    faqs: [
      { question: 'Can parents access student information?', answer: 'Yes, parents get secure access to view fees, attendance, and academic progress.' },
      { question: 'Is mobile access available?', answer: 'Yes, the system includes mobile-responsive design and dedicated mobile apps.' },
    ],
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
    plans: [
      {
        id: 'starter',
        name: 'Clinic',
        description: 'Basic clinic management system',
        price: 35000,
        priceType: 'monthly' as const,
        features: ['Patient records', 'Appointment scheduling', 'Basic billing', 'Medical inventory'],
        cta: 'Get Started',
        href: '/quote?service=hospital-management&plan=starter&type=subscription&price=35000',
      },
      {
        id: 'growth',
        name: 'Hospital',
        description: 'Complete hospital management system',
        price: 75000,
        priceType: 'monthly' as const,
        popular: true,
        features: ['All clinic features', 'Advanced billing', 'Pharmacy management', 'Lab integration', 'Patient portal'],
        cta: 'Get Started',
        href: '/quote?service=hospital-management&plan=growth&type=subscription&price=75000',
      },
      {
        id: 'custom',
        name: 'Enterprise',
        description: 'Enterprise healthcare management',
        price: 0,
        priceType: 'monthly' as const,
        features: ['Multi-facility support', 'Advanced integrations', 'Custom modules', 'Priority support'],
        cta: 'Request Quote',
        href: '/quote?service=hospital-management&plan=custom&type=subscription',
      },
    ],
    features: [
      { name: 'Patient Records', tiers: [true, true, true] },
      { name: 'Pharmacy Management', tiers: [false, true, true] },
      { name: 'Lab Integration', tiers: [false, true, true] },
    ],
    faqs: [
      { question: 'Is the system HIPAA compliant?', answer: 'Yes, our healthcare systems are designed with security and compliance in mind.' },
      { question: 'Can it integrate with existing medical equipment?', answer: 'Yes, we provide integrations with various medical devices and lab equipment.' },
    ],
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
    plans: [
      {
        id: 'starter',
        name: 'Basic',
        description: 'Simple API integrations',
        price: 50000,
        priceType: 'one-time' as const,
        features: ['1-2 API integrations', 'Basic documentation', 'Testing support', '1 month maintenance'],
        cta: 'Request Quote',
        href: '/quote?service=api-integrations&plan=starter&type=one-time&price=50000',
      },
      {
        id: 'growth',
        name: 'Advanced',
        description: 'Complex API integrations and custom development',
        price: 150000,
        priceType: 'one-time' as const,
        popular: true,
        features: ['3-5 API integrations', 'Custom API development', 'Advanced documentation', '3 months maintenance'],
        cta: 'Request Quote',
        href: '/quote?service=api-integrations&plan=growth&type=one-time&price=150000',
      },
      {
        id: 'custom',
        name: 'Enterprise',
        description: 'Large-scale integration projects',
        price: 0,
        priceType: 'one-time' as const,
        features: ['Unlimited integrations', 'Enterprise architecture', 'Ongoing maintenance', 'Dedicated support'],
        cta: 'Request Quote',
        href: '/quote?service=api-integrations&plan=custom&type=one-time',
      },
    ],
    features: [
      { name: 'API Integrations', tiers: ['1-2', '3-5', 'Unlimited'] },
      { name: 'Custom Development', tiers: [false, true, true] },
      { name: 'Ongoing Maintenance', tiers: [false, false, true] },
    ],
    faqs: [
      { question: 'Which payment gateways do you support?', answer: 'We support M-Pesa, Stripe, PayPal, and can integrate with any payment gateway.' },
      { question: 'How long does integration take?', answer: 'Basic integrations take 1-2 weeks. Advanced integrations take 4-8 weeks.' },
    ],
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
    plans: [
      {
        id: 'starter',
        name: 'Basic',
        description: 'Essential hotel management features',
        price: 25000,
        priceType: 'monthly' as const,
        features: ['Room booking', 'Guest management', 'Basic reporting', 'Front desk operations'],
        cta: 'Get Started',
        href: '/quote?service=hotel-management&plan=starter&type=subscription&price=25000',
      },
      {
        id: 'growth',
        name: 'Professional',
        description: 'Complete hotel management suite',
        price: 50000,
        priceType: 'monthly' as const,
        popular: true,
        features: ['All basic features', 'Restaurant POS', 'Housekeeping', 'Channel management', 'Online booking'],
        cta: 'Get Started',
        href: '/quote?service=hotel-management&plan=growth&type=subscription&price=50000',
      },
      {
        id: 'custom',
        name: 'Enterprise',
        description: 'Multi-property hotel management',
        price: 0,
        priceType: 'monthly' as const,
        features: ['Multi-property support', 'Advanced analytics', 'Custom integrations', 'Dedicated support'],
        cta: 'Request Quote',
        href: '/quote?service=hotel-management&plan=custom&type=subscription',
      },
    ],
    features: [
      { name: 'Room Booking', tiers: [true, true, true] },
      { name: 'Restaurant POS', tiers: [false, true, true] },
      { name: 'Channel Management', tiers: [false, true, true] },
    ],
    faqs: [
      { question: 'Can it handle multiple properties?', answer: 'Yes, Professional and Enterprise plans support multi-property management.' },
      { question: 'Does it integrate with OTAs?', answer: 'Yes, we integrate with major OTAs like Booking.com, Expedia, and local platforms.' },
    ],
  },
];

export async function seedPredefinedServices() {
  try {
    console.log('Checking for predefined services...');

    const existingServices = await getPricingServices();
    console.log('Existing services found:', existingServices?.length || 0);
    const existingIds = existingServices?.map(service => service.id) || [];

    for (const sampleService of SAMPLE_SERVICES_DATA) {
      if (!existingIds.includes(sampleService.id)) {
        console.log(`Seeding service: ${sampleService.name}`);
        try {
          await createPricingService({
            ...sampleService,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          console.log(`✅ Successfully seeded: ${sampleService.name}`);
        } catch (serviceError) {
          console.error(`❌ Failed to seed ${sampleService.name}:`, serviceError);
        }
      } else {
        console.log(`⏭️ Service ${sampleService.name} already exists, skipping...`);
      }
    }

    console.log('Predefined services seeding completed');
  } catch (error) {
    console.error('Error seeding predefined services:', error);
  }
}