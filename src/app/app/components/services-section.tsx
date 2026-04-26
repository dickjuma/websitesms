"use client";

import Link from "next/link";
import { ArrowRight, Layout, ShoppingCart, Globe, Smartphone, Bot, Workflow } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  href: string;
}

const services = [
  {
    icon: <Layout className="h-6 w-6" />,
    title: "ERP Systems",
    description: "Comprehensive enterprise resource planning for operations, finance, HR, and inventory management.",
    benefits: ["Centralized data", "Real-time reporting", "Cost reduction"],
    href: "/services/erp-systems",
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "POS Systems",
    description: "Point of sale solutions for retail, restaurants, and hospitality businesses.",
    benefits: ["Faster checkout", "Inventory sync", "Multi-payment support"],
    href: "/services/pos-systems",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Web Development",
    description: "Custom websites, SaaS platforms, and business web applications.",
    benefits: ["SEO optimized", "Mobile-responsive", "Secure & scalable"],
    href: "/services/web-development",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps for iOS and Android.",
    benefits: ["Native performance", "Offline support", "Push notifications"],
    href: "/services/mobile-apps",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "AI Chatbots",
    description: "Intelligent AI-powered chatbots for customer service and sales.",
    benefits: ["24/7 availability", "Instant responses", "Lead qualification"],
    href: "/services/chatbots",
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Business Automation",
    description: "Workflow automation and process optimization solutions.",
    benefits: ["Reduce manual work", "Faster processes", "Error reduction"],
    href: "/services/automation",
  },
];

function ServiceCard({ icon, title, description, benefits, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-1"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform group-hover:scale-110">
        {icon}
      </div>
      
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
      
      <ul className="mt-4 space-y-2">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {benefit}
          </li>
        ))}
      </ul>
      
      <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium text-blue-600 transition-transform group-hover:translate-x-1">
        <span>View Details</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

interface ServicesSectionProps {
  title?: string;
  description?: string;
}

export function ServicesSection({ title, description }: ServicesSectionProps) {
  const defaultTitle = "Enterprise Services That Drive Growth";
  const defaultDescription = "Comprehensive digital solutions designed to transform your business operations and accelerate growth.";

  return (
    <section className="bg-slate-50 section">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {title || defaultTitle}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {description || defaultDescription}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div 
              key={service.title}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
