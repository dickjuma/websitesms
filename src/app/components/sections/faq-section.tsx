"use client";

import { useState, useMemo } from "react";
import { Search, ThumbsUp, ThumbsDown, Copy, Check } from "lucide-react";
import { faqItems } from "@/lib/site-data";

/**
 * Configuration for automatic category detection based on keywords.
 * In a production environment, this metadata should ideally come from the CMS/Data layer.
 */
const CATEGORY_MAP: Record<string, string[]> = {
  Pricing: ["pricing", "cost", "budget"],
  Timeline: ["timeline", "delivery", "deadline"],
  Support: ["support", "maintenance"],
  Security: ["security", "compliance"],
};

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, "yes" | "no">>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    return ["All", ...Object.keys(CATEGORY_MAP), "General"];
  }, []);

  const filteredItems = useMemo(() => {
    return faqItems.filter((item) => {
      const text = (item.question + item.answer).toLowerCase();
      const matchesSearch =
        !searchQuery || text.includes(searchQuery.toLowerCase());

      if (activeCategory === "All") return matchesSearch;

      const categoryKeywords = CATEGORY_MAP[activeCategory];
      if (categoryKeywords) {
        const matchesCategory = categoryKeywords.some((kw) => text.includes(kw));
        return matchesSearch && matchesCategory;
      }

      if (activeCategory === "General") {
        const isSpecific = Object.values(CATEGORY_MAP).flat().some((kw) => text.includes(kw));
        return matchesSearch && !isSpecific;
      }

      return matchesSearch;
    });
  }, [searchQuery, activeCategory, faqItems]);

  const handleHelpful = (idx: number, type: "yes" | "no") => {
    setHelpfulVotes((prev) => ({ ...prev, [idx]: type }));
  };

  const handleCopy = async (answer: string, idx: number) => {
    await navigator.clipboard.writeText(answer);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-slate-200 bg-white px-4 py-12 md:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-10 text-center md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl lg:text-5xl"
          >
            Common Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:mt-6 md:text-lg">
            Everything you need to know about our services and processes –
            tailored for Kenyan businesses.
          </p>
        </div>

        {/* Search input with semantic label */}
        <div className="mb-6 md:mb-8">
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 md:left-4 md:h-5 md:w-5"
              aria-hidden="true"
            />
            <input
              id="faq-search"
              type="text"
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 md:py-3 md:pl-12 md:text-base"
            />
          </div>
        </div>

        {/* Category filters - semantic list of buttons */}
        <div
          className="mb-6 flex flex-wrap gap-2 md:mb-8"
          role="group"
          aria-label="Filter FAQs by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:px-4 md:py-2 md:text-sm ${
                activeCategory === cat
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ items - semantic list */}
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center md:p-8">
            <p className="text-slate-500">
              No matching questions found. Try a different search term.
            </p>
          </div>
        ) : (
          <ul className="space-y-4 md:space-y-6">
            {filteredItems.map((item, idx) => {
              const originalIndex = faqItems.findIndex(
                (i) => i.question === item.question && i.answer === item.answer
              );
              return (
                <li key={originalIndex}>
                  <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-6">
                    <h3 className="mb-2 text-lg font-semibold text-slate-950 md:mb-3 md:text-xl">
                      {item.question}
                    </h3>
                    <p className="mb-3 text-sm leading-relaxed text-slate-600 md:mb-4 md:text-base">
                      {item.answer}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-2 md:gap-4">
                      <div className="flex items-center gap-1 text-xs text-slate-500 md:text-sm">
                        <span>Was this helpful?</span>
                        <button
                          onClick={() => handleHelpful(originalIndex, "yes")}
                          className={`ml-1 rounded p-1 transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            helpfulVotes[originalIndex] === "yes"
                              ? "bg-green-50 text-green-600"
                              : "hover:bg-green-50 hover:text-green-600"
                          }`}
                          aria-label="Mark as helpful"
                        >
                          <ThumbsUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </button>
                        <button
                          onClick={() => handleHelpful(originalIndex, "no")}
                          className={`rounded p-1 transition focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            helpfulVotes[originalIndex] === "no"
                              ? "bg-red-50 text-red-600"
                              : "hover:bg-red-50 hover:text-red-600"
                          }`}
                          aria-label="Mark as not helpful"
                        >
                          <ThumbsDown className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleCopy(item.answer, originalIndex)}
                        className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:text-sm"
                        aria-label="Copy answer to clipboard"
                      >
                        {copiedIndex === originalIndex ? (
                          <>
                            <Check className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            <span>Copy answer</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        {/* Bottom CTA - semantic aside */}
        <aside
          className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5 text-center md:mt-12 md:px-8 md:py-6"
          aria-label="Still have questions"
        >
          <p className="mb-1 font-semibold text-slate-700 md:mb-2">
            Still have questions?
          </p>
          <p className="text-xs text-slate-600 md:text-sm">
            <a
              href="/contact"
              className="font-semibold text-blue-700 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get in touch with our team
            </a>{" "}
            for more details about our services and processes.
          </p>
        </aside>
      </div>
    </section>
  );
}
