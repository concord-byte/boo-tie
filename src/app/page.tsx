import Image from "next/image";
import Link from "next/link";
import { PARTNERS } from "@/lib/partners";
import ContactForm from "@/components/ContactForm";
import ScrollAnimator from "@/components/ScrollAnimator";

const TESTIMONIALS = [
  {
    quote:
      "Their professionalism and attention to detail have allowed our projects come off without a hitch",
    name: "Mike Graefe",
    title: "Meridian (ID) High School Athletic Director",
  },
  {
    quote: "Kylene\u2019s approach is so consultative, a true partner",
    name: "Jennifer Ripley",
    title: "Valor Christian (GA) High School Booster Club President",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#1a1a2e] to-navy overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 min-h-screen">
          {/* Left */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-32 z-10">
            <Image
              src="/images/bowtie-logo-full.png"
              alt="BowTie School Partners — tying it all together"
              width={500}
              height={195}
              className="mb-12 brightness-200"
              priority
            />
            <p className="text-white/70 text-xl md:text-2xl leading-relaxed font-light mb-12">
              a network where schools,
              <br />
              best-in-class vendors and
              <br />
              respected brands all win together
            </p>
            <a
              href="#contact"
              className="inline-block w-fit bg-gold hover:bg-gold-light text-navy font-semibold py-4 px-10 rounded-full hover:scale-105 transition-all duration-300 text-lg shadow-lg shadow-gold/20"
            >
              Connect with Ky
            </a>
          </div>

          {/* Right */}
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
      </section>

      {/* ── About Us / Kylene ── */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div id="kylene" className="grid md:grid-cols-[280px_1fr] gap-16 items-start">
              <div>
                <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-10">
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
              <div className="md:pt-20">
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  <span className="font-semibold text-gray-900">Kylene Pippin</span>, a
                  strategist and relationship builder in the fundraising space, started{" "}
                  <span className="font-semibold text-gray-900">BowTie</span> after
                  spending the last 17+ years helping schools and vendors work together
                  more effectively.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  She brings a calm, thoughtful and deeply rational approach to every
                  partnership — always prioritizing clarity, trust and long-term success
                  for all parties involved.
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

          {/* Gradient divider */}
          <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* What's in a Name */}
          <ScrollAnimator>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-10">
                What&apos;s in a Name
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                <span className="font-semibold text-gray-900">BowTie</span> is inspired
                by my sons, Bo and Ty — the original &ldquo;Bow&rdquo; and
                &ldquo;Tie.&rdquo; And while our equally cherished youngest son, Gage,
                isn&apos;t in the name, he already gets plenty of attention as the baby of
                the family.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                The name reflects the heart behind our work: tying together the people and
                partnerships that shape the future for kids like mine.
              </p>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* ── Our Vision ── */}
      <section id="vision" className="py-20 md:py-28 bg-navy">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <h2 className="text-5xl md:text-6xl font-light text-white">Our Vision</h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
                <div className="flex justify-end mb-6">
                  <Image
                    src="/images/bowtie-icon.png"
                    alt="BowTie icon"
                    width={80}
                    height={63}
                    className="opacity-80"
                  />
                </div>
                <p className="text-white/90 leading-relaxed text-lg mb-6">
                  <span className="font-semibold text-white">BowTie</span> is a
                  school-safe network that seamlessly connects schools, trusted vendors,
                  and national brands, all through one reliable partner.
                </p>
                <p className="text-white/90 leading-relaxed text-lg">
                  Designed to simplify collaboration and ensure alignment,{" "}
                  <span className="font-semibold text-white">BowTie</span> turns
                  connections into long-term partnerships that deliver real value, unlocking
                  opportunities for the students who will lead tomorrow.
                </p>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* ── Why Work With Us ── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-16 items-start mb-12">
              <h2 className="text-5xl md:text-6xl font-light text-gray-900">
                Why Work
                <br />
                with Us
              </h2>
              <div>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  <span className="font-semibold text-gray-900">BowTie</span> provides the
                  infrastructure, technology, and strategic support that helps schools
                  generate revenue, provides vendors scale, and enables national brands to
                  activate meaningful campaigns in the K-12 space.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  <span className="font-semibold text-gray-900">BowTie</span> is not an
                  agency, it&apos;s a Platform, a Network, an Ecosystem of industry
                  leaders.
                </p>
              </div>
            </div>
          </ScrollAnimator>
          <ScrollAnimator>
            <div className="flex justify-center">
              <Image
                src="/images/hub-diagram.png"
                alt="BowTie ecosystem — Schools, Trusted Vendors, and National Brands connected through BowTie"
                width={912}
                height={607}
                className="max-w-3xl w-full h-auto drop-shadow-lg"
              />
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* ── Our Partners ── */}
      <section id="partners" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="grid md:grid-cols-2 gap-16 items-start mb-12">
              <h2 className="text-5xl md:text-6xl font-light text-gray-900">
                Our Partners
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                <span className="font-semibold text-gray-900">BowTie</span> is committed
                to working only with the best brands, companies and people, because that is
                the only way the Network is successful. We have strategic relationships
                with the leaders of all of our partners, which results in long-term wins!
              </p>
            </div>
          </ScrollAnimator>
          <p className="text-center text-gray-400 text-sm mb-10">(click logos for links)</p>
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {PARTNERS.map((p) => (
              <Link
                key={p.slug}
                href={`/partners/${p.slug}`}
                className="group border-2 border-navy/10 rounded-2xl p-10 flex items-center justify-center bg-white min-h-[200px] hover:border-gold hover:shadow-xl transition-all duration-500"
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={280}
                  height={180}
                  className="object-contain max-h-[160px] group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollAnimator>
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 text-center mb-12">
              Testimonials
            </h2>
          </ScrollAnimator>
          <div className="grid md:grid-cols-2 gap-10">
            {TESTIMONIALS.map((t) => (
              <ScrollAnimator key={t.name}>
                <div className="bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl transition-all duration-500">
                  <span className="text-6xl font-serif text-gold/30 leading-none block mb-4">
                    &ldquo;
                  </span>
                  <p className="text-gray-600 leading-relaxed italic text-lg mb-8">
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

          {/* Kylene link back */}
          <div className="text-center mt-16">
            <a
              href="#kylene"
              className="text-sm font-medium text-gold hover:text-gold-light transition-colors duration-300"
            >
              Kylene Pippin, Founder &amp; CEO &rarr;
            </a>
          </div>

          {/* Bruce Brown memorial */}
          <ScrollAnimator>
            <div className="mt-20 text-center">
              <Image
                src="/images/bruce-brown.jpg"
                alt="In honor of Bruce Brown"
                width={120}
                height={135}
                className="rounded-2xl mx-auto mb-4 shadow-sm"
              />
              <p className="text-gray-400 text-sm italic">in honor of Bruce Brown</p>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* ── Kylene Banner ── */}
      <section className="py-20 bg-navy text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-light text-white mb-3">Kylene Pippin</h3>
          <p className="text-white/60 mb-8">
            Founder &amp; CEO, BowTie School Partners
          </p>
          <a
            href="#testimonials"
            className="text-sm font-medium text-gold hover:text-gold-light transition-colors duration-300"
          >
            See what our partners say &rarr;
          </a>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollAnimator>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
                Let&apos;s Connect
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                Ready to explore how BowTie can help your school, brand, or business? Drop
                us a line.
              </p>
            </div>
          </ScrollAnimator>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
