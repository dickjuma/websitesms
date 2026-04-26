"use client";

import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';
import { MultiStepLeadForm } from './MultiStepLeadForm';

interface StickyCTAProps {
  service?: string;
  location?: string;
  variant?: 'default' | 'whatsapp' | 'phone';
}

export function StickyCTA({ service, location, variant = 'default' }: StickyCTAProps) {
  const [showForm, setShowForm] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  // Show CTA after scrolling or after 10 seconds
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setHasScrolled(true);
        setShowCTA(true);
      }
    };

    const showTimer = setTimeout(() => {
      setShowCTA(true);
    }, 10000); // 10 seconds

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(showTimer);
    };
  }, []);

  // Hide CTA on form open
  useEffect(() => {
    if (showForm) {
      setShowCTA(false);
    }
  }, [showForm]);

  const handleCTA = () => {
    setShowForm(true);
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in learning more about your software development services${service ? ` for ${service}` : ''}${location ? ` in ${location}` : ''}. Can we chat?`;
    const whatsappUrl = `https://wa.me/254719832719?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Track WhatsApp click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        service_type: service,
        location: location,
        page_location: window.location.href
      });
    }
  };

  const handlePhone = () => {
    window.location.href = 'tel:+254719832719';

    // Track phone click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'phone_click', {
        service_type: service,
        location: location,
        page_location: window.location.href
      });
    }
  };

  if (!showCTA) return null;

  return (
    <>
      {/* Sticky CTA Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {variant === 'whatsapp' && (
          <button
            onClick={handleWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {variant === 'phone' && (
          <button
            onClick={handlePhone}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Call us"
          >
            <Phone className="w-6 h-6" />
          </button>
        )}

        {variant === 'default' && (
          <button
            onClick={handleCTA}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Get Free Quote</span>
          </button>
        )}

        {/* Close button */}
        <button
          onClick={() => setShowCTA(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-colors"
          aria-label="Hide CTA"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Lead Form Modal */}
      {showForm && (
        <MultiStepLeadForm
          service={service}
          location={location}
          onClose={() => setShowForm(false)}
          triggerSource="sticky_cta"
        />
      )}
    </>
  );
}

// Helper component for inline CTAs
export function InlineCTA({
  service,
  location,
  children,
  className = ""
}: {
  service?: string;
  location?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className={`inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${className}`}
      >
        {children || "Get Your Free Quote"}
      </button>

      {showForm && (
        <MultiStepLeadForm
          service={service}
          location={location}
          onClose={() => setShowForm(false)}
          triggerSource="cta_button"
        />
      )}
    </>
  );
}
