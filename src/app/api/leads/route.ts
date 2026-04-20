import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to Prisma when DB is ready
// import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, phone, role, message, partnerId } = body;

    // Validate required fields
    const errors: string[] = [];
    if (!firstName?.trim()) errors.push("firstName is required");
    if (!lastName?.trim()) errors.push("lastName is required");
    if (!email?.trim()) errors.push("email is required");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

    // TODO: Replace with Prisma create when DB is ready
    // const lead = await db.lead.create({
    //   data: { firstName, lastName, email, company, phone, role, message, partnerId },
    // });

    const lead = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      company: company || null,
      phone: phone || null,
      role: role || null,
      message: message || null,
      partnerId: partnerId || null,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
