// components/HeroSection.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Head from "next/head";
import {
  ArrowRight,
  ShoppingCart,
  LayoutGrid,
  Users,
  Layers,
  Smartphone,
  CreditCard,
  Shield,
  Zap,
  BarChart3,
  Clock,
  CheckCircle2,
  Headphones,
  TrendingUp,
  Award,
} from "lucide-react";

export default function HeroSection() {
  const [siteInfo, setSiteInfo] = useState<{
    logoUrl?: string;
    companyName?: string;
  }>({});

  useEffect(() => {
    let isMounted = true;
    fetch("/api/site", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.data) {
          setSiteInfo(data.data);
        }
      })
      .catch(console.error);
    return () => {
      isMounted = false;
    };
  }, []);

  // Core modules
  const coreModules = [
    {
      name: "POS",
      icon: ShoppingCart,
      description: "Smart point of sale with M-Pesa integration, inventory tracking, and sales analytics.",
      href: "/services/pos-systems",
      color: "text-blue-600",
      bgLight: "bg-blue-50",
      features: ["Offline mode", "Receipt printing", "Staff management"],
    },
    {
      name: "ERP",
      icon: LayoutGrid,
      description: "End-to-end resource planning for finance, supply chain, and operations.",
      href: "/services/erp-systems",
      color: "text-emerald-600",
      bgLight: "bg-emerald-50",
      features: ["Financials", "Procurement", "Inventory"],
    },
    {
      name: "HRM",
      icon: Users,
      description: "Automated payroll, attendance, and employee management built for local compliance.",
      href: "/services/erp-systems",
      color: "text-sky-600",
      bgLight: "bg-sky-50",
      features: ["Payroll", "Leave management", "Recruitment"],
    },
    {
      name: "CRM",
      icon: Layers,
      description: "Customer view with sales pipeline control and support automation.",
      href: "/services/crm-systems",
      color: "text-amber-600",
      bgLight: "bg-amber-50",
      features: ["Lead tracking", "Email integration", "Support tickets"],
    },
  ];

  // Stats data
  const stats = [
    { value: "500+", label: "Businesses", icon: Award },
    { value: "98%", label: "Satisfaction", icon: TrendingUp },
    { value: "24/7", label: "Support", icon: Headphones },
    { value: "50k+", label: "Transactions/day", icon: CreditCard },
  ];

  // Features grid
  const features = [
    { icon: Zap, title: "Lightning fast", description: "Optimized for Kenyan networks, works even on 3G." },
    { icon: Shield, title: "Secure & compliant", description: "Data encryption and local data residency options." },
    { icon: BarChart3, title: "Real-time analytics", description: "Dashboards updated live, no delays." },
    { icon: Smartphone, title: "Mobile-first", description: "Full functionality on phones and tablets." },
    { icon: CreditCard, title: "M-Pesa native", description: "Seamless payments and reconciliations." },
    { icon: Clock, title: "Automated workflows", description: "Reduce manual work with smart rules." },
  ];

  // How it works steps
  const steps = [
    { step: "01", title: "Book a demo", description: "See the platform in action with a personalized walkthrough." },
    { step: "02", title: "Customize", description: "We tailor modules to your business size and industry." },
    { step: "03", title: "Onboard & train", description: "Hands-on training for your team and data migration." },
    { step: "04", title: "Go live & grow", description: "Ongoing support and continuous updates." },
  ];

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Business Management Suite | POS ERP HRM CRM Kenya",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "description": "Best POS system Kenya, ERP software Kenya, HRM solution Kenya, CRM platform Kenya. Integrated business management with M-Pesa integration.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KES"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    }
  };

  return (
    <>
      <Head>
        <title>Best POS, ERP, HRM & CRM Software Kenya | Business Management Suite</title>
        <meta name="description" content="Best POS system Kenya, ERP software Kenya, HRM solution Kenya, CRM platform Kenya. Integrated business management with M-Pesa integration. Book free demo." />
        <meta name="keywords" content="POS Kenya, ERP Kenya, HRM Kenya, CRM Kenya, best POS system Kenya, ERP software Kenya, HRM solution Kenya, CRM platform Kenya, business management software Kenya, M-Pesa integration, inventory management Kenya, payroll system Kenya, accounting software Kenya, retail POS Kenya, restaurant POS Kenya, small business software Kenya, enterprise resource planning Kenya, customer relationship management Kenya, human resource management Kenya, sales management Kenya, stock control Kenya, invoice software Kenya, Kenyan business solutions, Nairobi business software, Mombasa POS system, Kisumu ERP" />
        <meta name="author" content="Business Management Suite" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:title" content="Best POS, ERP, HRM & CRM Software Kenya | Business Management Suite" />
        <meta property="og:description" content="Best POS system Kenya, ERP software Kenya, HRM solution Kenya. Integrated business management with M-Pesa integration. Free demo available." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:locale" content="en_KE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best POS, ERP, HRM & CRM Software Kenya" />
        <meta name="twitter:description" content="Integrated business management solution for Kenyan enterprises with M-Pesa integration." />
        <meta name="twitter:image" content="/twitter-image.jpg" />
        <link rel="canonical" href="https://yourdomain.com" />
        <link rel="alternate" href="https://yourdomain.com" hrefLang="en-ke" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section - Slogan with background tint */}
      <section
        aria-labelledby="hero-headline"
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-section.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          {/* Slogan with background tint - SMALLER FONTS */}
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block bg-black/50 backdrop-blur-sm rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6">
              <h1
                id="hero-headline"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1 sm:mb-2"
              >
                We fix the world
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-blue-200/90">
                One business at a time
              </p>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-500 hover:scale-105"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-white/20"
              >
                Explore modules
              </Link>
            </div>
          </div>

          {/* Three feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
            {coreModules.slice(0, 3).map((module) => (
              <Link
                key={module.name}
                href={module.href}
                className="group relative flex items-start gap-3 sm:gap-4 rounded-2xl border border-slate-200/20 bg-white/95 backdrop-blur-sm p-4 sm:p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`rounded-xl ${module.bgLight} p-2.5 sm:p-3 shrink-0`}>
                  <module.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${module.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">{module.name}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 line-clamp-2">{module.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {module.features.slice(0, 2).map((feature) => (
                      <span key={feature} className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-slate-700" />
              </Link>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-12 sm:mt-16 md:mt-20 rounded-2xl border border-slate-200/20 bg-white/95 backdrop-blur-sm p-4 sm:p-6 shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-blue-700">
              Everything you need to run your business
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-blue-600 max-w-2xl mx-auto px-4">
              Modern features designed for Kenyan enterprises
            </p>
          </div>
          <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 transition-all hover:shadow-md"
              >
                <div className="rounded-xl bg-blue-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800">{feature.title}</h3>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-blue-700">
              Get started in 4 simple steps
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-blue-600">
              From demo to go-live, we're with you every step
            </p>
          </div>
          <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
            {steps.map((step) => (
              <div key={step.step} className="relative rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
                <div className="text-3xl sm:text-4xl font-bold text-blue-200">{step.step}</div>
                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-blue-800">{step.title}</h3>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
