"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

const navItems = [
  { 
    label: "Services", 
    href: "/services",
    hasDropdown: true,
    description: "Enterprise software solutions"
  },
  { 
    label: "Pricing", 
    href: "/pricing",
    description: "Flexible plans for every scale"
  },
  { 
    label: "Quote", 
    href: "/quote",
    description: "Get a custom quote"
  },
  { 
    label: "About", 
    href: "/about",
    description: "Learn about us"
  },
  { 
    label: "Resources", 
    href: "/blog",
    description: "Insights and guides"
  },
  { 
    label: "Careers", 
    href: "/careers",
    description: "Join our growing team"
  },
  { 
    label: "Contact", 
    href: "/contact",
    description: "Get in touch"
  },
];

const serviceCategories = [
  {
    title: "ERP Systems",
    href: "/services/erp-systems",
  },
  {
    title: "POS Systems",
    href: "/services/pos-systems",
  },
  {
    title: "Web Development",
    href: "/services/web-development",
  },
  {
    title: "Mobile Apps",
    href: "/services/mobile-app-development",
  },
  {
    title: "E-commerce",
    href: "/services/ecommerce-solutions",
  },
  {
    title: "School Management",
    href: "/services/school-management",
  },
  {
    title: "Hotel Management",
    href: "/services/hotel-management",
  },
  {
    title: "Inventory Systems",
    href: "/services/inventory-systems",
  },
];

const topServices = serviceCategories.slice(0, 6);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
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
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 border-b border-slate-200/60 backdrop-blur-xl shadow-sm"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo size="sm" />

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
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-blue-600"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    suppressHydrationWarning
                  >
                    {item.label}
                  </Link>
                )}

                {item.hasDropdown && servicesOpen && (
                  <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)] animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                    >
                      <span>All Services</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <div className="border-t border-slate-100 pt-2 mt-2">
                      {topServices.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => setServicesOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

<div className="flex items-center gap-1">
          {/* WhatsApp */}
          <a
            href="https://wa.me/254719832719"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-slate-600 hover:text-green-600"
            aria-label="WhatsApp"
          >
            <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5" />
          </a>
          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61582302083133"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-slate-600 hover:text-blue-700"
            aria-label="Facebook"
          >
            <img src="/facebook.png" alt="Facebook" className="h-5 w-5" />
          </a>
          {/* TikTok */}
          <a
            href="https://vm.tiktok.com/ZS9LwsULmtmpR-OIq75/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-slate-600 hover:text-black"
            aria-label="TikTok"
          >
            <img src="/tik-tok.png" alt="TikTok" className="h-5 w-5" />
          </a>

          <Link
            href="/kenya"
            className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/kenya")
                ? "text-blue-600"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden md:inline">Locations</span>
          </Link>
          <Link
            href="/book-demo"
            className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/25 sm:inline-flex"
          >
            Book Demo
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

      {isOpen && (
        <div className="absolute inset-x-0 top-full z-40 h-[calc(100vh-4rem)] overflow-y-auto bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-6">
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
                        {serviceCategories.map((service) => (
                          <Link
                          key={service.href}
                          href={service.href}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:text-blue-600"
                          suppressHydrationWarning
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

            {/* Mobile Locations Link */}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <Link
                href="/kenya"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-slate-600 hover:bg-slate-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Locations
              </Link>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <Link
                href="/book-demo"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Book Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4 flex justify-center gap-6 text-sm text-slate-500">
              <Link href="/about" className="hover:text-slate-900">About</Link>
              <Link href="/portfolio" className="hover:text-slate-900">Portfolio</Link>
              <Link href="/process" className="hover:text-slate-900">Process</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
