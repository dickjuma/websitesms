import { NextRequest, NextResponse } from "next/server";

import {
  createAdminRecord,
  deleteAdminRecord,
  getAdminWorkspaceData,
  getAdminWorkspaceSummary,
  updateAdminRecord,
} from "@/lib/admin/workspace";
import { requireAdminAuth } from "@/lib/admin-auth";
import { sendAdminReplyEmail } from "@/lib/email";

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const summaryOnly = request.nextUrl.searchParams.get("summary") === "true";
    const data = summaryOnly
      ? await getAdminWorkspaceSummary()
      : await getAdminWorkspaceData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Failed to fetch admin workspace data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch admin workspace data." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const { resource, id, data } = await request.json();

    if (!resource || !data) {
      return NextResponse.json(
        { success: false, message: "resource and data are required." },
        { status: 400 },
      );
    }

    const result = await updateAdminRecord({
      resource,
      id,
      data,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to update admin record:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update admin record." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();

    if (body.action === "reply") {
      const { to, subject, message, resource, id } = body;

      if (!to || !subject || !message) {
        return NextResponse.json(
          { success: false, message: "to, subject, and message are required." },
          { status: 400 },
        );
      }

      await sendAdminReplyEmail({ to, subject, message });

      if (resource && id) {
        await updateAdminRecord({
          resource,
          id,
          data:
            resource === "newsletter"
              ? { unsubscribed: false }
              : { status: "responded" },
        });
      }

      return NextResponse.json({ success: true });
    }

    const { resource, data } = body;

    if (!resource || !data) {
      return NextResponse.json(
        { success: false, message: "resource and data are required." },
        { status: 400 },
      );
    }

    const result = await createAdminRecord({
      resource,
      data,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to create admin record:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create admin record." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const { searchParams } = request.nextUrl;
    const resource = searchParams.get("resource");
    const id = searchParams.get("id");

    if (!resource || !id) {
      return NextResponse.json(
        { success: false, message: "resource and id are required." },
        { status: 400 },
      );
    }

    await deleteAdminRecord({ resource, id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete admin record:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete admin record." },
      { status: 500 },
    );
  }
}
