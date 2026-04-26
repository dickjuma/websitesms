"use client";

import { useState, useEffect } from 'react';
import { Mail, Users, Send, TrendingUp, Plus, Search, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { SiteShell } from '@/components/layout/site-shell';
import Link from 'next/link';

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  source: string;
  status: string;
  tags: string[];
  segments: string[];
  createdAt: string;
  lastActivityAt: string;
}

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: string;
  type: string;
  sentAt?: string;
  createdAt: string;
  metadata: {
    totalRecipients: number;
    sentCount: number;
    deliveredCount: number;
    openedCount: number;
    clickedCount: number;
    bouncedCount: number;
  };
}

export default function EmailMarketingDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subscribers' | 'campaigns'>('overview');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');

  // Mock data for demonstration
  useEffect(() => {
    // In production, fetch from API
    setSubscribers([
      {
        id: '1',
        email: 'john@example.com',
        name: 'John Doe',
        source: '/pricing',
        status: 'active',
        tags: ['ERP', 'Kenya'],
        segments: ['active', 'high_value'],
        createdAt: '2024-01-15T10:00:00Z',
        lastActivityAt: '2024-01-20T14:30:00Z'
      },
      {
        id: '2',
        email: 'jane@company.com',
        name: 'Jane Smith',
        source: '/contact',
        status: 'active',
        tags: ['POS', 'Nairobi'],
        segments: ['active'],
        createdAt: '2024-01-10T09:15:00Z',
        lastActivityAt: '2024-01-18T11:45:00Z'
      }
    ]);

    setCampaigns([
      {
        id: '1',
        name: 'ERP Solutions Newsletter',
        subject: 'Discover Our Latest ERP Features',
        status: 'sent',
        type: 'newsletter',
        sentAt: '2024-01-15T10:00:00Z',
        createdAt: '2024-01-14T15:30:00Z',
        metadata: {
          totalRecipients: 150,
          sentCount: 150,
          deliveredCount: 145,
          openedCount: 67,
          clickedCount: 23,
          bouncedCount: 5
        }
      }
    ]);

    setLoading(false);
  }, []);

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = !searchTerm ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalSubscribers: subscribers.length,
    activeSubscribers: subscribers.filter(s => s.status === 'active').length,
    totalCampaigns: campaigns.length,
    sentCampaigns: campaigns.filter(c => c.status === 'sent').length,
    avgOpenRate: campaigns.length > 0
      ? Math.round(campaigns.reduce((sum, c) => sum + (c.metadata.openedCount / c.metadata.deliveredCount * 100), 0) / campaigns.length)
      : 0,
    avgClickRate: campaigns.length > 0
      ? Math.round(campaigns.reduce((sum, c) => sum + (c.metadata.clickedCount / c.metadata.deliveredCount * 100), 0) / campaigns.length)
      : 0
  };

  if (loading) {
    return (
      <SiteShell>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
                  <p className="mt-1 text-gray-600">Manage subscribers and email campaigns</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/admin/email/campaigns/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    New Campaign
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'subscribers', label: 'Subscribers', icon: Users },
                { id: 'campaigns', label: 'Campaigns', icon: Send }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalSubscribers}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeSubscribers}</p>
                    </div>
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.avgOpenRate}%</p>
                    </div>
                    <Eye className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.avgClickRate}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
                </div>
                <div className="p-6">
                  {campaigns.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No campaigns yet</p>
                  ) : (
                    <div className="space-y-4">
                      {campaigns.slice(0, 5).map(campaign => (
                        <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                            <p className="text-sm text-gray-600">{campaign.subject}</p>
                            <p className="text-xs text-gray-500">
                              Sent {campaign.sentAt ? new Date(campaign.sentAt).toLocaleDateString() : 'Not sent yet'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {campaign.metadata.openedCount}/{campaign.metadata.deliveredCount} opened
                            </p>
                            <p className="text-xs text-gray-600">
                              {campaign.metadata.clickedCount} clicks
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscribers' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search subscribers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="unsubscribed">Unsubscribed</option>
                      <option value="bounced">Bounced</option>
                    </select>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              </div>

              {/* Subscribers Table */}
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subscriber
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tags
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Activity
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubscribers.map(subscriber => (
                        <tr key={subscriber.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                              {subscriber.name && (
                                <div className="text-sm text-gray-500">{subscriber.name}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {subscriber.source}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              subscriber.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : subscriber.status === 'unsubscribed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {subscriber.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {subscriber.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                  {tag}
                                </span>
                              ))}
                              {subscriber.tags.length > 2 && (
                                <span className="text-xs text-gray-500">+{subscriber.tags.length - 2} more</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(subscriber.lastActivityAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              {/* Campaign List */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Email Campaigns</h3>
                    <Link
                      href="/admin/email/campaigns/new"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Create Campaign
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  {campaigns.length === 0 ? (
                    <div className="text-center py-8">
                      <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h4>
                      <p className="text-gray-600 mb-4">Create your first email campaign to engage with subscribers.</p>
                      <Link
                        href="/admin/email/campaigns/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Create Campaign
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {campaigns.map(campaign => (
                        <div key={campaign.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                              <p className="text-gray-600">{campaign.subject}</p>
                            </div>
                            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                              campaign.status === 'sent'
                                ? 'bg-green-100 text-green-800'
                                : campaign.status === 'sending'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {campaign.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Recipients</p>
                              <p className="text-lg font-semibold text-gray-900">{campaign.metadata.totalRecipients}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Opened</p>
                              <p className="text-lg font-semibold text-gray-900">
                                {campaign.metadata.openedCount} ({Math.round(campaign.metadata.openedCount / campaign.metadata.deliveredCount * 100) || 0}%)
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Clicked</p>
                              <p className="text-lg font-semibold text-gray-900">
                                {campaign.metadata.clickedCount} ({Math.round(campaign.metadata.clickedCount / campaign.metadata.deliveredCount * 100) || 0}%)
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Bounced</p>
                              <p className="text-lg font-semibold text-gray-900">{campaign.metadata.bouncedCount}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                              Created {new Date(campaign.createdAt).toLocaleDateString()}
                              {campaign.sentAt && ` • Sent ${new Date(campaign.sentAt).toLocaleDateString()}`}
                            </p>
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Report
                              </button>
                              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                                Duplicate
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}