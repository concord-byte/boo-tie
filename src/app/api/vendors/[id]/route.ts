import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const prisma = getPrisma();
  const vendor = await prisma.vendor.findUnique({ where: { id } });

  if (!vendor) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(vendor);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const prisma = getPrisma();
    const vendor = await prisma.vendor.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        category: body.category ?? null,
        description: body.description ?? null,
        websiteUrl: body.websiteUrl ?? null,
        logoUrl: body.logoUrl ?? null,
        logoAlt: body.logoAlt ?? null,
        adCopy: body.adCopy ?? null,
        tier: body.tier,
        isActive: body.isActive,
        isPreferred: body.isPreferred,
        isComingSoon: body.isComingSoon,
        isWaitlist: body.isWaitlist,
        sortOrder: body.sortOrder,
      },
    });
    return NextResponse.json(vendor);
  } catch (err) {
    console.error("[api/vendors] Update failed:", err);
    return NextResponse.json({ error: "Failed to update vendor" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const prisma = getPrisma();
    await prisma.vendor.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/vendors] Delete failed:", err);
    return NextResponse.json({ error: "Failed to delete vendor" }, { status: 500 });
  }
}
