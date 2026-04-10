import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AuraBackdrop } from "@/components/ui/AuraBackdrop";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans-body",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "HKR Biotech Labs | Advanced Chemical Synthesis",
    template: "%s | HKR Biotech Labs",
  },
  description:
    "HKR Biotech Labs delivers high-purity carbohydrates, API impurities, and nucleotide building blocks with analytical rigor and custom synthesis partnership.",
  icons: {
    icon: [{ url: "/hkr_logo.png", type: "image/png" }],
    apple: "/hkr_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${ibmMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-100 font-sans text-text-primary">
        <AuraBackdrop />
        <SiteHeader />
        <main className="relative flex-1 pt-[var(--site-header-offset)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
