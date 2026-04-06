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
import { mobileAppContent as content } from "../_content";

export const metadata: Metadata = {
  title: content.title,
  description: content.summary,
};

export default function MobileAppDevelopmentPage() {
  return (
    <>
      <ServiceHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryLabel="Discuss Your App Idea"
        stats={[
          { label: "Audience", value: "Customers and internal teams" },
          { label: "Delivery", value: "Cross-platform ready" },
          { label: "Need", value: "Launch-quality polish" },
        ]}
      />

      <ServiceSection className="py-18">
        <SectionHeading
          eyebrow="Mobile Experience"
          title={content.summary}
          description="The mobile route is arranged around usage realities: speed, device behavior, notifications, integrations, and how the app will be supported after release."
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <HighlightRibbon items={content.highlights} />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            {content.capabilities[0]}
          </div>
          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            {content.capabilities[1]}
          </div>
          <div className="rounded-[1.8rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            {content.capabilities[2]}
          </div>
        </div>
      </ServiceSection>

      <ServiceSection className="pb-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-8">
            <BulletPanel title="Why the route matters" description="Strong mobile work depends on getting the repeated user moments right, not just shipping screens." items={content.outcomes} variant="blue" />
            <BulletPanel title="Release decisions" description="These are the questions that shape the delivery path before the build deepens." items={content.considerations} />
          </div>
          <ImageFrame src={content.imageSrc} alt={content.imageAlt} aspectClassName="aspect-[4/5]" />
        </div>
      </ServiceSection>
      <ServiceSection className="py-12 pb-12">
        <BookDemoCTA />
      </ServiceSection>
      <ServiceSection className="py-8 pb-24">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Release Roadmap</p>
            <div className="mt-6">
              <StepsTimeline steps={content.steps} />
            </div>
          </div>
          <div className="space-y-8">
            <ActionCard
              title="Strong fit for products that must work well in people’s hands every day"
              description="This route is best when users need speed, clarity, repeat usage comfort, and a release plan that supports live mobile operations."
            />
            <RelatedLinks links={content.relatedLinks} />
          </div>
        </div>
      </ServiceSection>
    </>
  );
}
