import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import { getBookDemoSubmissions } from "@/lib/database";

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

    const { demos, total } = await getBookDemoSubmissions({
      limit,
      skip,
      search: searchParam || undefined,
    });

    const formattedDemos = demos.map((d) => ({
      id: d._id,
      name: d.name,
      email: d.email,
      company: d.company,
      phone: d.phone || "",
      serviceType: d.serviceType,
      preferredDate: d.preferredDate,
      preferredTime: d.preferredTime,
      teamSize: d.teamSize,
      notes: d.notes || "",
      status: d.status,
      createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt,
    }));

    return NextResponse.json({
      demos: formattedDemos,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Failed to fetch demos:", error);
    return NextResponse.json(
      { error: "Failed to fetch demos" },
      { status: 500 }
    );
  }
}