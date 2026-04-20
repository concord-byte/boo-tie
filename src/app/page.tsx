import Image from "next/image";
import Link from "next/link";
import { PARTNERS } from "@/lib/partners";
import ContactForm from "@/components/ContactForm";
import QuickCapture from "@/components/QuickCapture";
import StickyCTA from "@/components/StickyCTA";
import ScrollAnimator from "@/components/ScrollAnimator";
import AudienceCards from "@/components/AudienceCards";

const STATS = [
  { number: "17+", label: "Years Experience" },
  { number: "50+", label: "Schools Served" },
  { number: "6", label: "National Brand Partners" },
];

const TESTIMONIALS = [
  {
    quote:
      "Their professionalism and attention to detail have allowed our projects come off without a hitch",
    name: "Mike Graefe",
    title: "Meridian (ID) High School Athletic Director",
  },
  {
    quote:
      "Kylene\u2019s approach is so consultative, a true partner",
    name: "Jennifer Ripley",
    title: "Valor Christian (GA) High School Booster Club President",
  },
];

export default function Home() {
  return (
    <>
      <StickyCTA />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#1a1a2e] to-navy overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center px-8 md:px-16 py-28 z-10">
            <Image
              src="/images/bowtie-logo-full.png"
              alt="BowTie School Partners — tying it all together"
              width={500}
              height={195}
              className="mb-10 brightness-200"
              priority
            />
            <p className="text-white/70 text-xl md:text-2xl leading-relaxed font-light mb-8">
              a network where schools,<br />
              best-in-class vendors and<br />
              respected brands all win together
            </p>
            <p className="text-gold/80 text-sm font-medium tracking-wide uppercase mb-10">
              Trusted by 50+ schools &amp; growing
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-block bg-gold hover:bg-gold-light text-navy font-semibold py-4 px-10 rounded-full hover:scale-105 transition-all duration-300 text-lg shadow-lg shadow-gold/20"
              >
                Connect with Ky
              </a>
              <a
                href="#how-it-works"
                className="inline-block border border-white/30 text-white/80 hover:text-white hover:border-white/60 font-medium py-4 px-10 rounded-full transition-all duration-300 text-lg"
              >
                See How It Works
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            <Image
              src="/images/hero-hands.jpg"
              alt="Team hands together"
              fill
              className="object-cover rounded-bl-[3rem]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/40 to-transparent" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-6 flex justify-center gap-16 md:gap-24">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gold">{s.number}</p>
                <p className="text-xs md:text-sm text-white/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 2. WHY WORK WITH US (value first) ═══ */}
      <section id="how-it-works" className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="mb-14">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Why Work with Us
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
                <span className="font-semibold text-gray-900">BowTie</span> is not an agency — it&apos;s a Platform, a Network, an Ecosystem of industry leaders.
              </p>
            </div>
          </ScrollAnimator>

          {/* Two-column: cards left, hub diagram right */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AudienceCards />
            <div className="hidden md:flex justify-center">
              <Image
                src="/images/hub-diagram.png"
                alt="BowTie ecosystem — Schools, Trusted Vendors, and National Brands connected through BowTie"
                width={912}
                height={607}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>
          </div>
          {/* Mobile: show diagram below cards */}
          <div className="md:hidden mt-10 flex justify-center">
            <Image
              src="/images/hub-diagram.png"
              alt="BowTie ecosystem"
              width={912}
              height={607}
              className="w-full h-auto drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ═══ 3. PARTNERS (proof it's real) ═══ */}
      <section id="partners" className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Our Partners
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We work only with the best brands, companies and people — strategic relationships that result in long-term wins.
              </p>
            </div>
          </ScrollAnimator>
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {PARTNERS.map((p) => (
              <Link
                key={p.slug}
                href={`/partners/${p.slug}`}
                className="group bg-white border-2 border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center hover:border-gold hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center justify-center min-h-[140px] mb-4">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={240}
                    height={150}
                    className="object-contain max-h-[130px] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-3">{p.description}</p>
                <span className="text-sm font-medium text-gold group-hover:text-gold-light transition-colors">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. TESTIMONIALS (social proof) ═══ */}
      <section id="testimonials" className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollAnimator>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 text-center mb-14">
              What Partners Say
            </h2>
          </ScrollAnimator>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <ScrollAnimator key={t.name}>
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
        </div>
      </section>

      {/* ═══ MID-PAGE QUICK CAPTURE ═══ */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-light text-white mb-3">
            Ready to explore a partnership?
          </h3>
          <p className="text-white/60 mb-8 text-sm">
            Tell us your role and we&apos;ll reach out with next steps.
          </p>
          <QuickCapture />
        </div>
      </section>

      {/* ═══ 5. ABOUT KYLENE (now they trust, personal story lands) ═══ */}
      <section id="about" className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div id="kylene" className="grid md:grid-cols-[280px_1fr] gap-16 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
                  About Us
                </h2>
                <Image
                  src="/images/kylene.png"
                  alt="Kylene Pippin"
                  width={280}
                  height={282}
                  className="rounded-2xl shadow-sm"
                />
              </div>
              <div className="md:pt-16">
                <p className="text-gray-600 leading-relaxed text-lg mb-5">
                  <span className="font-semibold text-gray-900">Kylene Pippin</span>, a strategist and relationship builder in the fundraising space, started{" "}
                  <span className="font-semibold text-gray-900">BowTie</span> after spending the last 17+ years helping schools and vendors work together more effectively.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  She brings a calm, thoughtful and deeply rational approach to every partnership — always prioritizing clarity, trust and long-term success for all parties involved.
                </p>
                <a
                  href="#testimonials"
                  className="text-sm font-medium text-gold hover:text-gold-light transition-colors duration-300"
                >
                  Read what partners say about working with Kylene &rarr;
                </a>
              </div>
            </div>
          </ScrollAnimator>

          <div className="my-14 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <ScrollAnimator>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
                What&apos;s in a Name
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                <span className="font-semibold text-gray-900">BowTie</span> is inspired by my sons, Bo and Ty — the original &ldquo;Bow&rdquo; and &ldquo;Tie.&rdquo; And while our equally cherished youngest son, Gage, isn&apos;t in the name, he already gets plenty of attention as the baby of the family.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                The name reflects the heart behind our work: tying together the people and partnerships that shape the future for kids like mine.
              </p>
            </div>
          </ScrollAnimator>

        </div>
      </section>

      {/* ═══ 6. CONTACT (full form) ═══ */}
      <section id="contact" className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-5">
                Let&apos;s Connect
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Ready to explore how BowTie can help your school, brand, or business? Drop us a line.
              </p>
            </div>
          </ScrollAnimator>
          <ContactForm />
        </div>
      </section>

      {/* ═══ IN HONOR OF BRUCE BROWN ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-center">
            <div>
              <p className="text-sm font-medium text-gold tracking-wide uppercase mb-3">
                A tribute
              </p>
              <h3 className="text-3xl md:text-4xl font-light text-gray-900 italic mb-4">
                in honor of<br />Bruce Brown
              </h3>
              <div className="w-16 h-px bg-gold/40" />
            </div>
            <div>
              <Image
                src="/images/bruce-brown.jpg"
                alt="In honor of Bruce Brown"
                width={710}
                height={410}
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
