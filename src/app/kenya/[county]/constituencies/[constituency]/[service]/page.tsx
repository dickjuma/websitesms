import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConstituencyServicePage } from "@/app/components/kenya-seo/programmatic-pages";
import {
  buildConstituencyServiceMetadata,
  buildConstituencyServicePage,
  getAllCountySlugs,
  getAllConstituencySlugs,
  getAllCoreServiceSlugs,
  getCanonicalCounty,
  getCanonicalConstituency,
  getCoreServiceBySlug,
} from "@/lib/kenya-programmatic-seo";

export function generateStaticParams() {
  return getAllCountySlugs().flatMap((countySlug) =>
    getAllConstituencySlugs(countySlug).flatMap((constituencySlug) =>
      getAllCoreServiceSlugs().map((serviceSlug) => ({
        county: countySlug,
        constituency: constituencySlug,
        service: serviceSlug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string; constituency: string; service: string }>;
}): Promise<Metadata> {
  const { county: countySlug, constituency: constituencySlug, service: serviceSlug } = await params;
  const county = getCanonicalCounty(countySlug);
  const constituency = getCanonicalConstituency(countySlug, constituencySlug);
  const service = getCoreServiceBySlug(serviceSlug);

  if (!county || !constituency || !service) {
    return {};
  }

  return buildConstituencyServiceMetadata(county, constituency, service);
}

export default async function ConstituencyServicePageComponent({
  params,
}: {
  params: Promise<{ county: string; constituency: string; service: string }>;
}) {
  const { county: countySlug, constituency: constituencySlug, service: serviceSlug } = await params;
  const county = getCanonicalCounty(countySlug);
  const constituency = getCanonicalConstituency(countySlug, constituencySlug);
  const service = getCoreServiceBySlug(serviceSlug);

  if (!county || !constituency || !service) {
    notFound();
  }

  const pageData = buildConstituencyServicePage(county, constituency, service);

  return <ConstituencyServicePage page={pageData} />;
}