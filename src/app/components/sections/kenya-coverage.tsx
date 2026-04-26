import Link from 'next/link';
import { MapPin } from 'lucide-react';

const counties = [
  { name: 'Nairobi', slug: 'nairobi', x: 45, y: 35, businesses: '15,000+' },
  { name: 'Mombasa', slug: 'mombasa', x: 15, y: 70, businesses: '8,000+' },
  { name: 'Kisumu', slug: 'kisumu', x: 35, y: 45, businesses: '4,500+' },
  { name: 'Nakuru', slug: 'nakuru', x: 40, y: 40, businesses: '5,000+' },
  { name: 'Eldoret', slug: 'eldoret', x: 30, y: 30, businesses: '3,000+' },
  { name: 'Bungoma', slug: 'bungoma', x: 25, y: 20, businesses: '2,500+' },
  { name: 'Kajiado', slug: 'kajiado', x: 50, y: 50, businesses: '3,200+' },
  { name: 'Kiambu', slug: 'kiambu', x: 42, y: 32, businesses: '4,800+' },
  { name: 'Machakos', slug: 'machakos', x: 48, y: 38, businesses: '3,100+' },
  { name: 'Kericho', slug: 'kericho', x: 32, y: 35, businesses: '2,800+' },
];

export function KenyaCoverage() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Kenya Coverage</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-950">
            Business Software Across All 47 Counties
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            We serve businesses nationwide with localized support, implementation, and maintenance services.
          </p>
        </div>

        {/* Kenya Map */}
        <div className="relative mb-12">
          <div className="relative bg-slate-100 rounded-lg overflow-hidden" style={{ aspectRatio: '1.2' }}>
            {/* Background image if available, otherwise placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <MapPin className="mx-auto h-12 w-12 mb-2" />
                  <p className="text-sm font-medium">Kenya Map</p>
                  <p className="text-xs">Interactive county markers</p>
                </div>
              </div>
            </div>

            {/* County markers */}
            {counties.map((county) => (
              <Link
                key={county.slug}
                href={`/kenya/${county.slug}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${county.x}%`, top: `${county.y}%` }}
              >
                <div className="relative">
                  <MapPin className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-slate-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {county.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* County stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {counties.slice(0, 8).map((county) => (
            <Link
              key={county.slug}
              href={`/kenya/${county.slug}`}
              className="flex items-center justify-between p-4 rounded-lg border border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm transition"
            >
              <div>
                <h3 className="font-semibold text-slate-950">{county.name}</h3>
                <p className="text-sm text-slate-600">{county.businesses} businesses</p>
              </div>
              <MapPin className="h-5 w-5 text-blue-600" />
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-600 mb-6">
            All 47 counties covered with dedicated local teams and county-specific business solutions.
          </p>
          <Link
            href="/kenya"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore All Counties
            <MapPin className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}