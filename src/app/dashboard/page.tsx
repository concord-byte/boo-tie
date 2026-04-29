import Link from "next/link";
import { isDatabaseConfigured, getPrisma } from "@/lib/db";

interface ContentHealth {
  vendors: {
    total: number;
    active: number;
    comingSoon: number;
    missingLogo: number;
    missingWebsite: number;
    lastUpdated: Date | null;
  };
  testimonials: {
    total: number;
    active: number;
    featured: number;
    inactive: number;
    lastUpdated: Date | null;
  };
}

async function getContentHealth(): Promise<ContentHealth | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const prisma = getPrisma();
    const [
      vendorTotal, vendorActive, vendorComingSoon, vendorMissingLogo,
      vendorMissingWebsite, lastVendor,
      testimonialTotal, testimonialActive, testimonialFeatured,
      testimonialInactive, lastTestimonial,
    ] = await Promise.all([
      prisma.vendor.count(),
      prisma.vendor.count({ where: { isActive: true } }),
      prisma.vendor.count({ where: { isComingSoon: true } }),
      prisma.vendor.count({ where: { OR: [{ logoUrl: null }, { logoUrl: "" }] } }),
      prisma.vendor.count({ where: { OR: [{ websiteUrl: null }, { websiteUrl: "" }] } }),
      prisma.vendor.findFirst({ orderBy: { updatedAt: "desc" }, select: { updatedAt: true } }),
      prisma.testimonial.count(),
      prisma.testimonial.count({ where: { isActive: true } }),
      prisma.testimonial.count({ where: { isFeatured: true } }),
      prisma.testimonial.count({ where: { isActive: false } }),
      prisma.testimonial.findFirst({ orderBy: { updatedAt: "desc" }, select: { updatedAt: true } }),
    ]);
    return {
      vendors: {
        total: vendorTotal,
        active: vendorActive,
        comingSoon: vendorComingSoon,
        missingLogo: vendorMissingLogo,
        missingWebsite: vendorMissingWebsite,
        lastUpdated: lastVendor?.updatedAt ?? null,
      },
      testimonials: {
        total: testimonialTotal,
        active: testimonialActive,
        featured: testimonialFeatured,
        inactive: testimonialInactive,
        lastUpdated: lastTestimonial?.updatedAt ?? null,
      },
    };
  } catch {
    return null;
  }
}

function StatCard({ value, label, href, accent }: { value: number; label: string; href?: string; accent?: string }) {
  const inner = (
    <>
      <p className={`text-3xl font-bold ${accent || "text-gray-900"}`}>{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </>
  );
  const cls = "bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow";
  return href ? <Link href={href} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>;
}

function WarningItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="text-amber-500 mt-0.5 shrink-0">!</span>
      <span className="text-gray-600">{text}</span>
    </div>
  );
}

function QuickLink({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div>
        <p className="text-sm font-medium text-gray-900 group-hover:text-amber-600 transition-colors">{label}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <svg className="w-4 h-4 text-gray-300 group-hover:text-amber-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function DashboardPage() {
  const health = await getContentHealth();

  const sheetUrl = process.env.ADMIN_GOOGLE_SHEET_URL;
  const gaUrl = process.env.ADMIN_GA_DASHBOARD_URL;
  const clarityUrl = process.env.ADMIN_CLARITY_DASHBOARD_URL;

  const warnings: string[] = [];
  if (health) {
    if (health.vendors.missingLogo > 0)
      warnings.push(`${health.vendors.missingLogo} vendor${health.vendors.missingLogo > 1 ? "s" : ""} missing a logo`);
    if (health.vendors.missingWebsite > 0)
      warnings.push(`${health.vendors.missingWebsite} vendor${health.vendors.missingWebsite > 1 ? "s" : ""} missing a website URL`);
    if (health.testimonials.inactive > 0)
      warnings.push(`${health.testimonials.inactive} testimonial${health.testimonials.inactive > 1 ? "s" : ""} hidden (inactive)`);
    if (health.testimonials.featured === 0)
      warnings.push("No featured testimonials — homepage section will be empty");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">BowTie content overview</p>
      </div>

      {!health && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="font-semibold text-amber-800 mb-1">Database not connected</h2>
          <p className="text-sm text-amber-700">
            Set DATABASE_URL in your environment variables and run migrations to enable CMS features.
          </p>
        </div>
      )}

      {health && (
        <>
          {/* Vendor stats */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Vendors</h2>
              {health.vendors.lastUpdated && (
                <span className="text-xs text-gray-400">Last edit: {timeAgo(health.vendors.lastUpdated)}</span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard value={health.vendors.total} label="Total" href="/dashboard/vendors" />
              <StatCard value={health.vendors.active} label="Active" accent="text-green-600" />
              <StatCard value={health.vendors.comingSoon} label="Coming Soon" accent="text-amber-600" />
              <StatCard value={health.vendors.missingLogo} label="Missing Logo" accent={health.vendors.missingLogo > 0 ? "text-red-500" : "text-gray-900"} />
            </div>
          </div>

          {/* Testimonial stats */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Testimonials</h2>
              {health.testimonials.lastUpdated && (
                <span className="text-xs text-gray-400">Last edit: {timeAgo(health.testimonials.lastUpdated)}</span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard value={health.testimonials.total} label="Total" href="/dashboard/testimonials" />
              <StatCard value={health.testimonials.active} label="Active" accent="text-green-600" />
              <StatCard value={health.testimonials.featured} label="Featured" accent="text-amber-600" />
              <StatCard value={health.testimonials.inactive} label="Hidden" accent={health.testimonials.inactive > 0 ? "text-gray-400" : "text-gray-900"} />
            </div>
          </div>

          {/* Content warnings */}
          {warnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-amber-800 mb-3">Content Warnings</h2>
              <div className="space-y-2">
                {warnings.map((w) => <WarningItem key={w} text={w} />)}
              </div>
            </div>
          )}
        </>
      )}

      {/* Quick links */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Quick Links</h2>
        <div className="divide-y divide-gray-100">
          <QuickLink href="https://www.bowtienetwork.com" label="Public Website" description="bowtienetwork.com" />
          {sheetUrl && (
            <QuickLink href={sheetUrl} label="Lead Spreadsheet" description="Google Sheets" />
          )}
          {gaUrl && (
            <QuickLink href={gaUrl} label="Google Analytics" description="Traffic & behavior" />
          )}
          {clarityUrl && (
            <QuickLink href={clarityUrl} label="Microsoft Clarity" description="Heatmaps & recordings" />
          )}
        </div>
      </div>
    </div>
  );
}
