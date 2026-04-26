import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    slug: 'pos-systems',
    name: 'POS Systems',
    description: 'Sales, billing, stock management, inventory tracking, and receipt generation for retail and hospitality businesses.',
    image: '/pos_system.jpg',
    alt: 'Point of Sale system interface showing sales and inventory management'
  },
  {
    slug: 'erp-software',
    name: 'ERP Software',
    description: 'Finance, inventory, HR, procurement, and business reporting dashboards for comprehensive enterprise management.',
    image: '/crm_system.jpg',
    alt: 'Enterprise Resource Planning dashboard with business analytics'
  },
  {
    slug: 'hr-management',
    name: 'HR Management Systems',
    description: 'Payroll, attendance, employee tracking, leave management, and HR analytics for modern workforce management.',
    image: '/cloud_devops.jpg',
    alt: 'Human Resources management system showing employee tracking and analytics'
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    description: 'Websites, portals, e-commerce platforms, business applications, and digital marketing solutions.',
    image: '/webdevelopment_custom_web_development.jpg',
    alt: 'Custom web development showing responsive website design'
  },
  {
    slug: 'custom-software',
    name: 'Custom Software',
    description: 'Tailored automation systems, workflow optimization, API integrations, and business-specific solutions.',
    image: '/custom-software-development.jpg',
    alt: 'Custom software development showing automated business workflows'
  },
];

const ServicesOverview: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Our Services</p>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950">
            Powerful Business Systems for Kenyan Businesses
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive software solutions designed specifically for the Kenyan market and business environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.slug} className="group rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:border-blue-200 overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-950 mb-3">{service.name}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition group-hover:gap-3"
                >
                  View Service
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            Each service is available across all 47 Kenya counties with localized support and implementation.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View All Services
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;