"use client";

interface NextSeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    locale?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    cardType?: string;
    site?: string;
  };
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  additionalLinkTags?: Array<{
    rel: string;
    href: string;
    hrefLang?: string;
  }>;
}

function NextSeo(_props: NextSeoProps) {
  return null;
}

interface ServiceLocationSeoProps {
  service: string;
  location: string;
  county: string;
  description?: string;
  title?: string;
}

export function ServiceLocationSeo({
  service,
  location,
  county,
  description,
  title,
}: ServiceLocationSeoProps) {
  const defaultTitle = `${service} in ${location}, ${county} Kenya | SMA Systems`;
  const seoTitle = title || defaultTitle;
  const defaultDescription = description ||
    `Best ${service.toLowerCase()} in ${location}, ${county}. Affordable professional IT solutions serving ${location} and ${county} area. Get free quote today.`;

  const canonicalUrl = `/services/${service.toLowerCase().replace(/\s+/g, "-")}/${location.toLowerCase().replace(/\s+/g, "-")}`;

  const seoProps: NextSeoProps = {
    title: seoTitle,
    description: defaultDescription,
    canonical: `https://smassystems.com${canonicalUrl}`,
    openGraph: {
      title: seoTitle,
      description: defaultDescription,
      url: `https://smassystems.com${canonicalUrl}`,
      type: "website",
      locale: "en_KE",
      siteName: "SMA Systems",
      images: [
        {
          url: "https://smassystems.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `${service} in ${location}, Kenya`,
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@smassystems",
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content: [
          `${service} ${location}`,
          `${service} ${county}`,
          `${service} Kenya`,
          `best ${service.toLowerCase()} ${location}`,
          `affordable ${service.toLowerCase()} Kenya`,
          `${location} software company`,
          `${location} IT services`,
        ].join(", "),
      },
      {
        name: "geo.region",
        content: "KE",
      },
      {
        name: "geo.placename",
        content: location,
      },
    ],
    additionalLinkTags: [
      {
        rel: "alternate",
        hrefLang: "sw-KE",
        href: `https://smassystems.com${canonicalUrl}?lang=sw`,
      },
    ],
  };

  return <NextSeo {...seoProps} />;
}

interface CountySeoProps {
  county: string;
  region: string;
  majorTown: string;
  title?: string;
}

export function CountySeo({ county, region, majorTown, title }: CountySeoProps) {
  const seoTitle = title || `IT Services in ${county} Kenya | SMA Systems`;
  const description = `Best IT and software services in ${county}, Kenya. Professional ERP, POS, web development, and more serving ${majorTown} and all ${county} region.`;

  const seoProps: NextSeoProps = {
    title: seoTitle,
    description,
    canonical: `https://smassystems.com/services/location/${county.toLowerCase().replace(/\s+/g, "-")}`,
    openGraph: {
      title: seoTitle,
      description,
      url: `https://smassystems.com/services/location/${county.toLowerCase().replace(/\s+/g, "-")}`,
      type: "website",
      locale: "en_KE",
      siteName: "SMA Systems",
    },
    twitter: {
      cardType: "summary_large_image",
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content: [
          `software development ${county}`,
          `IT services ${county}`,
          `ERP systems ${county}`,
          `${county} software company`,
          `business software ${majorTown}`,
          `${region} IT services`,
        ].join(", "),
      },
    ],
  };

  return <NextSeo {...seoProps} />;
}

interface ConstituencySeoProps {
  service: string;
  location: string;
  county: string;
  region: string;
}

export function ConstituencySeo({
  service,
  location,
  county,
  region,
}: ConstituencySeoProps) {
  const seoTitle = `${service} in ${location}, ${county} Kenya | SMA Systems`;
  const description = `Best ${service.toLowerCase()} in ${location}, ${county}. Professional IT solutions for businesses in ${location} and ${county} region.`;

  const canonicalUrl = `/services/${service.toLowerCase().replace(/\s+/g, "-")}/${county.toLowerCase().replace(/\s+/g, "-")}/${location.toLowerCase().replace(/\s+/g, "-")}`;

  const seoProps: NextSeoProps = {
    title: seoTitle,
    description,
    canonical: `https://smassystems.com${canonicalUrl}`,
    openGraph: {
      title: seoTitle,
      description,
      url: `https://smassystems.com${canonicalUrl}`,
      type: "website",
      locale: "en_KE",
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content: [
          `${service} ${location}`,
          `${service} ${county}`,
          `best ${service.toLowerCase()} ${location}`,
          `${location} IT services`,
        ].join(", "),
      },
      {
        name: "geo.region",
        content: "KE",
      },
      {
        name: "geo.placename",
        content: location,
      },
    ],
  };

  return <NextSeo {...seoProps} />;
}
