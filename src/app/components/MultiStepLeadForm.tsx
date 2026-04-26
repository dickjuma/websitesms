"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleAnalytics } from '@/lib/analytics';
import { X, ArrowRight, Phone, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  service: string;
  location: string;
  budget: string;
  timeline: string;
  message: string;
}

interface MultiStepLeadFormProps {
  service?: string;
  location?: string;
  onClose?: () => void;
  triggerSource?: 'cta_button' | 'sticky_cta' | 'whatsapp' | 'demo_request';
}

const BUSINESS_TYPES = [
  'Retail & POS',
  'Manufacturing & ERP',
  'Healthcare & HMS',
  'Education & SMS',
  'Hospitality & Restaurant',
  'Logistics & Transport',
  'Financial Services',
  'Other'
];

const BUDGET_RANGES = [
  'Under KES 100,000',
  'KES 100,000 - 500,000',
  'KES 500,000 - 2,000,000',
  'KES 2,000,000 - 10,000,000',
  'Over KES 10,000,000',
  'Not sure yet'
];

const TIMELINE_OPTIONS = [
  'ASAP (within 1 month)',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'Just researching'
];

export function MultiStepLeadForm({
  service,
  location,
  onClose,
  triggerSource = 'cta_button'
}: MultiStepLeadFormProps) {
  const router = useRouter();
  const { trackQuoteRequest, trackConversion } = useGoogleAnalytics();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    service: service || '',
    location: location || '',
    budget: '',
    timeline: '',
    message: ''
  });

  // Pre-fill data from URL params or props
  useEffect(() => {
    if (service) setFormData(prev => ({ ...prev, service }));
    if (location) setFormData(prev => ({ ...prev, location }));
  }, [service, location]);

  const updateFormData = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Submit to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          triggerSource,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      });

      if (!response.ok) throw new Error('Submission failed');

      const result = await response.json();

      // Track conversion
      trackQuoteRequest(formData.service, formData.location);
      trackConversion('lead_form_submission', 0);

      // Show WhatsApp option
      setShowWhatsApp(true);
      setCurrentStep(5); // Success step

      // Auto-redirect after 3 seconds
      setTimeout(() => {
        router.push('/thank-you');
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = `Hi! I'm ${formData.name} from ${formData.company}. I just submitted a form about ${formData.service} in ${formData.location}. Can we discuss my requirements?`;
    const whatsappUrl = `https://wa.me/254719832719?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Tell us about yourself</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@company.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+254 700 000 000"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About your business</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ABC Company Ltd"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
              <select
                value={formData.businessType}
                onChange={(e) => updateFormData('businessType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select business type</option>
                {BUSINESS_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
              <input
                type="text"
                value={formData.service}
                onChange={(e) => updateFormData('service', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ERP System, POS System, etc."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Project details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nairobi, Kenya"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
              <select
                value={formData.budget}
                onChange={(e) => updateFormData('budget', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select budget range</option>
                {BUDGET_RANGES.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
              <select
                value={formData.timeline}
                onChange={(e) => updateFormData('timeline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select timeline</option>
                {TIMELINE_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Additional details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => updateFormData('message', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                placeholder="Tell us about your specific requirements, challenges, or questions..."
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll review your requirements within 2 hours</li>
                <li>• Receive a customized proposal</li>
                <li>• Schedule a free consultation call</li>
                <li>• Get implementation timeline and pricing</li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Thank you for your interest!</h3>
            <p className="text-gray-600">
              We've received your information and will get back to you within 2 hours.
            </p>
            {showWhatsApp && (
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-green-800 mb-3">Want to discuss your requirements right now?</p>
                <button
                  onClick={openWhatsApp}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.company && formData.businessType;
      case 3:
        return true; // Optional fields
      case 4:
        return true; // Optional message
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Get Your Free Quote</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of 4</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 4) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        {currentStep < 5 && (
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {currentStep === 5 && (
          <div className="p-6 border-t bg-gray-50 text-center">
            <p className="text-sm text-gray-600">
              Redirecting to thank you page in a few seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}