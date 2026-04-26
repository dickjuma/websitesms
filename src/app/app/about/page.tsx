import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from '../components/hero-section';

export const metadata: Metadata = {
  title: 'About Us | SMA Systems',
  description: 'Learn about SMA Systems - leading software company in Kenya delivering ERP, POS, Web Development, and AI solutions across East Africa.',
};

export default function AboutPage() {
  return (
    <main>
      <HeroSection 
        title="About SMA Systems"
        subtitle="Building enterprise-grade software solutions for businesses across East Africa since 2014."
      />

      {/* Mission & Vision */}
      <section className="section bg-slate-50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600">
                To empower businesses across East Africa with intelligent, scalable, and affordable software solutions that drive digital transformation and growth.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-600">
                To be the leading technology partner for businesses in East Africa, delivering innovation that transforms industries and improves lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { number: '400+', label: 'Projects Delivered' },
              { number: '10+', label: 'Years Experience' },
              { number: '50+', label: 'Team Members' },
              { number: '5', label: 'Countries Served' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-slate-50">
                <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-slate-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Our Values</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Innovation', desc: 'We embrace new technologies and creative solutions.' },
              { title: 'Reliability', desc: 'We deliver on our promises, every time.' },
              { title: 'Customer Focus', desc: 'Your success is our priority.' },
            ].map((value, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-slate-900 text-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold">Ready to Work With Us?</h2>
            <p className="mt-4 text-lg text-slate-300">
              Let's discuss how we can help transform your business.
            </p>
            <div className="mt-8">
              <a href="/book-demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
