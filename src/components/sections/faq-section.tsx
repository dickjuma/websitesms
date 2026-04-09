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
    <section id="faq" className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">FAQ</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Common Questions
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Everything you need to know about our services and processes.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-700 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center border border-slate-200">
              <p className="text-slate-500">No matching questions found. Try a different search term.</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const originalIndex = faqItems.findIndex((i) => i.question === item.question && i.answer === item.answer);
              return (
                <div
                  key={originalIndex}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold text-slate-950 mb-3">{item.question}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{item.answer}</p>
                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <span>Was this helpful?</span>
                      <button
                        onClick={() => handleHelpful(originalIndex, "yes")}
                        className={`ml-2 rounded p-1 transition ${
                          helpfulVotes[originalIndex] === "yes"
                            ? "text-green-600 bg-green-50"
                            : "hover:text-green-600 hover:bg-green-50"
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleHelpful(originalIndex, "no")}
                        className={`rounded p-1 transition ${
                          helpfulVotes[originalIndex] === "no"
                            ? "text-red-600 bg-red-50"
                            : "hover:text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleCopy(item.answer, originalIndex)}
                      className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 transition"
                    >
                      {copiedIndex === originalIndex ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy answer</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Additional help */}
        <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 px-8 py-6 text-center">
          <p className="text-slate-700 font-semibold mb-2">Still have questions?</p>
          <p className="text-sm text-slate-600">
            <a href="/contact" className="text-blue-700 hover:text-blue-800 underline font-semibold">
              Get in touch with our team
            </a>{" "}
            for more details about our services and processes.
          </p>
        </div>
      </div>
    </section>
  );
}
