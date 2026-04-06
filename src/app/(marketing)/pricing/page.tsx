"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Clock, Users, Zap, Shield, Database, BarChart3, Smartphone, Globe, Server, Lock, PenTool, Briefcase, DollarSign, TrendingUp } from "lucide-react";
import { SiteShell, SectionIntro } from "@/components/layout/site-shell";
import { QuoteForm } from "@/components/forms/quote-form";
import { pricingFAQ as importedFAQ, servicePricingData as importedPricingData } from "@/lib/site-data";

// ------------------------------------------------------------------
// MARKET RESEARCH DATA - Kenya Market Rates 2025/2026
// Based on local agency surveys, competitor analysis, and cost of talent
// ------------------------------------------------------------------

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

// Comprehensive service pricing with market-aligned tiers
const marketPricingData = [
  {
    service: "Website Development",
    icon: Globe,
    description: "From corporate brochures to high-traffic e-commerce platforms",
    tiers: [
      { name: "Starter", price: 85000, desc: "Ideal for small businesses & startups", features: ["Up to 5 pages", "Mobile responsive", "Contact form", "Basic SEO setup", "CMS integration (WordPress)", "1 round of revisions"] },
      { name: "Professional", price: 275000, desc: "For growing companies & advanced needs", features: ["Up to 15 pages", "Custom post types", "E-commerce (up to 50 products)", "Performance optimization", "Analytics integration", "3 rounds of revisions"] },
      { name: "Enterprise", price: 650000, desc: "High-traffic, multi-language, custom solutions", features: ["Unlimited pages", "Headless CMS option", "Advanced e-commerce", "Custom API integrations", "Load balancing ready", "Priority support for 3 months"] }
    ]
  },
  {
    service: "Mobile App Development",
    icon: Smartphone,
    description: "iOS, Android, and cross-platform native experiences",
    tiers: [
      { name: "MVP", price: 550000, desc: "Test your idea with core functionality", features: ["Single platform (iOS or Android)", "Up to 5 screens", "Basic backend integration", "User authentication", "App store submission", "2 weeks of post-launch fixes"] },
      { name: "Full Feature", price: 1850000, desc: "Production-ready app with polish", features: ["Both iOS & Android (React Native/Flutter)", "Up to 20 screens", "Push notifications", "Offline sync", "Payment gateway", "Admin dashboard", "Analytics"] },
      { name: "Enterprise", price: 4200000, desc: "Scalable, secure, high-performance", features: ["Native development (Swift/Kotlin)", "Complex animations", "Real-time features (WebSockets)", "Biometric auth", "Background services", "Comprehensive testing suite", "12 months warranty"] }
    ]
  },
  {
    service: "Custom Web Applications",
    icon: Zap,
    description: "SaaS platforms, portals, and internal tools",
    tiers: [
      { name: "Basic SaaS", price: 480000, desc: "Single-tenant, limited users", features: ["Up to 3 user roles", "Dashboard & reporting", "File uploads", "Email notifications", "Basic RBAC", "Hosted on shared infrastructure"] },
      { name: "Professional", price: 1250000, desc: "Multi-tenant with advanced logic", features: ["Unlimited user roles", "Workflow automation", "Third-party API integrations", "Audit logs", "Subscription billing", "Dedicated database"] },
      { name: "Enterprise", price: 3500000, desc: "High-volume, mission-critical", features: ["Microservices architecture", "SSO & SAML", "GDPR/CCPA compliance ready", "99.9% uptime SLA", "Custom reporting engine", "Advanced security hardening"] }
    ]
  },
  {
    service: "ERP & CRM Implementation",
    icon: Database,
    description: "Custom or tailored Odoo, SuiteCRM, Dolibarr, and more",
    tiers: [
      { name: "Foundation", price: 950000, desc: "Core modules for small teams", features: ["Sales & CRM", "Inventory basic", "Invoicing", "Up to 10 users", "Basic reporting", "Training (2 days)"] },
      { name: "Business", price: 2650000, desc: "Mid-market full suite", features: ["Accounting & finance", "HR & payroll", "Project management", "Procurement", "Custom dashboards", "Data migration assistance", "Up to 50 users"] },
      { name: "Enterprise", price: 5900000, desc: "Multi-branch, complex processes", features: ["Manufacturing module", "Business intelligence", "Advanced approval workflows", "API-first design", "On-premise or cloud", "Unlimited users", "SLA support"] }
    ]
  },
  {
    service: "Cloud & DevOps",
    icon: Server,
    description: "AWS, Azure, GCP – automation, scaling, and reliability",
    tiers: [
      { name: "Setup & Deploy", price: 180000, desc: "Get your app to production safely", features: ["Infrastructure as Code (Terraform)", "CI/CD pipeline (GitHub Actions)", "Basic monitoring", "SSL & domain setup", "Backup configuration"] },
      { name: "Managed Ops", price: 650000, desc: "Ongoing reliability & scaling", features: ["24/7 monitoring & alerting", "Auto-scaling groups", "Disaster recovery plan", "Cost optimization review", "Monthly security patching"] },
      { name: "Enterprise", price: 1800000, desc: "Multi-region, compliance-ready", features: ["Kubernetes (EKS/AKS/GKE)", "Zero-downtime deployments", "Chaos engineering", "SOC2 / ISO 27001 readiness", "Dedicated SRE support"] }
    ]
  },
  {
    service: "Cybersecurity & Compliance",
    icon: Shield,
    description: "Audits, penetration testing, and compliance frameworks",
    tiers: [
      { name: "Basic Audit", price: 120000, desc: "External vulnerability scan", features: ["Network & web app scan", "Remediation report", "Up to 5 IPs/domains", "OWASP Top 10 check", "1 week delivery"] },
      { name: "Penetration Test", price: 450000, desc: "Manual ethical hacking", features: ["Full internal/external pentest", "Social engineering test", "Detailed findings + retest", "Compliance checklist (PCI-DSS basic)", "Executive summary"] },
      { name: "Compliance Package", price: 1250000, desc: "ISO 27001 / GDPR / DPA readiness", features: ["Policy development", "Risk assessment", "Staff training", "Incident response plan", "Audit support", "Annual retainer option"] }
    ]
  },
  {
    service: "Data Analytics & BI",
    icon: BarChart3,
    description: "Dashboards, data warehouses, and actionable insights",
    tiers: [
      { name: "Starter Dashboard", price: 95000, desc: "Connect & visualize key metrics", features: ["Up to 3 data sources", "5 interactive dashboards", "Automated refresh (daily)", "Export to PDF/Excel", "Embedded filters"] },
      { name: "Business Intelligence", price: 380000, desc: "Company-wide decision support", features: ["Data warehouse setup (BigQuery/Snowflake)", "Unlimited dashboards", "Predictive models", "Drill-down analysis", "User-level permissions"] },
      { name: "Enterprise Analytics", price: 1250000, desc: "Real-time, AI-assisted insights", features: ["Streaming data pipelines", "ML anomaly detection", "Natural language query", "Custom AI training", "On-premise option"] }
    ]
  },
  {
    service: "UI/UX Design & Research",
    icon: PenTool,
    description: "User-centered design, wireframes, and prototypes",
    tiers: [
      { name: "Essentials", price: 75000, desc: "For landing pages or internal tools", features: ["Low-fidelity wireframes", "Style guide (colors/typography)", "1 core user flow", "Basic responsive design", "Figma source files"] },
      { name: "Product Design", price: 280000, desc: "Full web or mobile app design", features: ["High-fidelity mockups", "Clickable prototype", "User personas & journey maps", "Design system components", "Developer handoff (Zeplin/Figma)"] },
      { name: "Research Led", price: 650000, desc: "Data-informed design for scale", features: ["User interviews (up to 15)", "Usability testing", "A/B test ready designs", "Accessibility audit (WCAG 2.1)", "Iterative design sprints"] }
    ]
  }
];

// Hourly consulting rates (market research based)
const consultingRates = [
  { role: "Strategy & Discovery Consultant", rate: "8,000 - 15,000", description: "Product discovery, technical audit, roadmap planning" },
  { role: "Senior Software Engineer", rate: "5,500 - 10,000", description: "Full-stack development, code reviews, architecture" },
  { role: "Cloud/DevOps Engineer", rate: "6,500 - 12,000", description: "Infrastructure setup, CI/CD, scaling" },
  { role: "Security Specialist", rate: "7,500 - 14,000", description: "Penetration testing, compliance, threat modeling" },
  { role: "UI/UX Designer", rate: "4,500 - 8,500", description: "Wireframing, prototypes, user research" },
  { role: "Project Manager (Technical)", rate: "5,000 - 9,000", description: "Agile delivery, stakeholder management, reporting" }
];

// Real project examples from Kenya market
const projectExamples = [
  { title: "E-commerce platform for a Nairobi retail chain", price: 1200000, description: "Multi-vendor marketplace with M-Pesa integration, inventory management, and delivery tracking." },
  { title: "Mobile banking app for a SACCO", price: 2450000, description: "Secure biometric login, transaction history, loan applications, and USSD fallback." },
  { title: "School management ERP", price: 890000, description: "Student records, fee collection, exam grading, parent portal, and SMS notifications." },
  { title: "Logistics & fleet tracking portal", price: 1850000, description: "Real-time GPS tracking, route optimization, driver app, and fuel analytics dashboard." },
  { title: "Telemedicine platform MVP", price: 975000, description: "Video consultations, appointment scheduling, e-prescriptions, and patient records." },
  { title: "Corporate website + CRM integration", price: 425000, description: "Lead capture, automated follow-ups, and sales pipeline tracking for a B2B firm." }
];

// Maintenance & support plans
const supportPlans = [
  { name: "Basic Care", price: 25000, features: ["Monthly backups", "Security updates (critical)", "Uptime monitoring", "Email support (48h response)"], bestFor: "Static sites & brochure websites" },
  { name: "Professional Care", price: 65000, features: ["Weekly backups", "Plugin/core updates", "Performance tuning", "Chat/email support (24h)", "Monthly analytics report"], bestFor: "WordPress & e-commerce sites" },
  { name: "Business Care", price: 150000, features: ["Daily backups", "24/7 monitoring + alerting", "Priority queue support (4h)", "Quarterly security audit", "On-call engineer"], bestFor: "Web apps & SaaS platforms" },
  { name: "Enterprise SLA", price: "Custom", features: ["Dedicated support team", "99.9% uptime guarantee", "Same-day hotfixes", "Compliance assistance", "Monthly strategy call"], bestFor: "Mission-critical systems" }
];

// Additional FAQ items specific to Kenya market
const localFaqs = [
  {
    question: "Do your prices include VAT?",
    answer: "No, all listed prices exclude 16% VAT as required by the Kenya Revenue Authority (KRA). VAT will be added to final invoices for local businesses unless a valid exemption certificate is provided."
  },
  {
    question: "What's the typical payment schedule?",
    answer: "For projects under 500,000 KES: 50% upfront, 50% upon completion. For larger engagements: 30% upfront, 30% at milestone, 30% before launch, 10% after 30 days. Retainers are billed monthly in advance."
  },
  {
    question: "Do you offer discounts for long-term partnerships?",
    answer: "Yes. Clients on 6+ month retainers receive 10-15% off hourly rates. Non-profits and startups (under 2 years) may qualify for reduced discovery phase fees. Contact us to discuss."
  },
  {
    question: "How do you handle scope changes?",
    answer: "We use a change order process. Minor changes (under 5% of project cost) are often absorbed. Major additions are quoted separately and added to the timeline. We recommend phased delivery to manage budgets."
  },
  {
    question: "Can you work with our existing team?",
    answer: "Absolutely. We often embed our engineers alongside in-house teams. This is billed on a monthly retainer or hourly basis, with knowledge transfer and documentation included."
  }
];

// Combine imported FAQ with local ones (avoid duplicates by checking question)
const mergedFaq = [...importedFAQ, ...localFaqs.filter(lf => !importedFAQ.some(imp => imp.question === lf.question))];

const pricingNotes = [
  " Based on extensive Kenya market research (2025-2026) – actual quotes depend on your specific requirements.",
  " All prices exclude 16% VAT. Discounts available for registered non-profits, startups, and long-term engagements.",
  " Complex integrations, legacy system migration, hardware, or compliance audits are quoted separately.",
  " Final price locked after discovery workshop (2-5 days, fee applies but credited to project)."
];

const includedInEveryProject = [
  { title: "Discovery & Scoping", description: "We define user stories, technical risks, and success metrics before writing any code." },
  { title: "Technical Architecture", description: "Scalable, secure design tailored to your expected growth and budget constraints." },
  { title: "QA & Testing", description: "Automated and manual testing across browsers/devices, plus a UAT phase with your team." },
  { title: "Deployment & Handover", description: "Guided launch, documentation, and 30 days of post-launch critical fixes." }
];

const engagementModels = [
  { title: "Fixed Scope Project", description: "Clear requirements, predictable budget, milestone payments.", features: ["Detailed SOW", "Waterfall or hybrid", "Change order process", "Best for defined MVPs"] },
  { title: "Phased Delivery", description: "Start with core features, then expand based on feedback.", features: ["2-4 week sprints", "Prioritized backlog", "Budget control per phase", "Ideal for SaaS & platforms"] },
  { title: "Monthly Retainer", description: "Continuous support, feature additions, or team augmentation.", features: ["Flexible hours/mo", "Priority queue", "Monthly rollover (up to 20%)", "Strategic roadmap reviews"] }
];

export default function PricingPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [selectedSupport, setSelectedSupport] = useState<string | null>(null);

  const toggleService = (service: string) => {
    setExpandedService(prev => prev === service ? null : service);
  };

  return (
    <SiteShell>
      {/* Hero Section - No blue background, clean and professional */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
            
             SMA  Market Rates • 2026
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Transparent pricing built for <br />
              <span className="text-slate-600">Kenyan businesses</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-7 text-slate-600 sm:text-xl">
              No hidden fees, no AI-generated quotes. Real market research, real local expertise.
              From startup MVP to enterprise ERP — find your ballpark, then let's scope.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#service-pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#quote"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Request Custom Quote
              </Link>
            </div>
            <div className="mt-12 grid gap-3 sm:grid-cols-4">
              {pricingNotes.map((note) => (
                <div key={note} className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-xs leading-5 text-slate-600">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included - Always */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro
            eyebrow="Every project includes"
            title="No shortcuts. No surprises."
            description="Regardless of budget or timeline, these four phases are baked into every engagement."
            align="left"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {includedInEveryProject.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="border-b border-slate-200 bg-slate-50/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro
            eyebrow="How we partner"
            title="Three ways to work together"
            description="Choose the commercial model that fits your certainty level and appetite for iteration."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {engagementModels.map((model) => (
              <div key={model.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{model.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{model.description}</p>
                <ul className="mt-4 space-y-2">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN SERVICE PRICING - Detailed, market-researched, expandable */}
      <section id="service-pricing" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro
            eyebrow="Service pricing"
            title="Market rates for every solution"
            description="Below are real-world price bands based on hundreds of Kenya projects. Click any service to see tiered options."
            align="left"
          />
          <div className="mt-12 space-y-6">
            {marketPricingData.map((service) => {
              const Icon = service.icon;
              const isExpanded = expandedService === service.service;
              return (
                <div key={service.service} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleService(service.service)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{service.service}</h3>
                        <p className="text-sm text-slate-500">{service.description}</p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/30 px-6 pb-6 pt-4">
                      <div className="grid gap-5 md:grid-cols-3">
                        {service.tiers.map((tier) => (
                          <div key={tier.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                            <h4 className="font-bold text-slate-900">{tier.name}</h4>
                            <p className="mt-1 text-2xl font-bold text-slate-800">
                              {currencyFormatter.format(tier.price)}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">{tier.desc}</p>
                            <ul className="mt-4 space-y-2">
                              {tier.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-xs text-slate-600">
                                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 text-right">
                        <Link href="#quote" className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                          Request custom quote for this service <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hourly Consulting Rates - New Section */}
      <section className="border-b border-slate-200 bg-slate-50/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro
            eyebrow="Flexible consulting"
            title="Hourly rates for advisory & augmentation"
            description="Need strategic guidance or extra hands for a sprint? Here's what to budget."
          />
          <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Hourly Rate (KES)</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Typical engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {consultingRates.map((role) => (
                  <tr key={role.role} className="hover:bg-slate-50/50">
                    <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-slate-800">{role.role}</td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-slate-700">{role.rate}</td>
                    <td className="px-6 py-3 text-sm text-slate-500">{role.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">Minimum 10 hours per engagement. Discounted day rates (8h) available.</p>
        </div>
      </section>

      {/* Support & Maintenance Plans */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro
            eyebrow="Keep it running"
            title="Maintenance & support plans"
            description="Post-launch peace of mind. Choose a plan or build a custom retainer."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {supportPlans.map((plan) => (
              <div key={plan.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-2xl font-bold text-slate-800">
                  {typeof plan.price === 'number' ? currencyFormatter.format(plan.price) : plan.price}
                  {typeof plan.price === 'number' && <span className="text-sm font-normal text-slate-500">/month</span>}
                </p>
                <p className="mt-2 text-xs text-slate-500">{plan.bestFor}</p>
                <ul className="mt-4 space-y-1.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-slate-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Project Examples - Market research showcase */}
      <section className="border-b border-slate-200 bg-slate-50/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro
            eyebrow="From our portfolio"
            title="Real Kenya projects, real budgets"
            description="Examples of recently delivered work to help you benchmark your idea."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectExamples.map((example) => (
              <div key={example.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">{example.title}</h3>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                    {currencyFormatter.format(example.price)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{example.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-sm text-slate-500">
            *Prices reflect final project cost. Each was unique – your scope may vary.
          </div>
        </div>
      </section>

      {/* Factors that influence cost */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionIntro
            eyebrow="Budget drivers"
            title="What makes your price go up or down"
            description="Understanding these factors helps you plan better and avoid surprises."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, title: "User complexity", desc: "Multiple roles, permissions, or high concurrency increases backend work." },
              { icon: Database, title: "Data migration", desc: "Moving from legacy systems, Excel, or paper records adds cost." },
              { icon: Zap, title: "Third-party integrations", desc: "M-Pesa, CRB, KRA, or custom APIs require extra development." },
              { icon: Clock, title: "Timeline pressure", desc: "Tight deadlines may need additional resources (faster = higher cost)." },
              { icon: Shield, title: "Compliance needs", desc: "GDPR, PCI-DSS, or data protection audits add security layers." },
              { icon: TrendingUp, title: "Scalability expectations", desc: "Planning for 10x growth affects architecture choices." }
            ].map((factor) => (
              <div key={factor.title} className="rounded-xl border border-slate-200 p-5 shadow-sm">
                <factor.icon className="h-6 w-6 text-slate-600" />
                <h3 className="mt-3 font-semibold text-slate-900">{factor.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-slate-200 bg-slate-50/40">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <SectionIntro
            eyebrow="Common questions"
            title="FAQ – Kenya market edition"
            description="Everything you wanted to ask about pricing, payments, and process."
            align="center"
          />
          <div className="mt-12 space-y-4">
            {mergedFaq.map((item, idx) => (
              <details key={idx} className="group rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-slate-900">
                  <span>{item.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section - Neutral background, no blue */}
      <section id="quote" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm md:p-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Ready to talk?</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Get a fixed-price quote
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  Tell us about your project, timeline, and budget range. We'll get back within 2 business days with a ballpark and next steps for a discovery workshop.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                  <Check className="h-4 w-4 text-slate-600" />
                  <span>No obligation, just clarity</span>
                </div>
                <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
                  <Check className="h-4 w-4 text-slate-600" />
                  <span>NDA available upon request</span>
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
