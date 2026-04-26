import type { IconKey } from "@/lib/site-data";

export type EnterpriseServiceStep = {
  title: string;
  description: string;
};

export type EnterpriseServiceFeature = {
  icon: IconKey;
  title: string;
  description: string;
};

export type EnterpriseServiceProof = {
  label: string;
  title: string;
  description: string;
};

export type EnterpriseServiceCta = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type EnterpriseService = {
  slug: string;
  title: string;
  eyebrow: string;
  cardDescription: string;
  heroSummary: string;
  imageSrc: string;
  imageAlt: string;
  icon: IconKey;
  tags: string[];
  whatItDoes: string[];
  steps: EnterpriseServiceStep[];
  features: EnterpriseServiceFeature[];
  proof: EnterpriseServiceProof[];
  techStack: string[];
  cta: EnterpriseServiceCta;
};

export const enterpriseServices: EnterpriseService[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    eyebrow: "Enterprise Delivery",
    cardDescription: "Business software designed around the way your teams actually operate, approve, and grow.",
    heroSummary:
      "We build custom platforms that remove operational friction, create better visibility, and give your business room to scale without replacing the system later.",
    imageSrc: "/custom-software-development.jpg",
    imageAlt: "Custom software development workspace and product interface",
    icon: "code2",
    tags: ["Scalable", "Secure", "Workflow-led"],
    whatItDoes: [
      "Turns manual approvals, spreadsheets, and disconnected tools into one controlled operating system.",
      "Gives teams clearer ownership, better data visibility, and fewer delays between departments.",
      "Creates a flexible product foundation that supports future modules, integrations, and reporting needs.",
    ],
    steps: [
      { title: "Discovery", description: "We map teams, users, and bottlenecks so the first release solves a real business problem." },
      { title: "Planning", description: "We define scope, system rules, integrations, and the right delivery milestones." },
      { title: "Design", description: "We shape workflows, interface patterns, and decision points before development deepens." },
      { title: "Development", description: "We build secure, maintainable software in reviewable releases with clear feedback loops." },
      { title: "Deployment", description: "We launch with role controls, data confidence checks, and rollout support." },
      { title: "Scaling", description: "We expand the product with new modules, automation, and reporting as the business grows." },
    ],
    features: [
      {
        icon: "layers3",
        title: "Workflow Mapping",
        description: "Every release starts from how work moves across teams, approvals, and exceptions.",
      },
      {
        icon: "shieldCheck",
        title: "Security by Design",
        description: "Permissions, auditability, and controlled access are built into the product from the start.",
      },
      {
        icon: "workflow",
        title: "Integration Ready",
        description: "The platform is structured to connect with payments, CRM, ERP, and external services cleanly.",
      },
      {
        icon: "barChart3",
        title: "Reporting Visibility",
        description: "Dashboards and operational metrics make performance easier to track and improve.",
      },
    ],
    proof: [
      {
        label: "Operations",
        title: "One system for daily execution",
        description: "Dashboards, approvals, and team workflows move into a single product instead of scattered tools.",
      },
      {
        label: "Leadership",
        title: "Better decision visibility",
        description: "Managers can see status, blockers, and trend signals earlier without waiting for manual updates.",
      },
      {
        label: "Growth",
        title: "Built for later expansion",
        description: "The architecture supports future modules, new roles, and additional integrations without a reset.",
      },
    ],
    techStack: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "REST APIs", "Cloud Hosting", "Role-based Access"],
    cta: {
      title: "Build a platform your team can grow into",
      description: "Let's turn your workflow into a product roadmap with clear scope, delivery steps, and a rollout path.",
      primaryLabel: "Start Your Project",
      primaryHref: "/contact",
      secondaryLabel: "Book a Consultation",
      secondaryHref: "/contact?service=custom-software-development",
    },
  },
  {
    slug: "web-development",
    title: "Custom Web Development",
    eyebrow: "Growth Platforms",
    cardDescription: "Websites, portals, and web apps that turn traffic, content, and operations into a clearer growth engine.",
    heroSummary:
      "We create web platforms that look premium, communicate value fast, and stay practical for content teams, sales teams, and product growth.",
    imageSrc: "/webdevelopment_custom_web_development.jpg",
    imageAlt: "Custom web development interface and business website preview",
    icon: "globe",
    tags: ["Conversion-led", "Fast", "CMS-ready"],
    whatItDoes: [
      "Improves how prospects discover, understand, and act on your offer across desktop and mobile.",
      "Supports business operations with portals, dashboards, self-service flows, and admin tools.",
      "Keeps the experience fast, structured, and ready for SEO, analytics, and content updates.",
    ],
    steps: [
      { title: "Discovery", description: "We define business goals, audience needs, and the journeys that matter most." },
      { title: "Planning", description: "We shape page structure, content architecture, integrations, and measurement needs." },
      { title: "Design", description: "We create a polished interface system with stronger hierarchy, trust signals, and conversion flow." },
      { title: "Development", description: "We build the frontend, backend, CMS, and integrations needed for launch readiness." },
      { title: "Deployment", description: "We test performance, SEO, forms, and analytics before launch." },
      { title: "Scaling", description: "We refine the platform with new sections, experiments, and operational improvements over time." },
    ],
    features: [
      {
        icon: "palette",
        title: "Premium UI Systems",
        description: "Visual language, spacing, and component rules are designed to feel credible and consistent.",
      },
      {
        icon: "checkCircle",
        title: "Conversion Clarity",
        description: "Calls to action, proof, and service framing are organized to move buyers forward faster.",
      },
      {
        icon: "workflow",
        title: "Operational Integrations",
        description: "Forms, CRM flows, CMS publishing, and analytics connect cleanly into the business.",
      },
      {
        icon: "cloud",
        title: "Performance Ready",
        description: "The site is optimized for speed, responsiveness, and future content growth.",
      },
    ],
    proof: [
      {
        label: "Marketing",
        title: "Sharper service communication",
        description: "Visitors can quickly understand what you offer, who it helps, and what the next step should be.",
      },
      {
        label: "Sales",
        title: "Stronger conversion paths",
        description: "CTA placement and clearer structure reduce drop-off between interest and inquiry.",
      },
      {
        label: "Operations",
        title: "Easier post-launch management",
        description: "Content, updates, and reporting are easier to run without depending on engineering for every change.",
      },
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Headless CMS", "Analytics", "SEO Foundations", "Form Integrations", "Cloud Deployments"],
    cta: {
      title: "Turn your website into a stronger business asset",
      description: "We can shape a web platform that supports credibility, conversion, and operational clarity from day one.",
      primaryLabel: "Request Demo",
      primaryHref: "/contact",
      secondaryLabel: "Talk to Us",
      secondaryHref: "/contact?service=web-development",
    },
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    eyebrow: "Mobile Products",
    cardDescription: "Customer and internal apps built for adoption, repeat usage, and reliable release quality.",
    heroSummary:
      "We design and ship mobile products that feel intuitive in real-world use, connect to the right systems, and stay manageable after launch.",
    imageSrc: "/mobile-app-development.jpg",
    imageAlt: "Mobile application product screens and interface preview",
    icon: "smartphone",
    tags: ["Real-time", "Launch-ready", "Cross-platform"],
    whatItDoes: [
      "Brings your service, workflow, or customer experience into people's hands with better speed and accessibility.",
      "Supports notifications, transactions, approvals, and field operations in a format teams can use daily.",
      "Connects mobile usage back into your wider business systems so reporting and support stay aligned.",
    ],
    steps: [
      { title: "Discovery", description: "We identify the usage context, audience, and must-win flows for the product." },
      { title: "Planning", description: "We define release scope, platform approach, integrations, and support expectations." },
      { title: "Design", description: "We craft mobile-first screens, onboarding paths, and interaction patterns built for clarity." },
      { title: "Development", description: "We build the app, connect services, and validate quality across devices and environments." },
      { title: "Deployment", description: "We prepare store-readiness, release operations, analytics, and launch support." },
      { title: "Scaling", description: "We improve retention, add features, and guide future releases with real usage insight." },
    ],
    features: [
      {
        icon: "smartphone",
        title: "Mobile-first UX",
        description: "Interfaces are designed for speed, repeated use, and comfortable decision-making on small screens.",
      },
      {
        icon: "bot",
        title: "Connected Experiences",
        description: "The app can plug into payments, notifications, CRM, support, and business workflows.",
      },
      {
        icon: "checkCircle",
        title: "Release Quality",
        description: "We plan for testing, rollout, and store-readiness so the product launches with confidence.",
      },
      {
        icon: "users",
        title: "Adoption Support",
        description: "The product is shaped around how customers or internal teams actually learn and use it.",
      },
    ],
    proof: [
      {
        label: "Experience",
        title: "Built for daily usage",
        description: "Navigation, actions, and repeated tasks are optimized for the way people actually use mobile products.",
      },
      {
        label: "Delivery",
        title: "Clear launch path",
        description: "Release planning covers environments, analytics, and support instead of stopping at screen delivery.",
      },
      {
        label: "Business",
        title: "Connected to operations",
        description: "The app becomes part of the wider business system rather than a disconnected customer touchpoint.",
      },
    ],
    techStack: ["React Native", "Expo", "Node.js", "APIs", "Push Notifications", "Analytics", "App Store Readiness", "Cloud Backends"],
    cta: {
      title: "Ship a mobile product that feels ready in the real world",
      description: "Let's shape the release path, user flows, and supporting systems needed for a stronger launch.",
      primaryLabel: "Get Started",
      primaryHref: "/contact",
      secondaryLabel: "Book a Consultation",
      secondaryHref: "/contact?service=mobile-app-development",
    },
  },
  {
    slug: "ecommerce-solutions",
    title: "E-commerce Solutions",
    eyebrow: "Growth Platforms",
    cardDescription: "Online stores and ecommerce platforms that convert visitors into buyers.",
    heroSummary:
      "We build ecommerce platforms that look professional, handle payments securely, and give you powerful tools to manage products, orders, and customers.",
    imageSrc: "/ecommerce-solutions.jpg",
    imageAlt: "E-commerce platform interface and online store",
    icon: "shoppingBag",
    tags: ["Conversion-led", "Secure Payments", "Inventory Sync"],
    whatItDoes: [
      "Creates a professional online store that builds trust and encourages purchases.",
      "Integrates with payment gateways, shipping services, and inventory systems.",
      "Provides powerful admin tools to manage products, orders, and customer relationships.",
    ],
    steps: [
      { title: "Discovery", description: "We define product categories, target audience, and competitive positioning." },
      { title: "Planning", description: "We shape the store structure, checkout flows, and payment requirements." },
      { title: "Design", description: "We create polished storefront designs with clear conversion paths." },
      { title: "Development", description: "We build the storefront, admin panel, and integrations needed." },
      { title: "Deployment", description: "We test performance, security, and analytics before launch." },
      { title: "Scaling", description: "We add new features, marketing tools, and operational improvements." },
    ],
    features: [
      {
        icon: "shoppingBag",
        title: " Professional Storefronts",
        description: "Visually appealing designs that communicate quality and encourage purchases.",
      },
      {
        icon: "creditCard",
        title: "Payment Integration",
        description: "Secure connections to payment gateways for seamless transactions.",
      },
      {
        icon: "package2",
        title: "Inventory Sync",
        description: "Real-time stock tracking across all sales channels.",
      },
      {
        icon: "users",
        title: "Customer Management",
        description: "Powerful tools to manage customer accounts, orders, and loyalty programs.",
      },
    ],
    proof: [
      {
        label: "Sales",
        title: "Higher conversion rates",
        description: "Professional design and smooth checkout that turns visitors into buyers.",
      },
      {
        label: "Operations",
        title: "Streamlined order management",
        description: "Centralized tools to manage products, orders, and fulfillment.",
      },
      {
        label: "Growth",
        title: "Scalable platform",
        description: "Architecture that supports more products, traffic, and features over time.",
      },
    ],
    techStack: ["Next.js", "React", "Stripe", "PayPal", "Inventory Management", "SEO", "Analytics", "Cloud Hosting"],
    cta: {
      title: "Build an online store that drives sales",
      description: "Let's create an ecommerce platform that represents your brand and converts visitors into customers.",
      primaryLabel: "Get Started",
      primaryHref: "/contact",
      secondaryLabel: "See Pricing",
      secondaryHref: "/pricing?service=ecommerce-solutions",
    },
  },
  {
    slug: "school-management",
    title: "School Management",
    eyebrow: "Education Solutions",
    cardDescription: "Complete school administration software for academic institutions.",
    heroSummary:
      "We build school management systems that handle student records, fees, attendance, examinations, and academic reporting with ease.",
    imageSrc: "/school_management_system.jpg",
    imageAlt: "School management system interface",
    icon: "graduationCap",
    tags: ["Comprehensive", "User-friendly", "Academic-focused"],
    whatItDoes: [
      "Manages student records, enrollment, and academic profiles in one system.",
      "Handles fee collection, invoicing, and financial reporting for schools.",
      "Tracks attendance, examinations, and grade reporting for teachers and administrators.",
    ],
    steps: [
      { title: "Discovery", description: "We understand your school's academic structure and administrative needs." },
      { title: "Planning", description: "We define modules, user roles, and workflows for students, teachers, and staff." },
      { title: "Design", description: "We create intuitive interfaces for each user group." },
      { title: "Development", description: "We build all modules including admissions, academics, and finance." },
      { title: "Deployment", description: "We train staff and roll out the system school-wide." },
      { title: "Scaling", description: "We add new features as your institution grows." },
    ],
    features: [
      {
        icon: "users",
        title: "Student Management",
        description: "Complete student records from enrollment to graduation.",
      },
      {
        icon: "creditCard",
        title: "Fee Management",
        description: "Invoicing, payment tracking, and financial reporting.",
      },
      {
        icon: "checkCircle",
        title: "Attendance & Exams",
        description: "Track attendance and manage examination records.",
      },
      {
        icon: "barChart3",
        title: "Academic Reporting",
        description: "Generate transcripts, reports, and analytics for stakeholders.",
      },
    ],
    proof: [
      {
        label: "Administration",
        title: "Reduced paperwork",
        description: "All student information in one digital system.",
      },
      {
        label: "Parents",
        title: "Better communication",
        description: "Parents can view grades, attendance, and fees online.",
      },
      {
        label: "Principals",
        title: "Clear insights",
        description: "Analytics on student performance and school operations.",
      },
    ],
    techStack: ["Next.js", "React", "Role-based Access", "SMS Integration", "Email Notifications", "Analytics", "Cloud Hosting"],
    cta: {
      title: "Modernize your school administration",
      description: "Let's build a school management system that saves time and improves academic outcomes.",
      primaryLabel: "Book Demo",
      primaryHref: "/book-demo",
      secondaryLabel: "See Pricing",
      secondaryHref: "/pricing?service=school-management",
    },
  },
  {
    slug: "hotel-management",
    title: "Hotel Management",
    eyebrow: "Hospitality Solutions",
    cardDescription: "Complete hotel and hospitality management for hotels, lodges, and guesthouses.",
    heroSummary:
      "We create hotel management systems that handle reservations, front desk operations, housekeeping, billing, and restaurant management.",
    imageSrc: "/Hotel_management_system.jpg",
    imageAlt: "Hotel management system interface",
    icon: "briefcaseBusiness",
    tags: ["Full-service", "Cloud-based", "Multi-property"],
    whatItDoes: [
      "Manages reservations, check-ins, and check-outs across all rooms.",
      "Handles billing, invoicing, and payment collection.",
      "Coordinates housekeeping, restaurant orders, and guest services.",
    ],
    steps: [
      { title: "Discovery", description: "We map your hotel's operations, room inventory, and service flows." },
      { title: "Planning", description: "We define modules for reservations, front desk, and restaurant." },
      { title: "Design", description: "We create interfaces for reception, housekeeping, and management." },
      { title: "Development", description: "We build all modules including POS, billing, and reporting." },
      { title: "Deployment", description: "We train staff and roll out across all departments." },
      { title: "Scaling", description: "We add multi-property support as you expand." },
    ],
    features: [
      {
        icon: "globe",
        title: "Online Reservations",
        description: "Booking system integrated with your website and OTA channels.",
      },
      {
        icon: "creditCard",
        title: "Billing & Payments",
        description: "Invoicing, POS, and payment processing for all services.",
      },
      {
        icon: "package2",
        title: "Housekeeping",
        description: "Room status tracking and housekeeping assignment management.",
      },
      {
        icon: "barChart3",
        title: "Operational Reports",
        description: "Occupancy, revenue, and performance analytics.",
      },
    ],
    proof: [
      {
        label: "Front Desk",
        title: "Faster check-ins",
        description: "Streamlined process that reduces guest wait times.",
      },
      {
        label: "Revenue",
        title: "Higher occupancy",
        description: "Online booking and OTA integration drives more reservations.",
      },
      {
        label: "Management",
        title: "Clear visibility",
        description: "Real-time reports on all hotel operations.",
      },
    ],
    techStack: ["Next.js", "React", "Channel Manager", "POS Integration", "Payment Gateway", "Analytics", "Cloud Hosting"],
    cta: {
      title: "Streamline your hotel operations",
      description: "Let's build a hotel management system that delight guests and boosts efficiency.",
      primaryLabel: "Book Demo",
      primaryHref: "/book-demo",
      secondaryLabel: "See Pricing",
      secondaryHref: "/pricing?service=hotel-management",
    },
  },
  {
    slug: "healthcare-management",
    title: "Healthcare Management",
    eyebrow: "Medical Solutions",
    cardDescription: "Patient management systems for hospitals, clinics, and healthcare providers.",
    heroSummary:
      "We build healthcare management systems that handle patient records, appointments, billing, pharmacy, and medical administration securely.",
    imageSrc: "/hospital_managemet-system.jpg",
    imageAlt: "Healthcare management system interface",
    icon: "heartPulse",
    tags: ["HIPAA-ready", "Patient-centric", "Integrated"],
    whatItDoes: [
      "Manages patient records, medical history, and treatment plans.",
      "Handles appointments, queuing, and clinical workflows.",
      "Manages billing, insurance claims, and pharmacy inventory.",
    ],
    steps: [
      { title: "Discovery", description: "We understand your clinical workflows and compliance requirements." },
      { title: "Planning", description: "We define modules for patient management, appointments, and billing." },
      { title: "Design", description: "We create intuitive interfaces for clinicians and administrative staff." },
      { title: "Development", description: "We build all modules with security and compliance in mind." },
      { title: "Deployment", description: "We train staff and ensure HIPAA compliance." },
      { title: "Scaling", description: "We add telemedicine and new services as needed." },
    ],
    features: [
      {
        icon: "users",
        title: "Patient Records",
        description: "Complete EMR with medical history and treatment records.",
      },
      {
        icon: "globe",
        title: "Appointment Scheduling",
        description: "Online booking and queue management for patients.",
      },
      {
        icon: "creditCard",
        title: "Billing & Insurance",
        description: "Invoicing, insurance claims, and payment processing.",
      },
      {
        icon: "package2",
        title: "Pharmacy Management",
        description: "Drug inventory, prescriptions, and dispensing tracking.",
      },
    ],
    proof: [
      {
        label: "Clinicians",
        title: "Better patient care",
        description: "Complete medical history accessible in one system.",
      },
      {
        label: "Patients",
        title: "Shorter wait times",
        description: "Online booking and efficient queue management.",
      },
      {
        label: "Administration",
        title: "Reduced errors",
        description: "Digital records eliminate paper-based mistakes.",
      },
    ],
    techStack: ["Next.js", "React", "HIPAA Compliance", "HL7 Integration", "SMS Notifications", "Analytics", "Cloud Hosting"],
    cta: {
      title: "Modernize your healthcare practice",
      description: "Let's build a healthcare management system that improves patient outcomes and operational efficiency.",
      primaryLabel: "Book Demo",
      primaryHref: "/book-demo",
      secondaryLabel: "See Pricing",
      secondaryHref: "/pricing?service=healthcare-management",
    },
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & SEO",
    eyebrow: "Growth Services",
    cardDescription: "Search engine optimization, content marketing, and digital growth strategies.",
    heroSummary:
      "We help your business grow online with SEO, content marketing, social media management, and paid advertising strategies.",
    imageSrc: "/digitalmarketing.jpg",
    imageAlt: "Digital marketing and SEO services",
    icon: "globe",
    tags: ["SEO-focused", "Data-driven", "Results-oriented"],
    whatItDoes: [
      "Improves your search rankings and drives organic traffic to your website.",
      "Creates content that converts visitors into leads and customers.",
      "Manages social media presence and builds brand awareness.",
    ],
    steps: [
      { title: "Discovery", description: "We analyze your current SEO, content, and competitive positioning." },
      { title: "Planning", description: "We define keyword strategy, content plan, and growth roadmap." },
      { title: "Optimization", description: "We optimize your website and create SEO-friendly content." },
      { title: "Execution", description: "We implement content marketing and social media strategies." },
      { title: "Measurement", description: "We track rankings, traffic, and conversion metrics." },
      { title: "Growth", description: "We continuously optimize based on data and results." },
    ],
    features: [
      {
        icon: "globe",
        title: "SEO Optimization",
        description: "Technical and content SEO to improve search rankings.",
      },
      {
        icon: "code2",
        title: "Content Marketing",
        description: "Quality content that attracts and converts your audience.",
      },
      {
        icon: "users",
        title: "Social Media",
        description: "Social media management and community building.",
      },
      {
        icon: "barChart3",
        title: "Analytics",
        description: "Detailed reporting on traffic, rankings, and conversions.",
      },
    ],
    proof: [
      {
        label: "Traffic",
        title: "More organic visitors",
        description: "Improved rankings drive more qualified traffic.",
      },
      {
        label: "Leads",
        title: "More conversions",
        description: "Content that turns visitors into customers.",
      },
      {
        label: "Brand",
        title: "Stronger presence",
        description: "Social media and content build brand authority.",
      },
    ],
    techStack: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Content CMS", "Social Platforms", "Email Marketing"],
    cta: {
      title: "Grow your business online",
      description: "Let's build a digital marketing strategy that drives real results for your business.",
      primaryLabel: "Get Started",
      primaryHref: "/contact",
      secondaryLabel: "See Pricing",
      secondaryHref: "/pricing?service=digital-marketing",
    },
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    eyebrow: "Strategy Services",
    cardDescription: "Technology strategy, infrastructure planning, and digital transformation advisory.",
    heroSummary:
      "We help businesses make better technology decisions with strategic planning, infrastructure audits, and digital transformation guidance.",
    imageSrc: "/it-consulting.jpg",
    imageAlt: "IT consulting and strategy",
    icon: "workflow",
    tags: ["Strategic", "Vendor-neutral", "Future-focused"],
    whatItDoes: [
      "Creates technology roadmaps aligned with your business goals.",
      "Audits existing infrastructure and identifies improvement opportunities.",
      "Guides digital transformation initiatives for sustainable growth.",
    ],
    steps: [
      { title: "Assessment", description: "We review your current technology stack and workflows." },
      { title: "Analysis", description: "We identify gaps, risks, and opportunities." },
      { title: "Strategy", description: "We create a technology roadmap with priorities." },
      { title: "Implementation", description: "We guide vendor selection and implementation planning." },
      { title: "Optimization", description: "We refine operations based on best practices." },
      { title: "Ongoing", description: "We provide continued strategic guidance as you grow." },
    ],
    features: [
      {
        icon: "workflow",
        title: "Technology Roadmap",
        description: "Strategic plan aligned with business objectives.",
      },
      {
        icon: "shieldCheck",
        title: "Infrastructure Audit",
        description: "Comprehensive review of your technology environment.",
      },
      {
        icon: "cloud",
        title: "Cloud Strategy",
        description: "Guidance on cloud migration and optimization.",
      },
      {
        icon: "barChart3",
        title: "ROI Analysis",
        description: "Clear business case for technology investments.",
      },
    ],
    proof: [
      {
        label: "Strategy",
        title: "Clear direction",
        description: "Technology decisions aligned with business goals.",
      },
      {
        label: "Efficiency",
        title: "Cost savings",
        description: "Optimized infrastructure reduces operational costs.",
      },
      {
        label: "Growth",
        title: "Scalable technology",
        description: "Infrastructure that supports business expansion.",
      },
    ],
    techStack: ["ITIL", "TOGAF", "AWS", "Azure", "VMware", "Enterprise Architecture", "Security Frameworks"],
    cta: {
      title: "Plan your technology future",
      description: "Let's create a technology strategy that supports your business growth.",
      primaryLabel: "Book Consultation",
      primaryHref: "/contact",
      secondaryLabel: "See Pricing",
      secondaryHref: "/pricing?service=it-consulting",
    },
  },
];

export const enterpriseServiceMap = Object.fromEntries(
  enterpriseServices.map((service) => [service.slug, service]),
) as Record<string, EnterpriseService>;

export function getEnterpriseServiceBySlug(slug: string) {
  return enterpriseServiceMap[slug];
}
