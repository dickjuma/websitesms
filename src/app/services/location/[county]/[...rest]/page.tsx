import { notFound, redirect } from "next/navigation";

import { getCanonicalCounty } from "@/lib/kenya-programmatic-seo";

export default async function LegacyCountyNestedRedirect({
  params,
}: {
  params: Promise<{ county: string; rest: string[] }>;
}) {
  const { county: countySlug } = await params;
  const county = getCanonicalCounty(countySlug);

  if (!county) {
    notFound();
  }

  redirect(`/kenya/${county.slug}`);
}
