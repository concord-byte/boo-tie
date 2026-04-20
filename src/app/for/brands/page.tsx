import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "BowTie for National Brands — K-12 Sponsorship & Activation",
};

const BENEFITS = [
  {
    title: "Strategy & Implementation",
    desc: "From campaign design to on-the-ground activation, we handle the full lifecycle. Your brand gets authentic exposure in school communities where families trust what they see.",
  },
  {
    title: "Revenue Generation",
    desc: "Turn sponsorship dollars into measurable brand lift. Our model ensures your investment reaches real families in real communities — not banner ads they scroll past.",
  },
  {
    title: "Relationship Management",
    desc: "We manage the ongoing relationship with every school in your program. You get a single point of contact for campaigns spanning dozens of campuses.",
  },
];

export default function ForBrands() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold text-sm font-semibold tracking-wide uppercase mb-4">
            For National Brands &amp; Heads of Advertising
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Reach families where they<br />
            <span className="text-gold font-normal">actually pay attention</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            School communities are the most trusted, highest-engagement environments for family-focused brands. BowTie gets you in — authentically.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">
            Why the K-12 channel works for brands
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

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gold">50+</p>
              <p className="text-sm text-gray-500 mt-1">Schools in network</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">17+</p>
              <p className="text-sm text-gray-500 mt-1">Years in K-12 space</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">100%</p>
              <p className="text-sm text-gray-500 mt-1">School-safe activations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Let&apos;s build your K-12 campaign
            </h2>
            <p className="text-gray-600">
              Tell us about your brand and Kylene will personally walk you through our activation model.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
