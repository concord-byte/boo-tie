import Image from "next/image";
import Link from "next/link";
import { PARTNERS } from "@/lib/partners";
import ContactForm from "@/components/ContactForm";

const TESTIMONIALS = [
  {
    quote: "Their professionalism and attention to detail have allowed our projects come off without a hitch",
    name: "Mike Graefe",
    title: "Meridian (ID) High School Athletic Director",
  },
  {
    quote: "Kylene's approach is so consultative, a true partner",
    name: "Jennifer Ripley",
    title: "Valor Christian (GA) High School Booster Club President",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — dark background with hands image and logo */}
      <section className="relative bg-[#1a1a2e] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[600px]">
          {/* Left side — logo + text */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-20 z-10">
            <Image
              src="/images/bowtie-logo-full.png"
              alt="BowTie School Partners — tying it all together"
              width={500}
              height={195}
              className="mb-10"
              priority
            />
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed mb-10">
              a network where schools,<br />
              best-in-class vendors and<br />
              respected brands all win together
            </p>
            <a
              href="#contact"
              className="inline-block w-fit bg-gold hover:bg-gold-light text-navy font-semibold py-4 px-10 rounded-full transition-colors text-lg"
            >
              Connect with Ky
            </a>
          </div>
          {/* Right side — hands image */}
          <div className="relative hidden md:block">
            <Image
              src="/images/hero-hands.jpg"
              alt="Team hands together"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* About Us — Kylene's photo and bio */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-[auto_1fr] gap-12 items-start">
            <h2 className="text-4xl md:text-5xl font-light text-black md:col-span-2">About Us</h2>
            <div className="flex justify-center">
              <Image
                src="/images/kylene.png"
                alt="Kylene Pippin"
                width={280}
                height={282}
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                <strong>Kylene Pippin</strong>, a strategist and relationship builder in the fundraising space, started <strong>BowTie</strong> after spending the last 17+ years helping schools and vendors work together more effectively.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                She brings a calm, thoughtful and deeply rational approach to every partnership — always prioritizing clarity, trust and long-term success for all parties involved.
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-16 border-gray-200" />

          {/* What's in a Name */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8">What&apos;s in a Name</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              <strong>BowTie</strong> is inspired by my sons, Bo and Ty — the original &ldquo;Bow&rdquo; and &ldquo;Tie.&rdquo; And while our equally cherished youngest son, Gage, isn&apos;t in the name, he already gets plenty of attention as the baby of the family.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              The name reflects the heart behind our work: tying together the people and partnerships that shape the future for kids like mine.
            </p>
          </div>
        </div>
      </section>

      {/* Our Vision — navy background with icon and card */}
      <section id="vision" className="py-20 bg-navy">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <h2 className="text-4xl md:text-5xl font-light text-white">Our Vision</h2>
          <div className="bg-light-gray rounded-2xl p-10 relative">
            <div className="flex justify-end mb-4">
              <Image
                src="/images/bowtie-icon.png"
                alt="BowTie icon"
                width={80}
                height={63}
              />
            </div>
            <p className="text-gray-800 leading-relaxed text-lg mb-4">
              <strong>BowTie</strong> is a school-safe network that seamlessly connects schools, trusted vendors, and national brands, all through one reliable partner.
            </p>
            <p className="text-gray-800 leading-relaxed text-lg">
              Designed to simplify collaboration and ensure alignment, <strong>BowTie</strong> turns connections into long-term partnerships that deliver real value, unlocking opportunities for the students who will lead tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us — hub diagram */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black">Why Work<br />with Us</h2>
            <div>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                <strong>BowTie</strong> provides the infrastructure, technology, and strategic support that helps schools generate revenue, provides vendors scale, and enables national brands to activate meaningful campaigns in the K-12 space.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                <strong>BowTie</strong> is not an agency, it&apos;s a Platform, a Network, an Ecosystem of industry leaders.
              </p>
            </div>
          </div>
          {/* Hub-and-spoke diagram */}
          <div className="flex justify-center">
            <Image
              src="/images/hub-diagram.png"
              alt="BowTie ecosystem — Schools, Trusted Vendors, and National Brands connected through BowTie"
              width={912}
              height={607}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Our Partners — logo grid linking to lead capture */}
      <section id="partners" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-black">Our Partners</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              <strong>BowTie</strong> is committed to working only with the best brands, companies and people, because that is the only way the Network is successful. We have strategic relationships with the leaders of all of our partners, which results in long-term wins!
            </p>
          </div>
          <p className="text-center text-gray-500 text-sm mb-8">(click logos for links)</p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {PARTNERS.map((p) => (
              <Link
                key={p.slug}
                href={`/partners/${p.slug}`}
                className="group border-2 border-navy rounded-xl p-8 flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white min-h-[200px]"
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={280}
                  height={180}
                  className="object-contain max-h-[160px]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-light text-black text-center mb-16">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-navy">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
          {/* In honor of Bruce Brown */}
          <div className="mt-12 text-center">
            <Image
              src="/images/bruce-brown.jpg"
              alt="In honor of Bruce Brown"
              width={120}
              height={135}
              className="rounded-lg mx-auto mb-3"
            />
            <p className="text-gray-500 text-sm italic">in honor of Bruce Brown</p>
          </div>
        </div>
      </section>

      {/* Kylene Pippin banner */}
      <section className="py-12 bg-navy text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-white mb-2">Kylene Pippin</h3>
          <p className="text-white/70">Founder &amp; CEO, BowTie School Partners</p>
        </div>
      </section>

      {/* Contact / Let's Connect */}
      <section id="contact" className="py-24 bg-light-gray">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">Let&apos;s Connect</h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Ready to explore how BowTie can help your school, brand, or business? Drop us a line.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
