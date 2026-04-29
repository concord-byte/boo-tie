"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TestimonialForm from "@/components/TestimonialForm";

export default function EditTestimonialPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/testimonials/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load testimonial");
        return r.json();
      })
      .then(setItem)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-100">
        {error}
      </div>
    );
  }

  if (!item) {
    return <p className="text-sm text-gray-400">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Testimonial</h1>
        <p className="text-sm text-gray-500 mt-1">From {item.name as string}</p>
      </div>
      <TestimonialForm
        initial={{
          id: item.id as string,
          quote: (item.quote as string) || "",
          name: (item.name as string) || "",
          title: (item.title as string) || "",
          organization: (item.organization as string) || "",
          location: (item.location as string) || "",
          audienceType: (item.audienceType as string) || "",
          isActive: item.isActive as boolean,
          isFeatured: item.isFeatured as boolean,
          sortOrder: (item.sortOrder as number) || 0,
        }}
      />
    </div>
  );
}
