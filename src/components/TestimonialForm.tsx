"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface TestimonialData {
  id?: string;
  quote: string;
  name: string;
  title: string;
  organization: string;
  location: string;
  audienceType: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

const EMPTY: TestimonialData = {
  quote: "", name: "", title: "", organization: "", location: "",
  audienceType: "", isActive: true, isFeatured: false, sortOrder: 0,
};

export default function TestimonialForm({ initial }: { initial?: TestimonialData }) {
  const router = useRouter();
  const isEdit = !!initial?.id;
  const [form, setForm] = useState<TestimonialData>(initial || EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof TestimonialData>(key: K, value: TestimonialData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = isEdit ? `/api/testimonials/${initial!.id}` : "/api/testimonials";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Save failed");
        return;
      }

      router.push("/dashboard/testimonials");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Testimonial Content</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quote *</label>
          <textarea
            value={form.quote}
            onChange={(e) => set("quote", e.target.value)}
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title / Role</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
            <input
              value={form.organization}
              onChange={(e) => set("organization", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Audience Type</label>
          <select
            value={form.audienceType}
            onChange={(e) => set("audienceType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          >
            <option value="">Not specified</option>
            <option value="school">School</option>
            <option value="vendor">Vendor</option>
            <option value="brand">Brand</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Settings</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => set("sortOrder", parseInt(e.target.value) || 0)}
            className="w-40 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
              className="mt-0.5 rounded border-gray-300"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Active</span>
              <p className="text-xs text-gray-400">Visible on the public testimonials page</p>
            </div>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => set("isFeatured", e.target.checked)}
              className="mt-0.5 rounded border-gray-300"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">Featured</span>
              <p className="text-xs text-gray-400">Shown on the homepage testimonials section</p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Testimonial"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/testimonials")}
          className="px-6 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
