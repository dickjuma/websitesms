import { Metadata } from "next";

export interface SeoKeywords {
  primary: string;
  secondary: string[];
  longTail: string[];
}

export interface SeoConfig {
  title: string;
  description: string;
  url: string;
  keywords: SeoKeywords;
  image?: string;
}

const BASE_URL = "https://smasystems.co.ke";

export function generateSeoMetadata(config: SeoConfig): Metadata {
  const { title, description, url, keywords, image } = config;
  
  return {
    title,
    description,
    keywords: keywords.secondary,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${BASE_URL}${url}`,
      siteName: "SMA Systems and Softwares",
      title,
      description,
      images: [
        {
          url: image ? `${BASE_URL}${image}` : `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ? `${BASE_URL}${image}` : `${BASE_URL}/og-image.jpg`],
    },
    alternates: {
      canonical: `${BASE_URL}${url}`,
    },
  };
}

export function generateServiceFaqs(serviceName: string, industry: string = "Kenya") {
  const faqs = {
    "web-development": [
      {
        question: `How much does custom web development cost in ${industry}?`,
        answer: `Web development costs in ${industry} typically range from KES 100,000 to KES 2,000,000 depending on complexity, features, and integrations required. Small business websites start at KES 100,000-300,000, while enterprise web platforms can cost KES 500,000-2,000,000+.`,
      },
      {
        question: "How long does it take to build a custom website?",
        answer: "Timeline depends on complexity: simple websites take 2-4 weeks, medium complexity sites take 6-10 weeks, and enterprise platforms take 12-20+ weeks. We provide a detailed timeline during discovery.",
      },
      {
        question: "Do you offer SEO-optimized websites?",
        answer: "Yes, all our websites include SEO foundations: semantic HTML, fast loading speeds, mobile optimization, metadata structure, and schema markup for better search visibility.",
      },
      {
        question: "Can you integrate my website with existing systems?",
        answer: "We build integration-ready websites that connect with REST APIs, CRM systems, payment gateways, CMS platforms, and custom business logic. Integration is scoped during planning.",
      },
      {
        question: "Do you provide ongoing website maintenance?",
        answer: "Yes, we offer maintenance packages including security updates, content changes, performance monitoring, and feature improvements at monthly or per-project rates.",
      },
    ],
    "mobile-app-development": [
      {
        question: "How much does mobile app development cost?",
        answer: "Mobile app costs range from KES 300,000 to KES 5,000,000+. Simple apps start at KES 300,000-800,000, while enterprise apps with complex features range from KES 1,000,000-5,000,000+.",
      },
      {
        question: "React Native vs Native - which is better for my app?",
        answer: "React Native is ideal for cross-platform apps (iOS + Android) with standard features. Native development is better for complex platform-specific features, hardware access, or maximum performance requirements.",
      },
      {
        question: "How long does it take to build a mobile app?",
        answer: "Simple apps take 6-10 weeks, medium complexity apps take 10-16 weeks, and enterprise apps with advanced features take 16-30+ weeks including testing and app store preparation.",
      },
      {
        question: "Can you publish my app to App Store and Play Store?",
        answer: "Yes, we handle the full release process including app store guidelines compliance, screenshots, descriptions, and submission. We ensure your app meets all store requirements.",
      },
      {
        question: "Do you offer post-launch app support?",
        answer: "We provide ongoing support including bug fixes, OS compatibility updates, feature additions, and performance optimization. Support packages are available monthly or per-incident.",
      },
    ],
    "custom-software-development": [
      {
        question: "What is custom software development?",
        answer: "Custom software development creates tailored software solutions built specifically for your business workflows, processes, and requirements—unlike off-the-shelf packages that force you to adapt to their limitations.",
      },
      {
        question: "How long does custom software development take?",
        answer: "Project timelines vary: small projects take 8-12 weeks, medium complexity takes 12-24 weeks, and enterprise systems take 24-52+ weeks. We provide milestone-based delivery with regular progress updates.",
      },
      {
        question: "Why choose custom software over ready-made solutions?",
        answer: "Custom software fits your exact processes, scales with your growth, integrates with existing systems, and gives you competitive advantages that generic solutions cannot provide. Long-term, it often costs less than expensive licensing.",
      },
      {
        question: "Do you provide ongoing software support?",
        answer: "Yes, we offer SLA-backed support including bug fixes, security updates, performance optimization, and new feature development. Support can be included post-launch.",
      },
      {
        question: "Can you migrate our existing system to new software?",
        answer: "We handle data migration from legacy systems with data cleaning, transformation, and validation to ensure accurate transfer. Migration is scoped and tested thoroughly.",
      },
    ],
  };
  
  return faqs[serviceName as keyof typeof faqs] || [];
}

export function generateServiceSchema(serviceName: string, serviceData: {
  title: string;
  description: string;
  url: string;
}) {
  const serviceSchemas: Record<string, object> = {
    "web-development": {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceData.title,
      "description": serviceData.description,
      "url": `https://smasystems.co.ke${serviceData.url}`,
      "provider": {
        "@type": "Organization",
        "name": "SMA Systems and Softwares",
        "url": "https://smasystems.co.ke"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Kenya"
      },
      "serviceType": "Web Development",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "KES",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceRange": "KES 100,000 - KES 2,000,000",
          "minPrice": "100000",
          "maxPrice": "2000000",
          "priceCurrency": "KES"
        },
        "availability": "https://schema.org/InStock"
      }
    },
    "mobile-app-development": {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceData.title,
      "description": serviceData.description,
      "url": `https://smasystems.co.ke${serviceData.url}`,
      "provider": {
        "@type": "Organization",
        "name": "SMA Systems and Softwares",
        "url": "https://smasystems.co.ke"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Kenya"
      },
      "serviceType": "Mobile Application Development",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "KES",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceRange": "KES 300,000 - KES 5,000,000",
          "minPrice": "300000",
          "maxPrice": "5000000",
          "priceCurrency": "KES"
        },
        "availability": "https://schema.org/InStock"
      }
    },
    "custom-software-development": {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceData.title,
      "description": serviceData.description,
      "url": `https://smasystems.co.ke${serviceData.url}`,
      "provider": {
        "@type": "Organization",
        "name": "SMA Systems and Softwares",
        "url": "https://smasystems.co.ke"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Kenya"
      },
      "serviceType": "Custom Software Development",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "KES",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceRange": "KES 500,000 - KES 10,000,000+",
          "minPrice": "500000",
          "maxPrice": "10000000",
          "priceCurrency": "KES"
        },
        "availability": "https://schema.org/InStock"
      }
    },
  };
  
  return serviceSchemas[serviceName] || serviceSchemas["web-development"];
}