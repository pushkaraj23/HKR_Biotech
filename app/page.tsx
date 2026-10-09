import type { Metadata } from "next";
import { LandingBento } from "@/components/landing/LandingBento";
import { LandingCategories } from "@/components/landing/LandingCategories";
import { LandingFinale } from "@/components/landing/LandingFinale";
import { LandingFounderNote } from "@/components/landing/LandingFounderNote";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingIndustries } from "@/components/landing/LandingIndustries";
import { LandingLabStory } from "@/components/landing/LandingLabStory";
import { LandingPageBackground } from "@/components/landing/LandingPageBackground";
import { LandingWhy } from "@/components/landing/LandingWhy";
import { contactChannels } from "@/data/contactPageContent";
import { HOME_SEO_KEYWORDS } from "@/lib/seo/keywords";
import { JsonLd } from "@/lib/seo/json-ld";
import { getSiteUrl } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    absolute: "HKR Biotech Labs | Custom Glycan Synthesis & Sugar Building Blocks",
  },
  description:
    "Global suppliers in affordable custom glycan synthesis and sugar building blocks — protected monosaccharides, bacterial oligosaccharides, modified nucleotide sugars, glycoconjugation, and glycan NMR analysis.",
  keywords: HOME_SEO_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "HKR Biotech Labs | Custom Glycan Synthesis & Sugar Building Blocks",
    description:
      "Custom glycan synthesis, sugar building blocks, protected monosaccharides, bacterial oligosaccharides, and glycan NMR analysis from Pune, India.",
    images: [{ url: "/hkr_logo.png", alt: "HKR Biotech Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HKR Biotech Labs | Custom Glycan Synthesis & Sugar Building Blocks",
    description:
      "Custom glycan synthesis, sugar building blocks, protected monosaccharides, and glycan NMR analysis.",
    images: ["/hkr_logo.png"],
  },
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "HKR Biotech Labs",
        legalName: "HKR Biotech Pvt. Ltd.",
        url: siteUrl,
        logo: `${siteUrl}/hkr_logo.png`,
        email: contactChannels.salesEmails[0]?.label ?? "sales@hkrbiotechlabs.com",
        telephone: contactChannels.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          streetAddress: "NCL Innovation Park, Pashan Road",
          addressLocality: "Pune",
          postalCode: "411008",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: contactChannels.salesEmails[0]?.label ?? "sales@hkrbiotechlabs.com",
            telephone: contactChannels.phoneHref.replace("tel:", ""),
            areaServed: "Worldwide",
            availableLanguage: ["English"],
          },
        ],
        knowsAbout: [...HOME_SEO_KEYWORDS],
      },
      {
        "@type": "WebSite",
        name: "HKR Biotech Labs",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/products?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div className="relative -mt-[var(--site-header-offset)] overflow-hidden bg-[#020A63]">
      <JsonLd data={structuredData} />
      <LandingPageBackground />
      <div className="relative z-10">
        <LandingHero />
        <LandingWhy />
        <LandingCategories />
        <LandingBento />
        <LandingIndustries />
        <LandingLabStory />
        <LandingFounderNote />
        <LandingFinale />
      </div>
    </div>
  );
}
