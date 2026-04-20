import { notFound } from "next/navigation";
import { getPartnerBySlug } from "@/lib/partners";
import PartnerLeadForm from "@/components/PartnerLeadForm";

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-navy text-white py-6 px-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-gold">Boo</span>-Tie
          </h1>
          <span className="text-sm text-white/70">Partner Program</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Partner Showcase */}
        <section className="rounded-2xl border border-navy/10 bg-light-gray p-8">
          <div className="flex items-start gap-6">
            <div className="shrink-0 w-16 h-16 rounded-xl bg-white border border-navy/10 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-navy">
                {partner.name}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {partner.description}
              </p>
              <p className="text-lg font-medium text-navy-light italic">
                &ldquo;{partner.adCopy}&rdquo;
              </p>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-gold hover:text-gold-light underline underline-offset-2"
              >
                Visit {partner.name} &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section>
          <h3 className="text-xl font-semibold text-navy mb-2">
            Get in Touch
          </h3>
          <p className="text-gray-500 mb-6">
            Interested in learning more? Fill out the form below and a BowTie
            representative will connect you with {partner.name}.
          </p>
          <PartnerLeadForm
            partnerSlug={partner.slug}
            partnerName={partner.name}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy/10 py-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} BowTie. All rights reserved.
      </footer>
    </div>
  );
}
