interface DefaultSeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    type?: string;
    locale?: string;
    url?: string;
    siteName?: string;
    title?: string;
    description?: string;
    images?: { url: string; width?: number; height?: number; alt?: string }[];
  };
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: string;
    title?: string;
    description?: string;
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
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      "max-image-preview"?: "none" | "standard" | "large";
      "max-snippet"?: number;
    };
  };
}

function DefaultSeo({ title, description, canonical, openGraph, twitter }: DefaultSeoProps) {
  return null;
}

const defaultProps: DefaultSeoProps = {
  title: "SMA Systems - ERP & POS Provider in Kenya",
  description:
    "SMA Systems is Kenya's leading ERP and POS provider. We build custom ERP systems, POS software, inventory management, CRM, and business automation solutions for enterprises across Africa.",
  canonical: "https://smassystems.com",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://smassystems.com",
    siteName: "SMA Systems",
    title: "SMA Systems - Software Development Company in Kenya",
    description:
      "SMA Systems is a leading software development company in Kenya. We specialize in custom websites, mobile apps, ERP systems, POS systems, AI solutions, and enterprise software for businesses across Africa.",
    images: [
      {
        url: "https://smassystems.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SMA Systems - Software Development Company in Kenya",
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
    title: "SMA Systems - Software Development Company in Kenya",
    description:
      "Leading software development company in Kenya. Custom websites, mobile apps, ERP, POS, and AI solutions for African businesses.",
    site: "@smassystems",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "ERP provider Kenya, POS system Kenya, ERP software Kenya, inventory management system Kenya, CRM Kenya, business automation Kenya, enterprise software Kenya, point of sale Kenya, Nairobi ERP company, POS developers Kenya, web development Kenya, mobile app development Kenya, software company Nairobi",
    },
    {
      name: "geo.region",
      content: "KE",
    },
    {
      name: "geo.placename",
      content: "Nairobi",
    },
    {
      name: "author",
      content: "SMA Systems",
    },
    {
      property: "fb:app_id",
      content: "",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/images/favicon.ico",
    },
    {
      rel: "shortcut icon",
      href: "/images/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/images/favicon.ico",
    },
    {
      rel: "alternate",
      hrefLang: "en-KE",
      href: "https://smassystems.com",
    },
    {
      rel: "alternate",
      hrefLang: "sw-KE",
      href: "https://smassystems.com",
    },
    {
      rel: "alternate",
      hrefLang: "en-UG",
      href: "https://smassystems.com/uganda",
    },
    {
      rel: "alternate",
      hrefLang: "en-TZ",
      href: "https://smassystems.com/tanzania",
    },
    {
      rel: "alternate",
      hrefLang: "en-RW",
      href: "https://smassystems.com/rwanda",
    },
    {
      rel: "alternate",
      hrefLang: "en-CD",
      href: "https://smassystems.com/drc",
    },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function DefaultSEO() {
  return <DefaultSeo {...defaultProps} />;
}
