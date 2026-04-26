import { notFound, redirect } from "next/navigation";

import { getCanonicalCounty } from "@/lib/kenya-programmatic-seo";

export default async function LegacyCountyRedirect({
  params,
}: {
  params: Promise<{ county: string }>;
}) {
  const { county: countySlug } = await params;
  const county = getCanonicalCounty(countySlug);

  if (!county) {
    notFound();
  }

  redirect(`/kenya/${county.slug}`);
}
