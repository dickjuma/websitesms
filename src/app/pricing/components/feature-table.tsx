'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface FeatureTableProps {
  features: {
    name: string;
    tiers: (boolean | string)[];
  }[];
  planNames: string[];
  className?: string;
}

export function FeatureTable({
  features,
  planNames,
  className,
}: FeatureTableProps) {
  const [mobileColumn, setMobileColumn] = useState(0);

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="px-4 py-4 text-left text-sm font-medium text-slate-500 lg:px-6">
              Features
            </th>
            {planNames.map((name, index) => (
              <th
                key={name}
                className={cn(
                  'hidden px-4 py-4 text-center text-sm font-medium text-slate-900 lg:table-cell lg:px-6',
                  index === mobileColumn && 'bg-slate-50'
                )}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {features.map((feature) => (
            <tr key={feature.name} className="hover:bg-slate-50">
              <td className="px-4 py-4 text-sm text-slate-600 lg:px-6">
                {feature.name}
              </td>
              {feature.tiers.map((value, tierIndex) => (
                <td
                  key={tierIndex}
                  className={cn(
                    'hidden px-4 py-4 text-center lg:table-cell lg:px-6',
                    tierIndex === mobileColumn && 'bg-slate-50/50'
                  )}
                >
                  {typeof value === 'boolean' ? (
                    value ? (
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-slate-300" />
                    )
                  ) : (
                    <span className="text-sm font-medium text-slate-900">
                      {value}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 overflow-x-auto p-4 lg:hidden">
        {planNames.map((name, index) => (
          <button
            key={name}
            onClick={() => setMobileColumn(index)}
            className={cn(
              'flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              index === mobileColumn
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="space-y-4 lg:hidden">
        <p className="text-sm text-slate-500">
          Showing {planNames[mobileColumn]} plan features
        </p>
        <ul className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
          {features.map((feature, index) => {
            const value = feature.tiers[mobileColumn];
            return (
              <li key={index} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{feature.name}</span>
                {typeof value === 'boolean' ? (
                  value ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-slate-300" />
                  )
                ) : (
                  <span className="text-sm font-medium text-slate-900">
                    {value}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
