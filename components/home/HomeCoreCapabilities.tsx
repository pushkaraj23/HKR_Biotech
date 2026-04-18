import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import Link from "next/link";

const caps = [
  {
    title: "Synthesis",
    body: "Route-enabled chemistry from exploratory mg batches to scalable isolations with safety review.",
  },
  {
    title: "Purification",
    body: "Prep HPLC, crystallization, and chiral resolution tuned to stability and regulatory needs.",
  },
  {
    title: "Analytical support",
    body: "UHPLC, LC–MS, and high-field NMR pipelines with controlled documentation and traceability.",
  },
  {
    title: "Research expertise",
    body: "PhD-led teams partnering on impurity fate, linker design, and method development.",
  },
];

export function HomeCoreCapabilities() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-transparent via-surface/30 to-transparent">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Capabilities"
          title="Core capabilities across the discovery–development continuum"
          subtitle="A vertically integrated laboratory model that keeps synthesis, isolation, and analytical release under one scientific roof."
        />
      </RevealOnScroll>
      <div className="grid gap-6 sm:grid-cols-2">
        {caps.map((c, i) => (
          <RevealOnScroll key={c.title} delay={i * 50}>
            <GlassCard className="h-full p-8">
              <h3 className="font-display text-xl font-semibold text-foreground">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </GlassCard>
          </RevealOnScroll>
        ))}
      </div>
      <RevealOnScroll>
        <div className="mt-10 text-center">
          <Link
            href="/capabilities"
            className="text-sm font-medium text-primary hover:underline"
          >
            View full capability map →
          </Link>
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
