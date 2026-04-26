import { cn } from '../../lib/utils';

interface PricingHeroProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function PricingHero({ title, subtitle, className }: PricingHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-slate-900 py-16 sm:py-24',
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_50%)]" />
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}