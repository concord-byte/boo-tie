import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Image
            src="/images/bowtie-logo-full.png"
            alt="BowTie School Partners"
            width={250}
            height={97}
            className="h-12 w-auto brightness-200"
          />
          <div className="flex gap-8 text-sm text-white/60">
            <a href="#about" className="hover:text-gold transition-colors">About Us</a>
            <a href="#partners" className="hover:text-gold transition-colors">Partners</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>&copy; {new Date().getFullYear()} by BowTie School Partners</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
