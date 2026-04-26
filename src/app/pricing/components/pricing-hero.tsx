'use client';

import { cn } from '@/lib/utils';

interface PricingHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  alignment?: 'center' | 'left';
  className?: string;
}

export function PricingHero({
  title,
  subtitle,
  badge,
  alignment = 'center',
  className
}: PricingHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-white py-16 sm:py-24',
        className
      )}
    >
      <div className="relative">
        <div className={cn(
          'mx-auto max-w-3xl px-6',
          alignment === 'center' ? 'text-center' : 'text-left'
        )}>
          {badge && (
            <div className={cn(
              'mb-6',
              alignment === 'center' ? 'flex justify-center' : ''
            )}>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-1.5 text-sm font-medium text-blue-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                </span>
                {badge}
              </div>
            </div>
          )}

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className={cn(
              'mt-6 text-lg text-slate-600 sm:text-xl',
              alignment === 'center' ? 'mx-auto' : ''
            )}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
