"use client";

import { useEffect } from 'react';
import { useGoogleAnalytics, trackLocationPageEngagement } from '@/lib/analytics';

interface LocationPageTrackerProps {
  service: string;
  location: string;
}

export function LocationPageTracker({ service, location }: LocationPageTrackerProps) {
  const { trackServicePageView } = useGoogleAnalytics();

  useEffect(() => {
    // Track page view for programmatic SEO
    trackServicePageView(service, location);

    // Track scroll engagement
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrolled > 25 && scrolled < 35) { // Track once when user scrolls 25-35%
        trackLocationPageEngagement('scroll', service, location);
      }
    };

    // Track FAQ interactions
    const handleFAQClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('details')) {
        trackLocationPageEngagement('faq_expand', service, location);
      }
    };

    // Track CTA clicks
    const handleCTAClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a[href*="quote"]') || target.closest('a[href*="book-demo"]')) {
        trackLocationPageEngagement('cta_click', service, location);
      }
    };

    // Track related link clicks
    const handleRelatedLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a[href*="-"]')) { // Links to other service-location pages
        trackLocationPageEngagement('related_link_click', service, location);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleFAQClick);
    document.addEventListener('click', handleCTAClick);
    document.addEventListener('click', handleRelatedLinkClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleFAQClick);
      document.removeEventListener('click', handleCTAClick);
      document.removeEventListener('click', handleRelatedLinkClick);
    };
  }, [service, location, trackServicePageView]);

  return null; // This component only handles tracking
}