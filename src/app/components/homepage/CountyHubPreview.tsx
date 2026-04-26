import React from 'react';
import Link from 'next/link';

const featuredCounties = [
  {
    slug: 'nairobi',
    name: 'Nairobi',
    description: 'Business capital with extensive corporate and SME presence.',
    businesses: '15,000+',
  },
  {
    slug: 'bungoma',
    name: 'Bungoma',
    description: 'Agricultural hub with growing retail and service sectors.',
    businesses: '2,500+',
  },
  {
    slug: 'eldoret',
    name: 'Eldoret',
    description: 'Major commercial center serving Rift Valley region.',
    businesses: '3,000+',
  },
  {
    slug: 'mombasa',
    name: 'Mombasa',
    description: 'Coastal economic hub with tourism and trade focus.',
    businesses: '8,000+',
  },
  {
    slug: 'kisumu',
    name: 'Kisumu',
    description: 'Nyanza regional business center with growing tech sector.',
    businesses: '4,500+',
  },
  {
    slug: 'nakuru',
    name: 'Nakuru',
    description: 'Central Kenya business hub with manufacturing focus.',
    businesses: '5,000+',
  },
];

const CountyHubPreview: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            Explore Digital Business Systems Across Kenya
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each county has its own dedicated hub page showcasing all available business software solutions and local implementation expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCounties.map((county) => (
            <div key={county.slug} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-black">{county.name}</h3>
                <div className="text-sm text-gray-500 bg-white px-2 py-1 rounded border">
                  {county.businesses} businesses
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{county.description}</p>
              <Link
                href={`/kenya/${county.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Open Hub →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            All 47 counties covered with localized business software solutions and dedicated support teams.
          </p>
          <Link
            href="/kenya"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
          >
            View All County Hubs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CountyHubPreview;