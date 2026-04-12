import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Public admin seeding is disabled. Use `npm run create-admin -- <email> <password> [name]` from the website folder.",
    },
    { status: 403 },
  );
}
