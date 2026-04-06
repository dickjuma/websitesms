import { CtaBanner, PageHero, SectionGrid, SectionIntro, SiteShell } from "@/components/layout/site-shell";
import { productItems } from "@/lib/site-data";

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
