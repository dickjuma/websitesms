import { MongoClient, Db, ObjectId } from "mongodb";
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

export interface TeamMember {
  _id?: string | ObjectId;
  name: string;
  role: string;
  bio: string;
  image: string;
  department: string;
  linkedin?: string;
  email?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AboutPage {
  _id?: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  stats: { value: string; label: string; icon: string }[];
  mission: string;
  vision: string;
  values: { title: string; description: string; icon: string }[];
  services: { title: string; description: string }[];
  whyChooseUs: { title: string; description: string }[];
  cta: {
    title: string;
    description: string;
  };
  updatedAt: Date;
}

export interface ServiceContent {
  _id?: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  highlights: string[];
  capabilities: string[];
  outcomes: string[];
  considerations: string[];
  steps: { title: string; description: string }[];
  relatedLinks: { label: string; href: string }[];
  isActive: boolean;
  updatedAt: Date;
}

export interface ProductContent {
  _id?: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  features: string[];
  benefits: string[];
  pricing?: { name: string; price: string; features: string[] }[];
  cta: { title: string; buttonText: string };
  isActive: boolean;
  updatedAt: Date;
}

export interface SolutionContent {
  _id?: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  industries: string[];
  features: string[];
  caseStudies: { title: string; result: string }[];
  cta: { title: string; buttonText: string };
  isActive: boolean;
  updatedAt: Date;
}

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseStudy {
  _id?: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  coverImage: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobListing {
  _id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SEOMetadata {
  _id?: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  updatedAt: Date;
}

export interface ChatbotConfig {
  _id?: string;
  key: string;
  systemPrompt: string;
  knowledgeBase: string;
  temperature: number;
  maxTokens: number;
  enabled: boolean;
  updatedAt: Date;
}

export interface SiteSettings {
  _id?: string;
  key: string;
  value: unknown;
  updatedAt: Date;
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

export async function getAboutPage(): Promise<AboutPage | null> {
  const { db } = await connectToDatabase();
  return db.collection<AboutPage>("about_page").findOne({});
}

export async function updateAboutPage(data: Partial<AboutPage>): Promise<AboutPage> {
  const { db } = await connectToDatabase();
  await db.collection<AboutPage>("about_page").updateOne(
    {},
    { $set: { ...data, updatedAt: new Date() } },
    { upsert: true }
  );
  return (await getAboutPage())!;
}

export async function getAllServices(): Promise<ServiceContent[]> {
  const { db } = await connectToDatabase();
  return db.collection<ServiceContent>("services").find({}).toArray();
}

export async function getServiceBySlug(slug: string): Promise<ServiceContent | null> {
  const { db } = await connectToDatabase();
  return db.collection<ServiceContent>("services").findOne({ slug, isActive: true });
}

export async function updateService(slug: string, data: Partial<ServiceContent>): Promise<ServiceContent> {
  const { db } = await connectToDatabase();
  await db.collection<ServiceContent>("services").updateOne(
    { slug },
    { $set: { ...data, updatedAt: new Date() } },
    { upsert: true }
  );
  return (await getServiceBySlug(slug))!;
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const { db } = await connectToDatabase();
  return db.collection<TeamMember>("team").find({}).sort({ order: 1 }).toArray();
}

export async function createTeamMember(data: Omit<TeamMember, "_id" | "createdAt" | "updatedAt">): Promise<TeamMember> {
  const { db } = await connectToDatabase();
  const result = await db.collection<TeamMember>("team").insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { _id: result.insertedId.toString(), ...data, createdAt: new Date(), updatedAt: new Date() };
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
  const { db } = await connectToDatabase();
  const { ObjectId } = await import("mongodb");
  await db.collection<TeamMember>("team").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  );
  const member = await db.collection<TeamMember>("team").findOne({ _id: new ObjectId(id) });
  return member!;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const { db } = await connectToDatabase();
  const { ObjectId } = await import("mongodb");
  await db.collection("team").deleteOne({ _id: new ObjectId(id) });
}
