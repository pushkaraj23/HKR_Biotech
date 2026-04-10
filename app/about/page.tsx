import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageBanner } from "@/components/ui/PageBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Company overview, vision, leadership, infrastructure, and compliance posture at HKR Biotech Labs.",
};

const leadership = [
  {
    name: "Dr. placeholder — CSO",
    role: "Chief Scientific Officer",
    bio: "Two decades in process chemistry and impurity strategy across global pharma programs.",
  },
  {
    name: "Dr. placeholder — VP Operations",
    role: "VP, Operations & Quality Systems",
    bio: "Laboratory automation, analytical governance, and tech transfer for complex synthesis.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-20">
        <PageBanner
          title="About HKR Biotech Labs"
          description="An independent advanced synthesis partner — blending rigorous analytics with agile chemistry for teams who cannot compromise on traceability."
        />

        <SectionWrapper className="py-0">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Overview"
              title="Company overview"
              subtitle="HKR was founded to close the gap between boutique synthesis shops and slow-moving CMOs — delivering PhD-level scientific partnership with industrial discipline."
            />
          </RevealOnScroll>
          <div className="grid gap-8 lg:grid-cols-2">
            <RevealOnScroll>
              <GlassCard className="h-full p-8">
                <h3 className="font-display text-xl font-semibold text-text-primary">What we do</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  We design and execute custom syntheses for rare building blocks, API-related impurities,
                  and nucleotide chemistry — with analytical packages that stand up to regulatory scrutiny
                  and discovery sprint timelines alike.
                </p>
              </GlassCard>
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <div className="overflow-hidden rounded-3xl border border-border-subtle">
                <div
                  className="min-h-[280px] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(15,23,42,0.06), rgba(15,23,42,0.35)), url(https://images.unsplash.com/photo-1532187863486-def9d8a732e2?w=1200&q=80)",
                  }}
                  role="img"
                  aria-label="Laboratory glassware and synthesis environment"
                />
              </div>
            </RevealOnScroll>
          </div>
        </SectionWrapper>

        <SectionWrapper className="py-0">
          <div className="grid gap-10 lg:grid-cols-2">
            <RevealOnScroll>
              <GlassCard className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
                  Vision
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-text-primary">
                  Chemistry infrastructure that accelerates evidence generation
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  We envision a model where discovery teams can access complex molecules without waiting
                  quarters for a slot — while retaining the documentation depth regulators expect.
                </p>
              </GlassCard>
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <GlassCard className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-secondary">
                  Mission
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold text-text-primary">
                  Deliver defensible materials with scientific transparency
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  Our mission is to pair reproducible synthesis with analytical storytelling — so every
                  shipment arrives with context, not just a container label.
                </p>
              </GlassCard>
            </RevealOnScroll>
          </div>
        </SectionWrapper>

        <SectionWrapper className="py-0">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Leadership"
              title="Team"
              subtitle="A deliberately senior-heavy scientific staff — fewer handoffs, clearer accountability."
            />
          </RevealOnScroll>
          <div className="grid gap-6 md:grid-cols-2">
            {leadership.map((person, i) => (
              <RevealOnScroll key={person.name} delay={i * 50}>
                <GlassCard className="p-8">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-accent-secondary/30 to-accent-deep/40 ring-1 ring-border-subtle" />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-text-primary">{person.name}</h3>
                      <p className="text-xs uppercase tracking-wider text-accent-secondary">{person.role}</p>
                      <p className="mt-3 text-sm text-text-secondary">{person.bio}</p>
                    </div>
                  </div>
                </GlassCard>
              </RevealOnScroll>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper className="py-0">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Infrastructure"
              title="Laboratory facilities"
              subtitle="Segregated synthesis suites, controlled storage, and redundant characterization — engineered for batch continuity."
            />
          </RevealOnScroll>
          <GlassCard className="p-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                "Walk-in cold rooms & segregated stabilizer storage",
                "Dedicated prep HPLC farm with fraction barcoding",
                "Inert-atmosphere manifold distribution across hood lines",
                "Secure archival of analytical data packages",
              ].map((line) => (
                <li key={line} className="flex gap-2 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary" />
                  {line}
                </li>
              ))}
            </ul>
          </GlassCard>
        </SectionWrapper>

        <SectionWrapper className="py-0">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="Compliance"
              title="Certifications & posture"
              subtitle="Phase-appropriate controls with a roadmap to formal audits where programs demand them."
            />
          </RevealOnScroll>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { k: "Quality system", v: "Document-controlled SOPs & training matrix" },
              { k: "Data integrity", v: "ALCOA+ aligned analytical records" },
              { k: "Safety", v: "Process hazard review for scale-up steps" },
            ].map((item) => (
              <GlassCard key={item.k} className="p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">{item.k}</h3>
                <p className="mt-3 text-sm text-text-secondary">{item.v}</p>
              </GlassCard>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-text-muted">
            Formal GMP certification can be pursued via qualified partner sites — HKR orchestrates tech transfer when programs require audited batches.
          </p>
        </SectionWrapper>

        <div className="flex justify-center pb-8">
          <ButtonLink href="/contact">Start a conversation</ButtonLink>
        </div>
      </div>
    </div>
  );
}
