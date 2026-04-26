"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { serviceItems } from "@/lib/site-data";

type FormStatus = "idle" | "loading" | "success" | "error";

interface BookDemoFormProps {
  onSuccess?: () => void;
}

const services = [...serviceItems.map((item) => item.title), "Other"];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

export function BookDemoForm({ onSuccess }: BookDemoFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [serviceOptions, setServiceOptions] = useState<string[]>(services);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    teamSize: "1",
    notes: "",
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
          setServiceOptions([...new Set([...titles, "Other"])]);
        }
      })
      .catch(() => {
        setServiceOptions(services);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // Client-side validation for required fields
    const requiredFields = ["name", "email", "company", "serviceType", "preferredDate", "preferredTime"];
    const missing = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    if (missing.length > 0) {
      setStatus("error");
      setMessage("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to book demo");
      }

      setStatus("success");
      setMessage("Demo scheduled successfully! We'll send a calendar invite.");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        teamSize: "1",
        notes: "",
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
    <form onSubmit={handleSubmit} className="space-y-5 mt-6" noValidate>
      {/* Status Messages */}
      {status === "success" && (
        <div
          className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4"
          role="status"
          aria-live="polite"
        >
          <CheckCircle className="h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div
          className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
      )}

      {/* Name and Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
            Your Name <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            disabled={status === "loading"}
            aria-required="true"
            aria-invalid={status === "error" && !formData.name}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
            Email Address <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            disabled={status === "loading"}
            aria-required="true"
            aria-invalid={status === "error" && !formData.email}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
      </div>

      {/* Company and Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
            Company <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company"
            disabled={status === "loading"}
            aria-required="true"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+254 712 345 678"
            disabled={status === "loading"}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="serviceType" className="block text-sm font-semibold text-slate-900 mb-2">
          What service interests you? <span className="text-red-600" aria-hidden="true">*</span>
          <span className="sr-only">required</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          required
          value={formData.serviceType}
          onChange={handleChange}
          disabled={status === "loading"}
          aria-required="true"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
        >
          <option value="">Select a service...</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Date and Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-semibold text-slate-900 mb-2">
            Preferred Date <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            required
            value={formData.preferredDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            disabled={status === "loading"}
            aria-required="true"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <div>
          <label htmlFor="preferredTime" className="block text-sm font-semibold text-slate-900 mb-2">
            Preferred Time (KE) <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            required
            value={formData.preferredTime}
            onChange={handleChange}
            disabled={status === "loading"}
            aria-required="true"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
          >
            <option value="">Select a time...</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Team Size */}
      <div>
        <label htmlFor="teamSize" className="block text-sm font-semibold text-slate-900 mb-2">
          How many will attend?
        </label>
        <select
          id="teamSize"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          disabled={status === "loading"}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500"
        >
          <option value="1">Just me</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="4+">4 or more</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-semibold text-slate-900 mb-2">
          Anything we should know? (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Tell us about your project, timeline, or any specific questions..."
          disabled={status === "loading"}
          rows={3}
          maxLength={500}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-slate-50 disabled:text-slate-500 resize-none"
        />
        <p className="mt-1 text-xs text-slate-500">Max 500 characters</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
            Scheduling...
          </>
        ) : (
          <>
            Schedule Demo
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
