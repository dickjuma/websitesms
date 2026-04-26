export interface ServicePageData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  keywords: string[];

  // Hero section
  hero: {
    h1: string;
    subheading: string;
    cta: {
      primary: string;
      secondary: string;
    };
    trustLine: string;
    backgroundImage: string;
  };

  // Localized introduction
  introduction: {
    what: string;
    why: string;
    challenges: string[];
  };

  // Why businesses need this service
  whyNeeded: {
    painPoints: string[];
    industryProblems: string[];
    benefits: string[];
  };

  // Benefits section (4-8 cards)
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  // Features section (static across locations)
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  // Industries in location
  industries: Array<{
    name: string;
    description: string;
    examples: string[];
  }>;

  // Process section
  process: Array<{
    step: number;
    title: string;
    description: string;
    duration?: string;
  }>;

  // FAQ section
  faq: Array<{
    question: string;
    answer: string;
  }>;

  // Final CTA
  finalCta: {
    title: string;
    description: string;
    whatsappText: string;
    contactFormTitle: string;
  };

  // Pricing
  pricing: {
    startingPrice: string;
    popular?: boolean;
    features: string[];
  };

  // Schema data
  schema: {
    serviceType: string;
    areaServed: string[];
  };
}

export const getServicePageData = (serviceSlug: string): ServicePageData | null => {
  return servicePageData[serviceSlug] || null;
};

const servicePageData: Record<string, ServicePageData> = {
  "pos-systems": {
    id: "pos-systems",
    slug: "pos-systems",
    title: "POS Systems",
    shortDescription: "Modern point of sale solutions for retail businesses",
    description: "Complete point of sale systems with inventory management, payment processing, and sales reporting for retail stores, restaurants, and hospitality businesses.",
    keywords: ["POS systems", "point of sale", "retail POS", "restaurant POS", "payment processing", "Kenya POS"],

    hero: {
      h1: "Best POS Systems in {{location}}, Kenya",
      subheading: "Transform your retail business with modern POS solutions tailored for Kenyan businesses. Fast checkout, accurate inventory, and real-time sales insights.",
      cta: {
        primary: "Get Free Demo",
        secondary: "WhatsApp Us"
      },
      trustLine: "Trusted by businesses across Kenya",
      backgroundImage: "AI-ready SaaS style background with Kenyan retail elements"
    },

    introduction: {
      what: "POS (Point of Sale) systems are modern cash registers that handle sales transactions, inventory tracking, customer management, and business reporting.",
      why: "Kenyan businesses need POS systems to compete in the digital economy, reduce losses from manual errors, and provide better customer experiences.",
      challenges: [
        "Manual calculation errors leading to losses",
        "Poor inventory visibility causing stockouts",
        "Slow checkout processes frustrating customers",
        "Lack of sales data for business decisions",
        "Cash handling security risks"
      ]
    },

    whyNeeded: {
      painPoints: [
        "Manual inventory counting takes hours",
        "Lost sales due to stockouts",
        "Customer queues during peak hours",
        "Cash theft and accounting errors",
        "No sales analytics for growth planning"
      ],
      industryProblems: [
        "Increasing competition from modern retailers",
        "Rising customer expectations for digital payments",
        "Pressure to reduce operational costs",
        "Need for compliance with tax regulations",
        "Demand for contactless payments post-COVID"
      ],
      benefits: [
        "Digital transformation for competitive advantage",
        "Improved customer satisfaction with faster service",
        "Better inventory control reducing losses",
        "Real-time business insights for growth",
        "Secure payment processing and reporting"
      ]
    },

    benefits: [
      {
        title: "Faster Operations in {{location}}",
        description: "Reduce checkout time from minutes to seconds with automated processing",
        icon: "⚡"
      },
      {
        title: "Better Inventory Control",
        description: "Real-time stock tracking prevents stockouts and overstocking",
        icon: "📦"
      },
      {
        title: "Reduced Manual Work",
        description: "Automate calculations, receipts, and reporting tasks",
        icon: "🤖"
      },
      {
        title: "Scalable Business Systems",
        description: "Grow from single store to multi-location operations",
        icon: "📈"
      },
      {
        title: "Secure Payment Processing",
        description: "Accept cash, card, and mobile money payments securely",
        icon: "🔒"
      },
      {
        title: "Real-time Sales Reports",
        description: "Get instant insights into sales performance and trends",
        icon: "📊"
      }
    ],

    features: [
      {
        title: "POS Billing System",
        description: "Fast and accurate transaction processing with receipt printing",
        icon: "💰"
      },
      {
        title: "ERP Dashboards",
        description: "Comprehensive business intelligence and reporting tools",
        icon: "📊"
      },
      {
        title: "Cloud Access",
        description: "Access your data from anywhere with secure cloud storage",
        icon: "☁️"
      },
      {
        title: "Reporting Tools",
        description: "Detailed sales, inventory, and financial reports",
        icon: "📈"
      },
      {
        title: "Multi-device Support",
        description: "Works on tablets, phones, and dedicated POS terminals",
        icon: "📱"
      },
      {
        title: "Payment Integration",
        description: "Accept cards, mobile money, and cash payments",
        icon: "💳"
      }
    ],

    industries: [
      {
        name: "Retail Shops",
        description: "Small and medium retail stores selling groceries, electronics, and general merchandise",
        examples: ["Supermarkets", "Electronics stores", "Clothing boutiques", "Hardware stores"]
      },
      {
        name: "Supermarkets",
        description: "Large retail chains with multiple departments and high transaction volumes",
        examples: ["Chain supermarkets", "Department stores", "Hypermarkets", "Convenience stores"]
      },
      {
        name: "Restaurants",
        description: "Food service businesses including cafes, restaurants, and fast food outlets",
        examples: ["Fine dining restaurants", "Fast food chains", "Cafes", "Food courts"]
      },
      {
        name: "Pharmacies",
        description: "Medical stores and pharmacies requiring accurate inventory and prescription tracking",
        examples: ["Retail pharmacies", "Medical clinics", "Veterinary stores", "Health shops"]
      },
      {
        name: "Schools",
        description: "Educational institutions managing cafeteria sales and school supplies",
        examples: ["Primary schools", "Secondary schools", "Universities", "Training colleges"]
      },
      {
        name: "SMEs",
        description: "Small and medium enterprises across various sectors needing business automation",
        examples: ["Consulting firms", "Service providers", "Professional offices", "Small manufacturers"]
      }
    ],

    process: [
      {
        step: 1,
        title: "Consultation in {{location}}",
        description: "We visit your business to understand your specific needs and workflow",
        duration: "1-2 days"
      },
      {
        step: 2,
        title: "Setup & Configuration",
        description: "Configure the POS system with your products, pricing, and business rules",
        duration: "3-5 days"
      },
      {
        step: 3,
        title: "Custom Configuration",
        description: "Customize reports, integrations, and features for your business model",
        duration: "2-3 days"
      },
      {
        step: 4,
        title: "Deployment & Training",
        description: "Install the system and train your staff on daily operations",
        duration: "1-2 days"
      },
      {
        step: 5,
        title: "Ongoing Support",
        description: "24/7 technical support and regular system updates",
        duration: "Ongoing"
      }
    ],

    faq: [
      {
        question: "Is POS Systems available in {{location}}?",
        answer: "Yes! We provide POS systems throughout Kenya including {{location}}. Our local team handles installation, training, and ongoing support."
      },
      {
        question: "How much does POS Systems cost in {{location}}?",
        answer: "POS system pricing starts from KSh 50,000 depending on your business size and requirements. Contact us for a customized quote."
      },
      {
        question: "Do you offer support in Kenya?",
        answer: "Absolutely! We provide 24/7 technical support with local technicians who understand the Kenyan business environment."
      },
      {
        question: "Can I integrate POS with my existing systems?",
        answer: "Yes, our POS systems integrate with accounting software, inventory management, and other business systems."
      },
      {
        question: "What payment methods are supported?",
        answer: "Our POS systems support cash, credit/debit cards, mobile money (M-Pesa, Airtel Money), and bank transfers."
      },
      {
        question: "How long does setup take?",
        answer: "Typical setup takes 1-2 weeks including consultation, configuration, training, and deployment."
      }
    ],

    finalCta: {
      title: "Get POS Systems in {{location}} today",
      description: "Transform your business with modern POS technology. Join hundreds of Kenyan businesses already using our solutions.",
      whatsappText: "Chat with our {{location}} expert",
      contactFormTitle: "Get Your Free POS Demo"
    },

    pricing: {
      startingPrice: "KSh 50,000",
      popular: true,
      features: ["POS Terminal", "Receipt Printer", "Basic Training", "6 Months Support"]
    },

    schema: {
      serviceType: "PointOfSaleSystem",
      areaServed: ["Kenya", "{{location}}"]
    }
  },

  "erp-systems": {
    id: "erp-systems",
    slug: "erp-systems",
    title: "ERP Systems",
    shortDescription: "Complete business management software",
    description: "Comprehensive Enterprise Resource Planning solutions for operations, finance, HR, and inventory management.",
    keywords: ["ERP systems", "enterprise resource planning", "business management software", "ERP solutions", "Kenya ERP"],

    hero: {
      h1: "Best ERP Systems in {{location}}, Kenya",
      subheading: "Streamline your entire business with integrated ERP solutions designed for Kenyan enterprises. Connect all departments for better decision making.",
      cta: {
        primary: "Get Free Demo",
        secondary: "WhatsApp Us"
      },
      trustLine: "Trusted by businesses across Kenya",
      backgroundImage: "AI-ready SaaS style background with Kenyan business elements"
    },

    introduction: {
      what: "ERP (Enterprise Resource Planning) systems integrate all business processes into a unified platform for finance, HR, inventory, and operations.",
      why: "Kenyan businesses need ERP systems to eliminate data silos, improve efficiency, and compete with modern enterprises globally.",
      challenges: [
        "Disconnected business systems causing data inconsistencies",
        "Manual processes leading to errors and delays",
        "Lack of real-time business visibility",
        "Difficulty in generating comprehensive reports",
        "Compliance challenges with multiple regulatory requirements"
      ]
    },

    whyNeeded: {
      painPoints: [
        "Data scattered across multiple spreadsheets and systems",
        "Manual reconciliation of financial records",
        "Delays in decision making due to outdated information",
        "Compliance reporting taking weeks to complete",
        "Difficulty tracking business performance across departments"
      ],
      industryProblems: [
        "Increasing regulatory compliance requirements",
        "Pressure to improve operational efficiency",
        "Need for better inventory and supply chain management",
        "Demand for real-time business intelligence",
        "Competition from companies using modern ERP systems"
      ],
      benefits: [
        "Single source of truth for all business data",
        "Improved operational efficiency and productivity",
        "Better compliance with regulatory requirements",
        "Real-time insights for strategic decision making",
        "Scalable platform that grows with your business"
      ]
    },

    benefits: [
      {
        title: "Unified Business Operations",
        description: "Connect all departments with integrated workflows and data",
        icon: "🔗"
      },
      {
        title: "Real-time Financial Insights",
        description: "Get instant visibility into financial performance and cash flow",
        icon: "💰"
      },
      {
        title: "Automated Workflows",
        description: "Reduce manual processes with intelligent automation",
        icon: "⚙️"
      },
      {
        title: "Regulatory Compliance",
        description: "Built-in compliance tools for Kenyan business regulations",
        icon: "📋"
      },
      {
        title: "Scalable Architecture",
        description: "Grow from small business to enterprise with the same system",
        icon: "📈"
      },
      {
        title: "Multi-location Support",
        description: "Manage multiple branches and locations seamlessly",
        icon: "🏢"
      }
    ],

    features: [
      {
        title: "Financial Management",
        description: "Complete accounting, budgeting, and financial reporting",
        icon: "💼"
      },
      {
        title: "Inventory Control",
        description: "Advanced inventory tracking with automated reorder alerts",
        icon: "📦"
      },
      {
        title: "Human Resources",
        description: "Employee management, payroll, and HR analytics",
        icon: "👥"
      },
      {
        title: "Business Intelligence",
        description: "Advanced dashboards and reporting tools",
        icon: "📊"
      },
      {
        title: "Multi-company Support",
        description: "Manage multiple business entities in one system",
        icon: "🏭"
      },
      {
        title: "Real-time Analytics",
        description: "Live data updates and predictive analytics",
        icon: "📈"
      }
    ],

    industries: [
      {
        name: "Manufacturing",
        description: "Production companies needing integrated planning and inventory management",
        examples: ["Food processing", "Textile manufacturing", "Pharmaceuticals", "Construction materials"]
      },
      {
        name: "Retail Chains",
        description: "Multi-location retail businesses requiring centralized management",
        examples: ["Supermarket chains", "Pharmacy networks", "Electronics retailers", "Fashion chains"]
      },
      {
        name: "Healthcare",
        description: "Hospitals and clinics managing patient records, billing, and operations",
        examples: ["Private hospitals", "Medical clinics", "Diagnostic centers", "Pharmacies"]
      },
      {
        name: "Education",
        description: "Schools and universities managing administration and student services",
        examples: ["Universities", "Primary schools", "Training institutes", "Education groups"]
      },
      {
        name: "Logistics",
        description: "Transportation and logistics companies managing fleet and operations",
        examples: ["Courier services", "Transport companies", "Warehousing", "Supply chain firms"]
      },
      {
        name: "Professional Services",
        description: "Consulting, legal, and service firms needing project and client management",
        examples: ["Consulting firms", "Law firms", "Accounting firms", "IT services"]
      }
    ],

    process: [
      {
        step: 1,
        title: "Business Analysis",
        description: "Comprehensive assessment of your current processes and requirements",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "System Design",
        description: "Custom ERP configuration based on your business needs",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Data Migration",
        description: "Safe transfer of existing data to the new ERP system",
        duration: "1-2 weeks"
      },
      {
        step: 4,
        title: "Implementation",
        description: "System deployment with user training and testing",
        duration: "3-6 weeks"
      },
      {
        step: 5,
        title: "Go-live Support",
        description: "Post-launch support and system optimization",
        duration: "4-8 weeks"
      },
      {
        step: 6,
        title: "Ongoing Maintenance",
        description: "Regular updates, backups, and technical support",
        duration: "Ongoing"
      }
    ],

    faq: [
      {
        question: "Is ERP Systems available in {{location}}?",
        answer: "Yes! We implement ERP systems throughout Kenya including {{location}}. Our experienced team handles the entire implementation process locally."
      },
      {
        question: "How much does ERP Systems cost in {{location}}?",
        answer: "ERP system pricing starts from KSh 500,000 depending on modules and business size. We offer customized quotes based on your specific requirements."
      },
      {
        question: "Do you offer support in Kenya?",
        answer: "Yes, we provide comprehensive support including on-site training, 24/7 helpdesk, and regular system maintenance for all Kenyan businesses."
      },
      {
        question: "Can ERP integrate with existing systems?",
        answer: "Absolutely! Our ERP systems integrate with existing accounting software, CRM systems, e-commerce platforms, and other business applications."
      },
      {
        question: "How long does ERP implementation take?",
        answer: "Implementation typically takes 3-6 months depending on business complexity and the number of modules required."
      },
      {
        question: "Do you provide training for our staff?",
        answer: "Yes! We provide comprehensive training for all user levels including administrators, managers, and end-users with both classroom and on-the-job training."
      }
    ],

    finalCta: {
      title: "Get ERP Systems in {{location}} today",
      description: "Transform your business operations with integrated ERP solutions. Join leading Kenyan enterprises using our proven systems.",
      whatsappText: "Chat with our ERP expert",
      contactFormTitle: "Get Your Free ERP Consultation"
    },

    pricing: {
      startingPrice: "KSh 500,000",
      popular: true,
      features: ["Core Modules", "Implementation", "Training", "1 Year Support"]
    },

    schema: {
      serviceType: "BusinessApplication",
      areaServed: ["Kenya", "{{location}}"]
    }
  }
};

// Helper function to get service data with location replacement
export const getLocalizedServiceData = (serviceSlug: string, location: string): ServicePageData | null => {
  const baseData = getServicePageData(serviceSlug);
  if (!baseData) return null;

  // Deep clone and replace location placeholders
  const localizedData = JSON.parse(JSON.stringify(baseData));

  const replaceLocation = (obj: any): any => {
    if (typeof obj === 'string') {
      return obj.replace(/\{\{location\}\}/g, location);
    }
    if (Array.isArray(obj)) {
      return obj.map(replaceLocation);
    }
    if (obj && typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        newObj[key] = replaceLocation(obj[key]);
      }
      return newObj;
    }
    return obj;
  };

  return replaceLocation(localizedData);
};