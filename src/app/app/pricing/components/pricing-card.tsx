import Link from 'next/link';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  priceSuffix?: string;
  features: string[];
  popular?: boolean;
  cta: string;
  href: string;
  className?: string;
}

export function PricingCard({
  name,
  description,
  price,
  priceSuffix,
  features,
  popular = false,
  cta,
  href,
  className,
}: PricingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:shadow-lg',
        popular
          ? 'border-blue-600 bg-white shadow-xl shadow-blue-600/10'
          : 'border-slate-200 bg-white shadow-sm hover:border-slate-300',
        className
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white shadow-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-slate-900">
            {formatPrice(price)}
          </span>
          {priceSuffix && (
            <span className="ml-2 text-sm text-slate-500">{priceSuffix}</span>
          )}
        </div>
      </div>

      <ul className="mb-8 flex-1 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
            <span className="text-sm text-slate-600">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={cn(
          'inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200',
          popular
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        )}
      >
        {cta}
      </Link>
    </div>
  );
}
