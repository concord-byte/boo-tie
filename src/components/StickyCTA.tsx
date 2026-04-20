"use client";

import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-sm border-t border-white/10 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <p className="text-white/70 text-sm hidden sm:block">
          Ready to partner with BowTie?
        </p>
        <a
          href="/#contact"
          className="bg-gold hover:bg-gold-light text-navy font-semibold py-2.5 px-8 rounded-full text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/20"
        >
          Connect with Ky
        </a>
      </div>
    </div>
  );
}
