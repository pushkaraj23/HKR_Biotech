import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WelcomeAuthModal } from "@/components/auth/WelcomeAuthModal";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { AuraBackdrop } from "@/components/ui/AuraBackdrop";
import { getSiteUrl } from "@/lib/seo/site";
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
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "HKR Biotech Labs | Advanced Chemical Synthesis",
    template: "%s | HKR Biotech Labs",
  },
  description:
    "HKR Biotech Labs delivers high-purity carbohydrates, API impurities, and nucleotide building blocks with analytical rigor and custom synthesis partnership.",
  keywords: [
    "custom chemical synthesis",
    "API impurities",
    "nucleotide building blocks",
    "carbohydrate chemistry",
    "analytical services",
    "impurity profiling",
    "GMP-ready documentation",
    "contract research",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "HKR Biotech Labs",
    title: "HKR Biotech Labs | Advanced Chemical Synthesis",
    description:
      "High-purity carbohydrates, API impurities, and nucleotide building blocks with custom synthesis and audit-ready analytics.",
    images: [
      {
        url: "/hkr_logo.png",
        width: 1200,
        height: 630,
        alt: "HKR Biotech Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HKR Biotech Labs | Advanced Chemical Synthesis",
    description:
      "Custom synthesis, analytical rigor, and documentation you can defend from route scouting to release.",
    images: ["/hkr_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "science",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} ${ibmMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <AuthProvider>
          <ScrollToTop />
          <WelcomeAuthModal />
          <AuraBackdrop />
          <SiteHeader />
          <main className="relative flex-1 pt-[var(--site-header-offset)]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
