import { Metadata } from 'next';
import { SiteShell } from '@/components/layout/site-shell';
import { InlineCTA, StickyCTA } from '@/components/StickyCTA';
import Link from 'next/link';

interface PillarPageProps {
  params: { service: string };
}

// Pillar page content for main services
const PILLAR_PAGES = {
  'erp-system': {
    title: 'ERP Systems Kenya | Enterprise Resource Planning Software',
    description: 'Complete guide to ERP systems in Kenya. Compare solutions, pricing, and vendors. Find the best ERP software for your Kenyan business with 400+ implementations.',
    h1: 'ERP Systems in Kenya: Complete Guide 2024',
    intro: 'Enterprise Resource Planning (ERP) systems are essential for modern Kenyan businesses. Our comprehensive guide covers everything you need to know about implementing ERP solutions in Kenya, from selecting the right system to successful deployment.',
    sections: [
      {
        title: 'What is an ERP System?',
        content: 'An ERP system integrates all business processes into a unified platform, providing real-time data access across departments. In Kenya, ERP systems help businesses manage inventory, finance, HR, and operations more efficiently.',
        subsections: [
          'Unified business management platform',
          'Real-time data and reporting',
          'Integrated modules for all departments',
          'Cloud and on-premise options available'
        ]
      },
      {
        title: 'Benefits of ERP for Kenyan Businesses',
        content: 'Kenyan companies implementing ERP systems see significant improvements in efficiency and growth:',
        subsections: [
          '50-70% reduction in operational costs',
          'Real-time inventory and financial tracking',
          'Improved decision-making with accurate data',
          'Enhanced compliance with Kenyan tax regulations',
          'Streamlined supply chain management',
          'Better customer relationship management'
        ]
      },
      {
        title: 'ERP System Selection Guide',
        content: 'Choosing the right ERP system for your Kenyan business requires careful consideration:',
        subsections: [
          'Business size and industry requirements',
          'Budget and total cost of ownership',
          'Local support and implementation expertise',
          'Integration with existing Kenyan systems',
          'M-Pesa and local payment gateway support',
          'Mobile access for remote workers'
        ]
      }
    ],
    locationPages: [
      'erp-system-nairobi',
      'erp-system-mombasa',
      'erp-system-kisumu',
      'erp-system-nakuru',
      'erp-system-eldoret'
    ],
    relatedServices: ['pos-system', 'custom-software'],
    faqs: [
      {
        question: 'How much does ERP cost in Kenya?',
        answer: 'ERP systems in Kenya range from KES 500,000 for small businesses to KES 10,000,000+ for enterprise solutions.'
      },
      {
        question: 'How long does ERP implementation take?',
        answer: 'Typical ERP implementation takes 3-9 months, depending on system complexity and business size.'
      },
      {
        question: 'Do you provide ERP training?',
        answer: 'Yes, we provide comprehensive training for all users, including administrators and end-users.'
      }
    ]
  },
  'pos-system': {
    title: 'POS Systems Kenya | Point of Sale Software for Retail',
    description: 'Complete POS systems guide for Kenyan retailers. Compare cloud and on-premise solutions, pricing from KES 50,000. M-Pesa integration and local support included.',
    h1: 'POS Systems in Kenya: Complete Retail Technology Guide',
    intro: 'Point of Sale (POS) systems are revolutionizing retail businesses across Kenya. From small shops in Nairobi to large supermarkets in Mombasa, modern POS solutions offer inventory management, payment processing, and customer insights.',
    sections: [
      {
        title: 'POS System Features for Kenyan Retailers',
        content: 'Modern POS systems offer comprehensive retail management tools:',
        subsections: [
          'Real-time inventory tracking and alerts',
          'M-Pesa, card, and cash payment processing',
          'Customer loyalty program management',
          'Sales reporting and analytics',
          'Employee management and scheduling',
          'Integration with accounting software'
        ]
      },
      {
        title: 'Cloud vs On-Premise POS Systems',
        content: 'Choose the right deployment model for your Kenyan business:',
        subsections: [
          'Cloud POS: Lower upfront costs, remote access, automatic updates',
          'On-premise POS: Full control, no internet dependency, higher security',
          'Hybrid solutions available for specific requirements'
        ]
      },
      {
        title: 'POS System Pricing in Kenya',
        content: 'Transparent pricing for POS solutions across different business sizes:',
        subsections: [
          'Basic POS: KES 50,000 - 150,000 setup',
          'Advanced POS: KES 150,000 - 500,000',
          'Enterprise POS: KES 500,000+ with custom features',
          'Monthly subscriptions: KES 5,000 - 25,000',
          'Hardware costs: KES 30,000 - 100,000'
        ]
      }
    ],
    locationPages: [
      'pos-system-nairobi',
      'pos-system-mombasa',
      'pos-system-kisumu',
      'pos-system-nakuru',
      'pos-system-eldoret'
    ],
    relatedServices: ['erp-system', 'custom-software'],
    faqs: [
      {
        question: 'Do POS systems work with M-Pesa?',
        answer: 'Yes, all our POS systems integrate with M-Pesa, Airtel Money, and other mobile payment platforms.'
      },
      {
        question: 'Can I use POS on mobile devices?',
        answer: 'Yes, our cloud-based POS systems work on tablets, smartphones, and computers.'
      },
      {
        question: 'What kind of support do you provide?',
        answer: 'We offer 24/7 technical support, on-site training, and regular system updates.'
      }
    ]
  },
  'software-development': {
    title: 'Software Development Kenya | Custom Web & Mobile Apps',
    description: 'Professional software development services in Kenya. Custom websites, mobile apps, enterprise software. From KES 200,000. 400+ projects delivered. Free consultation.',
    h1: 'Software Development Services in Kenya',
    intro: 'SMAS Systems is Kenya\'s leading software development company, specializing in custom web applications, mobile apps, and enterprise solutions. With 400+ successful projects, we deliver high-quality software that drives business growth.',
    sections: [
      {
        title: 'Our Software Development Services',
        content: 'Comprehensive development services for Kenyan businesses:',
        subsections: [
          'Custom web application development',
          'Native and cross-platform mobile apps',
          'E-commerce platform development',
          'API development and integration',
          'Legacy system modernization',
          'Cloud migration services'
        ]
      },
      {
        title: 'Technology Stack',
        content: 'Modern technologies for robust, scalable solutions:',
        subsections: [
          'Frontend: React, Next.js, Vue.js, Angular',
          'Backend: Node.js, Python, PHP, .NET',
          'Mobile: React Native, Flutter, iOS, Android',
          'Database: PostgreSQL, MongoDB, MySQL',
          'Cloud: AWS, Google Cloud, Digital Ocean'
        ]
      },
      {
        title: 'Development Process',
        content: 'Structured approach ensuring quality and timely delivery:',
        subsections: [
          'Requirements gathering and analysis',
          'UI/UX design and prototyping',
          'Agile development with regular updates',
          'Comprehensive testing and QA',
          'Deployment and post-launch support',
          'Training and documentation'
        ]
      }
    ],
    locationPages: [
      'custom-software-nairobi',
      'web-development-nairobi',
      'mobile-app-nairobi',
      'custom-software-mombasa',
      'web-development-mombasa'
    ],
    relatedServices: ['erp-system', 'pos-system'],
    faqs: [
      {
        question: 'How much does software development cost?',
        answer: 'Costs range from KES 200,000 for simple websites to KES 10,000,000+ for complex enterprise systems.'
      },
      {
        question: 'How long does development take?',
        answer: 'Timelines vary: websites (2-6 weeks), mobile apps (4-12 weeks), enterprise systems (8-24 weeks).'
      },
      {
        question: 'Do you provide ongoing support?',
        answer: 'Yes, we offer maintenance contracts, security updates, and feature enhancements.'
      }
    ]
  }
};

// Generate static params
export async function generateStaticParams() {
  return Object.keys(PILLAR_PAGES).map(service => ({ service }));
}

// Generate metadata
export async function generateMetadata({ params }: PillarPageProps): Promise<Metadata> {
  const page = PILLAR_PAGES[params.service as keyof typeof PILLAR_PAGES];

  if (!page) {
    return {
      title: 'Service Not Found | SMAS Systems',
      description: 'The requested service page could not be found.',
    };
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [
      page.title.split(' ')[0].toLowerCase(),
      'kenya',
      'software development',
      'nairobi',
      'business solutions'
    ],
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://smassystems.com/${params.service}`,
      siteName: 'SMAS Systems',
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: `https://smassystems.com/${params.service}`,
    },
  };
}

// Main page component
export default function PillarPage({ params }: PillarPageProps) {
  const page = PILLAR_PAGES[params.service as keyof typeof PILLAR_PAGES];

  if (!page) {
    return (
      <SiteShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <p className="text-gray-600 mb-8">The requested service page could not be found.</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Return to homepage
            </Link>
          </div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {page.h1}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {page.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <InlineCTA service={params.service}>
                  Get Free Consultation
                </InlineCTA>
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {page.sections.map((section, index) => (
          <section key={index} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {section.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  {section.content}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {section.subsections.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* Location-Specific Pages */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {page.h1.split(':')[0]} by Location
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {page.locationPages.map((locationPage, index) => (
                <Link
                  key={index}
                  href={`/${locationPage}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locationPage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Specialized solutions for businesses in this location.
                  </p>
                  <span className="text-blue-600 text-sm font-medium mt-2 inline-block">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {page.relatedServices.map((service, index) => (
                <Link
                  key={index}
                  href={`/${service}`}
                  className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive {service.replace(/-/g, ' ')} solutions for Kenyan businesses.
                  </p>
                  <span className="text-blue-600 text-sm font-medium mt-2 inline-block">
                    Explore →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {page.faqs.map((faq, index) => (
                <details key={index} className="border border-gray-200 rounded-lg p-6 bg-white">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Get expert consultation and discover how our {params.service.replace(/-/g, ' ')} solutions can drive your success.
            </p>
            <InlineCTA service={params.service} className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Project Today
            </InlineCTA>
          </div>
        </section>
      </article>

      <StickyCTA service={params.service} />
    </SiteShell>
  );
}