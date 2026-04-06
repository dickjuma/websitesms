import { DetailPage } from "@/components/layout/detail-page";
import { genericMarketingPages } from "@/lib/site-data";

const page = genericMarketingPages.process;

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

