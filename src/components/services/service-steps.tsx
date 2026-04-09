"use client";

import { useEffect, useRef, useState } from "react";

import type { EnterpriseServiceStep } from "@/lib/enterprise-services";

type ServiceStepsProps = {
  steps: EnterpriseServiceStep[];
};

export function ServiceSteps({ steps }: ServiceStepsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {steps.map((step, index) => (
        <article
          key={step.title}
          style={{ transitionDelay: `${index * 90}ms` }}
          className={[
            "rounded-[1.8rem] border border-stone-200 bg-white px-5 py-6 shadow-[0_18px_48px_rgba(28,25,23,0.06)] transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
        >
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-stone-950 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.03em] text-stone-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-stone-600">{step.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
