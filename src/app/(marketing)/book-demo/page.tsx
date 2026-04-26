"use client";
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { Calendar, Clock, Users, CheckCircle2, Briefcase } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { BookDemoForm } from "@/components/forms/book-demo-form";

const demoFAQ = [
  {
    question: "How long is the demo?",
    answer: "Our standard demo is 30-45 minutes. We'll focus on the areas most relevant to your business and answer all your questions.",
  },
  {
    question: "What should I prepare?",
    answer: "Have your team members join if possible! It's helpful to have someone from operations, IT, and management. You can share any current workflows or pain points you want us to address.",
  },
  {
    question: "What platforms do you support?",
    answer: "We work across web, mobile, cloud, and enterprise systems. Whether you need a custom platform, SaaS solution, or internal system, we can show you relevant examples.",
  },
  {
    question: "Is there a cost for the demo?",
    answer: "No, the demo is completely free. It's our way of understanding your needs and showing you how we work.",
  },
  {
    question: "What happens after the demo?",
    answer: "We'll send a summary of the discussion and a custom proposal within 48 hours if there's a fit. There's no pressure—we only move forward if it makes sense for both sides.",
  },
  {
    question: "Can we reschedule?",
    answer: "Absolutely. If something comes up, just reply to the confirmation email or contact us at least 24 hours before your slot.",
  },
];

const benefits = [
  {
    icon: Briefcase,
    title: "See Real Work",
    description: "We'll show you actual examples from projects similar to yours, not generic features.",
  },
  {
    icon: Users,
    title: "Talk to Leadership",
    description: "You'll speak directly with our delivery leads, not sales reps. They'll answer technical questions.",
  },
  {
    icon: Clock,
    title: "Learn Your Timeline",
    description: "We discuss realistic timelines, costs, and what's actually involved in your type of project.",
  },
  {
    icon: CheckCircle2,
    title: "Clear Next Steps",
    description: "Whether you move forward or not, you'll know exactly what's involved and what comes next.",
  },
];

export default function BookDemoPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <SiteShell>
      <main className="bg-white">
        {/* Hero Section – flat, solid */}
        <section aria-labelledby="demo-hero-title" className="border-b border-slate-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
            <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700">
              Book Your Personalized Demo
            </p>
            <h1 id="demo-hero-title" className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              See how we deliver
              <span className="block mt-2 text-blue-700">systems that work</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              30-45 minute call with our delivery team. We'll match your use case to real examples and answer every question.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
          {!submitSuccess ? (
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              {/* Left: Benefits */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">What You'll Get</p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">This isn't a pitch</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    It's a real conversation about your challenges and our approach to solving them.
                  </p>
                </div>

                <ul className="space-y-3">
                  {benefits.map((benefit) => {
                    const Icon = benefit.icon;
                    return (
                      <li key={benefit.title}>
                        <div className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                            <p className="mt-1 text-sm text-slate-600">{benefit.description}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Tip box */}
                <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-700">💡 Tip</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Bring your team if possible. Having stakeholders from operations, tech, and leadership makes the conversation richer.
                  </p>
                </aside>
              </div>

              {/* Right: Form */}
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-xl font-bold text-slate-950 md:text-2xl">Schedule Your Demo</h2>
                <p className="mt-2 text-sm text-slate-600">Fill out the form below and we'll confirm your time slot within hours.</p>
                <div className="mt-6">
                  <BookDemoForm onSuccess={() => setSubmitSuccess(true)} />
                </div>
              </div>
            </div>
          ) : (
            // Success State – flat, solid
            <div className="mx-auto max-w-2xl rounded-lg border border-green-200 bg-green-50 p-8 text-center md:p-12">
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-7 w-7 text-green-700" aria-hidden="true" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-950 md:text-3xl">Demo Scheduled!</h2>
              <p className="mt-3 text-sm text-slate-600">
                Check your email for confirmation and calendar details. We'll send you a Zoom link 15 minutes before the call.
              </p>
              <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 text-left">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Have questions before the call?</span> Reply to your confirmation email and we'll get back to you.
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Need to reschedule?</span> Click the reschedule link in your email.
                </p>
              </div>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-6 inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Schedule Another Demo
              </button>
            </div>
          )}
        </div>

        {/* FAQ Section – flat, semantic */}
        <section aria-labelledby="faq-heading" className="border-t border-slate-200 bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Common Questions</p>
              <h2 id="faq-heading" className="mt-3 text-2xl font-bold text-slate-950 md:text-3xl">Demo FAQs</h2>
            </div>

            <ul className="mt-10 space-y-3">
              {demoFAQ.map((faq, index) => (
                <li key={index}>
                  <details className="group rounded-lg border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
                      {faq.question}
                      <span className="transition group-open:rotate-180" aria-hidden="true">
                        <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA – flat */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950 md:text-3xl">Still deciding?</h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base">
              Explore our services and pricing first, or read customer stories to see how we deliver.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                View Services
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                See Pricing
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Read Portfolio
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
