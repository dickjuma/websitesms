import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ServicePage } from "@/app/components/kenya-seo/programmatic-pages";
import {
  buildCountyServiceMetadata,
  buildCountyServicePage,
  getAllCountySlugs,
  getAllCoreServiceSlugs,
  getCanonicalCounty,
  getCoreServiceBySlug,
} from "@/lib/kenya-programmatic-seo";

export function generateStaticParams() {
  return getAllCountySlugs().flatMap((county) =>
    getAllCoreServiceSlugs().map((service) => ({
      county,
      service,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string; service: string }>;
}): Promise<Metadata> {
  const { county: countySlug, service: serviceSlug } = await params;
  const county = getCanonicalCounty(countySlug);
  const service = getCoreServiceBySlug(serviceSlug);

  if (!county || !service) {
    return {};
  }

  return buildCountyServiceMetadata(service, county);
}

export default async function CountyServicePage({
  params,
}: {
  params: Promise<{ county: string; service: string }>;
}) {
  const { county: countySlug, service: serviceSlug } = await params;
  const county = getCanonicalCounty(countySlug);
  const service = getCoreServiceBySlug(serviceSlug);

  if (!county || !service) {
    notFound();
  }

  const pageData = buildCountyServicePage(service, county);

  return <ServicePage page={pageData} />;
}