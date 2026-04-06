import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import {
  listLeadsForDashboard,
  listLeadsForDashboardPage,
  listLiveChatLeads,
} from "@/lib/chat/service";

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const view = request.nextUrl.searchParams.get("view");
    const limitParam = request.nextUrl.searchParams.get("limit");
    const pageParam = request.nextUrl.searchParams.get("page");
    const searchParam = request.nextUrl.searchParams.get("search") || undefined;
    const qualificationParam =
      request.nextUrl.searchParams.get("qualification") || undefined;
    const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : undefined;
    const parsedPage = pageParam ? Number.parseInt(pageParam, 10) : undefined;
    const safeLimit =
      parsedLimit && Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, 500)
        : undefined;
    const safePage =
      parsedPage && Number.isFinite(parsedPage) && parsedPage > 0
        ? parsedPage
        : 1;

    if (view === "chat") {
      const leads = await listLiveChatLeads(safeLimit ?? 100);
      return NextResponse.json({ leads });
    }

    const qualification =
      qualificationParam === "HOT" ||
      qualificationParam === "WARM" ||
      qualificationParam === "COLD"
        ? qualificationParam
        : undefined;

    const hasPagingOrFilters =
      pageParam !== null ||
      limitParam !== null ||
      Boolean(searchParam) ||
      Boolean(qualification);

    if (hasPagingOrFilters) {
      const data = await listLeadsForDashboardPage({
        page: safePage,
        limit: safeLimit ?? 50,
        search: searchParam,
        qualification,
      });

      return NextResponse.json(data);
    }

    const leads = await listLeadsForDashboard();
    return NextResponse.json({ leads, total: leads.length });
  } catch (error) {
    console.error("Failed to fetch leads:", error);

    return NextResponse.json(
      { error: "Failed to fetch leads." },
      { status: 500 },
    );
  }
}
