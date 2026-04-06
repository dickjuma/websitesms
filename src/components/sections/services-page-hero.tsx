import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServicesPageHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_50%,#0369a1_100%)]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400 to-transparent opacity-20 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tr from-cyan-400 to-transparent opacity-15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-300/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
              Our Services
            </span>
          </div>

          <h1 className="text-6xl font-bold leading-tight tracking-tight text-white sm:text-7xl">
            We Design and Build <span className="text-blue-300">Scalable Digital Systems</span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-blue-100">
            From web applications and mobile experiences to enterprise systems and AI solutions. 
            We deliver production-grade technology with clarity and precision.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-blue-900 shadow-lg shadow-blue-500/20 transition hover:bg-blue-50"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#faq"
              className="inline-flex items-center justify-center rounded-2xl border border-blue-300/50 bg-transparent px-8 py-4 text-base font-semibold text-blue-100 transition hover:bg-blue-600/50"
            >
              Book Demo
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-400" />
              <span>400+ projects delivered</span>
            </div>
            <div className="hidden h-1 w-1 rounded-full bg-blue-400 sm:block" />
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-400" />
              <span>98% client satisfaction</span>
            </div>
            <div className="hidden h-1 w-1 rounded-full bg-blue-400 sm:block" />
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-400" />
              <span>24/7 support available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
