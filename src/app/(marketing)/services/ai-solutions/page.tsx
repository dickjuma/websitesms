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
import { aiSolutionsContent as content } from "../_content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function AiSolutionsPage() {
  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Shape an AI Workflow"
        accentClassName="bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(180deg,#ffffff_0%,#f7ffff_100%)]"
        stats={[
          { label: "Use", value: "Assist and automate" },
          { label: "Guardrail", value: "Human review where needed" },
          { label: "Goal", value: "Practical business value" },
        ]}
      />

      <ServiceSection className="py-18">
        <SectionHeading
          eyebrow="AI Route"
          title={content.summary}
          description="The AI route focuses on use-case fit, knowledge quality, workflow safety, and measurable usefulness rather than novelty."
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <HighlightRibbon items={content.highlights} />
        </div>
      </ServiceSection>

      <ServiceSection className="pb-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ImageFrame src={content.imageSrc} alt={content.imageAlt} aspectClassName="aspect-[16/11]" />
          <div className="space-y-8">
            <BulletPanel title="AI coverage" description="The work can span assistants, task automation, workflow triggers, and knowledge-guided interactions." items={content.capabilities} />
            <BulletPanel title="Planning guardrails" description="These questions keep the solution useful and trustworthy." items={content.considerations} />
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-8">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <BulletPanel title="What improves" description="The gain should show up in speed, clarity, and operational relief for the right tasks." items={content.outcomes} variant="blue" />
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">AI delivery loop</p>
            <div className="mt-6">
              <StepsTimeline steps={content.steps} />
            </div>
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="py-12 pb-12">
        <BookDemoCTA />
      </ServiceSection>

      <ServiceSection className="py-8 pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <ActionCard
            title="Best for teams that want real process help, not just an AI demo"
            description="This route works when the goal is to reduce repetitive work, improve access to knowledge, or support users with guided automation."
          />
          <RelatedLinks links={content.relatedLinks} />
        </div>
      </ServiceSection>
    </>
  );
}
