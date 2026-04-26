export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { DetailPage } from "@/components/layout/detail-page";
import { productDetails } from "@/lib/site-data";

const page = productDetails["crm-platform"];

export const metadata: Metadata = {
  title: "CRM Platform | Customer Relationship Management Kenya | SMAS Systems",
  description: "CRM platform for Kenyan businesses. Manage leads, automate sales, track customer interactions. Powerful CRM solution for growth.",
  keywords: ["CRM platform", "customer relationship management", "sales CRM Kenya", "lead management", "sales automation", "customer tracking"],
};

export default function CrmPlatformPage() {
  return <DetailPage eyebrow={page.eyebrow} title={page.title} description={page.description} highlights={page.highlights} capabilities={page.capabilities} outcomes={page.outcomes} relatedLinks={page.relatedLinks} />;
}

