import React from 'react';
import Link from 'next/link';

const featuredCounties = [
  { name: 'Nairobi', slug: 'nairobi' },
  { name: 'Mombasa', slug: 'mombasa' },
  { name: 'Kisumu', slug: 'kisumu' },
  { name: 'Nakuru', slug: 'nakuru' },
  { name: 'Eldoret', slug: 'eldoret' },
  { name: 'Meru', slug: 'meru' },
  { name: 'Garissa', slug: 'garissa' },
  { name: 'Kakamega', slug: 'kakamega' },
];

const CountyPreview: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured County Hubs
          </h2>
          <p className="text-xl text-gray-600">
            Explore our major business hubs across Kenya
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {featuredCounties.map((county, index) => (
            <Link key={index} href={`/kenya/${county.slug}`}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 text-center">
                <div className="text-3xl mb-4">🏢</div>
                <h3 className="font-semibold text-gray-900 mb-2">{county.name}</h3>
                <p className="text-sm text-blue-600 hover:text-blue-700">Explore services →</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="#county-directory">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
              📍 View All 47 Counties
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CountyPreview;