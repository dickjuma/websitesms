// Email Marketing System Database Schema
// MongoDB collections for newsletter subscriptions and email campaigns

import { ObjectId } from 'mongodb';
import { connectToDatabase } from './database';

export interface Subscriber {
  _id?: string;
  email: string;
  name?: string;
  source: string; // page URL where they subscribed
  sourceType: 'website_form' | 'popup_modal' | 'landing_page' | 'checkout' | 'contact_form';
  tags: string[]; // ['ERP', 'Kenya', 'Nairobi']
  segments: string[]; // ['active', 'high_value', 'inactive']
  subscriptionStatus: 'active' | 'unsubscribed' | 'bounced' | 'complained';
  consentGiven: boolean;
  consentTimestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  location?: {
    country: string;
    region: string;
    city: string;
  };
  interests: string[]; // ['ERP', 'POS', 'Custom Software']
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
  emailPreferences: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
    categories: string[]; // ['product_updates', 'tips', 'offers']
  };
}

export interface Campaign {
  _id?: string;
  name: string;
  subject: string;
  content: {
    html: string;
    text?: string;
  };
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'cancelled';
  type: 'newsletter' | 'promotional' | 'transactional' | 'automation';
  audience: {
    type: 'all' | 'segment' | 'tags' | 'custom';
    filters: {
      tags?: string[];
      segments?: string[];
      interests?: string[];
      locations?: string[];
      sources?: string[];
      dateRange?: {
        start: Date;
        end: Date;
      };
    };
    subscriberIds?: string[]; // for custom selections
  };
  schedule?: {
    sendAt: Date;
    timezone: string;
  };
  sender: {
    name: string;
    email: string;
  };
  tracking: {
    trackOpens: boolean;
    trackClicks: boolean;
    trackUnsubscribes: boolean;
  };
  metadata: {
    totalRecipients: number;
    sentCount: number;
    deliveredCount: number;
    openedCount: number;
    clickedCount: number;
    bouncedCount: number;
    unsubscribedCount: number;
    complainedCount: number;
  };
  createdBy: string; // admin user ID
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
}

export interface EmailSend {
  _id?: string;
  campaignId: string;
  subscriberId: string;
  email: string;
  status: 'queued' | 'sending' | 'sent' | 'delivered' | 'bounced' | 'complained';
  sentAt?: Date;
  deliveredAt?: Date;
  bouncedAt?: Date;
  bounceReason?: string;
  openedAt?: Date;
  clickedAt?: Date;
  unsubscribedAt?: Date;
  complainedAt?: Date;
  trackingData: {
    openPixelId?: string;
    clickLinks?: Array<{
      url: string;
      clickedAt?: Date;
      clickCount: number;
    }>;
  };
  retryCount: number;
  maxRetries: number;
  nextRetryAt?: Date;
}

export interface AutomationRule {
  _id?: string;
  name: string;
  description: string;
  trigger: {
    type: 'subscription' | 'page_visit' | 'email_click' | 'email_open' | 'inactive' | 'custom';
    conditions: {
      source?: string;
      tags?: string[];
      interests?: string[];
      timeDelay?: number; // minutes/hours/days
      eventData?: any;
    };
  };
  actions: Array<{
    type: 'send_email' | 'add_tag' | 'remove_tag' | 'update_segment' | 'webhook';
    config: {
      campaignId?: string;
      templateId?: string;
      tags?: string[];
      segment?: string;
      webhookUrl?: string;
    };
    delay?: number; // minutes after trigger
  }>;
  status: 'active' | 'paused' | 'draft';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  stats: {
    triggeredCount: number;
    completedCount: number;
    failedCount: number;
  };
}

export interface EmailTemplate {
  _id?: string;
  name: string;
  subject: string;
  content: {
    html: string;
    text?: string;
  };
  category: 'welcome' | 'newsletter' | 'promotional' | 'transactional' | 'automation';
  variables: string[]; // ['{{name}}', '{{email}}', '{{unsubscribe_link}}']
  thumbnail?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
}

// Utility functions for database operations
export async function createSubscriber(data: Omit<Subscriber, '_id' | 'createdAt' | 'updatedAt'>): Promise<Subscriber> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Subscriber>("subscribers");

  const now = new Date();
  const subscriber: Omit<Subscriber, '_id'> = {
    ...data,
    createdAt: now,
    updatedAt: now,
    lastActivityAt: now,
  };

  const result = await collection.insertOne(subscriber as Subscriber);
  return { ...subscriber, _id: result.insertedId.toString() };
}

export async function findSubscriberByEmail(email: string): Promise<Subscriber | null> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Subscriber>("subscribers");
  return collection.findOne({ email: email.toLowerCase() });
}

export async function updateSubscriber(id: string, updates: Partial<Subscriber>): Promise<boolean> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Subscriber>("subscribers");

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } }
  );

  return result.modifiedCount > 0;
}

export async function createCampaign(data: Omit<Campaign, '_id' | 'createdAt' | 'updatedAt'>): Promise<Campaign> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Campaign>("campaigns");

  const now = new Date();
  const campaign: Omit<Campaign, '_id'> = {
    ...data,
    createdAt: now,
    updatedAt: now,
    metadata: {
      totalRecipients: 0,
      sentCount: 0,
      deliveredCount: 0,
      openedCount: 0,
      clickedCount: 0,
      bouncedCount: 0,
      unsubscribedCount: 0,
      complainedCount: 0,
    }
  };

  const result = await collection.insertOne(campaign as Campaign);
  return { ...campaign, _id: result.insertedId.toString() };
}

