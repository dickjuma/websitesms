"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Declare gtag function type
declare global {
  function gtag(...args: any[]): void;
}

export function useGoogleAnalytics() {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
      });

      // Enhanced tracking for programmatic SEO pages
      if (pathname.includes('-')) {
        window.gtag('event', 'programmatic_page_view', {
          page_title: document.title,
          page_location: window.location.href,
          service_location: pathname.replace('/', ''),
          content_type: 'location-service-page'
        });
      }
    }
  }, [pathname]);

  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        page_location: window.location.href,
        timestamp: new Date().toISOString()
      });
    }
  };

  const trackConversion = (conversionType: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        conversion_type: conversionType,
        value: value,
        currency: 'KES',
        page_location: window.location.href
      });
    }
  };

  const trackQuoteRequest = (serviceType: string, location?: string) => {
    trackEvent('quote_request', {
      service_type: serviceType,
      location: location,
      event_category: 'engagement',
      event_label: 'quote_form_submission'
    });
  };

  const trackDemoRequest = (serviceType: string, location?: string) => {
    trackEvent('demo_request', {
      service_type: serviceType,
      location: location,
      event_category: 'engagement',
      event_label: 'demo_booking'
    });
  };

  const trackContactForm = (formType: string) => {
    trackEvent('contact_form_submission', {
      form_type: formType,
      event_category: 'engagement',
      event_label: 'contact_form'
    });
  };

  const trackServicePageView = (service: string, location: string) => {
    trackEvent('service_page_view', {
      service_type: service,
      location: location,
      event_category: 'engagement',
      event_label: 'programmatic_seo_page'
    });
  };

  return {
    trackEvent,
    trackConversion,
    trackQuoteRequest,
    trackDemoRequest,
    trackContactForm,
    trackServicePageView
  };
}

// Utility function for tracking programmatic SEO interactions
export function trackProgrammaticSEOInteraction(
  action: string,
  service: string,
  location: string,
  additionalData?: Record<string, any>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `seo_${action}`, {
      service_type: service,
      location: location,
      page_location: window.location.href,
      ...additionalData
    });
  }
}

// Track user engagement on location pages
export function trackLocationPageEngagement(
  engagementType: 'scroll' | 'cta_click' | 'faq_expand' | 'related_link_click',
  service: string,
  location: string
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'location_page_engagement', {
      engagement_type: engagementType,
      service_type: service,
      location: location,
      page_location: window.location.href,
      event_category: 'engagement'
    });
  }
}