export interface TestimonialDisplay {
  name: string;
  quote: string;
  title: string | null;
  isFeatured: boolean;
}

export const STATIC_TESTIMONIALS: TestimonialDisplay[] = [
  {
    quote:
      "I have had the distinct pleasure of knowing and working with Ky for over 15 years. What began as a strategic business partnership, one that has significantly elevated the Kettering Fairmont Athletic Programs, has evolved into a valued, lifelong friendship. Ky truly understands the power of authentic connection; she works tirelessly to support her partners and possesses a rare dedication to seeing them succeed over the long term.",
    name: "Chris Weaver",
    title: "CAA — Fairmont Athletic Department",
    isFeatured: false,
  },
  {
    quote:
      "Kylene is an absolute gem. Within minutes, it felt like I was brainstorming Booster fundraising ideas with a lifelong friend. She has a gift for connecting on a personal level while maintaining total professionalism. She quickly saw into our school's heart and unique needs to offer creative, actionable solutions. This isn't just another lead-generation service; Kylene provides a truly comprehensive consultancy. My only regret is not reaching out sooner!",
    name: "Jennifer Ripley",
    title: "Valor Christian Academy Athletics Booster Club",
    isFeatured: true,
  },
  {
    quote:
      "Working with Ky has been revolutionary in increasing opportunities for students. Her visionary approach to creating partnerships has empowered students to thrive and succeed. Ky's dedication to collaboration is truly inspiring.",
    name: "Tom Burton",
    title: "Former Superintendent & WeEmpowerLLC Founder",
    isFeatured: true,
  },
  {
    quote:
      "Kylene Pippin has provided phenomenal guidance and customer service with each project.",
    name: "Chuck Jaco",
    title: "Perrysburg High School, OH Athletic Director",
    isFeatured: false,
  },
  {
    quote:
      "Kylene Pippin is a great representative to work with and is very attentive to our needs!",
    name: "Jeff Cassella",
    title: "Mentor High School, OH Athletic Director",
    isFeatured: false,
  },
  {
    quote:
      "Lakota West has worked with Ky for more than a decade, and her leadership has consistently delivered meaningful results for our athletic department. Through her guidance, we generated significant revenue that allowed us to upgrade scoreboards, scorer's tables, and make important facility improvements that directly benefited our student-athletes.\n\nKy has always been accessible, solutions-oriented, and committed to supporting our needs. Her professionalism and follow-through made a real difference for Lakota West, and I've appreciated the partnership we built over the years.",
    name: "Scott Kaufman",
    title:
      "Retired Athletic Director, Lakota West High School (OH); OHSAA Board Member",
    isFeatured: false,
  },
];
