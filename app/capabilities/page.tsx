import type { Metadata } from "next";
import Image from "next/image";
import { capabilitySections } from "@/data/capabilities";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Laboratory infrastructure, instrumentation, synthesis, purification, and analytical capabilities at HKR Biotech Labs.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=1400&h=600&fit=crop&q=80&auto=format";

const SECTION_ACCENTS = [
  { eyebrow: "text-primary-mid", tint: "from-[rgba(44,59,77,0.42)] to-[rgba(18,25,35,0.62)]", bullet: "from-primary to-primary-mid", metricRing: "border-primary/30", orb: "rgba(20,184,166,0.18)" },
  { eyebrow: "text-primary-mid", tint: "from-[rgba(74,93,114,0.4)] to-[rgba(18,25,35,0.62)]", bullet: "from-accent to-primary-mid", metricRing: "border-accent/30", orb: "rgba(124,58,237,0.15)" },
  { eyebrow: "text-primary-mid", tint: "from-[rgba(163,81,57,0.3)] to-[rgba(18,25,35,0.62)]", bullet: "from-danger to-primary-mid", metricRing: "border-danger/30", orb: "rgba(225,29,72,0.12)" },
  { eyebrow: "text-primary-mid", tint: "from-[rgba(44,59,77,0.38)] via-[rgba(74,93,114,0.32)] to-[rgba(18,25,35,0.62)]", bullet: "from-primary to-primary-mid", metricRing: "border-primary/30", orb: "rgba(20,184,166,0.14)" },
  { eyebrow: "text-primary-mid", tint: "from-[rgba(74,93,114,0.36)] via-[rgba(163,81,57,0.22)] to-[rgba(18,25,35,0.62)]", bullet: "from-accent to-primary-mid", metricRing: "border-accent/30", orb: "rgba(124,58,237,0.12)" },
] as const;

const HIGHLIGHTS = [
  { label: "Prep stations", value: "Multi-line HPLC", accent: "from-primary to-primary-deep" },
  { label: "Characterization", value: "LC–MS + 400 MHz NMR", accent: "from-accent to-accent" },
  { label: "Project model", value: "Dedicated leads", accent: "from-danger to-danger" },
];

export default function CapabilitiesPage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.16]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pt-6 pb-28 sm:px-6 md:space-y-20 lg:px-8">

        {/* Hero — photo with dark wash */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[2rem] border border-on-dark/22 shadow-[0_12px_48px_-12px_rgba(18,25,35,0.58)]">
            <Image
              src={HERO_IMAGE}
              alt="Laboratory instrumentation"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(7,14,27,0.85) 0%, rgba(7,14,27,0.75) 45%, rgba(7,14,27,0.5) 100%)",
              }}
            />

            <div
              className="pointer-events-none absolute right-[8%] top-8 h-12 w-12 animate-orbit-slow rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(20,184,166,0.3) 55%, rgba(15,118,110,0.1))",
                boxShadow: "0 6px 20px -4px rgba(20,184,166,0.35)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-10 right-[18%] h-7 w-7 animate-orbit-slow rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(124,58,237,0.3) 55%, rgba(91,33,182,0.1))",
                boxShadow: "0 4px 14px -3px rgba(91,33,182,0.3)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[60%]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-primary-mid">
                Infrastructure
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-on-dark md:text-5xl">
                Capabilities
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-dark/84">
                Quantified infrastructure, redundant characterization, and synthesis
                depth — modular blocks you can map to your program milestones.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.35)]"
                >
                  Discuss your needs
                </ButtonLink>
                <ButtonLink
                  href="#infrastructure"
                  variant="secondary"
                  className="rounded-full border-on-dark/35 bg-[rgba(18,25,35,0.5)] px-10 text-on-dark hover:border-on-dark/55 hover:bg-[rgba(18,25,35,0.66)]"
                >
                  Explore below
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Highlight metrics */}
        <RevealOnScroll>
          <div className="grid gap-5 sm:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <RevealOnScroll key={h.label} delay={i * 60}>
                <div className="rounded-[1.5rem] border border-on-dark/18 bg-[rgba(18,25,35,0.5)] p-6 text-center shadow-[0_4px_16px_-8px_rgba(18,25,35,0.68)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_8px_24px_-10px_rgba(18,25,35,0.75)]">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-on-dark/70">
                    {h.label}
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold text-on-dark">
                    {h.value}
                  </p>
                  <div className={`mx-auto mt-3 h-1 w-10 rounded-full bg-gradient-to-r ${h.accent}`} aria-hidden />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>

        {/* Capability sections */}
        {capabilitySections.map((section, si) => {
          const accent = SECTION_ACCENTS[si % SECTION_ACCENTS.length];
          return (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <RevealOnScroll>
                <p className={`font-mono text-[11px] font-semibold uppercase tracking-[0.28em] ${accent.eyebrow}`}>
                  {section.id.replace(/-/g, " ")}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">
                  {section.heading}
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-on-dark/82">
                  {section.subheading}
                </p>
              </RevealOnScroll>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {section.blocks.map((block, bi) => (
                  <RevealOnScroll key={block.title} delay={bi * 60}>
                    <article
                      className={`group relative h-full overflow-hidden rounded-[1.75rem] border border-on-dark/20 bg-gradient-to-b ${accent.tint} p-7 shadow-[0_8px_32px_-12px_rgba(18,25,35,0.7)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_16px_44px_-14px_rgba(18,25,35,0.78)]`}
                    >
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                        style={{ background: `radial-gradient(circle, ${accent.orb} 0%, transparent 70%)` }}
                        aria-hidden
                      />

                      <div className="relative">
                        <h3 className="font-display text-lg font-semibold text-on-dark">
                          {block.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-on-dark/82">
                          {block.description}
                        </p>

                        {block.metrics && block.metrics.length > 0 && (
                          <dl className="mt-5 flex flex-wrap gap-2.5">
                            {block.metrics.map((m) => (
                              <div
                                key={m.label}
                                className={`rounded-full border ${accent.metricRing} bg-[rgba(18,25,35,0.48)] px-3.5 py-1.5 text-xs shadow-[0_2px_10px_-4px_rgba(0,0,0,0.3)] backdrop-blur-lg`}
                              >
                                <dt className="font-mono text-[9px] uppercase tracking-wider text-on-dark/65">
                                  {m.label}
                                </dt>
                                <dd className="font-semibold text-on-dark">{m.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                      </div>
                    </article>
                  </RevealOnScroll>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA — dark gradient */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2.5rem] border border-on-dark/22 p-10 text-center shadow-[0_16px_64px_-16px_rgba(18,25,35,0.55)] backdrop-blur-xl sm:p-14"
            style={{
              background:
                "linear-gradient(140deg, rgba(18,25,35,0.76) 0%, rgba(27,38,50,0.62) 35%, rgba(44,59,77,0.56) 62%, rgba(74,93,114,0.5) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -left-4 top-8 h-16 w-16 rounded-full sm:h-20 sm:w-20"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(20,184,166,0.4) 55%, rgba(15,118,110,0.2))",
                boxShadow: "0 8px 28px -6px rgba(20,184,166,0.35), inset 0 -2px 6px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-3 bottom-6 h-12 w-12 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(124,58,237,0.4) 55%, rgba(91,33,182,0.2))",
                boxShadow: "0 6px 20px -4px rgba(91,33,182,0.3), inset 0 -2px 5px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
              aria-hidden
            />
            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-on-dark/78">
                Next step
              </p>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-on-dark md:text-3xl">
                Map These Capabilities to Your Program
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-on-dark/84">
                Tell us your molecule class, target timeline, and analytical expectations
                — we respond with a technical capability fit, not a brochure.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.35)]"
                >
                  Start a conversation
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="secondary"
                  className="rounded-full border-on-dark/35 bg-[rgba(18,25,35,0.5)] px-10 text-on-dark hover:border-on-dark/55 hover:bg-[rgba(18,25,35,0.66)]"
                >
                  View services
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
