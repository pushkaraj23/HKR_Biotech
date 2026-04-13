import { HeroFloatingGraphics } from "@/components/landing/HeroFloatingGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

const STATS = [
  {
    value: "200+",
    label: "Products",
    orb: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.6) 55%, rgba(15,118,110,0.4))",
    shadow: "0 4px 14px -3px rgba(20,184,166,0.35)",
  },
  {
    value: "99.5%",
    label: "Purity",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.85), rgba(124,58,237,0.6) 55%, rgba(91,33,182,0.4))",
    shadow: "0 4px 14px -3px rgba(91,33,182,0.3)",
  },
  {
    value: "50+",
    label: "Countries",
    orb: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.85), rgba(225,29,72,0.6) 55%, rgba(159,18,57,0.4))",
    shadow: "0 4px 14px -3px rgba(159,18,57,0.28)",
  },
  {
    value: "15+",
    label: "Years",
    orb: "radial-gradient(circle at 35% 35%, rgba(167,243,208,0.85), rgba(20,184,166,0.5) 50%, rgba(91,33,182,0.3))",
    shadow: "0 4px 14px -3px rgba(20,184,166,0.25)",
  },
] as const;

export function LandingHero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <HeroFloatingGraphics />

      {/* Floating decorative glass orbs */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
        <div
          className="absolute left-[8%] top-[22%] h-16 w-16 rounded-full animate-orbit-slow sm:h-20 sm:w-20"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.7), rgba(20,184,166,0.35) 55%, rgba(15,118,110,0.15))",
            boxShadow:
              "0 10px 32px -6px rgba(20,184,166,0.4), inset 0 -3px 8px rgba(0,0,0,0.06), inset 0 2px 4px rgba(255,255,255,0.5)",
          }}
        />
        <div
          className="absolute right-[10%] top-[28%] h-10 w-10 rounded-full animate-orbit-slow sm:h-12 sm:w-12"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.7), rgba(124,58,237,0.35) 55%, rgba(91,33,182,0.15))",
            boxShadow:
              "0 8px 24px -4px rgba(91,33,182,0.35), inset 0 -2px 6px rgba(0,0,0,0.06), inset 0 2px 4px rgba(255,255,255,0.5)",
            animationDelay: "-3s",
            animationDuration: "12s",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[14%] h-7 w-7 rounded-full animate-orbit-slow sm:h-9 sm:w-9"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.7), rgba(225,29,72,0.3) 55%, rgba(159,18,57,0.12))",
            boxShadow:
              "0 6px 20px -3px rgba(159,18,57,0.3), inset 0 -2px 5px rgba(0,0,0,0.06), inset 0 1px 3px rgba(255,255,255,0.5)",
            animationDelay: "-7s",
            animationDuration: "14s",
          }}
        />
        <div
          className="absolute bottom-[26%] right-[12%] h-6 w-6 rounded-full animate-orbit-slow"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.7), rgba(20,184,166,0.25) 50%, rgba(91,33,182,0.12))",
            boxShadow:
              "0 4px 16px -3px rgba(20,184,166,0.25), inset 0 -1px 4px rgba(0,0,0,0.06), inset 0 1px 2px rgba(255,255,255,0.5)",
            animationDelay: "-5s",
            animationDuration: "16s",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-4 pb-10 pt-[calc(var(--site-header-offset,6rem)+1rem)] sm:px-6 sm:pb-14 lg:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <RevealOnScroll>
            <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.38em] text-teal-400">
              HKR Biotech Labs
            </p>

            <h1 className="mx-auto mt-6 max-w-3xl text-center font-display text-[2.4rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              Precision{" "}
              <span className="gradient-text-shimmer">Chemistry</span>
              <br />
              Traceable from Route to Release
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-slate-400">
              Rare building blocks, API-related impurities, and nucleotide chemistry — with
              analytics that hold up to scrutiny and timelines that respect your milestone.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/products"
                className="rounded-full px-10 shadow-[0_14px_44px_-10px_rgba(15,118,110,0.45)]"
              >
                Explore Catalogue
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                className="rounded-full border-white/[0.1] bg-white/[0.06] px-10 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)] backdrop-blur-xl"
              >
                Start an Enquiry
              </ButtonLink>
            </div>
          </RevealOnScroll>

          {/* Stats strip */}
          <RevealOnScroll delay={120}>
            <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-3 sm:gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.06] px-5 py-2.5 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-10px_rgba(0,0,0,0.4)]"
                >
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ background: s.orb, boxShadow: s.shadow }}
                  />
                  <span className="font-display text-lg font-bold text-white">{s.value}</span>
                  <span className="text-xs font-medium text-slate-400">{s.label}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-teal-500/30 bg-white/[0.06] shadow-[0_6px_20px_-8px_rgba(15,118,110,0.2)] backdrop-blur-lg">
          <span className="mt-2 h-2 w-0.5 animate-bounce rounded-full bg-teal-500" />
        </div>
      </div>
    </section>
  );
}
