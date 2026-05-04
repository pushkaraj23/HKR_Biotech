import type { Metadata } from "next";
import Image from "next/image";
import { capabilitySections } from "@/data/capabilities";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Laboratory infrastructure, instrumentation, synthesis, purification, and analytical capabilities at HKR Biotech Labs.",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=1400&h=600&fit=crop&q=80&auto=format";

const HIGHLIGHTS = [
  { label: "Prep stations", value: "Multi-line HPLC" },
  { label: "Characterization", value: "LC–MS + 400 MHz NMR" },
  { label: "Project model", value: "Dedicated leads" },
];

export default function CapabilitiesPage() {
  let cardCycleIndex = 0;

  return (
    <div className="relative overflow-x-hidden bg-[#020A63]">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pb-28 pt-6 sm:px-6 md:space-y-20 lg:px-8">

        {/* Hero */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)]">
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
                  "linear-gradient(115deg, rgba(2,10,99,0.88) 0%, rgba(2,10,99,0.72) 42%, color-mix(in srgb, var(--primary) 22%, transparent) 100%)",
              }}
            />

            <div
              className="pointer-events-none absolute right-[8%] top-8 h-12 w-12 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--accent) 35%, transparent) 55%, transparent)",
                boxShadow: "0 6px 20px -4px rgba(43,196,138,0.35), inset 0 -2px 5px rgba(0,0,0,0.1)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-10 right-[18%] h-7 w-7 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), color-mix(in srgb, var(--primary) 40%, transparent) 55%, transparent)",
                boxShadow: "0 4px 14px -3px rgba(26,115,232,0.35), inset 0 -1px 4px rgba(0,0,0,0.1)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[60%]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-primary-mid">
                Infrastructure
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-on-dark md:text-5xl">Capabilities</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-dark/84">
                Quantified infrastructure, redundant characterization, and synthesis depth — modular blocks you can map
                to your program milestones.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" className="rounded-full px-10 shadow-primary-glow">
                  Discuss your needs
                </ButtonLink>
                <ButtonLink
                  href="#infrastructure"
                  variant="secondary"
                  className="rounded-full border-white/30 bg-white/10 px-10 text-on-dark backdrop-blur-sm hover:border-white/45 hover:bg-white/16"
                >
                  Explore below
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Highlight metrics — solid brand cycle */}
        <RevealOnScroll>
          <div className="grid gap-5 sm:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => {
              const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
              const light = v.surface === "#e8f4ef";
              return (
                <RevealOnScroll key={h.label} delay={i * 60}>
                  <div
                    style={{ backgroundColor: v.surface }}
                    className={cn(
                      "rounded-[1.5rem] border p-6 text-center transition-all duration-200 hover:-translate-y-0.5",
                      v.shell,
                    )}
                  >
                    <p className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.22em]", v.secondary)}>
                      {h.label}
                    </p>
                    <p className={cn("mt-2 font-display text-xl font-bold sm:text-2xl", v.title)}>{h.value}</p>
                    <div
                      className={cn(
                        "mx-auto mt-3 h-1 w-12 rounded-full",
                        light ? "bg-gradient-to-r from-primary to-accent" : "bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.35)]",
                      )}
                      aria-hidden
                    />
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Capability sections */}
        {capabilitySections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <RevealOnScroll>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                {section.id.replace(/-/g, " ")}
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">
                {section.heading}
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-on-dark/82">{section.subheading}</p>
            </RevealOnScroll>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {section.blocks.map((block) => {
                const v = BRAND_SOLID_CARD_CYCLE[cardCycleIndex % BRAND_SOLID_CARD_CYCLE.length];
                cardCycleIndex += 1;
                const light = v.surface === "#e8f4ef";
                const metricShell = light
                  ? "rounded-full border border-[#17324d]/12 bg-white/88 px-3.5 py-1.5 text-xs shadow-sm"
                  : "rounded-full border border-white/22 bg-black/28 px-3.5 py-1.5 text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm";
                const metricDt = light ? "text-[#4f6478]" : "text-on-dark/65";
                const metricDd = light ? "text-[#0d2137]" : "font-semibold text-on-dark";

                return (
                  <RevealOnScroll key={block.title}>
                    <article
                      style={{ backgroundColor: v.surface }}
                      className={cn(
                        "group relative h-full overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300 hover:-translate-y-1",
                        v.shell,
                      )}
                    >
                      <div
                        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-35 blur-2xl transition-opacity duration-500 group-hover:opacity-55"
                        style={{
                          background:
                            light
                              ? "radial-gradient(circle, rgba(255,255,255,0.75), transparent 70%)"
                              : "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
                        }}
                        aria-hidden
                      />

                      <div className="relative">
                        <span
                          className={cn("mb-5 block h-11 w-11 shrink-0 rounded-full", v.orbShell)}
                          style={{ background: v.orb }}
                          aria-hidden
                        />
                        <h3 className={cn("font-display text-lg font-semibold md:text-xl", v.title)}>{block.title}</h3>
                        <p className={cn("mt-3 text-sm leading-relaxed", v.body)}>{block.description}</p>

                        {block.metrics && block.metrics.length > 0 ? (
                          <dl className="mt-5 flex flex-wrap gap-2.5">
                            {block.metrics.map((m) => (
                              <div key={m.label} className={metricShell}>
                                <dt className={cn("font-mono text-[9px] uppercase tracking-wider", metricDt)}>
                                  {m.label}
                                </dt>
                                <dd className={cn("mt-0.5", metricDd)}>{m.value}</dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                      </div>
                    </article>
                  </RevealOnScroll>
                );
              })}
            </div>
          </section>
        ))}

        {/* CTA — light band (matches services) */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-white/45 px-8 py-12 text-center shadow-[0_16px_42px_-14px_rgba(18,50,90,0.28)] backdrop-blur-md sm:px-12 sm:py-14"
            style={{
              background:
                "linear-gradient(125deg, color-mix(in srgb, var(--light) 90%, var(--primary) 10%) 0%, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 55%, #e8f4ef 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full opacity-50 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 68%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full opacity-40 blur-3xl"
              style={{
                background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 28%, transparent), transparent 70%)",
              }}
              aria-hidden
            />

            <div className="relative">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1459b8]">Next step</p>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-[#0d2137] md:text-3xl">
                Map these capabilities to your program
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#234a62] md:text-base">
                Tell us your molecule class, target timeline, and analytical expectations — we respond with a technical
                capability fit, not a brochure.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" className="rounded-full px-10 shadow-primary-glow">
                  Start a conversation
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="secondary"
                  className="rounded-full border-[#17324d]/18 bg-white/90 px-10 text-[#0d2137] hover:border-primary/35 hover:bg-white"
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
