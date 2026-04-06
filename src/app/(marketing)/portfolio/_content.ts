export type PortfolioProject = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  outcome: string;
  sector: string;
  services: string[];
  challenge: string;
  solution: string;
  impact: string[];
  deliveryModel: string[];
  aiHumanFlow: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "operations-command-center",
    label: "Logistics + ERP",
    title: "Operations command center for dispatch, inventory, and branch coordination",
    summary:
      "A multi-team operations platform designed to connect dispatch activity, inventory status, and branch-level reporting in one daily workspace.",
    outcome: "Faster issue response with clearer cross-team visibility.",
    sector: "Logistics",
    services: ["ERP Systems", "Inventory Systems", "Custom Web Development"],
    challenge:
      "The client’s teams were working across spreadsheets, calls, and disconnected tools, making it hard to see exceptions or act quickly.",
    solution:
      "We designed a command-layer interface that brought shipment tracking, warehouse state, branch updates, and escalation workflows into one guided system.",
    impact: [
      "Reduced the time needed to identify and respond to operational exceptions.",
      "Made inventory and dispatch information easier to compare in one place.",
      "Created a more usable daily operating view for both leadership and branch teams.",
    ],
    deliveryModel: [
      "Mapped the live operational workflow before shaping the platform structure.",
      "Built separate views for branch users, central operations, and leadership reporting.",
      "Connected human response actions directly to the exception and tracking layers.",
    ],
    aiHumanFlow: [
      "AI can summarize issue clusters and highlight unusual delays.",
      "Human operators still own escalation, rerouting, and service recovery decisions.",
      "The interface keeps both the automation context and the human action record visible.",
    ],
  },
  {
    slug: "customer-support-copilot",
    label: "Support + AI",
    title: "Customer support copilot with live human handoff built into the workflow",
    summary:
      "A support environment where AI handles first-pass context and routing while real agents take over seamlessly when conversations need judgment.",
    outcome: "Quicker responses without making customers feel trapped in automation.",
    sector: "Service Operations",
    services: ["AI Solutions", "CRM Systems", "API Development and Integrations"],
    challenge:
      "The client wanted better support speed but could not afford a robotic experience or messy handoffs between automation and people.",
    solution:
      "We designed a conversation flow where AI could answer grounded questions, prepare summaries, and escalate to a human with the full interaction context intact.",
    impact: [
      "Reduced repetitive support effort for the internal team.",
      "Made human takeover much smoother during high-friction or high-value conversations.",
      "Improved visibility into when AI was helpful and when people needed to step in.",
    ],
    deliveryModel: [
      "Defined clear boundaries for AI replies, human takeover, and escalation language.",
      "Connected support knowledge, lead capture, and agent workflow in one system.",
      "Designed the UI so users always understood when a real person was available.",
    ],
    aiHumanFlow: [
      "AI handles FAQs, classification, and conversation summarization.",
      "Humans take over specialist support, sensitive issues, and relationship-based decisions.",
      "The transition is visible, fast, and keeps context instead of restarting the conversation.",
    ],
  },
  {
    slug: "commerce-experience-stack",
    label: "Commerce",
    title: "Commerce experience stack linking storefront, support, and back-office execution",
    summary:
      "A commerce platform built to make the customer journey cleaner while giving operations and service teams stronger tools behind the scenes.",
    outcome: "Better buying flow with less friction between sales, support, and fulfillment.",
    sector: "E-commerce",
    services: ["Custom Web Development", "POS Systems", "CRM Systems"],
    challenge:
      "The storefront, order workflow, and support process were operating like separate products, creating friction after checkout.",
    solution:
      "We restructured the platform around the full commerce lifecycle, from discovery and checkout to support, reporting, and branch-side operations.",
    impact: [
      "Improved visibility across customers, orders, and support interactions.",
      "Reduced internal switching between disconnected systems after purchase.",
      "Made it easier for the business to grow without adding more operational confusion.",
    ],
    deliveryModel: [
      "Shaped the design language around conversion and operational clarity together.",
      "Connected customer, order, and service workflows into one platform story.",
      "Kept the admin side simple enough for daily use by non-technical teams.",
    ],
    aiHumanFlow: [
      "AI can support product guidance and summarize service requests.",
      "Humans remain central to complaints, edge cases, and post-purchase relationship moments.",
      "The service layer is designed to help people respond better, not disappear.",
    ],
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
