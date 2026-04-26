import { NextResponse } from 'next/server';

// Static sample data for testing
const SAMPLE_SERVICES = [
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
        id: 'web-starter',
        name: 'Business Website',
        description: 'Professional business website with essential features',
        price: 45000,
        priceType: 'one-time',
        features: ['Up to 10 pages', 'Mobile responsive', 'Contact forms', 'Basic SEO', 'Social media links'],
        cta: 'Get Started',
        href: '/contact?plan=web-starter',
      },
      {
        id: 'web-growth',
        name: 'Business Pro',
        description: 'Feature-rich business website with advanced functionality',
        price: 95000,
        priceType: 'one-time',
        popular: true,
        features: ['Up to 25 pages', 'CMS included', 'Blog integration', 'Advanced SEO', 'Lead capture forms', 'Live chat'],
        cta: 'Get Started',
        href: '/contact?plan=web-growth',
      },
    ],
    features: [
      { name: 'Pages', tiers: ['10', '25'] },
      { name: 'Mobile Responsive', tiers: [true, true] },
      { name: 'CMS', tiers: [false, true] },
    ],
    faqs: [
      { question: 'How long does it take to build a website?', answer: 'Business websites take 2-4 weeks. Web applications take 8-16 weeks depending on complexity.' },
      { question: 'Do you provide domain and hosting?', answer: 'Yes, we can handle domain registration, hosting setup, and SSL certificates.' },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
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
        id: 'mobile-starter',
        name: 'MVP App',
        description: 'Basic mobile application with core features',
        price: 180000,
        priceType: 'one-time',
        features: ['iOS & Android', 'User authentication', 'Basic UI/UX', 'Push notifications', '2 months support'],
        cta: 'Get Started',
        href: '/contact?plan=mobile-starter',
      },
    ],
    features: [
      { name: 'iOS App', tiers: [true] },
      { name: 'Android App', tiers: [true] },
    ],
    faqs: [
      { question: 'Will my app work on both iOS and Android?', answer: 'Yes, all our apps are developed cross-platform for both iOS and Android.' },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET() {
  try {
    console.log('Returning static sample services...');
    return NextResponse.json(SAMPLE_SERVICES);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}