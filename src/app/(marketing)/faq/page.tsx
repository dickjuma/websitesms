"use client";
export const dynamic = 'force-dynamic';

import { useState, useMemo } from "react";
import { Search, ThumbsUp, ThumbsDown, Copy, Check, X, HelpCircle } from "lucide-react";
import { faqItems } from "@/lib/site-data";
import { SiteShell } from "@/components/layout/site-shell";

const getCategoryFromText = (question: string, answer: string): string => {
  const text = (question + answer).toLowerCase();
  if (text.includes("pricing") || text.includes("cost") || text.includes("budget")) return "Pricing";
  if (text.includes("timeline") || text.includes("delivery") || text.includes("deadline")) return "Delivery";
  if (text.includes("support") || text.includes("maintenance") || text.includes("help")) return "Support";
  if (text.includes("security") || text.includes("compliance") || text.includes("privacy")) return "Security";
  if (text.includes("custom") || text.includes("integration") || text.includes("api")) return "Customization";
  return "General";
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, "yes" | "no" | null>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    faqItems.forEach((item) => {
      const cat = getCategoryFromText(item.question, item.answer);
      cats.add(cat);
    });
    return Array.from(cats);
  }, [faqItems]);

  const filteredItems = useMemo(() => {
    return faqItems.filter((item) => {
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
  };

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <SiteShell>
      <main className="bg-white">
        {/* Hero Section */}
        <section aria-labelledby="faq-hero-title" className="border-b border-slate-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <HelpCircle className="h-4 w-4 text-blue-700" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">FAQ</p>
            </div>
            <h1 id="faq-hero-title" className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
              Common Questions
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
              Everything you need to know about our services, pricing, and processes – tailored for Kenyan businesses.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8">
          {/* Search and filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="faq-search"
                type="text"
                placeholder="Search questions or answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-10 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="FAQ categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ list */}
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
              <HelpCircle className="mb-2 h-10 w-10 text-slate-300" aria-hidden="true" />
              <p className="text-sm font-medium text-slate-600">No matching questions found</p>
              <p className="text-xs text-slate-500">Try a different search term or category</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {filteredItems.map((item, idx) => {
                const originalIndex = faqItems.findIndex(
                  (i) => i.question === item.question && i.answer === item.answer
                );
                const category = getCategoryFromText(item.question, item.answer);
                return (
                  <li key={originalIndex}>
                    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <h2 className="text-base font-semibold text-slate-900">{item.question}</h2>
                        <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                          {category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-500">
                          <span>Was this helpful?</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleHelpful(originalIndex, "yes")}
                              className={`rounded p-1 transition ${
                                helpfulVotes[originalIndex] === "yes"
                                  ? "bg-green-100 text-green-700"
                                  : "hover:bg-green-50 text-slate-500 hover:text-green-600"
                              }`}
                              aria-label="Mark as helpful"
                            >
                              <ThumbsUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleHelpful(originalIndex, "no")}
                              className={`rounded p-1 transition ${
                                helpfulVotes[originalIndex] === "no"
                                  ? "bg-red-100 text-red-700"
                                  : "hover:bg-red-50 text-slate-500 hover:text-red-600"
                              }`}
                              aria-label="Mark as not helpful"
                            >
                              <ThumbsDown className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopy(item.answer, originalIndex)}
                          className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                          aria-label="Copy answer"
                        >
                          {copiedIndex === originalIndex ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy</span>
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

          {/* Bottom CTA */}
          <aside className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <h2 className="text-base font-bold text-slate-800">Still have questions?</h2>
            <p className="mt-1 text-sm text-slate-600">Our team is ready to help you with anything not covered here.</p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Contact Support
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
            </a>
          </aside>
        </div>
      </main>
    </SiteShell>
  );
}
