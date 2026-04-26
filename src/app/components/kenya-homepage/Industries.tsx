import React from 'react';

const industries = [
  'Retail businesses',
  'Supermarkets',
  'Restaurants & hotels',
  'Schools & institutions',
  'SMEs & startups',
  'Corporate companies',
];

const Industries: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Industries We Serve
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-semibold text-gray-900">{industry}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;