import React from 'react';
import Link from 'next/link';

const HowSystemWorks: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            How Our Platform is Structured for Kenya SEO
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our programmatic SEO system creates thousands of optimized pages to help Kenyan businesses find our services locally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Layer 1 */}
          <div className="text-center">
            <div className="bg-blue-50 rounded-lg p-8 border border-blue-200 mb-6">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-black mb-3">Service Pages</h3>
              <p className="text-gray-600 mb-4">Master Authority Pages</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div>/services/pos-systems</div>
                <div>/services/erp-software</div>
                <div>/services/hr-management</div>
                <div>/services/web-development</div>
                <div>/services/custom-software</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Comprehensive service explanations that rank nationally and link to all county pages.
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center lg:hidden">
            <div className="text-4xl text-blue-600">↓</div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="text-4xl text-blue-600">→</div>
          </div>

          {/* Layer 2 */}
          <div className="text-center">
            <div className="bg-green-50 rounded-lg p-8 border border-green-200 mb-6">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-black mb-3">County Pages</h3>
              <p className="text-gray-600 mb-4">SEO Hubs</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div>/kenya/nairobi</div>
                <div>/kenya/bungoma</div>
                <div>/kenya/eldoret</div>
                <div>/kenya/mombasa</div>
                <div>/kenya/kisumu</div>
                <div>...47 total</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Navigation hubs that showcase all services available in specific counties.
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center lg:hidden">
            <div className="text-4xl text-blue-600">↓</div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="text-4xl text-blue-600">→</div>
          </div>

          {/* Layer 3 */}
          <div className="text-center">
            <div className="bg-purple-50 rounded-lg p-8 border border-purple-200 mb-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-black mb-3">Service + Location</h3>
              <p className="text-gray-600 mb-4">Main SEO Targets</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div>/kenya/nairobi/pos-systems</div>
                <div>/kenya/bungoma/erp-software</div>
                <div>/kenya/eldoret/hr-management</div>
                <div>/kenya/mombasa/web-development</div>
                <div>...235+ combinations</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Highly targeted pages that rank for local searches and convert visitors.
            </p>
          </div>
        </div>

        {/* Example Flow */}
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-6 text-center">Example: How Users Navigate</h3>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">POS Systems</div>
              <p className="text-xs text-gray-600 mt-1">Authority Page</p>
            </div>
            <div className="text-2xl text-blue-600">→</div>
            <div className="text-center">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">Bungoma</div>
              <p className="text-xs text-gray-600 mt-1">County Hub</p>
            </div>
            <div className="text-2xl text-blue-600">→</div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-medium">POS Systems in Bungoma</div>
              <p className="text-xs text-gray-600 mt-1">Target Page</p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">
            This creates thousands of SEO-optimized pages that help local businesses find our services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowSystemWorks;