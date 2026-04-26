"use client";

type ToastOptions = {
  id?: string | number;
};

function logToast(level: "loading" | "success" | "error", message: string) {
  if (typeof window !== "undefined") {
    console[level === "error" ? "error" : "log"](`[toast:${level}] ${message}`);
  }
}

export const toast = {
  loading(message: string) {
    const id = `toast-${Date.now()}`;
    logToast("loading", message);
    return id;
  },
  success(message: string, _options?: ToastOptions) {
    logToast("success", message);
  },
  error(message: string, _options?: ToastOptions) {
    logToast("error", message);
  },
};

export function Toaster(_props: { position?: string; richColors?: boolean }) {
  return null;
}
