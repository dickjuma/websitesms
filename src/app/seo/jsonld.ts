type JsonLdPage = "home" | "about" | "services" | "contact" | "case-studies" | "blog" | "kenya" | "uganda" | "tanzania" | "rwanda" | "drc" | "south-sudan" | "faq";

interface SchemaOrg {
  "@context": "https://schema.org";
  "@graph": object[];
}

export function generateJsonLd(page?: string): SchemaOrg {
  const organization = {
    "@type": "Organization",
    "@id": "https://smassystems.com/#org",
    name: "SMA Systems",
    alternateName: "SMA Systems and Softwares",
    url: "https://smassystems.com",
    logo: "https://smassystems.com/images/logo.png",
    image: "https://smassystems.com/images/logo.png",
    description:
      "SMA Systems is East Africa's leading ERP & POS provider. We build custom ERP systems, POS software, inventory management, CRM, and business automation solutions for enterprises across Kenya, Uganda, Tanzania, Rwanda, DRC, and South Sudan.",
    sameAs: [
      "https://facebook.com/smassystems",
      "https://twitter.com/smassystems",
      "https://linkedin.com/company/smassystems",
      "https://instagram.com/smassystems",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254-719-832719",
      contactType: "customer service",
      areaServed: ["KE", "UG", "TZ", "RW", "CD", "SS"],
      availableLanguage: ["English", "Swahili", "French", "Arabic", "Luganda", "Kinyarwanda"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nairobi, Kenya",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "KE",
    },
    foundingDate: "2020",
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Country", name: "Uganda" },
      { "@type": "Country", name: "Tanzania" },
      { "@type": "Country", name: "Rwanda" },
      { "@type": "Country", name: "Democratic Republic of the Congo" },
      { "@type": "Country", name: "South Sudan" },
      { "@type": "Country", name: "Burundi" },
      { "@type": "Country", name: "Ethiopia" },
    ],
    priceRange: "KSh",
    currenciesAccepted: ["KES", "USD", "UGX", "TZS", "RWF", "CDF"],
  };

  const localBusiness = {
    "@type": ["LocalBusiness", "ProfessionalService", "SoftwareApplication"],
    "@id": "https://smassystems.com/#business",
    name: "SMA Systems",
    url: "https://smassystems.com",
    logo: "https://smassystems.com/images/logo.png",
    description:
      "East Africa's leading ERP and POS provider. Custom ERP systems, POS software, inventory management, CRM, websites, mobile apps, and enterprise software for businesses across Kenya, Uganda, Tanzania, Rwanda, DRC, and South Sudan.",
    telephone: "+254719832719",
    email: "hello@smassystems.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-1.286389",
      longitude: "36.817223",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "KSh",
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Country", name: "Uganda" },
      { "@type": "Country", name: "Tanzania" },
      { "@type": "Country", name: "Rwanda" },
      { "@type": "Country", name: "Democratic Republic of the Congo" },
      { "@type": "Country", name: "South Sudan" },
    ],
    serviceType: [
      "ERP Systems",
      "POS Systems",
      "Inventory Management",
      "CRM Software",
      "Web Development",
      "Mobile App Development",
      "E-commerce Solutions",
      "School Management Software",
      "Hotel Management System",
      "Healthcare Management",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": "https://smassystems.com/#website",
    url: "https://smassystems.com",
    name: "SMA Systems - ERP & POS Provider East Africa",
    publisher: { "@id": "https://smassystems.com/#org" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://smassystems.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en", "sw", "fr"],
  };

  const products = {
    "@type": "Product",
    "@id": "https://smassystems.com/#erp-product",
    name: "ERP System Kenya",
    description:
      "Custom ERP system for Kenyan businesses. Inventory, accounting, HR, CRM all in one. For Nairobi, Mombasa businesses.",
    image: "https://smassystems.com/favicon.ico",
    brand: {
      "@type": "Brand",
      name: "SMA Systems",
    },
    manufacturer: {
      "@id": "https://smassystems.com/#org",
    },
    category: "Business Software",
    areaServed: [
      { "@type": "Country", name: "Kenya", url: "https://smassystems.com/kenya" },
      { "@type": "Country", name: "Uganda", url: "https://smassystems.com/uganda" },
      { "@type": "Country", name: "Tanzania", url: "https://smassystems.com/tanzania" },
      { "@type": "Country", name: "Rwanda", url: "https://smassystems.com/rwanda" },
      { "@type": "Country", name: "DRC", url: "https://smassystems.com/drc" },
      { "@type": "Country", name: "South Sudan", url: "https://smassystems.com/south-sudan" },
      { "@type": "Country", name: "Burundi", url: "https://smassystems.com/burundi" },
      { "@type": "Country", name: "Ethiopia", url: "https://smassystems.com/ethiopia" },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: ["KE", "UG", "TZ", "RW", "CD", "SS"],
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "PartialDayWeek",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          },
          cutoffTime: "17:00",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        name: "SMA Systems Return Policy",
        returnPolicyCategory: "https://schema.org/ReturnDamaged",
        returnFees: "https://schema.org/ReturnShippingFees",
        returnWithin: "https://schema.org/ThirtyDayReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
  };

  const posProduct = {
    "@type": "Product",
    "@id": "https://smassystems.com/#pos-product",
    name: "POS System Kenya",
    description:
      "Point of Sale system for retail, restaurants, supermarkets in Kenya. Cloud-based, mobile-ready.",
    image: "https://smassystems.com/favicon.ico",
    brand: {
      "@type": "Brand",
      name: "SMA Systems",
    },
    category: "Point of Sale Software",
    areaServed: [
      { "@type": "Country", name: "Kenya", url: "https://smassystems.com/kenya" },
      { "@type": "Country", name: "Uganda", url: "https://smassystems.com/uganda" },
      { "@type": "Country", name: "Tanzania", url: "https://smassystems.com/tanzania" },
      { "@type": "Country", name: "Rwanda", url: "https://smassystems.com/rwanda" },
      { "@type": "Country", name: "DRC", url: "https://smassystems.com/drc" },
      { "@type": "Country", name: "South Sudan", url: "https://smassystems.com/south-sudan" },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: ["KE", "UG", "TZ", "RW", "CD", "SS"],
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "PartialDayWeek",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          },
          cutoffTime: "17:00",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        name: "SMA Systems Return Policy",
        returnPolicyCategory: "https://schema.org/ReturnDamaged",
        returnFees: "https://schema.org/ReturnShippingFees",
        returnWithin: "https://schema.org/ThirtyDayReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
    },
  };

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": "https://smassystems.com/#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://smassystems.com",
      },
    ],
  };

  const faq = {
    "@type": "FAQPage",
    "@id": "https://smassystems.com/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you provide ERP systems in Kenya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, SMA Systems is Kenya's leading ERP provider. We serve Nairobi, Mombasa, Kisumu and all 47 counties with custom ERP solutions.",
        },
      },
      {
        "@type": "Question",
        name: "Do you have POS systems for Kenyan businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we provide POS systems for restaurants, retail, supermarkets across Kenya. Cloud-based with mobile support.",
        },
      },
      {
        "@type": "Question",
        name: "Where is SMA Systems located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are based in Nairobi, Kenya and serve all of East Africa.",
        },
      },
      {
        "@type": "Question",
        name: "How much does ERP system cost in Kenya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ERP system pricing in Kenya varies based on business size. Contact us for a custom quote. We offer affordable solutions for SMEs.",
        },
      },
    ],
  };

  const pageItems: Record<JsonLdPage, { name: string; url: string }> = {
    home: { name: "Home", url: "https://smassystems.com" },
    about: { name: "About Us", url: "https://smassystems.com/about" },
    services: { name: "Services", url: "https://smassystems.com/services" },
    contact: { name: "Contact", url: "https://smassystems.com/contact" },
    "case-studies": { name: "Case Studies", url: "https://smassystems.com/case-studies" },
    blog: { name: "Blog", url: "https://smassystems.com/blog" },
    kenya: { name: "Kenya", url: "https://smassystems.com/kenya" },
    uganda: { name: "Uganda", url: "https://smassystems.com/uganda" },
    tanzania: { name: "Tanzania", url: "https://smassystems.com/tanzania" },
    rwanda: { name: "Rwanda", url: "https://smassystems.com/rwanda" },
    drc: { name: "DRC", url: "https://smassystems.com/drc" },
    "south-sudan": { name: "South Sudan", url: "https://smassystems.com/south-sudan" },
    faq: { name: "FAQ", url: "https://smassystems.com/faq" },
  };

  if (page && page !== "home") {
    const pageItem = pageItems[page as JsonLdPage];
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: pageItem?.name || page,
      item: pageItem?.url || `https://smassystems.com/${page}`,
    });
  }

  const graph: object[] = [organization, localBusiness, website, products, posProduct];

  if (page && page !== "home") {
    graph.push(breadcrumbList);
  }

  if (!page || page === "home" || page === "faq" || page === "services") {
    graph.push(faq);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}