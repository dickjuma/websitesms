import { z } from 'zod';

export const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Please enter a valid phone number'),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  plan: z.string().min(1, 'Please select a plan'),
  type: z.enum(['subscription', 'one-time']).optional(),
  price: z.number().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().max(2000, 'Message is too long (max 2000 characters)'),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

export interface QuoteSubmission extends QuoteFormData {
  timestamp: string;
  source?: string;
  leadQuality?: 'hot' | 'warm' | 'cold';
}

export function formatServiceName(slug: string): string {
  const names: Record<string, string> = {
    'erp': 'ERP Systems',
    'pos': 'POS Systems',
    'school': 'School Management',
    'health': 'Hospital Management',
    'web-development': 'Web Development',
    'mobile-apps': 'Mobile App Development',
    'apis': 'API Integrations',
    'hosting': 'Hosting & Maintenance',
    'ecommerce': 'E-commerce',
    'custom': 'Custom Software',
    'analytics': 'Data Analytics',
    'design': 'UI/UX Design',
    'seo': 'SEO & Marketing',
    'consulting': 'IT Consulting',
    'qa': 'QA & Testing',
    'cloud': 'Cloud & DevOps',
    'security': 'Cybersecurity',
  };
  return names[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function formatPlanName(planId: string): string {
  // Convert plan ID to readable name
  const parts = planId.split('-');
  return parts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export const budgetOptions = [
  { value: 'under-100k', label: 'Under KSh 100,000' },
  { value: '100k-300k', label: 'KSh 100,000 - 300,000' },
  { value: '300k-750k', label: 'KSh 300,000 - 750,000' },
  { value: '750k-1.5m', label: 'KSh 750,000 - 1,500,000' },
  { value: 'above-1.5m', label: 'Above KSh 1,500,000' },
];

export const timelineOptions = [
  { value: 'asap', label: 'ASAP (2-4 weeks)' },
  { value: '1-3months', label: '1-3 months' },
  { value: '3-6months', label: '3-6 months' },
  { value: '6-12months', label: '6-12 months' },
  { value: 'flexible', label: 'Flexible / Not urgent' },
];

export const servicePriority: Record<string, number> = {
  'erp': 10,
  'pos': 8,
  'hospital': 9,
  'health': 9,
  'school': 7,
  'mobile-apps': 8,
  'web-development': 6,
  'apis': 5,
  'hosting': 4,
};

export function detectLeadQuality(data: QuoteFormData): 'hot' | 'warm' | 'cold' {
  let score = 0;

  // Budget scoring
  if (data.budget) {
    const budgetRanges: Record<string, number> = {
      'Above KSh 1,500,000': 30,
      'KSh 750,000 - KSh 1,500,000': 20,
      'KSh 300,000 - KSh 750,000': 10,
      'KSh 100,000 - KSh 300,000': 5,
      'Under KSh 100,000': 0,
    };
    score += budgetRanges[data.budget] || 0;
  }

  // Service scoring
  if (data.service) {
    score += servicePriority[data.service.toLowerCase()] || 0;
  }

  // Message quality scoring
  if (data.message && data.message.length > 50) {
    score += 5;
  }
  if (data.message && (data.message.toLowerCase().includes('asap') || data.message.toLowerCase().includes('urgent'))) {
    score += 10;
  }

  // Company scoring
  if (data.company && data.company.length > 0) {
    score += 5;
  }

  // Phone scoring
  if (data.phone && data.phone.length > 0) {
    score += 5;
  }

  // Timeline scoring
  if (data.timeline === 'ASAP (2-4 weeks)' || data.timeline === '1-3 months') {
    score += 10;
  }

  if (score >= 25) return 'hot';
  if (score >= 10) return 'warm';
  return 'cold';
}
