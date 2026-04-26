import React from 'react';

const services = [
  {
    icon: '🧾',
    title: 'POS SYSTEMS',
    features: ['Billing & sales management', 'Stock control', 'Invoices & receipts', 'Retail & restaurant ready'],
    usedBy: 'Used by shops, supermarkets, pharmacies',
  },
  {
    icon: '📊',
    title: 'ERP SOFTWARE',
    features: ['Finance management', 'Inventory tracking', 'Procurement systems', 'Business reporting dashboards'],
    usedBy: 'Used by SMEs & growing companies',
  },
  {
    icon: '👨‍💼',
    title: 'HR MANAGEMENT SYSTEMS',
    features: ['Employee records', 'Payroll management', 'Attendance tracking', 'Leave management'],
    usedBy: 'Used by companies with staff operations',
  },
  {
    icon: '🌐',
    title: 'WEB DEVELOPMENT',
    features: ['Corporate websites', 'E-commerce platforms', 'Business portals', 'Lead generation systems'],
    usedBy: 'Used for online presence & sales',
  },
  {
    icon: '⚙️',
    title: 'CUSTOM SOFTWARE',
    features: ['Fully tailored systems', 'Automation workflows', 'API integrations', 'Business-specific tools'],
    usedBy: 'Built for unique business needs',
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Business Systems Built for Kenyan Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SMA Systems provides complete digital infrastructure for businesses — from sales to HR to full automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl border-0 p-8">
              <div className="text-center pb-4">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
              </div>
              <div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-blue-600 font-medium italic">
                  {service.usedBy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;