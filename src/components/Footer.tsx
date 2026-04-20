import Image from "next/image";

const FOOTER_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Partners", href: "#partners" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <Image
            src="/images/bowtie-logo-full.png"
            alt="BowTie School Partners"
            width={200}
            height={78}
            className="h-10 w-auto"
          />
          <nav className="flex gap-8">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 hover:text-navy transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200" />

        {/* Bottom row */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} BowTie School Partners. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-gray-600 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors duration-300">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
