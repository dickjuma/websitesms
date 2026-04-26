'use client';

import React from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export function HeroSection({
  title = "Intelligent Software Solutions for Business",
  subtitle = "We build enterprise-grade ERP, POS, and custom digital platforms that scale with your ambitions."
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-24 lg:pt-32 lg:pb-40 border-b border-gray-100">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] left-[50%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-50/50 to-transparent opacity-50 blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-full w-full opacity-[0.03] [background-image:radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* New Feature Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="flex items-center gap-1">
                <Sparkles size={14} /> New: AI-Driven ERP Modules
              </span>
            </div>

          {/* Brand Logo/Identity */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white shadow-lg">
                <Layers size={22} />
              </div>
              <div className="text-xl font-bold tracking-tight text-gray-900 uppercase">
                SMA <span className="text-blue-600">Systems</span>
              </div>
            </div>

            {/* Main Content */}
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.1]">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i >= 1 && i <= 2 ? 'text-blue-600' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            <p className="mt-8 text-lg sm:text-xl leading-8 text-slate-600 max-w-2xl">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
              >
                Get Started <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition-all"
              >
                Explore Solutions
              </Link>
            </div>
          </div>

          {/* Visual Element / Right Side */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative aspect-square w-full max-w-[450px] ml-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-3xl rotate-6 opacity-10 animate-pulse" />
              <div className="absolute inset-0 bg-white border border-slate-200 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <Layers size={32} />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-32 bg-slate-100 rounded-full mx-auto" />
                    <div className="h-2 w-24 bg-slate-100 rounded-full mx-auto" />
                  </div>
                </div>
                {/* Decorative UI elements */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-50 rounded-full -ml-8 -mb-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
