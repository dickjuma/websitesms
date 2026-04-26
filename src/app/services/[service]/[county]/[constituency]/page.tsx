import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Star } from "lucide-react";

import { SiteShell } from "@/components/layout/site-shell";
import { getLocalizedServiceData } from "@/lib/seo/service-page-data";
import { getServiceBySlug, generateConstituencyServiceMetadata } from "@/lib/location-seo/services";
import { getConstituencyBySlug, getCountyBySlug } from "@/lib/location-seo/counties";

interface ServiceConstituencyPageProps {
  params: Promise<{
    service: string;
    county: string;
    constituency: string;
  }>;
}

export async function generateMetadata({ params }: ServiceConstituencyPageProps): Promise<Metadata> {
  const { service, county, constituency } = await params;

  const serviceData = getServiceBySlug(service);
  const countyData = getCountyBySlug(county);

  if (!serviceData || !countyData) {
    return {
      title: "Service Not Found | SMA Systems",
    };
  }

  const constituencyData = getConstituencyBySlug(countyData, constituency);
  if (!constituencyData) {
    return {
      title: "Location Not Found | SMA Systems",
    };
  }

  return generateConstituencyServiceMetadata(countyData, constituencyData, serviceData);
}

export default async function ServiceConstituencyPage({ params }: ServiceConstituencyPageProps) {
  const { service, county, constituency } = await params;

  const serviceData = getServiceBySlug(service);
  const countyData = getCountyBySlug(county);

  if (!serviceData || !countyData) {
    notFound();
  }

  const constituencyData = getConstituencyBySlug(countyData, constituency);
  if (!constituencyData) {
    notFound();
  }

  const location = constituencyData;
  const pageData = getLocalizedServiceData(service, location);

  if (!pageData) {
    notFound();
  }

  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 mb-6">
              <Star className="h-4 w-4" />
              {pageData.hero.trustLine}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto">
              {pageData.hero.h1.replace('{{location}}', location)}
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {pageData.hero.subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                {pageData.hero.cta.primary}
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="https://wa.me/254719832719"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-8 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50"
              >
                <MessageCircle className="h-5 w-5" />
                {pageData.hero.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Localized Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {pageData.title} in {location}, {countyData.name}
              </h2>

              <div className="space-y-6 text-slate-600">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">What are {pageData.title}?</h3>
                  <p className="leading-relaxed">{pageData.introduction.what}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Why {location} Businesses Need {pageData.title}</h3>
                  <p className="leading-relaxed">{pageData.introduction.why}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Local Business Challenges</h3>
                  <ul className="space-y-2">
                    {pageData.introduction.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-medium">Starting Price</span>
                  <span className="text-2xl font-bold text-blue-600">{pageData.pricing.startingPrice}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-medium">Location</span>
                  <span className="font-semibold">{location}, {countyData.name}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-medium">Support</span>
                  <span className="font-semibold">24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Need This Service */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Businesses in {location} Need {pageData.title}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Address local challenges and unlock growth opportunities with modern technology solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Local Pain Points</h3>
              <ul className="space-y-3">
                {pageData.whyNeeded.painPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span className="text-slate-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Industry Challenges</h3>
              <ul className="space-y-3">
                {pageData.whyNeeded.industryProblems.map((problem, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-slate-600">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Digital Benefits</h3>
              <ul className="space-y-3">
                {pageData.whyNeeded.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Key Benefits for {location} Businesses
            </h2>
            <p className="text-xl text-slate-600">
              Transform your operations with proven business solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-xl hover:shadow-md transition">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {benefit.title.replace('{{location}}', location)}
                </h3>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to run your business efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Industries in {location}
            </h2>
            <p className="text-xl text-slate-600">
              Perfect for businesses across various sectors in {location}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pageData.industries.map((industry, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {industry.name}
                </h3>
                <p className="text-slate-600 mb-4">
                  {industry.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {industry.examples.map((example, idx) => (
                    <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Implementation Process
            </h2>
            <p className="text-xl text-slate-600">
              Get up and running quickly with our proven implementation approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.process.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-4">
                  {step.title.replace('{{location}}', location)}
                </h3>
                <p className="text-slate-600 mb-2">
                  {step.description}
                </p>
                {step.duration && (
                  <div className="text-sm text-blue-600 font-medium">
                    Duration: {step.duration}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about {pageData.title} in {location}.
            </p>
          </div>

          <div className="space-y-6">
            {pageData.faq.map((faq, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {faq.question.replace('{{location}}', location)}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer.replace(/\{\{location\}\}/g, location)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {pageData.finalCta.title.replace('{{location}}', location)}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {pageData.finalCta.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="https://wa.me/254719832719"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5" />
              {pageData.finalCta.whatsappText.replace('{{location}}', location)}
            </Link>

            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
              {pageData.finalCta.contactFormTitle}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex justify-center gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>Call: +254 719 832 719</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `${pageData.title} in ${location}`,
            "description": pageData.description,
            "provider": {
              "@type": "Organization",
              "name": "SMA Systems",
              "url": "https://smassystems.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KE"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254-719-832-719",
                "contactType": "customer service"
              }
            },
            "areaServed": [
              {
                "@type": "Country",
                "name": "Kenya"
              },
              {
                "@type": "City",
                "name": location
              },
              {
                "@type": "City",
                "name": countyData.name
              }
            ],
            "serviceType": pageData.schema.serviceType,
            "offers": {
              "@type": "Offer",
              "priceRange": pageData.pricing.startingPrice,
              "availability": "https://schema.org/InStock"
            },
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": pageData.faq.map(faq => ({
                "@type": "Question",
                "name": faq.question.replace('{{location}}', location),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer.replace(/\{\{location\}\}/g, location)
                }
              }))
            }
          })
        }}
      />
    </SiteShell>
  );
}