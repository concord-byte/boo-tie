"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import VendorForm from "@/components/VendorForm";

export default function EditVendorPage() {
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/vendors/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load vendor");
        return r.json();
      })
      .then(setVendor)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-100">
        {error}
      </div>
    );
  }

  if (!vendor) {
    return <p className="text-sm text-gray-400">Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Vendor</h1>
        <p className="text-sm text-gray-500 mt-1">{vendor.name as string}</p>
      </div>
      <VendorForm
        initial={{
          id: vendor.id as string,
          name: (vendor.name as string) || "",
          slug: (vendor.slug as string) || "",
          category: (vendor.category as string) || "",
          description: (vendor.description as string) || "",
          websiteUrl: (vendor.websiteUrl as string) || "",
          logoUrl: (vendor.logoUrl as string) || "",
          logoAlt: (vendor.logoAlt as string) || "",
          adCopy: (vendor.adCopy as string) || "",
          tier: (vendor.tier as string) || "preferred",
          isActive: vendor.isActive as boolean,
          isPreferred: vendor.isPreferred as boolean,
          isComingSoon: vendor.isComingSoon as boolean,
          isWaitlist: vendor.isWaitlist as boolean,
          sortOrder: (vendor.sortOrder as number) || 0,
        }}
      />
    </div>
  );
}
