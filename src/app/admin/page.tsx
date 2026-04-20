const stats = [
  {
    label: "Total Leads",
    value: "142",
    change: "+12%",
    up: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "New This Week",
    value: "18",
    change: "+5",
    up: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    label: "Converted",
    value: "34",
    change: "24%",
    up: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Closed / Lost",
    value: "21",
    change: "-3",
    up: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
];

const partnerBreakdown = [
  { name: "PerformAll", leads: 38 },
  { name: "Meridian", leads: 29 },
  { name: "Musco Lighting", leads: 25 },
  { name: "Hudl", leads: 22 },
  { name: "Learfield", leads: 17 },
  { name: "Dynamic Sponsorship", leads: 11 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Lead capture overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
                {s.icon}
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.up ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Partner breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-navy mb-4">Leads by Partner</h3>
        <div className="space-y-3">
          {partnerBreakdown.map((p) => {
            const pct = Math.round((p.leads / 142) * 100);
            return (
              <div key={p.name} className="flex items-center gap-4">
                <span className="w-40 text-sm font-medium text-gray-700 truncate">{p.name}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm font-semibold text-gray-600 w-10 text-right">{p.leads}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
