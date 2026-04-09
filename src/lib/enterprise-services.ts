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
    imageSrc: "/images/custom-software-development.jfif",
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
    imageSrc: "/images/custom-web-development.jfif",
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
    imageSrc: "/images/mobile-app-development.jfif",
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
];

export const enterpriseServiceMap = Object.fromEntries(
  enterpriseServices.map((service) => [service.slug, service]),
) as Record<string, EnterpriseService>;

export function getEnterpriseServiceBySlug(slug: string) {
  return enterpriseServiceMap[slug];
}
