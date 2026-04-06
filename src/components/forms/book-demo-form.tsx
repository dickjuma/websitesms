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

    // Validate required fields
    if (!formData.name || !formData.email || !formData.company || !formData.serviceType || !formData.preferredDate || !formData.preferredTime) {
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
      setMessage("Demo scheduled successfully!");
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
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
      {/* Status Messages */}
      {status === "success" && (
        <div className="flex gap-3 rounded-lg bg-green-50 border border-green-200 p-4">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          <p className="text-sm text-green-800 font-medium">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex gap-3 rounded-lg bg-red-50 border border-red-200 p-4">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 font-medium">{message}</p>
        </div>
      )}

      {/* Name and Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
            Your Name *
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
            Email Address *
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
          />
        </div>
      </div>

      {/* Company and Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
            Company *
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
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
            placeholder="+1 (555) 123-4567"
            disabled={status === "loading"}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
          />
        </div>
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="serviceType" className="block text-sm font-semibold text-slate-900 mb-2">
          What service interests you? *
        </label>
        <select
          id="serviceType"
          name="serviceType"
          required
          value={formData.serviceType}
          onChange={handleChange}
          disabled={status === "loading"}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
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
            Preferred Date *
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
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
          />
        </div>
        <div>
          <label htmlFor="preferredTime" className="block text-sm font-semibold text-slate-900 mb-2">
            Preferred Time (KE) *
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            required
            value={formData.preferredTime}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
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
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
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
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition resize-none"
        />
        <p className="mt-1 text-xs text-slate-500">Max 500 characters</p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            Scheduling...
          </>
        ) : (
          <>
            Schedule Demo
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Privacy Notice */}
      <p className="text-xs text-slate-500 text-center">
        We&apos;ll send you a confirmation email and calendar invite. We don&apos;t share your info with anyone.
      </p>
    </form>
  );
}
