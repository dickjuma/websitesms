"use client";

import { useState, useMemo } from "react";
import { Search, ThumbsUp, ThumbsDown, Copy, Check, X, Filter, HelpCircle } from "lucide-react";
import { faqItems } from "@/lib/site-data";

// Extend this if your faqItems already have a category field
const getCategoryFromText = (question: string, answer: string): string => {
  const text = (question + answer).toLowerCase();
  if (text.includes("pricing") || text.includes("cost") || text.includes("budget")) return "Pricing";
  if (text.includes("timeline") || text.includes("delivery") || text.includes("deadline")) return "Delivery";
  if (text.includes("support") || text.includes("maintenance") || text.includes("help")) return "Support";
  if (text.includes("security") || text.includes("compliance") || text.includes("privacy")) return "Security";
  if (text.includes("custom") || text.includes("integration") || text.includes("api")) return "Customization";
  return "General";
};

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, "yes" | "no" | null>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Build categories from faqItems
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    faqItems.forEach((_, idx) => {
      const item = faqItems[idx];
      const cat = getCategoryFromText(item.question, item.answer);
      cats.add(cat);
    });
    return Array.from(cats);
  }, [faqItems]);

  // Filtered items based on search and category
  const filteredItems = useMemo(() => {
    return faqItems.filter((item, idx) => {
      const matchesSearch =
        searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesCategory = activeCategory === "All";
      if (!matchesCategory) {
        const itemCategory = getCategoryFromText(item.question, item.answer);
        matchesCategory = itemCategory === activeCategory;
      }
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, faqItems]);

  const handleHelpful = (idx: number, type: "yes" | "no") => {
    setHelpfulVotes((prev) => ({ ...prev, [idx]: type }));
    // Optional: send feedback to analytics or API
  };

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <section id="faq" className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50/50 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">FAQ</p>
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Common Questions
          </h2>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about our services, pricing, and processes.
          </p>
        </div>

        {/* Search and filter row */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-blue-700 text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-blue-50 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ items grid/list */}
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center border border-slate-200 shadow-sm">
              <Filter className="mx-auto h-12 w-12 text-slate-400" />
              <p className="mt-4 text-slate-500">No matching questions found.</p>
              <p className="text-sm text-slate-400">Try a different search term or category.</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const originalIndex = faqItems.findIndex(
                (i) => i.question === item.question && i.answer === item.answer
              );
              const category = getCategoryFromText(item.question, item.answer);
              return (
                <div
                  key={originalIndex}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
                >
                  {/* Question row with category badge */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-slate-950">{item.question}</h3>
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {category}
                    </span>
                  </div>
                  {/* Answer */}
                  <p className="text-slate-600 leading-relaxed mb-4">{item.answer}</p>
                  {/* Footer actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>Was this helpful?</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleHelpful(originalIndex, "yes")}
                          className={`rounded-md p-1.5 transition ${
                            helpfulVotes[originalIndex] === "yes"
                              ? "bg-green-100 text-green-700"
                              : "hover:bg-green-50 text-slate-500 hover:text-green-600"
                          }`}
                          aria-label="Yes, helpful"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleHelpful(originalIndex, "no")}
                          className={`rounded-md p-1.5 transition ${
                            helpfulVotes[originalIndex] === "no"
                              ? "bg-red-100 text-red-700"
                              : "hover:bg-red-50 text-slate-500 hover:text-red-600"
                          }`}
                          aria-label="No, not helpful"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(item.answer, originalIndex)}
                      className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition"
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

        {/* Still have questions? */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 px-8 py-8 text-center shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Still have questions?</h3>
          <p className="text-slate-600 mb-4">
            Our team is ready to help you with anything not covered here.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-white font-medium hover:bg-blue-800 transition shadow-md"
          >
            Contact Support
            <HelpCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
export default FAQSection;