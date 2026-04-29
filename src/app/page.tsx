import Image from "next/image";
import Link from "next/link";
import { getActiveVendors, getFeaturedTestimonials } from "@/lib/content";
import ContactForm from "@/components/ContactForm";
import QuickCapture from "@/components/QuickCapture";
import StickyCTA from "@/components/StickyCTA";
import ScrollAnimator from "@/components/ScrollAnimator";
import AudienceCards from "@/components/AudienceCards";

const STEPS = [
  { title: "We Listen", desc: "Understand the school, vendor, or sponsor need" },
  { title: "We Match", desc: "Identify right-fit relationships and opportunities" },
  { title: "We Connect", desc: "Trusted introductions, not cold outreach" },
  { title: "We Support", desc: "Execution, placement, and growth" },
  { title: "We Build", desc: "Long-term partnerships, not one-off transactions" },
];

const TRUST_ITEMS = [
  { bold: "17+", label: "Years in K-12 Fundraising" },
  { bold: "1,000+", label: "Schools Served" },
  { bold: "Vetted", label: "Partner Network" },
  { bold: "Relationships", label: "First" },
];

export default async function Home() {
  const vendors = await getActiveVendors();
  const featuredTestimonials = await getFeaturedTestimonials();

  return (
    <>
      <StickyCTA />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/images/hero-hands.jpg"
          alt="Team hands together"
          fill
          className="object-cover object-[65%_40%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#1a1a2e]/70 to-[#1a1a2e]/30" />

        <div className="relative max-w-7xl mx-auto flex flex-col justify-center min-h-screen px-8 md:px-16 py-28 z-10">
          <Image
            src="/images/bowtie-logo-full.png"
            alt="BowTie School Partners — tying it all together"
            width={560}
            height={218}
            className="mb-10"
            priority
          />
          <p className="text-white/90 text-2xl md:text-3xl leading-relaxed font-light mb-8 max-w-xl">
            a network where schools, best-in-class vendors and respected brands all win together
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-block bg-gold hover:bg-gold-light text-navy font-bold py-4 px-10 rounded-full hover:scale-105 transition-all duration-300 text-lg shadow-lg shadow-gold/30"
            >
              Connect with Ky
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 2. TRUST BAND ═══ */}
      <section className="py-12 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-0">
            {TRUST_ITEMS.map((item, i) => (
              <div key={item.label} className="flex items-center">
                <div className="text-center px-6 md:px-10">
                  <p className="text-3xl font-extrabold text-navy">{item.bold}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1 font-medium">{item.label}</p>
                </div>
                {i < TRUST_ITEMS.length - 1 && (
                  <div className="hidden md:block w-px h-10 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-20 md:py-24 bg-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How BowTie Works
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                A repeatable system built on real relationships.
              </p>
            </div>
          </ScrollAnimator>

          <ScrollAnimator>
            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">
              <div className="hidden md:block absolute top-5 left-[10%] right-[10%] border-t-2 border-gold/30" />

              {STEPS.map((step, i) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gold text-navy rounded-full font-bold flex items-center justify-center text-base mb-4 relative z-10 shadow-md shadow-gold/20">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-navy mb-2 text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </ScrollAnimator>

          <ScrollAnimator>
            <p className="text-center italic text-gray-500 mt-14 max-w-2xl mx-auto">
              BowTie is more than networking — it&apos;s repeatable infrastructure built on real relationships.
            </p>
          </ScrollAnimator>
        </div>
      </section>

      {/* ═══ 4. AUDIENCE CARDS + HUB DIAGRAM ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[90rem] mx-auto px-6">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Who BowTie Serves
              </h2>
            </div>
          </ScrollAnimator>

          <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
            <AudienceCards />
            <div className="hidden md:flex justify-center items-center">
              <Image
                src="/images/hub-diagram.png"
                alt="BowTie ecosystem — Schools, Trusted Vendors, and National Brands connected through BowTie"
                width={912}
                height={607}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>
          </div>
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

      {/* ═══ 5. PARTNERS ═══ */}
      <section id="partners" className="py-20 md:py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Trusted by Schools and Partners Nationwide
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                We work only with the best — strategic relationships that create long-term wins.
              </p>
            </div>
          </ScrollAnimator>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {vendors.map((p) => {
              const inner = (
                <>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
                      p.tier === "premier"
                        ? "bg-gold/20 text-gold"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {p.tier === "premier" ? "Premier Partner" : "Preferred Vendor"}
                  </span>
                  <div className="flex items-center justify-center min-h-[140px] mb-4 bg-white rounded-xl p-4">
                    <Image
                      src={p.logoUrl}
                      alt={p.logoAlt || p.name}
                      width={240}
                      height={150}
                      className="object-contain max-h-[130px] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-sm text-white/70 mb-3">{p.description}</p>
                  {p.isWaitlist ? (
                    <span className="text-sm font-semibold text-green-300 bg-green-900/30 px-4 py-1.5 rounded-full">
                      Join the Waitlist
                    </span>
                  ) : p.isComingSoon ? (
                    <span className="text-sm font-medium text-white/50">
                      Coming Soon
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-gold group-hover:text-gold-light transition-colors">
                      Learn More &rarr;
                    </span>
                  )}
                </>
              );

              if (p.isWaitlist || p.isComingSoon) {
                return (
                  <div
                    key={p.slug}
                    className="group bg-white/5 border-2 border-white/10 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500 backdrop-blur-sm"
                  >
                    {inner}
                  </div>
                );
              }

              return (
                <Link
                  key={p.slug}
                  href={`/partners/${p.slug}`}
                  className={`group bg-white/5 border-2 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 backdrop-blur-sm ${
                    p.tier === "premier"
                      ? "border-gold/40 hover:border-gold"
                      : "border-white/10 hover:border-gold/50"
                  }`}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 6. TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollAnimator>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Real Relationships. Real Results.
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Hear from the people we work with.
              </p>
            </div>
          </ScrollAnimator>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredTestimonials.map((t) => (
              <ScrollAnimator key={t.name}>
                <div className="bg-gold/10 border border-gold/20 rounded-2xl p-10 hover:shadow-lg hover:shadow-gold/10 transition-all duration-500">
                  <span className="text-5xl font-serif text-gold/40 leading-none block mb-3">
                    &ldquo;
                  </span>
                  <p className="text-gray-700 leading-relaxed italic text-lg mb-6">
                    {t.quote}
                  </p>
                  <div>
                    <p className="font-bold text-navy">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.title}</p>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/testimonials"
              className="text-sm font-semibold text-gold hover:text-gold-light transition-colors duration-300"
            >
              Read all testimonials &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 7. MID-PAGE QUICK CAPTURE ═══ */}
      <section className="py-16 bg-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to explore a partnership?
          </h3>
          <p className="text-white/60 mb-8 text-sm">
            Tell us your role and we&apos;ll reach out with next steps.
          </p>
          <QuickCapture />
        </div>
      </section>

      {/* ═══ 8. ABOUT KYLENE ═══ */}
      <section id="about" className="py-20 md:py-24 bg-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div id="kylene" className="grid md:grid-cols-[280px_1fr] gap-16 items-start">
              <div>
                <p className="text-sm font-semibold text-gold tracking-wide uppercase mb-3">
                  About Us
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                  The Person Behind the Network
                </h2>
                <Image
                  src="/images/kylene.png"
                  alt="Kylene Pippin"
                  width={280}
                  height={282}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="md:pt-16">
                <p className="text-gray-600 leading-relaxed text-lg mb-5">
                  <span className="font-bold text-gray-900">Kylene Pippin</span>, a strategist and relationship builder in the K-12 fundraising space, founded{" "}
                  <span className="font-bold text-gray-900">BowTie School Partners</span> after spending 17+ years helping schools and vendors work together more effectively. Based in Alpharetta, Georgia, she brings a calm, consultative approach to every partnership — always prioritizing clarity, trust, and long-term success.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  Kylene built BowTie to turn 17 years of relationships into a system that helps schools, vendors, and brands win together — every time.
                </p>
                <Link
                  href="/testimonials"
                  className="text-sm font-semibold text-gold hover:text-gold-light transition-colors duration-300"
                >
                  Read what partners say about working with Kylene &rarr;
                </Link>
              </div>
            </div>
          </ScrollAnimator>

          <div className="my-14 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />

          <ScrollAnimator>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                What&apos;s in a Name
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                <span className="font-bold text-gray-900">BowTie</span>{" "}is inspired by my sons, Bo and Ty — the original &ldquo;Bow&rdquo; and &ldquo;Tie.&rdquo; And while our equally cherished youngest son, Gage, isn&apos;t in the name, he already gets plenty of attention as the baby of the family.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                The name reflects the heart behind our work: tying together the people and partnerships that shape the future for kids like mine.
              </p>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* ═══ 9. CONTACT ═══ */}
      <section id="contact" className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
                Let&apos;s Connect
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Whether you&apos;re a school, distributor, or national brand — tell us what you need and Kylene will personally follow up.
              </p>
            </div>
          </ScrollAnimator>
          <ContactForm />
        </div>
      </section>

      {/* ═══ 10. BRUCE BROWN ═══ */}
      <section className="py-20 bg-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-gold tracking-wide uppercase mb-3">
                A tribute
              </p>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                In Honor of Bruce Brown
              </h3>
              <p
                className="text-xl md:text-2xl text-navy italic mb-4"
                style={{ fontFamily: "'Georgia', 'Times New Roman', 'Palatino Linotype', cursive, serif" }}
              >
                A Friend, Former Athletic Director and OIAAA Executive Director
              </p>
              <div className="w-16 h-px bg-gold/40" />
            </div>
            <div>
              <Image
                src="/images/bruce-brown.png"
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
