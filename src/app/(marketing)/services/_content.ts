export type ServiceLink = {
  label: string;
  href: string;
};

export type ServiceStep = {
  title: string;
  description: string;
};

export type ServiceContent = {
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
  capabilities: string[];
  outcomes: string[];
  considerations: string[];
  steps: ServiceStep[];
  relatedLinks: ServiceLink[];
};

export const customSoftwareContent: ServiceContent = {
  title: "Custom Software Development",
  eyebrow: "Services / Software",
  summary: "Business-first software builds designed around your actual workflows, users, and growth path.",
  description:
    "We scope and build custom software around how your team already operates so the platform supports the business instead of forcing the business to adjust to generic tools.",
  imageSrc: "/images/custom-software-development.jfif",
  imageAlt: "Custom software development service",
  highlights: ["Business-specific product design", "Scalable architecture choices", "Long-term extensibility"],
  capabilities: [
    "Internal platforms, customer portals, admin systems, dashboards, and workflow tools mapped to operational reality.",
    "Architecture planning for permissions, integrations, reporting, and maintainable future releases.",
    "Delivery milestones shaped around adoption, clarity, and measurable business value from the first release.",
  ],
  outcomes: [
    "A system that matches how your team actually works instead of adding friction.",
    "Better control over roadmap, data flow, and future feature growth.",
    "A product foundation you can extend without replacing the whole platform later.",
  ],
  considerations: [
    "Which workflows, approvals, and exceptions the first release must support.",
    "How roles, permissions, and data visibility should work across teams and customers.",
    "What should launch as an MVP first versus what should wait for later phases.",
  ],
  steps: [
    { title: "Discovery and scope", description: "We map users, core workflows, constraints, and the highest-value release shape." },
    { title: "UX and architecture", description: "We shape the system structure, major screens, and technical foundation before build starts." },
    { title: "Build and iterate", description: "We deliver in milestones, review working software, and refine details with real context." },
    { title: "Launch and improve", description: "We stabilize adoption, support rollout, and plan the next release path." },
  ],
  relatedLinks: [
    { label: "Custom Web Development", href: "/services/web-development" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const webDevelopmentContent: ServiceContent = {
  title: "Custom Web Development",
  eyebrow: "Services / Web",
  summary: "Tailored websites, portals, and web apps planned for performance, growth, and conversion.",
  description:
    "We build websites and web platforms around your content, user journeys, and operations instead of squeezing your business into a template that only solves part of the problem.",
  imageSrc: "/images/custom-web-development.jfif",
  imageAlt: "Custom web development service",
  highlights: ["Tailored web platforms", "Scalable architecture", "CMS and integration work"],
  capabilities: [
    "Marketing websites, portals, dashboards, ecommerce flows, and web apps designed around real user journeys.",
    "Frontend and backend planning for content, admin workflows, analytics, integrations, and security.",
    "Implementation that supports performance, search visibility, and conversion-aware experiences.",
  ],
  outcomes: [
    "A stronger web presence for sales, onboarding, operations, or customer self-service.",
    "A custom platform that can grow without a full rebuild later.",
    "Cleaner journeys from traffic to inquiry, signup, purchase, or daily product usage.",
  ],
  considerations: [
    "What the web platform needs to achieve for leads, sales, operations, or support.",
    "How content, SEO, analytics, and admin tasks should work after launch.",
    "How the product should scale as traffic, features, and users grow.",
  ],
  steps: [
    { title: "Planning", description: "We define goals, page scope, feature scope, integrations, and the right site architecture." },
    { title: "Interface direction", description: "We shape layouts, content flow, and the admin or portal experience around user needs." },
    { title: "Build and integration", description: "We deliver the frontend, backend, forms, CMS, APIs, and launch-critical integrations." },
    { title: "Optimization", description: "We test, ship, and refine the platform around speed, SEO, analytics, and conversion." },
  ],
  relatedLinks: [
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "Custom Software Development", href: "/services/custom-software-development" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const mobileAppContent: ServiceContent = {
  title: "Mobile App Development",
  eyebrow: "Services / Mobile",
  summary: "Customer and internal mobile products shaped for daily use, rollout readiness, and reliable growth.",
  description:
    "We create mobile products for customers, field teams, and internal operations with the product thinking, delivery discipline, and integration work needed for real production use.",
  imageSrc: "/images/mobile-app-development.jfif",
  imageAlt: "Mobile app development service",
  highlights: ["Cross-platform delivery", "Customer and internal apps", "Launch-ready quality"],
  capabilities: [
    "Mobile experiences for onboarding, approvals, notifications, transactions, and high-frequency workflows.",
    "Cross-platform engineering for iOS and Android with practical release planning from day one.",
    "Connections into payments, analytics, maps, messaging, and the business systems behind the app.",
  ],
  outcomes: [
    "A polished mobile product that feels ready for production users.",
    "Better access to your services for customers and teams on the move.",
    "A release path that stays aligned with your wider platform roadmap.",
  ],
  considerations: [
    "Whether iOS, Android, or shared cross-platform delivery best fits the project.",
    "How onboarding, notifications, offline behavior, and permissions affect usability.",
    "How the app will be supported after launch with updates, analytics, and store management.",
  ],
  steps: [
    { title: "Product definition", description: "We clarify flows, release priorities, and the best delivery approach for the audience." },
    { title: "Design and prototype", description: "We shape the mobile experience around speed, clarity, and repeated daily tasks." },
    { title: "App build", description: "We build the product, connect services, and validate behavior across devices and environments." },
    { title: "Release and support", description: "We prepare stores, launch, and support the next release cycle." },
  ],
  relatedLinks: [
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const uiUxDesignContent: ServiceContent = {
  title: "UI/UX Design",
  eyebrow: "Services / Design",
  summary: "Research-backed interfaces and product systems that help people learn, trust, and use software faster.",
  description:
    "We design product experiences that reduce confusion, improve adoption, and give engineering teams clearer build direction across web, mobile, and internal platforms.",
  imageSrc: "/images/ui-ux-design.jfif",
  imageAlt: "UI and UX design service",
  highlights: ["Research-led interfaces", "Clear product flows", "Consistent design systems"],
  capabilities: [
    "User journeys, wireframes, prototypes, and interface systems for web, mobile, and internal tools.",
    "Design systems and reusable patterns that support product consistency over time.",
    "Close collaboration with product and engineering teams so designs stay practical to build.",
  ],
  outcomes: [
    "A more intuitive experience for onboarding, transactions, and daily tasks.",
    "Less development rework because product direction is clearer up front.",
    "A stronger product identity that feels intentional rather than pieced together.",
  ],
  considerations: [
    "Who the main user groups are and what success looks like for each.",
    "Where friction, drop-offs, or confusion happen in the current journey.",
    "How accessibility, responsiveness, and brand consistency should shape the system.",
  ],
  steps: [
    { title: "Research and mapping", description: "We review users, goals, and problem areas to define the right experience direction." },
    { title: "Wireframes and structure", description: "We clarify screen hierarchy, layout patterns, and interaction logic." },
    { title: "Visual design", description: "We create the interface language, reusable components, and major states." },
    { title: "Handoff and review", description: "We support implementation and keep the product aligned through build." },
  ],
  relatedLinks: [
    { label: "Custom Web Development", href: "/services/web-development" },
    { label: "Mobile App Development", href: "/services/mobile-app-development" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const erpSystemsContent: ServiceContent = {
  title: "ERP Systems",
  eyebrow: "Services / ERP",
  summary: "Connected internal systems for operations, finance, approvals, inventory, and reporting visibility.",
  description:
    "We design ERP-style systems that centralize business workflows so teams can work from one operational source of truth instead of scattered spreadsheets and disconnected tools.",
  imageSrc: "/images/erp-systems.jfif",
  imageAlt: "ERP systems service",
  highlights: ["Operations centralization", "Workflow automation", "Reporting visibility"],
  capabilities: [
    "Systems for finance, approvals, procurement, inventory, and cross-team handoffs.",
    "Role-based workflows that reduce manual follow-up and spreadsheet dependence.",
    "Dashboards and reporting layers that give leadership stronger visibility across the business.",
  ],
  outcomes: [
    "Better operational consistency across teams and branches.",
    "More reliable approvals, reporting, and daily execution visibility.",
    "A stronger foundation for scale, compliance, and process discipline.",
  ],
  considerations: [
    "Which modules should land in the first phase and which should follow later.",
    "How roles, approvals, and reporting should work across departments.",
    "What migration effort is needed from current tools or spreadsheets.",
  ],
  steps: [
    { title: "Process discovery", description: "We review departments, approvals, reporting needs, and current bottlenecks." },
    { title: "Module planning", description: "We define the phase-one modules, data model, and workflow rules." },
    { title: "Implementation", description: "We build and connect the ERP workflows, reports, and user roles." },
    { title: "Rollout", description: "We support onboarding, stabilization, and follow-up phases for expansion." },
  ],
  relatedLinks: [
    { label: "Data Analytics and BI", href: "/services/data-analytics-bi" },
    { label: "Pricing", href: "/pricing" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const inventorySystemsContent: ServiceContent = {
  title: "Inventory Systems",
  eyebrow: "Services / Inventory",
  summary: "Stock visibility, warehouse control, procurement flow, and movement tracking for growing operations.",
  description:
    "We build inventory systems for businesses that need cleaner stock visibility, stronger movement tracking, and more reliable control over purchasing, warehousing, and transfers.",
  imageSrc: "/images/inventory-systems.jfif",
  imageAlt: "Inventory systems service",
  highlights: ["Stock control visibility", "Warehouse coordination", "Procurement and movement tracking"],
  capabilities: [
    "Inventory visibility across stores, warehouses, stock movements, transfers, and supplier workflows.",
    "Role-based controls for receiving, dispatch, adjustments, audits, and replenishment decisions.",
    "Reporting for stock status, reorder planning, valuation, and operational accuracy.",
  ],
  outcomes: [
    "Cleaner stock accuracy and fewer surprises across locations.",
    "Faster warehouse and replenishment decisions with better visibility.",
    "A stronger operational base for retail, distribution, or production teams.",
  ],
  considerations: [
    "How branches, stores, or warehouses need to share inventory data.",
    "Whether barcode, batch, or supplier workflows are part of phase one.",
    "What current manual work should be removed first for the biggest gain.",
  ],
  steps: [
    { title: "Flow review", description: "We map how stock enters, moves, adjusts, and leaves the business." },
    { title: "Control design", description: "We define permissions, alerts, receiving rules, and reporting needs." },
    { title: "System build", description: "We implement inventory logic, dashboards, and transfer or procurement tools." },
    { title: "Operational rollout", description: "We support teams through adoption, cleanup, and refinement." },
  ],
  relatedLinks: [
    { label: "ERP Systems", href: "/services/erp-systems" },
    { label: "POS Systems", href: "/services/pos-systems" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const crmSystemsContent: ServiceContent = {
  title: "CRM Systems",
  eyebrow: "Services / CRM",
  summary: "Lead, customer, and revenue workflows tailored for sales teams, support teams, and service operations.",
  description:
    "We create CRM systems that give revenue and service teams better visibility across leads, accounts, follow-up, and customer activity without making the workflow harder to manage.",
  imageSrc: "/images/crm-systems.jfif",
  imageAlt: "CRM systems service",
  highlights: ["Lead and account visibility", "Workflow automation", "Sales and support coordination"],
  capabilities: [
    "Lead capture, pipeline tracking, customer records, follow-up workflows, and account visibility.",
    "Automations for reminders, assignments, status changes, and communication handoffs.",
    "Dashboards for performance, workload visibility, and customer activity across teams.",
  ],
  outcomes: [
    "A clearer sales and customer journey from first contact through retention.",
    "Better follow-up discipline and less information lost between people or channels.",
    "Stronger reporting on pipeline health, team activity, and customer movement.",
  ],
  considerations: [
    "How lead stages, account ownership, and service workflows should work across teams.",
    "Which integrations matter most, such as forms, WhatsApp, email, or billing systems.",
    "What automation should be introduced without making the process harder to trust.",
  ],
  steps: [
    { title: "Revenue workflow mapping", description: "We study your current lead, sales, and customer handling process." },
    { title: "CRM structure", description: "We define stages, records, automations, and reporting views." },
    { title: "Delivery", description: "We build the CRM workflows, dashboards, and integrations for daily use." },
    { title: "Team adoption", description: "We support rollout, cleanup, and process refinement with real usage." },
  ],
  relatedLinks: [
    { label: "Data Analytics and BI", href: "/services/data-analytics-bi" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const posSystemsContent: ServiceContent = {
  title: "POS Systems",
  eyebrow: "Services / POS",
  summary: "Retail and service checkout systems with stock sync, reporting, and day-to-day control built in.",
  description:
    "We create POS systems for retail and service businesses that want faster checkout, cleaner sales records, and stronger visibility across branches, stock, receipts, and daily operations.",
  imageSrc: "/images/pos-systems.jfif",
  imageAlt: "POS systems service",
  highlights: ["Checkout flow design", "Branch visibility", "Retail operations reporting"],
  capabilities: [
    "Checkout workflows, receipt handling, branch visibility, stock sync, and role-based till control.",
    "Connections into inventory, CRM, accounting, eTIMS, or payment workflows where needed.",
    "Reporting around sales performance, branch activity, cashier controls, and daily reconciliation.",
  ],
  outcomes: [
    "Faster, smoother point-of-sale operations across one or more outlets.",
    "Better visibility into sales, stock effects, and branch performance.",
    "A more dependable retail or service operations layer for growth.",
  ],
  considerations: [
    "Whether the system needs to support one location or multiple branches from day one.",
    "How stock, receipts, taxes, and payment methods should connect into the workflow.",
    "What reporting and controls matter most for managers and finance teams.",
  ],
  steps: [
    { title: "Store workflow review", description: "We map how sales, stock, staff, and reconciliation work today." },
    { title: "POS design", description: "We shape the checkout flow, branch structure, and reporting model." },
    { title: "Implementation", description: "We build the POS logic, dashboards, and operational integrations." },
    { title: "Branch rollout", description: "We support go-live, branch setup, and operational tuning." },
  ],
  relatedLinks: [
    { label: "Inventory Systems", href: "/services/inventory-systems" },
    { label: "CRM Systems", href: "/services/crm-systems" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const apiIntegrationsContent: ServiceContent = {
  title: "API Development and Integrations",
  eyebrow: "Services / APIs",
  summary: "Reliable integrations and service layers that connect products, teams, and third-party tools cleanly.",
  description:
    "We build APIs and integration layers that help systems talk to each other with better reliability, traceability, and maintainability than fragile one-off sync scripts.",
  imageSrc: "/images/api-development-integrations.jfif",
  imageAlt: "API development and integrations service",
  highlights: ["System-to-system reliability", "Clean data exchange", "Integration visibility"],
  capabilities: [
    "REST APIs and service integrations for products, mobile apps, portals, and partner connections.",
    "Webhook handling, middleware logic, retry strategy, and authentication planning.",
    "Documentation and technical visibility so integrations stay supportable over time.",
  ],
  outcomes: [
    "Less manual data movement and fewer broken system handoffs.",
    "A cleaner integration layer that is easier to extend and monitor.",
    "Better confidence when core business systems depend on each other.",
  ],
  considerations: [
    "Which systems need to sync, trigger actions, or expose data externally.",
    "How failures, retries, rate limits, and error visibility should be handled.",
    "What technical documentation and admin visibility your team needs after launch.",
  ],
  steps: [
    { title: "Integration mapping", description: "We review source systems, targets, payloads, and operational rules." },
    { title: "API design", description: "We define endpoints, auth, data mapping, and failure handling." },
    { title: "Build and test", description: "We implement the integration layer and validate real sync behavior." },
    { title: "Observability", description: "We add the logs, documentation, and support path needed for live operations." },
  ],
  relatedLinks: [
    { label: "Cloud and DevOps", href: "/services/cloud-devops" },
    { label: "Custom Software Development", href: "/services/custom-software-development" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const aiSolutionsContent: ServiceContent = {
  title: "AI Solutions",
  eyebrow: "Services / AI",
  summary: "Useful assistants, automation layers, and AI features that solve business problems without hype.",
  description:
    "We design practical AI experiences for support, operations, search, automation, and decision support so the work fits real teams and real processes rather than a demo-only concept.",
  imageSrc: "/images/custom-software-development.jfif",
  imageAlt: "AI solutions service",
  highlights: ["Practical automation", "Assistant design", "Business process fit"],
  capabilities: [
    "AI assistants, internal copilots, smart workflows, and knowledge-based experiences for teams and customers.",
    "Automation that reduces repetitive work in service, reporting, operations, and content flows.",
    "Guardrails, escalation paths, and human review where reliability matters most.",
  ],
  outcomes: [
    "Faster handling of repetitive questions and support tasks.",
    "A stronger bridge between business knowledge and day-to-day execution.",
    "AI features that are useful enough to keep, not just impressive to demo.",
  ],
  considerations: [
    "Which problems actually benefit from AI instead of normal product logic.",
    "What knowledge sources, tools, or actions the assistant needs to access.",
    "Where human approval, review, or escalation should sit in the workflow.",
  ],
  steps: [
    { title: "Use-case selection", description: "We pick the AI opportunities with the clearest operational or customer value." },
    { title: "Workflow design", description: "We define prompts, knowledge access, actions, and guardrails." },
    { title: "Implementation", description: "We build the assistant or automation layer into the right channel or product surface." },
    { title: "Measurement", description: "We review usage, accuracy, escalations, and the next improvement loop." },
  ],
  relatedLinks: [
    { label: "Data Analytics and BI", href: "/services/data-analytics-bi" },
    { label: "CRM Systems", href: "/services/crm-systems" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const dataAnalyticsContent: ServiceContent = {
  title: "Data Analytics and BI",
  eyebrow: "Services / Analytics",
  summary: "Dashboards, reporting flows, and data visibility systems that turn scattered reporting into decisions.",
  description:
    "We create reporting and business intelligence systems that bring together the right data sources, metrics, and dashboards so teams can make decisions without hunting through disconnected spreadsheets.",
  imageSrc: "/images/cloud-devops.jfif",
  imageAlt: "Data analytics and business intelligence service",
  highlights: ["Decision visibility", "Cross-system reporting", "Structured KPI tracking"],
  capabilities: [
    "Dashboards and reporting layers for leadership, operations, finance, and revenue teams.",
    "Connections across CRMs, ERPs, apps, spreadsheets, and service platforms for one reporting picture.",
    "Metric design and visualization choices that keep reporting usable instead of noisy.",
  ],
  outcomes: [
    "A clearer view of performance, bottlenecks, and operational movement.",
    "Less manual reporting effort and better leadership visibility.",
    "A data foundation that supports smarter planning as the business grows.",
  ],
  considerations: [
    "Which systems currently hold the data that matters most.",
    "Which KPIs actually drive decisions for leadership and teams.",
    "How often data needs to refresh and who should see which views.",
  ],
  steps: [
    { title: "Data discovery", description: "We identify data sources, reporting goals, and metric gaps." },
    { title: "Model and dashboard planning", description: "We define the reporting structure, KPI set, and dashboard flow." },
    { title: "Pipeline and dashboard build", description: "We connect sources, shape data, and deliver usable reporting views." },
    { title: "Review and expansion", description: "We refine the reporting layer based on how teams actually use it." },
  ],
  relatedLinks: [
    { label: "CRM Systems", href: "/services/crm-systems" },
    { label: "ERP Systems", href: "/services/erp-systems" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const qaTestingContent: ServiceContent = {
  title: "QA and Software Testing",
  eyebrow: "Services / QA",
  summary: "Release-focused QA programs that reduce risk, improve confidence, and make delivery smoother.",
  description:
    "We provide structured QA and software testing support for teams that need stronger release confidence, clearer bug visibility, and more reliable validation across high-risk workflows.",
  imageSrc: "/images/qa-software-testing.jfif",
  imageAlt: "QA and software testing service",
  highlights: ["Release risk reduction", "Structured coverage", "Clearer bug visibility"],
  capabilities: [
    "Manual QA coverage for key user journeys, regressions, and pre-release validation.",
    "Test planning, scenario design, defect reporting, and retest support across environments.",
    "A repeatable QA rhythm that helps teams ship with fewer surprises.",
  ],
  outcomes: [
    "Fewer last-minute release issues across high-value workflows.",
    "Better clarity on what was tested, what failed, and what still needs attention.",
    "A stronger quality baseline for product and engineering teams.",
  ],
  considerations: [
    "Which workflows are highest risk for customers, revenue, or operations.",
    "How often releases happen and what coverage is realistic for the schedule.",
    "Which devices, environments, or user roles need extra attention.",
  ],
  steps: [
    { title: "Risk review", description: "We identify critical workflows, environments, and release risks." },
    { title: "Coverage design", description: "We define test scenarios, reporting structure, and retest expectations." },
    { title: "Execution", description: "We run the QA pass, log issues clearly, and validate fixes." },
    { title: "Release support", description: "We help close the cycle with sign-off context and the next test plan." },
  ],
  relatedLinks: [
    { label: "Cloud and DevOps", href: "/services/cloud-devops" },
    { label: "Custom Web Development", href: "/services/web-development" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};

export const cloudDevopsContent: ServiceContent = {
  title: "Cloud and DevOps",
  eyebrow: "Services / Cloud",
  summary: "Infrastructure, deployment, monitoring, and reliability work that keeps software stable in production.",
  description:
    "We design cloud and DevOps setups that improve deployment consistency, operational visibility, and production stability for growing products and internal systems.",
  imageSrc: "/images/cloud-devops.jfif",
  imageAlt: "Cloud and DevOps service",
  highlights: ["Reliable deployments", "Infrastructure visibility", "Production stability"],
  capabilities: [
    "Environment setup, CI/CD pipelines, hosting architecture, backups, and operational monitoring.",
    "Security-aware infrastructure work for availability, resilience, and clean release handling.",
    "Support for launch planning, production readiness, and ongoing operations maturity.",
  ],
  outcomes: [
    "More reliable deployments with less manual release stress.",
    "Better production visibility when things go wrong or traffic changes.",
    "A stronger operating foundation for scale, uptime, and team confidence.",
  ],
  considerations: [
    "Which hosting model, scaling plan, and cloud services best fit the budget and product.",
    "How environments, backups, and recovery should be handled before launch.",
    "What monitoring, alerting, and support workflow is realistic for the team.",
  ],
  steps: [
    { title: "Infrastructure review", description: "We assess the current stack, environments, and operational risks." },
    { title: "Architecture and pipeline design", description: "We define the deployment path, hosting model, and observability setup." },
    { title: "Implementation", description: "We build the cloud setup, pipelines, monitoring, and operational controls." },
    { title: "Handover and support", description: "We document the setup and support the live operating path." },
  ],
  relatedLinks: [
    { label: "Cybersecurity Services", href: "/services/cybersecurity-services" },
    { label: "QA and Software Testing", href: "/services/qa-software-testing" },
    { label: "Pricing", href: "/pricing" },
  ],
};

export const cybersecurityContent: ServiceContent = {
  title: "Cybersecurity Services",
  eyebrow: "Services / Security",
  summary: "Security reviews, hardening, and risk reduction work for apps, platforms, and cloud environments.",
  description:
    "We help teams strengthen their applications and infrastructure with practical security reviews, remediation guidance, and protection work that matches the real business risk.",
  imageSrc: "/images/cybersecurity-services.jfif",
  imageAlt: "Cybersecurity services",
  highlights: ["Security hardening", "Risk visibility", "Remediation guidance"],
  capabilities: [
    "Security reviews for applications, cloud environments, access controls, and operational setup.",
    "Testing and analysis that surfaces meaningful vulnerabilities and the path to fix them.",
    "Implementation support for hardening, safer workflows, and stronger engineering practice.",
  ],
  outcomes: [
    "A clearer understanding of your real technical risk surface.",
    "A prioritized remediation path that teams can actually execute.",
    "Stronger trust for stakeholders, customers, and internal teams handling sensitive data.",
  ],
  considerations: [
    "Which environments, products, or assets need the first security focus.",
    "How deep the review should go versus what can be phased into later work.",
    "Which remediation items need engineering support rather than just reporting.",
  ],
  steps: [
    { title: "Risk scoping", description: "We identify the systems, surfaces, and concerns that need review first." },
    { title: "Assessment", description: "We review configurations, flows, and technical controls to surface risk." },
    { title: "Remediation planning", description: "We organize findings into a clear action path with priority." },
    { title: "Hardening support", description: "We support fixes, retesting, and longer-term security improvement." },
  ],
  relatedLinks: [
    { label: "Cloud and DevOps", href: "/services/cloud-devops" },
    { label: "QA and Software Testing", href: "/services/qa-software-testing" },
    { label: "Talk to Our Team", href: "/contact" },
  ],
};
