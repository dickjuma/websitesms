import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Clock, Star, TrendingUp } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
        {/* Subtle grid pattern (kept for texture, no gradient) */}
        <div
          className="absolute inset-0 opacity-5"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative flex flex-col gap-8 px-6 py-10 md:gap-12 md:px-8 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-20">
          {/* Left content */}
          <div className="max-w-2xl space-y-5 md:space-y-6">
            {/* Badge - flat, no backdrop blur */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/20 px-3 py-1.5 md:px-4">
              <Shield className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Enterprise‑Ready Partnership
              </span>
            </div>

            {/* Main heading with relevant keywords */}
            <h2
              id="final-cta-heading"
              className="text-2xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl"
            >
              Accelerate Your Digital Transformation in Kenya
            </h2>

            <p className="text-base leading-relaxed text-blue-100 md:text-lg">
              From concept to deployment, we deliver enterprise‑grade web apps, mobile platforms,
              ERP & CRM systems, and AI solutions tailored for Kenyan businesses. Let&apos;s
              architect your next competitive advantage.
            </p>

            {/* Feature list - semantic list */}
            <ul className="grid gap-3 pt-3 sm:grid-cols-2 md:gap-4 md:pt-4">
              {[
                { text: "30‑min strategy & scoping call", icon: Clock },
                { text: "Custom enterprise‑grade roadmap", icon: TrendingUp },
                { text: "Transparent ROI & KPIs dashboard", icon: Star },
                { text: "Dedicated solution architect", icon: Shield },
              ].map(({ text, icon: Icon }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-500/20 p-1">
                    <Icon className="h-4 w-4 text-blue-300" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-blue-50">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 pt-3 sm:flex-row md:gap-4 md:pt-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-md transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 md:px-8 md:py-4"
                aria-label="Schedule enterprise consultation – free 30‑min call"
              >
                Schedule Enterprise Consultation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400/40 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 md:px-8 md:py-4"
                aria-label="View enterprise case studies from Kenyan clients"
              >
                View Enterprise Case Studies
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>

            {/* Trust indicators - semantic list */}
            <ul className="flex flex-wrap items-center gap-4 pt-3 text-sm text-blue-200 md:gap-6 md:pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
                <span>98% client retention</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
                <span>24/7 enterprise SLA</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" aria-hidden="true" />
                <span> certified</span>
              </li>
            </ul>
          </div>

          {/* Right decorative panel - simplified, semantic */}
          <div className="hidden lg:block lg:w-96" aria-hidden="true">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-1">
              <div className="rounded-xl bg-white/5 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="font-mono text-xs text-blue-200">enterprise.sma.ai</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-2 w-3/4 rounded-full bg-white/20" />
                  <div className="h-2 w-1/2 rounded-full bg-white/20" />
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="h-16 rounded-lg bg-white/10" />
                    <div className="h-16 rounded-lg bg-white/10" />
                  </div>
                  <div className="mt-2 h-24 rounded-lg bg-white/10" />
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="h-6 w-16 rounded-full bg-blue-500/30" />
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-blue-300">
              Live dashboard preview — real-time analytics
            </p>
          </div>
        </div>

        {/* Footer contact bar - semantic address */}
        <div className="relative border-t border-white/10 px-6 py-3 text-center text-sm text-blue-200 sm:flex sm:items-center sm:justify-between sm:text-left md:px-8 lg:px-12">
          <span>Questions? Our enterprise team is ready to help.</span>
          <address className="mt-2 inline-block not-italic sm:mt-0">
            <a
              href="mailto:enterprise@smassystems.com"
              className="font-semibold text-white underline hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Email our enterprise team at enterprise@smassystems.com"
            >
              info@smassystems.com
            </a>
          </address>
        </div>
      </div>
    </section>
  );
}
