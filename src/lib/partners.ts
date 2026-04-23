export type PartnerTier = "premier" | "preferred";

export interface PartnerInfo {
  slug: string;
  name: string;
  logo: string;
  website: string | null;
  description: string;
  adCopy: string;
  tier: PartnerTier;
  waitlist?: boolean;
}

export const PARTNERS: PartnerInfo[] = [
  {
    slug: "luxedo",
    name: "Luxedo",
    logo: "/images/partner-luxedo.png",
    website: "https://www.luxedoprojection.com",
    description:
      "Pro-level projection solutions for schools, events, and athletic venues.",
    adCopy:
      "Luxedo — Pro-Level Projection. Transform your campus with immersive projection experiences.",
    tier: "premier",
  },
  {
    slug: "digital-scoreboards-ohio",
    name: "Digital Scoreboards Ohio",
    logo: "/images/partner-dso.png",
    website: "https://digitalscoreboardsohio.com",
    description:
      "Authorized dealer, installer, and service provider of scoreboards, video displays, and sound systems for sports venues throughout Ohio.",
    adCopy:
      "Digital Scoreboards Ohio — Your Gameday Partner. Boost your event impact with professional-grade AV equipment.",
    tier: "preferred",
  },
  {
    slug: "fundwillow",
    name: "FundWillow",
    logo: "/images/partner-fundwillow.png",
    website: null,
    description:
      "White-label fundraising platform for schools — donation management, campaign tools, and payment processing all under your brand.",
    adCopy:
      "FundWillow — the fundraising infrastructure that lets schools raise more, faster.",
    tier: "preferred",
    waitlist: true,
  },
];

export function getPartnerBySlug(slug: string): PartnerInfo | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}
