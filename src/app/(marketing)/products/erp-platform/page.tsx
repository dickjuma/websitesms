export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { DetailPage } from "@/components/layout/detail-page";
import { productDetails } from "@/lib/site-data";

const page = productDetails["erp-platform"];

export const metadata: Metadata = {
  title: "ERP Platform | Enterprise Resource Planning Kenya | SMAS Systems",
  description: "ERP platform for Kenyan businesses. Unified finance, inventory, HR, and operations. Enterprise resource planning solution for growth.",
  keywords: ["ERP platform", "enterprise resource planning", "ERP system Kenya", "business management software", "finance software", "inventory management"],
};

export default function ErpPlatformPage() {
  return <DetailPage eyebrow={page.eyebrow} title={page.title} description={page.description} highlights={page.highlights} capabilities={page.capabilities} outcomes={page.outcomes} relatedLinks={page.relatedLinks} />;
}

