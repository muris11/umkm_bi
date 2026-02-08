import { Footer } from "@/components/layout/footer";
import { PublicNavbar } from "@/components/layout/public-navbar";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Dashboard UMKM Jawa Barat - Data & Analisis Publik",
  description: "Portal data terbuka UMKM Jawa Barat. Akses analisis sebaran, kinerja, dan peluang investasi UMKM di 27 Kabupaten/Kota (Data 2019-2025).",
  keywords: ["UMKM", "Jawa Barat", "Dashboard", "Data", "Analisis", "Bisnis", "Investasi"],
  openGraph: {
    title: "Dashboard UMKM Jawa Barat",
    description: "Peta sebaran dan kinerja 9+ Juta UMKM di Jawa Barat.",
    type: "website",
    locale: "id_ID",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <PublicNavbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
