"use client";

import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";
import { AdminHero, AdminPanel } from "@/components/admin/ui/primitives";

const pageLinks = [
  {
    title: "Contact Page",
    description: "Manage the public contact experience and inbound form flow.",
    href: "/contact",
  },
  {
    title: "About Page",
    description: "Company story, leadership, and trust narrative.",
    href: "/about",
  },
  {
    title: "Services Page",
    description: "Core services, CTA placement, and conversion content.",
    href: "/services",
  },
];


export default function AdminPages() {
  return (
    <main className="space-y-6">
      <AdminHero
        badge="Pages"
        title="Manage the public-facing pages"
        description="Jump into your most important marketing pages and review what customers see."
        icon={FileText}
        tone="slate"
      />

      <AdminPanel
        title="Core pages"
        description="These pages drive most of the inbound pipeline."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pageLinks.map((page) => (
            <Link
              key={page.title}
              href={page.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{page.title}</p>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition group-hover:text-slate-900">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{page.description}</p>
            </Link>
          ))}
        </div>
      </AdminPanel>
    </main>
  );
}
