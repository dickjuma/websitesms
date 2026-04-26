import { Metadata } from 'next';
import Link from 'next/link';
import { kenyanCounties } from '@/lib/location-seo/counties';
import { locationServices } from '@/lib/location-seo/services';

export const metadata: Metadata = {
  title: 'Software Development Services Kenya | SMA Systems',
  description: 'Professional IT services across Kenya. Web development, ERP systems, POS, mobile apps, AI solutions in Nairobi, Mombasa, Kisumu, Nakuru and all 47 counties.',
  keywords: [
    'software development Kenya',
    'web development Kenya',
    'ERP systems Kenya',
    'POS systems Kenya',
    'mobile app development Kenya',
    'IT services Nairobi',
    'software company Kenya',
  ],
  openGraph: {
    title: 'Software Development Services Kenya | SMA Systems',
    description: 'Professional IT services across Kenya. Web development, ERP, POS, mobile apps.',
    type: 'website',
  },
};

export default function ServicesIndexPage() {
  const regions = [...new Set(kenyanCounties.map(c => c.region))];
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            IT & Software Services in Kenya
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Professional software solutions for businesses across all 47 Kenyan counties. 
            From Nairobi to Mombasa, Kisumu to Nakuru - we serve the entire nation.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Our Services</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locationServices.map((service) => (
              <Link
                key={service.id}
                href={`/service-web-dev/service/${service.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Counties We Serve
          </h2>
          {regions.map((region) => (
            <div key={region} className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-700">{region} Region</h3>
              <div className="flex flex-wrap gap-2">
                {kenyanCounties.filter(c => c.region === region).map((county) => (
                  <Link
                    key={county.slug}
                    href={`/service-web-dev/${county.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
                  >
                    {county.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}