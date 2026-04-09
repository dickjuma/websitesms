import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Briefcase, LayoutDashboard, BarChart3, Users, Zap, Shield } from "lucide-react";

import logoImage from "@/public/images/logo.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#f7f1e8]">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(247,241,232,0.92)_45%,_rgba(234,225,212,0.88)_100%)]" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(28, 25, 23, 0.08) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(28, 25, 23, 0.08) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute inset-0 opacity-15 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        <div className="absolute inset-y-0 right-[-8%] hidden w-[52rem] lg:block">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.72),_transparent_65%)] blur-3xl" />
          <Image
            src={logoImage}
            alt=""
            priority
            aria-hidden="true"
            className="absolute right-0 top-1/2 h-auto w-full -translate-y-1/2 object-contain opacity-[0.09] grayscale sepia-[0.18] contrast-125 saturate-0 mix-blend-multiply"
          />
        </div>
        <div className="absolute -left-24 top-12 h-56 w-56 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#d9ccb9]/45 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
              <Zap className="h-4 w-4 text-stone-700" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-800">
                Enterprise Digital Solutions
              </span>
              <Shield className="h-3 w-3 text-stone-500" />
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-stone-950 sm:text-5xl lg:text-6xl">
              We build scalable digital systems with a grounded, business-first approach.
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-lg leading-relaxed text-stone-700 sm:text-xl">
              Enterprise-grade web applications, iOS & Android mobile platforms, intelligent ERP systems,
              CRM solutions, and custom digital ecosystems designed to feel credible, clear, and built for
              real operations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-stone-950 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-stone-800 hover:shadow-xl active:scale-[0.98]"
              >
                Start Your Project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white/80 px-8 py-4 text-base font-semibold text-stone-800 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-stone-400 hover:bg-white hover:shadow-md"
              >
                Explore Enterprise Solutions
              </Link>
            </div>

            {/* Trust Indicators - Stats Row */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-stone-200 p-1.5">
                  <Briefcase className="h-4 w-4 text-stone-800" />
                </div>
                <div>
                  <p className="text-lg font-bold text-stone-950">150+</p>
                  <p className="text-xs text-stone-600">Enterprise Clients</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-stone-200 p-1.5">
                  <CheckCircle2 className="h-4 w-4 text-stone-800" />
                </div>
                <div>
                  <p className="text-lg font-bold text-stone-950">98%</p>
                  <p className="text-xs text-stone-600">Client Retention</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-stone-200 p-1.5">
                  <Clock className="h-4 w-4 text-stone-800" />
                </div>
                <div>
                  <p className="text-lg font-bold text-stone-950">24/7</p>
                  <p className="text-xs text-stone-600">Enterprise Support</p>
                </div>
              </div>
            </div>

            {/* Trusted by Section */}
            <div className="pt-4">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap items-center gap-6 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <span className="text-sm font-medium text-stone-500">AcmeCorp</span>
                <span className="text-sm font-medium text-stone-500">GlobalTech</span>
                <span className="text-sm font-medium text-stone-500">FutureSystems</span>
                <span className="text-sm font-medium text-stone-500">Innovate Inc</span>
                <span className="text-sm font-medium text-stone-500">Nexus Dynamics</span>
              </div>
            </div>
          </div>

          {/* Right Column - Enterprise Dashboard Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Floating glow behind mockup */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full bg-white/70 blur-3xl" />
            </div>

            {/* Premium Dashboard Mockup */}
            <div className="relative w-full max-w-md transform transition-all duration-500 hover:scale-[1.02] lg:max-w-lg">
              <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white/90 shadow-2xl backdrop-blur-sm">
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/80 px-5 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-stone-200 p-0.5">
                      <LayoutDashboard className="h-full w-full text-stone-800" />
                    </div>
                    <span className="text-xs font-medium text-stone-500">Enterprise Dashboard</span>
                  </div>
                  <div className="h-5 w-5 rounded-full bg-stone-200" />
                </div>

                {/* Mockup Content */}
                <div className="p-5">
                  {/* Sidebar + Main Layout Simulation */}
                  <div className="flex gap-4">
                    {/* Mini Sidebar Icons */}
                    <div className="flex flex-col gap-3">
                      <div className="rounded-lg bg-stone-200 p-2">
                        <BarChart3 className="h-4 w-4 text-stone-800" />
                      </div>
                      <div className="rounded-lg p-2 opacity-50">
                        <Users className="h-4 w-4 text-stone-500" />
                      </div>
                      <div className="rounded-lg p-2 opacity-50">
                        <LayoutDashboard className="h-4 w-4 text-stone-500" />
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-4">
                      {/* KPI Cards */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-stone-100 bg-gradient-to-br from-white to-stone-50 p-3 shadow-sm">
                          <p className="text-xs text-stone-500">Total Revenue</p>
                          <p className="text-lg font-bold text-stone-950">$2.4M</p>
                          <div className="mt-1 flex items-center gap-1">
                            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-stone-100">
                              <div className="h-full w-3/4 rounded-full bg-stone-900" />
                            </div>
                            <span className="text-[10px] text-emerald-600">+18%</span>
                          </div>
                        </div>
                        <div className="rounded-xl border border-stone-100 bg-gradient-to-br from-white to-stone-50 p-3 shadow-sm">
                          <p className="text-xs text-stone-500">Active Users</p>
                          <p className="text-lg font-bold text-stone-950">48.2K</p>
                          <div className="mt-1 flex items-center gap-1">
                            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-stone-100">
                              <div className="h-full w-2/3 rounded-full bg-[#b08968]" />
                            </div>
                            <span className="text-[10px] text-emerald-600">+12%</span>
                          </div>
                        </div>
                      </div>

                      {/* Chart Simulation */}
                      <div className="rounded-xl border border-stone-100 bg-white p-3 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-xs font-medium text-stone-600">Monthly Growth</p>
                          <div className="flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-stone-900" />
                            <div className="h-1.5 w-1.5 rounded-full bg-stone-300" />
                          </div>
                        </div>
                        <div className="flex h-20 items-end gap-1">
                          <div className="h-8 w-full rounded-t bg-stone-200" />
                          <div className="h-12 w-full rounded-t bg-stone-300" />
                          <div className="h-16 w-full rounded-t bg-stone-400" />
                          <div className="h-10 w-full rounded-t bg-stone-300" />
                          <div className="h-14 w-full rounded-t bg-[#c3a487]" />
                          <div className="h-[4.5rem] w-full rounded-t bg-stone-800" />
                          <div className="h-12 w-full rounded-t bg-stone-500" />
                        </div>
                      </div>

                      {/* Activity Row */}
                      <div className="flex items-center justify-between rounded-xl border border-stone-100 bg-white p-3 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-green-100" />
                          <div>
                            <p className="text-xs font-medium text-stone-700">New integration</p>
                            <p className="text-[10px] text-stone-400">Salesforce sync</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-stone-700">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative badge */}
              <div className="absolute -right-3 -top-3 rounded-full bg-stone-950 px-3 py-1 shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white">
                  Live Preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
