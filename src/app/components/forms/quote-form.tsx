"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { serviceItems } from "@/lib/site-data";

type FormStatus = "idle" | "loading" | "success" | "error";

interface QuoteFormProps {
  onSuccess?: () => void;
}

const budgetRanges = [
  "Under KSh 100,000",
  "KSh 100,000 - KSh 300,000",
  "KSh 300,000 - KSh 750,000",
  "KSh 750,000 - KSh 1,500,000",
  "Above KSh 1,500,000",
];

const timelines = [
  "ASAP (weeks)",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "Flexible",
];

export function QuoteForm({ onSuccess }: QuoteFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const serviceOptions = [...serviceItems.map((item) => item.title), "Custom System", "Other"];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // Basic client-side validation for required fields
    const requiredFields = ["name", "email", "projectType", "message"];
    const missing = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    if (missing.length > 0) {
      setStatus("error");
      setMessage("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      setStatus("success");
      setMessage("Thank you! We'll send you a quote within 2 business days.");
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Name and Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
            Name <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            disabled={status === "loading"}
            aria-required="true"
            aria-invalid={status === "error" && !formData.name}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
            Email <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            disabled={status === "loading"}
            aria-required="true"
            aria-invalid={status === "error" && !formData.email}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company"
          disabled={status === "loading"}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
        />
      </div>

      {/* Project Type, Budget, Timeline */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="projectType" className="block text-sm font-semibold text-slate-900 mb-2">
            Project Type <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            disabled={status === "loading"}
            aria-required="true"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          >
            <option value="">Select project type...</option>
            {serviceOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-slate-900 mb-2">
            Budget (KSh)
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          >
            <option value="">Select budget range...</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="block text-sm font-semibold text-slate-900 mb-2">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          >
            <option value="">Select timeline...</option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Details */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
          Project Details <span className="text-red-600" aria-hidden="true">*</span>
          <span className="sr-only">required</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project requirements..."
          disabled={status === "loading"}
          aria-required="true"
          aria-invalid={status === "error" && !formData.message}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
        />
      </div>

      {/* Status messages */}
      {status === "success" && (
        <div
          className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3"
          role="status"
          aria-live="polite"
        >
          <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-5 w-5 text-red-600" aria-hidden="true" />
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Request Quote</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      {/* Required fields hint */}
      <p className="text-center text-xs text-slate-500">
        <span className="text-red-600" aria-hidden="true">*</span> Required fields
      </p>
    </form>
  );
}
