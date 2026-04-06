"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * FAQ Accordion Component
 * Handled on the client to manage open/close state.
 */
export const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-5">
      <button
        className="flex w-full items-center justify-between text-left font-medium text-slate-900 hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "mt-3 max-h-40" : "max-h-0"
        }`}
      >
        <p className="text-slate-600">{answer}</p>
      </div>
    </div>
  );
};