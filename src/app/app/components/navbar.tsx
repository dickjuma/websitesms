"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, Sparkles } from "lucide-react";

import { kenyanCounties } from "../lib/location-seo/counties";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const locationItems = kenyanCounties.slice(0, 20);

const megaMenuCategories = [
  {
    title: "Business Systems",
    items: [
      { title: "ERP Systems", description: "Manage operations, finance, HR", href: "/services/erp-systems" },
      { title: "POS Systems", description: "Retail sales & payment processing", href: "/services/pos-systems" },
      { title: "Inventory Management", description: "Stock tracking & warehouse", href: "/services/inventory" },
    ],
  },
  {
    title: "Digital Solutions",
    items: [
      { title: "Web Development", description: "Custom websites & platforms", href: "/services/web-development" },
      { title: "Mobile Applications", description: "iOS & Android apps", href: "/services/mobile-apps" },
      { title: "E-commerce Solutions", description: "Online stores & payments", href: "/services/ecommerce" },
    ],
  },
  {
    title: "Automation & AI",
    items: [
      { title: "AI Chatbots", description: "智能客户服务", href: "/services/chatbots" },
      { title: "Workflow Automation", description: "流程自动化", href: "/services/automation" },
      { title: "Analytics Dashboards", description: "数据可视化", href: "/services/analytics" },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-white/80 border-b border-slate-200/60 backdrop-blur-xl shadow-sm"
        : "bg-white border-b border-transparent"
    }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <span className="text-lg font-semibold text-slate-900">SMA Systems</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.href} ref={item.label === "Services" ? servicesRef : undefined} className="relative">
              {item.hasDropdown ? (
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              )}

              {/* Mega Menu Dropdown */}
              {item.hasDropdown && servicesOpen && (
                <div className="absolute left-1/2 top-full mt-2 w-[720px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.12)] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-3 gap-6">
                    {megaMenuCategories.map((category) => (
                      <div key={category.title}>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">{category.title}</h3>
                        <div className="space-y-2">
                          {category.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setServicesOpen(false)}
                              className="block rounded-lg p-2 transition-colors hover:bg-slate-50"
                            >
                              <h4 className="text-sm font-medium text-slate-900">{item.title}</h4>
                              <p className="text-xs text-slate-500">{item.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center justify-between rounded-lg p-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                    >
                      <span>View all services</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          {/* Location Dropdown */}
          <div ref={locationRef} className="relative">
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="hidden md:inline">Location</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${locationOpen ? "rotate-180" : ""}`} />
            </button>
            {locationOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.12)] animate-in fade-in slide-in-from-top-2 duration-200 max-h-80 overflow-y-auto">
                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Select County
                </div>
                {locationItems.map((county) => (
                  <Link
                    key={county.slug}
                    href={`/services/${county.slug}`}
                    onClick={() => setLocationOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-50"
                  >
                    <span className="font-medium text-slate-700">{county.name}</span>
                    <span className="text-xs text-slate-400">{county.majorTown}</span>
                  </Link>
                ))}
                <Link
                  href="/services/nairobi"
                  onClick={() => setLocationOpen(false)}
                  className="mt-2 flex w-full items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  View All Locations
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/book-demo"
            className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-lg sm:inline-flex"
          >
            Book Demo
          </Link>
          <Link
            href="/contact"
            className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:inline-flex"
          >
            Contact Sales
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute inset-x-0 top-full z-40 h-screen overflow-y-auto bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-6">
            {/* AI Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>AI-Powered Business Solutions</span>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.hasDropdown ? (
                    <div className="space-y-2">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-slate-900"
                      >
                        {item.label}
                      </Link>
                      <div className="ml-3 space-y-1 border-l-2 border-slate-100 pl-3">
                        {megaMenuCategories.flatMap((cat) => cat.items).map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setIsOpen(false)}
                            className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:text-blue-600"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                        isActive(item.href)
                          ? "bg-slate-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Location Selector */}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Select Location
              </div>
              <div className="grid grid-cols-2 gap-2">
                {locationItems.slice(0, 10).map((county) => (
                  <Link
                    key={county.slug}
                    href={`/services/${county.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  >
                    {county.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/services/nairobi"
                onClick={() => setIsOpen(false)}
                className="mt-2 block rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-slate-50"
              >
                View All Locations →
              </Link>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6 space-y-3">
              <Link
                href="/book-demo"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Book Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-base font-medium text-slate-700"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
