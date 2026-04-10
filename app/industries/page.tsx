import type { Metadata } from "next";
import { industries } from "@/data/industries";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { PageBanner } from "@/components/ui/PageBanner";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { GlassCard } from "@/components/ui/GlassCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Pharmaceutical, biotechnology, CRO, academic, and chemical industry programs supported by HKR Biotech Labs.",
};

export default function IndustriesPage() {
  return (
    <div className="relative overflow-x-hidden px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <PageAmbientGraphics variant="default" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-16">
        <PageBanner
          title="Industries"
          description="We tune communication, documentation, and risk disclosure to the governance model of each sector — without diluting scientific standards."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <RevealOnScroll key={ind.slug} delay={i * 40}>
              <div id={ind.slug} className="scroll-mt-28">
                <IndustryCard industry={ind} />
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <SectionWrapper className="py-0">
          <RevealOnScroll>
            <GlassCard className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  Not sure where your program fits?
                </h2>
                <p className="mt-2 max-w-xl text-sm text-text-secondary">
                  Share your stage, molecule class, and timeline — we will propose a delivery model aligned to your internal governance.
                </p>
              </div>
              <ButtonLink href="/contact">Talk to HKR</ButtonLink>
            </GlassCard>
          </RevealOnScroll>
        </SectionWrapper>
      </div>
    </div>
  );
}
