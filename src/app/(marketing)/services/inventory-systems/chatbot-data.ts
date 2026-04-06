/**
 * SMA Systems Supplemental Data
 * Contains detailed information for tool-calling capabilities.
 */

export const CASE_STUDIES = [
  {
    title: "Multi-Location Inventory Synchronization",
    client: "Global Retail Logistics",
    challenge: "Managing real-time stock across 50+ international warehouses.",
    solution: "Custom ERP module with Redis-backed real-time sync and automated demand forecasting.",
    outcome: "Reduced stock discrepancies by 92% and decreased manual audits by 60%.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"]
  },
  {
    title: "AI-Driven Quality Assurance Suite",
    client: "Enterprise FinTech Platform",
    challenge: "Manual regression testing taking 3 days per release cycle.",
    solution: "Automated QA framework using Playwright and custom AI analysis for visual regression.",
    outcome: "Release confidence increased to 99.9% with testing time reduced to 45 minutes.",
    tech: ["Playwright", "Python", "FastAPI", "GitHub Actions"]
  }
];

export const TESTIMONIALS = [
  {
    quote: "SMA Systems transformed our manual warehouse into a digital powerhouse. Their attention to detail in real-time syncing is unmatched.",
    author: "Director of Operations",
    company: "Global Retail Logistics"
  },
  {
    quote: "The automated QA framework they built saved us hundreds of engineering hours every month. Highly recommended for complex fintech stacks.",
    author: "CTO",
    company: "Enterprise FinTech Platform"
  }
];

export const LEADERSHIP = [
  {
    name: "Alex Rivera",
    role: "Founder & Chief Architect",
    bio: "Specializes in large-scale distributed systems and AI integration. Previously led engineering teams at high-growth fintech startups."
  },
  {
    name: "Sarah Chen",
    role: "Head of Product Design",
    bio: "Expert in operational UX and enterprise interface design. Focuses on turning complex workflows into intuitive digital experiences."
  }
];

export const LOCATIONS_AND_REMOTE_POLICY = {
  officeLocations: [
    { city: "London", country: "UK", address: "123 Tech Lane, London" },
    { city: "New York", country: "USA", address: "45 Wall Street, New York" },
  ],
  remoteWorkPolicy: "SMA Systems operates on a remote-first model, allowing employees to work from anywhere. We have physical office hubs in London and New York for team collaboration, client meetings, and those who prefer an office environment. Flexible work arrangements are a core part of our culture.",
  globalPresence: "We serve clients globally and have team members distributed across various time zones to ensure comprehensive coverage and support.",
};


export const TECH_STACK = {
  frontend: {
    core: ["Next.js (App Router)", "React", "TypeScript"],
    styling: ["Tailwind CSS", "Framer Motion", "Lucide Icons"],
    state: ["Zustand", "TanStack Query"]
  },
  backend: {
    runtimes: ["Node.js", "Python", "Go"],
    frameworks: ["FastAPI", "Express", "Effect"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "EdgeDB"]
  },
  infrastructure: ["AWS", "Vercel", "Docker", "Terraform", "Sentry"],
  ai: ["Groq", "OpenAI", "LangChain", "Vector Databases (Pinecone/Milvus)"]
};