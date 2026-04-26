import { getServicePrices } from '@/lib/pricing-server';
import { SiteShell } from '@/components/layout/site-shell';
import Link from 'next/link';
import { formatCurrency } from '@/lib/pricing-types';
import { ServicePrice } from '@/lib/database';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Development Pricing Kenya | SMAS Systems",
  description: "Transparent pricing for software development in Kenya. Custom web development, ERP systems, POS software, and AI solutions. Starting from KES 100,000. Get a free quote today.",
  keywords: [
    "software development pricing Kenya",
    "ERP system cost Kenya",
    "POS software price Kenya",
    "web development cost Nairobi",
    "mobile app development pricing Kenya",
    "custom software quotes Kenya",
    "software company pricing Nairobi",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://smassystems.com/pricing",
    siteName: "SMAS Systems",
    title: "Software Development Pricing Kenya | SMAS Systems",
    description: "Transparent pricing for software development in Kenya. Custom web development, ERP systems, POS software, and AI solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Pricing Kenya | SMAS Systems",
    description: "Transparent pricing for software development in Kenya. Custom web development, ERP systems, POS software, and AI solutions.",
  },
};

interface PricingCardProps {
  service: ServicePrice;
  planType: 'monthly' | 'onetime' | 'custom';
  isPopular?: boolean;
}

function PricingCard({ service, planType, isPopular = false }: PricingCardProps) {
  const getPricingInfo = () => {
    switch (planType) {
      case 'monthly':
        return {
          price: service.monthlyPrice,
          period: '/month',
          label: 'Monthly Subscription',
          cta: 'Start Monthly',
          href: `/quote?service=${encodeURIComponent(service.serviceName)}&type=monthly&plan=monthly`,
          description: 'Ongoing support and maintenance included'
        };
      case 'onetime':
        return {
          price: service.oneTimePrice,
          period: '',
          label: 'One-time Payment',
          cta: 'Purchase Now',
          href: `/quote?service=${encodeURIComponent(service.serviceName)}&type=onetime&plan=onetime`,
          description: 'Complete project delivery'
        };
      case 'custom':
        const minPrice = Math.min(service.monthlyPrice, service.oneTimePrice);
        const maxPrice = Math.max(service.monthlyPrice, service.oneTimePrice);
        return {
          price: `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`,
          period: '',
          label: 'Custom Solution',
          cta: 'Get Custom Quote',
          href: `/quote?service=${encodeURIComponent(service.serviceName)}&type=custom&plan=custom`,
          description: 'Tailored to your specific needs'
        };
      default:
        return {
          price: service.monthlyPrice,
          period: '/month',
          label: 'Monthly Subscription',
          cta: 'Start Monthly',
          href: `/quote?service=${encodeURIComponent(service.serviceName)}&type=monthly&plan=monthly`,
          description: 'Ongoing support and maintenance included'
        };
    }
  };

  const pricing = getPricingInfo();

  return (
    <div className={`relative bg-white border rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[600px] flex flex-col ${
      isPopular
        ? 'border-blue-500 shadow-lg'
        : 'border-slate-200 shadow-sm'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center flex-1 flex flex-col">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {pricing.label}
          </h3>
          <p className="text-sm text-slate-600">
            {pricing.description}
          </p>
        </div>

        <div className="mb-6">
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {pricing.price}
            {pricing.period && (
              <span className="text-sm font-normal text-slate-500">{pricing.period}</span>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="mb-8 space-y-3 flex-1">
          {service.features.map((feature, index) => {
            const isIncluded = feature[planType as keyof typeof feature];
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-slate-700 text-left flex-1">{feature.name}</span>
                <span className={`font-semibold ml-2 ${isIncluded ? 'text-green-600' : 'text-red-500'}`}>
                  {isIncluded ? '✓' : '✗'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-auto">
          <Link
            href={pricing.href}
            className={`inline-block w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              isPopular
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : planType === 'custom'
                  ? 'bg-slate-800 text-white hover:bg-slate-900'
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            {pricing.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function PricingPage() {
  const prices = await getServicePrices();

  if (!prices || prices.length === 0) {
    return (
      <SiteShell>
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Pricing Information</h2>
          <p className="text-slate-600">Our pricing plans will be available soon. Please contact us for custom quotes.</p>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight">
            Flexible Pricing Plans
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Transparent and competitive pricing for East Africa&apos;s leading software solutions.
            Choose the plan that works best for your business.
          </p>
        </div>

        <div className="space-y-20">
          {prices.map((service, serviceIndex) => (
            <div key={service._id?.toString() || `service-${serviceIndex}`}>
              <div className="text-center mb-12">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {service.category}
                </span>
                <h2 className="mt-4 text-3xl font-bold text-slate-900">
                  {service.serviceName}
                </h2>
                <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
                  {service.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <PricingCard
                  service={service}
                  planType="monthly"
                  isPopular={service.category === 'Web Development'} // Make Web Dev monthly popular as example
                />
                <PricingCard
                  service={service}
                  planType="onetime"
                />
                <PricingCard
                  service={service}
                  planType="custom"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-slate-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-slate-600 mb-6">
              Every business is unique. Contact us for a personalized quote tailored to your specific requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Custom Software Development Quote Kenya
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              Explore ERP Systems & POS Software Kenya
            </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
