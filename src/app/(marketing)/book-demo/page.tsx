"use client";

import { useState } from "react";
import { Calendar, Clock, Users, CheckCircle2, Briefcase } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { BookDemoForm } from "@/components/forms/book-demo-form";

const timeSlots = [
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "4:00 PM", available: true },
];

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
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white pt-20 pb-12 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-cyan-100/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            Book Your Personalized Demo
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-[-0.06em] text-slate-950 sm:text-6xl">
            See how we deliver
            <span className="block mt-2 text-blue-700">systems that work</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            30-45 minute call with our delivery team. We'll match your use case to real examples and answer every question.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {!submitSuccess ? (
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            {/* Left: Benefits */}
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">What You'll Get</p>
                <h2 className="mt-4 text-3xl font-bold text-slate-950">This isn't a pitch</h2>
                <p className="mt-2 text-slate-600">
                  It's a real conversation about your challenges and our approach to solving them.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Proof */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-700">💡 Tip</p>
                <p className="mt-2 text-sm text-slate-600">
                  Bring your team if possible. Having stakeholders from operations, tech, and leadership makes the conversation richer.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-bold text-slate-950">Schedule Your Demo</h2>
              <p className="mt-2 text-sm text-slate-600">Fill out the form below and we'll confirm your time slot within hours.</p>

              <BookDemoForm 
                onSuccess={() => setSubmitSuccess(true)}
              />
            </div>
          </div>
        ) : (
          // Success State
          <div className="mx-auto max-w-2xl rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">Demo Scheduled!</h2>
            <p className="mt-4 text-lg text-slate-600">
              Check your email for confirmation and calendar details. We'll send you a Zoom link 15 minutes before the call.
            </p>
            <div className="mt-8 space-y-3 rounded-xl bg-white p-6 border border-slate-200">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Have questions before the call?</span> Reply to your confirmation email and we'll get back to you.
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Need to reschedule?</span> Click the reschedule link in your email.
              </p>
            </div>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="mt-8 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Schedule Another Demo
            </button>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <section className="border-t border-slate-200 bg-slate-50/50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">Common Questions</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Demo FAQs</h2>
          </div>

          <div className="space-y-4">
            {demoFAQ.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-950">Still deciding?</h2>
          <p className="mt-4 text-lg text-slate-600">
            Explore our services and pricing first, or read customer stories to see how we deliver.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/services"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              View Services
            </a>
            <a
              href="/pricing"
              className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              See Pricing
            </a>
            <a
              href="/portfolio"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Read Portfolio
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
