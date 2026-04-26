import React from 'react';
import Image from 'next/image';

const benefits = [
  {
    title: 'Built for Kenyan Businesses',
    description: 'Designed specifically for the Kenyan market with local payment methods, tax compliance, and business practices.',
    image: '/Quality_assurance.jpg',
    alt: 'Quality assurance and testing for Kenyan business software'
  },
  {
    title: 'Scalable Cloud Systems',
    description: 'Cloud-based solutions that grow with your business, from startups to enterprise-level operations.',
    image: '/cloud_devops.jpg',
    alt: 'Cloud infrastructure and DevOps solutions'
  },
  {
    title: 'County-Based SEO Structure',
    description: 'Programmatic SEO system covering all 47 counties for maximum local search visibility.',
    image: '/digitalmarketing.jpg',
    alt: 'Digital marketing and SEO services'
  },
  {
    title: 'Custom Business Automation',
    description: 'Tailored solutions that automate your specific workflows and business processes.',
    image: '/custom-software-development.jpg',
    alt: 'Custom software development and automation'
  },
  {
    title: 'Fast Deployment',
    description: 'Quick implementation with minimal disruption to your current operations.',
    image: '/it-consulting.jpg',
    alt: 'IT consulting and fast deployment services'
  },
  {
    title: 'Mobile + Desktop Ready',
    description: 'Fully responsive systems that work seamlessly across all devices and platforms.',
    image: '/mobile-app-development.jpg',
    alt: 'Mobile app development for cross-platform compatibility'
  },
];

const WhySmaSystems: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Why Choose Us</p>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950">
            Why Businesses Choose SMA Systems
          </h2>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            We combine local expertise with global technology standards to deliver exceptional business software solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:border-blue-200 overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={benefit.image}
                  alt={benefit.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-950 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySmaSystems;