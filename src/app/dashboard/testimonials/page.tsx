"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Testimonial {
  id: string;
  name: string;
  title: string | null;
  quote: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export default function TestimonialsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete testimonial from "${name}"? This cannot be undone.`)) return;

    const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((t) => t.id !== id));
      setMsg(`Testimonial from "${name}" deleted`);
      setTimeout(() => setMsg(""), 3000);
    } else {
      setError("Failed to delete");
    }
  }

  async function toggleActive(t: Testimonial) {
    const res = await fetch(`/api/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...t, isActive: !t.isActive }),
    });
    if (res.ok) {
      setItems((prev) => prev.map((x) => (x.id === t.id ? { ...x, isActive: !x.isActive } : x)));
    }
  }

  async function toggleFeatured(t: Testimonial) {
    const res = await fetch(`/api/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...t, isFeatured: !t.isFeatured }),
    });
    if (res.ok) {
      setItems((prev) => prev.map((x) => (x.id === t.id ? { ...x, isFeatured: !x.isFeatured } : x)));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} total</p>
        </div>
        <Link
          href="/dashboard/testimonials/new"
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Add Testimonial
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
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No testimonials yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    {t.title && <p className="text-xs text-gray-400">— {t.title}</p>}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => toggleActive(t)}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        t.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {t.isActive ? "Active" : "Hidden"}
                    </button>
                    <button
                      onClick={() => toggleFeatured(t)}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        t.isFeatured ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {t.isFeatured ? "Featured" : "Not Featured"}
                    </button>
                    <span className="text-xs text-gray-400">Order: {t.sortOrder}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => router.push(`/dashboard/testimonials/${t.id}`)}
                    className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
