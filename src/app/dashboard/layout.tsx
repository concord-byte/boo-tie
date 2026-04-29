import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import AdminShell from "@/components/AdminShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("bowtie_admin_token")?.value;

  if (!token || !verifyToken(token)) {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
