import { BreadcrumbJsonLd, FAQJsonLd, LocalBusinessJsonLd } from "next-seo";

import type { ResolvedLocationRoute } from "@/lib/location-seo/service-location-pages";
import { getLocationBreadcrumbs, getLocationPageFaqs } from "@/lib/location-seo/service-location-pages";
import { DEFAULT_OG_IMAGE, EMAIL, PHONE } from "@/lib/seo/config";

export function LocationRouteJsonLd({ route }: { route: ResolvedLocationRoute }) {
  const canonicalUrl = `https://smassystems.com${route.canonicalPath}`;
  
  let areaServed: string[] = [];
  if (route.kind === "service") {
    areaServed = ["Kenya"];
  } else if (route.kind === "service-constituency") {
    areaServed = [route.constituency, route.county.name, "Kenya"];
  } else if (route.kind === "service-county" || route.kind === "county") {
    areaServed = [route.county.name, "Kenya"];
  }
  
  const faqs = getLocationPageFaqs(route);

  return (
    <>
      <BreadcrumbJsonLd items={getLocationBreadcrumbs(route)} />
      <LocalBusinessJsonLd
        type="ProfessionalService"
        name={route.title.replace(/\s+\|\s+SMA Systems(?: Kenya)?$/, "")}
        description={route.description}
        url={canonicalUrl}
        telephone={PHONE}
        email={EMAIL}
        image={DEFAULT_OG_IMAGE}
        areaServed={areaServed}
        address={{
          streetAddress: "Nairobi, Kenya",
          addressLocality: "Nairobi",
          addressRegion: "Nairobi County",
          addressCountry: "KE",
        }}
      />
      <FAQJsonLd questions={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))} />
    </>
  );
}
