export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  icon?: string;
  category: string;
  features: string[];
  benefits: string[];
  pricing?: {
    startingPrice: string;
    popular?: boolean;
  };
  ctaText?: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "erp-systems",
    title: "ERP Systems",
    description: "Complete Enterprise Resource Planning solutions to streamline your business operations, integrate all departments, and improve decision-making with real-time data.",
    shortDescription: "Comprehensive business management software",
    category: "Business Management",
    features: [
      "Financial Management",
      "Inventory Control",
      "Human Resources",
      "Supply Chain Management",
      "Manufacturing Operations",
      "Business Intelligence",
      "Multi-company Support",
      "Real-time Analytics"
    ],
    benefits: [
      "Streamlined operations",
      "Better decision making",
      "Cost reduction",
      "Improved efficiency",
      "Real-time insights"
    ],
    pricing: {
      startingPrice: "KSh 500,000",
      popular: true
    },
    ctaText: "Get ERP Quote",
    metaTitle: "ERP Systems Kenya | Enterprise Resource Planning Software",
    metaDescription: "Professional ERP systems in Kenya. Streamline business operations with integrated financial, inventory, and HR management software."
  },
  {
    id: "2",
    slug: "crm-platform",
    title: "CRM Platform",
    description: "Customer Relationship Management solutions to manage customer interactions, sales processes, marketing campaigns, and customer service operations.",
    shortDescription: "Customer relationship management software",
    category: "Sales & Marketing",
    features: [
      "Lead Management",
      "Sales Pipeline",
      "Contact Management",
      "Email Marketing",
      "Campaign Management",
      "Customer Service",
      "Analytics & Reporting",
      "Mobile Access"
    ],
    benefits: [
      "Increased sales",
      "Better customer service",
      "Improved marketing ROI",
      "Enhanced customer retention",
      "Data-driven insights"
    ],
    pricing: {
      startingPrice: "KSh 150,000"
    },
    ctaText: "Start CRM Demo",
    metaTitle: "CRM Platform Kenya | Customer Relationship Management Software",
    metaDescription: "Professional CRM software in Kenya. Manage customers, sales, and marketing with integrated CRM solutions."
  },
  {
    id: "3",
    slug: "hr-system",
    title: "HR Management System",
    description: "Human Resources management software for employee onboarding, payroll, performance tracking, leave management, and workforce analytics.",
    shortDescription: "Complete HR management solution",
    category: "Human Resources",
    features: [
      "Employee Onboarding",
      "Payroll Management",
      "Performance Tracking",
      "Leave Management",
      "Attendance Tracking",
      "Recruitment Management",
      "Employee Self-Service",
      "HR Analytics"
    ],
    benefits: [
      "Streamlined HR processes",
      "Improved employee experience",
      "Compliance management",
      "Cost savings",
      "Better workforce insights"
    ],
    pricing: {
      startingPrice: "KSh 200,000"
    },
    ctaText: "HR System Demo",
    metaTitle: "HR Management System Kenya | Human Resources Software",
    metaDescription: "Professional HR software in Kenya. Manage payroll, performance, and employee data with integrated HR solutions."
  },
  {
    id: "4",
    slug: "inventory-systems",
    title: "Inventory Management",
    description: "Advanced inventory management systems for tracking stock levels, managing suppliers, optimizing reorder points, and improving supply chain efficiency.",
    shortDescription: "Smart inventory control software",
    category: "Operations",
    features: [
      "Stock Tracking",
      "Supplier Management",
      "Reorder Point Alerts",
      "Barcode Integration",
      "Multi-location Support",
      "Demand Forecasting",
      "Cost Analysis",
      "Mobile Inventory"
    ],
    benefits: [
      "Reduced stockouts",
      "Lower carrying costs",
      "Improved accuracy",
      "Better supplier relations",
      "Real-time visibility"
    ],
    pricing: {
      startingPrice: "KSh 100,000"
    },
    ctaText: "Inventory System Quote",
    metaTitle: "Inventory Management Software Kenya | Stock Control Systems",
    metaDescription: "Professional inventory management software in Kenya. Track stock, manage suppliers, and optimize inventory levels."
  },
  {
    id: "5",
    slug: "pos-systems",
    title: "Point of Sale Systems",
    description: "Modern POS systems for retail businesses with sales tracking, inventory integration, customer management, and detailed reporting capabilities.",
    shortDescription: "Retail POS software solutions",
    category: "Retail",
    features: [
      "Sales Processing",
      "Inventory Integration",
      "Customer Management",
      "Receipt Printing",
      "Payment Processing",
      "Sales Reports",
      "Employee Management",
      "Loyalty Programs"
    ],
    benefits: [
      "Faster transactions",
      "Reduced errors",
      "Better customer service",
      "Inventory accuracy",
      "Sales insights"
    ],
    pricing: {
      startingPrice: "KSh 50,000"
    },
    ctaText: "POS System Demo",
    metaTitle: "POS Systems Kenya | Point of Sale Software for Retail",
    metaDescription: "Professional POS systems in Kenya. Modern point of sale software for retail businesses with inventory integration."
  },
  {
    id: "6",
    slug: "web-development",
    title: "Web Development",
    description: "Custom web applications, e-commerce platforms, and responsive websites built with modern technologies for optimal performance and user experience.",
    shortDescription: "Custom web applications & websites",
    category: "Development",
    features: [
      "Custom Web Applications",
      "E-commerce Platforms",
      "Responsive Design",
      "API Development",
      "Database Design",
      "Performance Optimization",
      "SEO Integration",
      "Mobile-First Design"
    ],
    benefits: [
      "Modern user experience",
      "Scalable architecture",
      "SEO optimized",
      "Mobile responsive",
      "Fast loading speeds"
    ],
    pricing: {
      startingPrice: "KSh 150,000"
    },
    ctaText: "Start Web Project",
    metaTitle: "Web Development Kenya | Custom Websites & Web Applications",
    metaDescription: "Professional web development services in Kenya. Custom websites, e-commerce platforms, and web applications."
  },
  {
    id: "7",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android with modern UI/UX design, offline capabilities, and seamless user experience.",
    shortDescription: "Native & cross-platform mobile apps",
    category: "Development",
    features: [
      "iOS App Development",
      "Android App Development",
      "Cross-platform Apps",
      "UI/UX Design",
      "Offline Capabilities",
      "Push Notifications",
      "App Store Optimization",
      "Maintenance & Support"
    ],
    benefits: [
      "Increased engagement",
      "Brand visibility",
      "Offline functionality",
      "Better user experience",
      "App store success"
    ],
    pricing: {
      startingPrice: "KSh 300,000"
    },
    ctaText: "Mobile App Quote",
    metaTitle: "Mobile App Development Kenya | iOS & Android Apps",
    metaDescription: "Professional mobile app development in Kenya. Native iOS and Android apps with modern design and functionality."
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter(service => service.category === category);
}

export function getFeaturedServices(): Service[] {
  return services.filter(service => service.pricing?.popular);
}