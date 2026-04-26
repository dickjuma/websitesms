import { notFound, redirect } from "next/navigation";

import { getCanonicalCounty, getCoreServiceBySlug } from "@/lib/kenya-programmatic-seo";

export default async function LegacyNestedServiceCountyRedirect({
  params,
}: {
  params: Promise<{ service: string; county: string; rest: string[] }>;
}) {
  const { service: serviceSlug, county: countySlug } = await params;
  const service = getCoreServiceBySlug(serviceSlug);
  const county = getCanonicalCounty(countySlug);

  if (!service || !county) {
    notFound();
  }

  redirect(`/kenya/${county.slug}/${service.slug}`);
}
