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
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setMessage("Welcome! Check your email for confirmation.");
      setEmail("");

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === "loading"}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
          {status !== "loading" && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Status messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2">
          <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600" />
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
      )}
    </form>
  );
}
