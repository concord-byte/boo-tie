import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "BowTie for Vendors — Scale into the K-12 Market",
};

const BENEFITS = [
  {
    title: "Business Development Support",
    desc: "We open doors to school districts you can't reach alone. Our relationships with athletic directors, administrators, and booster clubs give you a trusted introduction — not a cold pitch.",
  },
  {
    title: "Local Activation Planning",
    desc: "National reach, local execution. We help you plan and activate campaigns tailored to individual school communities, so your brand shows up where it matters.",
  },
  {
    title: "Measurable Results",
    desc: "Data-driven reporting that proves ROI. Know exactly which partnerships are performing and where to double down.",
  },
];

export default function ForVendors() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold text-sm font-semibold tracking-wide uppercase mb-4">
            For Vendors &amp; Service Providers
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Get in front of schools that<br />
            <span className="text-gold font-normal">need what you sell</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            BowTie gives school-focused distributors and product companies trusted access to the K-12 market. Through real relationships with athletic directors, administrators, and booster clubs — not cold outreach.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">
            How BowTie grows your business
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
            &ldquo;Kylene&rsquo;s approach is so consultative, a true partner&rdquo;
          </blockquote>
          <p className="font-semibold text-navy">Jennifer Ripley</p>
          <p className="text-sm text-gray-500">Valor Christian (GA) High School Booster Club President</p>
        </div>
      </section>

      {/* Lead capture */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Ready to reach more schools?
            </h2>
            <p className="text-gray-600">
              Tell us about your product and Kylene will connect you with the right schools.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
