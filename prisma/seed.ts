import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const VENDORS = [
  { name: "Luxedo", slug: "luxedo", logo: "/images/partner-luxedo.png", website: "https://www.luxedoprojection.com", description: "Pro-level projection solutions for schools, events, and athletic venues.", adCopy: "Luxedo — Pro-Level Projection. Transform your campus with immersive projection experiences.", tier: "premier", comingSoon: false, waitlist: false },
  { name: "Digital Scoreboards Ohio", slug: "digital-scoreboards-ohio", logo: "/images/partner-dso.png", website: "https://digitalscoreboardsohio.com", description: "Authorized dealer, installer, and service provider of scoreboards, video displays, and sound systems for sports venues throughout Ohio.", adCopy: "Digital Scoreboards Ohio — Your Gameday Partner. Boost your event impact with professional-grade AV equipment.", tier: "preferred", comingSoon: false, waitlist: false },
  { name: "FundWillow", slug: "fundwillow", logo: "/images/partner-fundwillow-v2.png", website: null, description: "White-label fundraising platform for schools — donation management, campaign tools, and payment processing all under your brand.", adCopy: "FundWillow — the fundraising infrastructure that lets schools raise more, faster.", tier: "preferred", comingSoon: false, waitlist: true },
  { name: "Beacon Creative", slug: "beacon-creative", logo: "/images/partner-placeholder.svg", website: null, description: "Creative services and branding solutions for schools and athletic programs.", adCopy: "Beacon Creative — Elevating school brands through design and strategy.", tier: "preferred", comingSoon: true, waitlist: false },
  { name: "Sievert Electric", slug: "sievert-electric", logo: "/images/partner-placeholder.svg", website: null, description: "Electrical contracting and installation services for school facilities and venues.", adCopy: "Sievert Electric — Powering school facilities with reliable service.", tier: "preferred", comingSoon: true, waitlist: false },
  { name: "BlazeBite", slug: "blazebite", logo: "/images/partner-placeholder.svg", website: null, description: "Mobile ordering and concession management for school events and athletic venues.", adCopy: "BlazeBite — Streamlined concessions for school events.", tier: "preferred", comingSoon: true, waitlist: false },
  { name: "TeamUp", slug: "teamup", logo: "/images/partner-placeholder.svg", website: null, description: "Team management and coordination platform for athletic departments.", adCopy: "TeamUp — Bringing teams together with better coordination tools.", tier: "preferred", comingSoon: true, waitlist: false },
  { name: "We Empower LLC", slug: "we-empower-llc", logo: "/images/partner-placeholder.svg", website: null, description: "Empowering students and schools through strategic partnership development and leadership training.", adCopy: "We Empower LLC — Empowering the next generation of student leaders.", tier: "preferred", comingSoon: true, waitlist: false },
  { name: "OmniBox", slug: "omnibox", logo: "/images/partner-placeholder.svg", website: null, description: "Innovative solutions for school athletic programs and facilities.", adCopy: "OmniBox — Smart solutions for school athletics.", tier: "preferred", comingSoon: true, waitlist: false },
  { name: "Apparel", slug: "apparel", logo: "/images/partner-placeholder.svg", website: null, description: "Custom apparel and merchandise for schools and athletic programs.", adCopy: "Apparel — Custom gear for your school community.", tier: "preferred", comingSoon: true, waitlist: false },
];

const TESTIMONIALS = [
  { name: "Chris Weaver", title: "CAA — Fairmont Athletic Department", quote: "I have had the distinct pleasure of knowing and working with Ky for over 15 years. What began as a strategic business partnership, one that has significantly elevated the Kettering Fairmont Athletic Programs, has evolved into a valued, lifelong friendship. Ky truly understands the power of authentic connection; she works tirelessly to support her partners and possesses a rare dedication to seeing them succeed over the long term.", isFeatured: false },
  { name: "Jennifer Ripley", title: "Valor Christian Academy Athletics Booster Club", quote: "Kylene is an absolute gem. Within minutes, it felt like I was brainstorming Booster fundraising ideas with a lifelong friend. She has a gift for connecting on a personal level while maintaining total professionalism. She quickly saw into our school's heart and unique needs to offer creative, actionable solutions. This isn't just another lead-generation service; Kylene provides a truly comprehensive consultancy. My only regret is not reaching out sooner!", isFeatured: true },
  { name: "Tom Burton", title: "Former Superintendent & WeEmpowerLLC Founder", quote: "Working with Ky has been revolutionary in increasing opportunities for students. Her visionary approach to creating partnerships has empowered students to thrive and succeed. Ky's dedication to collaboration is truly inspiring.", isFeatured: true },
  { name: "Chuck Jaco", title: "Perrysburg High School, OH Athletic Director", quote: "Kylene Pippin has provided phenomenal guidance and customer service with each project.", isFeatured: false },
  { name: "Jeff Cassella", title: "Mentor High School, OH Athletic Director", quote: "Kylene Pippin is a great representative to work with and is very attentive to our needs!", isFeatured: false },
  { name: "Scott Kaufman", title: "Retired Athletic Director, Lakota West High School (OH); OHSAA Board Member", quote: "Lakota West has worked with Ky for more than a decade, and her leadership has consistently delivered meaningful results for our athletic department. Through her guidance, we generated significant revenue that allowed us to upgrade scoreboards, scorer's tables, and make important facility improvements that directly benefited our student-athletes.\n\nKy has always been accessible, solutions-oriented, and committed to supporting our needs. Her professionalism and follow-through made a real difference for Lakota West, and I've appreciated the partnership we built over the years.", isFeatured: false },
];

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Cannot seed.");
    process.exit(1);
  }

  console.log("Seeding vendors...");
  for (let i = 0; i < VENDORS.length; i++) {
    const v = VENDORS[i];
    await prisma.vendor.upsert({
      where: { slug: v.slug },
      update: {},
      create: {
        name: v.name,
        slug: v.slug,
        logoUrl: v.logo,
        websiteUrl: v.website,
        description: v.description,
        adCopy: v.adCopy,
        tier: v.tier,
        isActive: true,
        isComingSoon: v.comingSoon,
        isWaitlist: v.waitlist,
        sortOrder: i,
      },
    });
    console.log(`  ${v.name}`);
  }

  console.log("Seeding testimonials...");
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    const t = TESTIMONIALS[i];
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          quote: t.quote,
          name: t.name,
          title: t.title,
          isActive: true,
          isFeatured: t.isFeatured,
          sortOrder: i,
        },
      });
      console.log(`  ${t.name}`);
    } else {
      console.log(`  ${t.name} (exists, skipped)`);
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL || "kylene@bowtienetwork.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (adminPassword) {
    const hash = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { passwordHash: hash },
      create: {
        email: adminEmail,
        passwordHash: hash,
        name: "Kylene",
        role: "admin",
      },
    });
    console.log(`Admin user seeded: ${adminEmail}`);
  } else {
    console.log("ADMIN_SEED_PASSWORD not set — skipping admin user seed.");
    console.log("Set ADMIN_SEED_PASSWORD env var and re-run to create the admin login.");
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
