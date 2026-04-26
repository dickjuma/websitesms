import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs, PRICING_SERVICES } from '../../lib/pricing-data';
import { PricingHero, PricingCard, FeatureTable, FAQSection, CTASection } from '../components/index';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | SMA Systems',
    };
  }

  return {
    title: `${service.name} Pricing | SMA Systems`,
    description: service.description,
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} pricing`,
      `${service.name.toLowerCase()} cost`,
      'enterprise software Kenya',
      'business solutions',
    ],
    openGraph: {
      title: `${service.name} Pricing | SMA Systems`,
      description: service.description,
      type: 'website',
    },
  };
}

export default async function ServicePricingPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const planNames = service.plans.map((plan) => plan.name);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PriceSpecification',
    name: service.name,
    description: service.description,
    priceRange: `KES ${Math.min(...service.plans.map((p) => p.price)).toLocaleString()} - KES ${Math.max(...service.plans.map((p) => p.price)).toLocaleString()}`,
    offers: service.plans.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      description: plan.description,
      price: plan.price,
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock',
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <PricingHero title={service.hero.title} subtitle={service.hero.subtitle} />

        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {service.plans.map((plan, index) => (
                <PricingCard
                  key={plan.id}
                  name={plan.name}
                  description={plan.description}
                  price={plan.price}
                  priceSuffix={plan.priceSuffix}
                  features={plan.features}
                  popular={plan.popular}
                  cta={plan.cta}
                  href={plan.href}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        </section>

        {service.features.length > 0 && (
          <section className="section bg-slate-50">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Compare Plans
                </h2>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <FeatureTable
                    features={service.features}
                    planNames={planNames}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {service.faqs.length > 0 && (
          <FAQSection faqs={service.faqs} className="section" />
        )}

        <CTASection
          title={`Ready to get started with ${service.name}?`}
          description="Contact our team today for a free consultation and custom quote tailored to your business needs."
          primaryCta={{
            label: 'Contact Sales',
            href: '/contact',
          }}
          secondaryCta={{
            label: 'Book a Demo',
            href: '/book-demo',
          }}
        />
      </main>
    </>
  );
}