import type { Metadata } from "next";
import { capabilitySections } from "@/data/capabilities";
import { CapabilityCard } from "@/components/cards/CapabilityCard";
import { PageBanner } from "@/components/ui/PageBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Laboratory infrastructure, instrumentation, synthesis, purification, and analytical capabilities at HKR Biotech Labs.",
};

export default function CapabilitiesPage() {
  return (
    <div className="relative overflow-x-hidden px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <PageAmbientGraphics variant="long" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-16">
        <PageBanner
          title="Capabilities"
          description="Quantified infrastructure, redundant characterization, and synthesis depth — presented as modular blocks you can map to your program milestones."
        />

        <GlassCard className="grid gap-6 p-8 md:grid-cols-3">
          {[
            { label: "Prep stations", value: "Multi-line HPLC" },
            { label: "Characterization", value: "LC–MS + 400 MHz NMR" },
            { label: "Project model", value: "Dedicated leads" },
          ].map((m) => (
            <div key={m.label} className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">{m.label}</p>
              <p className="mt-2 font-display text-2xl font-bold text-text-primary">{m.value}</p>
            </div>
          ))}
        </GlassCard>

        {capabilitySections.map((section) => (
          <SectionWrapper key={section.id} id={section.id} className="py-0">
            <RevealOnScroll>
              <SectionHeading title={section.heading} subtitle={section.subheading} />
            </RevealOnScroll>
            <div className="grid gap-6 md:grid-cols-2">
              {section.blocks.map((block, i) => (
                <RevealOnScroll key={block.title} delay={i * 40}>
                  <CapabilityCard block={block} />
                </RevealOnScroll>
              ))}
            </div>
          </SectionWrapper>
        ))}
      </div>
    </div>
  );
}
