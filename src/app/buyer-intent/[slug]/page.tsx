import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/site-shell';
import { InlineCTA, StickyCTA } from '@/components/StickyCTA';
import Link from 'next/link';

interface BuyerIntentPageProps {
  params: { slug: string };
}

// Buyer intent keywords and their content
const BUYER_INTENT_PAGES = {
  'erp-system-kenya-pricing': {
    title: 'ERP System Pricing Kenya | Cost of ERP Software 2024',
    description: 'Complete ERP system pricing guide for Kenya businesses. Compare costs, features, and vendors. Get free quotes from KES 500,000. Choose the best ERP for your Kenyan company.',
    keyword: 'ERP system pricing Kenya',
    h1: 'ERP System Pricing in Kenya 2024',
    intro: 'Planning to implement an ERP system in Kenya? Our comprehensive pricing guide covers everything Kenyan businesses need to know about ERP costs, features, and implementation.',
    sections: [
      {
        title: 'ERP System Cost Breakdown',
        content: 'ERP systems in Kenya range from KES 500,000 for basic implementations to KES 10,000,000+ for enterprise solutions. The average cost is KES 2,000,000-5,000,000.',
        bullets: [
          'Basic ERP: KES 500,000 - 1,500,000',
          'Mid-tier ERP: KES 1,500,000 - 3,000,000',
          'Enterprise ERP: KES 3,000,000 - 10,000,000+',
          'Implementation: 20-30% of software cost',
          'Training & Support: KES 200,000 - 500,000 annually'
        ]
      },
      {
        title: 'Factors Affecting ERP Pricing',
        content: 'Several factors influence ERP system costs in Kenya:',
        bullets: [
          'Company size and user count',
          'Industry-specific requirements',
          'Integration complexity',
          'Customization needs',
          'Local vs international vendors',
          'Implementation timeline'
        ]
      }
    ],
    cta: 'Get ERP Pricing Quote',
    relatedPages: ['erp-system-nairobi', 'erp-system-mombasa', 'erp-system-kisumu']
  },
  'pos-system-small-business-kenya': {
    title: 'Best POS System for Small Business Kenya | Retail Software 2024',
    description: 'Find the best POS system for your small business in Kenya. Compare features, pricing, and vendors. Cloud-based POS from KES 50,000/month. Free demos available.',
    keyword: 'POS system small business Kenya',
    h1: 'Best POS System for Small Businesses in Kenya',
    intro: 'Running a small retail business in Kenya? Discover the best POS systems designed for Kenyan SMEs with affordable pricing, local payment integration, and reliable support.',
    sections: [
      {
        title: 'Top POS Systems for Kenyan Small Businesses',
        content: 'Based on our experience implementing POS systems for 200+ Kenyan businesses, here are the best options:',
        bullets: [
          'Cloud-based solutions from KES 15,000/month',
          'M-Pesa and card payment integration',
          'Inventory management included',
          'Mobile app for order taking',
          'Local technical support'
        ]
      },
      {
        title: 'Why Kenyan Businesses Need POS Systems',
        content: 'Modern POS systems offer significant advantages for Kenyan retailers:',
        bullets: [
          'Real-time inventory tracking',
          'Automated sales reporting',
          'Mobile payment processing',
          'Customer data management',
          'Reduced theft and errors',
          'Tax compliance automation'
        ]
      }
    ],
    cta: 'Get POS System Demo',
    relatedPages: ['pos-system-nairobi', 'pos-system-eldoret', 'pos-system-nakuru']
  },
  'software-development-cost-kenya': {
    title: 'Software Development Cost Kenya | App Development Pricing 2024',
    description: 'Complete guide to software development costs in Kenya. Web apps, mobile apps, ERP systems pricing. From KES 200,000. Get accurate quotes for your project.',
    keyword: 'software development cost Kenya',
    h1: 'Software Development Costs in Kenya 2024',
    intro: 'Planning a software development project in Kenya? Get accurate cost estimates for web applications, mobile apps, and enterprise systems. Transparent pricing from Kenyan developers.',
    sections: [
      {
        title: 'Software Development Pricing by Type',
        content: 'Development costs vary significantly by project type and complexity:',
        bullets: [
          'Simple Website: KES 100,000 - 300,000',
          'E-commerce Platform: KES 500,000 - 1,500,000',
          'Mobile App: KES 300,000 - 1,000,000',
          'ERP System: KES 2,000,000 - 8,000,000',
          'Custom Software: KES 500,000 - 5,000,000+'
        ]
      },
      {
        title: 'What Affects Development Costs',
        content: 'Several factors influence software development pricing in Kenya:',
        bullets: [
          'Project complexity and features',
          'Technology stack requirements',
          'Integration with existing systems',
          'UI/UX design complexity',
          'Testing and quality assurance',
          'Post-launch support and maintenance'
        ]
      }
    ],
    cta: 'Get Cost Estimate',
    relatedPages: ['custom-software-nairobi', 'web-development-nairobi', 'mobile-app-nairobi']
  },
  'best-erp-system-kenya': {
    title: 'Best ERP System Kenya | Top ERP Software for Kenyan Businesses 2024',
    description: 'Discover the best ERP systems for Kenyan businesses. Compare features, pricing, and user reviews. Find the perfect ERP solution for manufacturing, retail, and services.',
    keyword: 'best ERP system Kenya',
    h1: 'Best ERP Systems for Kenyan Businesses 2024',
    intro: 'Finding the right ERP system for your Kenyan business is crucial for growth. Our expert analysis covers the top ERP solutions trusted by 400+ Kenyan companies.',
    sections: [
      {
        title: 'Top ERP Systems Used in Kenya',
        content: 'Based on implementation success and user satisfaction:',
        bullets: [
          'SAP Business One - Enterprise-grade solution',
          'Microsoft Dynamics - Cloud-based ERP',
          'Odoo - Affordable open-source option',
          'Custom ERP - Tailored for Kenyan businesses',
          'Local ERP solutions - Built for East African market'
        ]
      },
      {
        title: 'ERP System Selection Criteria',
        content: 'Choose the right ERP based on your business needs:',
        bullets: [
          'Industry-specific features',
          'Scalability for business growth',
          'Local language and currency support',
          'Integration with M-Pesa and local banks',
          'Mobile access for remote workers',
          'Local support and training availability'
        ]
      }
    ],
    cta: 'Compare ERP Systems',
    relatedPages: ['erp-system-nairobi', 'erp-system-mombasa', 'manufacturing-erp-kenya']
  }
};

function parseBuyerIntentSlug(slug: string): keyof typeof BUYER_INTENT_PAGES | null {
  return slug in BUYER_INTENT_PAGES ? slug as keyof typeof BUYER_INTENT_PAGES : null;
}

// Generate static params for buyer intent pages
export async function generateStaticParams() {
  return Object.keys(BUYER_INTENT_PAGES).map(slug => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BuyerIntentPageProps): Promise<Metadata> {
  const pageKey = parseBuyerIntentSlug(params.slug);

  if (!pageKey) {
    return {
      title: 'Page Not Found | SMAS Systems',
      description: 'The requested page could not be found.',
    };
  }

  const page = BUYER_INTENT_PAGES[pageKey];

  return {
    title: page.title,
    description: page.description,
    keywords: [
      page.keyword,
      'Kenya software development',
      'East Africa technology',
      'Nairobi IT solutions',
      'software company Kenya'
    ],
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://smassystems.com/${params.slug}`,
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
      canonical: `https://smassystems.com/${params.slug}`,
    },
  };
}

// Main page component
export default function BuyerIntentPage({ params }: BuyerIntentPageProps) {
  const pageKey = parseBuyerIntentSlug(params.slug);

  if (!pageKey) {
    notFound();
  }

  const page = BUYER_INTENT_PAGES[pageKey];

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
                <InlineCTA service={page.keyword.split(' ')[0]}>
                  {page.cta}
                </InlineCTA>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  View Pricing
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
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: `How much does ${page.keyword.toLowerCase()} cost?`,
                  answer: `Costs vary based on your specific requirements. Contact us for a detailed quote tailored to your business needs.`
                },
                {
                  question: `How long does implementation take?`,
                  answer: `Implementation timelines range from 2-12 weeks depending on complexity and your existing systems.`
                },
                {
                  question: `Do you provide training and support?`,
                  answer: `Yes, we provide comprehensive training, documentation, and ongoing support for all our solutions.`
                },
                {
                  question: `Can you integrate with our existing systems?`,
                  answer: `Absolutely. We specialize in seamless integration with existing business systems and workflows.`
                }
              ].map((faq, index) => (
                <details key={index} className="border border-gray-200 rounded-lg p-6">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Services & Solutions
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {page.relatedPages.map((relatedPage, index) => (
                <Link
                  key={index}
                  href={`/${relatedPage}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {relatedPage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Specialized solutions for businesses in specific locations.
                  </p>
                  <span className="text-blue-600 text-sm font-medium mt-2 inline-block">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Get a free consultation and discover how our solutions can transform your business.
            </p>
            <InlineCTA className="bg-white text-blue-600 hover:bg-gray-100">
              Get Your Free Quote Today
            </InlineCTA>
          </div>
        </section>
      </article>

      <StickyCTA />
    </SiteShell>
  );
}