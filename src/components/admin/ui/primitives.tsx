import type { ComponentType, ReactNode } from "react";

import clsx from "clsx";

type IconComponent = ComponentType<{ className?: string }>;

const toneClasses = {
  blue: {
    surface:
      "border-blue-200/70 bg-gradient-to-br from-blue-50 via-white to-cyan-50",
    icon: "bg-blue-600 text-white shadow-blue-200",
    accent: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  emerald: {
    surface:
      "border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-teal-50",
    icon: "bg-emerald-600 text-white shadow-emerald-200",
    accent: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    surface:
      "border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50",
    icon: "bg-amber-500 text-white shadow-amber-200",
    accent: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
  },
  slate: {
    surface:
      "border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100",
    icon: "bg-slate-900 text-white shadow-slate-200",
    accent: "text-slate-700",
    badge: "bg-slate-200 text-slate-700",
  },
  rose: {
    surface:
      "border-rose-200/70 bg-gradient-to-br from-rose-50 via-white to-pink-50",
    icon: "bg-rose-600 text-white shadow-rose-200",
    accent: "text-rose-700",
    badge: "bg-rose-100 text-rose-700",
  },
} as const;

type Tone = keyof typeof toneClasses;

interface AdminHeroProps {
  badge?: string;
  title: string;
  description: string;
  icon?: IconComponent;
  actions?: ReactNode;
  meta?: Array<{ label: string; value: ReactNode }>;
  tone?: Tone;
}

export function AdminHero({
  badge,
  title,
  description,
  icon: Icon,
  actions,
  meta,
  tone = "blue",
}: AdminHeroProps) {
  const styles = toneClasses[tone];

  return (
    <section
      className={clsx(
        "overflow-hidden rounded-[28px] border p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7",
        styles.surface,
      )}
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            {badge ? (
              <span
                className={clsx(
                  "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                  styles.badge,
                )}
              >
                {badge}
              </span>
            ) : null}
            {Icon ? (
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-slate-700 shadow-sm">
                <Icon className="h-5 w-5" />
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>

          {meta?.length ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-sm backdrop-blur"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {item.label}
                  </p>
                  <p className={clsx("mt-1 text-sm font-semibold", styles.accent)}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {actions ? <div className="flex flex-wrap gap-3 xl:justify-end">{actions}</div> : null}
      </div>
    </section>
  );
}

interface AdminStatCardProps {
  label: string;
  value: ReactNode;
  detail?: string;
  icon: IconComponent;
  tone?: Tone;
}

export function AdminStatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "slate",
}: AdminStatCardProps) {
  const styles = toneClasses[tone];

  return (
    <article
      className={clsx(
        "rounded-3xl border p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-0.5",
        styles.surface,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
          {detail ? <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p> : null}
        </div>
        <span
          className={clsx(
            "inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg",
            styles.icon,
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

interface AdminPanelProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function AdminPanel({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: AdminPanelProps) {
  return (
    <section
      className={clsx(
        "overflow-hidden rounded-[26px] border border-white/70 bg-white/90 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm",
        className,
      )}
    >
      {title || description || action ? (
        <div className="border-b border-slate-200/80 px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              {title ? <h2 className="text-xl font-semibold text-slate-950">{title}</h2> : null}
              {description ? (
                <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
              ) : null}
            </div>
            {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
          </div>
        </div>
      ) : null}

      <div className={clsx("px-6 py-5", contentClassName)}>{children}</div>
    </section>
  );
}
