// Structured data generators for programmatic SEO
export function generateLocationServiceSchema(service: any, location: any, content: any) {
  const baseUrl = 'https://smassystems.com';
  const pageUrl = `${baseUrl}/${service.slug}-${location.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        "name": "SMAS Systems",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "description": "Leading software development company in Kenya specializing in ERP, POS, and custom business solutions.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "KE",
          "addressLocality": location.name,
          "addressRegion": location.county || location.name
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+254-719-832-719",
          "contactType": "customer service",
          "areaServed": "KE",
          "availableLanguage": ["en", "sw"]
        }
      },

      // Service
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": `${service.name} in ${location.name}`,
        "description": content.intro,
        "provider": { "@id": `${baseUrl}#organization` },
        "areaServed": {
          "@type": "Place",
          "name": location.name,
          "addressCountry": "KE"
        },
        "serviceType": service.shortName,
        "category": service.keywords[0]
      },

      // Local Business
      {
        "@type": "LocalBusiness",
        "@id": `${pageUrl}#localbusiness`,
        "name": `SMAS Systems - ${location.name}`,
        "description": `Software development services for businesses in ${location.name}, Kenya`,
        "url": pageUrl,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "KE",
          "addressLocality": location.name
        },
        "geo": location.coordinates ? {
          "@type": "GeoCoordinates",
          "latitude": location.coordinates.lat,
          "longitude": location.coordinates.lng
        } : undefined,
        "telephone": "+254-719-832-719",
        "priceRange": `KES ${service.pricingRange.min.toLocaleString()} - ${service.pricingRange.max.toLocaleString()}`
      },

      // WebPage
      {
        "@type": "WebPage",
        "@id": pageUrl,
        "url": pageUrl,
        "name": `${service.name} ${location.name} | SMAS Systems`,
        "description": content.intro,
        "isPartOf": { "@id": `${baseUrl}#website` },
        "about": { "@id": `${pageUrl}#service` },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${baseUrl}/og-image.png`
        },
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0]
      },

      // Website
      {
        "@type": "WebSite",
        "@id": `${baseUrl}#website`,
        "url": baseUrl,
        "name": "SMAS Systems",
        "description": "Software development company in Kenya",
        "publisher": { "@id": `${baseUrl}#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },

      // Breadcrumb
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": `${baseUrl}/services`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${service.name} in ${location.name}`,
            "item": pageUrl
          }
        ]
      }
    ]
  };
}

export function generateLocationFAQSchema(service: any, location: any) {
  const faqs = [
    {
      question: `What is ${service.name} in ${location.name}?`,
      answer: `${service.description} tailored for businesses in ${location.name}, Kenya. Our solutions incorporate local market insights and regulatory compliance.`
    },
    {
      question: `How much does ${service.name} cost in ${location.name}?`,
      answer: `Pricing ranges from KES ${service.pricingRange.min.toLocaleString()} to KES ${service.pricingRange.max.toLocaleString()} depending on your specific requirements and business size.`
    },
    {
      question: `What industries benefit from ${service.name} in ${location.name}?`,
      answer: `${service.name} is ideal for ${service.targetIndustries.join(', ')} businesses operating in ${location.name}.`
    },
    {
      question: `How long does it take to implement ${service.name} in ${location.name}?`,
      answer: `Implementation typically takes 4-12 weeks depending on complexity, business size, and existing systems. We provide milestone-based delivery with regular progress updates.`
    },
    {
      question: `Do you provide support for ${service.name} in ${location.name}?`,
      answer: `Yes, we provide comprehensive support including training, maintenance, security updates, and technical assistance for all our clients in ${location.name}.`
    },
    {
      question: `Can ${service.name} integrate with existing systems in ${location.name}?`,
      answer: `Absolutely. Our solutions are designed for seamless integration with popular business systems, payment gateways, and local software commonly used in ${location.name}.`
    }
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateLocationProductSchema(service: any, location: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${service.name} for ${location.name}`,
    "description": `${service.description} specifically designed for businesses in ${location.name}, Kenya.`,
    "brand": {
      "@type": "Brand",
      "name": "SMAS Systems"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "KES",
      "priceRange": `${service.pricingRange.min} - ${service.pricingRange.max}`,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "SMAS Systems"
      }
    },
    "category": service.keywords[0],
    "areaServed": {
      "@type": "Place",
      "name": location.name,
      "addressCountry": "KE"
    }
  };
}