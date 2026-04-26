'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-base font-medium text-slate-900">{question}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 flex-shrink-0 text-slate-500 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-40 pb-5' : 'max-h-0'
        )}
      >
        <p className="text-base text-slate-600">{answer}</p>
      </div>
    </div>
  );
}

interface FAQProps {
  faqs: {
    question: string;
    answer: string;
  }[];
  className?: string;
}

export function FAQSection({ faqs, className }: FAQProps) {
  return (
    <section className={cn('bg-white', className)}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}