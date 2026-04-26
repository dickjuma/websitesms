"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Send, Eye, Users, Calendar } from 'lucide-react';
import { SiteShell } from '@/components/layout/site-shell';
import Link from 'next/link';

interface CampaignFormData {
  name: string;
  subject: string;
  content: {
    html: string;
    text?: string;
  };
  audience: {
    type: 'all' | 'segment' | 'tags' | 'custom';
    filters: {
      tags?: string[];
      segments?: string[];
    };
  };
  schedule?: {
    sendAt: Date;
    timezone: string;
  };
}

const EMAIL_TEMPLATES = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to SMAS Systems - Your Software Journey Begins',
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to SMAS Systems!</h1>
        <p>Thank you for joining our community. We're excited to help you transform your business with our software solutions.</p>

        <h2>What happens next?</h2>
        <ul>
          <li>Explore our ERP and POS systems</li>
          <li>Get personalized recommendations</li>
          <li>Receive tips on digital transformation</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
          <a href="{{unsubscribe_link}}" style="color: #6b7280; font-size: 12px;">Unsubscribe</a>
        </div>
      </div>
    `
  },
  {
    id: 'newsletter',
    name: 'Monthly Newsletter',
    subject: 'Latest Updates from SMAS Systems',
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Monthly Software Insights</h1>

        <h2>Featured: ERP System Benefits</h2>
        <p>Discover how our ERP solutions can streamline your business operations and improve efficiency.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://smassystems.com/services/erp-systems" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Learn More</a>
        </div>

        <h2>Customer Success Story</h2>
        <p>Read how one of our clients reduced operational costs by 40% with our POS system.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="{{unsubscribe_link}}" style="color: #6b7280; font-size: 12px;">Unsubscribe</a>
        </div>
      </div>
    `
  },
  {
    id: 'promotion',
    name: 'Product Promotion',
    subject: 'Special Offer: 20% Off ERP Implementation',
    content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #92400e; margin: 0;">🔥 Limited Time Offer!</h1>
          <p style="color: #92400e; margin: 10px 0 0 0;">Get 20% off your ERP system implementation</p>
        </div>

        <h2>Why Choose Our ERP System?</h2>
        <ul>
          <li>Complete business management solution</li>
          <li>Mobile access from anywhere</li>
          <li>Local support and training</li>
          <li>Scalable for growing businesses</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://smassystems.com/quote?discount=ERP20" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Claim Your 20% Discount</a>
        </div>

        <p style="color: #6b7280; font-size: 12px;">Offer valid until December 31, 2024. Terms and conditions apply.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="{{unsubscribe_link}}" style="color: #6b7280; font-size: 12px;">Unsubscribe</a>
        </div>
      </div>
    `
  }
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    subject: '',
    content: {
      html: '',
      text: ''
    },
    audience: {
      type: 'all',
      filters: {}
    }
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setFormData(prev => ({
        ...prev,
        subject: template.subject,
        content: {
          html: template.content,
          text: '' // Could generate from HTML
        }
      }));
    }
  };

  const handleSubmit = async (action: 'save' | 'send') => {
    setLoading(true);

    try {
      const campaignData = {
        ...formData,
        status: action === 'send' ? 'sending' : 'draft',
        type: 'newsletter',
        sender: {
          name: 'SMAS Systems',
          email: 'hello@smassystems.com'
        },
        tracking: {
          trackOpens: true,
          trackClicks: true,
          trackUnsubscribes: true
        }
      };

      const response = await fetch('/api/email/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      });

      if (response.ok) {
        router.push('/admin/email');
      } else {
        console.error('Failed to create campaign');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof CampaignFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateContent = (html: string) => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, html }
    }));
  };

  if (previewMode) {
    return (
      <SiteShell>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">Campaign Preview</h1>
                  <button
                    onClick={() => setPreviewMode(false)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Back to Editor
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="border rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Subject: {formData.subject}</h3>
                  <p className="text-sm text-gray-600 mb-4">From: SMAS Systems &lt;hello@smassystems.com&gt;</p>
                </div>

                <div className="border rounded-lg">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <span className="text-sm font-medium text-gray-700">Email Preview</span>
                  </div>
                  <div
                    className="p-4 max-h-96 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: formData.content.html }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin/email"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Email Marketing
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Create Email Campaign</h1>
            <p className="mt-2 text-gray-600">Design and send email campaigns to your subscribers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Campaign Details */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Campaign Details</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Monthly Newsletter - December 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => updateFormData('subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write an engaging subject line..."
                    />
                  </div>

                  {/* Email Templates */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose a Template (Optional)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {EMAIL_TEMPLATES.map(template => (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template.id)}
                          className={`p-4 border rounded-lg text-left hover:border-blue-500 transition-colors ${
                            selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{template.subject}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email Content Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Content *
                    </label>
                    <textarea
                      value={formData.content.html}
                      onChange={(e) => updateContent(e.target.value)}
                      rows={20}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="<div>Write your HTML email content here...</div>"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Use HTML for rich formatting. Include {"{{unsubscribe_link}}"} for compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Audience Selection */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Audience Selection</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Send to *
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="audience"
                          value="all"
                          checked={formData.audience.type === 'all'}
                          onChange={(e) => updateFormData('audience', {
                            type: e.target.value as 'all',
                            filters: {}
                          })}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">All active subscribers</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="audience"
                          value="segment"
                          checked={formData.audience.type === 'segment'}
                          onChange={(e) => updateFormData('audience', {
                            type: e.target.value as 'segment',
                            filters: { segments: ['active'] }
                          })}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Specific segments</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="audience"
                          value="tags"
                          checked={formData.audience.type === 'tags'}
                          onChange={(e) => updateFormData('audience', {
                            type: e.target.value as 'tags',
                            filters: { tags: [] }
                          })}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Subscribers with specific tags</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setPreviewMode(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Preview Email
                    </button>

                    <button
                      onClick={() => handleSubmit('save')}
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save as Draft
                    </button>

                    <button
                      onClick={() => handleSubmit('send')}
                      disabled={loading || !formData.name || !formData.subject || !formData.content.html}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? 'Sending...' : 'Send Campaign'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Campaign Stats Preview */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Recipients</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Based on audience selection:</span>
                      <span className="font-semibold text-gray-900">
                        {formData.audience.type === 'all' ? '~150' :
                         formData.audience.type === 'segment' ? '~50' :
                         '~25'} subscribers
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      This is an estimate based on current subscriber data.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Email Best Practices</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Keep subject lines under 50 characters</li>
                  <li>• Include clear call-to-action buttons</li>
                  <li>• Add unsubscribe link for compliance</li>
                  <li>• Test emails on different devices</li>
                  <li>• Personalize content when possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}