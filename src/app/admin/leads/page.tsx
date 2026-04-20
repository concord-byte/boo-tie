"use client";

import { useState, useMemo } from "react";

type Status = "new" | "contacted" | "converted" | "closed";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  partner: string;
  status: Status;
  date: string;
}

const MOCK_LEADS: Lead[] = [
  { id: 1, name: "James Carter", email: "jcarter@lincoln.edu", company: "Lincoln High School", partner: "PerformAll", status: "new", date: "2026-04-18" },
  { id: 2, name: "Maria Lopez", email: "mlopez@westfield.org", company: "Westfield Academy", partner: "Meridian", status: "contacted", date: "2026-04-17" },
  { id: 3, name: "David Kim", email: "dkim@oakridge.edu", company: "Oak Ridge HS", partner: "Musco Lighting", status: "converted", date: "2026-04-15" },
  { id: 4, name: "Sarah Chen", email: "schen@riverdale.edu", company: "Riverdale Prep", partner: "Hudl", status: "new", date: "2026-04-18" },
  { id: 5, name: "Michael Brown", email: "mbrown@jefferson.org", company: "Jefferson ISD", partner: "Learfield", status: "closed", date: "2026-04-10" },
  { id: 6, name: "Emily Davis", email: "edavis@summit.edu", company: "Summit Schools", partner: "Dynamic Sponsorship", status: "contacted", date: "2026-04-16" },
  { id: 7, name: "Robert Wilson", email: "rwilson@harbor.edu", company: "Harbor View HS", partner: "PerformAll", status: "new", date: "2026-04-19" },
  { id: 8, name: "Amanda Taylor", email: "ataylor@crestwood.org", company: "Crestwood Academy", partner: "Meridian", status: "converted", date: "2026-04-12" },
  { id: 9, name: "Chris Martinez", email: "cmartinez@valley.edu", company: "Valley Christian", partner: "Musco Lighting", status: "contacted", date: "2026-04-14" },
  { id: 10, name: "Jessica White", email: "jwhite@parkland.edu", company: "Parkland Schools", partner: "Hudl", status: "new", date: "2026-04-19" },
  { id: 11, name: "Andrew Johnson", email: "ajohnson@liberty.org", company: "Liberty Academy", partner: "PerformAll", status: "closed", date: "2026-04-08" },
  { id: 12, name: "Rachel Green", email: "rgreen@maplewood.edu", company: "Maplewood HS", partner: "Learfield", status: "new", date: "2026-04-20" },
  { id: 13, name: "Tyler Scott", email: "tscott@ridgewood.edu", company: "Ridgewood Prep", partner: "Dynamic Sponsorship", status: "contacted", date: "2026-04-13" },
  { id: 14, name: "Nicole Adams", email: "nadams@cedar.edu", company: "Cedar Hill ISD", partner: "PerformAll", status: "converted", date: "2026-04-11" },
  { id: 15, name: "Kevin Thompson", email: "kthompson@eagle.org", company: "Eagle Rock School", partner: "Meridian", status: "new", date: "2026-04-20" },
  { id: 16, name: "Laura Mitchell", email: "lmitchell@brookside.edu", company: "Brookside Academy", partner: "Musco Lighting", status: "contacted", date: "2026-04-17" },
  { id: 17, name: "Daniel Harris", email: "dharris@fairview.edu", company: "Fairview HS", partner: "Hudl", status: "closed", date: "2026-04-09" },
  { id: 18, name: "Samantha Lee", email: "slee@sunrise.org", company: "Sunrise Academy", partner: "Learfield", status: "new", date: "2026-04-19" },
];

const PARTNERS = ["PerformAll", "Meridian", "Musco Lighting", "Hudl", "Learfield", "Dynamic Sponsorship"];
const STATUSES: Status[] = ["new", "contacted", "converted", "closed"];
const PAGE_SIZE = 8;

const statusColors: Record<Status, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [partnerFilter, setPartnerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_LEADS.filter((l) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.company.toLowerCase().includes(q);
      const matchesPartner = !partnerFilter || l.partner === partnerFilter;
      const matchesStatus = !statusFilter || l.status === statusFilter;
      return matchesSearch && matchesPartner && matchesStatus;
    });
  }, [search, partnerFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function exportCSV() {
    const header = "Name,Email,Company,Partner,Status,Date";
    const rows = filtered.map((l) => `"${l.name}","${l.email}","${l.company}","${l.partner}","${l.status}","${l.date}"`);
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Leads</h2>
          <p className="text-sm text-gray-500 mt-1">{filtered.length} total</p>
        </div>
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search name, email, or company..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
        />
        <select
          value={partnerFilter}
          onChange={(e) => { setPartnerFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
        >
          <option value="">All Partners</option>
          {PARTNERS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden md:table-cell">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden lg:table-cell">Partner</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => console.log("Navigate to lead", lead.id)}
                  className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">{lead.name}</td>
                  <td className="py-3 px-4 text-gray-600">{lead.email}</td>
                  <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{lead.company}</td>
                  <td className="py-3 px-4 text-gray-600 hidden lg:table-cell">{lead.partner}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{lead.date}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">No leads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1.5 text-sm rounded-lg border ${currentPage === i + 1 ? "bg-navy text-white border-navy" : "border-gray-200 hover:bg-gray-50"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
