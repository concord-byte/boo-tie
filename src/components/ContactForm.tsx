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
      <div className="text-center py-16">
        <div className="text-5xl mb-4">&#10003;</div>
        <h3 className="text-2xl font-semibold text-navy mb-2">Thank you!</h3>
        <p className="text-gray-600">We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition text-sm";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
      <input name="firstName" required placeholder="First Name" className={inputClass} />
      <input name="lastName" required placeholder="Last Name" className={inputClass} />
      <input name="company" placeholder="Company / School" className={inputClass} />
      <input name="email" type="email" required placeholder="Email" className={inputClass} />
      <input name="phone" type="tel" placeholder="Phone" className={inputClass} />
      <select name="role" required className={inputClass} defaultValue="">
        <option value="" disabled>Select Role</option>
        <option value="School">School</option>
        <option value="Vendor">Vendor</option>
        <option value="National Brand">National Brand</option>
        <option value="Other">Other</option>
      </select>
      <textarea
        name="message"
        rows={4}
        placeholder="How can we help?"
        className={`${inputClass} sm:col-span-2`}
      />
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gold hover:bg-gold-light text-navy font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-red-600 text-sm text-center">{errorMsg}</p>
        )}
      </div>
    </form>
  );
}
