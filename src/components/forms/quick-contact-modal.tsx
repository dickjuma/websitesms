"use client";

import { X, ChevronRight } from "lucide-react";
import { ContactForm } from "./contact-form";

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickContactModal({ isOpen, onClose }: QuickContactModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Quick Contact</h2>
              <p className="text-sm text-slate-600">We will get back to you within 24 hours</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1 hover:bg-slate-100 transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          {/* Form */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">
            <ContactForm
              onSuccess={() => {
                setTimeout(onClose, 2000);
              }}
            />
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 rounded-b-2xl">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Full Contact Page
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
