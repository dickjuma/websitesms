import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import { getQuoteRequests } from "@/lib/database";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
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

    const { quotes, total } = await getQuoteRequests({
      limit,
      skip,
      search: searchParam || undefined,
    });

    const formattedQuotes = quotes.map((q) => ({
      id: q._id,
      name: q.name,
      email: q.email,
      company: q.company || "",
      projectType: q.projectType,
      budget: q.budget || "",
      timeline: q.timeline || "",
      message: q.message,
      status: q.status,
      createdAt: q.createdAt instanceof Date ? q.createdAt.toISOString() : q.createdAt,
    }));

    return NextResponse.json({
      quotes: formattedQuotes,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}