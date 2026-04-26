"use client";

import { useEffect, useState } from "react";
import { DollarSign, RotateCcw, Save, Plus, Edit2, Trash2 } from "lucide-react";

import {
  AdminHero,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  Textarea,
} from "@/components/admin/ui/primitives";

interface PricingService {
  _id?: string;
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription?: string;
  hero: {
    title: string;
    subtitle: string;
  };
  plans: PricingPlan[];
  features: {
    name: string;
    tiers: (boolean | string)[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'monthly' | 'one-time';
  popular?: boolean;
  features: string[];
  cta: string;
  href: string;
}

export default function PricesPage() {
  const [services, setServices] = useState<PricingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editingService, setEditingService] = useState<PricingService | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [apiSource, setApiSource] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setSeeding(true);

      // Try main API first
      console.log('Trying main pricing API...');
      let response = await fetch('/api/pricing');
      let data = null;

      if (response.ok) {
        data = await response.json();
        console.log('Main API success, loaded services:', data?.length || 0);
        setApiSource('database');
      } else {
        console.log('Main API failed, trying fallback API...');
        // Try fallback API
        response = await fetch('/api/pricing/fallback');
        if (response.ok) {
          data = await response.json();
          console.log('Fallback API success, loaded services:', data?.length || 0);
          setApiSource('fallback');
        } else {
          console.error('Both APIs failed');
          setApiSource('failed');
          data = [];
        }
      }

      // Ensure data is always an array
      const servicesData = Array.isArray(data) ? data : [];
      console.log('Setting services data:', servicesData.length, 'items');
      setServices(servicesData);
    } catch (error) {
      console.error('Failed to load services:', error);
      setServices([]);
    } finally {
      setLoading(false);
      setSeeding(false);
    }
  };

  const handleSaveService = async (serviceData: Partial<PricingService>) => {
    try {
      const method = serviceData._id ? 'PUT' : 'POST';
      const url = serviceData._id ? `/api/pricing/${serviceData._id}` : '/api/pricing';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        await loadServices();
        setEditingService(null);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/pricing/${serviceId}`, {
        method: 'DELETE',
        credentials: 'include', // Include cookies for authentication
      });

      if (response.ok) {
        await loadServices();
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  // Ensure services is always an array
  const safeServices = Array.isArray(services) ? services : [];
  console.log('Rendering with services:', safeServices.length, 'items, mounted:', mounted);

  if (!mounted || loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="h-32 rounded bg-slate-200" />
        </div>
        {seeding && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              🔄 Loading pricing services... If this takes too long, the database might not be connected.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <AdminHero
        title="Pricing Management"
        description="Configure pricing plans, features, and FAQs for your services. Sample data is automatically loaded for all services - expand each one to customize."
        icon={DollarSign}
      />

      <div className="mt-6">
        <div className="mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Services ({safeServices.length})</h2>
            <p className="text-sm text-slate-600">Click expand (+) to manage pricing plans, features, and FAQs for each service</p>
            {apiSource && (
              <p className={`text-xs mt-1 ${
                apiSource === 'database' ? 'text-green-600' :
                apiSource === 'fallback' ? 'text-orange-600' : 'text-red-600'
              }`}>
                Data source: {apiSource === 'database' ? 'Database' :
                             apiSource === 'fallback' ? 'Sample Data (Fallback)' : 'Failed to Load'}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {safeServices.length > 0 ? safeServices.filter(service => service && service.id).map((service) => (
            <Card key={service.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">{service.description}</p>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <button
                      onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                      className="rounded p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      title={expandedService === service.id ? "Collapse" : "Expand"}
                    >
                      {expandedService === service.id ? "−" : "+"}
                    </button>
                    <button
                      onClick={() => setEditingService(service)}
                      className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                      title="Edit service details"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>

              {expandedService === service.id && (
                <CardContent className="space-y-6">
                  {/* Plans Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900">Pricing Plans ({service.plans.length})</h4>
                      <button className="text-sm text-blue-600 hover:text-blue-700">Add Plan</button>
                    </div>
                    {service.plans.length > 0 ? (
                      <div className="space-y-3">
                        {service.plans.map((plan) => (
                          <div key={plan.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <p className="font-medium text-slate-900">{plan.name}</p>
                              <p className="text-sm text-slate-600">{plan.description}</p>
                              <p className="text-sm font-medium text-green-600">
                                KSh {plan.price.toLocaleString()} ({plan.priceType})
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                              <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">No pricing plans configured yet.</p>
                    )}
                  </div>

                  {/* Features Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900">Features ({service.features.length})</h4>
                      <button className="text-sm text-blue-600 hover:text-blue-700">Add Feature</button>
                    </div>
                    {service.features.length > 0 ? (
                      <div className="space-y-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <span className="text-sm text-slate-700">{feature.name}</span>
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                              <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">No features configured yet.</p>
                    )}
                  </div>

                  {/* FAQs Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900">FAQs ({service.faqs.length})</h4>
                      <button className="text-sm text-blue-600 hover:text-blue-700">Add FAQ</button>
                    </div>
                    {service.faqs.length > 0 ? (
                      <div className="space-y-3">
                        {service.faqs.map((faq, index) => (
                          <div key={index} className="p-3 bg-slate-50 rounded-lg">
                            <p className="font-medium text-slate-900 text-sm">{faq.question}</p>
                            <p className="text-sm text-slate-600 mt-1">{faq.answer}</p>
                            <div className="flex gap-2 mt-2">
                              <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                              <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">No FAQs configured yet.</p>
                    )}
                  </div>
                </CardContent>
              )}

              <div className="px-6 pb-4">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Plans: {service.plans.length}</span>
                  <span>Features: {service.features.length}</span>
                  <span>FAQs: {service.faqs.length}</span>
                </div>
              </div>
            </Card>
          )) : null}
        </div>

        {safeServices.length === 0 && !loading && mounted && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No services loaded</h3>
            <p className="text-slate-600 mb-4">Check your database connection or try refreshing the page.</p>
            <button
              onClick={loadServices}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Retry Loading
            </button>
            <button
              onClick={async () => {
                try {
                  const response = await fetch('/api/test', { method: 'POST' });
                  if (response.ok) {
                    alert('Test completed! Check console for results.');
                    loadServices();
                  } else {
                    alert('Test failed');
                  }
                } catch (error) {
                  alert('Test error: ' + error);
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 ml-2"
            >
              Run Data Seeding Test
            </button>
            <button
              onClick={async () => {
                try {
                  const response = await fetch('/api/debug/pricing');
                  const data = await response.json();
                  alert(`Database test: ${data.servicesCount} services found\n${data.services.map(s => s.name).join(', ')}`);
                } catch (error) {
                  alert('Database test error: ' + error);
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 ml-2"
            >
              Test Database
            </button>
            <button
              onClick={async () => {
                try {
                  const response = await fetch('/api/pricing/seed', { method: 'POST' });
                  if (response.ok) {
                    alert('Seeding completed! Check console for details.');
                    loadServices();
                  } else {
                    alert('Seeding failed');
                  }
                } catch (error) {
                  alert('Seeding error: ' + error);
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 ml-2"
            >
              Seed Data Manually
            </button>
          </div>
        )}

        {(saved || (safeServices.length > 0 && !loading && mounted)) && (
          <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  {saved
                    ? "Changes saved successfully! The pricing page has been updated."
                    : "Sample pricing data loaded! You can now edit plans, features, and FAQs for each service."
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-4xl rounded-lg bg-white p-6 max-h-[90vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Edit {editingService.name}</h2>
              <button
                onClick={() => setEditingService(null)}
                className="rounded p-1 hover:bg-slate-100"
              >
                ×
              </button>
            </div>
            <div className="text-center py-8">
              <p className="text-slate-600 mb-4">
                Service editing interface would be implemented here with forms for:
              </p>
              <ul className="text-sm text-slate-500 space-y-1 text-left max-w-md mx-auto">
                <li>• Hero section (title, subtitle)</li>
                <li>• Service description and details</li>
                <li>• Adding/editing pricing plans</li>
                <li>• Managing features and comparisons</li>
                <li>• FAQ management</li>
              </ul>
              <p className="text-sm text-slate-600 mt-4">
                For now, use the API endpoints to manage service data directly.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingService(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleSaveService(editingService)}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
