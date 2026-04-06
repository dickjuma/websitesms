'use client';

import {
  ActionCard,
  BulletPanel,
  HighlightRibbon,
  ImageFrame,
  RelatedLinks,
  SectionHeading,
  ServiceHero,
  ServiceSection,
  StepsTimeline,
} from "../_components/service-primitives";
import { posSystemsContent as content } from "../_content";

// Custom components for additional sections
import { useState } from "react";
import {
  Star,
  ChevronDown,
  ShoppingCart,
  Smartphone,
  Package,
  BarChart,
  Shield,
  Zap,
  Clock,
  Award,
  Users,
  Database,
  Globe,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Printer,
  Scan,
  type LucideIcon,
} from "lucide-react";

// FAQ Accordion Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-5">
      <button
        className="flex w-full items-center justify-between text-left font-medium text-slate-900 hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "mt-3 max-h-40" : "max-h-0"
        }`}
      >
        <p className="text-slate-600">{answer}</p>
      </div>
    </div>
  );
};

// Testimonial Card
const TestimonialCard = ({
  name,
  role,
  content,
  rating,
}: {
  name: string;
  role: string;
  content: string;
  rating: number;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
            }`}
          />
        ))}
      </div>
      <p className="text-slate-700 mb-6 italic">"{content}"</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

// Tech Stack Item
const TechItem = ({ name, icon: Icon }: { name: string; icon: LucideIcon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <span className="text-sm font-medium text-slate-700">{name}</span>
    </div>
  );
};

export default function PosSystemsPage() {
  // Fallback arrays in case content properties are missing
  const capabilities = content.capabilities || [];
  const outcomes = content.outcomes || [];
  const considerations = content.considerations || [];

  return (
    <>
      {/* Hero Section */}
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Plan Your POS System"
        stats={[
          { label: "Use Case", value: "Retail and service outlets" },
          { label: "Need", value: "Checkout and branch control" },
          { label: "Signal", value: "Sales visibility" },
        ]}
      />

      {/* Problem vs Solution */}
      <ServiceSection className="py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-red-50/30 rounded-2xl p-8 border border-red-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-xl">✕</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Common POS Struggles</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="text-red-500 mt-1">✕</span>
                <span className="text-slate-700">Slow checkout during peak hours</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 mt-1">✕</span>
                <span className="text-slate-700">Inventory mismatches between stores</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 mt-1">✕</span>
                <span className="text-slate-700">No real-time sales visibility for managers</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 mt-1">✕</span>
                <span className="text-slate-700">Complex integrations with accounting/ERP</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-50/30 rounded-2xl p-8 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our POS Solution</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="text-slate-700">Lightning-fast checkout with barcode & NFC</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="text-slate-700">Real-time inventory sync across all branches</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="text-slate-700">Live dashboard for sales and staff performance</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="text-slate-700">Seamless integration with Xero, QuickBooks, ERP</span>
              </li>
            </ul>
          </div>
        </div>
      </ServiceSection>

      {/* Original: POS Highlights + Three Cards */}
      <ServiceSection className="py-16">
        <SectionHeading
          eyebrow="POS Route"
          title={content.summary}
          description="The POS route is structured around daily store reality: checkout speed, branch consistency, stock effects, controls, and reporting for managers."
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <HighlightRibbon items={content.highlights} />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            Faster, clearer checkout for front-line staff.
          </div>
          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            Better branch visibility for supervisors and finance teams.
          </div>
          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            Cleaner connections between sales, stock, and daily reporting.
          </div>
        </div>
      </ServiceSection>

      {/* Detailed Features */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Modern POS Capabilities
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to run efficient, multi‑location retail
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <ShoppingCart className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Checkout</h3>
            <p className="text-slate-600">
              Barcode scanning, split payments, gift cards, and digital receipts.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <Package className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
            <p className="text-slate-600">
              Real‑time stock levels, low‑stock alerts, and purchase orders.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <BarChart className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analytics & Reports</h3>
            <p className="text-slate-600">
              Sales trends, staff performance, and profit margins by product.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <Smartphone className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mobile POS</h3>
            <p className="text-slate-600">
              Process sales from anywhere – line busting, pop‑ups, tableside.
            </p>
          </div>
        </div>
      </ServiceSection>

      {/* POS Coverage + Image */}
      <ServiceSection className="pb-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ImageFrame
            src={content.imageSrc}
            alt={content.imageAlt}
            aspectClassName="aspect-[4/3]"
          />
          <BulletPanel
            title="POS coverage"
            description="The service often blends store-facing flows with the controls that leadership needs behind the scenes."
            items={capabilities}
          />
        </div>
      </ServiceSection>

      {/* Operational Payoff & Rollout Path */}
      <ServiceSection className="py-8">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <BulletPanel
            title="Operational payoff"
            description="The value is better flow at the counter and better oversight in the back office."
            items={outcomes}
            variant="blue"
          />
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Rollout path
            </p>
            <div className="mt-6">
              <StepsTimeline steps={content.steps} />
            </div>
          </div>
        </div>
      </ServiceSection>

      {/* UI Showcase */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Intuitive POS Interface
          </h2>
          <p className="text-xl text-slate-600">
            Designed for speed and clarity at the counter
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all hover:scale-[1.02]">
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-slate-300 text-sm ml-2 font-mono">
                POS Terminal · Store #42
              </span>
            </div>
            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-slate-100 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">$1,284</p>
                  <p className="text-sm text-slate-500">Today's Sales</p>
                </div>
                <div className="flex-1 bg-slate-100 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-sm text-slate-500">Items Sold</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Product A</span>
                  <span>2 x $19.99</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>Product B</span>
                  <span>1 x $49.99</span>
                </div>
                <div className="flex justify-between items-center pt-2 font-bold">
                  <span>Total</span>
                  <span>$89.97</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-medium">
                Pay Now
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transition-all hover:scale-[1.02]">
            <div className="bg-slate-800 px-4 py-3">
              <span className="text-slate-300 text-sm font-mono">
                Manager Dashboard
              </span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold">$12.4k</p>
                  <p className="text-sm text-slate-500">Week to Date</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold">342</p>
                  <p className="text-sm text-slate-500">Transactions</p>
                </div>
              </div>
              <div className="h-24 flex items-end gap-2">
                {[18, 24, 30, 28, 42, 38, 45].map((h, i) => (
                  <div
                    key={i}
                    className="bg-blue-500 w-full rounded-t"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
              <p className="text-center text-xs text-slate-400 mt-2">
                Daily sales trend
              </p>
            </div>
          </div>
        </div>
      </ServiceSection>

      {/* Why Choose Us */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Retailers Choose Our POS
          </h2>
          <p className="text-xl text-slate-600">
            Proven in thousands of stores
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Zap, title: "40% Faster Checkout", desc: "Average transaction time reduced" },
            { icon: Clock, title: "99.95% Uptime", desc: "Offline mode ensures no lost sales" },
            { icon: Award, title: "Inventory Accuracy", desc: "Real‑time sync across all locations" },
            { icon: Users, title: "Staff Friendly", desc: "Minimal training, intuitive UI" },
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Modern POS Technology
          </h2>
          <p className="text-xl text-slate-600">
            Reliable, secure, and cloud‑connected
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
          <TechItem name="Cloud POS" icon={Globe} />
          <TechItem name="Barcode SDK" icon={Scan} />
          <TechItem name="Payment Gateway" icon={CreditCard} />
          <TechItem name="Receipt Printer" icon={Printer} />
          <TechItem name="Inventory DB" icon={Database} />
          <TechItem name="Analytics" icon={BarChart} />
        </div>
      </ServiceSection>

      {/* Testimonials */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Retail Leaders
          </h2>
          <p className="text-xl text-slate-600">
            Real feedback from store owners and operators
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Michael Torres"
            role="Owner, Coffee Chain"
            content="Our checkout speed doubled and inventory errors dropped 80%. The offline mode saved us during internet outages."
            rating={5}
          />
          <TestimonialCard
            name="Linda Chen"
            role="Operations Director, Fashion Retail"
            content="Real‑time sales data across 12 stores changed how we manage stock and staff. Invaluable."
            rating={5}
          />
          <TestimonialCard
            name="David Kim"
            role="Manager, Electronics Store"
            content="The mobile POS lets us help customers anywhere in the store. Our average basket size increased 22%."
            rating={5}
          />
        </div>
      </ServiceSection>

      {/* FAQ Section */}
      <ServiceSection className="py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything about our POS systems
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
          <FAQItem
            question="How long does POS implementation take?"
            answer="Typically 2‑4 weeks for a single store, 6‑8 weeks for multi‑location rollouts."
          />
          <FAQItem
            question="Does it work offline?"
            answer="Yes, the system caches transactions and syncs automatically when connection is restored."
          />
          <FAQItem
            question="Can it integrate with my accounting software?"
            answer="We offer native integrations with Xero, QuickBooks, Sage, and custom APIs for ERPs."
          />
          <FAQItem
            question="What hardware is required?"
            answer="We support any standard receipt printer, barcode scanner, cash drawer, and payment terminal."
          />
          <FAQItem
            question="Do you offer training for staff?"
            answer="Yes, we provide video tutorials, on‑site training, and 24/7 support."
          />
        </div>
      </ServiceSection>

      {/* Final CTA */}
      <ServiceSection className="py-12 pb-24">
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Checkout Experience?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Get a free POS consultation and live demo.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-white text-blue-700 hover:bg-slate-100 px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 text-lg">
                Book a Demo <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all text-lg">
                Request Pricing
              </button>
            </div>
            <p className="text-blue-200 mt-8 text-sm">
              Free 30‑min consultation & ROI estimate.
            </p>
          </div>
        </div>
      </ServiceSection>

      {/* Branch Setup Decisions & Related Links */}
      <ServiceSection className="py-8 pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <BulletPanel
              title="Branch setup decisions"
              description="These questions shape how reliable the rollout will be once sales activity begins."
              items={considerations}
            />
            <RelatedLinks links={content.relatedLinks} />
          </div>
          <ActionCard
            title="Useful when daily sales operations need speed and control at the same time"
            description="POS work is strongest when checkout, stock sync, branch oversight, and reporting need to operate as one connected system."
          />
        </div>
      </ServiceSection>
    </>
  );
}