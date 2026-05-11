import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import Link from "next/link";

const caps = [
  {
    title: "Synthesis",
    body: "Routes from mg discovery to scalable batches.",
  },
  {
    title: "Purification",
    body: "Prep HPLC, crystallization, chiral resolution.",
  },
  {
    title: "Analytics",
    body: "UHPLC, LC–MS, NMR with controlled records.",
  },
  {
    title: "Expertise",
    body: "PhD-led support on impurities and methods.",
  },
];

export function HomeCoreCapabilities() {
  return (
    <SectionWrapper className="bg-gradient-to-b from-transparent via-surface/30 to-transparent">
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Lab"
          title="Core capabilities"
          subtitle="Synthesis, isolation, and analytical release in one accountable model."
        />
      </RevealOnScroll>
      <div className="grid gap-6 sm:grid-cols-2">
        {caps.map((c, i) => (
          <RevealOnScroll key={c.title} delay={i * 50}>
            <GlassCard className="h-full p-8">
              <h3 className="font-display text-2xl font-extrabold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </GlassCard>
          </RevealOnScroll>
        ))}
      </div>
      <RevealOnScroll>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="text-sm font-medium text-primary hover:underline"
          >
            Explore our services →
          </Link>
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
