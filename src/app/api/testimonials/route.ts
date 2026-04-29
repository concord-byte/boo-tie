import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  if (!getAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = getPrisma();
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(testimonials);
}

export async function POST(request: NextRequest) {
  if (!getAdminFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.quote || !body.name) {
      return NextResponse.json({ error: "Quote and name are required" }, { status: 400 });
    }

    const prisma = getPrisma();
    const testimonial = await prisma.testimonial.create({
      data: {
        quote: body.quote,
        name: body.name,
        title: body.title || null,
        organization: body.organization || null,
        location: body.location || null,
        audienceType: body.audienceType || null,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    console.error("[api/testimonials] Create failed:", err);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
