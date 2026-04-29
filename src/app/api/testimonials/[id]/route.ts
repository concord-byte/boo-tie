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
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(testimonial);
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
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        quote: body.quote,
        name: body.name,
        title: body.title ?? null,
        organization: body.organization ?? null,
        location: body.location ?? null,
        audienceType: body.audienceType ?? null,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
        sortOrder: body.sortOrder,
      },
    });
    return NextResponse.json(testimonial);
  } catch (err) {
    console.error("[api/testimonials] Update failed:", err);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
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
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/testimonials] Delete failed:", err);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
