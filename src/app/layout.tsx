import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bowtienetwork.com",
  ),
  title: "BowTie School Partners — Tying It All Together",
  description:
    "BowTie connects schools, best-in-class vendors, and respected national brands through one reliable partner. Strategic school partnerships that deliver real value.",
  openGraph: {
    title: "BowTie School Partners — Tying It All Together",
    description:
      "A network where schools, best-in-class vendors, and respected brands all win together.",
    siteName: "BowTie School Partners",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Analytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
