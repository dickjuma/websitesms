import React from 'react';
import Link from 'next/link';

const kenyaCounties = [
  { name: 'Mombasa', slug: 'mombasa', region: 'Coast' },
  { name: 'Kwale', slug: 'kwale', region: 'Coast' },
  { name: 'Kilifi', slug: 'kilifi', region: 'Coast' },
  { name: 'Tana River', slug: 'tana-river', region: 'Coast' },
  { name: 'Lamu', slug: 'lamu', region: 'Coast' },
  { name: 'Taita-Taveta', slug: 'taita-taveta', region: 'Coast' },
  { name: 'Garissa', slug: 'garissa', region: 'North Eastern' },
  { name: 'Wajir', slug: 'wajir', region: 'North Eastern' },
  { name: 'Mandera', slug: 'mandera', region: 'North Eastern' },
  { name: 'Marsabit', slug: 'marsabit', region: 'Eastern' },
  { name: 'Isiolo', slug: 'isiolo', region: 'Eastern' },
  { name: 'Meru', slug: 'meru', region: 'Eastern' },
  { name: 'Tharaka-Nithi', slug: 'tharaka-nithi', region: 'Eastern' },
  { name: 'Embu', slug: 'embu', region: 'Eastern' },
  { name: 'Kitui', slug: 'kitui', region: 'Eastern' },
  { name: 'Machakos', slug: 'machakos', region: 'Eastern' },
  { name: 'Makueni', slug: 'makueni', region: 'Eastern' },
  { name: 'Nyandarua', slug: 'nyandarua', region: 'Central' },
  { name: 'Nyeri', slug: 'nyeri', region: 'Central' },
  { name: 'Kirinyaga', slug: 'kirinyaga', region: 'Central' },
  { name: 'Murang\'a', slug: 'muranga', region: 'Central' },
  { name: 'Kiambu', slug: 'kiambu', region: 'Central' },
  { name: 'Turkana', slug: 'turkana', region: 'Rift Valley' },
  { name: 'West Pokot', slug: 'west-pokot', region: 'Rift Valley' },
  { name: 'Samburu', slug: 'samburu', region: 'Rift Valley' },
  { name: 'Trans-Nzoia', slug: 'trans-nzoia', region: 'Rift Valley' },
  { name: 'Uasin Gishu', slug: 'uasin-gishu', region: 'Rift Valley' },
  { name: 'Elgeyo-Marakwet', slug: 'elgeyo-marakwet', region: 'Rift Valley' },
  { name: 'Nandi', slug: 'nandi', region: 'Rift Valley' },
  { name: 'Baringo', slug: 'baringo', region: 'Rift Valley' },
  { name: 'Laikipia', slug: 'laikipia', region: 'Rift Valley' },
  { name: 'Nakuru', slug: 'nakuru', region: 'Rift Valley' },
  { name: 'Narok', slug: 'narok', region: 'Rift Valley' },
  { name: 'Kajiado', slug: 'kajiado', region: 'Rift Valley' },
  { name: 'Kericho', slug: 'kericho', region: 'Rift Valley' },
  { name: 'Bomet', slug: 'bomet', region: 'Rift Valley' },
  { name: 'Kakamega', slug: 'kakamega', region: 'Western' },
  { name: 'Vihiga', slug: 'vihiga', region: 'Western' },
  { name: 'Bungoma', slug: 'bungoma', region: 'Western' },
  { name: 'Busia', slug: 'busia', region: 'Western' },
  { name: 'Siaya', slug: 'siaya', region: 'Nyanza' },
  { name: 'Kisumu', slug: 'kisumu', region: 'Nyanza' },
  { name: 'Homa Bay', slug: 'homa-bay', region: 'Nyanza' },
  { name: 'Migori', slug: 'migori', region: 'Nyanza' },
  { name: 'Kisii', slug: 'kisii', region: 'Nyanza' },
  { name: 'Nyamira', slug: 'nyamira', region: 'Nyanza' },
  { name: 'Nairobi', slug: 'nairobi', region: 'Nairobi' },
];

const services = ['pos-systems', 'erp-software', 'hr-management', 'web-development', 'custom-software'];

const CountyDirectory: React.FC = () => {
  const regions = [...new Set(kenyaCounties.map(county => county.region))];

  return (
    <section id="county-directory" className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-100 to-blue-100 border border-red-200 text-red-700 text-sm font-bold mb-6">
            🎯 ALL 47 COUNTIES COVERED
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 bg-gradient-to-r from-red-600 via-blue-600 to-red-600 bg-clip-text text-transparent">
            Kenya County Directory
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium">
            Every county in Kenya has dedicated business software solutions. Click any county to explore POS systems, ERP platforms, HR management, web development, and custom automation services tailored for that region.
          </p>
        </div>

        {regions.map((region, regionIndex) => (
          <div key={region} className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl mr-4">
                {regionIndex + 1}
              </div>
              <h3 className="text-3xl font-black text-gray-900 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {region} Region
              </h3>
              <div className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                {kenyaCounties.filter(county => county.region === region).length} Counties
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {kenyaCounties
                .filter(county => county.region === region)
                .map(county => (
                  <div key={county.slug} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-1">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mr-3">
                        📍
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        <Link href={`/kenya/${county.slug}`} className="hover:underline">
                          {county.name}
                        </Link>
                      </h4>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600 font-medium mb-3">Available Services:</p>
                      {services.slice(0, 3).map(service => (
                        <Link
                          key={service}
                          href={`/kenya/${county.slug}/${service}`}
                          className="block text-sm text-blue-600 hover:text-red-600 hover:underline transition-colors"
                        >
                          • {service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Link>
                      ))}
                      {services.length > 3 && (
                        <p className="text-xs text-gray-500">+{services.length - 3} more services</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/kenya/${county.slug}`}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 transform hover:scale-105 text-center shadow-lg"
                      >
                        Explore County
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Call to action */}
        <div className="text-center mt-16 bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-12 text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Get started with enterprise-grade software solutions in your county today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              🚀 Start Free Demo
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300">
              📞 Contact Local Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountyDirectory;