import Link from "next/link";
import { PARTNERS } from "@/lib/partners";
import ContactForm from "@/components/ContactForm";

const FEATURES = [
  { icon: "📊", title: "Campus Revenue Assessment", desc: "Comprehensive analysis of your campus revenue potential and untapped opportunities." },
  { icon: "🤖", title: "AI Powered Sponsorship", desc: "Leverage cutting-edge AI tools to match schools with ideal brand partners." },
  { icon: "💰", title: "Budget Support", desc: "Strategic financial planning to help schools maximize every dollar." },
  { icon: "🤝", title: "Business Development", desc: "Build lasting relationships between schools, vendors, and national brands." },
  { icon: "🎯", title: "Strategy & Implementation", desc: "End-to-end execution from planning through launch and beyond." },
  { icon: "📈", title: "Revenue Generation", desc: "Proven models that create sustainable revenue streams for campuses." },
];

const TESTIMONIALS = [
  {
    quote: "Boo-Tie has been instrumental in helping us identify and secure partnerships that truly benefit our students and campus community.",
    name: "Mike Graefe",
    title: "Athletic Director",
  },
  {
    quote: "The team at Boo-Tie understands the unique needs of schools and brings vendors that align with our mission and values.",
    name: "Jennifer Ripley",
    title: "District Administrator",
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
            Boo-Tie connects educational institutions with trusted partners to create meaningful, revenue-generating relationships.
          </p>
          <a
            href="#contact"
            className="inline-block mt-10 bg-gold hover:bg-gold-light text-navy font-semibold py-4 px-10 rounded-lg transition-colors text-lg"
          >
            Connect with Us
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">About Boo-Tie</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Boo-Tie Network is the bridge between schools seeking innovative solutions and the vendors and brands ready to provide them. We specialize in building partnerships that are genuinely beneficial for educational communities.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team brings decades of experience in education, athletics, and corporate sponsorship to create connections that drive campus improvement and generate sustainable revenue.
            </p>
          </div>
          <div className="bg-light-gray rounded-2xl aspect-[4/3] flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image Placeholder</span>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-24 bg-light-gray">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            We envision a world where every school has access to best-in-class resources through transparent, mutually beneficial partnerships. By connecting schools with vetted vendors and respected national brands, we create an ecosystem where educational excellence and smart business go hand in hand.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-16">Why Work With Us</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-16">Our Partners</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-16">What People Are Saying</h2>
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

      {/* Contact */}
      <section id="contact" className="py-24 bg-light-gray">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">Get in Touch</h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Ready to explore how Boo-Tie can help your school, brand, or business? Drop us a line.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
