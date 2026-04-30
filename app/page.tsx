import type { Metadata } from "next";
import { LandingBento } from "@/components/landing/LandingBento";
import { LandingCategories } from "@/components/landing/LandingCategories";
import { LandingFinale } from "@/components/landing/LandingFinale";
import { LandingFounderNote } from "@/components/landing/LandingFounderNote";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingIndustries } from "@/components/landing/LandingIndustries";
import { LandingLabStory } from "@/components/landing/LandingLabStory";
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
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-[34rem] w-[34rem] -translate-x-1/3 -translate-y-1/3 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 38%, transparent 74%)",
          }}
        />
        <div
          className="absolute right-0 top-[12%] h-[38rem] w-[38rem] translate-x-1/3 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(125, 255, 219, 0.34) 0%, rgba(125, 255, 219, 0.14) 40%, transparent 76%)",
          }}
        />
        <div
          className="absolute bottom-0 left-[14%] h-[30rem] w-[30rem] translate-y-1/3 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.1) 42%, transparent 76%)",
          }}
        />
      </div>
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
