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
  comingSoon?: boolean;
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
    logo: "/images/partner-fundwillow-v2.png",
    website: null,
    description:
      "White-label fundraising platform for schools — donation management, campaign tools, and payment processing all under your brand.",
    adCopy:
      "FundWillow — the fundraising infrastructure that lets schools raise more, faster.",
    tier: "preferred",
    waitlist: true,
  },
  {
    slug: "beacon-creative",
    name: "Beacon Creative",
    logo: "/images/partner-placeholder.svg",
    website: null,
    description:
      "Creative services and branding solutions for schools and athletic programs.",
    adCopy:
      "Beacon Creative — Elevating school brands through design and strategy.",
    tier: "preferred",
    comingSoon: true,
  },
  {
    slug: "sievert-electric",
    name: "Sievert Electric",
    logo: "/images/partner-placeholder.svg",
    website: null,
    description:
      "Electrical contracting and installation services for school facilities and venues.",
    adCopy:
      "Sievert Electric — Powering school facilities with reliable service.",
    tier: "preferred",
    comingSoon: true,
  },
  {
    slug: "blazebite",
    name: "BlazeBite",
    logo: "/images/partner-placeholder.svg",
    website: null,
    description:
      "Mobile ordering and concession management for school events and athletic venues.",
    adCopy:
      "BlazeBite — Streamlined concessions for school events.",
    tier: "preferred",
    comingSoon: true,
  },
  {
    slug: "teamup",
    name: "TeamUp",
    logo: "/images/partner-placeholder.svg",
    website: null,
    description:
      "Team management and coordination platform for athletic departments.",
    adCopy:
      "TeamUp — Bringing teams together with better coordination tools.",
    tier: "preferred",
    comingSoon: true,
  },
  {
    slug: "we-empower-llc",
    name: "We Empower LLC",
    logo: "/images/partner-placeholder.svg",
    website: null,
    description:
      "Empowering students and schools through strategic partnership development and leadership training.",
    adCopy:
      "We Empower LLC — Empowering the next generation of student leaders.",
    tier: "preferred",
    comingSoon: true,
  },
  {
    slug: "omnibox",
    name: "OmniBox",
    logo: "/images/partner-placeholder.svg",
    website: null,
    description:
      "Innovative solutions for school athletic programs and facilities.",
    adCopy:
      "OmniBox — Smart solutions for school athletics.",
    tier: "preferred",
    comingSoon: true,
  },
  {
    slug: "apparel",
    name: "Apparel",
    logo: "/images/partner-placeholder.svg",
    website: null,
    description:
      "Custom apparel and merchandise for schools and athletic programs.",
    adCopy:
      "Apparel — Custom gear for your school community.",
    tier: "preferred",
    comingSoon: true,
  },
];

export function getPartnerBySlug(slug: string): PartnerInfo | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}
