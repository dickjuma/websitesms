import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export function ServicesPageHero() {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className="bg-slate-900"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          {/* Section badge */}
          <div className="mb-6 inline-flex rounded-full border border-slate-700 bg-slate-800 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Our Services
            </span>
          </div>

          {/* Main heading */}
          <h1
            id="services-hero-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            We Design and Build{" "}
            <span className="text-blue-400">Scalable Digital Systems</span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            From web applications and mobile experiences to enterprise systems
            and AI solutions. We deliver production‑grade technology with
            clarity and precision – tailored for Kenyan businesses.
          </p>

          {/* CTA buttons */}
          <div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            role="group"
            aria-label="Call to action buttons"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Start your project – free consultation"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-transparent px-6 py-3 text-base font-semibold text-slate-200 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Book a demo of our systems"
            >
              Book Demo
            </Link>
          </div>

          {/* Trust indicators – semantic list */}
          <ul
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
            aria-label="Trust indicators"
          >
            <li className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
              <span>400+ projects delivered</span>
            </li>
            <li
              className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block"
              aria-hidden="true"
            />
            <li className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
              <span>98% client satisfaction</span>
            </li>
            <li
              className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block"
              aria-hidden="true"
            />
            <li className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
              <span>24/7 support available</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
