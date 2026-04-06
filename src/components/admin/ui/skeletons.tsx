"use client";

import { memo, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

function Skeleton({ className, style }: SkeletonProps) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className || ""}`} style={style} />;
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="mt-3 h-10 w-16" />
      <Skeleton className="mt-2 h-4 w-32" />
    </div>
  );
}

// Table row skeleton
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-slate-100">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-6 py-4">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Chart skeleton
export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-5" />
      </div>
      <div className="mt-4 flex h-48 items-end gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t"
            style={{ height: `${Math.random() * 100 + 20}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Metric card skeleton
export function MetricCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="mt-3 h-8 w-12" />
      <Skeleton className="mt-2 h-3 w-24" />
    </div>
  );
}

// Page loader with spinner
interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-slate-600">{message}</p>
      </div>
    </div>
  );
}

// Inline loader
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
    <div className="flex items-center gap-2">
      <Loader2 className={`${sizes[size]} animate-spin text-blue-600`} />
    </div>
  );
}

// Empty state component
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {icon && <div className="mb-4 text-slate-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-center text-sm text-slate-500">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// Error state component
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
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 rounded-full bg-rose-100 p-3">
        <svg
          className="h-6 w-6 text-rose-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-center text-sm text-slate-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Loading overlay
interface LoadingOverlayProps {
  isLoading: boolean;
  children: ReactNode;
}

export function LoadingOverlay({ isLoading, children }: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center bg-white/80">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
      {children}
    </div>
  );
}

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