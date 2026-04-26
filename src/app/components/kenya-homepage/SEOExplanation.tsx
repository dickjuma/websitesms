import React from 'react';

const SEOExplanation: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Smart SEO & Location System
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We structure our platform into Service Pages (Master Authority), County Pages (SEO hubs), and Service + Location Pages (Ranking pages).
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Pages</h3>
              <p className="text-gray-600">Master Authority pages that establish credibility for each service type.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">County Pages</h3>
              <p className="text-gray-600">SEO hubs that capture local search traffic for each Kenya county.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service + Location Pages</h3>
              <p className="text-gray-600">Ranking pages that combine services with specific locations for targeted SEO.</p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white rounded-xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Example:</h4>
            <div className="space-y-2 text-gray-700">
              <p><strong>POS Systems</strong> (Master Page)</p>
              <p>↓</p>
              <p><strong>Bungoma County Hub</strong></p>
              <p>↓</p>
              <p><strong>POS Systems in Bungoma</strong> (Ranking Page)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOExplanation;