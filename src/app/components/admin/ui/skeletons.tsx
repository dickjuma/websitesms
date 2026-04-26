"use client";

import { memo, type ReactNode } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import clsx from "clsx";

// ============================================================
// Base Skeleton – animated placeholder
// ============================================================
interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={clsx("animate-pulse rounded bg-slate-200", className)}
      style={style}
      aria-hidden="true"
    />
  );
}

// ============================================================
// CardSkeleton – for metric cards, stat cards
// ============================================================
export function CardSkeleton() {
  return (
    <div
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      aria-label="Loading content"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="mt-3 h-10 w-16" />
      <Skeleton className="mt-2 h-4 w-32" />
    </div>
  );
}

// ============================================================
// TableRowSkeleton – single row
// ============================================================
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-slate-100">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

// ============================================================
// TableSkeleton – full table with header and rows
// ============================================================
export function TableSkeleton({
  rows = 5,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <caption className="sr-only">Loading table data</caption>
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// ChartSkeleton – for bar charts, line charts
// ============================================================
export function ChartSkeleton() {
  // Random heights for realistic preview
  const randomHeights = Array.from({ length: 7 }, () => `${Math.random() * 100 + 20}%`);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-5 rounded" />
      </div>
      <div className="mt-4 flex h-48 items-end gap-2">
        {randomHeights.map((height, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t"
            style={{ height }}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MetricCardSkeleton – for admin stats
// ============================================================
export function MetricCardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="mt-3 h-8 w-12" />
      <Skeleton className="mt-2 h-3 w-24" />
    </div>
  );
}

// ============================================================
// PageLoader – full page loading spinner with message
// ============================================================
interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div
      className="flex min-h-[400px] flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" aria-hidden="true" />
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}

// ============================================================
// InlineLoader – small spinner for buttons or inline areas
// ============================================================
interface InlineLoaderProps {
  size?: "sm" | "md" | "lg";
}

export function InlineLoader({ size = "md" }: InlineLoaderProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="inline-flex items-center justify-center" role="status">
      <Loader2 className={clsx(sizes[size], "animate-spin text-blue-600")} aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

// ============================================================
// EmptyState – when no data to display
// ============================================================
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 py-12"
      role="status"
    >
      {icon && <div className="mb-3 text-slate-400" aria-hidden="true">{icon}</div>}
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-center text-sm text-slate-500">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ============================================================
// ErrorState – when something goes wrong
// ============================================================
interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-rose-200 bg-rose-50 py-12"
      role="alert"
      aria-live="assertive"
    >
      <div className="mb-3 rounded-full bg-rose-100 p-3" aria-hidden="true">
        <AlertCircle className="h-6 w-6 text-rose-600" />
      </div>
      <h3 className="text-base font-semibold text-rose-900">{title}</h3>
      <p className="mt-1 max-w-sm text-center text-sm text-rose-700">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// ============================================================
// LoadingOverlay – overlay on top of existing content
// ============================================================
interface LoadingOverlayProps {
  isLoading: boolean;
  children: ReactNode;
}

export function LoadingOverlay({ isLoading, children }: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80"
        role="status"
        aria-live="polite"
      >
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" aria-hidden="true" />
        <span className="sr-only">Loading</span>
      </div>
      <div aria-hidden="true" className="pointer-events-none opacity-50">
        {children}
      </div>
    </div>
  );
}

// ============================================================
// Convenience export
// ============================================================
export default {
  CardSkeleton,
  TableRowSkeleton,
  TableSkeleton,
  ChartSkeleton,
  MetricCardSkeleton,
  PageLoader,
  InlineLoader,
  EmptyState,
  ErrorState,
  LoadingOverlay,
};
