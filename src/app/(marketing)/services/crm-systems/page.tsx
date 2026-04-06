import type { Metadata } from "next";
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
} from "../_components/service-primitives";
import { crmSystemsContent as content } from "../_content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function CrmSystemsPage() {
  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Design Your CRM"
        stats={[
          { label: "Team Fit", value: "Sales and service" },
          { label: "Need", value: "Follow-up clarity" },
          { label: "Outcome", value: "Pipeline visibility" },
        ]}
      />

      <ServiceSection className="py-18">
        <div className="rounded-[2.2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="CRM Route"
                title={content.summary}
                description="The CRM page is organized around pipeline health, ownership clarity, customer history, and the automations that support follow-through without becoming noise."
              />
              <div className="mt-8">
                <HighlightRibbon items={content.highlights} />
              </div>
            </div>
            <ImageFrame src={content.imageSrc} alt={content.imageAlt} aspectClassName="aspect-[4/3]" />
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="pb-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <BulletPanel title="CRM building blocks" description="The structure typically covers leads, records, activity, and the rules that move people through the process." items={content.capabilities} />
          <BulletPanel title="What the team experiences" description="The payoff is better follow-through, cleaner visibility, and stronger reporting." items={content.outcomes} variant="blue" />
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8">
            <ActionCard
              title="Strong fit when leads, accounts, and customer history are slipping between tools"
              description="CRM work matters most when visibility, ownership, and follow-up quality directly affect revenue or service consistency."
            />
            <BulletPanel title="Workflow decisions" description="These questions keep the CRM useful instead of overbuilt." items={content.considerations} />
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Implementation rhythm</p>
            <div className="mt-6">
              <StepsTimeline steps={content.steps} compact />
            </div>
          </div>
        </div>
      </ServiceSection>
      <ServiceSection className="py-12 pb-12">
        <BookDemoCTA />
      </ServiceSection>
      <ServiceSection className="py-8 pb-24">
        <RelatedLinks links={content.relatedLinks} />
      </ServiceSection>
    </>
  );
}
