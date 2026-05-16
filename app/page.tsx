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
import { getSiteUrl } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "HKR Biotech Labs | Precision Chemistry for Pharma",
  description:
    "Partner with HKR Biotech Labs for custom synthesis, API impurity standards, carbohydrates, and nucleotide chemistry supported by traceable analytics.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "HKR Biotech Labs",
        url: siteUrl,
        logo: `${siteUrl}/hkr_logo.png`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "kishor@hkrbiotechlabs.com",
            telephone: "+91 9212123868",
          },
        ],
      },
      {
        "@type": "WebSite",
        name: "HKR Biotech Labs",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/products?query={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div className="relative -mt-[var(--site-header-offset)] overflow-hidden bg-[#020A63]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
