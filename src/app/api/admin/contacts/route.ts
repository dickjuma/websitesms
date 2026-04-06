import { NextRequest, NextResponse } from "next/server";

import { connectToMongoose } from "@/lib/mongoose";
import { LeadModel } from "@/models/Lead";

function getAdminToken(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: NextRequest) {
  try {
    const token = getAdminToken(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pageParam = request.nextUrl.searchParams.get("page");
    const limitParam = request.nextUrl.searchParams.get("limit");
    const searchParam = request.nextUrl.searchParams.get("search")?.trim() || "";
    const parsedPage = pageParam ? Number.parseInt(pageParam, 10) : 1;
    const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : 20;
    const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const limit =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, 100)
        : 20;
    const skip = (page - 1) * limit;

    await connectToMongoose();

    const safeSearch = searchParam ? escapeRegex(searchParam) : "";
    const query = safeSearch
      ? {
          $or: [
            { name: { $regex: safeSearch, $options: "i" } },
            { email: { $regex: safeSearch, $options: "i" } },
            { phone: { $regex: safeSearch, $options: "i" } },
          ],
        }
      : {};

    const [leads, total] = await Promise.all([
      LeadModel.find(query, {
        name: 1,
        email: 1,
        phone: 1,
        status: 1,
        createdAt: 1,
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      LeadModel.countDocuments(query),
    ]);

    const contacts = leads.map((lead) => ({
      id: lead._id.toString(),
      name: lead.name || "Anonymous",
      email: lead.email || "",
      phone: lead.phone || "",
      company: "",
      status: lead.status || "new",
      createdAt: lead.createdAt.toISOString(),
    }));

    return NextResponse.json({ contacts, total, page, limit });
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
