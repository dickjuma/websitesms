import { DetailPage } from "@/components/layout/detail-page";
import { platformPages } from "@/lib/site-data";

const page = platformPages.projects;

export default function ProjectsPage() {
  return <DetailPage section="platform" eyebrow={page.eyebrow} title={page.title} description={page.description} highlights={page.highlights} capabilities={page.capabilities} outcomes={page.outcomes} relatedLinks={page.relatedLinks} />;
}

