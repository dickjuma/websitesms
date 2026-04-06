import { NextRequest, NextResponse } from "next/server";

import { connectToMongoose } from "@/lib/mongoose";
import { VisitorModel } from "@/models/Visitor";

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
    const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : 50;
    const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const limit =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, 100)
        : 50;
    const skip = (page - 1) * limit;

    await connectToMongoose();

    const safeSearch = searchParam ? escapeRegex(searchParam) : "";
    const query = safeSearch
      ? {
          $or: [
            { visitorId: { $regex: safeSearch, $options: "i" } },
            { ipAddress: { $regex: safeSearch, $options: "i" } },
            { timezone: { $regex: safeSearch, $options: "i" } },
          ],
        }
      : {};

    const [visitors, total] = await Promise.all([
      VisitorModel.find(
        query,
        {
          visitorId: 1,
          ipAddress: 1,
          deviceType: 1,
          timezone: 1,
          visitCount: 1,
          lastSeenAt: 1,
        },
      )
        .sort({ lastSeenAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      VisitorModel.countDocuments(query),
    ]);

    const result = visitors.map((v) => ({
      id: v._id.toString(),
      visitorId: v.visitorId,
      ipAddress: v.ipAddress || "",
      deviceType: v.deviceType || "desktop",
      timezone: v.timezone || "",
      visitCount: v.visitCount || 1,
      lastSeenAt: v.lastSeenAt.toISOString(),
      pagesVisited: [],
    }));

    return NextResponse.json({ visitors: result, total, page, limit });
  } catch (error) {
    console.error("Failed to fetch visitors:", error);
    return NextResponse.json(
      { error: "Failed to fetch visitors" },
      { status: 500 }
    );
  }
}
