"use client";

import { FAQItem } from "../_components/service-interactive";

import {
  ActionCard,
  BookDemoCTA,
  BulletPanel,
  HighlightRibbon,
  ImageFrame,
  RelatedLinks,
  SectionHeading,
  ServiceHero,
  ServiceSection,
  StepsTimeline,
  TechItem,
  TestimonialCard,
} from "../_components/service-primitives";
import { qaTestingContent as content } from "../_content";

// Custom icons for the page
import {
  Bug,
  Play,
  Shield,
  Zap,
  Clock,
  Award,
  Users,
  BarChart,
  FileCheck,
  GitBranch,
  Globe,
  ArrowRight,
} from "lucide-react";

export function QaSoftwareTestingContent() {
  return (
    <>
      {/* Hero Section */}
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Set Up QA Support"
        stats={[
          { label: "Focus", value: "Release confidence" },
          { label: "Need", value: "Risk-based coverage" },
          { label: "Result", value: "Clearer sign-off" },
        ]}
      />

      {/* Primary Visuals Section - Moved to the start for immediate impact */}
      <ServiceSection className="pt-12 pb-8">
        <div className="space-y-16">
          {/* Main Visual Representation */}
          <div className="max-w-5xl mx-auto w-full">
            <ImageFrame 
              src={content.imageSrc} 
              alt={content.imageAlt} 
              aspectClassName="aspect-[16/9] md:aspect-[21/9]" 
            />
          </div>

          {/* Real-Time Quality Dashboard Mockups */}
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Real-Time Quality Dashboard</h2>
              <p className="text-xl text-slate-600">Visual tracking of coverage, defects, and release readiness</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all hover:scale-[1.02]">
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-slate-300 text-sm ml-2 font-mono">Test Execution Summary</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">247</p>
                      <p className="text-sm text-slate-500">Passed</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">12</p>
                      <p className="text-sm text-slate-500">Failed</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-2 text-sm">
                      <span>✅ Login flow</span>
                      <span className="text-green-600">Passed</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2 text-sm">
                      <span>❌ Checkout (discount)</span>
                      <span className="text-red-600">Failed</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2 text-sm">
                      <span>⏳ API load test</span>
                      <span className="text-yellow-600">Running</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all hover:scale-[1.02]">
                <div className="bg-slate-800 px-4 py-3">
                  <span className="text-slate-300 text-sm font-mono">Coverage Map</span>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Functional coverage</span>
                      <span>86%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "86%" }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Automation coverage</span>
                      <span>63%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "63%" }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Critical path coverage</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ServiceSection>

      {/* Explanatory Content Section */}

      {/* Problem vs Solution (using ActionCard + BulletPanel) */}
      <ServiceSection className="py-18">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <ActionCard
              title="Best when release quality needs a clearer owner and process"
              description="QA support becomes especially valuable when teams are shipping important workflows and need stronger clarity about what was tested and what still needs attention."
            />
            <BulletPanel
              title="Risk checkpoints"
              description="These questions help define the most valuable QA coverage for the release schedule."
              items={content.considerations}
            />
          </div>
          <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="QA Route"
              title={content.summary}
              description="This route is structured around risk, repeatability, reporting clarity, and the release habits that help teams ship more safely."
            />
            <div className="mt-8">
              <HighlightRibbon items={content.highlights} />
            </div>
          </div>
        </div>
      </ServiceSection>

      {/* Services/Features - using custom grid (not in primitives) */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Testing Services We Provide</h2>
          <p className="text-xl text-slate-600">Coverage for every layer of your application</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <FileCheck className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Manual & Exploratory</h3>
            <p className="text-slate-600">Scenario planning, usability testing, and edge case discovery.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <Play className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Test Automation</h3>
            <p className="text-slate-600">Selenium, Cypress, Playwright — regression suites that run on every commit.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <Zap className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Performance & Load</h3>
            <p className="text-slate-600">JMeter, k6 — stress testing, bottlenecks, and scalability validation.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <Shield className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Security & Compliance</h3>
            <p className="text-slate-600">OWASP checks, penetration testing, and compliance validation.</p>
          </div>
        </div>
      </ServiceSection>

      {/* Testing Coverage & Outcomes (using BulletPanel) */}
      <ServiceSection className="pb-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
          <BulletPanel
            title="Testing coverage"
            description="The work can cover manual passes, scenario planning, defect logging, and retest support."
            items={content.capabilities}
          />
          <BulletPanel
            title="QA outcomes"
            description="The value is better release clarity and fewer surprises in the most important workflows."
            items={content.outcomes}
            variant="blue"
          />
        </div>
      </ServiceSection>

      {/* QA Process Timeline (using StepsTimeline) */}
      <ServiceSection className="py-8">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-slate-200 bg-slate-50 p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 text-center">QA rhythm</p>
          <div className="mt-10">
            <StepsTimeline steps={content.steps} />
          </div>
        </div>
      </ServiceSection>

      {/* Why Choose Us */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Teams Trust Our QA</h2>
          <p className="text-xl text-slate-600">Proven processes, measurable results</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Bug, title: "40% Fewer Escapes", desc: "Defects caught before production" },
            { icon: Clock, title: "50% Faster Regression", desc: "Automated suites + parallel execution" },
            { icon: Award, title: "Release Confidence", desc: "Risk-based sign-off & metrics" },
            { icon: Users, title: "Dedicated QA Leads", desc: "ISTQB certified engineers" },
          ].map((item) => (
            <div key={item.title} className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </ServiceSection>

      {/* Technology Stack */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Modern Testing Toolchain</h2>
          <p className="text-xl text-slate-600">Industry-leading tools for every testing need</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
          <TechItem name="Selenium" icon={Globe} />
          <TechItem name="Cypress" icon={Play} />
          <TechItem name="Jest" icon={Bug} />
          <TechItem name="Postman" icon={GitBranch} />
          <TechItem name="JMeter" icon={BarChart} />
          <TechItem name="TestRail" icon={FileCheck} />
        </div>
      </ServiceSection>

      {/* Testimonials */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Loved by Engineering Leaders</h2>
          <p className="text-xl text-slate-600">Real feedback from our QA partners</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Sarah Jenkins"
            role="VP of Engineering, FinTech"
            content="Their QA team caught a critical payment bug that would have cost us millions. Now we never ship without them."
            rating={5}
          />
          <TestimonialCard
            name="David Park"
            role="CTO, HealthTech"
            content="Automated regression suite runs in 12 minutes instead of 3 days. Release cycles are now weekly and stress-free."
            rating={5}
          />
          <TestimonialCard
            name="Maria Gonzalez"
            role="Product Director, E-commerce"
            content="They don't just find bugs — they help us build better testable features from the start. Invaluable partner."
            rating={5}
          />
        </div>
      </ServiceSection>

      {/* FAQ Section */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600">Everything about our QA & testing services</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
          <FAQItem question="How do you determine what to test?" answer="We use risk-based testing: critical paths, high-traffic features, and areas with frequent changes get priority." />
          <FAQItem question="Do you write test automation from scratch?" answer="Yes, we build maintainable automation frameworks (Cypress, Playwright, Selenium) that integrate with your CI/CD." />
          <FAQItem question="Can you work with our existing test suite?" answer="Absolutely. We review, refactor, and extend your current tests to improve coverage and reliability." />
          <FAQItem question="What about performance testing?" answer="We simulate real-world load, identify bottlenecks, and provide actionable reports to optimize." />
          <FAQItem question="Do you offer QA training for internal teams?" answer="Yes, we provide workshops on test design, automation, and QA best practices." />
        </div>
      </ServiceSection>

      {/* Final Call-to-Action */}
      <ServiceSection className="py-12 pb-12">
        <BookDemoCTA
          title="Ready to Ship with Confidence?"
          description="Get a free QA maturity assessment and test strategy review."
          primaryLabel="Start a QA Audit"
          secondaryLabel="Download QA Checklist"
        />
      </ServiceSection>

      {/* Related Links (original) */}
      <ServiceSection className="py-8 pb-24">
        <RelatedLinks links={content.relatedLinks} />
      </ServiceSection>
    </>
  );
}
