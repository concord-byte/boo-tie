import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata = {
  title: "Testimonials — BowTie School Partners",
};

const TESTIMONIALS = [
  {
    quote:
      "I have had the distinct pleasure of knowing and working with Ky for over 15 years. What began as a strategic business partnership, one that has significantly elevated the Kettering Fairmont Athletic Programs, has evolved into a valued, lifelong friendship. Ky truly understands the power of authentic connection; she works tirelessly to support her partners and possesses a rare dedication to seeing them succeed over the long term.",
    name: "Chris Weaver",
    title: "CAA — Fairmont Athletic Department",
  },
  {
    quote:
      "Kylene is an absolute gem. Within minutes, it felt like I was brainstorming Booster fundraising ideas with a lifelong friend. She has a gift for connecting on a personal level while maintaining total professionalism. She quickly saw into our school's heart and unique needs to offer creative, actionable solutions. This isn't just another lead-generation service; Kylene provides a truly comprehensive consultancy. My only regret is not reaching out sooner!",
    name: "Jennifer Ripley",
    title: "Valor Christian Academy Athletics Booster Club",
  },
  {
    quote:
      "Working with Ky has been revolutionary in increasing opportunities for students. Her visionary approach to creating partnerships has empowered students to thrive and succeed. Ky's dedication to collaboration is truly inspiring.",
    name: "Tom Burton",
    title: "Former Superintendent & WeEmpowerLLC Founder",
  },
  {
    quote:
      "Kylene Pippin has provided phenomenal guidance and customer service with each project.",
    name: "Chuck Jaco",
    title: "Perrysburg High School, OH Athletic Director",
  },
  {
    quote:
      "Kylene Pippin is a great representative to work with and is very attentive to our needs!",
    name: "Jeff Cassella",
    title: "Mentor High School, OH Athletic Director",
  },
  {
    quote:
      "Lakota West has worked with Ky for more than a decade, and her leadership has consistently delivered meaningful results for our athletic department. Through her guidance, we generated significant revenue that allowed us to upgrade scoreboards, scorer’s tables, and make important facility improvements that directly benefited our student-athletes.\n\nKy has always been accessible, solutions-oriented, and committed to supporting our needs. Her professionalism and follow-through made a real difference for Lakota West, and I’ve appreciated the partnership we built over the years.",
    name: "Scott Kaufman",
    title:
      "Retired Athletic Director, Lakota West High School (OH); OHSAA Board Member",
  },
];

type CardStyle = "navy" | "light" | "gold";
const CARD_STYLES: CardStyle[] = ["navy", "light", "gold", "navy", "light", "gold"];

function getCardClasses(style: CardStyle) {
  switch (style) {
    case "navy":
      return "bg-navy text-white";
    case "gold":
      return "bg-gold/15 border border-gold/25 text-gray-900";
    case "light":
    default:
      return "bg-gray-100 text-gray-900";
  }
}

function getQuoteColor(style: CardStyle) {
  switch (style) {
    case "navy":
      return "text-gold/40";
    case "gold":
      return "text-gold/50";
    default:
      return "text-gold/30";
  }
}

function getTextColor(style: CardStyle) {
  return style === "navy" ? "text-white/80" : "text-gray-600";
}

function getNameColor(style: CardStyle) {
  return style === "navy" ? "text-gold" : "text-navy";
}

function getTitleColor(style: CardStyle) {
  return style === "navy" ? "text-white/60" : "text-gray-500";
}

export default function TestimonialsPage() {
  return (
    <div className="pt-16">
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real Relationships. Real Results.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Hear from the people we work with.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          {TESTIMONIALS.map((t, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            return (
              <ScrollAnimator key={i}>
                <div
                  className={`rounded-2xl p-10 hover:shadow-lg transition-all duration-500 ${getCardClasses(style)}`}
                >
                  <span
                    className={`text-5xl font-serif leading-none block mb-3 ${getQuoteColor(style)}`}
                  >
                    &ldquo;
                  </span>
                  <p
                    className={`leading-relaxed italic text-lg mb-6 whitespace-pre-line ${getTextColor(style)}`}
                  >
                    {t.quote}
                  </p>
                  <div>
                    <p className={`font-bold ${getNameColor(style)}`}>
                      {t.name}
                    </p>
                    <p className={`text-sm ${getTitleColor(style)}`}>
                      {t.title}
                    </p>
                  </div>
                </div>
              </ScrollAnimator>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to join the network?
          </h2>
          <p className="text-white/70 mb-8">
            Connect with Kylene and see what BowTie can do for you.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-gold hover:bg-gold-light text-navy font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/30"
          >
            Connect with Ky
          </a>
        </div>
      </section>
    </div>
  );
}
