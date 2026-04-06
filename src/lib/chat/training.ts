import { connectToDatabase } from "@/lib/database";
import {
  getChatbotAdminConfig,
  getSiteInfoSettings,
} from "@/lib/site-settings";

function scoreTextMatch(query: string, text: string) {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((term) => term.length > 2);

  const haystack = text.toLowerCase();

  return terms.reduce((score, term) => {
    if (haystack.includes(term)) {
      return score + 1;
    }

    return score;
  }, 0);
}

export async function getAiTrainingContext(query: string) {
  const [{ db }, siteInfo, aiConfig] = await Promise.all([
    connectToDatabase(),
    getSiteInfoSettings(),
    getChatbotAdminConfig(),
  ]);

  const [qaEntries, services, team] = await Promise.all([
    db.collection("chatbot_qa").find({ isActive: { $ne: false } }).toArray(),
    db.collection("services").find({ isActive: { $ne: false } }).limit(12).toArray(),
    db.collection("team").find({ isActive: { $ne: false } }).sort({ order: 1 }).limit(8).toArray(),
  ]);

  const matchedQa = qaEntries
    .map((entry) => ({
      entry,
      score: scoreTextMatch(
        query,
        `${entry.question} ${entry.answer} ${(entry.keywords || []).join(" ")}`,
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 5)
    .map(
      ({ entry }) =>
        `Q: ${entry.question}\nA: ${entry.answer}${entry.category ? `\nCategory: ${entry.category}` : ""}`,
    );

  const serviceContext = services
    .slice(0, 8)
    .map((service) =>
      [
        `Service: ${service.title || service.slug || "Service"}`,
        service.summary ? `Summary: ${service.summary}` : "",
        service.description ? `Description: ${service.description}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

  const teamContext = team
    .slice(0, 6)
    .map((member) =>
      [
        `Team member: ${member.name}`,
        member.role ? `Role: ${member.role}` : "",
        member.department ? `Department: ${member.department}` : "",
        member.bio ? `Bio: ${member.bio}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

  return [
    "Admin AI configuration:",
    `System prompt guidance: ${aiConfig.systemPrompt}`,
    `Business summary: ${aiConfig.businessSummary}`,
    `Pricing notes: ${aiConfig.pricingNotes}`,
    `Escalation: ${aiConfig.escalationMessage}`,
    `Qualification rules: ${aiConfig.qualificationRules}`,
    `Company facts: ${aiConfig.companyFacts.join(" | ")}`,
    `Service facts: ${aiConfig.serviceFacts.join(" | ")}`,
    "Company contact profile:",
    `Company: ${siteInfo.companyName}`,
    `Tagline: ${siteInfo.tagline}`,
    `Primary email: ${siteInfo.email}`,
    `Support email: ${siteInfo.supportEmail}`,
    `Sales email: ${siteInfo.salesEmail}`,
    `Phone: ${siteInfo.phone}`,
    `Address: ${siteInfo.address}`,
    matchedQa.length > 0 ? `Matched Q&A:\n${matchedQa.join("\n\n")}` : "",
    serviceContext.length > 0
      ? `Service catalog context:\n${serviceContext.join("\n\n")}`
      : "",
    teamContext.length > 0 ? `Team context:\n${teamContext.join("\n\n")}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}
