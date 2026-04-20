import Link from "next/link";
import { PARTNERS } from "@/lib/partners";
import ContactForm from "@/components/ContactForm";

const FEATURES = [
  { icon: "📊", title: "Campus Revenue Assessment", desc: "Comprehensive analysis of your campus revenue potential and untapped opportunities." },
  { icon: "🤖", title: "AI Powered Sponsorship Generation", desc: "Leverage cutting-edge AI tools to match schools with ideal brand partners." },
  { icon: "💰", title: "Budget Support & Preferred Pricing", desc: "Strategic financial planning to help schools maximize every dollar." },
  { icon: "🤝", title: "Business Development Support", desc: "Build lasting relationships between schools, vendors, and national brands." },
  { icon: "🎯", title: "Strategy & Implementation", desc: "End-to-end execution from planning through launch and beyond." },
  { icon: "📈", title: "Revenue Generation", desc: "Proven models that create sustainable revenue streams for campuses." },
  { icon: "📍", title: "Local Activation Planning", desc: "Customized local strategies that connect brands with school communities on the ground." },
  { icon: "🤲", title: "Relationship Management", desc: "Ongoing partnership stewardship ensuring long-term wins for all parties." },
  { icon: "📉", title: "Measurable Results", desc: "Data-driven reporting that proves ROI and guides future partnership decisions." },
];

const TESTIMONIALS = [
  {
    quote: "Their professionalism and attention to detail have allowed our projects come off without a hitch.",
    name: "Mike Graefe",
    title: "Meridian (ID) High School Athletic Director",
  },
  {
    quote: "Kylene's approach is so consultative, a true partner.",
    name: "Jennifer Ripley",
    title: "Valor Christian (GA) High School Booster Club President",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 50%, rgba(212,168,67,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-40 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            A network where schools, best-in-class vendors and respected brands all{" "}
            <span className="text-gold">win together</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            BowTie connects educational institutions with trusted partners to create meaningful, revenue-generating relationships.
          </p>
          <a
            href="#contact"
            className="inline-block mt-10 bg-gold hover:bg-gold-light text-navy font-semibold py-4 px-10 rounded-lg transition-colors text-lg"
          >
            Connect with Ky
          </a>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">About Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kylene Pippin, a strategist and relationship builder in the fundraising space, started BowTie after spending the last 17+ years helping schools and vendors work together more effectively.
            </p>
            <p className="text-gray-600 leading-relaxed">
              She brings a calm, thoughtful and deeply rational approach to every partnership — always prioritizing clarity, trust and long-term success for all parties involved.
            </p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">What&apos;s in a Name</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              BowTie is inspired by my sons, Bo and Ty — the original &ldquo;Bow&rdquo; and &ldquo;Tie.&rdquo; And while our equally cherished youngest son, Gage, isn&apos;t in the name, he already gets plenty of attention as the baby of the family.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The name reflects the heart behind our work: tying together the people and partnerships that shape the future for kids like mine.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-24 bg-light-gray">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            BowTie is a school-safe network that seamlessly connects schools, trusted vendors, and national brands — all through one reliable partner. Designed to simplify collaboration and ensure alignment, BowTie turns connections into long-term partnerships that deliver real value, unlocking opportunities for the students who will lead tomorrow.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">Why Work with Us</h2>
          <p className="text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            BowTie provides the infrastructure, technology, and strategic support that helps schools generate revenue, provides vendors scale, and enables national brands to activate meaningful campaigns in the K-12 space. BowTie is not an agency — it&apos;s a Platform, a Network, an Ecosystem of industry leaders.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-light-gray rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-navy mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-24 bg-light-gray">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">Our Partners</h2>
          <p className="text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            BowTie is committed to working only with the best brands, companies and people, because that is the only way the Network is successful. We have strategic relationships with the leaders of all of our partners, which results in long-term wins!
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTNERS.map((p) => (
              <Link
                key={p.slug}
                href={`/partners/${p.slug}`}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-light-gray rounded-lg h-20 flex items-center justify-center mb-5">
                  <span className="text-navy font-bold text-lg">{p.name}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{p.description}</p>
                <span className="text-gold font-medium text-sm group-hover:text-gold-light transition-colors">
                  Learn More &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-16">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-light-gray rounded-xl p-8">
                <p className="text-gray-700 leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-navy">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kylene Pippin */}
      <section className="py-16 bg-navy text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-white mb-2">Kylene Pippin</h3>
          <p className="text-white/70">Founder &amp; CEO, BowTie Network</p>
        </div>
      </section>

      {/* Contact */}
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
