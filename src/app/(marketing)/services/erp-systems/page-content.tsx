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
import { erpSystemsContent as content } from "../_content";

export function ErpSystemsContent() {
  const capabilities = content.capabilities || [];
  const outcomes = content.outcomes || [];
  const considerations = content.considerations || [];

  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Discuss Your ERP Rollout"
        stats={[
          { label: "Scope", value: "Operations and approvals" },
          { label: "Value", value: "Shared visibility" },
          { label: "Phase", value: "Module-based rollout" },
        ]}
      />

      <ServiceSection className="py-16">
        <SectionHeading
          eyebrow="ERP Route"
          title={content.summary}
          description="Transforming enterprise operations through integrated systems."
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <HighlightRibbon items={content.highlights} />
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <BulletPanel
            title="ERP Implementation"
            description="Comprehensive ERP system implementation and configuration."
            items={capabilities}
          />
          <BulletPanel
            title="Business Impact"
            description="The organizational benefits of ERP implementation."
            items={outcomes}
            variant="blue"
          />
        </div>
      </ServiceSection>

      {content.imageSrc && (
        <ServiceSection className="py-8">
          <ImageFrame
            src={content.imageSrc}
            alt={content.imageAlt}
            aspectClassName="aspect-[16/9]"
          />
        </ServiceSection>
      )}

      <ServiceSection className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            ERP Services
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <BulletPanel
            title="Planning & Assessment"
            description="ERP readiness assessment and strategic planning"
            items={content.capabilities || []}
          />
          <BulletPanel
            title="Implementation & Training"
            description="System implementation with comprehensive training"
            items={content.outcomes || []}
          />
        </div>
      </ServiceSection>

      <ServiceSection className="py-12 pb-12">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">ERP Implementation Path</p>
          <div className="mt-6">
            <StepsTimeline steps={content.steps || []} />
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Choose Our ERP Solution
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">✓ Proven Methodology</h3>
            <p className="text-slate-600">Time-tested ERP implementation approach</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">✓ Expert Support</h3>
            <p className="text-slate-600">Experienced ERP consultants and support</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">✓ Business Results</h3>
            <p className="text-slate-600">Measurable improvements and ROI</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Client Testimonials
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Operations Director"
            role="Enterprise Client"
            content="Successfully transformed our operations with comprehensive ERP solution."
            rating={5}
          />
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <FAQItem
            question="How long is an ERP implementation?"
            answer="Implementation timeline varies by scope, typically 6-18 months for enterprise deployments."
          />
          <FAQItem
            question="What modules does your ERP cover?"
            answer="We support Finance, Supply Chain, HR, Manufacturing, and more depending on your needs."
          />
          <FAQItem
            question="Do you provide training?"
            answer="Yes, comprehensive training for system users and ongoing support post-implementation."
          />
        </div>
      </ServiceSection>

      <ServiceSection className="py-12 pb-12">
        <BookDemoCTA />
      </ServiceSection>

      <ServiceSection className="py-8 pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <BulletPanel
              title="ERP Success Factors"
              description="Key considerations for ERP implementation success"
              items={considerations}
            />
            <RelatedLinks links={content.relatedLinks || []} />
          </div>
          <ActionCard
            title="ERP success requires strategic implementation"
            description="Partner with us for a successful enterprise transformation."
          />
        </div>
      </ServiceSection>
    </>
  );
}
