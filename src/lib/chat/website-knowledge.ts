import {
  chatbotKnowledge,
  mainNav,
  marketingNavGroups,
  productItems,
  serviceItems,
  servicePricingData,
  solutionItems,
} from "@/lib/site-data";
import { connectToMongoose } from "@/lib/mongoose";
import { KnowledgePageModel } from "@/models/KnowledgePage";

type KnowledgeSnippet = {
  route: string;
  title: string;
  summary: string;
  content: string;
  sourceType: "scraped" | "generated";
};

type ScrapedKnowledgeSnippet = KnowledgeSnippet & {
  url: string;
  headings: string[];
};

function decodeHtmlEntities(input: string) {
  return input
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(html: string) {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
}

function extractTagText(html: string, tag: string) {
  return (
    html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1] ||
    ""
  );
}

function extractHeadings(html: string) {
  return Array.from(html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi))
    .map((match) => stripHtml(match[1]))
    .filter(Boolean)
    .slice(0, 12);
}

function getStaticKnowledgeSeed(): KnowledgeSnippet[] {
  const routes = Array.from(
    new Map(
      chatbotKnowledge.map((item) => [
        item.href,
        {
          route: item.href,
          title: item.title,
          summary: item.summary,
          content: item.summary,
          sourceType: "generated" as const,
        },
      ]),
    ).values(),
  );

  const pricing = servicePricingData.map((item) => ({
    route: `/pricing#${item.service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: item.service,
    summary: item.description,
    content: [
      item.description,
      ...item.tiers.map(
        (tier) =>
          `${tier.name}: starts at KSh ${tier.startingPrice}. ${tier.description}. Features: ${tier.features.join(", ")}`,
      ),
    ].join(" "),
    sourceType: "generated" as const,
  }));

  return [...routes, ...pricing];
}

function getDefaultRoutes() {
  const routeSet = new Set<string>([
    "/",
    "/about",
    "/contact",
    "/pricing",
    "/portfolio",
    "/faq",
    "/book-demo",
    "/process",
    ...mainNav.map((item) => item.href),
    ...marketingNavGroups.flatMap((group) => group.links.map((link) => link.href)),
    ...serviceItems.map((item) => item.href),
    ...solutionItems.map((item) => item.href),
    ...productItems.map((item) => item.href),
  ]);

  return Array.from(routeSet);
}

function summarizeText(text: string, maxLength = 320) {
  return text.length <= maxLength ? text : `${text.slice(0, maxLength).trim()}...`;
}

async function scrapeRoute(baseUrl: string, route: string): Promise<ScrapedKnowledgeSnippet | null> {
  const response = await fetch(new URL(route, baseUrl), {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const html = await response.text();
  const mainSection = extractTagText(html, "main") || extractTagText(html, "body");
  const title = stripHtml(extractTagText(html, "title"));
  const content = stripHtml(mainSection);

  if (!content) {
    return null;
  }

  return {
    route,
    url: new URL(route, baseUrl).toString(),
    title: title || route,
    summary: summarizeText(content),
    content: content.slice(0, 4000),
    headings: extractHeadings(mainSection),
    sourceType: "scraped",
  };
}

export async function syncWebsiteKnowledge(baseUrl: string) {
  await connectToMongoose();

  const routes = getDefaultRoutes();
  const results = await Promise.allSettled(routes.map((route) => scrapeRoute(baseUrl, route)));
  const successfulPages = results
    .filter((result): result is PromiseFulfilledResult<Awaited<ReturnType<typeof scrapeRoute>>> => result.status === "fulfilled")
    .map((result) => result.value)
    .filter(
      (
        page,
      ): page is NonNullable<Awaited<ReturnType<typeof scrapeRoute>>> => page !== null,
    );

  for (const page of successfulPages) {
    await KnowledgePageModel.findOneAndUpdate(
      { route: page.route },
      {
        route: page.route,
        url: page.url,
        title: page.title,
        summary: page.summary,
        content: page.content,
        headings: page.headings,
        sourceType: page.sourceType,
        syncedAt: new Date(),
      },
      { upsert: true, new: true },
    );
  }

  return {
    totalRoutes: routes.length,
    syncedPages: successfulPages.length,
    failedRoutes:
      routes.length -
      successfulPages.length,
  };
}

export async function getKnowledgeContextForQuery(query: string) {
  await connectToMongoose();

  const storedPages = await KnowledgePageModel.find({})
    .sort({ syncedAt: -1 })
    .limit(80)
    .lean();

  const sources: KnowledgeSnippet[] =
    storedPages.length > 0
      ? storedPages.map((page) => ({
          route: page.route,
          title: page.title,
          summary: page.summary,
          content: page.content,
          sourceType: page.sourceType,
        }))
      : getStaticKnowledgeSeed();

  const queryTerms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((term) => term.length > 2);

  const scored = sources
    .map((source) => {
      const haystack =
        `${source.title} ${source.summary} ${source.content} ${source.route}`.toLowerCase();
      const score = queryTerms.reduce((total, term) => {
        if (haystack.includes(term)) {
          return total + 1;
        }

        return total;
      }, 0);

      return { source, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(
      ({ source }) =>
        `Route: ${source.route}\nTitle: ${source.title}\nSummary: ${source.summary}\nContent: ${source.content.slice(0, 900)}`,
    );

  if (scored.length > 0) {
    return scored.join("\n\n");
  }

  return getStaticKnowledgeSeed()
    .slice(0, 4)
    .map(
      (source) =>
        `Route: ${source.route}\nTitle: ${source.title}\nSummary: ${source.summary}`,
    )
    .join("\n\n");
}

export async function getKnowledgeSyncStatus() {
  await connectToMongoose();

  const count = await KnowledgePageModel.countDocuments();
  const latestPage = await KnowledgePageModel.findOne({})
    .sort({ syncedAt: -1 })
    .lean();

  return {
    count,
    lastSyncedAt: latestPage?.syncedAt?.toISOString() || null,
  };
}
