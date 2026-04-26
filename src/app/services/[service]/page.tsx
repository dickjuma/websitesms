import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ServicePage as ServicePageComponent } from "@/app/components/kenya-seo/programmatic-pages";
import {
  buildServiceMasterPage,
  buildServiceMetadata,
  getAllCoreServiceSlugs,
  getCoreServiceBySlug,
} from "@/lib/kenya-programmatic-seo";

export function generateStaticParams() {
  return getAllCoreServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getCoreServiceBySlug(serviceSlug);

  if (!service) {
    return {
      title: "Service Not Found | SMA Systems",
      robots: { index: false, follow: false },
    };
  }

  return buildServiceMetadata(service);
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: serviceSlug } = await params;
  const service = getCoreServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  if (service.slug !== serviceSlug) {
    redirect(`/services/${service.slug}`);
  }

  return <ServicePageComponent page={buildServiceMasterPage(service)} />;
}
