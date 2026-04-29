import ScrollAnimator from "@/components/ScrollAnimator";
import { getActiveTestimonials } from "@/lib/content";

export const metadata = {
  title: "Testimonials — BowTie School Partners",
};

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

export default async function TestimonialsPage() {
  const testimonials = await getActiveTestimonials();

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
          {testimonials.map((t, i) => {
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
