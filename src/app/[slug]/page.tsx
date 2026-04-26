import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateServiceLocationCombinations, kenyanLocations, serviceTypes, getLocationContent, getNearbyLocations } from '@/lib/location-seo-data';
import { generateLocationServiceSchema, generateLocationFAQSchema, generateLocationProductSchema } from '@/lib/seo/structured-data';
import { ContentVariationEngine, optimizeContentForSEO } from '@/lib/content-variation-engine';
import { LocationPageTracker } from '@/components/LocationPageTracker';
import { SiteShell } from '@/components/layout/site-shell';
import Link from 'next/link';

// Parse service and location from URL slug
function parseServiceLocationSlug(slug: string): { service: any; location: any } | null {
  // Expected format: "erp-system-nairobi" or "custom-software-kilifi"
  const parts = slug.split('-');

  // Find service (first 1-3 parts)
  let serviceSlug = '';
  let locationSlug = '';

  // Try different service slug lengths
  for (let i = 1; i <= 3 && i < parts.length; i++) {
    const potentialServiceSlug = parts.slice(0, i).join('-');
    const service = serviceTypes.find(s => s.slug === potentialServiceSlug);

    if (service) {
      serviceSlug = potentialServiceSlug;
      locationSlug = parts.slice(i).join('-');
      break;
    }
  }

  if (!serviceSlug || !locationSlug) return null;

  const service = serviceTypes.find(s => s.slug === serviceSlug);
  const location = kenyanLocations.find(l => l.slug === locationSlug);

  if (!service || !location) return null;

  return { service, location };
}

// Generate static params for all combinations (for static generation)
export async function generateStaticParams() {
  const combinations = generateServiceLocationCombinations();

  return combinations.map(({ urlSlug }) => ({
    slug: urlSlug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseServiceLocationSlug(slug);

  if (!parsed) {
    return {
      title: 'Page Not Found | SMAS Systems',
      description: 'The requested page could not be found.',
    };
  }

  const { service, location } = parsed;
  const locationContent = getLocationContent(location, service);

  const title = `${service.name} ${location.name} | SMAS Systems`;
  const description = `${locationContent.intro} ${service.description}. Contact us for a free quote and demo.`;

  return {
    title,
    description,
    keywords: [
      ...service.keywords,
      `${service.name} ${location.name}`,
      `${service.name} Kenya`,
      `software development ${location.name}`,
      `${location.name} ${service.shortName}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://smassystems.com/${params.slug}`,
      siteName: 'SMAS Systems',
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://smassystems.com/${params.slug}`,
    },
  };
}

// Generate FAQ schema
function generateFAQSchema(service: any, location: any) {
  const faqs = [
    {
      question: `What is ${service.name} in ${location.name}?`,
      answer: `${service.description} tailored for businesses in ${location.name}, Kenya.`
    },
    {
      question: `How much does ${service.name} cost in ${location.name}?`,
      answer: `Pricing ranges from KES ${service.pricingRange.min.toLocaleString()} to KES ${service.pricingRange.max.toLocaleString()} depending on requirements.`
    },
    {
      question: `What industries benefit from ${service.name} in ${location.name}?`,
      answer: `${service.name} is ideal for ${service.targetIndustries.join(', ')} businesses in ${location.name}.`
    },
    {
      question: `How long does it take to implement ${service.name} in ${location.name}?`,
      answer: `Implementation typically takes 4-12 weeks depending on complexity and business size.`
    },
    {
      question: `Do you provide support for ${service.name} in ${location.name}?`,
      answer: `Yes, we provide ongoing support, training, and maintenance for all our clients in ${location.name}.`
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Main page component
export default async function ServiceLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = parseServiceLocationSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { service, location } = parsed;
  const nearbyLocations = getNearbyLocations(location.slug);

  // Generate unique content using variation engine
  const contentEngine = new ContentVariationEngine();
  const rawContent = contentEngine.generateUniqueContent(service, location);
  const optimizedContent = optimizeContentForSEO(rawContent, service, location);

  // Generate comprehensive structured data
  const serviceSchema = generateLocationServiceSchema(service, location, {
    intro: optimizedContent.intro[0]
  });
  const faqSchema = generateLocationFAQSchema(service, location);
  const productSchema = generateLocationProductSchema(service, location);

  // Use optimized content
  const content = {
    intro: optimizedContent.intro[0],
    benefits: optimizedContent.benefits,
    useCases: optimizedContent.useCases,
    challenges: optimizedContent.challenges,
    faqs: optimizedContent.faqs,
  };

  return (
    <SiteShell>
      {/* Google Analytics Tracking */}
      <LocationPageTracker service={service.slug} location={location.slug} />

      {/* Comprehensive Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {service.name} in {location.name}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {content.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Get Free Quote
                </Link>
                <Link
                  href="/book-demo"
                  className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Book Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Explanation */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What is {service.name}?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                {service.description} designed specifically for businesses operating in {location.name}, Kenya.
                Our solutions incorporate local market insights, regulatory compliance, and industry-specific workflows
                that are common in the {location.name} business environment.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Key Features for {location.name} Businesses
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                {content.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Industry Use Cases */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Industry Applications in {location.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {content.useCases.map((useCase, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{useCase}</h3>
                  <p className="text-gray-600">
                    Specialized {service.name.toLowerCase()} solutions for {location.name}'s {useCase.toLowerCase()} sector,
                    incorporating local business practices and market dynamics.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Addressing Local Business Challenges
            </h2>
            <div className="space-y-6">
              {content.challenges.map((challenge, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {challenge.split(' ').slice(0, 4).join(' ')}...
                  </h3>
                  <p className="text-gray-600">
                    Our {service.name.toLowerCase()} provides comprehensive solutions to overcome
                    {challenge.toLowerCase().slice(7)}.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {service.name} Pricing in {location.name}
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                KES {service.pricingRange.min.toLocaleString()} - {service.pricingRange.max.toLocaleString()}
              </div>
              <p className="text-gray-600 mb-6">Starting price range</p>
              <Link
                href="/quote"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Get Detailed Quote
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {content.faqs.map((faq, index) => (
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

        {/* Internal Links */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Services & Locations
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  More About {service.name}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={`/pillar/${service.slug}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Complete {service.name} Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/buyer-intent/${service.slug}-kenya-pricing`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {service.name} Pricing Kenya
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Compare All Pricing Plans
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Other Services in {location.name}
                </h3>
                <ul className="space-y-2">
                  {serviceTypes.filter(s => s.slug !== service.slug).slice(0, 3).map(otherService => (
                    <li key={otherService.slug}>
                      <Link
                        href={`/${otherService.slug}-${location.slug}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {otherService.name} in {location.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={`/custom-software-${location.slug}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Custom Software {location.name}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.name} in Nearby Locations
                </h3>
                <ul className="space-y-2">
                  {nearbyLocations.slice(0, 4).map(nearbyLocation => (
                    <li key={nearbyLocation.slug}>
                      <Link
                        href={`/${service.slug}-${nearbyLocation.slug}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {service.name} in {nearbyLocation.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cross-link to related pillar pages */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Explore Our Complete Service Guides
              </h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/pillar/erp-system"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ERP Systems Guide
                </Link>
                <Link
                  href="/pillar/pos-system"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  POS Systems Guide
                </Link>
                <Link
                  href="/pillar/software-development"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Software Development Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Get a free consultation and discover how {service.name.toLowerCase()} can benefit your {location.name} business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Get Free Quote
              </Link>
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-blue-700 transition-colors"
              >
                Book Demo
              </Link>
            </div>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}