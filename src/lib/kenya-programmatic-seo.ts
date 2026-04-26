import type { Metadata } from "next";

import { getCountyBySlug, kenyanCounties, type KenyanCounty } from "@/lib/location-seo/counties";
import * as constituencyFunctions from "./constituency-functions";

export const BASE_URL = "https://smassystems.com";
export const BRAND_NAME = "SMA Systems and Softwares";
export const COUNTRY_NAME = "Kenya";
export const WHATSAPP_NUMBER = "254719832719";

export type CoreServiceSlug =
  | "pos-systems"
  | "erp-software"
  | "web-development"
  | "custom-software";

export type LinkCard = {
  href: string;
  title: string;
  description: string;
  eyebrow?: string;
  image?: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LinkSection = {
  title: string;
  description: string;
  cards: LinkCard[];
};

export type ServicePageData = {
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalPath: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  backgroundPrompt: string;
  introTitle: string;
  introParagraphs: string[];
  trustSignals: string[];
  benefitsTitle: string;
  benefits: string[];
  featuresTitle: string;
  features: FeatureItem[];
  industriesTitle: string;
  industries: string[];
  processTitle: string;
  process: ProcessStep[];
  faqTitle: string;
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  linkSection: LinkSection;
  image: string;
  jsonLd: Array<Record<string, unknown>>;
};

export type CountyHubPageData = {
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalPath: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introParagraphs: string[];
  trustSignals: string[];
  servicesSection: LinkSection;
  faqTitle: string;
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  jsonLd: Array<Record<string, unknown>>;
};

export type DirectoryPageData = {
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalPath: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introParagraphs: string[];
  primarySection: LinkSection;
  secondarySection?: LinkSection;
  ctaTitle: string;
  ctaDescription: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  jsonLd: Array<Record<string, unknown>>;
};

export type MasterService = {
  slug: CoreServiceSlug;
  aliases: string[];
  title: string;
  shortDescription: string;
  masterIntro: string[];
  genericBenefits: string[];
  features: FeatureItem[];
  industries: string[];
  process: ProcessStep[];
  relatedServices: CoreServiceSlug[];
  keywordVariants: string[];
  image: string;
};

export const coreServices: MasterService[] = [
  {
    slug: "pos-systems",
    aliases: [],
    title: "POS Systems",
    shortDescription:
      "Affordable and powerful sales, billing, stock control, and reporting solutions for retail and hospitality businesses.",
    masterIntro: [
      "POS systems bring billing, payments, inventory control, and reporting into one workflow so businesses can sell faster and make better daily decisions.",
      "For shops, restaurants, pharmacies, supermarkets, and multi-branch retailers in Kenya, a solid POS setup reduces manual errors, improves stock accuracy, and keeps sales teams aligned.",
      "SMA Systems uses the POS master page as the source template for every county SEO target page, so the service stays consistent while the business context is localized.",
    ],
    genericBenefits: [
      "Faster billing and shorter queues at checkout",
      "Better stock visibility across products and branches",
      "Cleaner cashier accountability and daily reconciliation",
      "Practical reporting for owners and managers",
    ],
    features: [
      {
        title: "Billing system",
        description: "Fast checkout with barcode support, discounts, receipts, and multiple payment methods.",
      },
      {
        title: "Inventory management",
        description: "Track stock movement, low-stock alerts, product variants, and branch-level inventory in one place.",
      },
      {
        title: "Reports",
        description: "View daily sales, top products, cashier performance, stock movement, and profit trends.",
      },
      {
        title: "Multi-user access",
        description: "Manage owners, supervisors, cashiers, and branch staff with role-based permissions.",
      },
    ],
    industries: ["Retail shops", "Supermarkets", "Pharmacies", "Restaurants", "Hardware stores"],
    process: [
      {
        title: "Consultation",
        description: "We review your sales flow, stock process, branches, and reporting expectations.",
      },
      {
        title: "Setup",
        description: "We configure products, tills, users, taxes, payment methods, and receipt templates.",
      },
      {
        title: "Customization",
        description: "We tailor workflows, permissions, reports, and integrations to the way your business runs.",
      },
      {
        title: "Deployment",
        description: "We install, onboard staff, and make sure the POS environment is ready for live selling.",
      },
      {
        title: "Support",
        description: "We stay available for fixes, reporting changes, training refreshers, and growth updates.",
      },
    ],
    relatedServices: ["erp-software", "web-development", "custom-software"],
    keywordVariants: ["pos systems", "point of sale systems", "pos software", "retail pos"],
    image: "/pos_system.jpg",
  },
  {
    slug: "erp-software",
    aliases: ["erp-systems"],
    title: "ERP Software",
    shortDescription:
      "Integrated finance, operations, inventory, procurement, HR, and reporting software for growing businesses.",
    masterIntro: [
      "ERP software connects departments that often operate in silos so management can run finance, stock, procurement, HR, and reporting from one source of truth.",
      "Businesses in Kenya use ERP systems to reduce spreadsheet dependence, tighten controls, and improve visibility across branches, departments, and approval flows.",
      "SMA Systems provides comprehensive ERP solutions tailored for the Kenyan market, with local payment integration and support for businesses of all sizes.",
    ],
    genericBenefits: [
      "Centralized data across departments and branches",
      "Stronger reporting for finance and operations teams",
      "Less manual reconciliation and duplicate entry",
      "Better controls for approvals, users, and audits",
    ],
    features: [
      {
        title: "Finance and accounting",
        description: "Manage invoicing, receivables, payables, budgeting, and business reporting from one system.",
      },
      {
        title: "Inventory and procurement",
        description: "Track stock, purchasing, suppliers, reorder workflows, and movement across locations.",
      },
      {
        title: "Operations workflows",
        description: "Coordinate internal approvals, task ownership, branch processes, and status visibility.",
      },
      {
        title: "Multi-user access",
        description: "Give each team the right permissions, dashboards, and approvals for their role.",
      },
    ],
    industries: ["Distributors", "Manufacturers", "Schools", "Healthcare providers", "Multi-branch businesses"],
    process: [
      {
        title: "Consultation",
        description: "We map departments, approvals, current bottlenecks, and reporting requirements.",
      },
      {
        title: "Setup",
        description: "We define modules, users, permissions, master data, and implementation scope.",
      },
      {
        title: "Customization",
        description: "We align workflows, dashboards, forms, and reports to your actual operations.",
      },
      {
        title: "Deployment",
        description: "We roll out the ERP environment, migrate data, and train teams for adoption.",
      },
      {
        title: "Support",
        description: "We refine modules, troubleshoot issues, and support the ERP as your processes evolve.",
      },
    ],
    relatedServices: ["pos-systems", "web-development", "custom-software"],
    keywordVariants: ["erp software", "erp systems", "enterprise resource planning", "business management software"],
    image: "/custom-software-development.jpg",
  },
  {
    slug: "web-development",
    aliases: [],
    title: "Web Development",
    shortDescription:
      "Professional websites, portals, and web applications built to generate leads, support operations, and strengthen visibility.",
    masterIntro: [
      "Web development covers business websites, custom portals, e-commerce platforms, and internal web applications used to market, sell, and manage operations.",
      "For businesses in Kenya, a strong website is not just a design asset. It is a sales channel, a trust signal, and a platform for enquiries, support, or internal workflow.",
      "SMA Systems keeps the core web development service content in one master source and injects county context into the SEO target pages that sit below it.",
    ],
    genericBenefits: [
      "Stronger online visibility and local search presence",
      "Better conversion paths for enquiries and lead capture",
      "Mobile-first performance for Kenyan users",
      "A website structure that can grow with your business",
    ],
    features: [
      {
        title: "Responsive design",
        description: "Websites and portals that work cleanly across phones, tablets, and desktops.",
      },
      {
        title: "Content and CMS setup",
        description: "Manage pages, media, updates, and service content without constant developer dependence.",
      },
      {
        title: "SEO-ready structure",
        description: "Fast pages, metadata, internal linking, and clean route patterns for discoverability.",
      },
      {
        title: "Integrations and forms",
        description: "Connect forms, CRMs, WhatsApp flows, analytics, payments, and internal tools.",
      },
    ],
    industries: ["Professional firms", "Schools", "Hotels", "Clinics", "Distributors"],
    process: [
      {
        title: "Consultation",
        description: "We define goals, user journeys, pages, integrations, and conversion points.",
      },
      {
        title: "Setup",
        description: "We establish structure, technology, content blocks, analytics, and hosting expectations.",
      },
      {
        title: "Customization",
        description: "We tailor design, content, forms, SEO structure, and backend logic where needed.",
      },
      {
        title: "Deployment",
        description: "We launch the site, verify performance, and ensure the team can manage updates.",
      },
      {
        title: "Support",
        description: "We help with content updates, new sections, SEO growth, and technical improvements.",
      },
    ],
    relatedServices: ["pos-systems", "erp-software", "web-development"],
    keywordVariants: ["custom software", "bespoke software", "tailored software", "software development"],
    image: "/custom-software-development.jpg",
  },
  {
    slug: "custom-software",
    aliases: ["custom-software-development", "business-automation", "business-automation-systems"],
    title: "Custom Software Development",
    shortDescription:
      "Business automation systems and tailor-made software built around your exact workflow, users, approvals, and integrations.",
    masterIntro: [
      "Custom software development focuses on building systems that fit the way your business actually operates instead of forcing your team into generic tools.",
      "That often includes business automation systems for approvals, service delivery, field operations, tracking, reporting, integrations, and role-based workflows.",
      "SMA Systems provides comprehensive service solutions tailored for businesses across all Kenyan counties and regions.",
    ],
    genericBenefits: [
      "Software matched to your exact workflow",
      "Automation for repetitive and manual processes",
      "Cleaner integrations between departments and tools",
      "Better reporting, accountability, and scale readiness",
    ],
    features: [
      {
        title: "Workflow mapping",
        description: "We design the system around your approvals, tasks, forms, and data movement.",
      },
      {
        title: "Automation logic",
        description: "Replace manual follow-up, spreadsheet chasing, and duplicated work with structured automation.",
      },
      {
        title: "Dashboards and reports",
        description: "See operational status, workload, service levels, and performance in one place.",
      },
      {
        title: "Multi-user access",
        description: "Control permissions, responsibilities, approvals, and visibility by team or branch.",
      },
    ],
    industries: ["Service companies", "Distributors", "Logistics teams", "Institutions", "Field operations"],
    process: [
      {
        title: "Consultation",
        description: "We review the current workflow, pain points, users, approvals, and data sources.",
      },
      {
        title: "Setup",
        description: "We define modules, forms, dashboards, permissions, and integration scope.",
      },
      {
        title: "Customization",
        description: "We build the business logic, automation, reporting, and role structure you need.",
      },
      {
        title: "Deployment",
        description: "We launch the solution, onboard users, and stabilize the rollout in live operations.",
      },
      {
        title: "Support",
        description: "We keep improving the software as processes, teams, and reporting needs change.",
      },
    ],
    relatedServices: ["web-development", "erp-software", "pos-systems"],
    keywordVariants: ["custom software", "custom software development", "business automation systems", "business automation"],
  },
];

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function makeMetadata({
  title,
  description,
  keywords,
  canonicalPath,
}: {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
}): Metadata {
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: BRAND_NAME,
      locale: "en_KE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: BASE_URL,
    telephone: "+254719832719",
    areaServed: COUNTRY_NAME,
  };
}

function buildServiceJsonLd(service: MasterService, page: ServicePageData, county?: KenyanCounty) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: county ? `${service.title} in ${county.name}, ${COUNTRY_NAME}` : `${service.title} in ${COUNTRY_NAME}`,
    serviceType: service.title,
    description: page.metaDescription,
    provider: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: BASE_URL,
      telephone: "+254719832719",
    },
    areaServed: county
      ? {
          "@type": "AdministrativeArea",
          name: `${county.name}, ${COUNTRY_NAME}`,
        }
      : {
          "@type": "Country",
          name: COUNTRY_NAME,
        },
    url: `${BASE_URL}${page.canonicalPath}`,
  };
}

function buildCollectionJsonLd({
  title,
  description,
  canonicalPath,
}: {
  title: string;
  description: string;
  canonicalPath: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${BASE_URL}${canonicalPath}`,
    isPartOf: BASE_URL,
  };
}

function buildWhatsAppHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getServiceTitleForCounty(service: MasterService, county: KenyanCounty) {
  return `Best ${service.title} in ${county.name}, ${COUNTRY_NAME}`;
}

function getLocalizedHeroSubtitle(service: MasterService, county: KenyanCounty) {
  switch (service.slug) {
    case "pos-systems":
      return `Affordable and powerful POS solutions for businesses in ${county.name}.`;
    case "erp-software":
      return `Integrated ERP software for growing businesses and multi-branch teams in ${county.name}.`;
    case "web-development":
      return `Professional websites and web platforms built to help businesses in ${county.name} grow online.`;
    case "custom-software":
      return `Business automation and custom software tailored to companies operating in ${county.name}.`;
  }
}

function getLocalizedIntroParagraphs(service: MasterService, county: KenyanCounty) {
  const countyContext = `${county.description} We use ${county.name} and ${county.majorTown} market context to adapt the page without duplicating the master service content.`;

  switch (service.slug) {
    case "pos-systems":
      return [
        "POS systems combine billing, inventory, payments, and reporting so businesses can serve customers faster while maintaining better operational visibility.",
        `Businesses in ${county.name} need POS systems that keep daily sales moving, improve stock control, and simplify reconciliation across ${county.majorTown} and surrounding trading centres.`,
        countyContext,
      ];
    case "erp-software":
      return [
        "ERP software helps companies connect finance, operations, procurement, stock, and reporting so departments can work from one reliable system.",
        `For organizations in ${county.name}, ERP matters when teams have outgrown spreadsheets, branch-level visibility is weak, or approvals and reporting are becoming harder to manage.`,
        countyContext,
      ];
    case "web-development":
      return [
        "Web development covers lead-generation websites, customer portals, and web applications that help businesses market, sell, and serve customers online.",
        `Businesses in ${county.name} need websites that load quickly, rank for local searches, and make it easy for buyers to contact them from phones and desktops alike.`,
        countyContext,
      ];
    case "custom-software":
      return [
        "Custom software development focuses on building systems around your real workflow instead of forcing your team into off-the-shelf software limitations.",
        `In ${county.name}, custom software is especially valuable where businesses need automation, approvals, branch coordination, or reporting that generic tools do not handle cleanly.`,
        countyContext,
      ];
  }
}

function getLocalizedBenefits(service: MasterService, county: KenyanCounty) {
  switch (service.slug) {
    case "pos-systems":
      return [
        `Faster sales tracking for ${county.name} businesses`,
        `Better inventory control for shops and supermarkets in ${county.name}`,
        `Simpler tax and end-of-day reporting for retail teams in ${county.name}`,
        `Stronger branch visibility for businesses operating around ${county.majorTown}`,
      ];
    case "erp-software":
      return [
        `A single source of truth for departments operating in ${county.name}`,
        `Better finance, stock, and procurement visibility for teams in ${county.name}`,
        `Cleaner approvals and accountability across branches serving ${county.name}`,
        `Less spreadsheet dependence for management teams in ${county.majorTown}`,
      ];
    case "web-development":
      return [
        `Better online visibility for businesses targeting customers in ${county.name}`,
        `More enquiries from mobile-first buyers searching in ${county.name}`,
        `Stronger credibility for local brands in ${county.majorTown} and nearby towns`,
        `A website structure that supports growth, campaigns, and future automation`,
      ];
    case "custom-software":
      return [
        `Software aligned to the real workflow of businesses in ${county.name}`,
        `Business automation that reduces manual work and follow-up delays`,
        `Role-based systems that fit branch, office, and field teams in ${county.name}`,
        `Better operational reporting for leadership teams serving ${county.majorTown} and beyond`,
      ];
  }
}

function getLocalizedIndustries(service: MasterService, county: KenyanCounty) {
  if (service.slug === "web-development") {
    return [
      `Professional firms in ${county.name}`,
      `Schools and training centres in ${county.name}`,
      `Hotels and hospitality businesses around ${county.majorTown}`,
      `Clinics, SACCOs, and service businesses in ${county.name}`,
      `Distributors and SMEs serving the wider ${county.region} region`,
    ];
  }

  if (service.slug === "custom-software") {
    return [
      `Service companies in ${county.name}`,
      `Distributors and supply teams in ${county.name}`,
      `Institutions and administrative offices in ${county.name}`,
      `Field operations and logistics workflows around ${county.majorTown}`,
      `Growing businesses that need automation across ${county.name}`,
    ];
  }

  return service.industries.map((industry) => `${industry} in ${county.name}`);
}

function getLocalizedProcess(service: MasterService, county: KenyanCounty) {
  return service.process.map((step) => {
    if (step.title !== "Deployment") {
      return step;
    }

    return {
      ...step,
      description: `${step.description} We plan rollout and onboarding for businesses in ${county.name}, ${COUNTRY_NAME}.`,
    };
  });
}

function getMasterFaqs(service: MasterService): FaqItem[] {
  switch (service.slug) {
    case "pos-systems":
      return [
        {
          question: "What businesses need POS systems in Kenya?",
          answer:
            "POS systems are ideal for retail shops, pharmacies, supermarkets, restaurants, hardware stores, and any business that needs faster billing with better stock and sales visibility.",
        },
        {
          question: "Can SMA Systems customize the POS setup for my workflow?",
          answer:
            "Yes. We tailor products, users, permissions, reports, receipt formats, and branch workflows so the POS reflects how your business actually operates.",
        },
        {
          question: "Do you offer support after installation?",
          answer:
            "Yes. We provide onboarding, troubleshooting, reporting adjustments, user support, and ongoing improvement after the initial rollout.",
        },
      ];
    case "erp-software":
      return [
        {
          question: "Who should invest in ERP software?",
          answer:
            "ERP software is most useful for businesses with multiple departments, complex approvals, inventory movement, or reporting needs that are hard to manage with spreadsheets and disconnected tools.",
        },
        {
          question: "Can ERP software be rolled out in phases?",
          answer:
            "Yes. We can prioritize modules such as finance, inventory, procurement, HR, or reporting and then expand the implementation in phases.",
        },
        {
          question: "Does SMA Systems handle training and support?",
          answer:
            "Yes. We handle planning, rollout, user onboarding, support, and continuous improvements after the ERP goes live.",
        },
      ];
    case "web-development":
      return [
        {
          question: "What type of websites do you build?",
          answer:
            "We build company websites, landing pages, portals, web applications, and SEO-focused service pages that help businesses market, convert, and operate more effectively.",
        },
        {
          question: "Will the website be SEO-ready?",
          answer:
            "Yes. We structure pages with strong metadata, clean URLs, internal linking, content hierarchy, and performance best practices for search visibility.",
        },
        {
          question: "Can the website integrate with forms, WhatsApp, or internal systems?",
          answer:
            "Yes. We can connect websites to lead forms, analytics, payments, CRM tools, WhatsApp flows, and custom business systems where needed.",
        },
      ];
    case "custom-software":
      return [
        {
          question: "What is custom software development?",
          answer:
            "Custom software development means building a system around your exact workflow, users, approvals, reports, and integrations instead of adapting your business to a generic tool.",
        },
        {
          question: "Can custom software include business automation?",
          answer:
            "Yes. Many of our custom software projects focus on business automation such as approvals, tracking, alerts, dashboards, and manual process reduction.",
        },
        {
          question: "How do you start a custom software project?",
          answer:
            "We start by understanding your workflow, users, pain points, and desired outcomes, then define scope, system structure, rollout, and support expectations.",
        },
      ];
  }
}

function getLocalizedFaqs(service: MasterService, county: KenyanCounty): FaqItem[] {
  switch (service.slug) {
    case "pos-systems":
      return [
        {
          question: `Is POS system available in ${county.name}?`,
          answer: `Yes. SMA Systems provides POS systems for businesses across ${county.name}, including setup, customization, training, and ongoing support.`,
        },
        {
          question: `How much does POS software cost in ${county.name}?`,
          answer: `Pricing depends on the number of users, branches, devices, and features required. We scope the setup for your business in ${county.name} and then recommend the right package.`,
        },
        {
          question: `Which businesses in ${county.name} benefit most from POS systems?`,
          answer: `Retail shops, supermarkets, pharmacies, restaurants, hardware stores, and multi-branch businesses in ${county.name} benefit from faster billing and stronger stock visibility.`,
        },
      ];
    case "erp-software":
      return [
        {
          question: `Do you provide ERP software in ${county.name}?`,
          answer: `Yes. We implement ERP software for organizations in ${county.name} that need better finance, inventory, procurement, HR, and reporting workflows.`,
        },
        {
          question: `How is ERP software scoped for businesses in ${county.name}?`,
          answer: `We scope ERP around users, departments, approvals, reports, integrations, and rollout realities specific to the business operating in ${county.name}.`,
        },
        {
          question: `Can ERP software support multi-branch operations in ${county.name}?`,
          answer: `Yes. We design ERP setups that support branch visibility, centralized controls, and role-based reporting for businesses serving ${county.name}.`,
        },
      ];
    case "web-development":
      return [
        {
          question: `Do you offer web development in ${county.name}?`,
          answer: `Yes. We build websites, portals, and SEO-ready web experiences for businesses targeting customers in ${county.name}.`,
        },
        {
          question: `Why do businesses in ${county.name} need a professional website?`,
          answer: `A professional website helps businesses in ${county.name} look credible, rank for local searches, capture leads, and support sales or service delivery online.`,
        },
        {
          question: `Can you optimize a website for ${county.name} SEO searches?`,
          answer: `Yes. We structure service pages, metadata, internal links, and copy so the website can target relevant searches connected to ${county.name} and the wider Kenyan market.`,
        },
      ];
    case "custom-software":
      return [
        {
          question: `Do you build custom software for businesses in ${county.name}?`,
          answer: `Yes. SMA Systems designs and delivers custom software for organizations in ${county.name} that need systems built around their real workflow.`,
        },
        {
          question: `Can a custom system automate business processes in ${county.name}?`,
          answer: `Yes. We build business automation systems for approvals, tracking, service operations, reporting, and other repetitive workflows used by teams in ${county.name}.`,
        },
        {
          question: `How long does a custom software project take in ${county.name}?`,
          answer: `Timeline depends on workflow complexity, integrations, users, and rollout needs. We define milestones after discovery and then deliver in structured phases.`,
        },
      ];
  }
}

function getBackgroundPrompt(service: MasterService, county?: KenyanCounty) {
  const locationText = county
    ? `${service.title} deployment for businesses in ${county.name}, ${COUNTRY_NAME}`
    : `${service.title} for businesses across ${COUNTRY_NAME}`;

  switch (service.slug) {
    case "pos-systems":
      return `${locationText}, modern retail counter, tablets and receipt printer, product shelves, warm natural light, professional Kenyan business setting, clean commercial photography`;
    case "erp-software":
      return `${locationText}, business dashboard on large screens, finance and operations team meeting, modern African office, clean enterprise workspace, documentary style`;
    case "web-development":
      return `${locationText}, designer and developer reviewing a responsive website on laptop and phone, bright studio desk, Kenyan business branding, premium editorial style`;
    case "custom-software":
      return `${locationText}, workflow dashboard, business automation screens, operations team collaborating, modern East African office, polished technology photography`;
  }
}

function getMasterTrustSignals(service: MasterService) {
  return [
    "Trusted by businesses across Kenya for reliable ERP solutions",
    "Local support and training available nationwide",
    "Proven results with hundreds of successful implementations",
  ];
}

function getLocalizedTrustSignals(service: MasterService, county: KenyanCounty) {
  return [
    `${service.title} solutions for ${county.name}, ${COUNTRY_NAME}`,
    `Serving businesses in ${county.majorTown} and surrounding areas`,
    `Local expertise with nationwide support and training`,
  ];
}

function buildServiceLinkSection(service: MasterService): LinkSection {
  return {
    title: `ERP Software Services Across Kenya`,
    description:
      "We provide comprehensive ERP solutions to businesses throughout Kenya, with local expertise and support in every county.",
    cards: kenyanCounties.map((county) => ({
      href: `/kenya/${county.slug}/services/${service.slug}`,
      eyebrow: county.region,
      title: `${service.title} in ${county.name}`,
      description: `Professional ERP solutions for businesses in ${county.name} and surrounding areas.`,
    })),
  };
}

function buildRelatedServicesSection(service: MasterService, county: KenyanCounty): LinkSection {
  return {
    title: `Related Services in ${county.name}`,
    description:
      "Use related service links to strengthen internal linking between the county hub and other commercial pages in the same location cluster.",
    cards: service.relatedServices
      .map((slug) => getCoreServiceBySlug(slug))
      .filter((item): item is MasterService => Boolean(item))
      .map((related) => ({
        href: `/kenya/${county.slug}/${related.slug}`,
        eyebrow: county.name,
        title: `${related.title} in ${county.name}`,
        description: `See how ${related.title.toLowerCase()} supports businesses in ${county.name}.`,
      })),
  };
}

function buildServicePageKeywords(service: MasterService, county?: KenyanCounty) {
  if (!county) {
    return uniqueStrings([
      service.title,
      ...service.keywordVariants,
      `${service.title} ${COUNTRY_NAME}`,
      `${service.title.toLowerCase()} services ${COUNTRY_NAME}`,
      `best ${service.title.toLowerCase()} in ${COUNTRY_NAME}`,
      `affordable ${service.title.toLowerCase()} in ${COUNTRY_NAME}`,
    ]);
  }

  return uniqueStrings([
    ...service.keywordVariants.map((variant) => `${variant} ${county.name}`),
    `${service.title} in ${county.name}`,
    `${service.title} ${county.name} ${COUNTRY_NAME}`,
    `best ${service.title.toLowerCase()} in ${county.name}`,
    `affordable ${service.title.toLowerCase()} in ${county.name}`,
    `${county.name} ${service.title.toLowerCase()} company`,
    ...county.keywords,
  ]);
}

function buildCountyHubKeywords(county: KenyanCounty) {
  return uniqueStrings([
    `software development ${county.name}`,
    `pos systems ${county.name}`,
    `erp software ${county.name}`,
    `web development ${county.name}`,
    `custom software ${county.name}`,
    `business automation systems ${county.name}`,
    ...county.keywords,
  ]);
}

function buildServicesIndexKeywords() {
  return uniqueStrings([
    "pos systems kenya",
    "erp software kenya",
    "web development kenya",
    "custom software kenya",
    "business automation systems kenya",
  ]);
}

function buildKenyaIndexKeywords() {
  return uniqueStrings([
    "software services kenya",
    "county seo kenya",
    "pos systems kenya counties",
    "erp software kenya counties",
    "web development kenya counties",
  ]);
}

export function getCoreServiceBySlug(slug: string) {
  return coreServices.find((service) => service.slug === slug || service.aliases.includes(slug));
}

export function getCanonicalServiceSlug(slug: string) {
  return getCoreServiceBySlug(slug)?.slug ?? null;
}

export function getCanonicalCounty(slug: string) {
  return getCountyBySlug(slug);
}

export function getAllCoreServiceSlugs() {
  return coreServices.map((service) => service.slug);
}

export function getAllCountySlugs() {
  return kenyanCounties.map((county) => county.slug);
}

export function buildServiceMasterPage(service: MasterService): ServicePageData {
  const canonicalPath = `/services/${service.slug}`;
  const seoTitle = `${service.title} in ${COUNTRY_NAME} | SMA Systems Kenya`;
  const metaDescription = `${service.shortDescription} Master service page for ${service.title.toLowerCase()} with reusable content architecture for every county page in Kenya.`;
  const heroTitle = `${service.title} for Businesses in ${COUNTRY_NAME}`;
  const heroSubtitle = `${service.shortDescription} Professional ERP solutions designed for Kenyan businesses.`;
  const faqs = getMasterFaqs(service);

  const page: ServicePageData = {
    seoTitle,
    metaDescription,
    keywords: buildServicePageKeywords(service),
    canonicalPath,
    eyebrow: "ERP Solutions",
    heroTitle,
    heroSubtitle,
    backgroundPrompt: getBackgroundPrompt(service),
    introTitle: `How ${service.title} Works as a Master Template`,
    introParagraphs: service.masterIntro,
    trustSignals: getMasterTrustSignals(service),
    benefitsTitle: `Why Businesses Choose ${service.title}`,
    benefits: service.genericBenefits,
    featuresTitle: `${service.title} Core Features`,
    features: service.features,
    industriesTitle: "Industries We Support",
    industries: service.industries,
    processTitle: "Delivery Process",
    process: service.process,
    faqTitle: "FAQs",
    faqs,
    ctaTitle: `Get a ${service.title} Demo`,
    ctaDescription: `Talk to SMA Systems about ${service.title.toLowerCase()} requirements, rollout scope, and location-specific deployment plans anywhere in ${COUNTRY_NAME}.`,
    primaryCtaLabel: "Get Demo",
    primaryCtaHref: "/book-demo",
    secondaryCtaLabel: "WhatsApp Us",
    secondaryCtaHref: buildWhatsAppHref(`Hello SMA Systems, I need ${service.title} for my business in Kenya.`),
    linkSection: buildServiceLinkSection(service),
    image: service.image,
    jsonLd: [],
  };

  page.jsonLd = [
    buildOrganizationJsonLd(),
    buildServiceJsonLd(service, page),
    buildFaqJsonLd(faqs),
    buildBreadcrumbJsonLd([
      { name: "Home", url: BASE_URL },
      { name: "Services", url: `${BASE_URL}/services` },
      { name: service.title, url: `${BASE_URL}${canonicalPath}` },
    ]),
  ];

  return page;
}

export function buildCountyServicePage(service: MasterService, county: KenyanCounty): ServicePageData {
  const canonicalPath = `/kenya/${county.slug}/services/${service.slug}`;
  const seoTitle = `${service.title} in ${county.name} | SMA Systems Kenya`;
  const metaDescription = `${service.shortDescription} Localized ${service.title.toLowerCase()} page for businesses in ${county.name}, ${COUNTRY_NAME}, built from the master service template with county context injected.`;
  const faqs = getLocalizedFaqs(service, county);

  const page: ServicePageData = {
    seoTitle,
    metaDescription,
    keywords: buildServicePageKeywords(service, county),
    canonicalPath,
    eyebrow: `${county.name}, ${COUNTRY_NAME}`,
    heroTitle: getServiceTitleForCounty(service, county),
    heroSubtitle: getLocalizedHeroSubtitle(service, county),
    backgroundPrompt: getBackgroundPrompt(service, county),
    introTitle: `${service.title} in ${county.name}, ${COUNTRY_NAME}`,
    introParagraphs: getLocalizedIntroParagraphs(service, county),
    trustSignals: getLocalizedTrustSignals(service, county),
    benefitsTitle: `Benefits for Businesses in ${county.name}`,
    benefits: getLocalizedBenefits(service, county),
    featuresTitle: `${service.title} Core Features`,
    features: service.features,
    industriesTitle: `Industries in ${county.name}`,
    industries: getLocalizedIndustries(service, county),
    processTitle: `Our ${service.title} Process`,
    process: getLocalizedProcess(service, county),
    faqTitle: "FAQs",
    faqs,
    ctaTitle: `Get ${service.title} Installed in ${county.name} Today`,
    ctaDescription: `We help businesses in ${county.name} plan, deploy, and support ${service.title.toLowerCase()} with clear delivery steps, training, and follow-up support.`,
    primaryCtaLabel: "Get Demo",
    primaryCtaHref: "/book-demo",
    secondaryCtaLabel: "WhatsApp Us",
    secondaryCtaHref: buildWhatsAppHref(`Hello SMA Systems, I need ${service.title} in ${county.name}, Kenya.`),
    linkSection: buildRelatedServicesSection(service, county),
    jsonLd: [],
  };

  page.jsonLd = [
    buildOrganizationJsonLd(),
    buildServiceJsonLd(service, page, county),
    buildFaqJsonLd(faqs),
    buildBreadcrumbJsonLd([
      { name: "Home", url: BASE_URL },
      { name: "Kenya", url: `${BASE_URL}/kenya` },
      { name: county.name, url: `${BASE_URL}/kenya/${county.slug}` },
      { name: service.title, url: `${BASE_URL}${canonicalPath}` },
    ]),
  ];

  return page;
}

export function buildCountyHubPage(county: KenyanCounty): CountyHubPageData {
  const canonicalPath = `/kenya/${county.slug}`;
  const seoTitle = `Software Services in ${county.name} | SMA Systems Kenya`;
  const metaDescription = `County hub page for ${county.name}, ${COUNTRY_NAME}, linking POS Systems, ERP Software, Web Development, and Custom Software Development pages generated from master service templates.`;
  const servicesSection: LinkSection = {
    title: `Services Available in ${county.name}`,
    description:
      "This county hub lists every core service and routes users into the SEO target pages where the service template has been localized for the county.",
    cards: coreServices.map((service) => ({
      href: `/kenya/${county.slug}/services/${service.slug}`,
      eyebrow: "SEO Target Page",
      title: `${service.title} in ${county.name}`,
      description: `${service.shortDescription} Localized for businesses in ${county.name}.`,
    })),
  };

  const faqs: FaqItem[] = [
    {
      question: `What services does SMA Systems offer in ${county.name}?`,
      answer: `We offer POS Systems, ERP Software, Web Development, and Custom Software Development in ${county.name}, with each service linked from this county hub into its own localized page.`,
    },
    {
      question: `Why does the ${county.name} page include all services?`,
      answer: `The county page acts as a location hub so users and search engines can move from one location page into the most relevant service page without creating duplicate county-only service pages.`,
    },
    {
      question: `Can SMA Systems support businesses outside ${county.majorTown}?`,
      answer: `Yes. We support businesses across ${county.name}, including teams operating in ${county.majorTown} and the broader ${county.region} region.`,
    },
  ];

  const page: CountyHubPageData = {
    seoTitle,
    metaDescription,
    keywords: buildCountyHubKeywords(county),
    canonicalPath,
    eyebrow: `${county.region} Region Hub`,
    heroTitle: `Digital Services in ${county.name}, ${COUNTRY_NAME}`,
    heroSubtitle: `County hub page linking POS Systems, ERP Software, Web Development, and Custom Software for businesses in ${county.name}.`,
    introTitle: `${county.name} County Service Hub`,
    introParagraphs: [
      `${county.description} This page is the location hub for ${county.name}, and it dynamically lists every core service from SMA Systems in one place.`,
      `From this hub, users can move into the main SEO target pages such as ${county.name} POS Systems, ${county.name} ERP Software, ${county.name} Web Development, and ${county.name} Custom Software Development.`,
      `The county hub improves internal linking by connecting one location page to all services while the service-location pages inherit their structure from the master service templates.`,
    ],
    trustSignals: [
      `${county.name} county hub links to all core services`,
      `Service-location pages inherit from the master service templates`,
      `Local business context references ${county.majorTown} and the wider ${county.region} market`,
    ],
    servicesSection,
    faqTitle: "FAQs",
    faqs,
    ctaTitle: `Talk to SMA Systems About Your Project in ${county.name}`,
    ctaDescription: `Whether you need POS, ERP, a website, or custom software in ${county.name}, we can recommend the right solution and rollout approach.`,
    primaryCtaLabel: "Get Demo",
    primaryCtaHref: "/book-demo",
    secondaryCtaLabel: "WhatsApp Us",
    secondaryCtaHref: buildWhatsAppHref(`Hello SMA Systems, I need digital services in ${county.name}, Kenya.`),
    jsonLd: [],
  };

  page.jsonLd = [
    buildOrganizationJsonLd(),
    buildCollectionJsonLd({
      title: page.heroTitle,
      description: page.metaDescription,
      canonicalPath,
    }),
    buildFaqJsonLd(faqs),
    buildBreadcrumbJsonLd([
      { name: "Home", url: BASE_URL },
      { name: "Kenya", url: `${BASE_URL}/kenya` },
      { name: county.name, url: `${BASE_URL}${canonicalPath}` },
    ]),
  ];

  return page;
}

export function buildServicesDirectoryPage(): DirectoryPageData {
  const canonicalPath = "/services";
  const primarySection: LinkSection = {
    title: "Core Master Service Pages",
    description:
      "These pages provide comprehensive service information for businesses across Kenya, with localized support and implementation.",
    cards: coreServices.map((service) => ({
      href: `/services/${service.slug}`,
      eyebrow: "Master Page",
      title: service.title,
      description: service.shortDescription,
      image: "/images/logo.png",
    })),
  };

  const secondarySection: LinkSection = {
    title: "County Hubs",
    description:
      "County pages list all services and guide users into the most specific SEO target page for their location and service need.",
    cards: kenyanCounties.map((county) => ({
      href: `/kenya/${county.slug}`,
      eyebrow: county.region,
      title: county.name,
      description: `County hub for ${county.name}, ${COUNTRY_NAME}.`,
      image: "/images/smaslogo.png",
    })),
  };

  const page: DirectoryPageData = {
    seoTitle: "Core Services in Kenya | SMA Systems",
    metaDescription:
      "Master service pages for POS Systems, ERP Software, Web Development, and Custom Software Development in Kenya.",
    keywords: buildServicesIndexKeywords(),
    canonicalPath,
    eyebrow: "Service Architecture",
    heroTitle: "Master Service Pages for SMA Systems",
    heroSubtitle:
      "These are our comprehensive service pages designed to help businesses across Kenya find the right solutions for their needs.",
    introTitle: "How the Programmatic Service Structure Works",
    introParagraphs: [
      "Each service page under /services is the master content source for one core offering.",
      "County hub pages under /kenya list all services for a location without creating separate service stubs.",
      "The main SEO targets live at /kenya/[county]/[service], where the master service content is injected with local business context.",
    ],
    sections: [primarySection, secondarySection].filter(Boolean),
    ctaTitle: "Need Help Choosing the Right Service?",
    ctaDescription:
      "Tell us whether you need POS, ERP, web development, or custom software and we will point you to the right service and county page structure.",
    primaryCtaLabel: "Get Demo",
    primaryCtaHref: "/book-demo",
    secondaryCtaLabel: "WhatsApp Us",
    secondaryCtaHref: buildWhatsAppHref("Hello SMA Systems, I need help choosing the right service."),
    jsonLd: [],
  };

  page.jsonLd = [
    buildOrganizationJsonLd(),
    buildCollectionJsonLd({
      title: page.heroTitle,
      description: page.metaDescription,
      canonicalPath,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", url: BASE_URL },
      { name: "Services", url: `${BASE_URL}${canonicalPath}` },
    ]),
  ];

  return page;
}

export function buildLocationsDirectoryPage(): DirectoryPageData {
  const canonicalPath = "/locations";
  const primarySection: LinkSection = {
    title: "Service Locations in Kenya",
    description:
      "SMA Systems provides software solutions across all 47 counties in Kenya, covering major towns and constituencies.",
    cards: kenyanCounties.map((county) => ({
      href: `/kenya/${county.slug}`,
      eyebrow: county.region,
      title: county.name,
      description: `Serving ${county.name} county including constituencies: ${county.constituencies.slice(0, 5).join(', ')}${county.constituencies.length > 5 ? ' and more' : ''}.`,
      image: "/images/logo.png",
    })),
  };

  const secondarySection: LinkSection = {
    title: "Our Core Services Available Nationwide",
    description:
      "All our services are available across Kenya's counties and constituencies, tailored to local business needs.",
    cards: coreServices.map((service) => ({
      href: `/services/${service.slug}`,
      eyebrow: "Service",
      title: service.title,
      description: service.shortDescription,
      image: "/images/smaslogo.png",
    })),
  };

  const page: DirectoryPageData = {
    seoTitle: "Service Locations in Kenya | SMA Systems",
    metaDescription:
      "SMA Systems serves all 47 Kenya counties and their constituencies with POS systems, ERP software, web development, and custom solutions.",
    keywords: ["Kenya locations", "service areas Kenya", "counties served", "constituencies Kenya"],
    canonicalPath,
    eyebrow: "Locations",
    heroTitle: "Service Locations Across Kenya",
    heroSubtitle:
      "We provide comprehensive software solutions to businesses in all 47 counties and their constituencies throughout Kenya.",
    introTitle: "Nationwide Coverage with Local Expertise",
    introParagraphs: [
      "SMA Systems operates across Kenya, serving businesses in every county and constituency.",
      "Our services are tailored to meet the unique needs of local markets while maintaining national standards.",
      "From Nairobi's bustling business district to remote constituencies, we deliver reliable software solutions.",
    ],
    sections: [primarySection, secondarySection].filter(Boolean),
    ctaTitle: "Find Services in Your Location",
    ctaDescription:
      "Select your county or constituency to explore our tailored software solutions for your area.",
    primaryCtaLabel: "Browse Counties",
    primaryCtaHref: "/kenya",
    secondaryCtaLabel: "View Services",
    secondaryCtaHref: "/services",
    jsonLd: [],
  };

  page.jsonLd = [
    buildOrganizationJsonLd(),
    buildCollectionJsonLd({
      title: page.heroTitle,
      description: page.metaDescription,
      canonicalPath,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", url: BASE_URL },
      { name: "Locations", url: `${BASE_URL}${canonicalPath}` },
    ]),
  ];

  return page;
}

export function buildKenyaDirectoryPage(): DirectoryPageData {
  const canonicalPath = "/kenya";
  const countiesByRegion = kenyanCounties.map((county) => ({
    href: `/kenya/${county.slug}`,
    eyebrow: county.region,
    title: county.name,
    description: `County hub for ${county.name}, ${COUNTRY_NAME}.`,
  }));

  const secondarySection: LinkSection = {
    title: "Core Services Used on Every County Page",
    description:
      "Every county hub links into the same four master service lines to keep the architecture consistent across Kenya.",
    cards: coreServices.map((service) => ({
      href: `/services/${service.slug}`,
      eyebrow: "Master Page",
      title: service.title,
      description: service.shortDescription,
    })),
  };

  const page: DirectoryPageData = {
    seoTitle: "Kenya County Service Hubs | SMA Systems",
    metaDescription:
      "Browse county-level service hubs in Kenya for POS Systems, ERP Software, Web Development, and Custom Software Development.",
    keywords: buildKenyaIndexKeywords(),
    canonicalPath,
    eyebrow: "Kenya Locations",
    heroTitle: "Kenya County and City SEO Hubs",
    heroSubtitle:
      "Browse county pages that list all core SMA Systems services and connect into the main service-location SEO targets.",
    introTitle: "County Hubs Built for Internal Linking and Local SEO",
    introParagraphs: [
      "Every location page under /kenya acts as a hub that lists all services for that county or city.",
      "From the county hub pages, businesses can explore specific service solutions tailored for their local area and requirements.",
      "This keeps the structure clean: service pages are masters, county pages are hubs, and service-location pages are the main SEO targets.",
    ],
    primarySection: {
      title: "Kenya County Hubs",
      description: "Open any county or city hub to see all services available in that location.",
      cards: countiesByRegion,
    },
    secondarySection,
    ctaTitle: "Launch a County-Focused Service Campaign",
    ctaDescription:
      "We can help you prioritize counties, tighten metadata, and align service pages with the right local buyer intent.",
    primaryCtaLabel: "Get Demo",
    primaryCtaHref: "/book-demo",
    secondaryCtaLabel: "WhatsApp Us",
    secondaryCtaHref: buildWhatsAppHref("Hello SMA Systems, I need county-level SEO service pages in Kenya."),
    jsonLd: [],
  };

  page.jsonLd = [
    buildOrganizationJsonLd(),
    buildCollectionJsonLd({
      title: page.heroTitle,
      description: page.metaDescription,
      canonicalPath,
    }),
    buildBreadcrumbJsonLd([
      { name: "Home", url: BASE_URL },
      { name: "Kenya", url: `${BASE_URL}${canonicalPath}` },
    ]),
  ];

  return page;
}

export function buildServiceMetadata(service: MasterService) {
  const page = buildServiceMasterPage(service);

  return makeMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    canonicalPath: page.canonicalPath,
  });
}

export function buildCountyHubMetadata(county: KenyanCounty) {
  const page = buildCountyHubPage(county);

  return makeMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    canonicalPath: page.canonicalPath,
  });
}

export function buildCountyServiceMetadata(service: MasterService, county: KenyanCounty) {
  const page = buildCountyServicePage(service, county);

  return makeMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    canonicalPath: page.canonicalPath,
  });
}

export function buildServicesDirectoryMetadata() {
  const page = buildServicesDirectoryPage();

  return makeMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    canonicalPath: page.canonicalPath,
  });
}

export function buildLocationsDirectoryMetadata() {
  const page = buildLocationsDirectoryPage();

  return makeMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    canonicalPath: page.canonicalPath,
  });
}

export function buildKenyaDirectoryMetadata() {
  return makeMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    canonicalPath: page.canonicalPath,
  });
}

// Re-export constituency functions
export const {
  getAllConstituencySlugs,
  getCanonicalConstituency,
  buildConstituencyHubMetadata,
  buildConstituencyHubPage,
  buildConstituencyServiceMetadata,
  buildConstituencyServicePage,
} = constituencyFunctions;
