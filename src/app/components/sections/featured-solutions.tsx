import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const featuredSolutions = [
  {
    title: 'Retail POS System',
    description: 'Complete point-of-sale solution with inventory management, sales tracking, and customer analytics for retail businesses.',
    features: ['Real-time inventory', 'Sales analytics', 'Receipt printing', 'Multi-store support'],
    href: '/services/pos-systems',
    image: '/pos_system.jpg',
    alt: 'Retail POS system showing sales interface and inventory management'
  },
  {
    title: 'Enterprise ERP Suite',
    description: 'Comprehensive business management system integrating finance, HR, inventory, and operations for growing companies.',
    features: ['Financial management', 'HR & payroll', 'Inventory control', 'Business intelligence'],
    href: '/services/erp-systems',
    image: '/crm_system.jpg',
    alt: 'Enterprise ERP dashboard with business analytics and management tools'
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-featured online store with payment processing, inventory sync, and customer management for digital commerce.',
    features: ['Payment integration', 'Order management', 'Customer portal', 'Mobile responsive'],
    href: '/services/web-development',
    image: '/ecommerce-solutions.jpg',
    alt: 'E-commerce platform showing online store interface and payment processing'
  }
];

export function FeaturedSolutions() {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Featured Solutions</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-950">
            Popular Business Software Solutions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Our most requested software solutions that help businesses streamline operations and boost growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredSolutions.map((solution, index) => (
            <div key={index} className="group rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:border-blue-200 overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={solution.image}
                  alt={solution.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-950 mb-3">{solution.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{solution.description}</p>
                <ul className="mb-6 space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-slate-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={solution.href}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition group-hover:gap-3"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Explore All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}