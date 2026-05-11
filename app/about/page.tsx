import Image from "next/image";
import type { Metadata } from "next";
import { AboutWhyChooseSection } from "@/components/about/AboutWhyChooseSection";
import { ExpertsContent } from "@/components/about/ExpertsContent";
import {
  aboutCoreExpertise,
  aboutHighlightMetrics,
  aboutMarketingHero,
} from "@/data/aboutMarketingContent";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { cn } from "@/lib/cn";
import { BRAND_SOLID_CARD_CYCLE } from "@/lib/ui/brandSolidCardCycle";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "HKR Biotech Pvt Ltd — global carbohydrate synthesis: custom glycans, modified sugars, nucleic-acid chemistry, impurities & reference standards, and worldwide logistics.",
};

const facilityLines = [
  "Carbohydrate & glycoprotein-linked synthesis support",
  "API / nitrosamine impurities and reference standards",
  "NMR, MS, UV, IR characterization and route consultation",
];

const complianceItems = [
  { k: "Quality system", v: "Document-controlled SOPs & training matrix" },
  { k: "Data integrity", v: "ALCOA+ aligned analytical records" },
  { k: "Safety", v: "Process hazard review for scale-up steps" },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1200&h=600&fit=crop&q=80&auto=format";
const LAB_IMAGE =
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=900&h=600&fit=crop&q=80&auto=format";

/** Large-screen column spans for a 12-col bento: row 7+5, row 4+4+4. */
const EXPERTISE_BENTO_SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

export default function AboutPage() {
  let expertiseCycle = 0;
  const titleAccent = aboutMarketingHero.titleAccentPhrase;
  const titleLead =
    titleAccent && aboutMarketingHero.title.includes(titleAccent)
      ? aboutMarketingHero.title.replace(titleAccent, "").trim()
      : null;

  return (
    <div className="relative overflow-x-hidden bg-[#020A63] pb-28">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.12]" />

      {/* Hero */}
      <section className="relative z-10 px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)]">
          <Image
            src={HERO_IMAGE}
            alt="HKR Biotech laboratory"
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
          <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[88%] xl:max-w-4xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-primary-mid">{aboutMarketingHero.eyebrow}</p>
              <h1 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-on-dark sm:text-5xl md:text-6xl">
                {titleLead ? (
                  <>
                    {titleLead}{" "}
                    <span className="gradient-text-shimmer">{titleAccent}</span>
                  </>
                ) : (
                  aboutMarketingHero.title
                )}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-on-dark/84 md:text-xl">{aboutMarketingHero.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact" className="rounded-full px-10 shadow-primary-glow">
                  Partner with HKR
                </ButtonLink>
                <ButtonLink
                  href="#core-expertise-heading"
                  variant="secondary"
                  className="rounded-full border-white/30 bg-white/10 px-10 text-on-dark backdrop-blur-sm hover:border-white/45 hover:bg-white/16"
                >
                  Explore expertise
                </ButtonLink>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Highlight metrics */}
      <section className="relative z-10 mt-10 px-4 sm:px-6 lg:px-8" aria-label="At a glance">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-3">
            {aboutHighlightMetrics.map((h, i) => {
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
                        light ? "bg-gradient-to-r from-primary/70 to-accent/70" : "bg-gradient-to-r from-white/45 to-white/20",
                      )}
                      aria-hidden
                    />
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Core Expertise */}
      <section className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8" aria-labelledby="core-expertise-heading">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">What we deliver</p>
            <h2 id="core-expertise-heading" className="mt-2 font-display text-4xl font-extrabold tracking-tight text-on-dark md:text-5xl">
              {aboutCoreExpertise.heading}
            </h2>
            <p className="mt-4 max-w-3xl text-base text-on-dark/78 md:text-lg">{aboutCoreExpertise.subheading}</p>
          </RevealOnScroll>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {aboutCoreExpertise.items.map((item, i) => {
              const v = BRAND_SOLID_CARD_CYCLE[expertiseCycle % BRAND_SOLID_CARD_CYCLE.length];
              expertiseCycle += 1;
              const light = v.surface === "#e8f4ef";
              const bentoSpan = EXPERTISE_BENTO_SPANS[i] ?? "lg:col-span-4";
              return (
                <RevealOnScroll key={item.title} delay={i * 55} className={bentoSpan}>
                  <article
                    style={{ backgroundColor: v.surface }}
                    className={cn(
                      "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.75rem] border p-8 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-18px_rgba(2,10,99,0.35)] sm:p-9",
                      i === 0 && "lg:min-h-[220px]",
                      v.shell,
                    )}
                  >
                    <span
                      className={cn(
                        "absolute right-6 top-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em]",
                        light ? v.secondary : "text-on-dark/40",
                      )}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl"
                      style={{
                        background:
                          light
                            ? "radial-gradient(circle, rgba(255,255,255,0.82), transparent 70%)"
                            : "radial-gradient(circle, rgba(255,255,255,0.34), transparent 70%)",
                      }}
                      aria-hidden
                    />
                    <span className={cn("relative mb-4 block h-10 w-10 rounded-full", v.orbShell)} style={{ background: v.orb }} aria-hidden />
                    <h3
                      className={cn(
                        "relative pr-12 font-display font-extrabold leading-snug tracking-tight",
                        i === 0 ? "text-2xl md:text-3xl lg:text-[1.85rem] lg:leading-tight" : "text-xl md:text-2xl lg:text-[1.4rem]",
                        v.title,
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "relative mt-4 flex-1 text-base leading-relaxed text-balance md:text-lg md:leading-relaxed",
                        v.body,
                      )}
                    >
                      {item.description}
                    </p>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <AboutWhyChooseSection />

      {/* Client content: experts, culture, work-with CTA */}
      <ExpertsContent />

      {/* Infrastructure */}
      <section className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/20 shadow-[0_18px_48px_-14px_rgba(2,10,99,0.5)]">
          <Image src={LAB_IMAGE} alt="Modern laboratory facility" fill sizes="100vw" className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(2,10,99,0.88) 0%, rgba(2,10,99,0.68) 40%, rgba(2,10,99,0.48) 100%)",
            }}
          />

          <div
            className="absolute right-[8%] top-8 h-12 w-12 animate-orbit-slow rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.45), color-mix(in srgb, var(--accent) 32%, transparent) 55%, transparent)",
              boxShadow: "0 6px 20px -4px rgba(43,196,138,0.35)",
            }}
            aria-hidden
          />
          <div
            className="absolute bottom-12 left-[6%] h-7 w-7 animate-orbit-slow rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.45), color-mix(in srgb, var(--primary) 38%, transparent) 55%, transparent)",
              boxShadow: "0 4px 14px -3px rgba(26,115,232,0.35)",
              animationDelay: "-5s",
              animationDuration: "14s",
            }}
            aria-hidden
          />

          <div className="relative px-8 py-14 sm:px-12 md:py-16">
            <RevealOnScroll>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-mid">Infrastructure</p>
              <h2 className="mt-2 font-display text-4xl font-extrabold text-on-dark md:text-5xl">Laboratory Facilities</h2>
              <p className="mt-3 max-w-2xl text-on-dark/80">Segregated suites, controlled storage, redundant characterization.</p>
            </RevealOnScroll>

            <ul className="relative mt-10 grid gap-4 sm:grid-cols-2">
              {facilityLines.map((line, i) => (
                <RevealOnScroll key={line} delay={i * 50}>
                  <li className="flex gap-3 text-sm text-on-dark/90">
                    <span
                      className={cn(
                        "mt-2 h-1.5 w-5 shrink-0 rounded-full shadow-sm",
                        i % 2 === 0 ? "bg-gradient-to-r from-primary to-accent" : "bg-gradient-to-r from-accent to-primary",
                      )}
                      aria-hidden
                    />
                    {line}
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">Compliance</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-on-dark md:text-5xl">
              Certifications &amp; Posture
            </h2>
            <p className="mt-4 max-w-2xl text-base text-on-dark/80">Controls that scale with your program and audit needs.</p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {complianceItems.map((item, i) => {
              const v = BRAND_SOLID_CARD_CYCLE[i % BRAND_SOLID_CARD_CYCLE.length];
              return (
                <RevealOnScroll key={item.k} delay={i * 55}>
                  <article
                    style={{ backgroundColor: v.surface }}
                    className={cn(
                      "h-full overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300 hover:-translate-y-0.5",
                      v.shell,
                    )}
                  >
                    <div
                      className={cn("mb-5 h-9 w-9 rounded-full", v.orbShell)}
                      style={{ background: v.orb }}
                      aria-hidden
                    />
                    <h3 className={cn("font-mono text-[11px] font-semibold uppercase tracking-[0.2em]", v.secondary)}>{item.k}</h3>
                    <p className={cn("mt-3 text-sm leading-relaxed", v.body)}>{item.v}</p>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>
          <RevealOnScroll delay={180}>
            <p className="mt-8 text-center text-xs text-on-dark/55">
              GMP batches can be orchestrated with partner sites when your program requires audited manufacturing.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Bottom CTA — matches services band */}
      <section className="relative z-10 mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
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
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1459b8]/90">Contact</p>
                <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-extrabold text-[#0d2137] md:text-4xl">
                  Start your program
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm text-[#234a62] md:text-base">
                  Share structure, purity target, and timeline — we reply with feasibility and a clear path.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <ButtonLink href="/contact" className="rounded-full px-10 shadow-primary-glow">
                    Start a conversation
                  </ButtonLink>
                  <ButtonLink
                    href="/leadership"
                    variant="secondary"
                    className="rounded-full border-[#17324d]/18 bg-white/90 px-10 text-[#0d2137] hover:border-primary/35 hover:bg-white"
                  >
                    Leadership &amp; team
                  </ButtonLink>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
