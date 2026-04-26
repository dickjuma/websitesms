import { ObjectId } from "mongodb";

import { listLeadsForDashboard, listLeadsForDashboardPage } from "@/lib/chat/service";
import { getKnowledgeSyncStatus } from "@/lib/chat/website-knowledge";
import { connectToDatabase } from "@/lib/database";
import {
  getChatbotAdminConfig,
  getDefaultChatbotAdminConfig,
  getDefaultSiteInfoSettings,
  getSiteInfoSettings,
  saveChatbotAdminConfig,
  saveSiteInfoSettings,
} from "@/lib/site-settings";

export async function getDefaultAboutContent() {
  const { db } = await connectToDatabase();

  const about = await db.collection("about_page").findOne({});
  if (about) return about;

  return {
    hero: {
      title: "About SMA Technologies",
      description:
        "Founded in Nairobi, SMA Technologies delivers end-to-end IT and software solutions for businesses that need secure, scalable, and practical systems.",
    },
    stats: [
      { value: "50+", label: "Projects Delivered", icon: "Code" },
      { value: "98%", label: "Client Retention", icon: "Heart" },
      { value: "24/7", label: "Support Available", icon: "Clock" },
      { value: "10+", label: "Years Combined Experience", icon: "Award" },
    ],
    mission:
      "To empower Kenyan and African businesses with secure, scalable, and affordable technology solutions that drive efficiency, growth, and innovation.",
    vision:
      "To be the most trusted technology partner for businesses across Africa through quality execution, transparency, and long-term impact.",
    values: [
      {
        title: "Integrity First",
        description:
          "We believe in honest communication, transparent pricing, and doing the right thing consistently.",
        icon: "Shield",
      },
      {
        title: "Technical Excellence",
        description:
          "We build secure, scalable, maintainable systems that hold up under real business use.",
        icon: "Zap",
      },
    ],
    services: [
      {
        title: "Custom Software Development",
        description: "Tailored business platforms for real workflows and teams.",
      },
      {
        title: "AI and Automation",
        description: "Practical AI assistants, workflows, and support automation.",
      },
    ],
    whyChooseUs: [
      {
        title: "Local Expertise, Global Standards",
        description:
          "We combine deep understanding of the Kenyan business landscape with world-class development practices.",
        icon: "Globe",
      },
    ],
  };
}

export async function getTeamMembers() {
  const { db } = await connectToDatabase();
  const team = await db.collection("team").find({}).sort({ order: 1, createdAt: -1 }).toArray();
  return team.map((member: any) => ({
    ...member,
    id: String(member._id || ""),
  }));
}

async function getAboutContent() {
  const { db } = await connectToDatabase();
  const about = await db.collection("about_page").findOne({});

  if (about) {
    return about;
  }

  const defaults = await getDefaultAboutContent();
  await db.collection("about_page").insertOne(defaults);
  return defaults;
}

export async function getAdminWorkspaceData() {
  const { db } = await connectToDatabase();

  const [
    contacts,
    quotes,
    newsletter,
    bookDemos,
    team,
    services,
    seo,
    chatbotQA,
    about,
    siteSettings,
    aiConfig,
    leads,
    knowledgeStatus,
  ] = await Promise.all([
    db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray(),
    db.collection("quote_requests").find({}).sort({ createdAt: -1 }).toArray(),
    db
      .collection("newsletter_subscribers")
      .find({})
      .sort({ subscribedAt: -1 })
      .toArray(),
    db.collection("book_demo_requests").find({}).sort({ createdAt: -1 }).toArray(),
    getTeamMembers(),
    db.collection("services").find({}).sort({ updatedAt: -1 }).toArray(),
    db.collection("seo_metadata").find({}).sort({ updatedAt: -1 }).toArray(),
    db.collection("chatbot_qa").find({}).sort({ order: 1, createdAt: -1 }).toArray(),
    getAboutContent(),
    getSiteInfoSettings(),
    getChatbotAdminConfig(),
    listLeadsForDashboard(),
    getKnowledgeSyncStatus(),
  ]);

  return {
    contacts,
    quotes,
    newsletter,
    bookDemos,
    team,
    services,
    seo,
    chatbotQA,
    about,
    siteSettings,
    aiConfig,
    leads,
    knowledgeStatus,
  };
}

export async function getAdminWorkspaceSummary() {
  const { db } = await connectToDatabase();

  const [
    contactsCount,
    quotesCount,
    bookDemosCount,
    teamCount,
    chatbotQACount,
    recentContacts,
    recentQuotes,
    recentBookDemos,
    leadSummary,
  ] = await Promise.all([
    db.collection("contacts").countDocuments({}),
    db.collection("quote_requests").countDocuments({}),
    db.collection("book_demo_requests").countDocuments({}),
    db.collection("team").countDocuments({}),
    db.collection("chatbot_qa").countDocuments({}),
    db
      .collection("contacts")
      .find(
        {},
        {
          projection: {
            name: 1,
            email: 1,
            subject: 1,
            message: 1,
            createdAt: 1,
          },
        },
      )
      .sort({ createdAt: -1 })
      .limit(4)
      .toArray(),
     db
       .collection("quote_requests")
       .find(
         {},
         {
           projection: {
             name: 1,
             company: 1,
             projectType: 1,
             createdAt: 1,
           },
         },
       )
      .sort({ createdAt: -1 })
      .limit(2)
      .toArray(),
    db
      .collection("book_demo_requests")
      .find(
        {},
        {
          projection: {
            name: 1,
            company: 1,
            email: 1,
            createdAt: 1,
          },
        },
      )
      .sort({ createdAt: -1 })
      .limit(2)
      .toArray(),
    listLeadsForDashboardPage({ page: 1, limit: 4 }),
  ]);

  return {
    contactsCount,
    quotesCount,
    bookDemosCount,
    teamCount,
    chatbotQACount,
    recentContacts,
    recentQuotes,
    recentBookDemos,
    recentLeads: leadSummary.leads,
    totalLeads: leadSummary.total,
  };
}

export async function saveAboutContent(data: Record<string, unknown>) {
  const { db } = await connectToDatabase();

  await db.collection("about_page").updateOne(
    {},
    { $set: { ...data, updatedAt: new Date() } },
    { upsert: true },
  );

  return getAboutContent();
}

export async function updateAdminRecord(params: {
  resource: string;
  id?: string;
  data: Record<string, unknown>;
}) {
  const { db } = await connectToDatabase();

  switch (params.resource) {
    case "siteSettings":
      return saveSiteInfoSettings(params.data);
    case "aiConfig":
      return saveChatbotAdminConfig(params.data);
    case "about":
      return saveAboutContent(params.data);
    case "services":
    case "team":
    case "seo":
    case "chatbotQA":
    case "contacts":
    case "quotes":
    case "bookDemos":
    case "newsletter": {
      const collectionMap: Record<string, string> = {
        services: "services",
        team: "team",
        seo: "seo_metadata",
        chatbotQA: "chatbot_qa",
        contacts: "contacts",
        quotes: "quote_requests",
        bookDemos: "book_demo_requests",
        newsletter: "newsletter_subscribers",
      };

      const collection = collectionMap[params.resource];

      if (!params.id) {
        throw new Error("Record id is required.");
      }

      await db.collection(collection).updateOne(
        { _id: new ObjectId(params.id) },
        { $set: { ...params.data, updatedAt: new Date() } },
      );

      return db.collection(collection).findOne({ _id: new ObjectId(params.id) });
    }
    default:
      throw new Error("Unsupported admin resource.");
  }
}

export async function createAdminRecord(params: {
  resource: string;
  data: Record<string, unknown>;
}) {
  const { db } = await connectToDatabase();

  const now = new Date();

  switch (params.resource) {
    case "services": {
      const payload = {
        isActive: true,
        order: 0,
        ...params.data,
        createdAt: now,
        updatedAt: now,
      };
      const result = await db.collection("services").insertOne(payload);
      return { ...payload, _id: result.insertedId.toString() };
    }
    case "team": {
      const payload = {
        isActive: true,
        order: 0,
        image: "/images/Devprofile.png",
        ...params.data,
        createdAt: now,
        updatedAt: now,
      };
      const result = await db.collection("team").insertOne(payload);
      return { ...payload, _id: result.insertedId.toString() };
    }
    case "seo": {
      const payload = {
        ogImage: "",
        canonicalUrl: "",
        keywords: [],
        ...params.data,
        createdAt: now,
        updatedAt: now,
      };
      const result = await db.collection("seo_metadata").insertOne(payload);
      return { ...payload, _id: result.insertedId.toString() };
    }
    case "chatbotQA": {
      const payload = {
        keywords: [],
        category: "general",
        order: 0,
        isActive: true,
        ...params.data,
        createdAt: now,
        updatedAt: now,
      };
      const result = await db.collection("chatbot_qa").insertOne(payload);
      return { ...payload, _id: result.insertedId.toString() };
    }
    default:
      throw new Error("Unsupported create resource.");
  }
}

export async function deleteAdminRecord(params: {
  resource: string;
  id: string;
}) {
  const { db } = await connectToDatabase();

  const collectionMap: Record<string, string> = {
    services: "services",
    team: "team",
    seo: "seo_metadata",
    chatbotQA: "chatbot_qa",
    contacts: "contacts",
    quotes: "quote_requests",
    bookDemos: "book_demo_requests",
    newsletter: "newsletter_subscribers",
  };

  const collection = collectionMap[params.resource];

  if (!collection) {
    throw new Error("Unsupported delete resource.");
  }

  await db.collection(collection).deleteOne({ _id: new ObjectId(params.id) });
}

export function getSafeAdminDefaults() {
  return {
    siteSettings: getDefaultSiteInfoSettings(),
    aiConfig: getDefaultChatbotAdminConfig(),
  };
}
