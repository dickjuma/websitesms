"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { QuickContactModal } from "@/components/forms/quick-contact-modal";
import { serviceItems } from "@/lib/site-data";

const navLinks = [
  { label: "Home", href: "/site" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceDropdownItems = serviceItems;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname || "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  const getNavLinkClassName = (href: string) =>
    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
      isActiveLink(href)
        ? "bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)]"
        : "text-slate-700 hover:bg-slate-100 hover:text-blue-700"
    }`;

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/50 bg-white/95 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-white/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4">
          <Logo size="md" />

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/90 p-1.5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              {navLinks.map((link) => {
                if (!link.hasDropdown) {
                  return (
                    <Link key={link.href} href={link.href} className={getNavLinkClassName(link.href)}>
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setDesktopServicesOpen(true)}
                    onMouseLeave={() => setDesktopServicesOpen(false)}
                    onFocusCapture={() => setDesktopServicesOpen(true)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setDesktopServicesOpen(false);
                      }
                    }}
                  >
                    <Link href={link.href} className={getNavLinkClassName(link.href)} aria-expanded={desktopServicesOpen}>
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          desktopServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <div
                      className={`absolute left-0 top-[calc(100%+0.35rem)] w-72 transition-all duration-200 ${
                        desktopServicesOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-2 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-2 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
                        <div className="max-h-[28rem] space-y-1 overflow-y-auto">
                          <Link
                            href="/services"
                            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 hover:text-blue-700"
                          >
                            All Services
                          </Link>
                          {serviceDropdownItems.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/book-demo"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-[0_16px_40px_rgba(37,99,235,0.3)]"
            >
              Book Demo
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-slate-200 bg-white/85 pb-4 backdrop-blur-sm lg:hidden">
            <div className="space-y-2 px-2 pt-4">
              {navLinks.map((link) => {
                if (!link.hasDropdown) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        isActiveLink(link.href)
                          ? "bg-slate-950 text-white"
                          : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      <span>{link.label}</span>
                    </Link>
                  );
                }

                return (
                  <div key={link.href} className="rounded-[1.6rem] border border-slate-200 bg-white p-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={link.href}
                        className={`flex-1 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                          isActiveLink(link.href)
                            ? "bg-slate-950 text-white"
                            : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        Services Overview
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="inline-flex items-center justify-center rounded-2xl p-3 text-slate-700 transition hover:bg-slate-100"
                        aria-expanded={mobileServicesOpen}
                        aria-label="Toggle services links"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="mt-2 space-y-2 rounded-[1.4rem] bg-slate-50 p-2">
                        <Link
                          href="/services"
                          className="block rounded-2xl bg-white px-3 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50 hover:text-blue-700"
                          onClick={closeMobileMenu}
                        >
                          All Services
                        </Link>
                        {serviceDropdownItems.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block rounded-2xl bg-white px-3 py-3 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                            onClick={closeMobileMenu}
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href="/book-demo"
                onClick={closeMobileMenu}
                className="mt-4 block w-full rounded-full bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Book Demo
              </Link>
            </div>
          </div>
        )}

        <QuickContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </nav>
  );
}
