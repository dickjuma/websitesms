import { NextRequest, NextResponse } from "next/server";

import { requireAdminAuth } from "@/lib/admin-auth";
import { connectToMongoose } from "@/lib/mongoose";
import { LeadModel } from "@/models/Lead";
import { MessageModel } from "@/models/Message";
import { VisitorModel } from "@/models/Visitor";

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);

  if (authError) {
    return authError;
  }

  try {
    const period = request.nextUrl.searchParams.get("period") || "7d";
    const days = period === "30d" ? 30 : period === "90d" ? 90 : 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    await connectToMongoose();

    const [
      totalLeads,
      hotLeads,
      totalMessages,
      activeVisitors,
      leadStats,
      messageStats,
    ] = await Promise.all([
      LeadModel.countDocuments({ createdAt: { $gte: startDate } }),
      LeadModel.countDocuments({
        qualification: "HOT",
        createdAt: { $gte: startDate },
      }),
      MessageModel.countDocuments({ timestamp: { $gte: startDate } }),
      VisitorModel.countDocuments({
        lastSeenAt: { $gte: new Date(Date.now() - 300000) },
      }),
      LeadModel.aggregate<{
        _id: { date: string };
        count: number;
        totalLeadScore: number;
      }>([
        {
          $match: { createdAt: { $gte: startDate } },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
            },
            count: { $sum: 1 },
            totalLeadScore: { $sum: { $ifNull: ["$leadScore", 0] } },
          },
        },
        {
          $sort: { "_id.date": 1 },
        },
      ]),
      MessageModel.aggregate<{
        _id: { date: string };
        count: number;
      }>([
        {
          $match: { timestamp: { $gte: startDate } },
        },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.date": 1 },
        },
      ]),
    ]);

    const dailyLeads = leadStats.map((item) => ({
      date: item._id.date,
      count: item.count,
    }));

    const dailyChats = messageStats.map((item) => ({
      date: item._id.date,
      count: item.count,
    }));

    const totalLeadScore = leadStats.reduce(
      (sum, item) => sum + item.totalLeadScore,
      0,
    );

    const data = {
      totalLeads,
      hotLeads,
      totalChats: totalMessages,
      activeChats: activeVisitors,
      conversionRate: totalLeads > 0 ? Math.round((hotLeads / totalLeads) * 100) : 0,
      avgLeadScore: totalLeads > 0 ? Math.round(totalLeadScore / totalLeads) : 0,
      dailyLeads,
      dailyChats,
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
