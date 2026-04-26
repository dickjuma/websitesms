import type { Metadata } from "next";

import {
  services as marketingServices,
  getServiceBySlug,
  type Service,
} from "@/app/(marketing)/services/_data";
import {
  getConstituencyBySlug,
  getCountyBySlug,
  kenyanCounties,
  type KenyanCounty,
} from "@/lib/location-seo/counties";

const BASE_URL = "https://smassystems.com";

export type LocationFaqItem = {
  question: string;
  answer: string;
};

export type LocationServiceInfo = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: { label: string }[];
  features: { title: string; description: string }[];
  process: { title: string; description: string }[];
  relatedServices: string[];
  imageSrc: string;
  imageAlt: string;
};

export type ResolvedLocationRoute =
  | {
      kind: "service";
      serviceSlug: string;
      serviceInfo: LocationServiceInfo;
      canonicalPath: string;
      title: string;
      description: string;
      keywords: string[];
    }
  | {
      kind: "county";
      county: KenyanCounty;
      canonicalPath: string;
      title: string;
      description: string;
      keywords: string[];
    }
  | {
      kind: "service-county";
      county: KenyanCounty;
      serviceSlug: string;
      serviceInfo: LocationServiceInfo;
      canonicalPath: string;
      title: string;
      description: string;
      keywords: string[];
    }
  | {
      kind: "service-constituency";
      county: KenyanCounty;
      constituency: string;
      constituencySlug: string;
      serviceSlug: string;
      serviceInfo: LocationServiceInfo;
      canonicalPath: string;
      title: string;
      description: string;
      keywords: string[];
    };

export const locationSeoServices = marketingServices;
export const locationSeoCounties = kenyanCounties;

export function slugifyLocationPart(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function formatSlugLabel(value: string) {
  return value
    .replace(/-/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getServiceInfo(service: Service): LocationServiceInfo {
  return {
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    tags: service.tags.map(t => ({ label: typeof t === 'string' ? t : t.label })),
    features: service.features.map(f => ({ title: f.title, description: f.description })),
    process: service.process.map(p => ({ title: p.title, description: p.description })),
    relatedServices: service.relatedServices,
    imageSrc: service.imageSrc,
    imageAlt: service.imageAlt,
  };
}

function buildCountyKeywords(county: KenyanCounty) {
  return [
    `software company in ${county.name}`,
    `web development in ${county.name}`,
    `ERP systems in ${county.name}`,
    `POS systems in ${county.name}`,
    `${county.majorTown} software developers`,
    ...county.keywords,
  ];
}

function buildServiceCountyKeywords(service: Service, county: KenyanCounty) {
  return [
    `${service.title} in ${county.name}`,
    `${service.title} ${county.majorTown}`,
    `${service.slug.replace(/-/g, " ")} ${county.name}`,
    `${service.title.toLowerCase()} company ${county.name}`,
    ...service.tags.map((tag) => `${service.title} ${tag.label} ${county.name}`),
    ...county.keywords,
  ];
}

function buildServiceConstituencyKeywords(service: Service, county: KenyanCounty, constituency: string) {
  return [
    `${service.title} in ${constituency}`,
    `${service.title} in ${constituency} ${county.name}`,
    `${service.slug.replace(/-/g, " ")} ${constituency}`,
    `${constituency} ${service.title.toLowerCase()}`,
    `${county.majorTown} ${service.title}`,
    ...county.keywords,
  ];
}

export function resolveLocationRoute(slug: string[]): ResolvedLocationRoute | null {
  if (slug.length === 1) {
    const service = getServiceBySlug(slug[0]);
    if (service) {
      return {
        kind: "service",
        serviceSlug: service.slug,
        serviceInfo: getServiceInfo(service),
        canonicalPath: `/services/${service.slug}`,
        title: `${service.title} | SMA Systems Kenya`,
        description: service.fullDescription,
        keywords: [...service.tags.map(t => t.label), ...service.features.map(f => f.title)],
      };
    }

    const county = getCountyBySlug(slug[0]);
    if (!county) return null;

    return {
      kind: "county",
      county,
      canonicalPath: `/services/location/${county.slug}`,
      title: `Software Development, ERP, POS and Web Design in ${county.name} | SMA Systems`,
      description: `${county.description} SMA Systems supports teams in ${county.name} with custom software development, ERP systems, POS systems, websites, cloud infrastructure, and process automation.`,
      keywords: buildCountyKeywords(county),
    };
  }

  if (slug.length === 2) {
    const service = getServiceBySlug(slug[0]);
    const county = getCountyBySlug(slug[1]);
    if (!service || !county) return null;

    return {
      kind: "service-county",
      serviceSlug: service.slug,
      serviceInfo: getServiceInfo(service),
      county,
      canonicalPath: `/services/${service.slug}/${county.slug}`,
      title: `${service.title} in ${county.name} | SMA Systems Kenya`,
      description: `${service.fullDescription} We help businesses in ${county.name} and ${county.majorTown} plan, build, deploy, and improve ${service.title.toLowerCase()} work with practical delivery and local business context.`,
      keywords: buildServiceCountyKeywords(service, county),
    };
  }

  if (slug.length === 3) {
    const service = getServiceBySlug(slug[0]);
    const county = getCountyBySlug(slug[1]);
    if (!service || !county) return null;

    const constituency = getConstituencyBySlug(county.slug, slug[2]);
    if (!constituency) return null;

    return {
      kind: "service-constituency",
      serviceSlug: service.slug,
      serviceInfo: getServiceInfo(service),
      county,
      constituency,
      constituencySlug: slug[2],
      canonicalPath: `/services/${service.slug}/${county.slug}/${slug[2]}`,
      title: `${service.title} in ${constituency}, ${county.name} | SMA Systems`,
      description: `Need ${service.title.toLowerCase()} in ${constituency}, ${county.name}? SMA Systems supports businesses across ${county.name} with strategy, delivery, and support for websites, software platforms, operations tooling, and production systems.`,
      keywords: buildServiceConstituencyKeywords(service, county, constituency),
    };
  }

  return null;
}

export function buildLocationMetadata(route: ResolvedLocationRoute): Metadata {
  const canonicalUrl = `${BASE_URL}${route.canonicalPath}`;

  return {
    title: route.title,
    description: route.description,
    keywords: route.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function getLocationBreadcrumbs(route: ResolvedLocationRoute) {
  const breadcrumbs = [
    { name: "Home", item: BASE_URL },
    { name: "Services", item: `${BASE_URL}/services` },
  ];

  if (route.kind === "service") {
    breadcrumbs.push({
      name: route.serviceInfo.title,
      item: `${BASE_URL}${route.canonicalPath}`,
    });
    return breadcrumbs;
  }

  if (route.kind === "county") {
    breadcrumbs.push({
      name: route.county.name,
      item: `${BASE_URL}${route.canonicalPath}`,
    });

    return breadcrumbs;
  }

  breadcrumbs.push({
    name: route.serviceInfo.title,
    item: `${BASE_URL}/services/${route.serviceSlug}`,
  });

  breadcrumbs.push({
    name: route.county.name,
    item: `${BASE_URL}/services/${route.serviceSlug}/${route.county.slug}`,
  });

  if (route.kind === "service-constituency") {
    breadcrumbs.push({
      name: route.constituency,
      item: `${BASE_URL}${route.canonicalPath}`,
    });
  }

  return breadcrumbs;
}

export function getLocationPageFaqs(route: ResolvedLocationRoute): LocationFaqItem[] {
  if (route.kind === "service") {
    return [
      {
        question: `What does SMA Systems provide for ${route.serviceInfo.title.toLowerCase()}?`,
        answer: `We deliver ${route.serviceInfo.title.toLowerCase()} solutions tailored to your business needs, from planning and development to deployment and ongoing support.`,
      },
      {
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on scope. Small projects may take 4-8 weeks, while enterprise solutions typically take 12-24 weeks.",
      },
      {
        question: "Do you offer ongoing support?",
        answer: "Yes, we provide ongoing maintenance, updates, and support services to ensure your solution continues to meet your business needs.",
      },
    ];
  }

  if (route.kind === "county") {
    return [
      {
        question: `What software services does SMA Systems offer in ${route.county.name}?`,
        answer: `We support businesses in ${route.county.name} with custom software development, web platforms, ERP systems, POS systems, cloud delivery, automation, and other practical digital operations work.`,
      },
      {
        question: `Do you work with businesses outside ${route.county.majorTown}?`,
        answer: `Yes. We support teams across ${route.county.name}, including businesses operating from ${route.county.majorTown}, surrounding towns, and the listed constituencies in the county.`,
      },
      {
        question: `How do local service pages for ${route.county.name} help?`,
        answer: `They make it easier to navigate from the county hub into service-specific pages and then into constituency-level pages, so buyers and search engines can follow the same clean location hierarchy.`,
      },
    ];
  }

  if (route.kind === "service-county") {
    return [
      {
        question: `Do you provide ${route.serviceInfo.title.toLowerCase()} for businesses across ${route.county.name}?`,
        answer: `Yes. We work with teams across ${route.county.name} and ${route.county.majorTown} on planning, implementation, rollout, and ongoing improvement for ${route.serviceInfo.title.toLowerCase()} projects.`,
      },
      {
        question: `How is ${route.serviceInfo.title.toLowerCase()} scoped for ${route.county.name} businesses?`,
        answer: `We usually start with workflows, users, data, integrations, and rollout constraints so the solution matches the operating reality of businesses in ${route.county.name} rather than forcing a generic setup.`,
      },
      {
        question: `Can SMA Systems support multi-branch or distributed teams in ${route.county.name}?`,
        answer: `Yes. Many of our service engagements cover multi-branch operations, remote teams, branch reporting, and role-based access so the delivery works across more than one site in ${route.county.name}.`,
      },
      {
        question: `Do you also serve specific constituencies in ${route.county.name}?`,
        answer: `Yes. This county page links into deeper constituency pages so businesses can move from the main ${route.county.name} service hub into more specific local routes when needed.`,
      },
    ];
  }

  return [
    {
      question: `Do you offer ${route.serviceInfo.title.toLowerCase()} in ${route.constituency}, ${route.county.name}?`,
      answer: `Yes. We support businesses in ${route.constituency} and across ${route.county.name} with planning, delivery, and support for ${route.serviceInfo.title.toLowerCase()} projects.`,
    },
    {
      question: `What kinds of businesses in ${route.constituency} use this service?`,
      answer: `The service is typically relevant for teams that need stronger process control, better data visibility, cleaner customer journeys, or more reliable digital operations in ${route.constituency}.`,
    },
    {
      question: `Can the work start remotely for ${route.constituency} clients?`,
      answer: `Yes. Discovery, planning, design review, implementation updates, and support can all start remotely while still being scoped for the business context in ${route.constituency} and the wider ${route.county.name} market.`,
    },
    {
      question: `Is there a broader ${route.county.name} page for this service?`,
      answer: `Yes. This constituency page sits under the main ${route.serviceInfo.title} page for ${route.county.name}, which also links to related constituencies and other location-specific routes.`,
    },
  ];
}

export function getLocationStaticSlugs() {
  const staticSlugs: string[][] = [];

  for (const service of marketingServices) {
    staticSlugs.push([service.slug]);
  }

  for (const county of kenyanCounties) {
    staticSlugs.push([county.slug]);

    for (const service of marketingServices) {
      staticSlugs.push([service.slug, county.slug]);

      for (const constituency of county.constituencies) {
        staticSlugs.push([service.slug, county.slug, slugifyLocationPart(constituency)]);
      }
    }
  }

  return staticSlugs;
}
