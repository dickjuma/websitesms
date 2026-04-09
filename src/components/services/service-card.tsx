import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteIcon } from "@/components/ui/site-icon";
import type { EnterpriseService } from "@/lib/enterprise-services";

type ServiceCardProps = {
  service: EnterpriseService;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_20px_60px_rgba(28,25,23,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(28,25,23,0.14)]">
      <Link href={`/services/${service.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden border-b border-stone-200/80 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(247,241,232,0.92)_70%)]">
          <div className="absolute left-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/90 text-stone-900 shadow-sm backdrop-blur">
            <SiteIcon icon={service.icon} className="h-5 w-5" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/12 via-transparent to-transparent" />
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={service.imageSrc}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-stone-950">{service.title}</h3>
          <p className="mt-3 text-sm leading-7 text-stone-600">{service.cardDescription}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 transition group-hover:text-[#8c6239]">
              View Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
