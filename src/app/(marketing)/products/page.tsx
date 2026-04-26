export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import { CtaBanner, PageHero, SectionGrid, SectionIntro, SiteShell } from "@/components/layout/site-shell";
import { productItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Products | Enterprise Software Platforms | SMAS Systems",
  description: "Explore our software products: CRM, ERP, HR systems, and more. Scalable enterprise platforms built for Kenyan businesses.",
  keywords: ["products", "enterprise software", "CRM platform", "ERP platform", "HR system", "business software Kenya"],
  openGraph: {
    title: "Products | Enterprise Software Platforms | SMAS Systems",
    description: "Explore our enterprise software products built for Kenyan businesses.",
  },
};

export default function ProductsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Products"
        title="Platform product directions for modern business operations"
        description="Explore product-style pages for CRM, ERP, and HR systems that connect with the wider service and solution story."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionIntro
          eyebrow="Products"
          title="Platform options with less repetition"
          description="CRM, ERP, and HR product pages now read as clean product directions instead of repeating the same intro pattern over and over."
        />
        <div className="mt-14">
          <SectionGrid items={productItems} />
        </div>
      </section>
      <CtaBanner />
    </SiteShell>
  );
}
