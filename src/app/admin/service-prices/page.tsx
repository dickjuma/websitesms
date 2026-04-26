"use client";

import { useEffect, useState } from "react";
import { DollarSign, Plus, Edit2, Trash2, Save, X } from "lucide-react";

import {
  AdminHero,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  Select,
} from "@/components/admin/ui/primitives";
import { ServicePrice } from "@/lib/database";

interface ServicePriceFormData {
  serviceName: string;
  description: string;
  monthlyPrice: string;
  oneTimePrice: string;
  category: string;
}

export default function ServicePricesPage() {
  const [prices, setPrices] = useState<ServicePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingPrice, setEditingPrice] = useState<ServicePrice | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ServicePriceFormData>({
    serviceName: '',
    description: '',
    monthlyPrice: '',
    oneTimePrice: '',
    category: '',
  });
  const [errors, setErrors] = useState<Partial<ServicePriceFormData>>({});

  const categories = [
    'Web Development',
    'Mobile App Development',
    'ERP Systems',
    'POS Systems',
    'School Management',
    'Hospital Management',
    'API Integration',
    'Hotel Management',
    'Other'
  ];

  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/service-prices');
      if (response.ok) {
        const data = await response.json();
        setPrices(data);
      } else {
        console.error('Failed to load prices');
      }
    } catch (error) {
      console.error('Failed to load prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      serviceName: '',
      description: '',
      monthlyPrice: '',
      oneTimePrice: '',
      category: '',
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ServicePriceFormData> = {};

    if (!formData.serviceName.trim()) newErrors.serviceName = 'Service name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.monthlyPrice || isNaN(Number(formData.monthlyPrice)) || Number(formData.monthlyPrice) < 0) {
      newErrors.monthlyPrice = 'Valid monthly price is required';
    }
    if (!formData.oneTimePrice || isNaN(Number(formData.oneTimePrice)) || Number(formData.oneTimePrice) < 0) {
      newErrors.oneTimePrice = 'Valid one-time price is required';
    }
    if (!formData.category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);
      const method = editingPrice ? 'PUT' : 'POST';
      const url = editingPrice ? `/api/service-prices/${editingPrice._id}` : '/api/service-prices';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceName: formData.serviceName,
          description: formData.description,
          monthlyPrice: Number(formData.monthlyPrice),
          oneTimePrice: Number(formData.oneTimePrice),
          category: formData.category,
        }),
      });

      if (response.ok) {
        await loadPrices();
        setShowForm(false);
        setEditingPrice(null);
        resetForm();
      } else {
        const error = await response.json();
        alert(`Failed to ${editingPrice ? 'update' : 'create'} price: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to save price:', error);
      alert('Failed to save price');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (price: ServicePrice) => {
    setEditingPrice(price);
    setFormData({
      serviceName: price.serviceName,
      description: price.description,
      monthlyPrice: price.monthlyPrice.toString(),
      oneTimePrice: price.oneTimePrice.toString(),
      category: price.category,
    });
    setShowForm(true);
  };

  const handleDelete = async (price: ServicePrice) => {
    if (!confirm(`Are you sure you want to delete "${price.serviceName}"?`)) return;

    try {
      const response = await fetch(`/api/service-prices/${price._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadPrices();
      } else {
        alert('Failed to delete price');
      }
    } catch (error) {
      console.error('Failed to delete price:', error);
      alert('Failed to delete price');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPrice(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="h-32 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <AdminHero
        title="Service Price Management"
        description="Create and manage dynamic pricing for your services."
        icon={DollarSign}
      />

      <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Service Prices ({prices.length})</h2>
            <p className="text-sm text-slate-600">Manage pricing for all your services</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Price
          </Button>
        </div>

        <div className="space-y-4">
          {prices.map((price) => (
            <Card key={price._id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-slate-900">{price.serviceName}</h3>
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                        {price.category}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-3">{price.description}</p>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="text-slate-500">Monthly:</span>
                        <span className="font-semibold text-green-600 ml-1">
                          KSh {price.monthlyPrice.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">One-time:</span>
                        <span className="font-semibold text-blue-600 ml-1">
                          KSh {price.oneTimePrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(price)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(price)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-3">
                  Updated: {new Date(price.updatedAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {prices.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No service prices yet</h3>
            <p className="text-slate-600 mb-4">Add your first service price to get started.</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Price
            </Button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingPrice ? 'Edit Service Price' : 'Add New Service Price'}
              </h2>
              <button onClick={handleCancel} className="rounded p-1 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="serviceName">Service Name *</Label>
                <Input
                  id="serviceName"
                  value={formData.serviceName}
                  onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                  className={errors.serviceName ? 'border-red-500' : ''}
                />
                {errors.serviceName && <p className="text-red-500 text-sm mt-1">{errors.serviceName}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyPrice">Monthly Price (KES) *</Label>
                  <Input
                    id="monthlyPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.monthlyPrice}
                    onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                    className={errors.monthlyPrice ? 'border-red-500' : ''}
                  />
                  {errors.monthlyPrice && <p className="text-red-500 text-sm mt-1">{errors.monthlyPrice}</p>}
                </div>

                <div>
                  <Label htmlFor="oneTimePrice">One-time Price (KES) *</Label>
                  <Input
                    id="oneTimePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.oneTimePrice}
                    onChange={(e) => setFormData({ ...formData, oneTimePrice: e.target.value })}
                    className={errors.oneTimePrice ? 'border-red-500' : ''}
                  />
                  {errors.oneTimePrice && <p className="text-red-500 text-sm mt-1">{errors.oneTimePrice}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : editingPrice ? 'Update Price' : 'Add Price'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}