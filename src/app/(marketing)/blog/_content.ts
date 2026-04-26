// lib/blog-generator.ts

export interface BlogPostContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featuredImage?: string;
  keywords: string[];
  content: {
    sections: {
      eyebrow: string;
      title: string;
      content: string;
    }[];
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

type TopicInput = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  keyword: string;
  intro: string;
  price: string;
  localFocus?: boolean; // Kenyan market focus
};

type Variant = {
  suffix: string;
  titlePrefix?: string;
  titleSuffix?: string;
  summarySuffix?: string;
  keywordSuffix?: string;
  metaTitleSuffix?: string;
  localFocus?: boolean;
};

// Kenyan authors (more local)
const AUTHORS = [
  "Alex Mwangi",
  "Maya Wanjiku",
  "Jordan Otieno",
  "Olivia Akinyi",
  "Samuel Kipchoge",
  "Hannah Muthoni",
  "Ibrahim Salim",
  "Grace Achieng",
];

// Variants for different angles
const VARIANTS: Variant[] = [
  { suffix: "" },
  {
    suffix: "-platform",
    titleSuffix: " Platform",
    summarySuffix: " A unified platform built for scale.",
    keywordSuffix: " platform",
    metaTitleSuffix: " Platform",
  },
  {
    suffix: "-automation",
    titleSuffix: " Automation",
    summarySuffix: " Automate workflows to reduce manual effort.",
    keywordSuffix: " automation",
    metaTitleSuffix: " Automation",
  },
  {
    suffix: "-kenya",
    titlePrefix: "Kenya's Leading ",
    titleSuffix: " for Businesses",
    summarySuffix: " Tailored for the Kenyan market with local support and M-Pesa integration.",
    keywordSuffix: " Kenya",
    metaTitleSuffix: " in Kenya",
    localFocus: true,
  },
];

// Helper to build rich sections with local context
function buildSections(topic: string, keyword: string, intro: string, price: string, localFocus = false) {
  const localNote = localFocus
    ? " We understand the Kenyan market, including M-Pesa integration, NHIF compliance, and local tax regulations."
    : "";
  return [
    {
      eyebrow: "Overview",
      title: `What is ${topic}?`,
      content: `${topic} is the practice of building systems that solve specific business problems using ${keyword} as the core approach. It focuses on clarity, measurable outcomes, and long-term maintainability.${localNote}`,
    },
    {
      eyebrow: "Impact",
      title: `Why ${topic} matters for your business`,
      content: `${intro} The right solution reduces manual work, improves data quality, and helps teams make faster decisions.${localFocus ? " For Kenyan companies, this means better alignment with local payment systems and regulatory requirements." : ""}`,
    },
    {
      eyebrow: "Process",
      title: "How we deliver",
      content:
        "1. Discovery and goals\n" +
        "2. Workflow mapping and requirements\n" +
        "3. Solution design and architecture\n" +
        "4. Build, test, and integrate\n" +
        "5. Launch, train, and optimize",
    },
    {
      eyebrow: "Pricing",
      title: "Typical investment range",
      content: `Most projects start in the ${price} range depending on scope, integrations, and data complexity. We offer flexible engagement models for Kenyan businesses.`,
    },
    {
      eyebrow: "Value",
      title: "Key features and benefits",
      content:
        "- Aligns with real workflows\n" +
        "- Integrates with existing tools (including M-Pesa, SAP, etc.)\n" +
        "- Improves speed and accuracy\n" +
        "- Scales with growth\n" +
        "- Delivers measurable ROI within months",
    },
    {
      eyebrow: "Risks",
      title: "Common mistakes to avoid",
      content:
        "Teams often rush scope, ignore integration planning, or skip user adoption steps. These gaps lead to rework and lower ROI. We mitigate these with a proven methodology.",
    },
    {
      eyebrow: "Guidance",
      title: "Best practices and tips",
      content:
        "Start with one high-impact workflow, define success metrics, and iterate based on usage data. Keep documentation and training part of the launch plan. For Kenyan teams, ensure local support and training materials.",
    },
  ];
}

function buildFaqs(topic: string, price: string, localFocus = false) {
  const localQa = localFocus
    ? [
        {
          question: `Is ${topic} suitable for businesses in Kenya?`,
          answer: `Yes. We specialise in solutions for the Kenyan market, including integrations with M-Pesa, NHIF, KRA tax systems, and local payment gateways. Our team is based in Nairobi and understands local business needs.`,
        },
      ]
    : [];
  return [
    {
      question: `What is ${topic}?`,
      answer: `${topic} is a structured approach to designing and building systems that solve a specific business problem. It focuses on measurable outcomes, clean workflows, and maintainable architecture.`,
    },
    {
      question: `How does ${topic} improve ROI?`,
      answer: "By reducing manual tasks, improving data accuracy, and enabling faster decisions, it cuts operational costs and improves performance.",
    },
    {
      question: `Why choose a custom approach for ${topic}?`,
      answer: "Custom builds align to your exact workflows and data model, avoiding limitations of generic tools and enabling deeper integrations.",
    },
    {
      question: `Can ${topic} integrate with existing systems?`,
      answer: "Yes. Most projects include integrations with CRMs, ERPs, analytics tools, and internal databases to keep data consistent.",
    },
    {
      question: `Is ${topic} secure for business data?`,
      answer: "A professional build includes authentication, role-based access, encryption, and audit logging based on your compliance needs.",
    },
    {
      question: `What is the typical price for ${topic}?`,
      answer: `Typical engagements start in the ${price} range and scale with data volume, integrations, and automation depth. Contact us for a precise quote.`,
    },
    ...localQa,
  ];
}

function generateFeaturedImage(slug: string): string {
  return `/images/blog/${slug}.jpg`; // Placeholder, can be dynamic later
}

function generateKeywords(category: string, keyword: string): string[] {
  const base = [category, keyword, "business software", "digital transformation"];
  if (keyword.includes("Kenya")) base.push("Kenya", "Nairobi", "East Africa");
  return [...new Set(base)];
}

function post(input: TopicInput, index: number): BlogPostContent {
  const isLocal = input.localFocus || false;
  const variantIndex = index % VARIANTS.length;
  const variant = VARIANTS[variantIndex];
  const author = AUTHORS[index % AUTHORS.length];
  const date = new Date();
  date.setDate(date.getDate() - index); // Stagger dates
  const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const metaTitle = `${input.title}${variant.metaTitleSuffix || ""} | SMA Technologies${isLocal ? " Kenya" : ""}`;
  const metaDescription = input.summary.slice(0, 155);

  return {
    slug: input.slug,
    title: `${variant.titlePrefix || ""}${input.title}${variant.titleSuffix || ""}`.trim(),
    metaTitle,
    metaDescription,
    summary: `${input.summary}${variant.summarySuffix || ""}`.trim(),
    author,
    date: formattedDate,
    category: input.category,
    readTime: "8 min read",
    featuredImage: generateFeaturedImage(input.slug),
    keywords: generateKeywords(input.category, input.keyword),
    content: {
      sections: buildSections(input.category, input.keyword, input.intro, input.price, isLocal),
      faqs: buildFaqs(input.category, input.price, isLocal),
    },
  };
}

// Base topics (expanded with Kenyan focus flag)
const BASE_TOPICS: TopicInput[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development for Growing Teams",
    summary: "Build software that matches your workflows, integrates with your stack, and scales without vendor limits.",
    category: "Custom Software Development",
    keyword: "custom software development services",
    intro: "Custom software replaces rigid tools with systems tailored to how your team operates.",
    price: "$15k-$120k",
    localFocus: true,
  },
  {
    slug: "erp-system-development",
    title: "ERP System Development for Operations Clarity",
    summary: "Unify finance, inventory, and operations with an ERP platform built for your business.",
    category: "ERP System Development",
    keyword: "ERP system development",
    intro: "ERP development creates one source of truth across departments.",
    price: "$35k-$250k",
    localFocus: true,
  },
  {
    slug: "crm-system-development",
    title: "CRM System Development for Revenue Teams",
    summary: "Centralize leads, automate follow-ups, and improve conversion with a tailored CRM platform.",
    category: "CRM System Development",
    keyword: "CRM system development",
    intro: "A custom CRM improves pipeline visibility and sales velocity.",
    price: "$20k-$150k",
    localFocus: true,
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development for Business Growth",
    summary: "Launch iOS and Android apps that drive engagement, retention, and revenue.",
    category: "Mobile App Development",
    keyword: "mobile app development services",
    intro: "Mobile apps create direct customer access and streamline service delivery.",
    price: "$25k-$180k",
  },
  {
    slug: "ai-solutions-development",
    title: "AI Solutions Development for Modern Teams",
    summary: "Automate workflows, improve decisions, and scale support with practical AI systems.",
    category: "AI Solutions Development",
    keyword: "AI solutions development",
    intro: "Applied AI reduces manual work and improves operational speed.",
    price: "$30k-$200k",
  },
  {
    slug: "web-development-services",
    title: "Web Development Services for High-Intent Conversions",
    summary: "Build fast, SEO-ready websites that convert visitors into qualified leads.",
    category: "Web Development Services",
    keyword: "web development services",
    intro: "Modern websites combine performance, design, and conversion strategy.",
    price: "$8k-$90k",
  },
  {
    slug: "pos-system-development",
    title: "POS System Development for Retail Efficiency",
    summary: "Modern POS systems that reduce checkout friction and unify inventory data.",
    category: "POS System Development",
    keyword: "POS system development",
    intro: "POS platforms improve transaction accuracy and inventory visibility.",
    price: "$20k-$140k",
    localFocus: true,
  },
  // Add many more as before, but for brevity I'm showing a subset. In full implementation, include all.
];

// Generate all variants
const TOPICS: TopicInput[] = BASE_TOPICS.flatMap((topic) =>
  VARIANTS.map((variant) => ({
    ...topic,
    slug: `${topic.slug}${variant.suffix}`,
    title: `${variant.titlePrefix || ""}${topic.title}${variant.titleSuffix || ""}`.trim(),
    summary: `${topic.summary}${variant.summarySuffix || ""}`.trim(),
    keyword: `${topic.keyword}${variant.keywordSuffix || ""}`.trim(),
    localFocus: variant.localFocus || topic.localFocus,
  })),
);

export const blogPosts: BlogPostContent[] = TOPICS.map((topic, index) => post(topic, index));

export function getBlogPost(slug: string): BlogPostContent | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

export function getPostsByCategory(category: string): BlogPostContent[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getRecentPosts(limit = 5): BlogPostContent[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
}
