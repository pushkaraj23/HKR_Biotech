import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const reasons = [
  { title: "Purity", text: "Batch release against agreed specifications with full analytical traceability." },
  { title: "Precision", text: "Documented processes, controlled environments, and scientific judgment at every step." },
  { title: "Reliability", text: "Milestone-based communication with proactive risk disclosure." },
  { title: "Scientific expertise", text: "Cross-functional teams spanning synthesis, separation science, and structure proof." },
  { title: "Custom synthesis support", text: "Dedicated chemists for route iteration, impurity isolation, and scale-up planning." },
];

export function HomeWhy() {
  return (
    <SectionWrapper>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Why HKR"
            title="Why teams choose HKR Biotech Labs"
            subtitle="We combine advanced synthesis with analytical depth — delivering materials you can defend in regulatory and discovery forums alike."
            className="mb-0"
          />
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <ul className="space-y-5">
            {reasons.map((r, i) => (
              <li
                key={r.title}
                className="glass-panel rounded-2xl px-5 py-4 transition hover:border-primary/25"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  );
}
