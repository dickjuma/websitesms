import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Star,
  Phone,
  Mail,
  Globe,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Award,
  ChevronRight,
} from "lucide-react";

import { SiteShell } from "@/components/layout/site-shell";
import { KenyaMap } from "./kenya-map";

interface ServicePageProps {
  service: {
    name: string;
    slug: string;
    shortDescription: string;
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;
    problems: string[];
    solutions: string[];
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    process: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    portfolio: Array<{
      image: string;
      title: string;
      description: string;
    }>;
    testimonials: Array<{
      name: string;
      company: string;
      content: string;
      rating: number;
    }>;
    pricing?: Array<{
      name: string;
      price: string;
      features: string[];
      popular?: boolean;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

function JsonLdScripts({ items }: { items: Array<Record<string, unknown>> }) {
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}



export function ModernServicePage({ service }: ServicePageProps) {
  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${service.heroImage})`,
            filter: 'blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {service.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              {service.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Common Business Challenges
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Many businesses struggle with outdated systems and inefficient processes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.problems.map((problem, index) => (
              <div key={index} className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                <div className="flex items-start">
                  <div className="text-red-500 mr-4">
                    <Target className="h-8 w-8" />
                  </div>
                  <p className="text-gray-700 font-medium">{problem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our {service.name} Solution
              </h2>
              <div className="space-y-4">
                {service.solutions.map((solution, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="mb-6 opacity-90">
                Join hundreds of successful businesses across Kenya who have modernized their operations.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to drive business growth and efficiency
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="text-blue-500 mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process gets you up and running quickly
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we've helped businesses transform their operations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.portfolio.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kenya Coverage Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Serving Businesses Across Kenya
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide {service.name.toLowerCase()} services nationwide with local expertise
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <KenyaMap serviceSlug={service.slug} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Why Choose Local Service?
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 mb-2">Local Expertise</h4>
                  <p className="text-blue-800 text-sm">
                    Our team understands the unique challenges and opportunities in your specific region.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900 mb-2">Faster Implementation</h4>
                  <p className="text-green-800 text-sm">
                    Local presence means quicker setup, training, and ongoing support for your business.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-900 mb-2">Regional Compliance</h4>
                  <p className="text-purple-800 text-sm">
                    We ensure your systems comply with local regulations and business practices.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Not seeing your location?</strong> We serve businesses across all 47 counties in Kenya.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact us for your area
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by businesses across Kenya for reliable service delivery
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get started with our {service.name.toLowerCase()} solution today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +254 719 832 719
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our {service.name.toLowerCase()} services
            </p>
          </div>
          <div className="space-y-6">
            {service.faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50">
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}