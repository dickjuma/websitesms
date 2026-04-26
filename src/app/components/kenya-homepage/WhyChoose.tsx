import React from 'react';

const reasons = [
  'Built for Kenya market',
  'Scalable cloud systems',
  'Local county-based SEO structure',
  'Customizable for any industry',
  'Fast deployment',
  'Mobile + desktop ready',
];

const WhyChoose: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Businesses Choose SMA Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                ✓
              </div>
              <p className="text-lg font-medium text-gray-900">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;