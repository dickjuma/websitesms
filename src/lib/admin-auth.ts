import { NextRequest, NextResponse } from "next/server";

export function requireAdminAuth(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
