import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  if (!getAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = getPrisma();
  const vendors = await prisma.vendor.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(vendors);
}

export async function POST(request: NextRequest) {
  if (!getAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const slug =
      body.slug ||
      body.name
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    if (!body.name || !slug) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const prisma = getPrisma();
    const existing = await prisma.vendor.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "A vendor with this slug already exists" }, { status: 409 });
    }

    const vendor = await prisma.vendor.create({
      data: {
        name: body.name,
        slug,
        category: body.category || null,
        description: body.description || null,
        websiteUrl: body.websiteUrl || null,
        logoUrl: body.logoUrl || null,
        logoAlt: body.logoAlt || null,
        adCopy: body.adCopy || null,
        tier: body.tier || "preferred",
        isActive: body.isActive ?? true,
        isPreferred: body.isPreferred ?? false,
        isComingSoon: body.isComingSoon ?? false,
        isWaitlist: body.isWaitlist ?? false,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json(vendor, { status: 201 });
  } catch (err) {
    console.error("[api/vendors] Create failed:", err);
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 });
  }
}
