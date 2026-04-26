import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
  ],
  services: [
    { label: "ERP Systems", href: "/services/erp-systems" },
    { label: "POS Systems", href: "/services/pos-systems" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
    { label: "Documentation", href: "/docs" },
    { label: "Status", href: "/status" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <span className="text-sm font-bold text-slate-900">S</span>
              </div>
              <span className="text-lg font-semibold">SMA Systems</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400 max-w-xs">
              Building intelligent ERP, POS, and digital solutions for businesses across East Africa and beyond.
            </p>
            <div className="mt-6 space-y-3">
              <a href="tel:+254719832719" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                <Phone className="h-4 w-4" />
                <span>+254 719 832 719</span>
              </a>
              <a href="mailto:hello@smassystems.com" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
                <Mail className="h-4 w-4" />
                <span>hello@smassystems.com</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Services</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-lg font-semibold">Ready to transform your business?</h3>
              <p className="mt-1 text-sm text-slate-400">Let&apos;s build your custom solution today.</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} SMA Systems. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>Made with care in Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
