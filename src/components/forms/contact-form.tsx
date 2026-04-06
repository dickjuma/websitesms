"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  serviceType?: string;
  onSuccess?: () => void;
}

export function ContactForm({ serviceType, onSuccess }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          serviceType: serviceType || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setStatus("success");
      setMessage("Thank you! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
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

      <div className="grid gap-4 sm:grid-cols-2">
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
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            disabled={status === "loading"}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this about?"
          disabled={status === "loading"}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 disabled:opacity-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
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
        {status === "loading" ? "Sending..." : "Send Message"}
        {status !== "loading" && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
