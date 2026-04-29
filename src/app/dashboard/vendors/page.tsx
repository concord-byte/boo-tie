"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Vendor {
  id: string;
  name: string;
  slug: string;
  tier: string;
  isActive: boolean;
  isComingSoon: boolean;
  sortOrder: number;
  logoUrl: string | null;
}

export default function VendorsPage() {
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/vendors")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then(setVendors)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    const res = await fetch(`/api/vendors/${id}`, { method: "DELETE" });
    if (res.ok) {
      setVendors((prev) => prev.filter((v) => v.id !== id));
      setMsg(`"${name}" deleted`);
      setTimeout(() => setMsg(""), 3000);
    } else {
      setError("Failed to delete");
    }
  }

  async function toggleActive(v: Vendor) {
    const res = await fetch(`/api/vendors/${v.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...v, isActive: !v.isActive }),
    });
    if (res.ok) {
      setVendors((prev) => prev.map((x) => (x.id === v.id ? { ...x, isActive: !x.isActive } : x)));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
          <p className="text-sm text-gray-500 mt-1">{vendors.length} total</p>
        </div>
        <Link
          href="/dashboard/vendors/new"
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Add Vendor
        </Link>
      </div>

      {msg && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg border border-green-100">
          {msg}
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : vendors.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No vendors yet. Add your first vendor to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Vendor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Tier</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Order</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {v.logoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={v.logoUrl} alt="" className="w-8 h-8 object-contain rounded" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{v.name}</p>
                        <p className="text-xs text-gray-400">{v.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      v.tier === "premier" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {v.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{v.sortOrder}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleActive(v)}
                        className={`relative w-9 h-5 rounded-full transition-colors ${v.isActive ? "bg-green-500" : "bg-gray-300"}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${v.isActive ? "translate-x-4" : ""}`} />
                      </button>
                      <span className="text-xs text-gray-500">{v.isActive ? "Active" : "Hidden"}</span>
                      {v.isComingSoon && <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Soon</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/vendors/${v.id}`)}
                        className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(v.id, v.name)}
                        className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
