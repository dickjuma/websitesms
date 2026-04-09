import {
  BarChart3,
  Bot,
  Bug,
  Cloud,
  Code2,
  CreditCard,
  Globe,
  Layers3,
  Package2,
  Palette,
  ShieldCheck,
  Smartphone,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ServiceTag = {
  label: string;
  variant?: "default" | "success" | "info" | "warning";
};

export type ServiceFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type ServiceTech = {
  name: string;
  icon: LucideIcon;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  tags: ServiceTag[];
  features: ServiceFeature[];
  process: ServiceProcessStep[];
  techStack: ServiceTech[];
  relatedServices: string[];
};

const defaultTags: ServiceTag[] = [
  { label: "Scalable", variant: "success" },
  { label: "Secure", variant: "info" },
  { label: "Real-time", variant: "default" },
];

const getDefaultFeatures = (): ServiceFeature[] => [
  { icon: Code2, title: "Clean Architecture", description: "Maintainable code structure built for growth" },
  { icon: Cloud, title: "Cloud Native", description: "Scalable infrastructure from day one" },
  { icon: ShieldCheck, title: "Enterprise Security", description: "Industry-standard protection" },
];

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortDescription: "Business software planned around internal workflows, user roles, and long-term roadmap control.",
    fullDescription: "We scope and build custom software around how your team already operates so the platform supports the business instead of forcing the business to adjust to generic tools.",
    imageSrc: "/images/custom-software-development.jfif",
    imageAlt: "Custom software development service",
    icon: Code2,
    tags: [
      { label: "Enterprise-Ready", variant: "info" },
      { label: "Scalable", variant: "success" },
      { label: "Long-term Support", variant: "default" },
    ],
    features: [
      { icon: Code2, title: "Custom Architecture", description: "Built around your specific business workflows" },
      { icon: Users, title: "Role-Based Access", description: "Granular permissions for teams and customers" },
      { icon: Layers3, title: "Integrations", description: "Connect with your existing tools and systems" },
      { icon: Workflow, title: "Workflow Automation", description: "Reduce manual tasks and improve efficiency" },
    ],
    process: [
      { title: "Discovery", description: "We map users, core workflows, and business goals" },
      { title: "Planning", description: "Architecture and UX design before any code" },
      { title: "Development", description: "Agile sprints with regular demos" },
      { title: "Testing", description: "Rigorous QA and security validation" },
      { title: "Deployment", description: "Smooth launch with zero downtime" },
      { title: "Scaling", description: "Ongoing support and feature expansion" },
    ],
    techStack: [
      { name: "React", icon: Palette },
      { name: "Node.js", icon: Globe },
      { name: "TypeScript", icon: Code2 },
      { name: "PostgreSQL", icon: Database },
      { name: "AWS", icon: Cloud },
    ],
    relatedServices: ["web-development", "mobile-app-development", "api-development-integrations"],
  },
  {
    slug: "web-development",
    title: "Custom Web Development",
    shortDescription: "Websites, portals, and web apps designed for performance, content flow, and conversion.",
    fullDescription: "We build websites and web platforms around your content, user journeys, and operations instead of squeezing your business into a template that only solves part of the problem.",
    imageSrc: "/images/custom-web-development.jfif",
    imageAlt: "Custom web development service",
    icon: Globe,
    tags: [
      { label: "SEO Optimized", variant: "success" },
      { label: "Fast Performance", variant: "info" },
      { label: "Mobile-First", variant: "default" },
    ],
    features: [
      { icon: Globe, title: "Custom Websites", description: "Unique designs that stand out from templates" },
      { icon: BarChart3, title: "Analytics Ready", description: "Built-in tracking and conversion optimization" },
      { icon: ShieldCheck, title: "Secure by Default", description: "Enterprise-grade security from the start" },
      { icon: Layers3, title: "CMS Integration", description: "Easy content management for your team" },
    ],
    process: [
      { title: "Discovery", description: "Goals, audience, and content strategy" },
      { title: "Design", description: "UI/UX focused on conversion" },
      { title: "Development", description: "Modern framework with optimal performance" },
      { title: "Testing", description: "Cross-browser and device validation" },
      { title: "Launch", description: "SEO-optimized deployment" },
      { title: "Growth", description: "Ongoing optimization and support" },
    ],
    techStack: [
      { name: "Next.js", icon: Globe },
      { name: "React", icon: Palette },
      { name: "TypeScript", icon: Code2 },
      { name: "Tailwind", icon: Layers3 },
      { name: "Vercel", icon: Cloud },
    ],
    relatedServices: ["ui-ux-design", "custom-software-development", "seo-services"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "Customer-facing and internal mobile products built for rollout readiness and daily use.",
    fullDescription: "We create mobile products for customers, field teams, and internal operations with the product thinking, delivery discipline, and integration work needed for real production use.",
    imageSrc: "/images/mobile-app-development.jfif",
    imageAlt: "Mobile app development service",
    icon: Smartphone,
    tags: [
      { label: "Cross-Platform", variant: "info" },
      { label: "Native Feel", variant: "success" },
      { label: "App Store Ready", variant: "default" },
    ],
    features: [
      { icon: Smartphone, title: "iOS & Android", description: "Native performance on both platforms" },
      { icon: Cloud, title: "Offline Mode", description: "Works without internet connection" },
      { icon: Bell, title: "Push Notifications", description: "Engage users at the right moment" },
      { icon: ShieldCheck, title: "Secure Storage", description: "Enterprise data protection" },
    ],
    process: [
      { title: "Definition", description: "Product scope and user flows" },
      { title: "Design", description: "Mobile-first UX and UI design" },
      { title: "Development", description: "Cross-platform or native build" },
      { title: "Testing", description: "Device testing and performance tuning" },
      { title: "App Store", description: "Submission and approval support" },
      { title: "Updates", description: "Regular improvements and maintenance" },
    ],
    techStack: [
      { name: "React Native", icon: Smartphone },
      { name: "Flutter", icon: Palette },
      { name: "Swift", icon: Code2 },
      { name: "Kotlin", icon: Globe },
      { name: "Firebase", icon: Cloud },
    ],
    relatedServices: ["ui-ux-design", "ai-solutions", "api-development-integrations"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "Product design systems, research-led journeys, and interfaces that reduce user friction.",
    fullDescription: "We design product experiences that reduce confusion, improve adoption, and give engineering teams clearer build direction across web, mobile, and internal platforms.",
    imageSrc: "/images/ui-ux-design.jfif",
    imageAlt: "UI and UX design service",
    icon: Palette,
    tags: [
      { label: "Research-Based", variant: "info" },
      { label: "User-Centered", variant: "success" },
      { label: "Design Systems", variant: "default" },
    ],
    features: [
      { icon: Palette, title: "Visual Design", description: "Beautiful, on-brand interfaces" },
      { icon: Users, title: "User Research", description: "Data-driven design decisions" },
      { icon: Layers3, title: "Design Systems", description: "Consistent components across products" },
      { icon: Smartphone, title: "Prototyping", description: "Interactive prototypes for validation" },
    ],
    process: [
      { title: "Research", description: "User interviews and competitive analysis" },
      { title: "Wireframing", description: "Structure and flow mapping" },
      { title: "Visual Design", description: "High-fidelity UI design" },
      { title: "Prototyping", description: "Interactive mockups for testing" },
      { title: "Handoff", description: "Developer-ready specifications" },
      { title: "Iteration", description: "Refinement based on feedback" },
    ],
    techStack: [
      { name: "Figma", icon: Palette },
      { name: "Adobe XD", icon: Code2 },
      { name: "Sketch", icon: Globe },
      { name: "Framer", icon: Layers3 },
      { name: "Storybook", icon: Globe },
    ],
    relatedServices: ["web-development", "mobile-app-development", "custom-software-development"],
  },
  {
    slug: "erp-systems",
    title: "ERP Systems",
    shortDescription: "Connected operations platforms for approvals, finance, inventory, and reporting.",
    fullDescription: "We design ERP-style systems that centralize business workflows so teams can work from one operational source of truth instead of scattered spreadsheets and disconnected tools.",
    imageSrc: "/images/erp-systems.jfif",
    imageAlt: "ERP systems service",
    icon: Layers3,
    tags: [
      { label: "Centralized", variant: "info" },
      { label: "Automated", variant: "success" },
      { label: "Real-Time", variant: "default" },
    ],
    features: [
      { icon: Layers3, title: "Finance Module", description: "Complete accounting and reporting" },
      { icon: Users, title: "HR & Payroll", description: "Employee management automation" },
      { icon: Package2, title: "Inventory", description: "Stock tracking and management" },
      { icon: BarChart3, title: "BI & Reporting", description: "Real-time business insights" },
    ],
    process: [
      { title: "Assessment", description: "Current systems and pain points" },
      { title: "Planning", description: "Module selection and customization" },
      { title: "Implementation", description: "Phased rollout approach" },
      { title: "Data Migration", description: "Secure transfer from legacy systems" },
      { title: "Training", description: "Team onboarding and adoption" },
      { title: "Optimization", description: "Continuous improvement" },
    ],
    techStack: [
      { name: "Odoo", icon: Layers3 },
      { name: "PostgreSQL", icon: Database },
      { name: "Node.js", icon: Globe },
      { name: "React", icon: Palette },
      { name: "AWS", icon: Cloud },
    ],
    relatedServices: ["inventory-systems", "crm-systems", "data-analytics-bi"],
  },
  {
    slug: "inventory-systems",
    title: "Inventory Systems",
    shortDescription: "Stock control, warehouse flow, and procurement visibility for operational teams.",
    fullDescription: "We build inventory systems for businesses that need cleaner stock visibility, stronger movement tracking, and more reliable control over purchasing, warehousing, and transfers.",
    imageSrc: "/images/inventory-systems.jfif",
    imageAlt: "Inventory systems service",
    icon: Package2,
    tags: [
      { label: "Multi-Location", variant: "info" },
      { label: "Real-Time", variant: "success" },
      { label: "Barcode Scanning", variant: "default" },
    ],
    features: [
      { icon: Package2, title: "Stock Tracking", description: "Real-time inventory visibility" },
      { icon: Workflow, title: "Purchase Orders", description: "Streamlined procurement workflow" },
      { icon: BarChart3, title: "Forecasting", description: "AI-powered demand prediction" },
      { icon: Layers3, title: "Warehouse Management", description: "Optimized storage and picking" },
    ],
    process: [
      { title: "Analysis", description: "Current inventory workflows" },
      { title: "Design", description: "System architecture and controls" },
      { title: "Development", description: "Core inventory logic" },
      { title: "Integration", description: "Connect with POS and ERP" },
      { title: "Deployment", description: "Go-live with training" },
      { title: "Support", description: "Ongoing maintenance" },
    ],
    techStack: [
      { name: "React", icon: Palette },
      { name: "Node.js", icon: Globe },
      { name: "PostgreSQL", icon: Database },
      { name: "Barcode", icon: Code2 },
      { name: "Cloud", icon: Cloud },
    ],
    relatedServices: ["erp-systems", "pos-systems", "crm-systems"],
  },
  {
    slug: "crm-systems",
    title: "CRM Systems",
    shortDescription: "Lead, account, and customer workflows tailored for revenue and service teams.",
    fullDescription: "We create CRM systems that give revenue and service teams better visibility across leads, accounts, follow-up, and customer activity without making the workflow harder to manage.",
    imageSrc: "/images/crm-systems.jfif",
    imageAlt: "CRM systems service",
    icon: Users,
    tags: [
      { label: "Sales Pipeline", variant: "info" },
      { label: "Automation", variant: "success" },
      { label: "Integration", variant: "default" },
    ],
    features: [
      { icon: Users, title: "Lead Management", description: "Complete lead lifecycle tracking" },
      { icon: Workflow, title: "Automation", description: "Automated follow-ups and tasks" },
      { icon: BarChart3, title: "Sales Analytics", description: "Pipeline and forecast insights" },
      { icon: Globe, title: "Multi-Channel", description: "Email, chat, and social integration" },
    ],
    process: [
      { title: "Strategy", description: "Sales process analysis" },
      { title: "Configuration", description: "Custom fields and workflows" },
      { title: "Integration", description: "Connect existing tools" },
      { title: "Migration", description: "Import existing data" },
      { title: "Training", description: "Team onboarding" },
      { title: "Optimization", description: "Ongoing improvements" },
    ],
    techStack: [
      { name: "HubSpot", icon: Users },
      { name: "Salesforce", icon: Cloud },
      { name: "Node.js", icon: Globe },
      { name: "React", icon: Palette },
      { name: "API", icon: Workflow },
    ],
    relatedServices: ["erp-systems", "pos-systems", "ai-solutions"],
  },
  {
    slug: "pos-systems",
    title: "POS Systems",
    shortDescription: "Retail and service checkout systems with branch visibility, stock sync, and reporting.",
    fullDescription: "We create POS systems for retail and service businesses that want faster checkout, cleaner sales records, and stronger visibility across branches, stock, receipts, and daily operations.",
    imageSrc: "/images/pos-systems.jfif",
    imageAlt: "POS systems service",
    icon: CreditCard,
    tags: [
      { label: "Multi-Branch", variant: "info" },
      { label: "Cloud-Based", variant: "success" },
      { label: "eTIMS Ready", variant: "default" },
    ],
    features: [
      { icon: CreditCard, title: "Fast Checkout", description: "Seconds-per-transaction processing" },
      { icon: Layers3, title: "Multi-Branch", description: "Centralized control across locations" },
      { icon: Package2, title: "Inventory Sync", description: "Real-time stock updates" },
      { icon: BarChart3, title: "Sales Reports", description: "Comprehensive analytics" },
    ],
    process: [
      { title: "Requirements", description: "Store workflow analysis" },
      { title: "Design", description: "POS interface and flows" },
      { title: "Development", description: "Core transaction processing" },
      { title: "Integration", description: "Payment and inventory links" },
      { title: "Testing", description: "Real-world scenario testing" },
      { title: "Launch", description: "Branch rollout support" },
    ],
    techStack: [
      { name: "React", icon: Palette },
      { name: "Electron", icon: Globe },
      { name: "Node.js", icon: Globe },
      { name: "PostgreSQL", icon: Database },
      { name: "Payment APIs", icon: CreditCard },
    ],
    relatedServices: ["inventory-systems", "erp-systems", "crm-systems"],
  },
  {
    slug: "api-development-integrations",
    title: "API Development & Integrations",
    shortDescription: "Reliable service layers and system-to-system integrations for cleaner operations.",
    fullDescription: "We build APIs and integration layers that help systems talk to each other with better reliability, traceability, and maintainability than fragile one-off sync scripts.",
    imageSrc: "/images/api-development-integrations.jfif",
    imageAlt: "API development and integrations service",
    icon: Workflow,
    tags: [
      { label: "RESTful", variant: "info" },
      { label: "Secure", variant: "success" },
      { label: "Documented", variant: "default" },
    ],
    features: [
      { icon: Workflow, title: "API Design", description: "Clean, maintainable endpoints" },
      { icon: ShieldCheck, title: "Authentication", description: "OAuth, JWT, and API keys" },
      { icon: Layers3, title: "Integrations", description: "Connect third-party services" },
      { icon: BarChart3, title: "Monitoring", description: "Real-time API analytics" },
    ],
    process: [
      { title: "Analysis", description: "System and data mapping" },
      { title: "Design", description: "API specification and schema" },
      { title: "Development", description: "Core API implementation" },
      { title: "Testing", description: "Integration and load testing" },
      { title: "Documentation", description: "API reference and guides" },
      { title: "Support", description: "Ongoing maintenance" },
    ],
    techStack: [
      { name: "Node.js", icon: Globe },
      { name: "Express", icon: Code2 },
      { name: "TypeScript", icon: Code2 },
      { name: "PostgreSQL", icon: Database },
      { name: "GraphQL", icon: Layers3 },
    ],
    relatedServices: ["custom-software-development", "cloud-devops", "ai-solutions"],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    shortDescription: "Assistants, automations, and AI features shaped around practical business problems.",
    fullDescription: "We design practical AI experiences for support, operations, search, automation, and decision support so the work fits real teams and real processes rather than a demo-only concept.",
    imageSrc: "/images/custom-software-development.jfif",
    imageAlt: "AI solutions service",
    icon: Bot,
    tags: [
      { label: "Conversational AI", variant: "info" },
      { label: "Automation", variant: "success" },
      { label: "Custom Training", variant: "default" },
    ],
    features: [
      { icon: Bot, title: "AI Assistants", description: "24/7 customer support automation" },
      { icon: Workflow, title: "Process Automation", description: "Reduce repetitive tasks" },
      { icon: BarChart3, title: "Predictive Analytics", description: "Data-driven forecasting" },
      { icon: Globe, title: "Custom LLMs", description: "Your data, your AI model" },
    ],
    process: [
      { title: "Use Case", description: "Identify high-value AI opportunities" },
      { title: "Data Prep", description: "Gather and structure training data" },
      { title: "Development", description: "Model training and tuning" },
      { title: "Integration", description: "Connect to your systems" },
      { title: "Testing", description: "Validate responses and accuracy" },
      { title: "Deployment", description: "Launch and monitor performance" },
    ],
    techStack: [
      { name: "OpenAI", icon: Bot },
      { name: "LangChain", icon: Layers3 },
      { name: "Python", icon: Code2 },
      { name: "Vector DB", icon: Database },
      { name: "FastAPI", icon: Globe },
    ],
    relatedServices: ["data-analytics-bi", "api-development-integrations", "custom-software-development"],
  },
  {
    slug: "data-analytics-bi",
    title: "Data Analytics & BI",
    shortDescription: "Dashboards and reporting pipelines that turn scattered data into decisions.",
    fullDescription: "We create reporting and business intelligence systems that bring together the right data sources, metrics, and dashboards so teams can make decisions without hunting through disconnected spreadsheets.",
    imageSrc: "/images/cloud-devops.jfif",
    imageAlt: "Data analytics and business intelligence service",
    icon: BarChart3,
    tags: [
      { label: "Real-Time", variant: "info" },
      { label: "Custom Dashboards", variant: "success" },
      { label: "Predictive", variant: "default" },
    ],
    features: [
      { icon: BarChart3, title: "Dashboards", description: "Real-time business visibility" },
      { icon: Layers3, title: "Data Pipeline", description: "Automated ETL processes" },
      { icon: Globe, title: "Data Sources", description: "Connect any data platform" },
      { icon: Bot, title: "Predictive Analytics", description: "AI-powered forecasting" },
    ],
    process: [
      { title: "Discovery", description: "Data sources and KPIs" },
      { title: "Architecture", description: "Pipeline and storage design" },
      { title: "Development", description: "ETL and dashboard build" },
      { title: "Validation", description: "Accuracy verification" },
      { title: "Training", description: "Team onboarding" },
      { title: "Optimization", description: "Continuous improvements" },
    ],
    techStack: [
      { name: "Power BI", icon: BarChart3 },
      { name: "Tableau", icon: Palette },
      { name: "Python", icon: Code2 },
      { name: "Snowflake", icon: Cloud },
      { name: "dbt", icon: Layers3 },
    ],
    relatedServices: ["ai-solutions", "erp-systems", "crm-systems"],
  },
  {
    slug: "qa-software-testing",
    title: "QA & Software Testing",
    shortDescription: "Release-focused QA support for regressions, high-risk flows, and validation clarity.",
    fullDescription: "We provide structured QA and software testing support for teams that need stronger release confidence, clearer bug visibility, and more reliable validation across high-risk workflows.",
    imageSrc: "/images/qa-software-testing.jfif",
    imageAlt: "QA and software testing service",
    icon: Bug,
    tags: [
      { label: "Manual Testing", variant: "info" },
      { label: "Automated", variant: "success" },
      { label: "Security Testing", variant: "default" },
    ],
    features: [
      { icon: Bug, title: "Functional Testing", description: "End-to-end validation" },
      { icon: Workflow, title: "Automation", description: "Regression test suites" },
      { icon: ShieldCheck, title: "Security Testing", description: "Vulnerability assessment" },
      { icon: BarChart3, title: "Performance", description: "Load and stress testing" },
    ],
    process: [
      { title: "Planning", description: "Test strategy and scope" },
      { title: "Design", description: "Test case creation" },
      { title: "Execution", description: "Manual and automated testing" },
      { title: "Reporting", description: "Detailed bug documentation" },
      { title: "Verification", description: "Fix validation" },
      { title: "Sign-off", description: "Release recommendation" },
    ],
    techStack: [
      { name: "Selenium", icon: Bug },
      { name: "Cypress", icon: Code2 },
      { name: "Playwright", icon: Globe },
      { name: "Jest", icon: Palette },
      { name: "Postman", icon: Workflow },
    ],
    relatedServices: ["cloud-devops", "custom-software-development", "cybersecurity-services"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortDescription: "Infrastructure, deployment, monitoring, and reliability support for production systems.",
    fullDescription: "We design cloud and DevOps setups that improve deployment consistency, operational visibility, and production stability for growing products and internal systems.",
    imageSrc: "/images/cloud-devops.jfif",
    imageAlt: "Cloud and DevOps service",
    icon: Cloud,
    tags: [
      { label: "CI/CD", variant: "info" },
      { label: "Infrastructure as Code", variant: "success" },
      { label: "24/7 Monitoring", variant: "default" },
    ],
    features: [
      { icon: Cloud, title: "Cloud Infrastructure", description: "AWS, Azure, or GCP setup" },
      { icon: Workflow, title: "CI/CD Pipelines", description: "Automated deployment workflows" },
      { icon: Layers3, title: "Containerization", description: "Docker and Kubernetes" },
      { icon: BarChart3, title: "Monitoring", description: "Real-time observability" },
    ],
    process: [
      { title: "Assessment", description: "Current infrastructure review" },
      { title: "Planning", description: "Architecture and tooling selection" },
      { title: "Implementation", description: "Infrastructure setup" },
      { title: "Automation", description: "CI/CD pipeline configuration" },
      { title: "Monitoring", description: "Alerting and dashboards" },
      { title: "Handover", description: "Documentation and training" },
    ],
    techStack: [
      { name: "AWS", icon: Cloud },
      { name: "Kubernetes", icon: Layers3 },
      { name: "Docker", icon: Globe },
      { name: "Terraform", icon: Code2 },
      { name: "GitHub Actions", icon: Workflow },
    ],
    relatedServices: ["cybersecurity-services", "custom-software-development", "api-development-integrations"],
  },
  {
    slug: "cybersecurity-services",
    title: "Cybersecurity Services",
    shortDescription: "Security reviews, hardening, and remediation work for apps and cloud environments.",
    fullDescription: "We help teams strengthen their applications and infrastructure with practical security reviews, remediation guidance, and protection work that matches the real business risk.",
    imageSrc: "/images/cybersecurity-services.jfif",
    imageAlt: "Cybersecurity services",
    icon: ShieldCheck,
    tags: [
      { label: "Penetration Testing", variant: "info" },
      { label: "Compliance", variant: "success" },
      { label: "24/7 Monitoring", variant: "default" },
    ],
    features: [
      { icon: ShieldCheck, title: "Security Audit", description: "Comprehensive risk assessment" },
      { icon: Bug, title: "Penetration Testing", description: "Ethical hacking simulation" },
      { icon: Lock, title: "Compliance", description: "GDPR, HIPAA, SOC2 readiness" },
      { icon: Globe, title: "Incident Response", description: "Rapid breach containment" },
    ],
    process: [
      { title: "Scoping", description: "Assets and threat assessment" },
      { title: "Testing", description: "Vulnerability scanning" },
      { title: "Analysis", description: "Risk prioritization" },
      { title: "Remediation", description: "Security improvements" },
      { title: "Verification", description: "Retesting fixes" },
      { title: "Reporting", description: "Executive summary" },
    ],
    techStack: [
      { name: "OWASP", icon: ShieldCheck },
      { name: "Nessus", icon: Bug },
      { name: "Burp Suite", icon: Code2 },
      { name: "AWS Security", icon: Cloud },
      { name: "Snyk", icon: Globe },
    ],
    relatedServices: ["cloud-devops", "qa-software-testing", "custom-software-development"],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug);
};

export const getRelatedServices = (slugs: string[]): Service[] => {
  return services.filter((s) => slugs.includes(s.slug));
};

import { Database } from "lucide-react";
import { Bell } from "lucide-react";
import { Lock } from "lucide-react";
