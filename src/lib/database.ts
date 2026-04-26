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
  phone?: string;
  company?: string;
  projectType: string;
  plan?: string;
  type?: string;
  price?: number | null;
  budget?: string;
  timeline?: string;
  message: string;
  leadQuality?: 'hot' | 'warm' | 'cold';
  timestamp: string;
  source?: string;
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

export interface Job {
  _id?: string;
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements: string;
  status: "active" | "draft" | "closed";
  createdAt: Date;
  postedAt?: Date;
}

export interface PricingPlan {
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

export interface PricingFeature {
  name: string;
  included: boolean | string;
  tooltip?: string;
}

export interface PricingService {
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

export async function getQuoteRequests(options?: { limit?: number; skip?: number; search?: string }): Promise<{ quotes: QuoteRequest[]; total: number }> {
  const { db } = await connectToDatabase();
  const collection = db.collection<QuoteRequest>("quote_requests");

  const query: Record<string, unknown> = {};
  if (options?.search) {
    const searchRegex = { $regex: options.search, $options: "i" };
    query.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { company: searchRegex },
      { projectType: searchRegex },
    ];
  }

  const [quotes, total] = await Promise.all([
    collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(options?.skip || 0)
      .limit(options?.limit || 20)
      .toArray(),
    collection.countDocuments(query),
  ]);

  return { quotes, total };
}

export async function getBookDemoSubmissions(options?: { limit?: number; skip?: number; search?: string }): Promise<{ demos: BookDemoSubmission[]; total: number }> {
  const { db } = await connectToDatabase();
  const collection = db.collection<BookDemoSubmission>("book_demo_requests");

  const query: Record<string, unknown> = {};
  if (options?.search) {
    const searchRegex = { $regex: options.search, $options: "i" };
    query.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { company: searchRegex },
      { serviceType: searchRegex },
    ];
  }

  const [demos, total] = await Promise.all([
    collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(options?.skip || 0)
      .limit(options?.limit || 20)
      .toArray(),
    collection.countDocuments(query),
  ]);

  return { demos, total };
}

export async function updateQuoteRequestStatus(id: string, status: QuoteRequest["status"]): Promise<void> {
  const { db } = await connectToDatabase();
  const collection = db.collection<QuoteRequest>("quote_requests");
  await collection.updateOne({ _id: id }, { $set: { status } });
}

export async function updateBookDemoStatus(id: string, status: BookDemoSubmission["status"]): Promise<void> {
  const { db } = await connectToDatabase();
  const collection = db.collection<BookDemoSubmission>("book_demo_requests");
  await collection.updateOne({ _id: id }, { $set: { status } });
}

export async function saveJob(data: Omit<Job, "_id" | "createdAt" | "postedAt">): Promise<Job> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Job>("jobs");

  const now = new Date();
  const job: Omit<Job, '_id'> = {
    ...data,
    createdAt: now,
    postedAt: data.status === "active" ? now : undefined,
  };

  const result = await collection.insertOne(job as Job);

  return {
    _id: result.insertedId.toString(),
    ...job,
  };
}

export async function updateJob(id: string, data: Partial<Omit<Job, "_id">>): Promise<Job | null> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Job>("jobs");

  try {
    const objectId = new ObjectId(id);

    const updateFields: Record<string, unknown> = { ...data };
    updateFields.postedAt = data.status === "active" && !data.postedAt ? new Date() : data.postedAt;

    await collection.updateOne({ _id: objectId }, { $set: updateFields });

    return await getJobById(id);
  } catch {
    return null;
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  const { db } = await connectToDatabase();

  try {
    const objectId = new ObjectId(id);
    return await db.collection<Job>('jobs').findOne({ _id: objectId });
  } catch {
    return null;
  }
}

export async function getJobs(options?: { status?: string; limit?: number; skip?: number }): Promise<{ jobs: Job[]; total: number }> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Job>("jobs");

  const query: Record<string, unknown> = {};
  if (options?.status && options.status !== 'all') {
    query.status = options.status;
  }

  const [jobs, total] = await Promise.all([
    collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(options?.skip || 0)
      .limit(options?.limit || 20)
      .toArray(),
    collection.countDocuments(query),
  ]);

  return { jobs, total };
}

export async function deleteJob(id: string): Promise<boolean> {
  const { db } = await connectToDatabase();

  try {
    const objectId = new ObjectId(id);
    const result = await db.collection<Job>('jobs').deleteOne({ _id: objectId });
    return result.deletedCount === 1;
  } catch {
    return false;
  }
}

export async function deletePricingService(id: string): Promise<boolean> {
  const { db } = await connectToDatabase();

  try {
    const objectId = new ObjectId(id);
    const result = await db.collection<PricingService>('pricing_services').deleteOne({ _id: objectId });
    return result.deletedCount === 1;
  } catch {
    return false;
  }
}

export async function getPricingServices(): Promise<PricingService[]> {
  const { db } = await connectToDatabase();
  const collection = db.collection<PricingService>("pricing_services");

  return collection.find({}).sort({ createdAt: 1 }).toArray();
}

export async function getPricingServiceBySlug(slug: string): Promise<PricingService | null> {
  const { db } = await connectToDatabase();
  const collection = db.collection<PricingService>("pricing_services");

  return collection.findOne({ slug });
}

export async function updatePricingService(id: string, data: Partial<PricingService>): Promise<PricingService | null> {
  const { db } = await connectToDatabase();
  const collection = db.collection<PricingService>("pricing_services");

  try {
    const objectId = new ObjectId(id);
    await collection.updateOne({ _id: objectId }, { $set: { ...data, updatedAt: new Date() } });
    return await collection.findOne({ _id: objectId });
  } catch {
    return null;
  }
}

export async function createPricingService(data: Omit<PricingService, "_id" | "createdAt" | "updatedAt">): Promise<PricingService> {
  const { db } = await connectToDatabase();
  const collection = db.collection<PricingService>("pricing_services");

  const now = new Date();
  const service: Omit<PricingService, '_id'> = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(service as PricingService);

  return {
    _id: result.insertedId.toString(),
    ...service,
  };
}

export interface ServicePrice {
  _id?: string;
  serviceName: string;
  description: string;
  monthlyPrice: number;
  oneTimePrice: number;
  category: string;
  features: {
    name: string;
    monthly: boolean | string;
    onetime: boolean | string;
    custom: boolean | string;
  }[];
  updatedAt: Date;
}

export interface PriceChangeAudit {
  _id?: string;
  servicePriceId: string;
  action: 'create' | 'update' | 'delete';
  oldData?: Partial<ServicePrice>;
  newData?: Partial<ServicePrice>;
  changedBy?: string; // Could be user ID or 'system'
  timestamp: Date;
  ipAddress?: string;
}

export async function getAllServicePrices(): Promise<ServicePrice[]> {
  const { db } = await connectToDatabase();
  return db.collection<ServicePrice>("service_prices").find({}).toArray();
}

export async function createServicePrice(data: Omit<ServicePrice, "_id" | "updatedAt">): Promise<ServicePrice> {
  const { db } = await connectToDatabase();
  const newItem: ServicePrice = {
    ...data,
    features: data.features || [],
    updatedAt: new Date(),
  };
  const result = await db.collection<ServicePrice>("service_prices").insertOne(newItem);
  return { ...newItem, _id: result.insertedId.toString() };
}

export async function updateServicePrice(id: string, data: Partial<ServicePrice>): Promise<boolean> {
  const { db } = await connectToDatabase();
  try {
    const result = await db.collection<ServicePrice>("service_prices").updateOne(
      { _id: new ObjectId(id) as any },
      { $set: { ...data, updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
  } catch {
    return false;
  }
}

export async function deleteServicePrice(id: string): Promise<boolean> {
  const { db } = await connectToDatabase();
  try {
    const result = await db.collection<ServicePrice>("service_prices").deleteOne({ _id: new ObjectId(id) as any });
    return result.deletedCount > 0;
  } catch {
    return false;
  }
}

export async function createPriceChangeAudit(data: Omit<PriceChangeAudit, "_id" | "timestamp">): Promise<void> {
  const { db } = await connectToDatabase();
  const collection = db.collection<PriceChangeAudit>("price_change_audits");

  await collection.insertOne({
    ...data,
    timestamp: new Date(),
  });
}

export async function getPriceChangeAudits(limit = 50): Promise<PriceChangeAudit[]> {
  const { db } = await connectToDatabase();
  const collection = db.collection<PriceChangeAudit>("price_change_audits");

  return collection
    .find({})
    .sort({ timestamp: -1 })
    .limit(limit)
    .toArray();
}

// Chat System Types and Functions
export type ChatState = "AI_ACTIVE" | "HUMAN_ACTIVE" | "WAITING" | "RESOLVED";
export type ChatPriority = "low" | "medium" | "high" | "urgent";
export type MessageSender = "user" | "ai" | "admin" | "system";

export interface Chat {
  _id?: string;
  id: string;
  userId: string; // Could be anonymous session ID or user ID
  userName?: string;
  userEmail?: string;
  userLocation?: string;
  state: ChatState;
  priority: ChatPriority;
  tags: string[];
  sentiment: "happy" | "neutral" | "angry";
  lastMessage: string;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  aiConfidence?: number;
  needsHuman?: boolean;
  assignedAdminId?: string;
  sessionId?: string; // For anonymous users
}

export interface ChatMessage {
  _id?: string;
  id: string;
  chatId: string;
  sender: MessageSender;
  content: string;
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "read";
  clientMessageId?: string;
  aiConfidence?: number;
  aiSuggestions?: string[];
  metadata?: Record<string, any>;
}

export interface ChatEvent {
  _id?: string;
  id: string;
  chatId: string;
  eventType: "ai_takeover" | "human_takeover" | "chat_resolved" | "user_joined" | "user_left" | "state_changed";
  data?: Record<string, any>;
  timestamp: Date;
  triggeredBy?: string; // admin ID or "system"
}

// Chat CRUD Operations
export async function createChat(data: Omit<Chat, "_id" | "createdAt" | "updatedAt" | "id">): Promise<Chat> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Chat>("chats");

  const now = new Date();
  const chatId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const chat: Omit<Chat, '_id'> = {
    ...data,
    id: chatId,
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(chat as Chat);

  return {
    _id: result.insertedId.toString(),
    ...chat,
  };
}

export async function getChatById(id: string): Promise<Chat | null> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Chat>("chats");

  return collection.findOne({ id });
}

export async function updateChatState(chatId: string, state: ChatState, adminId?: string): Promise<boolean> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Chat>("chats");

  const updateData: Partial<Chat> = {
    state,
    updatedAt: new Date(),
    assignedAdminId: state === "HUMAN_ACTIVE" ? adminId : undefined,
  };

  if (state === "RESOLVED") {
    updateData.resolvedAt = new Date();
  }

  const result = await collection.updateOne({ id: chatId }, { $set: updateData });
  return result.modifiedCount > 0;
}

export async function getActiveChats(options?: { limit?: number; skip?: number; state?: ChatState }): Promise<Chat[]> {
  const { db } = await connectToDatabase();
  const collection = db.collection<Chat>("chats");

  const query: Record<string, any> = {};
  if (options?.state) {
    query.state = options.state;
  } else {
    query.state = { $in: ["AI_ACTIVE", "HUMAN_ACTIVE", "WAITING"] };
  }

  return collection
    .find(query)
    .sort({ updatedAt: -1 })
    .skip(options?.skip || 0)
    .limit(options?.limit || 50)
    .toArray();
}

// Message CRUD Operations
export async function createMessage(data: Omit<ChatMessage, "_id" | "timestamp" | "id">): Promise<ChatMessage> {
  const { db } = await connectToDatabase();
  const collection = db.collection<ChatMessage>("chat_messages");

  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const message: Omit<ChatMessage, '_id'> = {
    ...data,
    id: messageId,
    timestamp: new Date(),
  };

  const result = await collection.insertOne(message as ChatMessage);

  // Update chat's last message
  await db.collection<Chat>("chats").updateOne(
    { id: data.chatId },
    {
      $set: {
        lastMessage: data.content,
        lastMessageAt: new Date(),
        updatedAt: new Date(),
      }
    }
  );

  return {
    _id: result.insertedId.toString(),
    ...message,
  };
}

export async function getMessagesByChatId(chatId: string, options?: { limit?: number; skip?: number }): Promise<ChatMessage[]> {
  const { db } = await connectToDatabase();
  const collection = db.collection<ChatMessage>("chat_messages");

  return collection
    .find({ chatId })
    .sort({ timestamp: 1 })
    .skip(options?.skip || 0)
    .limit(options?.limit || 50)
    .toArray();
}

export async function updateMessageStatus(messageId: string, status: ChatMessage["status"]): Promise<boolean> {
  const { db } = await connectToDatabase();
  const collection = db.collection<ChatMessage>("chat_messages");

  const result = await collection.updateOne({ id: messageId }, { $set: { status } });
  return result.modifiedCount > 0;
}

// Event Logging
export async function logChatEvent(data: Omit<ChatEvent, "_id" | "timestamp" | "id">): Promise<void> {
  const { db } = await connectToDatabase();
  const collection = db.collection<ChatEvent>("chat_events");

  const eventId = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await collection.insertOne({
    ...data,
    id: eventId,
    timestamp: new Date(),
  });
}
