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
    slug: "luxedo",
    name: "Luxedo",
    logo: "/images/partner-luxedo.png",
    website: "https://www.luxedoprojection.com",
    description:
      "Pro-level projection solutions for schools, events, and athletic venues.",
    adCopy:
      "Luxedo — Pro-Level Projection. Transform your campus with immersive projection experiences.",
  },
  {
    slug: "boostr-digital-displays",
    name: "Boostr Digital Displays",
    logo: "/images/partner-boostr.png",
    website: "https://booster.matthuszar.com/partners#faq",
    description:
      "Dynamic digital display solutions for schools, stadiums, and campus environments.",
    adCopy:
      "Boostr Digital Displays — powering the future of campus signage and sponsorship visibility.",
  },
  {
    slug: "bowtie-fundraising",
    name: "BowTie Fundraising",
    logo: "/images/partner-bowtie-fundraising.png",
    website: "https://www.bowtienetwork.com",
    description:
      "School fundraising solutions powered by the BowTie network — maximizing revenue for campuses nationwide.",
    adCopy:
      "BowTie Fundraising — turning school partnerships into sustainable campus revenue.",
  },
];

export function getPartnerBySlug(slug: string): PartnerInfo | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}
