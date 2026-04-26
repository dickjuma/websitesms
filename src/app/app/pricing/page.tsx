import { Metadata } from 'next';
import Link from 'next/link';
import { cn } from '../lib/utils';
import { PRICING_SERVICES, PRICING_CATEGORIES } from '../lib/pricing-data';

export const metadata: Metadata = {
  title: 'Pricing | SMA Systems',
  description: 'Transparent pricing for all our software solutions. ERP, POS, Web Development, Mobile Apps, and more. Get a custom quote for your business.',
  keywords: [
    'software pricing',
    'ERP pricing',
    'POS system cost',
    'web development prices',
    'mobile app development cost',
    'SaaS pricing Kenya',
  ],
  openGraph: {
    title: 'Pricing | SMA Systems',
    description: 'Transparent pricing for enterprise software solutions in East Africa.',
    type: 'website',
  },
};

const iconMap: Record<string, React.ReactNode> = {
  'building-2': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  'briefcase': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
    </svg>
  ),
  'code': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  ),
  'wrench': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.5-4.5c0-.17-.01-.333-.03-.5M10.828 7.5a4.5 4.5 0 0 0 4.5 4.5m-4.5 3.5a4.5 4.5 0 0 1 4.5-4.5" />
    </svg>
  ),
};

const colorMap = {
  blue: 'bg-blue-600 text-white',
  emerald: 'bg-emerald-600 text-white',
  violet: 'bg-violet-600 text-white',
  amber: 'bg-amber-600 text-white',
};

export default function PricingPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Transparent Pricing
            </h1>
            <p className="mt-6 text-lg text-slate-300 sm:text-xl">
              Choose the perfect solution for your business. All prices include implementation, training, and support.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PRICING_CATEGORIES.map((category) => (
              <div key={category.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className={cn(
                  'mb-4 inline-flex rounded-xl p-3',
                  colorMap[category.color as keyof typeof colorMap] || colorMap.blue
                )}>
                  {iconMap[category.icon] || iconMap['briefcase']}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{category.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PRICING_SERVICES.map((service, index) => (
              <Link
                key={service.id}
                href={`/pricing/${service.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-blue-50">
                  <svg className="h-6 w-6 text-slate-600 transition-colors group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                  {service.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  <span>View pricing</span>
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl bg-slate-900 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Need a Custom Quote?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Every business is unique. Contact us for a tailored solution that fits your specific requirements and budget.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500"
              >
                Get a Quote
              </a>
              <a
                href="/book-demo"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}