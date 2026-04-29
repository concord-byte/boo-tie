import Link from "next/link";
import { isDatabaseConfigured, getPrisma } from "@/lib/db";

async function getCounts() {
  if (!isDatabaseConfigured()) return null;
  try {
    const prisma = getPrisma();
    const [vendors, testimonials] = await Promise.all([
      prisma.vendor.count(),
      prisma.testimonial.count(),
    ]);
    return { vendors, testimonials };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const counts = await getCounts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your BowTie website content</p>
      </div>

      {!counts && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="font-semibold text-amber-800 mb-1">Database not connected</h2>
          <p className="text-sm text-amber-700">
            Set DATABASE_URL in your environment variables and run migrations to enable CMS features.
            The public site is using static fallback data.
          </p>
        </div>
      )}

      {counts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/dashboard/vendors"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <p className="text-3xl font-bold text-gray-900">{counts.vendors}</p>
            <p className="text-sm text-gray-500 mt-1">Vendors</p>
          </Link>
          <Link
            href="/dashboard/testimonials"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <p className="text-3xl font-bold text-gray-900">{counts.testimonials}</p>
            <p className="text-sm text-gray-500 mt-1">Testimonials</p>
          </Link>
        </div>
      )}
    </div>
  );
}
