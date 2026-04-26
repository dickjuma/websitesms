"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage("Welcome! Check your email for confirmation.");
      setEmail("");

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address for newsletter
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading"}
            aria-required="true"
            aria-invalid={status === "error" && !email}
            aria-describedby={status === "error" ? "newsletter-error" : undefined}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <span>Subscribe</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {/* Status messages */}
      {status === "success" && (
        <div
          className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2"
          role="status"
          aria-live="polite"
        >
          <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" aria-hidden="true" />
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div
          id="newsletter-error"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
      )}
    </form>
  );
}
