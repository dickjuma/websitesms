export type IconKey =
  | "barChart3"
  | "bot"
  | "briefcaseBusiness"
  | "bug"
  | "cloud"
  | "code2"
  | "creditCard"
  | "globe"
  | "graduationCap"
  | "heartPulse"
  | "layers3"
  | "package2"
  | "palette"
  | "shieldCheck"
  | "shoppingBag"
  | "smartphone"
  | "truck"
  | "users"
  | "workflow"
  | "checkCircle";

// Ensure data passed across Server/Client boundaries remains serializable.
// Avoid importing React components into this file; use string keys only.
export type SerializableData<T> = T extends Function ? never : T;

export type LinkItem = {
  label: string;
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  href: string;
  icon: IconKey;
};

export type ServiceStep = {
  title: string;
  description: string;
};

export type DetailPage = {
  title: string;
  eyebrow: string;
  description: string;
  highlights: string[];
  capabilities: string[];
  outcomes: string[];
  considerations?: string[];
  steps?: ServiceStep[];
  imageSrc?: string;
  imageAlt?: string;
  relatedLinks: LinkItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type PricingTier = {
  name: string;
  startingPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
};

export type ServicePricing = {
  service: string;
  icon: IconKey;
  description: string;
  tiers: PricingTier[];
  consultation: boolean;
  customization: string;
};

const contactLink = { label: "Talk to Our Team", href: "/contact" };
const processLink = { label: "View Our Process", href: "/process" };
const pricingLink = { label: "See Pricing", href: "/pricing" };

export const mainNav: LinkItem[] = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export const marketingNavGroups = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Marketing",
    links: [
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Products", href: "/products" },
      { label: "Pricing", href: "/pricing" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export const platformNavGroups = [
  {
    title: "Platform",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Invoices", href: "/invoices" },
      { label: "Support", href: "/support" },
      { label: "Settings", href: "/settings" },
    ],
  },
];

export const serviceItems: FeatureItem[] = [
  {
    title: "Custom Software Development",
    description: "Tailored software platforms designed around your business workflows, users, and growth goals.",
    href: "/services/custom-software-development",
    icon: "code2",
  },
  {
    title: "Custom Web Development",
    description: "Tailored websites, portals, and web applications built around your users, workflows, and business goals.",
    href: "/services/web-development",
    icon: "globe",
  },
  {
    title: "Mobile App Development",
    description: "iOS and Android experiences for customers, field teams, and product-led businesses.",
    href: "/services/mobile-app-development",
    icon: "smartphone",
  },
  {
    title: "UI/UX Design",
    description: "Research-backed interfaces and product flows that make software easier to learn and use.",
    href: "/services/ui-ux-design",
    icon: "palette",
  },
  {
    title: "ERP Systems",
    description: "Connected internal systems for operations, finance, approvals, inventory, and reporting.",
    href: "/services/erp-systems",
    icon: "layers3",
  },
  {
    title: "Inventory Systems",
    description: "Inventory control platforms for stock visibility, movement tracking, procurement, and warehouse operations.",
    href: "/services/inventory-systems",
    icon: "package2",
  },
  {
    title: "CRM Systems",
    description: "Lead, pipeline, and customer workflows that help revenue teams work with more visibility.",
    href: "/services/crm-systems",
    icon: "users",
  },
  {
    title: "POS Systems",
    description: "Point-of-sale systems for retail and service businesses that need smooth checkout, sales tracking, and operational reporting.",
    href: "/services/pos-systems",
    icon: "creditCard",
  },
  {
    title: "API Development & Integrations",
    description: "Reliable APIs and system integrations that connect products, teams, and third-party tools.",
    href: "/services/api-development-integrations",
    icon: "workflow",
  },
  {
    title: "AI Solutions",
    description: "Useful assistants, automation layers, and AI product features that solve real business problems.",
    href: "/services/ai-solutions",
    icon: "bot",
  },
  {
    title: "Data Analytics & BI",
    description: "Dashboards, reporting pipelines, and data visibility systems for stronger decision-making.",
    href: "/services/data-analytics-bi",
    icon: "barChart3",
  },
  {
    title: "QA & Software Testing",
    description: "Structured quality assurance that reduces release risk and improves product reliability.",
    href: "/services/qa-software-testing",
    icon: "bug",
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure, delivery pipelines, and monitoring that keep systems stable in production.",
    href: "/services/cloud-devops",
    icon: "cloud",
  },
  {
    title: "Cybersecurity Services",
    description: "Practical security planning, hardening, and protection for applications, users, and data.",
    href: "/services/cybersecurity-services",
    icon: "shieldCheck",
  },
  {
    title: "E-commerce Solutions",
    description: "Online stores, payment integration, inventory sync, and complete ecommerce platforms for retail businesses.",
    href: "/services/ecommerce-solutions",
    icon: "shoppingBag",
  },
  {
    title: "School Management",
    description: "Student records,fees, attendance, examinations, and academic administration for schools.",
    href: "/services/school-management",
    icon: "graduationCap",
  },
  {
    title: "Hotel Management",
    description: "Hotel reservations, front desk, housekeeping, billing and restaurant management for hospitality.",
    href: "/services/hotel-management",
    icon: "briefcaseBusiness",
  },
  {
    title: "Healthcare Management",
    description: "Patient records, appointments, billing, pharmacy and medical administration systems.",
    href: "/services/healthcare-management",
    icon: "heartPulse",
  },
  {
    title: "Digital Marketing & SEO",
    description: "Search engine optimization, content marketing, social media management, and analytics.",
    href: "/services/digital-marketing",
    icon: "globe",
  },
  {
    title: "IT Consulting",
    description: "Technology strategy, infrastructure planning, system audits, and digital transformation advisory.",
    href: "/services/it-consulting",
    icon: "workflow",
  },
];

export const solutionItems: FeatureItem[] = [
  {
    title: "Fintech",
    description: "Secure payments, customer dashboards, and financial product experiences.",
    href: "/solutions/fintech",
    icon: "creditCard",
  },
  {
    title: "Healthcare",
    description: "Reliable healthcare products and internal systems designed with privacy in mind.",
    href: "/solutions/healthcare",
    icon: "heartPulse",
  },
  {
    title: "Logistics",
    description: "Tracking, dispatch, and operations systems for moving teams and goods.",
    href: "/solutions/logistics",
    icon: "truck",
  },
  {
    title: "Education",
    description: "Learning and admin platforms with clear UX for staff and learners.",
    href: "/solutions/education",
    icon: "graduationCap",
  },
  {
    title: "E-commerce",
    description: "Commerce storefronts, admin tools, and operational systems built to convert.",
    href: "/solutions/ecommerce",
    icon: "shoppingBag",
  },
];

export const productItems: FeatureItem[] = [
  {
    title: "CRM Platform",
    description: "A customer relationship product for lead flow, sales execution, and account visibility.",
    href: "/products/crm-platform",
    icon: "users",
  },
  {
    title: "ERP Platform",
    description: "An operations platform that brings workflow, inventory, finance, and reporting together.",
    href: "/products/erp-platform",
    icon: "package2",
  },
  {
    title: "HR System",
    description: "A people operations system for onboarding, records, approvals, and internal coordination.",
    href: "/products/hr-system",
    icon: "briefcaseBusiness",
  },
];

const serviceRelated = {
  custom: [{ label: "Custom Web Development", href: "/services/web-development" }, { label: "Mobile App Development", href: "/services/mobile-app-development" }, contactLink],
  web: [{ label: "UI/UX Design", href: "/services/ui-ux-design" }, { label: "Custom Software Development", href: "/services/custom-software-development" }, contactLink],
  mobile: [{ label: "UI/UX Design", href: "/services/ui-ux-design" }, { label: "AI Solutions", href: "/services/ai-solutions" }, contactLink],
  design: [{ label: "Custom Web Development", href: "/services/web-development" }, { label: "Mobile App Development", href: "/services/mobile-app-development" }, contactLink],
  erp: [{ label: "Data Analytics & BI", href: "/services/data-analytics-bi" }, pricingLink, contactLink],
  inventory: [{ label: "ERP Systems", href: "/services/erp-systems" }, { label: "POS Systems", href: "/services/pos-systems" }, contactLink],
  crm: [{ label: "Data Analytics & BI", href: "/services/data-analytics-bi" }, { label: "AI Solutions", href: "/services/ai-solutions" }, contactLink],
  pos: [{ label: "Inventory Systems", href: "/services/inventory-systems" }, { label: "CRM Systems", href: "/services/crm-systems" }, contactLink],
  api: [{ label: "Cloud & DevOps", href: "/services/cloud-devops" }, { label: "Custom Software Development", href: "/services/custom-software-development" }, contactLink],
  ai: [{ label: "Data Analytics & BI", href: "/services/data-analytics-bi" }, { label: "CRM Systems", href: "/services/crm-systems" }, contactLink],
  data: [{ label: "CRM Systems", href: "/services/crm-systems" }, { label: "ERP Systems", href: "/services/erp-systems" }, contactLink],
  qa: [{ label: "Cloud & DevOps", href: "/services/cloud-devops" }, { label: "Custom Web Development", href: "/services/web-development" }, contactLink],
  cloud: [{ label: "Cybersecurity Services", href: "/services/cybersecurity-services" }, { label: "QA & Software Testing", href: "/services/qa-software-testing" }, pricingLink],
  cyber: [{ label: "Cloud & DevOps", href: "/services/cloud-devops" }, { label: "QA & Software Testing", href: "/services/qa-software-testing" }, contactLink],
  school: [{ label: "ERP Systems", href: "/services/erp-systems" }, { label: "CRM Systems", href: "/services/crm-systems" }, contactLink],
  hotel: [{ label: "POS Systems", href: "/services/pos-systems" }, { label: "ERP Systems", href: "/services/erp-systems" }, contactLink],
  healthcare: [{ label: "ERP Systems", href: "/services/erp-systems" }, { label: "CRM Systems", href: "/services/crm-systems" }, contactLink],
  consulting: [{ label: "Cloud & DevOps", href: "/services/cloud-devops" }, { label: "Cybersecurity Services", href: "/services/cybersecurity-services" }, contactLink],
  marketing: [{ label: "Web Development", href: "/services/web-development" }, { label: "E-commerce Solutions", href: "/services/ecommerce-solutions" }, contactLink],
};

export const serviceDetails: Record<string, DetailPage> = {
  "custom-software-development": {
    eyebrow: "Service",
    title: "Custom Software Development",
    description: "We design and build software around your exact workflows, customer journeys, and business rules instead of forcing your team into generic tools.",
    highlights: ["Business-specific product design", "Scalable architecture choices", "Long-term extensibility"],
    capabilities: [
      "Internal platforms, customer portals, admin systems, dashboards, and workflow tools mapped to real operational needs.",
      "Architecture planning for maintainability, integrations, permissions, reporting, and future feature growth.",
      "Delivery sprints that balance practical scope, user adoption, and clear business outcomes from the start.",
    ],
    outcomes: [
      "A system that matches how your team actually works instead of creating extra friction.",
      "Better control over features, data flow, and roadmap direction as the business evolves.",
      "A dependable software foundation you can extend without replacing the whole platform later.",
    ],
    considerations: [
      "The business workflows, approvals, and exceptions the software needs to support from day one.",
      "How users, roles, and permissions should behave across customer-facing and internal areas.",
      "Which existing tools, databases, or third-party services need to integrate cleanly.",
      "What should launch first as an MVP versus what can follow after adoption and learning.",
    ],
    steps: [
      { title: "Discovery & Scope", description: "We map users, processes, pain points, and the highest-value features to define a realistic first release." },
      { title: "Architecture & UX Planning", description: "We shape the product structure, data flow, key screens, and technical foundation before development ramps up." },
      { title: "Build & Iterate", description: "We develop the product in milestones, review working progress with you, and refine details as the software takes shape." },
      { title: "Launch & Improve", description: "We support rollout, stabilize early usage, and plan the next releases based on feedback and business priorities." },
    ],
    imageSrc: "/custom-software-development.jpg",
    imageAlt: "Custom software development service",
    relatedLinks: serviceRelated.custom,
    ctaLabel: "Plan Your Software Build",
    ctaHref: "/contact",
  },
  "web-development": {
    eyebrow: "Service",
    title: "Custom Web Development",
    description: "We build tailored websites, client portals, and web applications that match your business model instead of forcing you into a generic template.",
    highlights: ["Tailored web platforms", "Scalable architecture", "CMS and integration work"],
    capabilities: [
      "Marketing sites, portals, dashboards, ecommerce flows, and web applications shaped around real user journeys.",
      "Frontend and backend architecture planned around your content model, integrations, security, and long-term growth.",
      "Performance, SEO, analytics, and conversion-aware implementation for measurable business results.",
    ],
    outcomes: [
      "A stronger web presence that supports marketing, sales, operations, or customer self-service.",
      "A custom platform your team can grow without rebuilding from scratch later.",
      "Cleaner user journeys from traffic to inquiry, onboarding, purchase, or daily usage.",
    ],
    considerations: [
      "What the website or application should accomplish for leads, sales, operations, onboarding, or support.",
      "How content, SEO, analytics, integrations, and admin workflows need to work after launch.",
      "Which user journeys need the least friction across mobile, desktop, and back-office experiences.",
      "How the platform should scale as content, features, traffic, and users grow over time.",
    ],
    steps: [
      { title: "Discovery & Planning", description: "We define goals, page or feature scope, user journeys, and the integrations the web platform needs." },
      { title: "UX & Interface Design", description: "We shape layouts, content flow, interface patterns, and admin experiences around how people will use the system." },
      { title: "Development & Integration", description: "We build the frontend, backend, CMS, APIs, forms, and connected services required for launch readiness." },
      { title: "Launch & Optimization", description: "We test, ship, and refine the web platform around speed, analytics, SEO, conversion, and product performance." },
    ],
    imageSrc: "/webdevelopment_custom_web_development.jpg",
    imageAlt: "Custom web development service",
    relatedLinks: serviceRelated.web,
    ctaLabel: "Plan Your Custom Web Project",
    ctaHref: "/contact",
  },
  "mobile-app-development": {
    eyebrow: "Service",
    title: "Mobile App Development",
    description: "We create mobile experiences for customers, field teams, and internal operations with solid product thinking.",
    highlights: ["Cross-platform delivery", "Customer and internal apps", "Launch-ready quality"],
    capabilities: [
      "Mobile journeys for onboarding, transactions, approvals, notifications, and daily usage.",
      "Cross-platform engineering for iOS and Android with modern design patterns.",
      "Integration with business systems, analytics, payments, and operational workflows.",
    ],
    outcomes: [
      "A mobile product that feels polished enough for production users.",
      "Better access to your services for customers and teams on the move.",
      "A release path that stays aligned with your broader platform.",
    ],
    considerations: [
      "Whether the product should prioritize iOS, Android, or a shared cross-platform approach.",
      "How onboarding, offline behavior, notifications, and device permissions affect the experience.",
      "Which APIs, payments, maps, messaging, or internal systems need to connect into the app.",
      "How the app will be supported after launch with updates, analytics, and store management.",
    ],
    steps: [
      { title: "Product Definition", description: "We clarify user flows, release priorities, and the best delivery approach for the target devices and users." },
      { title: "Design & Prototype", description: "We design the mobile experience around simple navigation, high-frequency tasks, and real-world usage conditions." },
      { title: "App Development", description: "We build the app, connect services, and validate the experience across devices, environments, and release targets." },
      { title: "Store Release & Support", description: "We prepare for launch, handle release requirements, and support post-launch improvements and maintenance." },
    ],
    imageSrc: "/mobile-app-development.jpg",
    imageAlt: "Mobile app development service",
    relatedLinks: serviceRelated.mobile,
    ctaLabel: "Discuss Your App Idea",
    ctaHref: "/contact",
  },
  "ui-ux-design": {
    eyebrow: "Service",
    title: "UI/UX Design",
    description: "We design interfaces, journeys, and product systems that make software easier to adopt, easier to trust, and easier to use every day.",
    highlights: ["Research-led interfaces", "Clear product flows", "Consistent design systems"],
    capabilities: [
      "User journeys, wireframes, interface concepts, and product structure for web, mobile, and internal systems.",
      "Design systems and reusable patterns that help teams scale product consistency over time.",
      "Collaboration with product and engineering teams so designs remain practical to build and maintain.",
    ],
    outcomes: [
      "A more intuitive experience for users across onboarding, transactions, and day-to-day tasks.",
      "Less confusion and rework during development because the product direction is clearer up front.",
      "A stronger product identity that feels intentional instead of pieced together over time.",
    ],
    considerations: [
      "Who the primary user groups are and what success looks like for each of them.",
      "Where friction, drop-offs, or confusion currently happen in the product journey.",
      "How accessibility, responsiveness, and brand consistency should shape the design system.",
      "What engineering constraints or product deadlines need to be reflected in the design scope.",
    ],
    steps: [
      { title: "Research & Flow Mapping", description: "We review users, goals, edge cases, and existing pain points to shape the right experience direction." },
      { title: "Wireframes & Structure", description: "We define screen hierarchy, content placement, and interaction logic before polishing visuals." },
      { title: "Visual Design & Systemization", description: "We create the full interface language, reusable components, and key states for development handoff." },
      { title: "Handoff & Iteration", description: "We support implementation reviews, refine details, and keep the experience aligned through build." },
    ],
    imageSrc: "/ui-ux-design.jpg",
    imageAlt: "UI and UX design service",
    relatedLinks: serviceRelated.design,
    ctaLabel: "Start Your Product Design",
    ctaHref: "/contact",
  },
  "erp-systems": {
    eyebrow: "Service",
    title: "ERP Systems",
    description: "We design internal systems that centralize workflows, inventory, finance, approvals, and reporting.",
    highlights: ["Operations centralization", "Workflow automation", "Reporting visibility"],
    capabilities: [
      "Systems for finance, inventory, approvals, procurement, and cross-team handoffs.",
      "Role-based workflows that reduce spreadsheet dependence and manual follow-up.",
      "Dashboards and reporting layers that give leaders stronger visibility across teams.",
    ],
    outcomes: [
      "Better operational consistency across the business.",
      "More reliable approvals, reporting, and day-to-day execution visibility.",
      "An ERP foundation that supports process maturity as the company grows.",
    ],
    considerations: [
      "Which departments, workflows, and manual handoffs the ERP needs to unify first.",
      "How approvals, exceptions, permissions, and reporting should work across teams.",
      "What legacy spreadsheets or tools need migration without disrupting operations.",
      "Which dashboards leaders need to measure operational health and accountability.",
    ],
    steps: [
      { title: "Workflow Discovery", description: "We map current operations, bottlenecks, approvals, and data movement across the business." },
      { title: "ERP Scope & Module Planning", description: "We prioritize the modules, roles, and reporting requirements that matter most for the first rollout." },
      { title: "Implementation & Data Setup", description: "We build the ERP flows, configure roles, and move core data into a cleaner operational structure." },
      { title: "Rollout & Stabilization", description: "We support adoption, refine edge cases, and strengthen the system as teams start using it live." },
    ],
    imageSrc: "/erp-systems.jpg",
    imageAlt: "ERP systems service",
    relatedLinks: serviceRelated.erp,
    ctaLabel: "Plan Your ERP Rollout",
    ctaHref: "/contact",
  },
  "inventory-systems": {
    eyebrow: "Service",
    title: "Inventory Systems",
    description: "We build inventory systems that help businesses track stock, manage movement, reduce losses, and improve fulfillment accuracy across locations.",
    highlights: ["Real-time stock visibility", "Movement and warehouse tracking", "Procurement and reorder control"],
    capabilities: [
      "Inventory flows for receiving, stock counts, transfers, dispatch, returns, and reorder management.",
      "Dashboards and alerts that help teams monitor stock levels, shrinkage, turnover, and supply gaps.",
      "Integration with ERP, POS, ecommerce, or internal systems so inventory data stays connected across the business.",
    ],
    outcomes: [
      "Better visibility into what is in stock, where it is, and when it needs action.",
      "Fewer stock errors, delayed replenishment issues, and avoidable losses in operations.",
      "A stronger inventory foundation for retail, distribution, warehouse, and multi-branch growth.",
    ],
    considerations: [
      "How stock enters, moves through, and leaves the business across branches, stores, or warehouses.",
      "Which products, units, reorder rules, and approval steps need to be represented in the system.",
      "How barcode use, stock counts, returns, and damaged items should be handled operationally.",
      "Which sales, ERP, accounting, or reporting tools need inventory data to stay synchronized.",
    ],
    steps: [
      { title: "Operations Mapping", description: "We map current stock workflows, branch or warehouse movement, and the reporting gaps affecting inventory control." },
      { title: "Inventory Structure Design", description: "We define product records, stock rules, movement logic, reorder behavior, and dashboard needs." },
      { title: "System Build & Integration", description: "We implement the inventory workflows and connect them to the rest of your sales and operations stack." },
      { title: "Rollout & Optimization", description: "We support live adoption, refine edge cases, and improve accuracy once the team starts using the system day to day." },
    ],
    imageSrc: "/inventory-systems.jpg",
    imageAlt: "Inventory systems service",
    relatedLinks: serviceRelated.inventory,
    ctaLabel: "Plan Your Inventory System",
    ctaHref: "/contact",
  },
  "crm-systems": {
    eyebrow: "Service",
    title: "CRM Systems",
    description: "We build CRM systems that improve lead flow, account management, customer tracking, and sales visibility.",
    highlights: ["Lead and sales pipelines", "Customer lifecycle visibility", "Connected revenue workflows"],
    capabilities: [
      "Sales workflows for leads, opportunities, pipelines, customer notes, and account visibility.",
      "Integrations with marketing flows, support touchpoints, and reporting requirements.",
      "Operational dashboards that help teams follow up consistently and close work with less friction.",
    ],
    outcomes: [
      "Stronger control over lead handling and revenue operations.",
      "A cleaner view of customer relationships across teams.",
      "Less manual follow-up and fewer missed opportunities.",
    ],
    considerations: [
      "How leads enter the business and what qualification or assignment rules should happen next.",
      "Which sales stages, account records, and team handoffs need visibility inside the CRM.",
      "What integrations are needed for forms, campaigns, support tools, or finance systems.",
      "How reporting should show pipeline health, follow-up quality, and conversion performance.",
    ],
    steps: [
      { title: "Sales Process Review", description: "We map the current funnel, team roles, lead handling gaps, and reporting needs." },
      { title: "CRM Structure Design", description: "We define objects, stages, automations, permissions, and core dashboards for daily execution." },
      { title: "Build & Integration", description: "We implement the CRM workflows, import key records, and connect the tools around the sales process." },
      { title: "Adoption & Optimization", description: "We help the team use the CRM consistently and tune the system around actual pipeline behavior." },
    ],
    imageSrc: "/crm_system.jpg",
    imageAlt: "CRM systems service",
    relatedLinks: serviceRelated.crm,
    ctaLabel: "Shape Your CRM System",
    ctaHref: "/contact",
  },
  "pos-systems": {
    eyebrow: "Service",
    title: "POS Systems",
    description: "We create point-of-sale systems for retail and service businesses that need faster checkout, cleaner sales records, and better control over daily operations.",
    highlights: ["Fast checkout workflows", "Sales and cashier visibility", "Connected retail operations"],
    capabilities: [
      "POS flows for product lookup, checkout, receipts, discounts, cashier roles, and shift handling.",
      "Sales dashboards, transaction records, and operational reporting for stores, branches, and supervisors.",
      "Connections to inventory, customer accounts, loyalty flows, accounting, and back-office systems.",
    ],
    outcomes: [
      "A smoother checkout experience for staff and customers at the point of sale.",
      "Better visibility into sales, cash movement, and store performance across locations.",
      "A POS platform that supports retail growth without relying on disconnected manual records.",
    ],
    considerations: [
      "How checkout, cashier shifts, refunds, discounts, and payment methods need to work in real operation.",
      "Which products, branches, printers, scanners, or tills the POS should support from day one.",
      "How sales should connect with inventory, CRM, accounting, or management reporting.",
      "What offline support, permissions, and audit visibility are needed to reduce operational risk.",
    ],
    steps: [
      { title: "Store Workflow Discovery", description: "We review how products are sold, how staff work at checkout, and where the current sales process creates friction." },
      { title: "POS Scope & Interface Design", description: "We define the checkout flow, role permissions, sales records, and operational reporting structure." },
      { title: "Build & Device Integration", description: "We develop the POS system and connect it with product data, branch setup, printers, scanners, and related systems." },
      { title: "Go-Live & Staff Adoption", description: "We support rollout, train around the workflow, and refine the system based on real transaction behavior." },
    ],
    imageSrc: "/pos_system.jpg",
    imageAlt: "POS systems service",
    relatedLinks: serviceRelated.pos,
    ctaLabel: "Build Your POS System",
    ctaHref: "/contact",
  },
  "api-development-integrations": {
    eyebrow: "Service",
    title: "API Development & Integrations",
    description: "We create secure APIs and integration layers that help products, internal systems, and third-party tools exchange data reliably.",
    highlights: ["Reliable system connectivity", "Secure integration design", "Better automation between tools"],
    capabilities: [
      "REST and service APIs for products, mobile apps, admin portals, and partner integrations.",
      "Integration layers that connect CRMs, ERPs, payment tools, communication platforms, and analytics systems.",
      "Documentation, monitoring, and error-handling patterns that support long-term maintainability.",
    ],
    outcomes: [
      "Cleaner data flow across tools without repeated manual exports or duplicate entry.",
      "A stronger platform foundation for customer apps, internal systems, and automation work.",
      "More reliable integrations that are easier to support when the business grows.",
    ],
    considerations: [
      "Which systems are the source of truth and how data should move between them safely.",
      "How authentication, rate limits, retries, and failure handling should protect reliability.",
      "What versioning and documentation standards external or internal consumers need.",
      "How the integration layer should be monitored once the connections are live in production.",
    ],
    steps: [
      { title: "Integration Mapping", description: "We identify the systems involved, the data that must move, and the business rules around each connection." },
      { title: "API & Security Design", description: "We design the endpoints, contracts, auth patterns, and operational safeguards needed for stable usage." },
      { title: "Implementation & Testing", description: "We build the integrations, validate scenarios, and test edge cases across the connected systems." },
      { title: "Deployment & Monitoring", description: "We launch the integration stack with logs, alerts, and maintenance guidance for long-term reliability." },
    ],
    imageSrc: "/api_development_integration.jpg",
    imageAlt: "API development and integrations service",
    relatedLinks: serviceRelated.api,
    ctaLabel: "Plan Your Integrations",
    ctaHref: "/contact",
  },
  "ai-solutions": {
    eyebrow: "Service",
    title: "AI Solutions",
    description: "We deliver practical AI systems that automate workflows, support teams, and add useful intelligence to products.",
    highlights: ["AI assistants and copilots", "Automation and enrichment", "Operational AI use cases"],
    capabilities: [
      "AI copilots, support bots, recommendation tools, and workflow assistants designed around real business use.",
      "Automation that reduces repetitive work in service, operations, reporting, and content flows.",
      "Data-aware experiences that layer AI into existing products without unnecessary complexity.",
    ],
    outcomes: [
      "Faster response times and less operational drag for high-volume tasks.",
      "Smarter internal tools that help teams make decisions with less manual effort.",
      "An AI roadmap rooted in value and maintainable implementation.",
    ],
    considerations: [
      "Which use cases create real business value instead of novelty without measurable payoff.",
      "How data quality, privacy, and source context affect the quality of AI outputs.",
      "Where human review, approvals, or fallback paths should exist to manage risk.",
      "What usage, latency, and model costs are acceptable for the expected workflow volume.",
    ],
    steps: [
      { title: "Use-Case Discovery", description: "We identify the AI opportunities that can improve response time, quality, or efficiency in a concrete way." },
      { title: "Data & Workflow Design", description: "We define context sources, prompt flows, safeguards, and the user experience around the AI capability." },
      { title: "AI Build & Validation", description: "We implement the solution, test output quality, and refine the system against real usage scenarios." },
      { title: "Launch & Governance", description: "We monitor the AI behavior, control costs, and improve the system with clear operational guardrails." },
    ],
    relatedLinks: serviceRelated.ai,
    ctaLabel: "Explore an AI Use Case",
    ctaHref: "/contact",
  },
  "data-analytics-bi": {
    eyebrow: "Service",
    title: "Data Analytics & BI",
    description: "We build dashboards, reporting flows, and business intelligence systems that turn scattered data into decisions teams can act on.",
    highlights: ["Executive dashboards", "Unified KPI reporting", "Clear operational visibility"],
    capabilities: [
      "Data models, reporting layers, and dashboards for sales, operations, finance, and product teams.",
      "Connections across CRMs, ERPs, apps, spreadsheets, and service platforms to create a single reporting picture.",
      "Metric frameworks that help leaders trust what they are seeing and use it in real decisions.",
    ],
    outcomes: [
      "Faster access to trustworthy numbers without waiting on manual report preparation.",
      "Better visibility into performance, bottlenecks, and business trends across teams.",
      "A stronger reporting foundation for planning, accountability, and operational improvement.",
    ],
    considerations: [
      "Which systems contain the data and where inconsistencies currently make reporting hard to trust.",
      "What KPIs matter most to executives, managers, and operators in day-to-day decision-making.",
      "How often data needs to refresh and what level of historical depth the team requires.",
      "What governance rules should exist around definitions, ownership, and access to sensitive data.",
    ],
    steps: [
      { title: "Data Audit", description: "We review source systems, data quality gaps, and the reporting questions the business needs answered." },
      { title: "Metric & Dashboard Design", description: "We define KPIs, dashboard structure, and how different audiences should consume the data." },
      { title: "Pipeline & Reporting Build", description: "We connect the sources, shape the reporting model, and build the dashboards for live use." },
      { title: "Validation & Adoption", description: "We verify the numbers, align stakeholders on definitions, and support decision-making with the new BI flow." },
    ],
    relatedLinks: serviceRelated.data,
    ctaLabel: "Build Your Reporting Stack",
    ctaHref: "/contact",
  },
  "qa-software-testing": {
    eyebrow: "Service",
    title: "QA & Software Testing",
    description: "We strengthen product quality with structured testing, release checks, and QA processes that reduce avoidable production risk.",
    highlights: ["Release risk reduction", "Manual and automated QA", "More reliable product quality"],
    capabilities: [
      "Test planning for web, mobile, APIs, admin tools, and complex business workflows.",
      "Manual, regression, smoke, and exploratory testing shaped around product risk and release cadence.",
      "Automation opportunities and QA process improvements that increase coverage over time.",
    ],
    outcomes: [
      "More confidence when releasing new features or major changes.",
      "Fewer user-facing defects escaping into production.",
      "A repeatable QA rhythm that supports product teams as delivery speeds up.",
    ],
    considerations: [
      "Which workflows are highest-risk and need the strongest testing coverage first.",
      "How test environments, staging data, and release timing affect reliable verification.",
      "Where manual QA is sufficient and where automation will save time long-term.",
      "What severity levels and response expectations should guide bug triage and release decisions.",
    ],
    steps: [
      { title: "Quality Review", description: "We identify the product risks, test gaps, and release weaknesses that need attention first." },
      { title: "Test Strategy Setup", description: "We define the QA scope, environments, test cases, and release checkpoints for the team." },
      { title: "Execution & Reporting", description: "We run the tests, document findings clearly, and help prioritize fixes before release." },
      { title: "Coverage Improvement", description: "We refine the QA process, add reusable test assets, and strengthen future release confidence." },
    ],
    imageSrc: "/Quality_assurance.jpg",
    imageAlt: "QA and software testing service",
    relatedLinks: serviceRelated.qa,
    ctaLabel: "Improve Release Quality",
    ctaHref: "/contact",
  },
  "cloud-devops": {
    eyebrow: "Service",
    title: "Cloud & DevOps",
    description: "We help teams deploy faster and operate more confidently with stronger infrastructure, pipelines, and monitoring.",
    highlights: ["CI/CD pipelines", "Cloud architecture", "Monitoring and reliability"],
    capabilities: [
      "Cloud architecture planning for apps, APIs, business systems, and internal tools.",
      "Deployment pipelines and release workflows that support repeatable delivery.",
      "Infrastructure hardening, access control, backup strategy, and production readiness.",
    ],
    outcomes: [
      "Safer releases and better uptime across production systems.",
      "More confidence when shipping product changes or scaling usage.",
      "Infrastructure that supports growth instead of slowing delivery down.",
    ],
    considerations: [
      "Which hosting model, scaling plan, and cloud services best fit the product and budget.",
      "How deployments, secrets, backups, and access control should be handled safely.",
      "What monitoring, logging, and alerts the team needs to detect problems early.",
      "How infrastructure choices today will affect release speed and operating cost later.",
    ],
    steps: [
      { title: "Infrastructure Review", description: "We assess the current hosting, deployment process, and reliability risks across environments." },
      { title: "Platform Design", description: "We define the cloud architecture, CI/CD flow, access controls, and operational standards." },
      { title: "Implementation & Hardening", description: "We build or improve the infrastructure, automate deployments, and tighten production readiness." },
      { title: "Monitoring & Support", description: "We add visibility, alerting, and operational guidance so the team can run the platform with more confidence." },
    ],
    imageSrc: "/cloud_devops.jpg",
    imageAlt: "Cloud and DevOps service",
    relatedLinks: serviceRelated.cloud,
    ctaLabel: "Upgrade Your Delivery Stack",
    ctaHref: "/contact",
  },
  "cybersecurity-services": {
    eyebrow: "Service",
    title: "Cybersecurity Services",
    description: "We help teams reduce security risk with practical application hardening, access controls, and safer operating practices across their platforms.",
    highlights: ["Application hardening", "Access and risk controls", "Security-aware delivery practices"],
    capabilities: [
      "Security reviews for applications, APIs, cloud environments, and internal tools.",
      "Hardening work around auth flows, role access, secrets handling, and production exposure risks.",
      "Guidance for secure delivery habits, incident preparedness, and ongoing risk reduction.",
    ],
    outcomes: [
      "Lower exposure to avoidable security gaps across the software stack.",
      "Stronger confidence around user data handling, access control, and platform protection.",
      "A clearer security baseline that grows with the product and team.",
    ],
    considerations: [
      "Which assets, data, and workflows are most sensitive from a security and compliance perspective.",
      "How identity, access levels, and authentication patterns should be protected across systems.",
      "What the highest-likelihood attack surfaces are in the application, API, and infrastructure layers.",
      "How the team should monitor, respond to, and recover from suspicious events or incidents.",
    ],
    steps: [
      { title: "Risk Assessment", description: "We review the current stack, identify likely threat areas, and prioritize the most important protections." },
      { title: "Security Design", description: "We define the controls, hardening tasks, and operating practices needed for better resilience." },
      { title: "Implementation & Validation", description: "We apply the improvements, review exposures, and verify the key protections are working as intended." },
      { title: "Ongoing Security Readiness", description: "We support monitoring, review routines, and next-step planning so security improves over time instead of stopping at one audit." },
    ],
    imageSrc: "/cybersecurity.jpg",
    imageAlt: "Cybersecurity services",
    relatedLinks: serviceRelated.cyber,
    ctaLabel: "Strengthen Your Security Posture",
    ctaHref: "/contact",
  },
  "school-management": {
    eyebrow: "Service",
    title: "School Management",
    description: "We build school management systems that handle student records, fees, attendance, examinations, and academic reporting for educational institutions.",
    highlights: ["Student records management", "Online fee payments", "Attendance tracking"],
    capabilities: [
      "Complete student lifecycle management from enrollment to graduation.",
      "Online fee management with multiple payment gateway integrations.",
      "Daily attendance tracking and examination management.",
      "Academic reporting and transcript generation.",
    ],
    outcomes: [
      "Reduced administrative paperwork and manual processes.",
      "Better parent communication through online portals.",
      "Real-time visibility into student performance and attendance.",
      "Streamlined fee collection and financial reporting.",
    ],
    considerations: [
      "Whether the system needs to integrate with existing student information systems.",
      "How many user roles (administrators, teachers, students, parents) need access.",
      "Which payment methods (M-Pesa, bank transfers, cash) need to be supported.",
      "How examination results and report cards should be generated and distributed.",
    ],
    steps: [
      { title: "Requirements", description: "We gather requirements for student records, fees, and academic workflows." },
      { title: "Design", description: "We design the system architecture and user interfaces for each role." },
      { title: "Development", description: "We build all modules including admissions, academics, and finance." },
      { title: "Training", description: "We train staff and roll out the system school-wide." },
      { title: "Support", description: "We provide ongoing updates and maintenance." },
    ],
    imageSrc: "/school_management_system.jpg",
    imageAlt: "School management system",
    relatedLinks: [{ label: "ERP Systems", href: "/services/erp-systems" }, { label: "CRM Systems", href: "/services/crm-systems" }, contactLink],
    ctaLabel: "Book a Demo",
    ctaHref: "/book-demo",
  },
  "hotel-management": {
    eyebrow: "Service",
    title: "Hotel Management",
    description: "We create hotel management systems that handle reservations, front desk, housekeeping, billing, and restaurant management for hospitality businesses.",
    highlights: ["Online reservations", "Restaurant POS", "Multi-property support"],
    capabilities: [
      "Complete hotel reservation and booking management system.",
      "Front desk operations including check-in and check-out.",
      "Restaurant POS with table management and order tracking.",
      "Housekeeping assignment and room status tracking.",
      "Billing, invoicing, and payment processing.",
    ],
    outcomes: [
      "Faster check-in and check-out processes.",
      "Better occupancy rates through online booking integration.",
      "Real-time visibility into room status and housekeeping tasks.",
      "Streamlined restaurant operations and order management.",
    ],
    considerations: [
      "How many properties or room types need to be managed.",
      "Which booking channels (direct, OTA) need to be integrated.",
      "Whether restaurant and bar operations are included.",
      "What payment methods need to be supported (M-Pesa, cards).",
    ],
    steps: [
      { title: "Requirements", description: "We analyze hotel operations and service workflows." },
      { title: "Design", description: "We design interfaces for reception, housekeeping, and restaurant." },
      { title: "Development", description: "We build all modules including reservations and POS." },
      { title: "Training", description: "We train staff across all departments." },
      { title: "Support", description: "We provide ongoing updates and maintenance." },
    ],
    imageSrc: "/Hotel_management_system.jpg",
    imageAlt: "Hotel management system",
    relatedLinks: [{ label: "POS Systems", href: "/services/pos-systems" }, { label: "ERP Systems", href: "/services/erp-systems" }, contactLink],
    ctaLabel: "Book a Demo",
    ctaHref: "/book-demo",
  },
  "healthcare-management": {
    eyebrow: "Service",
    title: "Healthcare Management",
    description: "We build healthcare management systems that handle patient records, appointments, billing, pharmacy, and medical administration for healthcare providers.",
    highlights: ["Patient records (EMR)", "Appointment scheduling", "Pharmacy management"],
    capabilities: [
      "Complete electronic medical records (EMR) and patient history.",
      "Appointment scheduling and queue management.",
      "Billing, invoicing, and insurance claims processing.",
      "Pharmacy inventory and prescription management.",
    ],
    outcomes: [
      "Better patient care with complete medical history access.",
      "Reduced wait times through appointment scheduling.",
      "Streamlined billing and insurance claims.",
      "Improved pharmacy inventory control.",
    ],
    considerations: [
      "What compliance requirements (HIPAA) need to be met.",
      "How many departments and user roles need access.",
      "Which laboratory and imaging systems need integration.",
      "How appointments should be managed (online booking, walk-ins).",
    ],
    steps: [
      { title: "Requirements", description: "We analyze clinical workflows and compliance needs." },
      { title: "Design", description: "We design the EMR and workflow interfaces." },
      { title: "Development", description: "We build all modules with security compliance." },
      { title: "Training", description: "We train medical and administrative staff." },
      { title: "Support", description: "We provide ongoing updates and compliance updates." },
    ],
    imageSrc: "/hospital_managemet-system.jpg",
    imageAlt: "Healthcare management system",
    relatedLinks: [{ label: "ERP Systems", href: "/services/erp-systems" }, { label: "CRM Systems", href: "/services/crm-systems" }, contactLink],
    ctaLabel: "Book a Demo",
    ctaHref: "/book-demo",
  },
  "it-consulting": {
    eyebrow: "Service",
    title: "IT Consulting",
    description: "We provide technology strategy, infrastructure planning, digital transformation, and IT advisory services for businesses.",
    highlights: ["Technology strategy", "Infrastructure audit", "Digital transformation"],
    capabilities: [
      "Technology roadmaps aligned with business goals.",
      "Infrastructure assessments and optimization recommendations.",
      "Digital transformation strategy and execution.",
      "Vendor-agnostic technology advisory.",
    ],
    outcomes: [
      "Clear technology direction aligned with business objectives.",
      "Cost optimization through infrastructure improvements.",
      "Reduced technology risk and better security posture.",
      "Scalable technology foundation for growth.",
    ],
    considerations: [
      "What business goals the technology strategy should support.",
      "Which existing systems need assessment.",
      "What budget and timeline constraints exist.",
      "How quickly the transformation should progress.",
    ],
    steps: [
      { title: "Assessment", description: "We review current technology stack and workflows." },
      { title: "Analysis", description: "We identify gaps, risks, and opportunities." },
      { title: "Strategy", description: "We create a technology roadmap with priorities." },
      { title: "Implementation", description: "We guide vendor selection and execution." },
      { title: "Ongoing", description: "We provide continued strategic guidance." },
    ],
    imageSrc: "/it-consulting.jpg",
    imageAlt: "IT consulting services",
    relatedLinks: [{ label: "Cloud & DevOps", href: "/services/cloud-devops" }, { label: "Cybersecurity Services", href: "/services/cybersecurity-services" }, contactLink],
    ctaLabel: "Book Consultation",
    ctaHref: "/contact",
  },
  "digital-marketing": {
    eyebrow: "Service",
    title: "Digital Marketing & SEO",
    description: "We help businesses grow online with search engine optimization, content marketing, social media management, and paid advertising strategies.",
    highlights: ["SEO optimization", "Content marketing", "Social media"],
    capabilities: [
      "Technical and content SEO to improve search rankings.",
      "Content strategy and creation for lead generation.",
      "Social media management and community building.",
      "Paid advertising (Google, Meta) campaign management.",
    ],
    outcomes: [
      "Increased organic traffic and search visibility.",
      "More leads through content marketing.",
      "Stronger brand presence on social media.",
      "Better ROI from paid advertising.",
    ],
    considerations: [
      "What current SEO and marketing presence exists.",
      "Which channels are most relevant to the target audience.",
      "What budget is available for paid advertising.",
      "How success will be measured (traffic, leads, conversions).",
    ],
    steps: [
      { title: "Audit", description: "We analyze current SEO and marketing presence." },
      { title: "Strategy", description: "We define the digital marketing plan." },
      { title: "Execution", description: "We implement SEO, content, and ad campaigns." },
      { title: "Optimization", description: "We continuously optimize based on data." },
      { title: "Reporting", description: "We provide regular performance reports." },
    ],
    imageSrc: "/digitalmarketing.jpg",
    imageAlt: "Digital marketing services",
    relatedLinks: [{ label: "Web Development", href: "/services/web-development" }, { label: "E-commerce Solutions", href: "/services/ecommerce-solutions" }, contactLink],
    ctaLabel: "Start Your Campaign",
    ctaHref: "/contact",
  },
};

const solutionRelated = {
  fintech: [{ label: "AI Solutions", href: "/services/ai-solutions" }, pricingLink, contactLink],
  healthcare: [{ label: "Support", href: "/support" }, { label: "About Us", href: "/about" }, contactLink],
  logistics: [{ label: "ERP Systems", href: "/services/erp-systems" }, { label: "Case Studies", href: "/case-studies" }, contactLink],
  education: [{ label: "Mobile App Development", href: "/services/mobile-app-development" }, { label: "HR System", href: "/products/hr-system" }, contactLink],
  ecommerce: [{ label: "Custom Web Development", href: "/services/web-development" }, { label: "Portfolio", href: "/portfolio" }, contactLink],
};

export const solutionDetails: Record<string, DetailPage> = {
  fintech: {
    eyebrow: "Solution",
    title: "Fintech",
    description: "Secure product engineering for payment systems, customer wallets, dashboards, and financial operations.",
    highlights: ["Secure transaction flows", "Compliance-aware product design", "Scalable architecture"],
    capabilities: [
      "Customer-facing financial products, admin consoles, payment journeys, and operational dashboards.",
      "Support for account flows, transaction history, approvals, and role-aware data visibility.",
      "Security-conscious implementation choices that help products scale with stronger trust foundations.",
    ],
    outcomes: [
      "Digital financial experiences that feel dependable and professionally structured.",
      "A better balance between product usability, internal control, and operational insight.",
      "A clearer technical base for payments, wallets, lending, or account services.",
    ],
    relatedLinks: solutionRelated.fintech,
  },
  healthcare: {
    eyebrow: "Solution",
    title: "Healthcare",
    description: "Digital healthcare experiences and internal systems built for privacy, trust, and operational resilience.",
    highlights: ["Patient-facing portals", "Operational systems", "Privacy-conscious delivery"],
    capabilities: [
      "Patient-facing platforms, internal dashboards, scheduling tools, and secure service workflows.",
      "Operational systems that support communication, intake, approvals, and reporting.",
      "User experience decisions designed around clarity, trust, and sensitive data handling.",
    ],
    outcomes: [
      "More reliable digital experiences for patients and administrators.",
      "Operational coordination that reduces confusion across internal teams.",
      "Health-related systems that feel calm, accessible, and ready for production.",
    ],
    relatedLinks: solutionRelated.healthcare,
  },
  logistics: {
    eyebrow: "Solution",
    title: "Logistics",
    description: "Connected systems for tracking, dispatch, internal operations, and logistics reporting.",
    highlights: ["Operations dashboards", "Movement visibility", "Internal process alignment"],
    capabilities: [
      "Dispatch, fleet, route, and shipment visibility platforms tailored to operational teams.",
      "Dashboards that help leaders monitor flow, exceptions, and bottlenecks.",
      "Connected processes across field teams, finance, service centers, and reporting layers.",
    ],
    outcomes: [
      "A more usable operational command layer for moving teams and goods.",
      "Fewer blind spots between office operations and field execution.",
      "Better insight into timing, fulfillment, and service quality.",
    ],
    relatedLinks: solutionRelated.logistics,
  },
  education: {
    eyebrow: "Solution",
    title: "Education",
    description: "Learning and administration systems designed to support both delivery teams and end users.",
    highlights: ["Learning interfaces", "Administrative systems", "High-clarity UX"],
    capabilities: [
      "Learning management experiences, school administration tools, and communication workflows.",
      "Interfaces designed for students, staff, and administrators with strong clarity across roles.",
      "Reporting and operational features that support delivery, records, and follow-up.",
    ],
    outcomes: [
      "More approachable digital experiences for institutions and learners.",
      "A stronger bridge between academic operations and day-to-day communication.",
      "Systems that are easier to adopt across varied user groups.",
    ],
    relatedLinks: solutionRelated.education,
  },
  ecommerce: {
    eyebrow: "Solution",
    title: "E-commerce",
    description: "Commerce experiences that bring together storefronts, operations, payments, and customer support.",
    highlights: ["Conversion-first storefronts", "Commerce operations", "Payment and order systems"],
    capabilities: [
      "Storefront experiences, admin tools, and order workflows built around conversion and operational clarity.",
      "Integrated product, order, and customer flows that support both growth and fulfillment execution.",
      "Connected payment, support, and post-purchase systems that reduce fragmentation.",
    ],
    outcomes: [
      "A stronger customer journey from browsing to purchase to support.",
      "Better operational visibility for order handling and fulfillment teams.",
      "A commerce foundation that supports growth without losing control.",
    ],
    relatedLinks: solutionRelated.ecommerce,
  },
};

const productRelated = {
  crm: [{ label: "CRM Systems Service", href: "/services/crm-systems" }, processLink, contactLink],
  erp: [{ label: "ERP Systems Service", href: "/services/erp-systems" }, { label: "Invoices", href: "/invoices" }, contactLink],
  hr: [{ label: "Education", href: "/solutions/education" }, { label: "Careers", href: "/careers" }, contactLink],
};

export const productDetails: Record<string, DetailPage> = {
  "crm-platform": {
    eyebrow: "Product",
    title: "CRM Platform",
    description: "A sales and customer relationship product concept for businesses that need cleaner visibility and stronger execution.",
    highlights: ["Lead and account management", "Sales activity tracking", "Customer view in one place"],
    capabilities: [
      "Lead pipelines, customer records, opportunity stages, and team activity timelines in one product flow.",
      "Operational visibility that helps managers understand follow-up quality and sales movement.",
      "A flexible product base for tailoring workflows to service, product, or B2B revenue teams.",
    ],
    outcomes: [
      "A simpler way to manage sales relationships and customer progress.",
      "Less confusion across leads, accounts, and follow-up responsibilities.",
      "A platform direction that can grow with your commercial process.",
    ],
    relatedLinks: productRelated.crm,
  },
  "erp-platform": {
    eyebrow: "Product",
    title: "ERP Platform",
    description: "An enterprise operations product for coordinating inventory, approvals, finance, and internal reporting.",
    highlights: ["Operational visibility", "Workflow automation", "Department alignment"],
    capabilities: [
      "Multi-department process support for approvals, inventory, finance, reporting, and operations.",
      "A modular structure that can grow from one operational pain point into a connected internal platform.",
      "Role-based interfaces that help teams see what matters without drowning in complexity.",
    ],
    outcomes: [
      "More consistent internal process execution and less spreadsheet sprawl.",
      "Stronger visibility into operational status and decision bottlenecks.",
      "A product path that supports scale and governance together.",
    ],
    relatedLinks: productRelated.erp,
  },
  "hr-system": {
    eyebrow: "Product",
    title: "HR System",
    description: "A people operations system for recruiting, onboarding, workforce records, and internal approvals.",
    highlights: ["Hiring workflows", "Employee records", "People operations tooling"],
    capabilities: [
      "Candidate tracking, onboarding flows, employee records, and structured approvals.",
      "People operations tooling that helps growing teams stay organized without overcomplicating HR work.",
      "A platform direction that connects employee lifecycle steps with everyday administration.",
    ],
    outcomes: [
      "A cleaner internal experience for teams managing people and approvals.",
      "More consistency in onboarding, requests, and employee data handling.",
      "A stronger HR operations base for scaling organizations.",
    ],
    relatedLinks: productRelated.hr,
  },
};

const platformRelated = {
  projects: [{ label: "Support", href: "/support" }, { label: "Invoices", href: "/invoices" }, contactLink],
  invoices: [{ label: "Projects", href: "/projects" }, pricingLink, contactLink],
  support: [{ label: "Settings", href: "/settings" }, { label: "FAQ", href: "/faq" }, contactLink],
  settings: [{ label: "Support", href: "/support" }, { label: "Cloud & DevOps", href: "/services/cloud-devops" }, contactLink],
};

export const platformPages: Record<string, DetailPage> = {
  projects: {
    eyebrow: "Platform",
    title: "Projects",
    description: "Track delivery, milestones, account status, and project visibility in one platform workspace.",
    highlights: ["Milestone tracking", "Delivery visibility", "Shared coordination"],
    capabilities: [
      "A central view of progress, milestones, blockers, and next actions across active work.",
      "Clear account communication around status, timelines, and ownership.",
      "A platform environment that keeps operations, support, and delivery more connected.",
    ],
    outcomes: [
      "Less ambiguity around project progress and responsibilities.",
      "A stronger operating rhythm between your team and delivery partners.",
      "Better visibility without relying on scattered updates.",
    ],
    relatedLinks: platformRelated.projects,
  },
  invoices: {
    eyebrow: "Platform",
    title: "Invoices",
    description: "Review billing, payment status, and invoice management across active engagements.",
    highlights: ["Billing overview", "Payment tracking", "Client-ready invoicing"],
    capabilities: [
      "Invoice history, payment status, and billing visibility inside one structured interface.",
      "A cleaner way to track outstanding items, approvals, and finance-related coordination.",
      "Connected billing context that aligns with projects and support conversations.",
    ],
    outcomes: [
      "More predictable financial coordination across active work.",
      "Less back-and-forth around invoice status and payment follow-up.",
      "A more professional client experience around finance operations.",
    ],
    relatedLinks: platformRelated.invoices,
  },
  support: {
    eyebrow: "Platform",
    title: "Support",
    description: "Keep communication, issue tracking, and help workflows structured across delivery teams and clients.",
    highlights: ["Support requests", "Issue visibility", "Operational follow-up"],
    capabilities: [
      "Support ticket visibility, issue status, and structured follow-up for delivery-related communication.",
      "A cleaner path for raising questions, reporting problems, and tracking progress.",
      "A service layer that connects technical work with client experience.",
    ],
    outcomes: [
      "Better trust through clearer follow-up and communication history.",
      "More reliable issue handling for ongoing engagements.",
      "A support experience that feels organized instead of reactive.",
    ],
    relatedLinks: platformRelated.support,
  },
  settings: {
    eyebrow: "Platform",
    title: "Settings",
    description: "Manage account preferences, team access, and operational controls in the platform workspace.",
    highlights: ["Team access", "Preferences", "Workspace configuration"],
    capabilities: [
      "Workspace access controls, account preferences, and role-based operational settings.",
      "Configuration areas that support collaboration, notifications, and environment management.",
      "A control layer for keeping the broader platform orderly as usage grows.",
    ],
    outcomes: [
      "Better governance across team access and workspace preferences.",
      "A cleaner handoff between operational control and day-to-day usage.",
      "Settings that stay understandable for non-technical stakeholders too.",
    ],
    relatedLinks: platformRelated.settings,
  },
};

const marketingRelated = {
  about: [{ label: "Services", href: "/services" }, { label: "Case Studies", href: "/case-studies" }, contactLink],
  blog: [{ label: "Solutions", href: "/solutions" }, { label: "FAQ", href: "/faq" }, contactLink],
  careers: [{ label: "About Us", href: "/about" }, { label: "Portfolio", href: "/portfolio" }, contactLink],
  caseStudies: [{ label: "Portfolio", href: "/portfolio" }, { label: "Solutions", href: "/solutions" }, contactLink],
  contact: [{ label: "Services", href: "/services" }, pricingLink, processLink],
  faq: [processLink, { label: "Support", href: "/support" }, contactLink],
  portfolio: [{ label: "Case Studies", href: "/case-studies" }, pricingLink, contactLink],
  pricing: [{ label: "Services", href: "/services" }, { label: "Products", href: "/products" }, contactLink],
  process: [{ label: "Services", href: "/services" }, { label: "Case Studies", href: "/case-studies" }, contactLink],
};

export const genericMarketingPages: Record<string, DetailPage> = {
  about: {
    eyebrow: "Company",
    title: "About Us",
    description: "We are a technology company focused on product engineering, enterprise systems, and modern business platforms.",
    highlights: ["Product-first mindset", "Engineering depth", "Long-term delivery partnership"],
    capabilities: [
      "A delivery team blending product thinking, engineering structure, and practical business systems design.",
      "Partnership-led work that helps organizations move from rough ideas to stronger execution environments.",
      "A company focus on useful software, clearer operations, and maintainable digital foundations.",
    ],
    outcomes: [
      "A partner that understands customer-facing products and internal systems.",
      "More confidence in execution when requirements and teams get complex.",
      "A delivery relationship shaped around clarity rather than noise.",
    ],
    relatedLinks: marketingRelated.about,
  },
  blog: {
    eyebrow: "Insights",
    title: "Blog",
    description: "Articles and perspectives around technology delivery, systems design, and digital growth.",
    highlights: ["Engineering insights", "Operational thinking", "Product strategy"],
    capabilities: [
      "Thought pieces around engineering decisions, product delivery, and digital transformation work.",
      "Practical ideas for teams improving systems, launches, and internal operating structure.",
      "A content space that supports better planning conversations before projects begin.",
    ],
    outcomes: [
      "Useful context for teams making technical decisions.",
      "A stronger bridge between business questions and implementation strategy.",
      "An easier way to understand how we think about delivery quality.",
    ],
    relatedLinks: marketingRelated.blog,
  },
  careers: {
    eyebrow: "Company",
    title: "Careers",
    description: "We are building a high-standard team across design, engineering, product, and operational systems.",
    highlights: ["Growth-focused culture", "Real product work", "Strong execution standards"],
    capabilities: [
      "Opportunities for designers, engineers, and operators who care about quality and clarity.",
      "A work environment shaped around meaningful systems and strong collaboration.",
      "Team growth through real projects rather than shallow output.",
    ],
    outcomes: [
      "A clearer picture of the standards and culture behind the company.",
      "A stronger hiring signal for people looking for serious product work.",
      "A pathway for growth-minded talent to connect with the team.",
    ],
    relatedLinks: marketingRelated.careers,
  },
  "case-studies": {
    eyebrow: "Proof",
    title: "Case Studies",
    description: "Examples of how we think about delivery, systems design, and measurable business outcomes.",
    highlights: ["Delivery clarity", "Outcome-focused work", "Business-aligned execution"],
    capabilities: [
      "Narratives that show how technical decisions connect to operational and commercial outcomes.",
      "Examples of product, platform, and systems delivery framed around business value.",
      "A proof layer that helps prospects understand our process and working style.",
    ],
    outcomes: [
      "More confidence in our ability to execute across business contexts.",
      "A practical view of how solution thinking turns into implemented work.",
      "Stronger continuity between marketing promise and delivery approach.",
    ],
    relatedLinks: marketingRelated.caseStudies,
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact Us",
    description: "Tell us what you are building, what is slowing your team down, and what kind of system or product you need next.",
    highlights: ["Fast response", "Clear discovery", "Project-fit conversations"],
    capabilities: [
      "Discovery-led conversations about product builds, systems modernization, and platform work.",
      "A straightforward entry point for scoping, feasibility questions, and roadmap planning.",
      "Support for matching the right service path or product direction to your needs.",
    ],
    outcomes: [
      "A faster start to clarifying scope and next steps.",
      "Better alignment between your need and the right delivery path.",
      "A practical conversation instead of a generic inquiry loop.",
    ],
    relatedLinks: marketingRelated.contact,
  },
  faq: {
    eyebrow: "Support",
    title: "Frequently Asked Questions",
    description: "Answers to common questions about delivery models, timelines, collaboration, and technical engagement.",
    highlights: ["Engagement clarity", "Delivery process", "Scope expectations"],
    capabilities: [
      "Clear answers around working models, communication, timelines, and technical collaboration.",
      "A support layer that helps prospects understand how projects move from inquiry to launch.",
      "Guidance that reduces uncertainty before deeper planning begins.",
    ],
    outcomes: [
      "Less confusion around how engagement and delivery actually work.",
      "A smoother pre-sales process for teams comparing options.",
      "Better readiness for a meaningful project conversation.",
    ],
    relatedLinks: marketingRelated.faq,
  },
  portfolio: {
    eyebrow: "Work",
    title: "Portfolio",
    description: "A look at digital platforms, internal systems, and technical products shaped through our delivery approach.",
    highlights: ["Product showcases", "System examples", "Visual execution quality"],
    capabilities: [
      "A visual and strategic overview of the kinds of platforms and systems we help shape.",
      "Examples designed to show quality and applied thinking rather than polished surfaces alone.",
      "A reference point for organizations comparing styles of technical execution.",
    ],
    outcomes: [
      "A clearer sense of design and product maturity across our work.",
      "More confidence in the depth behind the visual layer of delivery.",
      "An easier path for prospects to recognize fit with their project.",
    ],
    relatedLinks: marketingRelated.portfolio,
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Pricing",
    description: "Flexible engagement structures for product builds, internal systems, ongoing platform work, and consulting.",
    highlights: ["Project engagements", "Retainer options", "Platform support models"],
    capabilities: [
      "Flexible models for scoped projects, advisory work, retained product support, and platform partnerships.",
      "Pricing conversations shaped around complexity, timeline, integrations, and delivery depth.",
      "A commercial structure that helps teams choose the right starting point.",
    ],
    outcomes: [
      "A clearer sense of budget direction before full scoping begins.",
      "More confidence in choosing between one-off builds and longer engagements.",
      "A better commercial fit for the stage your business is in.",
    ],
    relatedLinks: marketingRelated.pricing,
  },
  process: {
    eyebrow: "Process",
    title: "Our Process",
    description: "A structured delivery process covering discovery, design, build, launch, and iteration.",
    highlights: ["Discovery and planning", "Design and implementation", "Launch and optimization"],
    capabilities: [
      "A delivery rhythm covering discovery, planning, design, implementation, and optimization.",
      "Project communication shaped around visibility, realistic next steps, and accountable execution.",
      "A process that helps complex technical work stay understandable to stakeholders.",
    ],
    outcomes: [
      "Better predictability across planning, delivery, and launch phases.",
      "A stronger working relationship built on visibility rather than guesswork.",
      "A smoother path from idea to a system that works in production.",
    ],
    relatedLinks: marketingRelated.process,
  },
};

export const homeSections = {
  heroDescription:
    "We design and build digital products, internal systems, and technical platforms for businesses that want clarity, speed, and stronger execution.",
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export type ProcessStep = {
  number: number;
  title: string;
  description: string;
  icon: IconKey;
};

export type CaseStudy = {
  title: string;
  description: string;
  result: string;
  image?: string;
  href: string;
  category: string;
};

export type BlogPost = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  href: string;
  category: string;
};

export type BenefitItem = {
  title: string;
  description: string;
  icon: IconKey;
  link?: string;
};

export type TechStackItem = {
  name: string;
  category: string;
  icon: IconKey;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ServiceFeature = {
  title: string;
  description: string;
  icon: IconKey;
  metric?: string;
  link?: string;
};

export const techStack: TechStackItem[] = [
  {
    name: "Next.js",
    category: "Frontend Framework",
    icon: "globe",
  },
  {
    name: "React",
    category: "UI Library",
    icon: "globe",
  },
  {
    name: "Node.js",
    category: "Backend Runtime",
    icon: "cloud",
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: "package2",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: "globe",
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: "globe",
  },
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    icon: "cloud",
  },
  {
    name: "Docker",
    category: "Containerization",
    icon: "cloud",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. Small projects (websites, prototypes) typically take 6-8 weeks. Medium projects (SaaS apps) take 3-4 months. Large systems (ERP, CRM) can take 4-6 months. We provide detailed timelines after discovery.",
  },
  {
    question: "What does development cost?",
    answer: "Costs depend on project scope, complexity, and team requirements. We offer flexible engagement models: fixed-price projects, time-and-materials, and retainers. After initial consultation, we provide transparent quotes with no hidden fees.",
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes. We provide ongoing support packages including bug fixes, performance optimization, feature updates, and security patches. 24/7 emergency support is available for critical systems.",
  },
  {
    question: "Can you build fully custom systems?",
    answer: "Absolutely. We specialize in custom solutions tailored to your exact business needs. Whether it's a bespoke CRM, ERP system, or unique application—we design and build it from scratch.",
  },
  {
    question: "Do you handle deployment and DevOps?",
    answer: "Yes. We handle full deployment, infrastructure setup, CI/CD pipelines, monitoring, and scaling. We work with AWS, Azure, GCP, and can deploy to any cloud or on-premises environment.",
  },
  {
    question: "What technologies do you work with?",
    answer: "We're experienced with modern tech stacks: React, Next.js, Vue, Angular for frontend; Node.js, Python, Go for backend; MongoDB, PostgreSQL, MySQL for databases; and AWS, Docker, Kubernetes for infrastructure.",
  },
  {
    question: "Do you provide maintenance and updates?",
    answer: "Yes. We offer monthly or quarterly maintenance packages that include security updates, performance monitoring, backups, and proactive improvements.",
  },
  {
    question: "How do you ensure data security?",
    answer: "Security is built into every layer: encrypted data transmission, secure authentication, regular penetration testing, GDPR/HIPAA compliance support, and infrastructure hardening. We follow industry best practices.",
  },
];

export const serviceFeatures: ServiceFeature[] = [
  {
    title: "Scalable Architecture",
    description: "Built to grow with your business. Our systems handle increased load and complexity without refactoring.",
    icon: "layers3",
  },
  {
    title: "Secure by Default",
    description: "Security is baked into every layer. Encryption, authentication, and compliance standards at every step.",
    icon: "checkCircle",
  },
  {
    title: "High Performance",
    description: "Optimized for speed. We monitor, test, and improve performance constantly. Fast loading = better conversions.",
    icon: "cloud",
  },
  {
    title: "Modern Best Practices",
    description: "We use the latest technologies and methodologies. Clean code, automated testing, continuous deployment.",
    icon: "bot",
  },
  {
    title: "Expert Team",
    description: "Full-stack developers, designers, and architects with 100+ years combined experience.",
    icon: "users",
  },
  {
    title: "Ongoing Support",
    description: "We don't disappear after launch. 24/7 monitoring, regular updates, and continuous improvement.",
    icon: "briefcaseBusiness",
  },
];

export const testimonials = [
  {
    quote: "SMA Systems transformed our entire operational structure. Their team understood our business better than we did and delivered a system that our teams actually want to use.",
    author: "Sarah Chen",
    role: "CEO",
    company: "FinFlow Technologies",
    image: "/images/Devprofile.png",
  },
  {
    quote: "The mobile app they built for us increased customer engagement by 45%. Their approach to UX was methodical and results-driven. Couldn't ask for better partners.",
    author: "Michael Rodriguez",
    role: "Product Director",
    company: "Commerce Haven",
    image: "/images/Devprofile.png",
  },
  {
    quote: "Working with SMA was refreshing. They asked the right questions upfront, delivered on time, and built infrastructure that actually scales. This is a team that knows what they're doing.",
    author: "Jennifer Park",
    role: "VP of Engineering",
    company: "Healthcare Innovations Inc",
    image: "/images/Devprofile.png",
  },
  {
    quote: "Our ERP system has been a game-changer. It reduced manual work by 60% and gave us real visibility into operations for the first time. SMA's support is exceptional.",
    author: "David Thompson",
    role: "Operations Manager",
    company: "Logistics Pro Solutions",
  },
];

export const trustLogos = [
  "TechStartups",
  "Global Finance Co",
  "Digital Enterprises",
  "Cloud Innovators",
  "Growth Labs",
  "Enterprise Systems",
];

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery",
    description: "We dive deep into your business, challenges, goals, and current systems. Understanding your context is everything.",
    icon: "bot",
  },
  {
    number: 2,
    title: "Design",
    description: "We architect solutions that balance user experience, business logic, and technical maintainability.",
    icon: "globe",
  },
  {
    number: 3,
    title: "Development",
    description: "Our team builds with quality and clarity. We iterate regularly and keep you informed every step of the way.",
    icon: "layers3",
  },
  {
    number: 4,
    title: "Launch",
    description: "We prepare everything for production: testing, security, performance, and team training.",
    icon: "cloud",
  },
  {
    number: 5,
    title: "Support",
    description: "Post-launch, we provide ongoing monitoring, updates, and support to ensure sustained success.",
    icon: "users",
  },
];

export const whyChooseUs: BenefitItem[] = [
  {
    title: "Scalable Architecture",
    description: "We build systems designed to grow with your business, not constrain it.",
    icon: "layers3",
  },
  {
    title: "Fast Delivery",
    description: "Without sacrificing quality. Our proven process gets you to launch faster.",
    icon: "cloud",
  },
  {
    title: "Secure by Default",
    description: "Security is baked into every layer. We follow industry best practices rigorously.",
    icon: "globe",
  },
  {
    title: "Expert Team",
    description: "Developers, designers, and architects with 100+ years of combined experience.",
    icon: "users",
  },
  {
    title: "Ongoing Support",
    description: "We don't disappear after launch. We're your partner for the long term.",
    icon: "package2",
  },
  {
    title: "Clear Communication",
    description: "No jargon. Regular updates, realistic timelines, and transparent collaboration.",
    icon: "briefcaseBusiness",
  },
];

export const caseStudiesPreview: CaseStudy[] = [
  {
    title: "Financial Payments Platform",
    description: "Built a secure, scalable payment processing platform for a fintech startup.",
    result: "$2M in Series A funding",
    href: "/case-studies",
    category: "Fintech",
  },
  {
    title: "Healthcare Provider Network",
    description: "Created a HIPAA-compliant patient management system for 50+ clinics.",
    result: "40% reduction in admin time",
    href: "/case-studies",
    category: "Healthcare",
  },
  {
    title: "E-commerce Operations Suite",
    description: "Developed an integrated platform connecting storefronts, inventory, and fulfillment.",
    result: "3x processing speed improvement",
    href: "/case-studies",
    category: "E-commerce",
  },
];

export const blogPreview: BlogPost[] = [
  {
    title: "How to Choose a Web Development Company in 2025",
    excerpt: "Use our 15-question framework to evaluate agencies, compare quotes, and avoid costly mistakes when building your next web project.",
    author: "Alex Thompson",
    date: "Apr 13, 2026",
    href: "/blog/how-to-choose-web-development-company",
    category: "Web Development",
  },
  {
    title: "5 Signs Your ERP System Needs an Upgrade",
    excerpt: "How to recognize when your legacy systems are holding back growth and what modern solutions can offer.",
    author: "Alex Thompson",
    date: "Mar 15, 2026",
    href: "/blog",
    category: "Business Systems",
  },
  {
    title: "Mobile-First: Building Apps That Users Love",
    excerpt: "Lessons from shipping 20+ production apps: UX patterns, performance optimization, and user retention.",
    author: "Jordan Liu",
    date: "Mar 8, 2026",
    href: "/blog",
    category: "Mobile Development",
  },
  {
    title: "Infrastructure That Scales: DevOps Best Practices",
    excerpt: "How modern CI/CD pipelines, monitoring, and cloud architecture enable faster, safer deployments.",
    author: "Sam Patel",
    date: "Feb 28, 2026",
    href: "/blog",
    category: "DevOps",
  },
];

export const chatbotKnowledge = [
  {
    slug: "services",
    title: "Services",
    summary: "SMA Systems offers web development, mobile app development, ERP systems, CRM systems, AI solutions, and cloud and DevOps support.",
    href: "/services",
  },
  {
    slug: "solutions",
    title: "Solutions",
    summary: "Industry solutions include fintech, healthcare, logistics, education, and ecommerce delivery paths.",
    href: "/solutions",
  },
  {
    slug: "products",
    title: "Products",
    summary: "The product section includes CRM Platform, ERP Platform, and HR System directions for growing businesses.",
    href: "/products",
  },
  {
    slug: "process",
    title: "Process",
    summary: "The process page explains the journey from discovery and planning through build, launch, and optimization.",
    href: "/process",
  },
  {
    slug: "support",
    title: "Platform",
    summary: "Platform pages cover projects, invoices, support, and settings to show how the broader system experience fits together.",
    href: "/support",
  },
];

export const servicePricingData: ServicePricing[] = [
  {
    service: "Custom Software Development",
    icon: "code2",
    description: "Business-specific platforms, internal tools, and workflow systems scoped for Kenyan teams and operations.",
    consultation: true,
    customization: "Quoted after discovery, user-role mapping, and integration review. Most builds use milestone billing.",
    tiers: [
      {
        name: "MVP Build",
        startingPrice: 180000,
        description: "Best for a first release with one focused workflow",
        features: ["Core workflow mapping", "Admin dashboard", "Role-based access", "Basic reporting", "8-10 weeks delivery"],
      },
      {
        name: "Operations Platform",
        startingPrice: 650000,
        description: "Multi-team platform with approvals, reporting, and integrations",
        features: ["Multiple user roles", "Workflow automation", "Analytics dashboard", "API integrations", "QA and deployment", "12-16 weeks delivery"],
        popular: true,
      },
      {
        name: "Enterprise System",
        startingPrice: 1800000,
        description: "Large custom system with advanced controls and rollout support",
        features: ["Multi-branch architecture", "Advanced permissions", "Deep integrations", "Migration support", "Training and handover", "20+ weeks delivery"],
      },
    ],
  },
  {
    service: "Custom Web Development",
    icon: "globe",
    description: "Websites, client portals, and web apps priced for Kenyan startups, SMEs, and scaling brands.",
    consultation: true,
    customization: "Pricing changes with content volume, custom features, integrations, and CMS or portal requirements.",
    tiers: [
      {
        name: "Business Website",
        startingPrice: 45000,
        description: "A polished brochure site or service website",
        features: ["Up to 10 pages", "Responsive layouts", "Lead forms", "Basic SEO setup", "2-3 weeks delivery"],
      },
      {
        name: "Portal or Web App",
        startingPrice: 120000,
        description: "Customer portal, dashboard, or internal web workflow",
        features: ["Authentication", "Custom dashboard", "Database integration", "Notifications", "API integration", "4-8 weeks delivery"],
        popular: true,
      },
      {
        name: "Custom Platform",
        startingPrice: 450000,
        description: "High-spec web product with integrations and scale in mind",
        features: ["Custom UX flows", "Advanced security", "Payments or ERP links", "Performance tuning", "Launch support", "10-16 weeks delivery"],
      },
    ],
  },
  {
    service: "Mobile App Development",
    icon: "smartphone",
    description: "Cross-platform and business mobile apps aligned with current Kenya delivery ranges.",
    consultation: true,
    customization: "Final pricing depends on platform coverage, offline needs, integrations, and release scope.",
    tiers: [
      {
        name: "Starter App",
        startingPrice: 180000,
        description: "Launch an MVP or field app quickly",
        features: ["Single primary workflow", "Android or cross-platform build", "Authentication", "Notifications", "6-8 weeks delivery"],
      },
      {
        name: "Cross-Platform Product",
        startingPrice: 420000,
        description: "A stronger release for customer-facing or internal products",
        features: ["iOS and Android", "API integrations", "Analytics", "Offline-ready screens", "QA and store readiness", "10-14 weeks delivery"],
        popular: true,
      },
      {
        name: "Enterprise App Suite",
        startingPrice: 1200000,
        description: "Complex mobile ecosystem with dashboards, payments, and operations flows",
        features: ["Advanced workflows", "Payment integration", "Back-office portal", "Security hardening", "Release management", "16+ weeks delivery"],
      },
    ],
  },
  {
    service: "UI/UX Design",
    icon: "palette",
    description: "Interface design, user-flow work, and product design systems for web and mobile teams.",
    consultation: true,
    customization: "Quoted by number of screens, research depth, prototyping needs, and design-system complexity.",
    tiers: [
      {
        name: "UX Refresh",
        startingPrice: 60000,
        description: "For a focused website, landing page, or product cleanup",
        features: ["User-flow review", "Wireframes", "Visual direction", "Responsive layouts", "1-2 weeks delivery"],
      },
      {
        name: "Product Design Sprint",
        startingPrice: 180000,
        description: "Designed for new products, portals, or app MVPs",
        features: ["UX workshop", "Clickable prototype", "10-20 screens", "Interaction states", "Handoff files", "2-4 weeks delivery"],
        popular: true,
      },
      {
        name: "Full Design System",
        startingPrice: 320000,
        description: "For mature products that need consistency across teams",
        features: ["Design system setup", "Large screen library", "Prototype coverage", "Developer handoff", "Review cycles", "4-6 weeks delivery"],
      },
    ],
  },
  {
    service: "ERP Systems",
    icon: "layers3",
    description: "ERP rollout pricing for Kenyan SMEs, multi-branch operations, and enterprise process teams.",
    consultation: true,
    customization: "ERP pricing depends on modules, users, compliance needs, data migration, and training scope.",
    tiers: [
      {
        name: "Core ERP Rollout",
        startingPrice: 500000,
        description: "For finance, inventory, and approvals in one core system",
        features: ["Core modules setup", "User roles", "Basic reporting", "Onboarding", "10-14 weeks delivery"],
      },
      {
        name: "Growth ERP",
        startingPrice: 1200000,
        description: "For multi-team workflows and stronger operational visibility",
        features: ["Workflow automation", "Advanced dashboards", "CRM or POS linkage", "Training", "Support runway", "14-20 weeks delivery"],
        popular: true,
      },
      {
        name: "Enterprise ERP Program",
        startingPrice: 2800000,
        description: "For large deployments with custom modules and phased rollout",
        features: ["Multi-branch setup", "Data migration", "Deep integrations", "Advanced security", "Change management", "24+ weeks delivery"],
      },
    ],
  },
  {
    service: "Inventory Systems",
    icon: "package2",
    description: "Stock control, warehouse, and multi-location inventory systems for retail and operations teams.",
    consultation: true,
    customization: "Final pricing changes with branch count, barcode flows, POS links, and migration from spreadsheets or legacy tools.",
    tiers: [
      {
        name: "Stock Starter",
        startingPrice: 120000,
        description: "A focused inventory system for one store or warehouse",
        features: ["Products and stock tracking", "Low-stock alerts", "Basic roles", "Reports", "4-6 weeks delivery"],
      },
      {
        name: "Multi-Store Inventory",
        startingPrice: 280000,
        description: "For growing operations with transfers and supplier workflows",
        features: ["Multi-location visibility", "Purchase workflows", "Barcode support", "Supplier records", "6-10 weeks delivery"],
        popular: true,
      },
      {
        name: "Warehouse and Operations Suite",
        startingPrice: 750000,
        description: "For larger teams that need inventory, dispatch, and audit controls together",
        features: ["Custom workflows", "ERP or POS integration", "Advanced permissions", "Dashboards", "10-16 weeks delivery"],
      },
    ],
  },
  {
    service: "CRM Systems",
    icon: "users",
    description: "Sales, customer support, and lead management systems tailored for Kenyan service and revenue teams.",
    consultation: true,
    customization: "Custom pricing depends on pipeline stages, automations, communication channels, and integrations.",
    tiers: [
      {
        name: "Sales Pipeline CRM",
        startingPrice: 180000,
        description: "For lead capture, deal tracking, and team follow-up",
        features: ["Leads and contacts", "Pipeline stages", "Task reminders", "Basic reports", "5-7 weeks delivery"],
      },
      {
        name: "Customer Operations CRM",
        startingPrice: 420000,
        description: "For marketing, sales, and support visibility in one system",
        features: ["Sales workflows", "Customer records", "Automations", "Email or WhatsApp integration", "8-12 weeks delivery"],
        popular: true,
      },
      {
        name: "Enterprise CRM Suite",
        startingPrice: 950000,
        description: "For larger customer teams with reporting, approvals, and custom processes",
        features: ["Advanced analytics", "Role controls", "API connections", "Multi-team dashboards", "12-18 weeks delivery"],
      },
    ],
  },
  {
    service: "POS Systems",
    icon: "creditCard",
    description: "POS pricing that blends software, KRA-ready workflows, inventory, and branch operations.",
    consultation: true,
    customization: "Hardware, eTIMS setup, M-Pesa flows, and branch count affect the final project cost.",
    tiers: [
      {
        name: "Single Outlet POS",
        startingPrice: 90000,
        description: "For one retail, service, or restaurant location",
        features: ["Checkout workflow", "Stock sync", "Receipt setup", "Basic training", "3-5 weeks delivery"],
      },
      {
        name: "Multi-Branch POS",
        startingPrice: 250000,
        description: "For teams that need branch control, reporting, and customer tracking",
        features: ["Central dashboard", "M-Pesa support", "Inventory integration", "Staff permissions", "6-10 weeks delivery"],
        popular: true,
      },
      {
        name: "Retail Operations Suite",
        startingPrice: 650000,
        description: "For chains that need POS, stock, analytics, and custom integrations together",
        features: ["Custom reports", "ERP or accounting link", "Advanced controls", "Rollout support", "10-16 weeks delivery"],
      },
    ],
  },
  {
    service: "API Development & Integrations",
    icon: "workflow",
    description: "Integration work for payments, ERPs, CRMs, third-party platforms, and internal data syncs.",
    consultation: true,
    customization: "Scope depends on API count, data mapping complexity, monitoring, and documentation depth.",
    tiers: [
      {
        name: "Single Integration",
        startingPrice: 60000,
        description: "For one payment, CRM, or ERP connection",
        features: ["One API connection", "Webhook handling", "Basic logs", "Documentation", "1-2 weeks delivery"],
      },
      {
        name: "Integration Hub",
        startingPrice: 180000,
        description: "For products that need multiple systems connected cleanly",
        features: ["2-4 integrations", "Data mapping", "Retries and alerts", "Admin visibility", "3-6 weeks delivery"],
        popular: true,
      },
      {
        name: "Enterprise Integration Layer",
        startingPrice: 450000,
        description: "For multi-system flows with auditability and security requirements",
        features: ["Custom middleware", "Advanced auth", "Monitoring", "Technical documentation", "6-10 weeks delivery"],
      },
    ],
  },
  {
    service: "AI Solutions",
    icon: "bot",
    description: "AI chat, search, assistants, and workflow automation priced for practical business use in Kenya.",
    consultation: true,
    customization: "AI pricing depends on model usage, channels, knowledge setup, and workflow depth.",
    tiers: [
      {
        name: "FAQ Chatbot",
        startingPrice: 45000,
        description: "A simple website or WhatsApp assistant for FAQs and lead capture",
        features: ["Knowledge setup", "Basic UI", "Lead capture", "Launch support", "1-2 weeks delivery"],
      },
      {
        name: "AI Workflow Assistant",
        startingPrice: 180000,
        description: "For customer support, internal helpdesk, or document-assisted tasks",
        features: ["Custom prompts", "Knowledge base", "Workflow actions", "Analytics", "4-8 weeks delivery"],
        popular: true,
      },
      {
        name: "Advanced AI Operations Layer",
        startingPrice: 550000,
        description: "For multi-step automation, dashboards, and enterprise process support",
        features: ["Custom agent flows", "Integrations", "Human review states", "Usage reporting", "8-14 weeks delivery"],
      },
    ],
  },
  {
    service: "Data Analytics & BI",
    icon: "barChart3",
    description: "Dashboards, reporting pipelines, and business intelligence systems for operational visibility.",
    consultation: true,
    customization: "Quoted based on data sources, reporting complexity, automation, and leadership reporting needs.",
    tiers: [
      {
        name: "Reporting Starter",
        startingPrice: 120000,
        description: "For a core dashboard and monthly reporting workflow",
        features: ["1-2 dashboards", "Data cleanup", "KPI tracking", "Basic refresh flow", "3-5 weeks delivery"],
      },
      {
        name: "BI Dashboard Suite",
        startingPrice: 320000,
        description: "For teams that need role-based reporting across functions",
        features: ["Multiple dashboards", "Data pipeline setup", "Filters and exports", "Training", "6-10 weeks delivery"],
        popular: true,
      },
      {
        name: "Enterprise Analytics Program",
        startingPrice: 850000,
        description: "For multi-source analytics with deeper automation and executive reporting",
        features: ["Warehouse planning", "Cross-system reporting", "Advanced visuals", "Governance support", "10-16 weeks delivery"],
      },
    ],
  },
  {
    service: "QA & Software Testing",
    icon: "bug",
    description: "Manual and structured QA coverage for releases, regressions, and high-risk workflows.",
    consultation: true,
    customization: "Pricing depends on release cadence, environments, test depth, and whether QA is sprint-based or ongoing.",
    tiers: [
      {
        name: "QA Sprint",
        startingPrice: 50000,
        description: "A focused test cycle before launch or a major release",
        features: ["Test plan", "Manual regression pass", "Bug report", "Retest cycle", "1-2 weeks delivery"],
      },
      {
        name: "Release QA Package",
        startingPrice: 150000,
        description: "For teams shipping core features and needing repeatable coverage",
        features: ["Multi-device testing", "Regression pack", "Test cases", "Release sign-off", "3-5 weeks delivery"],
        popular: true,
      },
      {
        name: "Dedicated QA Program",
        startingPrice: 380000,
        description: "For products that need ongoing QA across multiple release cycles",
        features: ["Sprint QA support", "Structured reporting", "Environment coverage", "Risk tracking", "Monthly engagement"],
      },
    ],
  },
  {
    service: "Cloud & DevOps",
    icon: "cloud",
    description: "Infrastructure setup, CI/CD, monitoring, and production support aligned with local project budgets.",
    consultation: true,
    customization: "Cloud pricing varies with hosting provider, environments, traffic expectations, and support SLA.",
    tiers: [
      {
        name: "Launch Setup",
        startingPrice: 120000,
        description: "Get your product deployed with the basics done right",
        features: ["Cloud setup", "Basic CI/CD", "Domain and SSL", "Monitoring", "2-3 weeks delivery"],
      },
      {
        name: "Managed DevOps",
        startingPrice: 320000,
        description: "For growing products that need reliability and repeatable delivery",
        features: ["Environments", "Backups", "Alerts", "Security hardening", "Handover and docs", "4-8 weeks delivery"],
        popular: true,
      },
      {
        name: "Enterprise Reliability Program",
        startingPrice: 900000,
        description: "For larger systems that need stronger uptime, recovery, and process maturity",
        features: ["Scalable architecture", "Disaster recovery", "Advanced observability", "Support SLA planning", "8-12 weeks delivery"],
      },
    ],
  },
  {
    service: "Cybersecurity Services",
    icon: "shieldCheck",
    description: "Security reviews, penetration testing, and implementation support for business-critical systems.",
    consultation: true,
    customization: "Final quotes depend on app count, environments, audit depth, and remediation support required.",
    tiers: [
      {
        name: "Security Baseline Review",
        startingPrice: 100000,
        description: "For a practical review of your app, website, or cloud setup",
        features: ["Configuration review", "Basic vulnerability scan", "Risk summary", "Action plan", "1-2 weeks delivery"],
      },
      {
        name: "Pen Test and Remediation Plan",
        startingPrice: 280000,
        description: "For launch readiness or stronger stakeholder confidence",
        features: ["Manual testing", "Priority findings", "Remediation guidance", "Retest pass", "2-4 weeks delivery"],
        popular: true,
      },
      {
        name: "Security Program",
        startingPrice: 650000,
        description: "For teams that need hardening, policies, and engineering support together",
        features: ["Multi-surface review", "Security controls", "Implementation support", "Reporting pack", "4-8 weeks delivery"],
      },
    ],
  },
];

export const pricingFAQ: FAQItem[] = [
  {
    question: "What's included in the starting price?",
    answer: "Each starting price covers the core scope listed on that tier, plus planning, delivery, and launch support for that package. Integrations, migrations, extra user roles, and post-launch retainers are quoted separately.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes. Most Kenya-based project engagements are billed by milestone, often with an upfront deposit and agreed progress payments tied to delivery stages.",
  },
  {
    question: "Can I upgrade or add features after launch?",
    answer: "Yes. We can phase your project so you launch a lean first version, then add modules, automation, integrations, or redesign work once the first release is live.",
  },
  {
    question: "What about maintenance and support costs?",
    answer: "Support is usually quoted separately based on response time, release frequency, hosting responsibility, and monitoring needs. Smaller retainers often start around KSh 20,000 to KSh 60,000 per month, while higher-touch support can go beyond that.",
  },
  {
    question: "Are there discounts for multiple services?",
    answer: "Yes. Bundling work like Web plus Mobile, ERP plus POS, or CRM plus AI usually lowers the total delivery cost compared with pricing each stream separately.",
  },
  {
    question: "What if my budget is limited?",
    answer: "We can help you phase scope, focus on the highest-value workflows first, or start with an MVP and build toward a larger rollout later.",
  },
];
