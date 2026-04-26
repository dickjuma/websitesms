import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CountyHubPage } from "@/app/components/kenya-seo/programmatic-pages";
import {
  buildCountyHubMetadata,
  buildCountyHubPage,
  getAllCountySlugs,
  getCanonicalCounty,
} from "@/lib/kenya-programmatic-seo";

export function generateStaticParams() {
  return getAllCountySlugs().map((county) => ({ county }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string }>;
}): Promise<Metadata> {
  const { county: countySlug } = await params;
  const county = getCanonicalCounty(countySlug);

  if (!county) {
    return {
      title: "Location Not Found | SMA Systems",
      robots: { index: false, follow: false },
    };
  }

  return buildCountyHubMetadata(county);
}

export default async function KenyaCountyPage({
  params,
}: {
  params: Promise<{ county: string }>;
}) {
  const { county: countySlug } = await params;
  const county = getCanonicalCounty(countySlug);

  if (!county) {
    notFound();
  }

  return <CountyHubPage page={buildCountyHubPage(county)} />;
}
