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
      "Go get 'em, girl — You are going to do amazing things!! Our family is standing behind you in prayer :)",
    name: "Jennifer Ripley",
    title: "Valor Christian Academy Athletics Booster Club",
  },
  {
    quote:
      "Working with Ky has been revolutionary in increasing opportunities for students. Her visionary approach to creating partnerships has empowered students to thrive and succeed. Ky's dedication to collaboration is truly inspiring.",
    name: "Tom Burton",
    title: "Former Superintendent & WeEmpowerLLC Founder",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="pt-16">
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Real Relationships. Real Results.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Hear from the people we work with.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          {TESTIMONIALS.map((t, i) => (
            <ScrollAnimator key={i}>
              <div className="bg-gray-50 rounded-2xl p-10 hover:shadow-lg transition-all duration-500">
                <span className="text-5xl font-serif text-gold/30 leading-none block mb-3">
                  &ldquo;
                </span>
                <p className="text-gray-600 leading-relaxed italic text-lg mb-6">
                  {t.quote}
                </p>
                <div>
                  <p className="font-semibold text-navy">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3">
            Ready to join the network?
          </h2>
          <p className="text-gray-600 mb-8">
            Connect with Kylene and see what BowTie can do for you.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-gold hover:bg-gold-light text-navy font-semibold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300"
          >
            Connect with Ky
          </a>
        </div>
      </section>
    </div>
  );
}
