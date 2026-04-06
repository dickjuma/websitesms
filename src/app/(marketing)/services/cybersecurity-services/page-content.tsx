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
import { cybersecurityContent as content } from "../_content";

export function CybersecurityServicesContent() {
  const capabilities = content.capabilities || [];
  const outcomes = content.outcomes || [];
  const considerations = content.considerations || [];

  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Review Security Posture"
        stats={[
          { label: "Need", value: "Risk visibility" },
          { label: "Focus", value: "Hardening and remediation" },
          { label: "Outcome", value: "Stronger trust" },
        ]}
      />

      <ServiceSection className="py-16">
        <SectionHeading
          eyebrow="Security Route"
          title={content.summary}
          description={content.description}
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <HighlightRibbon items={content.highlights} />
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <BulletPanel
            title="Security coverage"
            description="Comprehensive security services and remediation."
            items={capabilities}
          />
          <BulletPanel
            title="Security outcomes"
            description="The value delivered through our security services."
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
            Security Services
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <BulletPanel
            title="Assessment & Planning"
            description="Security assessments and strategic planning"
            items={content.capabilities || []}
          />
          <BulletPanel
            title="Implementation & Support"
            description="Security improvements and ongoing support"
            items={content.outcomes || []}
          />
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Testimonials
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Security Director"
            role="Enterprise Client"
            content="Exceptional security expertise and support."
            rating={5}
          />
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">FAQ</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <FAQItem
            question="What security services do you provide?"
            answer="We provide comprehensive security assessments, implementation, and ongoing support."
          />
          <FAQItem
            question="How do you ensure security?"
            answer="Through risk-based approaches, industry standards, and continuous monitoring."
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
              title="Security planning considerations"
              description="Key factors for security success"
              items={considerations}
            />
            <RelatedLinks links={content.relatedLinks || []} />
          </div>
          <ActionCard
            title="Security success requires planning and expertise"
            description="Partner with us for comprehensive security solutions."
          />
        </div>
      </ServiceSection>
    </>
  );
}
