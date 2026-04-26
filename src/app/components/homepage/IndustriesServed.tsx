import React from 'react';

const industries = [
  {
    name: 'Retail Shops',
    description: 'POS systems for small shops, boutiques, and specialty stores.',
    icon: '🛍️',
  },
  {
    name: 'Supermarkets',
    description: 'Complete retail management with inventory tracking and sales analytics.',
    icon: '🏪',
  },
  {
    name: 'Restaurants',
    description: 'Restaurant POS, kitchen management, and table service systems.',
    icon: '🍽️',
  },
  {
    name: 'Schools',
    description: 'Student management, fee collection, and administrative systems.',
    icon: '🎓',
  },
  {
    name: 'SMEs',
    description: 'Business management solutions for small and medium enterprises.',
    icon: '💼',
  },
  {
    name: 'Corporates',
    description: 'Enterprise-level ERP and HR systems for large organizations.',
    icon: '🏢',
  },
];

const IndustriesServed: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our business software solutions are designed to serve diverse industries across Kenya's economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="text-center bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="text-4xl mb-4">{industry.icon}</div>
              <h3 className="text-xl font-bold text-black mb-3">{industry.name}</h3>
              <p className="text-gray-600 leading-relaxed">{industry.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Custom solutions available for any industry or business type.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;