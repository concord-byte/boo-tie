import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import { PARTNERS, type PartnerInfo } from "@/lib/partners";
import {
  STATIC_TESTIMONIALS,
  type TestimonialDisplay,
} from "@/lib/testimonials-static";

export interface VendorDisplay {
  slug: string;
  name: string;
  logoUrl: string;
  logoAlt: string | null;
  websiteUrl: string | null;
  description: string;
  adCopy: string | null;
  tier: string;
  isComingSoon: boolean;
  isWaitlist: boolean;
}

export type { TestimonialDisplay };

function partnerToVendorDisplay(p: PartnerInfo): VendorDisplay {
  return {
    slug: p.slug,
    name: p.name,
    logoUrl: p.logo,
    logoAlt: null,
    websiteUrl: p.website,
    description: p.description,
    adCopy: p.adCopy,
    tier: p.tier,
    isComingSoon: p.comingSoon ?? false,
    isWaitlist: p.waitlist ?? false,
  };
}

export async function getActiveVendors(): Promise<VendorDisplay[]> {
  if (!isDatabaseConfigured()) {
    return PARTNERS.map(partnerToVendorDisplay);
  }

  try {
    const prisma = getPrisma();
    const rows = await prisma.vendor.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    if (rows.length > 0) {
      return rows.map((v) => ({
        slug: v.slug,
        name: v.name,
        logoUrl: v.logoUrl || "/images/partner-placeholder.svg",
        logoAlt: v.logoAlt,
        websiteUrl: v.websiteUrl,
        description: v.description || "",
        adCopy: v.adCopy,
        tier: v.tier,
        isComingSoon: v.isComingSoon,
        isWaitlist: v.isWaitlist,
      }));
    }
  } catch (err) {
    console.error(
      "[content] vendor query failed, using static fallback:",
      err instanceof Error ? err.message : "unknown"
    );
  }

  return PARTNERS.map(partnerToVendorDisplay);
}

export async function getVendorBySlug(
  slug: string
): Promise<VendorDisplay | undefined> {
  if (!isDatabaseConfigured()) {
    const p = PARTNERS.find((x) => x.slug === slug);
    return p ? partnerToVendorDisplay(p) : undefined;
  }

  try {
    const prisma = getPrisma();
    const v = await prisma.vendor.findUnique({ where: { slug } });
    if (v && v.isActive) {
      return {
        slug: v.slug,
        name: v.name,
        logoUrl: v.logoUrl || "/images/partner-placeholder.svg",
        logoAlt: v.logoAlt,
        websiteUrl: v.websiteUrl,
        description: v.description || "",
        adCopy: v.adCopy,
        tier: v.tier,
        isComingSoon: v.isComingSoon,
        isWaitlist: v.isWaitlist,
      };
    }
  } catch (err) {
    console.error(
      "[content] vendor lookup failed, using static fallback:",
      err instanceof Error ? err.message : "unknown"
    );
  }

  const p = PARTNERS.find((x) => x.slug === slug);
  return p ? partnerToVendorDisplay(p) : undefined;
}

export async function getActiveTestimonials(): Promise<TestimonialDisplay[]> {
  if (!isDatabaseConfigured()) {
    return STATIC_TESTIMONIALS;
  }

  try {
    const prisma = getPrisma();
    const rows = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    if (rows.length > 0) {
      return rows.map((t) => ({
        name: t.name,
        quote: t.quote,
        title: t.title,
        isFeatured: t.isFeatured,
      }));
    }
  } catch (err) {
    console.error(
      "[content] testimonial query failed, using static fallback:",
      err instanceof Error ? err.message : "unknown"
    );
  }

  return STATIC_TESTIMONIALS;
}

export async function getFeaturedTestimonials(): Promise<TestimonialDisplay[]> {
  if (!isDatabaseConfigured()) {
    return STATIC_TESTIMONIALS.filter((t) => t.isFeatured);
  }

  try {
    const prisma = getPrisma();
    const rows = await prisma.testimonial.findMany({
      where: { isActive: true, isFeatured: true },
      orderBy: { sortOrder: "asc" },
    });

    if (rows.length > 0) {
      return rows.map((t) => ({
        name: t.name,
        quote: t.quote,
        title: t.title,
        isFeatured: t.isFeatured,
      }));
    }
  } catch (err) {
    console.error(
      "[content] featured testimonial query failed, using static fallback:",
      err instanceof Error ? err.message : "unknown"
    );
  }

  return STATIC_TESTIMONIALS.filter((t) => t.isFeatured);
}
