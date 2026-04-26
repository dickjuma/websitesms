import type { ComponentType, ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, HTMLAttributes, LabelHTMLAttributes } from "react";
import clsx from "clsx";

type IconComponent = ComponentType<{ className?: string }>;

// Unified tone classes (kept simple and flat – all same because brand uses consistent palette)
const toneClasses = {
  blue: {
    surface: "border-slate-200 bg-white",
    icon: "bg-slate-900 text-white",
    accent: "text-slate-900",
    badge: "bg-slate-100 text-slate-700",
  },
  emerald: {
    surface: "border-slate-200 bg-white",
    icon: "bg-slate-900 text-white",
    accent: "text-slate-900",
    badge: "bg-slate-100 text-slate-700",
  },
  amber: {
    surface: "border-slate-200 bg-white",
    icon: "bg-slate-900 text-white",
    accent: "text-slate-900",
    badge: "bg-slate-100 text-slate-700",
  },
  slate: {
    surface: "border-slate-200 bg-white",
    icon: "bg-slate-900 text-white",
    accent: "text-slate-900",
    badge: "bg-slate-100 text-slate-700",
  },
  rose: {
    surface: "border-slate-200 bg-white",
    icon: "bg-slate-900 text-white",
    accent: "text-slate-900",
    badge: "bg-slate-100 text-slate-700",
  },
} as const;

type Tone = keyof typeof toneClasses;

// ============================================================
// AdminHero – semantic hero section for admin pages
// ============================================================
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
      aria-labelledby="admin-hero-title"
      className={clsx(
        "overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7",
        styles.surface,
      )}
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            {badge && (
              <span
                className={clsx(
                  "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
                  styles.badge,
                )}
              >
                {badge}
              </span>
            )}
            {Icon && (
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>
            )}
          </div>
          <h1 id="admin-hero-title" className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {description}
          </p>

          {meta && meta.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {meta.map((item) => (
                <li key={item.label}>
                  <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      {item.label}
                    </p>
                    <p className={clsx("mt-1 text-sm font-semibold", styles.accent)}>
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {actions && <div className="flex flex-wrap gap-3 xl:justify-end">{actions}</div>}
      </div>
    </section>
  );
}

// ============================================================
// AdminStatCard – metric card with icon
// ============================================================
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
        "rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        styles.surface,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
          {detail && <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail}</p>}
        </div>
        <span
          className={clsx(
            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
            styles.icon,
          )}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

// ============================================================
// AdminPanel – generic panel with optional header
// ============================================================
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
        "overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      {(title || description || action) && (
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              {title && <h2 className="text-base font-semibold text-slate-950">{title}</h2>}
              {description && (
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
              )}
            </div>
            {action && <div className="flex flex-wrap gap-2">{action}</div>}
          </div>
        </div>
      )}

      <div className={clsx("px-5 py-4", contentClassName)}>{children}</div>
    </section>
  );
}

// ============================================================
// Form primitives – simple, accessible inputs with Tailwind
// ============================================================

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};
export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-700",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-800",
  };
  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950",
        className
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={clsx("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        "flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950",
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  onValueChange,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { onValueChange?: (value: string) => void }) {
  return (
    <select
      className={clsx(
        "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950",
        className
      )}
      onChange={(e) => {
        onValueChange?.(e.target.value);
        if (props.onChange) props.onChange(e);
      }}
      {...props}
    >
      {props.children}
    </select>
  );
  }

type CardProps = HTMLAttributes<HTMLDivElement>;
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx("rounded-lg border border-slate-200 bg-white shadow-sm", className)}
      {...props}
    />
  );
}
export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={clsx("border-b border-slate-200 px-5 py-4", className)} {...props} />
  );
}
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={clsx("text-base font-semibold text-slate-950", className)} {...props} />;
}
export function CardContent({ className, ...props }: CardProps) {
  return <div className={clsx("px-5 py-4", className)} {...props} />;
}
