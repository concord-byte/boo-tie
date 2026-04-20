import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to Prisma when DB is ready
// import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const partnerId = searchParams.get("partnerId");
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  // TODO: Replace with Prisma query when DB is ready
  // const where: Record<string, string> = {};
  // if (partnerId) where.partnerId = partnerId;
  // if (status) where.status = status;
  // const leads = await db.lead.findMany({
  //   where,
  //   skip: (page - 1) * limit,
  //   take: limit,
  //   orderBy: { createdAt: "desc" },
  // });

  const mockLeads = [
    {
      id: "mock-1",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@school.edu",
      company: "Lincoln High School",
      phone: "(555) 123-4567",
      role: "Athletic Director",
      message: null,
      partnerId: "performall",
      status: "new",
      createdAt: new Date().toISOString(),
    },
  ];

  return NextResponse.json({
    data: mockLeads,
    meta: {
      page,
      limit,
      total: 1,
      filters: {
        partnerId: partnerId || null,
        status: status || null,
      },
    },
  });
}
