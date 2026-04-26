"use client";

import { useEffect, useState } from "react";
import { trustLogos } from "@/lib/site-data";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
}

interface SiteStats {
  projectsDelivered: string;
  clientSatisfaction: string;
  yearsExperience: string;
}

export function TrustSection() {
  const [stats, setStats] = useState<SiteStats>({
    projectsDelivered: "400+",
    clientSatisfaction: "98%",
    yearsExperience: "12+",
  });
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch("/api/site", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          if (data.data.stats) {
            setStats(data.data.stats);
          }
          if (data.data.partners && data.data.partners.length > 0) {
            setPartners(data.data.partners);
          }
        }
      })
      .catch(console.error);
  }, []);

  const displayPartners = partners.length > 0 ? partners : trustLogos.map((name) => ({ id: name, name, logoUrl: "" }));

  return (
    <section
      aria-labelledby="trust-heading"
      className="border-b border-slate-200 bg-white px-4 py-8 md:px-6 md:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Visually hidden heading for screen readers and SEO */}
        <h2 id="trust-heading" className="sr-only">
          Trusted by industry leaders – our track record
        </h2>

        {/* Section description (visible) */}
        <p className="text-center text-sm font-semibold text-slate-600">
          Trusted by growth‑focused companies
        </p>

        {/* Client logos – semantic list with figure/figcaption */}
        <ul
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-8 md:grid-cols-6 md:gap-6"
          aria-label="Companies that trust us"
        >
          {displayPartners.map((logo, index) => (
            <li key={index}>
              <figure className="flex h-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-blue-300 hover:bg-blue-50 md:px-4 md:py-3">
                {logo.logoUrl ? (
                  <img src={logo.logoUrl} alt={logo.name} className="max-h-8 max-w-full object-contain" />
                ) : (
                  <figcaption className="text-xs font-semibold text-slate-600 md:text-sm">
                    {logo.name}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>

        {/* Key stats – semantic list with clear labels */}
        <ul
          className="mt-6 flex flex-col items-center justify-center gap-3 text-center sm:flex-row md:mt-8 md:gap-4"
          aria-label="Key performance statistics"
        >
          <li className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
            <span className="text-sm text-slate-700">
              <strong>{stats.projectsDelivered}</strong> projects delivered
            </span>
          </li>
          <li
            className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"
            aria-hidden="true"
          />
          <li className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
            <span className="text-sm text-slate-700">
              <strong>{stats.clientSatisfaction}</strong> client satisfaction
            </span>
          </li>
          <li
            className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"
            aria-hidden="true"
          />
          <li className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
            <span className="text-sm text-slate-700">
              <strong>{stats.yearsExperience}</strong> years delivering excellence
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
