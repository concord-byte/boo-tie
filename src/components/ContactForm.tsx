"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-light text-gray-900 mb-3">Thank you!</h3>
        <p className="text-gray-600">Kylene will be in touch shortly.</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-gray-50 border-0 rounded-xl px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-gold/50 focus:bg-white transition-all duration-300 text-sm";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
          First Name
        </label>
        <input id="firstName" name="firstName" required className={inputClass} placeholder="First Name" />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
          Last Name
        </label>
        <input id="lastName" name="lastName" required className={inputClass} placeholder="Last Name" />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Company / School
        </label>
        <input id="company" name="company" className={inputClass} placeholder="Company / School" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="Email" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={inputClass} placeholder="Phone" />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
          Role
        </label>
        <select id="role" name="role" required className={inputClass} defaultValue="">
          <option value="" disabled>Select Role</option>
          <option value="School">School</option>
          <option value="Vendor">Vendor</option>
          <option value="National Brand">National Brand</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2 pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gold hover:bg-gold-light text-navy font-semibold rounded-full py-4 text-base hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-gold/20 disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {status === "error" && (
          <p className="mt-4 text-red-600 text-sm text-center">{errorMsg}</p>
        )}
      </div>
    </form>
  );
}
