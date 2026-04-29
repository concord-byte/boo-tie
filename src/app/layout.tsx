import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BowTie Admin",
  robots: { index: false, follow: false },
  other: { "X-Robots-Tag": "noindex, nofollow" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="min-h-screen font-sans bg-gray-50">{children}</body>
    </html>
  );
}
