import type { Metadata } from "next";
import { DetailPage } from "@/components/layout/detail-page";
import { genericMarketingPages } from "@/lib/site-data";

const page = genericMarketingPages.process;

export const metadata: Metadata = {
  title: "Our Process | Software Development Methodology | SMAS Systems",
  description: "Learn about our software development process. From discovery to deployment, we follow proven methodologies to deliver quality solutions on time.",
  keywords: ["software development process", "development methodology", "project delivery", "agile development", "software development stages"],
  openGraph: {
    title: "Our Process | Software Development Methodology | SMAS Systems",
    description: "Learn about our software development process and how we deliver quality solutions on time.",
  },
};

export default function ProcessPage() {
  return (
    <DetailPage
      activeHref="/process"
      eyebrow={page.eyebrow}
      title={page.title}
      description={page.description}
      highlights={page.highlights}
      capabilities={page.capabilities}
      outcomes={page.outcomes}
      relatedLinks={page.relatedLinks}
    />
  );
}

