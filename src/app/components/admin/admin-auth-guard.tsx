"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

function subscribeToAdminToken(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getAdminTokenSnapshot() {
  return window.localStorage.getItem("adminToken");
}

function getAdminTokenServerSnapshot() {
  return null;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useSyncExternalStore(
    subscribeToAdminToken,
    getAdminTokenSnapshot,
    getAdminTokenServerSnapshot,
  );

  useEffect(() => {
    if (token) {
      return;
    }

    router.replace(
      `/admin/login?next=${encodeURIComponent(pathname || "/admin")}`,
    );
  }, [pathname, router, token]);

  if (!token) {
    return (
      <div className="admin-frame flex min-h-screen items-center justify-center px-6">
        <div className="rounded-[2rem] border border-sky-100 bg-white/90 px-8 py-6 text-center shadow-[0_28px_80px_rgba(59,130,246,0.15)] backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">
            SMA Admin
          </p>
          <p className="mt-3 text-sm font-medium text-slate-700">
            Loading secure workspace...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
