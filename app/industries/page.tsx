import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { industries } from "@/data/industries";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Pharmaceutical, biotechnology, CRO, academic, and chemical industry programs supported by HKR Biotech Labs.",
};

const HERO_IMAGE =
  "https://plus.unsplash.com/premium_photo-1681426676206-0f2c02b48aff?w=1400&h=600&fit=crop&q=80&auto=format";

const CARD_ACCENTS = [
  {
    tint: "from-teal-950/25 to-bg-secondary/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
    orbShadow: "0 8px 24px -4px rgba(20,184,166,0.3)",
    blob: "rgba(20,184,166,0.18)",
    eyebrow: "text-teal-400",
    bullet: "from-teal-500 to-teal-700",
    arrow: "text-teal-400 group-hover:text-teal-300",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=300&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-violet-950/25 to-bg-secondary/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.85), rgba(124,58,237,0.6) 55%, rgba(91,33,182,0.4))",
    orbShadow: "0 8px 24px -4px rgba(91,33,182,0.25)",
    blob: "rgba(124,58,237,0.15)",
    eyebrow: "text-violet-400",
    bullet: "from-violet-500 to-violet-700",
    arrow: "text-violet-400 group-hover:text-violet-300",
    image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=600&h=300&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-rose-950/20 to-bg-secondary/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.85), rgba(225,29,72,0.6) 55%, rgba(159,18,57,0.4))",
    orbShadow: "0 8px 24px -4px rgba(159,18,57,0.22)",
    blob: "rgba(225,29,72,0.12)",
    eyebrow: "text-rose-400",
    bullet: "from-rose-500 to-rose-700",
    arrow: "text-rose-400 group-hover:text-rose-300",
    image: "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=600&h=300&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-teal-950/20 via-violet-950/10 to-bg-secondary/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(167,243,208,0.85), rgba(20,184,166,0.5) 50%, rgba(91,33,182,0.3))",
    orbShadow: "0 8px 24px -4px rgba(20,184,166,0.25)",
    blob: "rgba(20,184,166,0.14)",
    eyebrow: "text-teal-400",
    bullet: "from-teal-500 to-violet-600",
    arrow: "text-teal-400 group-hover:text-teal-300",
    image: "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=600&h=300&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-violet-950/20 via-rose-950/10 to-bg-secondary/80",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.8), rgba(167,139,250,0.55) 50%, rgba(124,58,237,0.35))",
    orbShadow: "0 8px 24px -4px rgba(124,58,237,0.25)",
    blob: "rgba(124,58,237,0.12)",
    eyebrow: "text-violet-400",
    bullet: "from-violet-500 to-rose-600",
    arrow: "text-violet-400 group-hover:text-violet-300",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=300&fit=crop&q=80&auto=format",
  },
] as const;

export default function IndustriesPage() {
  return (
    <div className="relative overflow-x-hidden">
      <PageAmbientGraphics variant="long" opacity="opacity-[0.16]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 pt-6 pb-28 sm:px-6 md:space-y-20 lg:px-8">

        {/* Hero — photo with dark wash */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]">
            <Image
              src={HERO_IMAGE}
              alt="Scientific research collaboration"
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
              className="pointer-events-none absolute bottom-10 right-[20%] h-7 w-7 animate-orbit-slow rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(124,58,237,0.3) 55%, rgba(91,33,182,0.1))",
                boxShadow: "0 4px 14px -3px rgba(91,33,182,0.3)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            <div className="relative px-8 py-14 sm:px-12 md:py-20 lg:max-w-[60%]">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-400">
                Sectors we serve
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                Industries
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
                We tune communication, documentation, and risk disclosure to the
                governance model of each sector — without diluting scientific standards.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.35)]"
                >
                  Tell us your sector
                </ButtonLink>
                <ButtonLink
                  href="#industry-cards"
                  variant="secondary"
                  className="rounded-full px-10"
                >
                  Browse below
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Industry cards */}
        <section id="industry-cards">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-400">
              Program types
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Who We Work With
            </h2>
          </RevealOnScroll>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => {
              const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
              return (
                <RevealOnScroll key={ind.slug} delay={i * 70}>
                  <div id={ind.slug} className="scroll-mt-28 h-full">
                    <article
                      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b ${accent.tint} shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.5)]`}
                    >
                      {/* Image strip */}
                      <div className="relative h-36 w-full overflow-hidden">
                        <Image
                          src={accent.image}
                          alt={ind.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(12,21,38,0.95) 0%, rgba(12,21,38,0.5) 50%, transparent 100%)",
                          }}
                        />
                      </div>

                      <div className="relative flex flex-1 flex-col p-7 pt-4">
                        {/* Ambient blob */}
                        <div
                          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                          style={{ background: `radial-gradient(circle, ${accent.blob} 0%, transparent 70%)` }}
                          aria-hidden
                        />

                        <div className="relative flex flex-1 flex-col">
                          {/* Orb */}
                          <div
                            className="mb-4 h-10 w-10 rounded-full ring-2 ring-white/[0.08]"
                            style={{
                              background: accent.orb,
                              boxShadow: `${accent.orbShadow}, inset 0 -2px 5px rgba(0,0,0,0.06)`,
                            }}
                            aria-hidden
                          />

                          <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.22em] ${accent.eyebrow}`}>
                            Industry
                          </p>
                          <h3 className="mt-2 font-display text-xl font-semibold text-slate-100">
                            {ind.title}
                          </h3>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                            {ind.description}
                          </p>

                          <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link
                              href="/contact"
                              className="inline-flex items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.06] px-5 py-2 text-xs font-semibold text-slate-200 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-8px_rgba(0,0,0,0.5)]"
                            >
                              Discuss your project
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
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
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                Next step
              </p>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold text-white md:text-3xl">
                Not Sure Where Your Program Fits?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-slate-400">
                Share your stage, molecule class, and timeline — we will propose a
                delivery model aligned to your internal governance.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href="/contact"
                  className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.35)]"
                >
                  Talk to HKR
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="secondary"
                  className="rounded-full px-10"
                >
                  Explore services
                </ButtonLink>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
