"use client";

import { useState } from "react";
import { PARTNERS } from "@/lib/partners";

const mockLeadCounts: Record<string, number> = {
  performall: 38,
  meridian: 29,
  "musco-lighting": 25,
  hudl: 22,
  learfield: 17,
  "dynamic-sponsorship": 11,
};

export default function PartnersPage() {
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>(
    Object.fromEntries(PARTNERS.map((p) => [p.slug, true]))
  );

  function toggle(slug: string) {
    setActiveStates((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy">Partners</h2>
        <p className="text-sm text-gray-500 mt-1">{PARTNERS.length} partners</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {PARTNERS.map((partner) => {
          const active = activeStates[partner.slug];
          const leads = mockLeadCounts[partner.slug] ?? 0;
          return (
            <div
              key={partner.slug}
              className={`bg-white rounded-xl p-6 shadow-sm border transition-opacity ${active ? "border-gray-100" : "border-gray-100 opacity-60"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-navy hover:underline"
                  >
                    {partner.website.replace("https://www.", "")}
                  </a>
                </div>
                <button
                  onClick={() => toggle(partner.slug)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${active ? "bg-green-500" : "bg-gray-300"}`}
                  aria-label={`Toggle ${partner.name}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${active ? "translate-x-5" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{partner.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-2xl font-bold text-navy">{leads}</p>
                  <p className="text-xs text-gray-400">Total leads</p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
