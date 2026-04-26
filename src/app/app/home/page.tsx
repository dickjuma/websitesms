import { Metadata } from 'next';
import { HeroSection } from '../components/hero-section';
import { ServicesSection } from '../components/services-section';
import { Footer } from '../components/footer';

export const metadata: Metadata = {
  title: 'SMA Systems | Enterprise Software Solutions East Africa',
  description: 'Leading software company in Kenya. We build ERP, POS, Web Development, and AI solutions for businesses. 400+ projects delivered. Book a free consultation.',
  keywords: [
    'software development Kenya',
    'ERP systems Nairobi',
    'POS systems Kenya',
    'web development company',
    'mobile app development',
    'AI solutions East Africa',
    'enterprise software',
  ],
  openGraph: {
    title: 'SMA Systems | Enterprise Software Solutions',
    description: 'Building intelligent ERP, POS, and digital solutions for businesses across East Africa.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection
        title="Modern Software for East African Enterprise"
        subtitle="Empowering businesses with intelligent ERP systems, custom web platforms, and automated workflows designed for the local market."
      />

      {/* Trust Section */}
      <section className="border-y border-slate-200 bg-white py-8">
        <div className="container">
          <p className="text-center text-sm text-slate-500 mb-6">Trusted by businesses across East Africa</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 font-medium text-lg">
            <span>Kenya</span>
            <span>•</span>
            <span>Uganda</span>
            <span>•</span>
            <span>Tanzania</span>
            <span>•</span>
            <span>Rwanda</span>
            <span>•</span>
            <span>DRC</span>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Why Choose SMA Systems
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We combine local expertise with global standards to deliver enterprise-grade solutions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: '400+ Projects', desc: 'Successfully delivered across East Africa' },
              { title: 'ISO 27001', desc: 'Certified for information security' },
              { title: '24/7 Support', desc: 'Round-the-clock technical assistance' },
              { title: 'Local Presence', desc: 'Offices in Kenya, Uganda, Tanzania' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-slate-50">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-slate-900 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Ready to Transform Your Business?</h2>
            <p className="mt-4 text-lg text-slate-300">
              Let's build your custom solution today. Schedule a free consultation.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a href="/book-demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                Book a Demo
              </a>
              <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
