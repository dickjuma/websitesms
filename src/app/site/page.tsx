import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { MarketingHomePage } from "@/components/pages/marketing-home";
import { generateOrganization, generateLocalBusiness, generateWebsite, generateBreadcrumbs } from "@/lib/seo/utils";

export const metadata: Metadata = {
  title: "Software Development Kenya | SMAS Systems",
  description: "Custom software development in Kenya. We build web platforms, mobile apps, ERP systems, POS software, and AI solutions. 400+ projects delivered. Get a free quote today.",
  keywords: [
    "software development Kenya",
    "ERP systems Kenya",
    "POS software Kenya",
    "custom software development",
    "web development Nairobi",
    "mobile app development Kenya",
    "business automation Kenya",
    "enterprise software Kenya",
    "AI solutions Kenya",
    "inventory management Kenya",
    "CRM Kenya",
    "IT company Nairobi",
    "software company Kenya",
  ],
  authors: [{ name: "SMAS Systems" }],
  creator: "SMAS Systems",
  publisher: "SMAS Systems",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://smassystems.com",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://smassystems.com",
    siteName: "SMAS Systems",
    title: "Software Development Kenya | SMAS Systems",
    description: "Custom software development in Kenya. We build web platforms, mobile apps, ERP systems, POS software, and AI solutions. 400+ projects delivered.",
    images: [
      {
        url: "https://smassystems.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SMAS Systems - Software Development Company in Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Kenya | SMAS Systems",
    description: "Custom software development in Kenya. Web platforms, mobile apps, ERP systems, POS software, and AI solutions. 400+ projects delivered.",
    images: ["https://smassystems.com/og-image.png"],
  },
  verification: {
    google: "googleefccca4f7ecc93d9",
  },
};

const homeFaqs = [
  {
    question: "How much does software development cost in Kenya?",
    answer: "Software development costs in Kenya vary by project size. Simple websites start at KES 100,000-300,000, while enterprise systems range from KES 500,000-10,000,000+. We provide detailed quotes after discovery.",
  },
  {
    question: "How long does it take to develop software?",
    answer: "Timeline depends on complexity: small projects take 4-8 weeks, medium complexity 8-16 weeks, and enterprise systems take 16-52+ weeks. We provide milestone-based delivery with regular progress updates.",
  },
  {
    question: "Do you offer post-development support?",
    answer: "Yes, we provide SLA-backed support including security updates, bug fixes, performance optimization, and feature additions. Support packages are available monthly or per-project.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "We build integration-ready solutions that connect with REST APIs, payment gateways, CRM systems, and custom business logic. Integration is scoped during the planning phase.",
  },
  {
    question: "What industries do you serve?",
    answer: "We serve fintech, healthcare, logistics, e-commerce, education, and enterprises across Kenya and Africa. Our solutions are tailored to each industry's specific requirements.",
  },
];

export default function SitePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganization(),
      generateLocalBusiness(),
      generateWebsite(),
      generateBreadcrumbs([{ name: "Home", url: "https://smassystems.com" }]),
    ],
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingHomePage />
      <FaqSection faqs={homeFaqs} />
    </SiteShell>
  );
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="border-t border-stone-200 bg-stone-50/70 py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-stone-200 bg-white p-6"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium text-stone-900">
                {faq.question}
              </summary>
              <p className="mt-4 text-stone-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
