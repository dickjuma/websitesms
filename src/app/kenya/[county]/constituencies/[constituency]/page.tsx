import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConstituencyHubPage } from "@/app/components/kenya-seo/programmatic-pages";
import {
  buildConstituencyHubMetadata,
  buildConstituencyHubPage,
  getAllCountySlugs,
  getCanonicalCounty,
  getAllConstituencySlugs,
  getCanonicalConstituency,
} from "@/lib/kenya-programmatic-seo";

export function generateStaticParams() {
  return getAllCountySlugs().flatMap((countySlug) =>
    getAllConstituencySlugs(countySlug).map((constituencySlug) => ({
      county: countySlug,
      constituency: constituencySlug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string; constituency: string }>;
}): Promise<Metadata> {
  const { county: countySlug, constituency: constituencySlug } = await params;
  const county = getCanonicalCounty(countySlug);
  const constituency = getCanonicalConstituency(countySlug, constituencySlug);

  if (!county || !constituency) {
    return {};
  }

  return buildConstituencyHubMetadata(county, constituency);
}

export default async function ConstituencyPage({
  params,
}: {
  params: Promise<{ county: string; constituency: string }>;
}) {
  const { county: countySlug, constituency: constituencySlug } = await params;
  const county = getCanonicalCounty(countySlug);
  const constituency = getCanonicalConstituency(countySlug, constituencySlug);

  if (!county || !constituency) {
    notFound();
  }

  const pageData = buildConstituencyHubPage(county, constituency);

  return <ConstituencyHubPage page={pageData} />;
}