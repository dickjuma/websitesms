import type { LinkItem } from "@/lib/site-data";

export type SolutionShowcase = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  heroDescription: string;
  stats: Array<{ label: string; value: string }>;
  positioning: string[];
  deliveryTracks: Array<{ title: string; description: string }>;
  capabilities: string[];
  outcomes: string[];
  considerations: string[];
  steps: Array<{ title: string; description: string }>;
  aiHumanModel: Array<{ title: string; description: string }>;
  relatedLinks: LinkItem[];
};

export const solutionShowcases: SolutionShowcase[] = [
  {
    slug: "fintech",
    eyebrow: "Solutions / Fintech",
    title: "Fintech products that balance trust, speed, and operational control",
    summary:
      "Secure payments, customer dashboards, and financial product experiences.",
    heroDescription:
      "We design fintech platforms for teams that need clean customer journeys, secure back-office workflows, and practical automation without losing human oversight where trust matters.",
    stats: [
      { label: "Focus", value: "Payments + ledgers" },
      { label: "Model", value: "Human reviewed automation" },
      { label: "Priority", value: "Trust at scale" },
    ],
    positioning: [
      "Customer-facing payment, wallet, and account experiences built to feel dependable from first use.",
      "Internal risk, support, and reconciliation workflows shaped so operations teams stay in control.",
      "AI assistance applied to review, guidance, and routing, with humans retained for sensitive decisions.",
    ],
    deliveryTracks: [
      {
        title: "Customer journeys",
        description:
          "Onboarding, account visibility, payment flows, transaction history, and support experiences designed to reduce friction.",
      },
      {
        title: "Operational control",
        description:
          "Admin dashboards, approvals, reconciliation, reporting, and exception handling that help teams move with confidence.",
      },
      {
        title: "Risk-aware automation",
        description:
          "Alerts, categorization, triage, and workflow assist layers where automation helps but final accountability stays clear.",
      },
    ],
    capabilities: [
      "Wallets, payment flows, transaction dashboards, and admin operations shaped around real product and compliance pressure.",
      "Role-aware experiences for customers, operations, finance, and leadership with cleaner access boundaries.",
      "Integration planning for payments, notifications, fraud checks, support systems, and reporting pipelines.",
    ],
    outcomes: [
      "Fintech experiences that feel stable, credible, and ready for real customer trust.",
      "Less fragmentation between growth, operations, support, and finance teams.",
      "A delivery model where automation improves speed without weakening governance.",
    ],
    considerations: [
      "Which decisions should remain human-controlled and which can be automated safely.",
      "How audit history, permissions, and exception handling should work across the product.",
      "What trust signals users need during onboarding, payments, support, and dispute flows.",
    ],
    steps: [
      {
        title: "Risk and workflow mapping",
        description:
          "We define customer journeys, operational checkpoints, and the workflows that need the most clarity.",
      },
      {
        title: "Product and control design",
        description:
          "We shape interfaces, permissions, review paths, and data structure around reliability and speed.",
      },
      {
        title: "Integration and launch build",
        description:
          "We build the product, connect the required services, and test high-risk scenarios before release.",
      },
      {
        title: "Measurement and refinement",
        description:
          "We tune journeys, support workflows, and automation rules using live product learning.",
      },
    ],
    aiHumanModel: [
      {
        title: "AI accelerates triage",
        description:
          "Use AI to classify tickets, summarize account issues, or route payment support faster.",
      },
      {
        title: "Humans own sensitive actions",
        description:
          "Approvals, disputes, compliance exceptions, and high-risk operations stay in accountable human hands.",
      },
      {
        title: "Shared visibility keeps trust",
        description:
          "Teams can see what automation did, what is pending review, and where intervention is needed.",
      },
    ],
    relatedLinks: [
      { label: "Explore AI Solutions", href: "/services/ai-solutions" },
      { label: "View Pricing", href: "/pricing" },
      { label: "Talk to Our Team", href: "/contact" },
    ],
  },
  {
    slug: "healthcare",
    eyebrow: "Solutions / Healthcare",
    title: "Healthcare systems that feel calm for patients and clear for teams",
    summary:
      "Reliable healthcare products and internal systems designed with privacy in mind.",
    heroDescription:
      "Healthcare work needs trust, privacy, and operational clarity. We build digital experiences that make patient journeys simpler while giving teams better visibility into service delivery and follow-up.",
    stats: [
      { label: "Focus", value: "Patient + staff flow" },
      { label: "Model", value: "Assistive AI only" },
      { label: "Priority", value: "Privacy + clarity" },
    ],
    positioning: [
      "Patient-facing journeys built to reduce anxiety and confusion at important moments.",
      "Internal systems for records, scheduling, operations, and communication that support daily staff workflows.",
      "AI used to support summaries, search, and routing rather than to replace sensitive human judgment.",
    ],
    deliveryTracks: [
      {
        title: "Patient experience",
        description:
          "Scheduling, intake, communication, access to records, and service guidance shaped for usability and trust.",
      },
      {
        title: "Clinical operations",
        description:
          "Dashboards and internal workflows that improve visibility across teams, queues, and service handoffs.",
      },
      {
        title: "Supportive intelligence",
        description:
          "Knowledge-guided search, summaries, and handoff-ready context that help staff move faster without losing care quality.",
      },
    ],
    capabilities: [
      "Secure portals, admin systems, communication flows, and reporting views tailored to healthcare teams.",
      "Role-specific access and calmer interface structure for staff, administrators, and patients.",
      "Workflow support for intake, coordination, follow-up, and service quality monitoring.",
    ],
    outcomes: [
      "Digital healthcare experiences that feel more humane and less confusing.",
      "Better team coordination around appointments, communication, and operational follow-through.",
      "AI support positioned as a helper to trained teams, not a substitute for them.",
    ],
    considerations: [
      "Where privacy and consent boundaries must be visible to both staff and patients.",
      "What parts of the workflow benefit from automation versus empathetic human attention.",
      "How service continuity should work when teams need to escalate or collaborate quickly.",
    ],
    steps: [
      {
        title: "Service journey review",
        description:
          "We map patient, admin, and internal workflows to identify the friction that matters most.",
      },
      {
        title: "Access and communication design",
        description:
          "We shape the interface, permissions, and messaging patterns for safer coordination.",
      },
      {
        title: "System build and workflow integration",
        description:
          "We connect records, dashboards, forms, and operational tools into a more usable system.",
      },
      {
        title: "Operational tuning",
        description:
          "We refine triage, communication, and handoff paths around real team behavior after launch.",
      },
    ],
    aiHumanModel: [
      {
        title: "AI prepares context",
        description:
          "Summaries, search, and suggested next steps help staff respond faster with better context.",
      },
      {
        title: "Humans deliver care",
        description:
          "Advice, approvals, escalation, and patient reassurance stay led by qualified people.",
      },
      {
        title: "Simple handoff paths",
        description:
          "Patients and staff should always know how to reach a real person without friction.",
      },
    ],
    relatedLinks: [
      { label: "Support", href: "/support" },
      { label: "About Us", href: "/about" },
      { label: "Talk to Our Team", href: "/contact" },
    ],
  },
  {
    slug: "logistics",
    eyebrow: "Solutions / Logistics",
    title: "Logistics platforms built for field reality, not just dashboard screenshots",
    summary:
      "Tracking, dispatch, and operations systems for moving teams and goods.",
    heroDescription:
      "We create logistics systems that give operations teams clearer movement visibility, better exception handling, and simpler coordination between office users, field teams, and leadership.",
    stats: [
      { label: "Focus", value: "Dispatch + visibility" },
      { label: "Model", value: "Ops-first workflows" },
      { label: "Priority", value: "Fast exception handling" },
    ],
    positioning: [
      "Systems shaped around movement, handoffs, and operational exceptions rather than static reporting alone.",
      "User journeys built for dispatch teams, branch managers, drivers, and executives with the right detail for each role.",
      "AI support used for summarization and routing while humans stay in charge of service decisions.",
    ],
    deliveryTracks: [
      {
        title: "Movement visibility",
        description:
          "Route, dispatch, shipment, and status tracking designed for real operational awareness.",
      },
      {
        title: "Command workflows",
        description:
          "Issue handling, updates, approvals, and response actions shaped for faster coordination.",
      },
      {
        title: "Performance insight",
        description:
          "Operational dashboards and reporting that help teams see bottlenecks and service quality trends.",
      },
    ],
    capabilities: [
      "Dispatch and tracking systems that connect field execution with office planning.",
      "Workflow design for exceptions, delays, internal notifications, and operational accountability.",
      "Leadership reporting that is grounded in live operational behavior rather than disconnected summaries.",
    ],
    outcomes: [
      "Fewer blind spots across routes, handoffs, and service interruptions.",
      "Clearer coordination between field teams and central operations.",
      "A platform that helps teams act on issues faster instead of simply recording them.",
    ],
    considerations: [
      "Which status changes and handoffs need to be most visible in real time.",
      "How to reduce friction for field teams while still protecting data accuracy.",
      "Where automation helps routing and alerts without making operations feel less controllable.",
    ],
    steps: [
      {
        title: "Operational mapping",
        description:
          "We document movement flows, exception cases, and the users who need different levels of control.",
      },
      {
        title: "Role-based experience design",
        description:
          "We design the platform for dispatch, field, admin, and leadership views without overloading any one user.",
      },
      {
        title: "Workflow buildout",
        description:
          "We implement the dashboards, alerts, tracking states, and integrations that keep the system usable.",
      },
      {
        title: "Live operations refinement",
        description:
          "We improve the experience based on actual bottlenecks, handoffs, and service response needs.",
      },
    ],
    aiHumanModel: [
      {
        title: "AI highlights exceptions",
        description:
          "Automation can surface late deliveries, suspicious patterns, and route anomalies faster.",
      },
      {
        title: "Humans manage commitments",
        description:
          "Dispatch changes, customer commitments, and operational recovery need accountable human decisions.",
      },
      {
        title: "Shared timelines reduce confusion",
        description:
          "Operations teams need a simple record of what happened, what changed, and who is acting next.",
      },
    ],
    relatedLinks: [
      { label: "ERP Systems", href: "/services/erp-systems" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Talk to Our Team", href: "/contact" },
    ],
  },
  {
    slug: "education",
    eyebrow: "Solutions / Education",
    title: "Education platforms that stay approachable for learners and manageable for teams",
    summary:
      "Learning and admin platforms with clear UX for staff and learners.",
    heroDescription:
      "From digital learning journeys to academic operations, we build education systems that keep the experience simple for learners while giving teams stronger administrative visibility and communication flow.",
    stats: [
      { label: "Focus", value: "Learners + admin" },
      { label: "Model", value: "Clarity-first UX" },
      { label: "Priority", value: "Adoption across roles" },
    ],
    positioning: [
      "Learning and administration systems designed for students, staff, and leadership without overwhelming any one group.",
      "A product structure that supports academic delivery, records, onboarding, and communication as one experience.",
      "AI guidance used as assistive support for search, summaries, and content navigation with clear human fallback.",
    ],
    deliveryTracks: [
      {
        title: "Learner experience",
        description:
          "Course access, announcements, progress visibility, and engagement flows designed for lower friction.",
      },
      {
        title: "Academic operations",
        description:
          "Records, approvals, communication, and administration workflows shaped for institutional teams.",
      },
      {
        title: "Guided support",
        description:
          "Search, FAQ assistance, and recommendation layers that help users self-serve before escalating to a person.",
      },
    ],
    capabilities: [
      "Education product flows for delivery teams, administrators, and learners with clear role separation.",
      "Systems that connect communication, learning flow, and institution-side operations more cleanly.",
      "Usability choices that improve adoption across mixed levels of digital comfort.",
    ],
    outcomes: [
      "An education experience that feels more welcoming and easier to navigate.",
      "Fewer breakdowns between academic delivery and administrative follow-through.",
      "A better balance between self-service support and human guidance.",
    ],
    considerations: [
      "How different user groups should move through the platform without unnecessary complexity.",
      "Which interactions require staff guidance and which can be simplified with better product design.",
      "How support, onboarding, and communication should work at scale across academic cycles.",
    ],
    steps: [
      {
        title: "Audience and workflow review",
        description:
          "We map learner, staff, and admin needs to understand what the system must simplify first.",
      },
      {
        title: "Experience and content structure",
        description:
          "We design the information flow, navigation, and interface logic around adoption.",
      },
      {
        title: "Platform and operations build",
        description:
          "We implement learning, communication, and administrative workflows into a connected experience.",
      },
      {
        title: "Rollout and support tuning",
        description:
          "We refine based on usage behavior, support questions, and institutional feedback.",
      },
    ],
    aiHumanModel: [
      {
        title: "AI reduces repetitive questions",
        description:
          "Common support, content discovery, and information retrieval can become faster and less manual.",
      },
      {
        title: "Humans stay central to guidance",
        description:
          "Advising, pastoral support, and sensitive academic decisions should remain person-led.",
      },
      {
        title: "Simple escalation protects confidence",
        description:
          "Learners should never feel trapped in automation when they need help from staff.",
      },
    ],
    relatedLinks: [
      { label: "Mobile App Development", href: "/services/mobile-app-development" },
      { label: "HR System", href: "/products/hr-system" },
      { label: "Talk to Our Team", href: "/contact" },
    ],
  },
  {
    slug: "ecommerce",
    eyebrow: "Solutions / E-commerce",
    title: "Commerce systems that connect conversion, fulfillment, support, and insight",
    summary:
      "Commerce storefronts, admin tools, and operational systems built to convert.",
    heroDescription:
      "We help commerce teams connect the front-end buying experience with the operational systems that keep orders, fulfillment, support, and customer relationships moving smoothly.",
    stats: [
      { label: "Focus", value: "Storefront + ops" },
      { label: "Model", value: "Conversion to support" },
      { label: "Priority", value: "Post-purchase clarity" },
    ],
    positioning: [
      "Commerce design that improves discovery, checkout, and trust while respecting operational realities behind the scenes.",
      "Admin and support workflows that reduce fragmentation across orders, customers, inventory, and communication.",
      "AI support used for recommendations, support summaries, and triage, with human teams leading exceptions and service recovery.",
    ],
    deliveryTracks: [
      {
        title: "Storefront experience",
        description:
          "Product discovery, trust signals, checkout, and self-service flows designed to support conversion.",
      },
      {
        title: "Operational execution",
        description:
          "Order handling, support, inventory coordination, and reporting systems that keep the business responsive.",
      },
      {
        title: "Retention and support",
        description:
          "Customer communication, service follow-up, and insight layers that improve lifetime value and loyalty.",
      },
    ],
    capabilities: [
      "Storefronts, admin surfaces, and operational systems built as one connected commerce ecosystem.",
      "Customer, order, and inventory flows designed to stay usable as the business grows.",
      "Support tooling that helps teams respond faster while preserving a human service feel.",
    ],
    outcomes: [
      "A stronger buying journey from browsing through support and repeat purchase.",
      "Better operational visibility for the teams handling orders, inventory, and customer issues.",
      "A commerce stack that feels intentional rather than stitched together.",
    ],
    considerations: [
      "Where the biggest conversion drop-offs or support frictions happen in the current flow.",
      "How the storefront and admin experience should stay aligned as catalog and operations grow.",
      "Which AI assist layers are useful for support and merchandising without over-automating service.",
    ],
    steps: [
      {
        title: "Commerce flow assessment",
        description:
          "We review the full path from product discovery to post-purchase support to identify the highest-leverage improvements.",
      },
      {
        title: "Experience and ops design",
        description:
          "We shape the storefront, backend workflows, and admin structure so the business can operate more smoothly.",
      },
      {
        title: "Build and integration",
        description:
          "We implement the product, connect the data and service layers, and test the high-impact paths.",
      },
      {
        title: "Optimization cycle",
        description:
          "We refine based on conversion, support behavior, and operational team feedback after release.",
      },
    ],
    aiHumanModel: [
      {
        title: "AI improves support speed",
        description:
          "Summaries, smart routing, and product guidance reduce queue pressure on service teams.",
      },
      {
        title: "Humans protect the brand",
        description:
          "Returns, complaints, edge cases, and relationship moments still need thoughtful people.",
      },
      {
        title: "Unified context keeps it simple",
        description:
          "Teams should see the customer, order, issue, and AI context in one place before replying.",
      },
    ],
    relatedLinks: [
      { label: "Custom Web Development", href: "/services/web-development" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Talk to Our Team", href: "/contact" },
    ],
  },
];

export function getSolutionShowcase(slug: string) {
  return solutionShowcases.find((item) => item.slug === slug);
}
