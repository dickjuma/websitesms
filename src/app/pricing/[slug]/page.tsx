import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/site-shell';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/pricing-server';
import { PricingHero, PricingCard, FeatureTable, FAQSection, CTASection } from '../components';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | SMA Systems',
    };
  }

  return {
    title: `${service.name} Pricing | SMA Systems Kenya`,
    description: service.longDescription || service.description,
    keywords: [
      service.name.toLowerCase(),
      `${service.name.toLowerCase()} pricing`,
      `${service.name.toLowerCase()} kenya`,
      `${service.name.toLowerCase()} cost`,
      'enterprise software Kenya',
      'business software Kenya',
    ],
    alternates: {
      canonical: `https://smasystems.com/pricing/${slug}`,
    },
    openGraph: {
      title: `${service.name} Pricing | SMA Systems Kenya`,
      description: service.longDescription || service.description,
      url: `https://smasystems.com/pricing/${slug}`,
      siteName: 'SMA Systems',
      type: 'website',
    },
  };
}

export default async function ServicePricingPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const planNames = service.plans.map((plan) => plan.name);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://smasystems.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pricing',
        item: 'https://smasystems.com/pricing',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: `https://smasystems.com/pricing/${slug}`,
      },
    ],
  };
  const priceJsonLd = {
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
    <SiteShell>
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(priceJsonLd) }}
        />
        <main>
          <PricingHero title={service.hero.title} subtitle={service.hero.subtitle} />

          <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {service.plans.map((plan, index) => (
                   <PricingCard
                     key={plan.id}
                     name={plan.name}
                     description={plan.description}
                     price={plan.price}
                     priceType={plan.priceType}
                     features={plan.features}
                     popular={plan.popular}
                     href={`/quote?service=${service.slug}&plan=${plan.id}&type=${plan.priceType === 'monthly' ? 'subscription' : 'one-time'}&price=${plan.price}`}
                     className="animate-fade-in"
                     style={{ animationDelay: `${index * 100}ms` }}
                   />
                 ))}
              </div>
            </div>
          </section>

          {service.features.length > 0 && (
            <section className="bg-slate-50 px-4 py-16 md:px-6 lg:px-8">
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
            </section>
          )}

          {service.faqs.length > 0 && (
            <FAQSection faqs={service.faqs} className="px-4 py-16 md:px-6 lg:px-8" />
          )}

          <CTASection
            title={`Ready to get started with ${service.name}?`}
            description="Contact our team today for a free consultation and custom quote."
            primaryCta={{
              label: 'Get a Quote',
              href: `/quote?service=${service.slug}`,
            }}
            secondaryCta={{
              label: 'Book a Demo',
              href: '/book-demo',
            }}
          />
        </main>
      </>
    </SiteShell>
  );
}