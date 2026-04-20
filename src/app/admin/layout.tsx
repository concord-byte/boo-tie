import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
  title: "BowTie Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-light-gray">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-semibold text-navy pl-12 lg:pl-0">BowTie Admin</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm font-medium">
              A
            </div>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
