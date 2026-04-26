// Constituency functions
export function getAllConstituencySlugs(countySlug: string): string[] {
  const county = getCountyBySlug(countySlug);
  if (!county) return [];

  return county.constituencies.map(constituency =>
    constituency.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  );
}

export function getCanonicalConstituency(countySlug: string, constituencySlug: string) {
  const county = getCountyBySlug(countySlug);
  if (!county) return null;

  // Find the constituency by slug
  const constituency = county.constituencies.find(c =>
    c.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === constituencySlug
  );

  return constituency || null;
}

export function buildConstituencyHubMetadata(county: KenyanCounty, constituency: string): Metadata {
  const constituencySlug = constituency.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const canonicalPath = `/kenya/${county.slug}/constituencies/${constituencySlug}`;

  return {
    title: `${constituency} Business Software Solutions | SMA Systems ${county.name}`,
    description: `Professional software development services in ${constituency}, ${county.name}. POS systems, ERP software, web development, and custom solutions for businesses in ${constituency} constituency.`,
    keywords: [
      `${constituency} software development`,
      `${constituency} web development`,
      `${constituency} POS systems`,
      `${constituency} ERP software`,
      `${county.name} IT services`,
      `${constituency} business software`,
    ],
    openGraph: {
      title: `${constituency} Software Solutions | SMA Systems`,
      description: `Complete business software services for ${constituency}, ${county.name}. POS, ERP, web development, and custom software solutions.`,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: BRAND_NAME,
      images: [
        {
          url: `${BASE_URL}/og-image-constituency-${county.slug}-${constituencySlug}.png`,
          width: 1200,
          height: 630,
          alt: `${constituency} Business Software Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${constituency} Software Solutions | SMA Systems`,
      description: `Business software services for ${constituency}, ${county.name}. POS, ERP, web development.`,
      images: [`${BASE_URL}/og-image-constituency-${county.slug}-${constituencySlug}.png`],
    },
  };
}

export function buildConstituencyHubPage(county: KenyanCounty, constituency: string): CountyHubPageData {
  const constituencySlug = constituency.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const canonicalPath = `/kenya/${county.slug}/constituencies/${constituencySlug}`;

  return {
    seoTitle: `${constituency} Business Software Solutions | SMA Systems ${county.name}`,
    metaDescription: `Professional software development services in ${constituency}, ${county.name}. POS systems, ERP software, web development, and custom solutions for businesses in ${constituency} constituency.`,
    keywords: [
      `${constituency} software development`,
      `${constituency} web development`,
      `${constituency} POS systems`,
      `${constituency} ERP software`,
      `${county.name} IT services`,
      `${constituency} business software`,
    ],
    canonicalPath,
    eyebrow: `${county.name} County`,
    heroTitle: `Business Software Solutions in ${constituency}`,
    heroSubtitle: `Professional IT services and software development for businesses in ${constituency} constituency, ${county.name}.`,
    introTitle: `Software Development Services in ${constituency}`,
    introParagraphs: [
      `SMA Systems provides comprehensive business software solutions specifically tailored for the ${constituency} constituency in ${county.name}. We understand the unique needs of businesses in this vibrant community and offer localized IT services that drive growth and efficiency.`,
      `Our team combines deep knowledge of the ${county.name} business environment with cutting-edge technology to deliver solutions that work for your specific industry and operational requirements.`,
    ],
    trustSignals: [
      `Serving ${constituency} businesses since 2020`,
      `Local support team in ${county.name}`,
      `Customized solutions for constituency needs`,
      `Mobile-responsive applications`,
    ],
    servicesSection: {
      title: `Software Services Available in ${constituency}`,
      description: `Explore our complete range of business software solutions available throughout ${constituency} constituency.`,
      cards: [
        {
          href: `${canonicalPath}/pos-systems`,
          title: "POS Systems",
          description: "Point of sale systems for retail, hospitality, and service businesses in ${constituency}.",
          eyebrow: "Sales & Billing",
        },
        {
          href: `${canonicalPath}/erp-software`,
          title: "ERP Software",
          description: "Enterprise resource planning systems for comprehensive business management.",
          eyebrow: "Business Management",
        },
        {
          href: `${canonicalPath}/web-development`,
          title: "Web Development",
          description: "Professional websites, e-commerce platforms, and web applications.",
          eyebrow: "Online Presence",
        },
        {
          href: `${canonicalPath}/custom-software`,
          title: "Custom Software",
          description: "Tailored software solutions designed for your specific business needs.",
          eyebrow: "Bespoke Solutions",
        },
      ],
    },
    faqTitle: `Frequently Asked Questions - ${constituency} Software Services`,
    faqs: [
      {
        question: `What software services do you offer in ${constituency}?`,
        answer: `We offer POS systems, ERP software, web development, and custom software solutions specifically tailored for businesses in ${constituency}, ${county.name}.`,
      },
      {
        question: `Do you provide local support in ${constituency}?`,
        answer: `Yes, our team provides dedicated local support and implementation services for all businesses in ${constituency} constituency.`,
      },
      {
        question: `How long does implementation take?`,
        answer: `Most implementations are completed within 2-4 weeks, depending on the complexity of your requirements and our current schedule.`,
      },
      {
        question: `Do you offer training for my staff?`,
        answer: `Absolutely. We provide comprehensive training for all your staff members to ensure smooth adoption of the new software systems.`,
      },
    ],
    ctaTitle: `Ready to Transform Your Business in ${constituency}?`,
    ctaDescription: `Contact our local team today to discuss your software requirements and get a customized solution for your business.`,
    primaryCtaLabel: "Get Free Consultation",
    primaryCtaHref: `https://wa.me/${WHATSAPP_NUMBER}?text=Hello, I'm interested in software solutions for my business in ${constituency}, ${county.name}`,
    secondaryCtaLabel: "View Service Details",
    secondaryCtaHref: `${canonicalPath}/pos-systems`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${BRAND_NAME} - ${constituency}`,
        description: `Business software solutions in ${constituency}, ${county.name}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: constituency,
          addressRegion: county.name,
          addressCountry: COUNTRY_NAME,
        },
        url: `${BASE_URL}${canonicalPath}`,
        telephone: `+${WHATSAPP_NUMBER}`,
      },
    ],
  };
}

export function buildConstituencyServiceMetadata(county: KenyanCounty, constituency: string, service: any): Metadata {
  const constituencySlug = constituency.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const canonicalPath = `/kenya/${county.slug}/constituencies/${constituencySlug}/${service.slug}`;

  return {
    title: `${service.name} in ${constituency} | ${county.name} Software Solutions`,
    description: `${service.description} Professional ${service.name.toLowerCase()} services in ${constituency}, ${county.name}. Trusted local software development company.`,
    keywords: [
      `${service.name} ${constituency}`,
      `${service.name} ${county.name}`,
      `${constituency} ${service.name.toLowerCase()}`,
      `${county.name} software development`,
      `${constituency} business software`,
    ],
    openGraph: {
      title: `${service.name} in ${constituency} | SMA Systems`,
      description: `${service.description} Professional services in ${constituency}, ${county.name}.`,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: BRAND_NAME,
      images: [
        {
          url: `${BASE_URL}/og-image-service-${service.slug}-${county.slug}-${constituencySlug}.png`,
          width: 1200,
          height: 630,
          alt: `${service.name} in ${constituency}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} in ${constituency} | SMA Systems`,
      description: `${service.description} Professional services in ${constituency}, ${county.name}.`,
      images: [`${BASE_URL}/og-image-service-${service.slug}-${county.slug}-${constituencySlug}.png`],
    },
  };
}

export function buildConstituencyServicePage(county: KenyanCounty, constituency: string, service: any): ServicePageData {
  const constituencySlug = constituency.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const canonicalPath = `/kenya/${county.slug}/constituencies/${constituencySlug}/${service.slug}`;

  return {
    seoTitle: `${service.name} in ${constituency} | ${county.name} Software Solutions`,
    metaDescription: `${service.description} Professional ${service.name.toLowerCase()} services in ${constituency}, ${county.name}. Trusted local software development company.`,
    keywords: [
      `${service.name} ${constituency}`,
      `${service.name} ${county.name}`,
      `${constituency} ${service.name.toLowerCase()}`,
      `${county.name} software development`,
      `${constituency} business software`,
    ],
    canonicalPath,
    eyebrow: `${constituency}, ${county.name}`,
    heroTitle: `${service.name} in ${constituency}`,
    heroSubtitle: `Professional ${service.name.toLowerCase()} services tailored for businesses in ${constituency} constituency, ${county.name}.`,
    backgroundPrompt: `Modern business software interface showcasing ${service.name.toLowerCase()} functionality, clean professional design with ${county.name} local elements`,
    introTitle: `Why Choose ${service.name} in ${constituency}?`,
    introParagraphs: [
      `SMA Systems specializes in providing high-quality ${service.name.toLowerCase()} solutions specifically designed for the ${constituency} constituency in ${county.name}. Our local expertise combined with global technology standards ensures that your business gets the best of both worlds.`,
      `We understand the unique challenges and opportunities that businesses face in ${constituency} and design our ${service.name.toLowerCase()} solutions to address these specific needs while maintaining the highest standards of reliability and performance.`,
    ],
    trustSignals: [
      `Local presence in ${county.name}`,
      `Constituency-focused solutions`,
      `${constituency} business expertise`,
      `Mobile-responsive design`,
      `24/7 local support`,
    ],
    benefitsTitle: `Benefits of ${service.name} in ${constituency}`,
    benefits: [
      `Locally tailored for ${constituency} businesses`,
      `Understanding of local market conditions`,
      `Dedicated support from ${county.name} team`,
      `Customized to constituency-specific needs`,
      `Integration with local payment systems`,
      `Compliance with local business regulations`,
    ],
    featuresTitle: `${service.name} Features`,
    features: service.features || [],
    industriesTitle: `Industries That Benefit in ${constituency}`,
    industries: service.industries || [
      "Retail & Hospitality",
      "Manufacturing",
      "Healthcare",
      "Education",
      "Agriculture",
      "Financial Services",
    ],
    processTitle: `Our Implementation Process in ${constituency}`,
    process: [
      {
        title: "Local Consultation",
        description: `Meet with our ${county.name} team to understand your specific business needs in ${constituency}.`,
      },
      {
        title: "Customized Solution Design",
        description: `We design a solution specifically tailored for your business and the ${constituency} market.`,
      },
      {
        title: "Local Implementation",
        description: `Our team implements the solution with minimal disruption to your operations.`,
      },
      {
        title: "Training & Support",
        description: `Comprehensive training for your staff and ongoing support from our local team.`,
      },
    ],
    faqTitle: `Frequently Asked Questions - ${service.name} in ${constituency}`,
    faqs: [
      {
        question: `How long does ${service.name.toLowerCase()} implementation take in ${constituency}?`,
        answer: `Implementation typically takes 2-4 weeks, depending on the complexity of your requirements.`,
      },
      {
        question: `Do you provide training for ${service.name.toLowerCase()} in ${constituency}?`,
        answer: `Yes, we provide comprehensive training for all users and ongoing support from our local team.`,
      },
      {
        question: `Can ${service.name.toLowerCase()} integrate with my existing systems?`,
        answer: `Absolutely. We ensure seamless integration with your existing business systems and processes.`,
      },
      {
        question: `What kind of support do you provide in ${constituency}?`,
        answer: `We provide 24/7 technical support, regular maintenance, and local on-site assistance when needed.`,
      },
    ],
    ctaTitle: `Get Started with ${service.name} in ${constituency}`,
    ctaDescription: `Contact our local team in ${county.name} today to discuss your ${service.name.toLowerCase()} requirements.`,
    primaryCtaLabel: "Start Free Consultation",
    primaryCtaHref: `https://wa.me/${WHATSAPP_NUMBER}?text=Hello, I'm interested in ${service.name.toLowerCase()} for my business in ${constituency}, ${county.name}`,
    secondaryCtaLabel: "View More Services",
    secondaryCtaHref: `/kenya/${county.slug}/constituencies/${constituencySlug}`,
    linkSection: {
      title: `Other Services Available in ${constituency}`,
      description: `Explore our complete range of business software solutions in ${constituency}, ${county.name}.`,
      cards: [
        {
          href: `/kenya/${county.slug}/constituencies/${constituencySlug}/pos-systems`,
          title: "POS Systems",
          description: "Point of sale solutions for retail and hospitality businesses.",
        },
        {
          href: `/kenya/${county.slug}/constituencies/${constituencySlug}/erp-software`,
          title: "ERP Software",
          description: "Comprehensive business management and automation systems.",
        },
        {
          href: `/kenya/${county.slug}/constituencies/${constituencySlug}/web-development`,
          title: "Web Development",
          description: "Professional websites and web applications.",
        },
        {
          href: `/kenya/${county.slug}/constituencies/${constituencySlug}/custom-software`,
          title: "Custom Software",
          description: "Bespoke software solutions for unique business needs.",
        },
      ],
    },
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${service.name} in ${constituency}`,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: BRAND_NAME,
        },
        areaServed: {
          "@type": "Place",
          name: constituency,
          addressRegion: county.name,
          addressCountry: COUNTRY_NAME,
        },
        url: `${BASE_URL}${canonicalPath}`,
      },
    ],
  };
}