import { Metadata } from 'next';
import { services } from '../lib/constants';
import { HeroSection } from '../components/hero-section';

export const metadata: Metadata = {
  title: 'Contact Us | SMA Systems',
  description: 'Get in touch with SMA Systems for ERP, POS, Web Development, and AI solutions. Contact our team in Nairobi, Kenya.',
};

export default function ContactPage() {
  return (
    <main>
      <HeroSection 
        title="Get in Touch"
        subtitle="Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />

      {/* Contact Form & Info */}
      <section className="section bg-slate-50">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input type="text" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input type="text" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input type="tel" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" placeholder="+254 700 000 000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Service Interested In</label>
                  <select className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
                    <option value="">Select a service</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Phone</p>
                    <a href="tel:+254719832719" className="text-lg font-medium text-slate-900">+254 719 832 719</a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email</p>
                    <a href="mailto:hello@smassystems.com" className="text-lg font-medium text-slate-900">hello@smassystems.com</a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Location</p>
                    <p className="text-lg font-medium text-slate-900">Nairobi, Kenya</p>
                    <p className="text-sm text-slate-600">Serving all of East Africa</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Office Hours</p>
                    <p className="text-lg font-medium text-slate-900">Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-sm text-slate-600">24/7 Support Available</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Links</h2>
                <div className="space-y-2">
                  <a href="/book-demo" className="block text-sm font-medium text-blue-600 hover:text-blue-700">Book a Demo →</a>
                  <a href="/services" className="block text-sm font-medium text-blue-600 hover:text-blue-700">Our Services →</a>
                  <a href="/careers" className="block text-sm font-medium text-blue-600 hover:text-blue-700">Careers →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
