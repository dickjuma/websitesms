export interface PricingCatalogTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface PricingCatalogItem {
  key: string;
  label: string;
  service: string;
  icon: string;
  description: string;
  customization: string;
  tiers: PricingCatalogTier[];
}

export const PRICING_CATALOG: PricingCatalogItem[] = [
  {
    key: "web-development",
    label: "Web Development",
    service: "Custom Web Development",
    icon: "globe",
    description: "Business websites, portals, and web apps priced for Kenyan startups, SMEs, and scaling brands.",
    customization:
      "Final pricing changes with content volume, custom features, CMS needs, and integrations such as M-Pesa, CRM, or booking flows.",
    tiers: [
      {
        id: "business-website",
        name: "Business Website",
        price: 45000,
        description: "A polished brochure or service website",
        features: ["Up to 10 pages", "Mobile responsive", "Lead forms", "Basic SEO setup", "2-3 weeks delivery"],
      },
      {
        id: "portal-or-web-app",
        name: "Portal or Web App",
        price: 120000,
        description: "Customer portal, dashboard, or internal workflow",
        features: ["Authentication", "Custom dashboard", "Database integration", "Notifications", "4-8 weeks delivery"],
        popular: true,
      },
      {
        id: "custom-platform",
        name: "Custom Platform",
        price: 450000,
        description: "A high-spec product with stronger integrations and scale",
        features: ["Custom UX flows", "Payments or ERP links", "Performance tuning", "Launch support", "10-16 weeks delivery"],
      },
    ],
  },
  {
    key: "ecommerce",
    label: "E-commerce",
    service: "E-commerce Solutions",
    icon: "shoppingCart",
    description: "Online stores for Kenya-focused businesses with checkout, payments, stock flow, and fulfillment in mind.",
    customization:
      "Product count, payment channels, delivery logic, accounting sync, and custom promotions affect the final quote.",
    tiers: [
      {
        id: "store-launch",
        name: "Store Launch",
        price: 85000,
        description: "A starter store for a focused product catalog",
        features: ["Up to 50 products", "M-Pesa checkout", "Order alerts", "Mobile responsive", "3-5 weeks delivery"],
      },
      {
        id: "growth-store",
        name: "Growth Store",
        price: 220000,
        description: "For growing shops that need stronger operations",
        features: ["Larger catalog", "Inventory sync", "Customer accounts", "Marketing integrations", "6-10 weeks delivery"],
        popular: true,
      },
      {
        id: "commerce-platform",
        name: "Commerce Platform",
        price: 650000,
        description: "For larger commerce operations and custom workflows",
        features: ["Advanced integrations", "Custom checkout rules", "Operational dashboards", "ERP/POS linkage", "10-16 weeks delivery"],
      },
    ],
  },
  {
    key: "mobile-apps",
    label: "Mobile Apps",
    service: "Mobile App Development",
    icon: "smartphone",
    description: "Cross-platform and business mobile apps aligned with practical delivery ranges in Kenya.",
    customization:
      "Platform coverage, offline needs, dashboards, payments, and release complexity determine final pricing.",
    tiers: [
      {
        id: "starter-app",
        name: "Starter App",
        price: 180000,
        description: "A simple MVP or field app with one core workflow",
        features: ["Android or cross-platform", "Authentication", "Notifications", "Basic backend connection", "6-8 weeks delivery"],
      },
      {
        id: "product-app",
        name: "Product App",
        price: 420000,
        description: "A stronger customer or staff-facing mobile product",
        features: ["iOS and Android", "API integrations", "Analytics", "Offline-ready screens", "10-14 weeks delivery"],
        popular: true,
      },
      {
        id: "enterprise-app-suite",
        name: "Enterprise App Suite",
        price: 1200000,
        description: "Complex mobile ecosystem with dashboards, payments, and operations support",
        features: ["Advanced workflows", "Payment integration", "Back-office portal", "Security hardening", "16+ weeks delivery"],
      },
    ],
  },
  {
    key: "custom",
    label: "Custom Software",
    service: "Custom Software Development",
    icon: "zap",
    description: "Business-specific platforms, internal tools, and workflow systems scoped for real operational needs.",
    customization:
      "Scope varies with modules, user roles, integrations, approvals, migration needs, and reporting depth.",
    tiers: [
      {
        id: "mvp-build",
        name: "MVP Build",
        price: 180000,
        description: "A first release for one focused workflow",
        features: ["Workflow mapping", "Admin dashboard", "Role-based access", "Basic reporting", "8-10 weeks delivery"],
      },
      {
        id: "operations-platform",
        name: "Operations Platform",
        price: 650000,
        description: "A stronger internal system with multiple user roles and automations",
        features: ["Multiple user roles", "Workflow automation", "Analytics dashboard", "API integrations", "12-16 weeks delivery"],
        popular: true,
      },
      {
        id: "enterprise-system",
        name: "Enterprise System",
        price: 1800000,
        description: "A large custom system with rollout support and advanced controls",
        features: ["Multi-branch setup", "Deep integrations", "Migration support", "Training and handover", "20+ weeks delivery"],
      },
    ],
  },
  {
    key: "erp",
    label: "ERP Systems",
    service: "ERP Systems",
    icon: "database",
    description: "ERP rollout pricing for Kenyan SMEs, multi-branch operations, and larger process teams.",
    customization:
      "Modules, user volume, reporting, compliance, data migration, and staff training all affect the final budget.",
    tiers: [
      {
        id: "core-erp-rollout",
        name: "Core ERP Rollout",
        price: 500000,
        description: "Finance, inventory, and approvals in one core system",
        features: ["Core modules setup", "User roles", "Basic reporting", "Onboarding", "10-14 weeks delivery"],
      },
      {
        id: "growth-erp",
        name: "Growth ERP",
        price: 1200000,
        description: "For multi-team workflows and stronger visibility",
        features: ["Workflow automation", "Advanced dashboards", "CRM or POS linkage", "Training", "14-20 weeks delivery"],
        popular: true,
      },
      {
        id: "enterprise-erp-program",
        name: "Enterprise ERP Program",
        price: 2800000,
        description: "A larger deployment with phased rollout and deeper integrations",
        features: ["Multi-branch setup", "Data migration", "Advanced security", "Change management", "24+ weeks delivery"],
      },
    ],
  },
  {
    key: "inventory",
    label: "Inventory Systems",
    service: "Inventory Systems",
    icon: "package",
    description: "Stock control, warehouse, and multi-location inventory systems for retail and operations teams.",
    customization:
      "Branch count, barcode flows, supplier workflows, POS links, and migration from spreadsheets change the total cost.",
    tiers: [
      {
        id: "stock-starter",
        name: "Stock Starter",
        price: 120000,
        description: "A focused inventory system for one store or warehouse",
        features: ["Product tracking", "Low-stock alerts", "Basic roles", "Reports", "4-6 weeks delivery"],
      },
      {
        id: "multi-store-inventory",
        name: "Multi-Store Inventory",
        price: 280000,
        description: "For growing operations with transfers and supplier workflows",
        features: ["Multi-location visibility", "Purchase workflows", "Barcode support", "Supplier records", "6-10 weeks delivery"],
        popular: true,
      },
      {
        id: "warehouse-suite",
        name: "Warehouse Suite",
        price: 750000,
        description: "For larger teams that need dispatch, stock, and audit controls together",
        features: ["Custom workflows", "ERP or POS integration", "Advanced permissions", "Dashboards", "10-16 weeks delivery"],
      },
    ],
  },
  {
    key: "crm",
    label: "CRM Systems",
    service: "CRM Systems",
    icon: "users",
    description: "Lead, sales, and customer operations systems tailored for Kenyan service and revenue teams.",
    customization:
      "Pipeline design, automations, communication channels, reporting, and integrations shape the final quote.",
    tiers: [
      {
        id: "sales-pipeline-crm",
        name: "Sales Pipeline CRM",
        price: 180000,
        description: "For lead capture, deal tracking, and team follow-up",
        features: ["Leads and contacts", "Pipeline stages", "Task reminders", "Basic reports", "5-7 weeks delivery"],
      },
      {
        id: "customer-operations-crm",
        name: "Customer Operations CRM",
        price: 420000,
        description: "For marketing, sales, and support visibility in one system",
        features: ["Sales workflows", "Customer records", "Automations", "Email or WhatsApp integration", "8-12 weeks delivery"],
        popular: true,
      },
      {
        id: "enterprise-crm-suite",
        name: "Enterprise CRM Suite",
        price: 950000,
        description: "For larger teams with reporting, approvals, and custom processes",
        features: ["Advanced analytics", "Role controls", "API connections", "Multi-team dashboards", "12-18 weeks delivery"],
      },
    ],
  },
  {
    key: "pos",
    label: "POS Systems",
    service: "POS Systems",
    icon: "creditCard",
    description: "POS pricing that blends checkout software, KRA-ready workflows, stock sync, and branch operations.",
    customization:
      "Hardware, eTIMS, M-Pesa, branch count, and accounting or inventory integration change the project price.",
    tiers: [
      {
        id: "single-outlet-pos",
        name: "Single Outlet POS",
        price: 90000,
        description: "For one retail, service, or restaurant location",
        features: ["Checkout workflow", "Stock sync", "Receipt setup", "Basic training", "3-5 weeks delivery"],
      },
      {
        id: "multi-branch-pos",
        name: "Multi-Branch POS",
        price: 250000,
        description: "For teams that need branch control, reporting, and customer tracking",
        features: ["Central dashboard", "M-Pesa support", "Inventory integration", "Staff permissions", "6-10 weeks delivery"],
        popular: true,
      },
      {
        id: "retail-operations-suite",
        name: "Retail Operations Suite",
        price: 650000,
        description: "For chains that need POS, stock, analytics, and custom integrations together",
        features: ["Custom reports", "ERP or accounting link", "Advanced controls", "Rollout support", "10-16 weeks delivery"],
      },
    ],
  },
  {
    key: "school",
    label: "School Management",
    service: "School Management",
    icon: "graduationCap",
    description: "School systems for fee collection, attendance, exams, and communication with parents or administrators.",
    customization:
      "Student count, portals, SMS, finance workflows, and integrations with payment or learning tools affect pricing.",
    tiers: [
      {
        id: "school-starter",
        name: "School Starter",
        price: 220000,
        description: "A focused system for a single school with core admin workflows",
        features: ["Student records", "Fee tracking", "Attendance", "Basic reports", "6-8 weeks delivery"],
      },
      {
        id: "school-growth",
        name: "School Growth",
        price: 480000,
        description: "For schools that need portals, exams, and stronger reporting",
        features: ["Parent portal", "Exam management", "SMS alerts", "Dashboards", "8-12 weeks delivery"],
        popular: true,
      },
      {
        id: "school-enterprise",
        name: "School Enterprise",
        price: 1100000,
        description: "For larger institutions or multi-campus operations",
        features: ["Multi-campus support", "Payments integration", "Custom workflows", "Advanced reporting", "12-18 weeks delivery"],
      },
    ],
  },
  {
    key: "hotel",
    label: "Hotel Management",
    service: "Hotel Management",
    icon: "building",
    description: "Hospitality systems for bookings, front desk, billing, housekeeping, and restaurant operations.",
    customization:
      "Room count, restaurant/POS linkage, OTA flows, loyalty features, and multi-property rollout affect the quote.",
    tiers: [
      {
        id: "hotel-starter",
        name: "Hotel Starter",
        price: 180000,
        description: "For a guesthouse or smaller hospitality setup",
        features: ["Room management", "Booking calendar", "Billing", "Basic reports", "5-7 weeks delivery"],
      },
      {
        id: "hotel-business",
        name: "Hotel Business",
        price: 420000,
        description: "For mid-size operations with stronger process visibility",
        features: ["Restaurant/POS integration", "Inventory tracking", "Online booking", "Guest reporting", "8-12 weeks delivery"],
        popular: true,
      },
      {
        id: "hotel-enterprise",
        name: "Hotel Enterprise",
        price: 950000,
        description: "For chains or larger properties that need more control",
        features: ["Multi-property setup", "Central reservation", "CRM workflows", "Advanced integrations", "12-18 weeks delivery"],
      },
    ],
  },
  {
    key: "healthcare",
    label: "Healthcare",
    service: "Healthcare Management",
    icon: "stethoscope",
    description: "Clinic and hospital systems for patient records, appointments, billing, pharmacy, and reporting.",
    customization:
      "Departments, lab or pharmacy modules, insurance handling, and compliance scope drive the final budget.",
    tiers: [
      {
        id: "clinic-starter",
        name: "Clinic Starter",
        price: 240000,
        description: "For a clinic or smaller practice with core workflows",
        features: ["Patient records", "Appointments", "Billing", "Consultation notes", "6-8 weeks delivery"],
      },
      {
        id: "clinic-professional",
        name: "Clinic Professional",
        price: 550000,
        description: "For multi-doctor clinics with stronger operational needs",
        features: ["Pharmacy or lab module", "Insurance support", "Reports", "Online booking", "8-14 weeks delivery"],
        popular: true,
      },
      {
        id: "hospital-enterprise",
        name: "Hospital Enterprise",
        price: 1300000,
        description: "For larger medical operations with deeper controls",
        features: ["Department workflows", "Advanced reporting", "Referral or admission flows", "Integration support", "14-20 weeks delivery"],
      },
    ],
  },
  {
    key: "api",
    label: "API Development",
    service: "API Development & Integrations",
    icon: "fileCode",
    description: "Integration work for payments, ERPs, CRMs, third-party platforms, and internal data syncs.",
    customization:
      "API count, data mapping complexity, monitoring, security, and documentation depth shape final pricing.",
    tiers: [
      {
        id: "single-integration",
        name: "Single Integration",
        price: 60000,
        description: "One payment, CRM, or ERP connection",
        features: ["One API connection", "Webhook handling", "Basic logs", "Documentation", "1-2 weeks delivery"],
      },
      {
        id: "integration-hub",
        name: "Integration Hub",
        price: 180000,
        description: "For products that need several systems connected cleanly",
        features: ["2-4 integrations", "Data mapping", "Retries and alerts", "Admin visibility", "3-6 weeks delivery"],
        popular: true,
      },
      {
        id: "enterprise-integration-layer",
        name: "Enterprise Integration Layer",
        price: 450000,
        description: "For multi-system flows with auditability and security requirements",
        features: ["Custom middleware", "Advanced auth", "Monitoring", "Technical documentation", "6-10 weeks delivery"],
      },
    ],
  },
  {
    key: "ai",
    label: "AI Solutions",
    service: "AI Solutions",
    icon: "sparkles",
    description: "AI chat, assistants, search, and workflow automation priced for practical business use in Kenya.",
    customization:
      "Model usage, channels, knowledge setup, integrations, and workflow depth determine the final quote.",
    tiers: [
      {
        id: "faq-chatbot",
        name: "FAQ Chatbot",
        price: 45000,
        description: "A website or WhatsApp assistant for FAQs and lead capture",
        features: ["Knowledge setup", "Basic interface", "Lead capture", "Launch support", "1-2 weeks delivery"],
      },
      {
        id: "ai-workflow-assistant",
        name: "AI Workflow Assistant",
        price: 180000,
        description: "For support, internal helpdesk, or document-assisted tasks",
        features: ["Custom prompts", "Knowledge base", "Workflow actions", "Analytics", "4-8 weeks delivery"],
        popular: true,
      },
      {
        id: "advanced-ai-operations",
        name: "Advanced AI Operations",
        price: 550000,
        description: "For multi-step automation, dashboards, and enterprise process support",
        features: ["Custom agent flows", "Integrations", "Human review states", "Usage reporting", "8-14 weeks delivery"],
      },
    ],
  },
  {
    key: "analytics",
    label: "Data Analytics",
    service: "Data Analytics & BI",
    icon: "barChart3",
    description: "Dashboards, reporting pipelines, and business intelligence systems for operational visibility.",
    customization:
      "Data sources, reporting complexity, automation needs, and stakeholder requirements affect the quote.",
    tiers: [
      {
        id: "reporting-starter",
        name: "Reporting Starter",
        price: 120000,
        description: "A core dashboard and monthly reporting workflow",
        features: ["1-2 dashboards", "Data cleanup", "KPI tracking", "Basic refresh flow", "3-5 weeks delivery"],
      },
      {
        id: "bi-dashboard-suite",
        name: "BI Dashboard Suite",
        price: 320000,
        description: "For teams that need role-based reporting across functions",
        features: ["Multiple dashboards", "Data pipeline setup", "Filters and exports", "Training", "6-10 weeks delivery"],
        popular: true,
      },
      {
        id: "enterprise-analytics-program",
        name: "Enterprise Analytics Program",
        price: 850000,
        description: "For multi-source analytics with deeper automation",
        features: ["Warehouse planning", "Cross-system reporting", "Executive views", "Governance support", "10-16 weeks delivery"],
      },
    ],
  },
  {
    key: "qa",
    label: "QA & Testing",
    service: "QA & Software Testing",
    icon: "bug",
    description: "Manual and structured QA coverage for releases, regressions, and high-risk workflows.",
    customization:
      "Pricing depends on release cadence, environments, risk level, and whether QA is sprint-based or ongoing.",
    tiers: [
      {
        id: "qa-sprint",
        name: "QA Sprint",
        price: 50000,
        description: "A focused test cycle before launch or a major release",
        features: ["Test plan", "Manual regression pass", "Bug report", "Retest cycle", "1-2 weeks delivery"],
      },
      {
        id: "release-qa-package",
        name: "Release QA Package",
        price: 150000,
        description: "For teams shipping core features and needing repeatable coverage",
        features: ["Multi-device testing", "Regression pack", "Test cases", "Release sign-off", "3-5 weeks delivery"],
        popular: true,
      },
      {
        id: "dedicated-qa-program",
        name: "Dedicated QA Program",
        price: 380000,
        description: "For products that need ongoing QA across multiple release cycles",
        features: ["Sprint QA support", "Structured reporting", "Environment coverage", "Risk tracking", "Monthly engagement"],
      },
    ],
  },
  {
    key: "cloud",
    label: "Cloud & DevOps",
    service: "Cloud & DevOps",
    icon: "server",
    description: "Infrastructure setup, CI/CD, monitoring, and production support aligned with local project budgets.",
    customization:
      "Cloud provider, traffic expectations, environments, support SLA, and migration scope all affect pricing.",
    tiers: [
      {
        id: "launch-setup",
        name: "Launch Setup",
        price: 120000,
        description: "Get your product deployed with the basics done right",
        features: ["Cloud setup", "Basic CI/CD", "Domain and SSL", "Monitoring", "2-3 weeks delivery"],
      },
      {
        id: "managed-devops",
        name: "Managed DevOps",
        price: 320000,
        description: "For growing products that need reliability and repeatable delivery",
        features: ["Environments", "Backups", "Alerts", "Security hardening", "4-8 weeks delivery"],
        popular: true,
      },
      {
        id: "enterprise-reliability-program",
        name: "Enterprise Reliability Program",
        price: 900000,
        description: "For larger systems that need stronger uptime and recovery planning",
        features: ["Scalable architecture", "Disaster recovery", "Advanced observability", "SLA planning", "8-12 weeks delivery"],
      },
    ],
  },
  {
    key: "security",
    label: "Cybersecurity",
    service: "Cybersecurity Services",
    icon: "shield",
    description: "Security reviews, penetration testing, and implementation support for business-critical systems.",
    customization:
      "App count, environments, audit depth, compliance scope, and remediation support influence the final quote.",
    tiers: [
      {
        id: "security-baseline-review",
        name: "Security Baseline Review",
        price: 100000,
        description: "A practical review of your app, website, or cloud setup",
        features: ["Configuration review", "Basic vulnerability scan", "Risk summary", "Action plan", "1-2 weeks delivery"],
      },
      {
        id: "pen-test-and-plan",
        name: "Pen Test and Plan",
        price: 280000,
        description: "For launch readiness or stronger stakeholder confidence",
        features: ["Manual testing", "Priority findings", "Remediation guidance", "Retest pass", "2-4 weeks delivery"],
        popular: true,
      },
      {
        id: "security-program",
        name: "Security Program",
        price: 650000,
        description: "For teams that need hardening, policy work, and engineering support together",
        features: ["Multi-surface review", "Security controls", "Implementation support", "Reporting pack", "4-8 weeks delivery"],
      },
    ],
  },
  {
    key: "design",
    label: "UI/UX Design",
    service: "UI/UX Design",
    icon: "penTool",
    description: "Interface design, user-flow work, and product design systems for web and mobile teams.",
    customization:
      "Quoted by screen count, research depth, prototype fidelity, and design-system complexity.",
    tiers: [
      {
        id: "ux-refresh",
        name: "UX Refresh",
        price: 60000,
        description: "For a focused website, landing page, or product cleanup",
        features: ["User-flow review", "Wireframes", "Visual direction", "Responsive layouts", "1-2 weeks delivery"],
      },
      {
        id: "product-design-sprint",
        name: "Product Design Sprint",
        price: 180000,
        description: "Designed for new products, portals, or app MVPs",
        features: ["UX workshop", "Clickable prototype", "10-20 screens", "Handoff files", "2-4 weeks delivery"],
        popular: true,
      },
      {
        id: "full-design-system",
        name: "Full Design System",
        price: 320000,
        description: "For mature products that need consistency across teams",
        features: ["Design system setup", "Large screen library", "Prototype coverage", "Developer handoff", "4-6 weeks delivery"],
      },
    ],
  },
  {
    key: "seo",
    label: "SEO & Marketing",
    service: "Digital Marketing & SEO",
    icon: "search",
    description: "SEO, content support, campaigns, and analytics for businesses that want lead generation, not vanity metrics.",
    customization:
      "Pricing varies with channels, ad spend management, content volume, reporting depth, and campaign goals.",
    tiers: [
      {
        id: "seo-starter",
        name: "SEO Starter",
        price: 35000,
        description: "Basic local SEO and visibility setup",
        features: ["Keyword research", "On-page fixes", "Google Business profile support", "Monthly report", "Monthly retainer"],
      },
      {
        id: "growth-marketing",
        name: "Growth Marketing",
        price: 90000,
        description: "For businesses that need consistent lead generation support",
        features: ["SEO strategy", "Content guidance", "Campaign support", "Analytics dashboard", "Monthly retainer"],
        popular: true,
      },
      {
        id: "full-funnel-marketing",
        name: "Full-Funnel Marketing",
        price: 220000,
        description: "For larger brands that need coordinated multi-channel execution",
        features: ["SEO and paid support", "Content operations", "Conversion tracking", "Management reporting", "Monthly retainer"],
      },
    ],
  },
  {
    key: "consulting",
    label: "IT Consulting",
    service: "IT Consulting & Advisory",
    icon: "briefcase",
    description: "Strategy, audits, architecture guidance, and technical planning for teams making technology decisions.",
    customization:
      "Workshops, architecture depth, stakeholder support, and retainer intensity affect final pricing.",
    tiers: [
      {
        id: "advisory-session",
        name: "Advisory Session",
        price: 15000,
        description: "A focused strategy, audit, or planning session",
        features: ["Discovery call", "Recommendations", "Follow-up notes", "Single session"],
      },
      {
        id: "monthly-advisory",
        name: "Monthly Advisory",
        price: 60000,
        description: "Ongoing support for planning and technical decision-making",
        features: ["Recurring review calls", "Architecture guidance", "Vendor review", "Monthly retainer"],
        popular: true,
      },
      {
        id: "fractional-tech-lead",
        name: "Fractional Tech Lead",
        price: 180000,
        description: "Embedded leadership support for teams building or scaling products",
        features: ["Technical roadmap", "Team guidance", "Delivery oversight", "Monthly retainer"],
      },
    ],
  },
  {
    key: "maintenance",
    label: "Maintenance",
    service: "Maintenance & Support",
    icon: "lifeBuoy",
    description: "Post-launch support plans for updates, fixes, backups, monitoring, and gradual improvements.",
    customization:
      "Pricing changes with system complexity, uptime expectations, incident response targets, and included support hours.",
    tiers: [
      {
        id: "basic-care",
        name: "Basic Care",
        price: 15000,
        description: "For brochure sites and small business websites",
        features: ["Monthly updates", "Backups", "Basic monitoring", "Email support", "Per month"],
      },
      {
        id: "growth-care",
        name: "Growth Care",
        price: 45000,
        description: "For active websites, stores, and business systems",
        features: ["Priority fixes", "Performance checks", "Weekly backups", "Support window", "Per month"],
        popular: true,
      },
      {
        id: "business-sla",
        name: "Business SLA",
        price: 95000,
        description: "For revenue-critical platforms that need stronger support coverage",
        features: ["Monitoring", "Incident response", "Scheduled improvements", "Reporting", "Per month"],
      },
    ],
  },
];

export interface ConfigurableServicePrice {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export function createDefaultPriceServices(): Record<string, ConfigurableServicePrice[]> {
  return Object.fromEntries(
    PRICING_CATALOG.map((item) => [
      item.key,
      item.tiers.map((tier) => ({
        id: tier.id,
        name: tier.name,
        price: tier.price,
        description: tier.description,
      })),
    ]),
  );
}

export const PRICE_SERVICE_LABELS = Object.fromEntries(
  PRICING_CATALOG.map((item) => [item.key, item.label]),
) as Record<string, string>;
