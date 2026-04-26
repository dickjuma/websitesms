import Link from 'next/link';
import { cn } from '../../lib/utils';

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: CTASectionProps) {
  return (
    <section className={cn('bg-slate-900 py-16 sm:py-24', className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-300">{description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}