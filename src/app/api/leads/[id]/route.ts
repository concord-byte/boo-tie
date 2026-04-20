import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to Prisma when DB is ready
// import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // TODO: Replace with Prisma findUnique when DB is ready
  // const lead = await db.lead.findUnique({ where: { id } });

  const lead = {
    id,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    company: null,
    phone: null,
    role: null,
    message: null,
    partnerId: null,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(lead);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "status is required" },
        { status: 400 },
      );
    }

    const validStatuses = ["new", "contacted", "qualified", "converted", "lost"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${validStatuses.join(", ")}` },
        { status: 400 },
      );
    }

    // TODO: Replace with Prisma update when DB is ready
    // const lead = await db.lead.update({ where: { id }, data: { status } });

    const lead = {
      id,
      status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(lead);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
