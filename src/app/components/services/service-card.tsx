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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-stone-500 focus-within:ring-offset-2">
      <Link href={`/services/${service.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden border-b border-stone-200 bg-stone-50">
          {/* Icon overlay - flat, no backdrop blur */}
          <div className="absolute left-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white text-stone-900 shadow-sm md:left-5 md:top-5 md:h-11 md:w-11">
            <SiteIcon icon={service.icon} className="h-4.5 w-4.5 md:h-5 md:w-5" aria-hidden="true" />
          </div>
          {/* Image container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={service.imageSrc}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 md:p-6">
          <h3 className="text-xl font-semibold tracking-tight text-stone-950 md:text-2xl">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 md:mt-3">
            {service.cardDescription}
          </p>

          {/* Tags - semantic list */}
          <ul className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
            {service.tags.map((tag) => (
              <li key={tag}>
                <span className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone-600 md:px-3 md:text-[11px]">
                  {tag}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4 md:pt-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 transition group-hover:text-amber-700">
              View Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
