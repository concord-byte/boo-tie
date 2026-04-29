"use client";

import { useState, type FormEvent } from "react";

export default function QuickCapture() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "",
          lastName: "",
          email,
          role: role || "Other",
          source: "quick-capture",
          pagePath: window.location.pathname,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-gold font-medium text-lg">
        Thanks! Kylene will be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <input
        id="quick-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
      />
      <select
        id="quick-role"
        name="role"
        autoComplete="organization-title"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white/80 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm appearance-none"
      >
        <option value="" className="text-gray-900">I am a...</option>
        <option value="School" className="text-gray-900">School</option>
        <option value="Vendor" className="text-gray-900">Vendor</option>
        <option value="National Brand" className="text-gray-900">National Brand</option>
        <option value="Other" className="text-gray-900">Other</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-gold hover:bg-gold-light text-navy font-semibold rounded-full px-8 py-3 text-sm hover:scale-105 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
      >
        {loading ? "..." : "Get Started"}
      </button>
    </form>
  );
}
