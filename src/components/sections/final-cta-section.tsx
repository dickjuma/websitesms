import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Clock, Star, TrendingUp } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
      {/* Background with enhanced gradient and texture */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 shadow-2xl">
        {/* Subtle grid pattern for enterprise feel */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Animated glowing accents */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-12 px-8 py-16 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-20">
          {/* Left Column - Content */}
          <div className="max-w-2xl space-y-6">
            {/* Enterprise Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm">
              <Shield className="h-3.5 w-3.5 text-blue-300" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Enterprise‑Ready Partnership
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-5xl">
              Accelerate Your Digital Transformation
            </h2>

            <p className="text-lg leading-relaxed text-blue-100 sm:text-xl">
              From concept to deployment, we deliver enterprise‑grade web apps, mobile platforms,
              ERP & CRM systems, and AI solutions. Let&apos;s architect your next competitive advantage.
            </p>

            {/* Premium Benefits Grid */}
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {[
                { text: "30‑min strategy & scoping call", icon: Clock },
                { text: "Custom enterprise‑grade roadmap", icon: TrendingUp },
                { text: "Transparent ROI & KPIs dashboard", icon: Star },
                { text: "Dedicated solution architect", icon: Shield },
              ].map(({ text, icon: Icon }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-500/20 p-1">
                    <Icon className="h-4 w-4 text-blue-300" />
                  </div>
                  <span className="text-sm text-blue-50">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-900 shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Schedule Enterprise Consultation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400/40 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-600/30 hover:border-blue-300"
              >
                View Enterprise Case Studies
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>98% client retention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>24/7 enterprise SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>ISO 27001 certified</span>
              </div>
            </div>
          </div>

          {/* Right Column - Mockup / Visual (hidden on mobile) */}
          <div className="hidden lg:block lg:w-96">
            <div className="rounded-2xl bg-white/5 p-1 backdrop-blur-sm">
              <div className="rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-xs font-mono text-blue-200">enterprise.sma.ai</span>
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

        {/* Bottom contact bar */}
        <div className="relative border-t border-white/10 px-8 py-4 text-center text-sm text-blue-200 sm:flex sm:items-center sm:justify-between sm:text-left lg:px-16">
          <span>Questions? Our enterprise team is ready to help.</span>
          <a
            href="mailto:enterprise@sma-systems.com"
            className="mt-2 inline-block font-semibold text-white underline hover:text-blue-100 sm:mt-0"
          >
            enterprise@sma-systems.com
          </a>
        </div>
      </div>
    </section>
  );
}
