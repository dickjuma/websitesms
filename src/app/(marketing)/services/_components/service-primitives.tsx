import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, Star, type LucideIcon } from "lucide-react";

type Stat = {
  label: string;
  value: string;
};

type LinkItem = {
  label: string;
  href: string;
};

type StepItem = {
  title: string;
  description: string;
};

export function ServiceSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={clsx("mx-auto max-w-7xl px-6 lg:px-8", className)}>{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={clsx(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}

/**
 * Testimonial Card
 */
export const TestimonialCard = ({
  name,
  role,
  content,
  rating,
}: {
  name: string;
  role: string;
  content: string;
  rating: number;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
            }`}
          />
        ))}
      </div>
      <p className="text-slate-700 mb-6 italic">"{content}"</p>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Tech Stack Item
 */
export const TechItem = ({ name, icon: Icon }: { name: string; icon: LucideIcon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <span className="text-sm font-medium text-slate-700">{name}</span>
    </div>
  );
};

export function ServiceHero({
  eyebrow,
  title,
  description,
  primaryLabel = "Start Your Project",
  primaryHref = "/contact",
  secondaryLabel = "Back to Services",
  secondaryHref = "/services",
  stats = [],
  accentClassName,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats?: Stat[];
  accentClassName?: string;
}) {
  return (
    <section
      className={clsx(
        "relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]",
        accentClassName,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_55%)]"
      />
      <div aria-hidden="true" className="absolute right-0 top-16 h-64 w-64 rounded-full bg-cyan-100/50 blur-3xl" />
      <ServiceSection className="relative py-18 lg:py-24">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            {eyebrow}
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{description}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-blue-700"
            >
              {primaryLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-900 transition hover:border-blue-300 hover:text-blue-700"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>

        {stats.length > 0 ? (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.6rem] border border-slate-200 bg-white/85 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{stat.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </ServiceSection>
    </section>
  );
}

export function BulletPanel({
  title,
  description,
  items,
  variant = "slate",
}: {
  title: string;
  description?: string;
  items: string[];
  variant?: "slate" | "blue";
}) {
  const isBlue = variant === "blue";

  return (
    <div
      className={clsx(
        "rounded-[2rem] border p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]",
        isBlue
          ? "border-blue-100 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]"
          : "border-slate-200 bg-white",
      )}
    >
      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h3>
      {description ? <p className="mt-4 text-base leading-8 text-slate-600">{description}</p> : null}
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item}
            className={clsx(
              "flex gap-3 rounded-2xl border px-5 py-4 text-sm leading-7",
              isBlue ? "border-cyan-100 bg-white text-slate-700" : "border-slate-200 bg-slate-50 text-slate-700",
            )}
          >
            <CheckCircle2 className={clsx("mt-1 h-5 w-5 shrink-0", isBlue ? "text-cyan-600" : "text-blue-700")} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HighlightRibbon({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function RelatedLinks({ title = "Keep Exploring", links }: { title?: string; links: LinkItem[] }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Next Pages</p>
      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h3>
      <div className="mt-6 space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
          >
            <span>{link.label}</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function StepsTimeline({ steps, compact = false }: { steps: StepItem[]; compact?: boolean }) {
  return (
    <div className={clsx("grid gap-4", compact ? "md:grid-cols-2" : "")}>
      {steps.map((step, index) => (
        <div
          key={step.title}
          className="rounded-[1.7rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]"
        >
          <div className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
              {index + 1}
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ImageFrame({
  src,
  alt,
  aspectClassName = "aspect-[4/3]",
  className,
}: {
  src: string;
  alt: string;
  aspectClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]",
        className,
      )}
    >
      <div className={clsx("relative w-full bg-slate-100", aspectClassName)}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 720px" />
      </div>
    </div>
  );
}

export function ActionCard({
  title,
  description,
  href = "/contact",
  label = "Start Your Project",
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] px-8 py-8 text-white shadow-[0_28px_85px_rgba(30,64,175,0.22)]">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">Project Fit</p>
      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{title}</h3>
      <p className="mt-4 text-base leading-8 text-blue-100">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
      >
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function BookDemoCTA({
  title = "Ready to Get Started?",
  description = "Schedule a personalized demo and let our team show you how we can help.",
  primaryLabel = "Book a Demo",
  primaryHref = "/contact",
  secondaryLabel = "Learn More",
  secondaryHref = "/services",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-3xl p-12 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        }}
      ></div>
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-slate-100 px-8 py-4 rounded-full font-bold shadow-lg transition-all text-base"
          >
            {primaryLabel}
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all text-base"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
