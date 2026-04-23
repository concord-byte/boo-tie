"use client";

import { useState } from "react";
import Link from "next/link";

const AUDIENCES = [
  {
    id: "schools",
    title: "For Schools",
    tagline: "Get help securing sponsors, fundraising support and trusted vendor connections",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    services: [
      "Campus Revenue Assessment",
      "AI Powered Sponsorship Generation",
      "Budget Support & Preferred Pricing",
      "National Brand Activation Infrastructure",
    ],
    href: "/for/schools",
  },
  {
    id: "vendors",
    title: "For Vendors",
    tagline: "Reach schools through trusted relationships, not cold entry",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    services: [
      "Business Development Support",
      "Local Activation Planning",
      "Sales Results",
    ],
    href: "/for/vendors",
  },
  {
    id: "brands",
    title: "For National Brands",
    tagline: "Access school sponsorship opportunities through a trusted network",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    services: [
      "Strategy & Implementation",
      "Revenue Generation",
      "Relationship Management",
    ],
    href: "/for/brands",
  },
];

export default function AudienceCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5">
      {AUDIENCES.map((a) => {
        const isOpen = expanded === a.id;
        return (
          <div
            key={a.id}
            onMouseEnter={() => setExpanded(a.id)}
            onMouseLeave={() => setExpanded(null)}
            className={`bg-gray-50 rounded-2xl p-7 transition-all duration-500 cursor-pointer border-2 ${
              isOpen
                ? "border-gold shadow-xl"
                : "border-transparent hover:border-gray-200"
            }`}
          >
            {/* Always visible: icon + title + tagline */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center shrink-0 text-navy">
                {a.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{a.title}</h3>
                <p className="text-sm text-gray-500">{a.tagline}</p>
              </div>
            </div>

            {/* Expandable: services + CTA */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-60 opacity-100 mt-5" : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <ul className="space-y-2 mb-5 pl-16">
                {a.services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-gold mt-0.5">&#10003;</span> {s}
                  </li>
                ))}
              </ul>
              <div className="pl-16">
                <Link
                  href={a.href}
                  className="inline-block bg-gold hover:bg-gold-light text-navy font-semibold text-sm py-2.5 px-6 rounded-full hover:scale-105 transition-all duration-300"
                >
                  See how BowTie can partner with you &rarr;
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
