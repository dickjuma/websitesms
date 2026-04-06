import { MongoClient, Db } from "mongodb";
import { connectMongoClientWithFallback } from "@/lib/mongo-connection";
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await connectMongoClientWithFallback();
  const db = client.db("sma_systems");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}

export interface ContactSubmission {
  _id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  serviceType?: string;
  createdAt: Date;
  status: "new" | "read" | "responded";
}

export interface NewsletterSubscriber {
  _id?: string;
  email: string;
  name?: string;
  subscribedAt: Date;
  unsubscribed: boolean;
}

export interface QuoteRequest {
  _id?: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
  createdAt: Date;
  status: "new" | "contacted" | "quoted";
}

export interface BookDemoSubmission {
  _id?: string;
  name: string;
  email: string;
  company: string;
  phone?: string | null;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  teamSize: string;
  notes?: string | null;
  createdAt: Date;
  status: "new" | "confirmed" | "completed" | "cancelled";
}

export async function saveContactSubmission(data: Omit<ContactSubmission, "_id" | "createdAt" | "status">): Promise<ContactSubmission> {
  const { db } = await connectToDatabase();
  const collection = db.collection<ContactSubmission>("contacts");

  const result = await collection.insertOne({
    ...data,
    createdAt: new Date(),
    status: "new",
  });

  return {
    _id: result.insertedId.toString(),
    ...data,
    createdAt: new Date(),
    status: "new",
  };
}

export async function saveNewsletterSubscriber(data: Omit<NewsletterSubscriber, "_id" | "subscribedAt" | "unsubscribed">): Promise<NewsletterSubscriber> {
  const { db } = await connectToDatabase();
  const collection = db.collection<NewsletterSubscriber>("newsletter_subscribers");

  // Check if already subscribed
  const existing = await collection.findOne({ email: data.email });
  if (existing && !existing.unsubscribed) {
    throw new Error("Email already subscribed");
  }

  const result = await collection.insertOne({
    ...data,
    subscribedAt: new Date(),
    unsubscribed: false,
  });

  return {
    _id: result.insertedId.toString(),
    ...data,
    subscribedAt: new Date(),
    unsubscribed: false,
  };
}

export async function saveQuoteRequest(data: Omit<QuoteRequest, "_id" | "createdAt" | "status">): Promise<QuoteRequest> {
  const { db } = await connectToDatabase();
  const collection = db.collection<QuoteRequest>("quote_requests");

  const result = await collection.insertOne({
    ...data,
    createdAt: new Date(),
    status: "new",
  });

  return {
    _id: result.insertedId.toString(),
    ...data,
    createdAt: new Date(),
    status: "new",
  };
}

export async function saveBookDemoSubmission(data: Omit<BookDemoSubmission, "_id" | "createdAt" | "status">): Promise<BookDemoSubmission> {
  const { db } = await connectToDatabase();
  const collection = db.collection<BookDemoSubmission>("book_demo_requests");

  const result = await collection.insertOne({
    ...data,
    createdAt: new Date(),
    status: "new",
  });

  return {
    _id: result.insertedId.toString(),
    ...data,
    createdAt: new Date(),
    status: "new",
  };
}
