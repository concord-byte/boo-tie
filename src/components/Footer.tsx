import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-gold">Bow</span>Tie
            </Link>
            <p className="mt-2 text-white/60 text-sm max-w-xs">
              Connecting schools, best-in-class vendors, and respected brands — everyone wins.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-white/60">
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#vision" className="hover:text-gold transition-colors">Vision</a>
            <a href="#partners" className="hover:text-gold transition-colors">Partners</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/40 text-xs">
          &copy; {new Date().getFullYear()} BowTie Network. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
