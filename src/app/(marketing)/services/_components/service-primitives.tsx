import Link from "next/link";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import type { Service } from "../_data";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  centered = false,
  className = ""
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mb-4">
          <Star className="h-3 w-3" />
          {eyebrow}
        </div>
      )}
      {subtitle && (
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mb-4">
          <Star className="h-3 w-3" />
          {subtitle}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-slate-600 max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}

interface ServiceHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats?: { label: string; value: string }[];
  service?: Service;
  showPricing?: boolean;
  ctaText?: string;
  className?: string;
}

export function ServiceHero({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  stats,
  service,
  showPricing = true,
  ctaText,
  className = ""
}: ServiceHeroProps) {
  return (
    <section className={`py-16 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mb-6">
                <Star className="h-3 w-3" />
                {eyebrow}
              </div>
            )}

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
              {title}
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href={primaryHref || "/book-demo"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                {primaryLabel || ctaText || "Get Started"}
                <ArrowRight className="h-5 w-5" />
              </Link>

              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 hover:bg-slate-50"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>

            {stats && (
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  {service && (
                    <>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-blue-100">{service.shortDescription}</p>
                    </>
                  )}
                  {!service && (
                    <>
                      <h3 className="text-2xl font-bold mb-4">{title}</h3>
                      <p className="text-blue-100">Professional software solutions</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ServiceSectionProps {
  service?: Service;
  showFullFeatures?: boolean;
  showBenefits?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ServiceSection({
  service,
  showFullFeatures = true,
  showBenefits = true,
  className = "",
  children
}: ServiceSectionProps) {
  if (children) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>
    );
  }

  if (!service) return null;

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {showFullFeatures && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Key Features
              </h3>
              <div className="grid gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showBenefits && (
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Business Benefits
              </h3>
              <div className="grid gap-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-xs font-bold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {service.pricing && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <div className="text-sm text-slate-500">Starting Price</div>
                <div className="text-2xl font-bold text-slate-900">
                  {service.pricing.startingPrice}
                </div>
              </div>
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {service.ctaText || "Get Quote"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}