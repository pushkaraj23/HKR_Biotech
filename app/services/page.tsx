import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1400&h=600&fit=crop&q=80&auto=format";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom synthesis, contract research, analytical services, impurity profiling, and method development at HKR Biotech Labs.",
};

const CARD_ACCENTS = [
  {
    tint: "from-teal-950/25 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
    orbShadow: "0 8px 24px -4px rgba(20,184,166,0.3)",
    blob: "rgba(20,184,166,0.18)",
    eyebrow: "text-teal-400",
    arrow: "text-teal-400 group-hover:text-teal-300",
    bullet: "from-teal-400 to-teal-600",
  },
  {
    tint: "from-violet-950/25 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.85), rgba(124,58,237,0.6) 55%, rgba(91,33,182,0.4))",
    orbShadow: "0 8px 24px -4px rgba(91,33,182,0.25)",
    blob: "rgba(124,58,237,0.15)",
    eyebrow: "text-violet-400",
    arrow: "text-violet-400 group-hover:text-violet-300",
    bullet: "from-violet-400 to-violet-600",
  },
  {
    tint: "from-rose-950/20 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.85), rgba(225,29,72,0.6) 55%, rgba(159,18,57,0.4))",
    orbShadow: "0 8px 24px -4px rgba(159,18,57,0.22)",
    blob: "rgba(225,29,72,0.12)",
    eyebrow: "text-rose-400",
    arrow: "text-rose-400 group-hover:text-rose-300",
    bullet: "from-rose-400 to-rose-600",
  },
  {
    tint: "from-teal-950/20 via-violet-950/10 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(167,243,208,0.85), rgba(20,184,166,0.5) 50%, rgba(91,33,182,0.3))",
    orbShadow: "0 8px 24px -4px rgba(20,184,166,0.25)",
    blob: "rgba(20,184,166,0.14)",
    eyebrow: "text-teal-400",
    arrow: "text-teal-400 group-hover:text-teal-300",
    bullet: "from-teal-400 to-violet-500",
  },
  {
    tint: "from-violet-950/20 via-rose-950/10 to-[#0c1526]/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.8), rgba(167,139,250,0.55) 50%, rgba(124,58,237,0.35))",
    orbShadow: "0 8px 24px -4px rgba(124,58,237,0.25)",
    blob: "rgba(124,58,237,0.12)",
    eyebrow: "text-violet-400",
    arrow: "text-violet-400 group-hover:text-violet-300",
    bullet: "from-violet-400 to-rose-500",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.16]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pt-6 pb-28 sm:px-6 md:space-y-20 lg:px-8">

        {/* Hero — photo background with dark wash */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]">
            <Image
              src={HERO_IMAGE}
              alt="Scientific laboratory glassware"
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

            {/* Floating orbs */}
            <div
              className="pointer-events-none absolute right-[8%] top-8 h-12 w-12 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(20,184,166,0.3) 55%, rgba(15,118,110,0.1))",
                boxShadow: "0 6px 20px -4px rgba(20,184,166,0.35), inset 0 -2px 5px rgba(0,0,0,0.1)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-10 right-[20%] h-7 w-7 animate-orbit-slow rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(124,58,237,0.3) 55%, rgba(91,33,182,0.1))",
                boxShadow: "0 4px 14px -3px rgba(91,33,182,0.3), inset 0 -1px 4px rgba(0,0,0,0.1)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[60%]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-400">
                Scientific services
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                Composable Chemistry Services
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
                From exploratory FTE blocks to filing-ready analytical packages — unified
                under one project team with transparent milestones and scientific dialogue.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.35)]"
                >
                  Discuss your project
                </ButtonLink>
                <ButtonLink
                  href="#services-grid"
                  variant="secondary"
                  className="rounded-full px-10"
                >
                  Browse services
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Service cards */}
        <section id="services-grid">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-400">
              What we offer
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Our Services
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((s, i) => {
              const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
              return (
                <RevealOnScroll key={s.slug} delay={i * 70}>
                  <Link href={`/services/${s.slug}`} className="group block h-full">
                    <article
                      className={`relative h-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b ${accent.tint} p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.5)]`}
                    >
                      {/* Ambient blob */}
                      <div
                        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                        style={{ background: `radial-gradient(circle, ${accent.blob} 0%, transparent 70%)` }}
                        aria-hidden
                      />

                      <div className="relative">
                        {/* Orb */}
                        <div
                          className="mb-5 h-11 w-11 rounded-full ring-2 ring-white/[0.08]"
                          style={{
                            background: accent.orb,
                            boxShadow: `${accent.orbShadow}, inset 0 -2px 5px rgba(0,0,0,0.06)`,
                          }}
                          aria-hidden
                        />

                        <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${accent.eyebrow}`}>
                          Service
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold text-slate-100 md:text-2xl">
                          {s.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                          {s.summary}
                        </p>

                        <ul className="mt-5 space-y-2">
                          {s.benefits.slice(0, 3).map((b) => (
                            <li key={b} className="flex gap-2.5 text-sm text-slate-400">
                              <span
                                className={`mt-2 h-1.5 w-4 shrink-0 rounded-full bg-gradient-to-r ${accent.bullet}`}
                                aria-hidden
                              />
                              {b}
                            </li>
                          ))}
                        </ul>

                        <span
                          className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 ${accent.arrow}`}
                        >
                          Learn more
                          <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                        </span>
                      </div>
                    </article>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>

        {/* CTA — dark gradient */}
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] p-10 text-center shadow-[0_16px_64px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-14"
            style={{
              background:
                "linear-gradient(140deg, rgba(20,184,166,0.15) 0%, rgba(124,58,237,0.12) 35%, rgba(91,33,182,0.12) 55%, rgba(244,63,94,0.08) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute -left-4 top-8 h-16 w-16 rounded-full sm:h-20 sm:w-20"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(20,184,166,0.4) 55%, rgba(15,118,110,0.2))",
                boxShadow: "0 8px 28px -6px rgba(20,184,166,0.35), inset 0 -2px 6px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-3 bottom-6 h-12 w-12 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(124,58,237,0.4) 55%, rgba(91,33,182,0.2))",
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
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                Partnership
              </p>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-white md:text-3xl">
                Not Sure Where to Start?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-slate-400">
                Share your target, timeline, and analytical expectations. We respond with
                technical questions and a clear feasibility path — not a generic brochure.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.35)]"
                >
                  Start a conversation
                </ButtonLink>
                <ButtonLink
                  href="/capabilities"
                  variant="secondary"
                  className="rounded-full px-10"
                >
                  View capabilities
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
