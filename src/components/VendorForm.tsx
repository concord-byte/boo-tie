"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface VendorData {
  id?: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  websiteUrl: string;
  logoUrl: string;
  logoAlt: string;
  adCopy: string;
  tier: string;
  isActive: boolean;
  isPreferred: boolean;
  isComingSoon: boolean;
  isWaitlist: boolean;
  sortOrder: number;
}

const EMPTY: VendorData = {
  name: "", slug: "", category: "", description: "", websiteUrl: "",
  logoUrl: "", logoAlt: "", adCopy: "", tier: "preferred",
  isActive: true, isPreferred: false, isComingSoon: false, isWaitlist: false, sortOrder: 0,
};

export default function VendorForm({ initial }: { initial?: VendorData }) {
  const router = useRouter();
  const isEdit = !!initial?.id;
  const [form, setForm] = useState<VendorData>(initial || EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof VendorData>(key: K, value: VendorData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = isEdit ? `/api/vendors/${initial!.id}` : "/api/vendors";
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

      router.push("/dashboard/vendors");
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
        <h2 className="font-semibold text-gray-900">Basic Info</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            value={form.name}
            onChange={(e) => {
              set("name", e.target.value);
              if (!isEdit) set("slug", autoSlug(e.target.value));
            }}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ad Copy</label>
          <textarea
            value={form.adCopy}
            onChange={(e) => set("adCopy", e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
          <input
            type="url"
            value={form.websiteUrl}
            onChange={(e) => set("websiteUrl", e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Logo</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
          <input
            value={form.logoUrl}
            onChange={(e) => set("logoUrl", e.target.value)}
            placeholder="/images/partner-placeholder.svg or https://..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          />
          {form.logoUrl && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.logoUrl} alt="Preview" className="h-12 object-contain" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo Alt Text</label>
          <input
            value={form.logoAlt}
            onChange={(e) => set("logoAlt", e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Settings</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
            <select
              value={form.tier}
              onChange={(e) => set("tier", e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            >
              <option value="premier">Premier Partner</option>
              <option value="preferred">Preferred Vendor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => set("sortOrder", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {([
            ["isActive", "Active", "Visible on the public site"],
            ["isPreferred", "Preferred", "Marked as preferred vendor"],
            ["isComingSoon", "Coming Soon", "Shows 'Coming Soon' badge"],
            ["isWaitlist", "Waitlist", "Shows 'Join the Waitlist' badge"],
          ] as const).map(([key, label, desc]) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form[key] as boolean}
                onChange={(e) => set(key, e.target.checked)}
                className="mt-0.5 rounded border-gray-300"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Vendor"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/vendors")}
          className="px-6 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
