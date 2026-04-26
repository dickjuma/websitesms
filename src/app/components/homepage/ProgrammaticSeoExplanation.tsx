import React from 'react';

const ProgrammaticSeoExplanation: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Programmatic SEO Architecture
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our automated system generates thousands of SEO-optimized pages to capture local search traffic across Kenya.
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-200 mb-12">
          <h3 className="text-2xl font-bold text-black mb-6 text-center">How We Generate Pages</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-6 mb-4">
                <div className="text-3xl mb-2">📄</div>
                <div className="font-bold text-blue-800">Service Pages</div>
              </div>
              <div className="text-sm text-gray-600">
                <strong>5 master pages:</strong><br />
                POS Systems, ERP Software, HR Management, Web Development, Custom Software
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl text-4xl mb-4">×</div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-6 mb-4">
                <div className="text-3xl mb-2">📍</div>
                <div className="font-bold text-green-800">County Pages</div>
              </div>
              <div className="text-sm text-gray-600">
                <strong>47 location pages:</strong><br />
                Every county in Kenya
              </div>
            </div>
          </div>

          <div className="text-center my-8">
            <div className="text-4xl text-blue-600">=</div>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-lg p-8 inline-block">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-purple-800 mb-2">235+ SEO Pages</div>
              <div className="text-sm text-gray-600">
                Every service in every county = maximum local search coverage
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-black mb-4">SEO Benefits</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Captures local search traffic for "business software [county]"</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Builds authority for service-specific keywords</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Creates comprehensive internal linking structure</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Scalable system that grows with new services/counties</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-black mb-4">Example URLs</h3>
            <div className="space-y-2 font-mono text-sm text-gray-700">
              <div>/services/pos-systems</div>
              <div>/kenya/nairobi</div>
              <div>/kenya/nairobi/pos-systems</div>
              <div>/services/erp-software</div>
              <div>/kenya/bungoma</div>
              <div>/kenya/bungoma/erp-software</div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Each combination is fully optimized with unique, localized content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammaticSeoExplanation;