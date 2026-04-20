import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "BowTie for Schools — Campus Revenue & Trusted Partnerships",
};

const BENEFITS = [
  {
    title: "Campus Revenue Assessment",
    desc: "We analyze your campus assets — facilities, signage, digital screens, events — and identify untapped revenue opportunities most schools don't even know they have.",
  },
  {
    title: "AI Powered Sponsorship Generation",
    desc: "Our AI matching engine connects your school with vetted sponsors whose values align with your community. No cold calls, no guesswork.",
  },
  {
    title: "Budget Support & Preferred Pricing",
    desc: "Access preferred pricing from our vendor network and strategic budget planning to make every dollar work harder for your students.",
  },
];

export default function ForSchools() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold text-sm font-semibold tracking-wide uppercase mb-4">
            For School Administrators &amp; Athletic Directors
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Turn your campus into a<br />
            <span className="text-gold font-normal">revenue engine</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            BowTie helps schools secure sponsorships, access fundraising tools, and connect with trusted distributors — without having to figure it all out alone. With 17+ years of K-12 relationships, we bring the right partners to your campus.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">
            What BowTie does for your school
          </h2>
          <div className="space-y-8">
            {BENEFITS.map((b, i) => (
              <div key={b.title} className="flex gap-6 items-start">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <span className="text-gold font-bold text-sm">{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="text-xl italic text-gray-600 mb-4">
            &ldquo;Their professionalism and attention to detail have allowed our projects come off without a hitch&rdquo;
          </blockquote>
          <p className="font-semibold text-navy">Mike Graefe</p>
          <p className="text-sm text-gray-500">Meridian (ID) High School Athletic Director</p>
        </div>
      </section>

      {/* Lead capture */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Let&apos;s explore what BowTie can do for your school
            </h2>
            <p className="text-gray-600">
              Fill out the form below and Kylene will personally reach out to discuss your campus opportunities.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
