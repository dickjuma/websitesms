"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { serviceItems } from "@/lib/site-data";

type FormStatus = "idle" | "loading" | "success" | "error";

interface QuoteFormProps {
  onSuccess?: () => void;
}

const projectTypes = [...serviceItems.map((item) => item.title), "Custom System", "Other"];

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
  const [serviceOptions, setServiceOptions] = useState<string[]>(projectTypes);
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

  useEffect(() => {
    void fetch("/api/content/services", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load services.");
        }

        return response.json();
      })
      .then((payload: { data?: Array<{ title?: string; isActive?: boolean }> }) => {
        const titles =
          payload.data
            ?.filter((item) => item.isActive !== false && item.title)
            .map((item) => String(item.title)) || [];

        if (titles.length > 0) {
          setServiceOptions([...new Set([...titles, "Custom System", "Other"])]);
        }
      })
      .catch(() => {
        setServiceOptions(projectTypes);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

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

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
            Name *
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
            Email *
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
          />
        </div>
      </div>

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
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="projectType" className="block text-sm font-semibold text-slate-900 mb-2">
            Project Type *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
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
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
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

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
          Project Details *
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
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
        />
      </div>

      {/* Status messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Request Quote"}
        {status !== "loading" && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
