import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter POS',
    price: 'KES 150,000',
    period: 'one-time',
    features: [
      'Basic POS system',
      'Inventory management',
      'Sales reporting',
      '1 month support',
      'Training included'
    ],
    cta: 'Get Started',
    href: '/quote?service=pos-systems&type=one-time&plan=starter'
  },
  {
    name: 'Professional ERP',
    price: 'KES 450,000',
    period: 'one-time',
    features: [
      'Complete ERP system',
      'Financial management',
      'HR & payroll',
      'Inventory control',
      '3 months support',
      'Training & setup'
    ],
    cta: 'Get Quote',
    href: '/quote?service=erp-software&type=one-time&plan=professional',
    popular: true
  },
  {
    name: 'Custom Web App',
    price: 'From KES 300,000',
    period: 'project-based',
    features: [
      'Custom development',
      'Responsive design',
      'Database integration',
      '6 months support',
      'SEO optimization',
      'Maintenance package'
    ],
    cta: 'Discuss Project',
    href: '/quote?service=web-development&type=custom'
  }
];

export function PricingPreview() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Pricing Overview</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-950">
            Transparent Pricing, No Hidden Fees
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Choose from our popular packages or get a custom quote for your specific needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md ${
                plan.popular ? 'border-blue-200 ring-2 ring-blue-100' : 'border-slate-200'
              }`}
            >
              {plan.popular && (
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-950">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-slate-950">{plan.price}</span>
                  <span className="text-sm text-slate-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Need something custom? All prices are starting points and can be adjusted based on your requirements.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
          >
            View Full Pricing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}