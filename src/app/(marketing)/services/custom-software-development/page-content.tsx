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
import { customSoftwareContent as content } from "../_content";

import {
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Layout,
  Lock,
  Rocket,
  Server,
  Smartphone,
  Zap,
  ShieldCheck,
  ArrowRight,
  Terminal,
  Workflow
} from "lucide-react";

export function CustomSoftwareDevelopmentContent() {
  return (
    <>
      {/* Hero Section */}
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Start a Project"
        stats={[
          { label: "Engineering", value: "Clean Architecture" },
          { label: "Delivery", value: "Agile Sprints" },
          { label: "Future", value: "Cloud Native" },
        ]}
      />

      {/* Primary Visuals Section - High Impact Start */}
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

          {/* System Architecture & Tech Flow Mockups */}
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Scalable System Architecture</h2>
              <p className="text-xl text-slate-600">Visualizing the robust foundation we build for your business</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Visual: API & Microservices Flow */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all hover:scale-[1.02]">
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-slate-300 text-sm ml-2 font-mono">Backend Infrastructure</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <Globe className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">API Gateway</p>
                        <p className="text-xs text-slate-500">Authentication & Rate Limiting</p>
                      </div>
                    </div>
                    <div className="flex justify-center py-2">
                      <div className="h-8 w-px bg-slate-200 dashed"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                        <p className="text-xs font-bold">User Service</p>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-blue-500 w-[70%]"></div>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                        <p className="text-xs font-bold">Billing Engine</p>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-green-500 w-[45%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Visual: Performance Metrics */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all hover:scale-[1.02]">
                <div className="bg-slate-800 px-4 py-3">
                  <span className="text-slate-300 text-sm font-mono">Performance Monitoring</span>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Latency</span>
                        <span className="text-green-600 font-bold">124ms</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>System Uptime</span>
                        <span className="text-blue-600 font-bold">99.99%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "99%" }}></div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <div className="flex-1 h-12 bg-slate-50 rounded border border-slate-100 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="flex-1 h-12 bg-slate-50 rounded border border-slate-100 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex-1 h-12 bg-slate-50 rounded border border-slate-100 flex items-center justify-center">
                          <Server className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ServiceSection>

      {/* Explanatory Content Section */}
      <ServiceSection className="py-18">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <ActionCard
              title="Built for the long term, not just the launch"
              description="Custom software should adapt as your business grows. We focus on maintainable codebases and scalable infrastructure that prevents technical debt from slowing you down."
            />
            <BulletPanel
              title="Development Focus"
              description="Key areas we prioritize during the build phase."
              items={content.considerations}
            />
          </div>
          <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="The Build"
              title={content.summary}
              description="Our approach combines modern technology with industry best practices to deliver software that is secure, fast, and user-centric."
            />
            <div className="mt-8">
              <HighlightRibbon items={content.highlights} />
            </div>
          </div>
        </div>
      </ServiceSection>

      {/* Capabilities & Outcomes */}
      <ServiceSection className="py-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
          <BulletPanel
            title="Core Capabilities"
            description="From complex backends to intuitive frontends."
            items={content.capabilities}
          />
          <BulletPanel
            title="Business Outcomes"
            description="The tangible results of a custom build."
            items={content.outcomes}
            variant="blue"
          />
        </div>
      </ServiceSection>

      {/* Process Timeline */}
      <ServiceSection className="py-8">
        <div className="max-w-4xl mx-auto rounded-[2rem] border border-slate-200 bg-slate-50 p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 text-center">Development Lifecycle</p>
          <div className="mt-10">
            <StepsTimeline steps={content.steps} />
          </div>
        </div>
      </ServiceSection>

      {/* Technology Stack */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Technology Stack</h2>
          <p className="text-xl text-slate-600">We use the best tools for the job</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
          <TechItem name="React / Next.js" icon={Layout} />
          <TechItem name="Node.js" icon={Server} />
          <TechItem name="TypeScript" icon={Terminal} />
          <TechItem name="PostgreSQL" icon={Database} />
          <TechItem name="AWS / Azure" icon={Cpu} />
          <TechItem name="Docker" icon={Layers} />
        </div>
      </ServiceSection>

      {/* Testimonials */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Client Stories</h2>
          <p className="text-xl text-slate-600">Partnerships that drive innovation</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Robert Chen"
            role="CEO, Logistics Global"
            content="They transformed our manual tracking into a fully automated system that reduced errors by 60% in the first quarter."
            rating={5}
          />
          <TestimonialCard
            name="Elena Rodriguez"
            role="CTO, EduTech Hub"
            content="The scalability of the platform they built is incredible. We went from 1,000 to 50,000 users without a single hitch."
            rating={5}
          />
          <TestimonialCard
            name="Marcus Thorne"
            role="Product Owner, RetailX"
            content="A true engineering partner. They didn't just write code; they helped us define the product vision."
            rating={5}
          />
        </div>
      </ServiceSection>

      {/* FAQ */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Questions</h2>
          <p className="text-xl text-slate-600">Everything you need to know about our process</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
          <FAQItem question="How long does a typical build take?" answer="A typical MVP build ranges from 3 to 5 months, depending on complexity and integration requirements." />
          <FAQItem question="Do you provide ongoing maintenance?" answer="Yes, we offer flexible support packages for security updates, feature additions, and performance monitoring." />
          <FAQItem question="Will I own the source code?" answer="Absolutely. Upon project completion and final payment, full ownership of the intellectual property and code is transferred to you." />
        </div>
      </ServiceSection>

      {/* CTA */}
      <ServiceSection className="py-12 pb-24">
        <BookDemoCTA
          title="Ready to Build Your Custom Solution?"
          description="Schedule a technical discovery session with our engineering lead."
          primaryLabel="Start Discovery"
          secondaryLabel="View Case Studies"
        />
      </ServiceSection>

      {/* Related Links */}
      <ServiceSection className="py-8 pb-24">
        <RelatedLinks links={content.relatedLinks} />
      </ServiceSection>
    </>
  );
}