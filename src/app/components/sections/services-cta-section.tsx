import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export function ServicesCTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0f172a,#1e40af,#0369a1)] px-4 py-8 shadow-2xl shadow-blue-900/20 sm:px-6 lg:px-12 md:py-12">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-200 md:mb-4">
            Ready to Get Started?
          </p>

          <h2
            id="cta-heading"
            className="text-2xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl"
          >
            Let Us Build Your Next System
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-100 md:mt-6 md:text-lg">
            Whether you need a website, mobile app, ERP system, or AI solution,
            we have the expertise to deliver. Schedule a free consultation to
            discuss your vision.
          </p>

          {/* Grouped CTA buttons for better semantics */}
          <div
            className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-10 md:gap-4"
            role="group"
            aria-label="Call to action buttons"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-base font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50 md:px-8 md:py-4"
              aria-label="Start your project – free consultation"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-300 bg-transparent px-6 py-3 text-base font-semibold text-blue-100 transition hover:bg-blue-600/50 md:px-8 md:py-4"
              aria-label="Learn about our development process"
            >
              Learn Our Process
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          {/* Contact info with enhanced microdata */}
          <address
            className="mt-6 not-italic md:mt-8"
            aria-label="Contact information for SMA Systems"
          >
            <p className="text-sm text-blue-200">
              Questions? Our team is ready to help.{" "}
              <a
                href="mailto:info@smassystems.com"
                className="inline-flex items-center gap-1 font-semibold text-white underline hover:text-blue-100"
                aria-label="Email us at info@smassystems.com"
                rel="noopener noreferrer"
                itemProp="email"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                info@smassystems.com
              </a>{" "}
              or chat with our AI assistant.
            </p>
          </address>
        </div>
      </div>
    </section>
  );
}
