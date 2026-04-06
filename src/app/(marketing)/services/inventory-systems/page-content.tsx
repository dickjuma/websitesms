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
import { inventorySystemsContent as content } from "../_content";

export function InventorySystemsContent() {
  const capabilities = content.capabilities || [];
  const outcomes = content.outcomes || [];
  const considerations = content.considerations || [];

  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Plan Your Inventory System"
        stats={[
          { label: "Control", value: "Stock visibility" },
          { label: "Flow", value: "Warehouse and branch movement" },
          { label: "Goal", value: "Fewer stock surprises" },
        ]}
      />

      <ServiceSection className="py-16">
        <SectionHeading
          eyebrow="Inventory Route"
          title={content.summary}
          description="Optimizing inventory management and warehouse operations."
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <HighlightRibbon items={content.highlights} />
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <BulletPanel
            title="Inventory Services"
            description="Comprehensive inventory management solutions."
            items={capabilities}
          />
          <BulletPanel
            title="Business Results"
            description="The operational benefits of modern inventory systems."
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
            Inventory Management Solutions
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <BulletPanel
            title="Real-Time Tracking"
            description="Live inventory visibility across all locations"
            items={content.capabilities || []}
          />
          <BulletPanel
            title="Operational Efficiency"
            description="Streamlined warehouse and inventory operations"
            items={content.outcomes || []}
          />
        </div>
      </ServiceSection>

      <ServiceSection className="py-12 pb-12">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Implementation Path</p>
          <div className="mt-6">
            <StepsTimeline steps={content.steps || []} />
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Key Benefits
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">📊 Full Visibility</h3>
            <p className="text-slate-600">Real-time stock levels and movement tracking</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">⚡ Efficiency</h3>
            <p className="text-slate-600">Automated processes and reduced manual work</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">💰 Cost Savings</h3>
            <p className="text-slate-600">Reduced waste and optimized stock levels</p>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Success Stories
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Warehouse Manager"
            role="Distribution Facility"
            content="Transformed our inventory management and reduced stock discrepancies dramatically."
            rating={5}
          />
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Questions</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <FAQItem
            question="How does real-time inventory tracking work?"
            answer="Our system integrates with barcode scanners, RFID technology, and warehouse management software for live updates."
          />
          <FAQItem
            question="Can this integrate with our existing systems?"
            answer="Yes, we support integration with most major ERP and accounting systems."
          />
          <FAQItem
            question="What's the typical ROI timeline?"
            answer="Most clients see measurable improvements within 3-6 months of implementation."
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
              title="Planning Considerations"
              description="Key factors for inventory system success"
              items={considerations}
            />
            <RelatedLinks links={content.relatedLinks || []} />
          </div>
          <ActionCard
            title="Inventory success requires modern systems and expertise"
            description="Let us help you optimize your inventory management and warehouse operations."
          />
        </div>
      </ServiceSection>
    </>
  );
}
