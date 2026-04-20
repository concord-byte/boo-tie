export interface PartnerInfo {
  slug: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  adCopy: string;
}

export const PARTNERS: PartnerInfo[] = [
  {
    slug: "performall",
    name: "PerformAll",
    logo: "/partners/performall.svg",
    website: "https://www.performall.com",
    description:
      "Industry-leading athletic facilities and sports surfaces for schools and communities.",
    adCopy:
      "PerformAll delivers world-class athletic surfaces trusted by schools nationwide.",
  },
  {
    slug: "meridian",
    name: "Meridian",
    logo: "/partners/meridian.svg",
    website: "https://www.meridian.com",
    description:
      "Comprehensive school solutions for athletics, academics, and campus infrastructure.",
    adCopy:
      "Meridian — building better campuses for tomorrow's leaders.",
  },
  {
    slug: "musco-lighting",
    name: "Musco Lighting",
    logo: "/partners/musco.svg",
    website: "https://www.musco.com",
    description:
      "The global leader in sports lighting solutions for schools, colleges, and professional venues.",
    adCopy:
      "Musco Lighting — illuminating the game for over 40 years.",
  },
  {
    slug: "hudl",
    name: "Hudl",
    logo: "/partners/hudl.svg",
    website: "https://www.hudl.com",
    description:
      "Video analysis and performance tools empowering coaches and athletes at every level.",
    adCopy: "Hudl — see every play, coach every moment.",
  },
  {
    slug: "learfield",
    name: "Learfield",
    logo: "/partners/learfield.svg",
    website: "https://www.learfield.com",
    description:
      "The leader in collegiate athletics multimedia rights, marketing, and brand partnerships.",
    adCopy:
      "Learfield — powering the business of college athletics.",
  },
  {
    slug: "dynamic-sponsorship",
    name: "Dynamic Sponsorship",
    logo: "/partners/dynamic.svg",
    website: "https://www.dynamicsponsorship.com",
    description:
      "Strategic sponsorship consulting for schools looking to maximize campus revenue.",
    adCopy:
      "Dynamic Sponsorship — turning your campus into a revenue engine.",
  },
];

export function getPartnerBySlug(slug: string): PartnerInfo | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}
