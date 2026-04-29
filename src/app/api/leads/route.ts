import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LEADS_DIR = path.join(process.cwd(), "data", "leads");

async function ensureLeadsDir() {
  await fs.mkdir(LEADS_DIR, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, phone, role, message, partnerId } = body;

    const errors: string[] = [];
    if (!firstName?.trim()) errors.push("firstName is required");
    if (!lastName?.trim()) errors.push("lastName is required");
    if (!email?.trim()) errors.push("email is required");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
    }

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

    await ensureLeadsDir();
    const filename = `${lead.createdAt.replace(/[:.]/g, "-")}_${lead.id.slice(0, 8)}.json`;
    await fs.writeFile(
      path.join(LEADS_DIR, filename),
      JSON.stringify(lead, null, 2),
    );

    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
