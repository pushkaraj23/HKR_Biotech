import { HeroFloatingGraphics } from "@/components/landing/HeroFloatingGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

const STATS = [
  {
    value: "200+",
    label: "Products",
    orb: "radial-gradient(circle at 35% 35%, rgba(255,228,200,0.95), rgba(255,177,98,0.65) 55%, rgba(163,81,57,0.35))",
    shadow: "0 4px 14px -3px rgba(255, 177, 98, 0.35)",
  },
  {
    value: "99.5%",
    label: "Purity",
    orb: "radial-gradient(circle at 35% 35%, rgba(200,212,224,0.95), rgba(74,93,114,0.65) 55%, rgba(44,59,77,0.4))",
    shadow: "0 4px 14px -3px rgba(44, 59, 77, 0.3)",
  },
  {
    value: "50+",
    label: "Countries",
    orb: "radial-gradient(circle at 35% 35%, rgba(255,200,186,0.95), rgba(200,120,95,0.6) 55%, rgba(163,81,57,0.38))",
    shadow: "0 4px 14px -3px rgba(163, 81, 57, 0.28)",
  },
  {
    value: "15+",
    label: "Years",
    orb: "radial-gradient(circle at 35% 35%, rgba(200,220,208,0.95), rgba(91,127,106,0.55) 50%, rgba(44,59,77,0.28))",
    shadow: "0 4px 14px -3px rgba(91, 127, 106, 0.28)",
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
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.75), rgba(255,177,98,0.38) 55%, rgba(163,81,57,0.12))",
            boxShadow:
              "0 10px 32px -6px rgba(255,177,98,0.35), inset 0 -3px 8px rgba(27,38,50,0.06), inset 0 2px 4px rgba(255,255,255,0.5)",
          }}
        />
        <div
          className="absolute right-[10%] top-[28%] h-10 w-10 rounded-full animate-orbit-slow sm:h-12 sm:w-12"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.75), rgba(74,93,114,0.4) 55%, rgba(44,59,77,0.15))",
            boxShadow:
              "0 8px 24px -4px rgba(44,59,77,0.32), inset 0 -2px 6px rgba(27,38,50,0.06), inset 0 2px 4px rgba(255,255,255,0.5)",
            animationDelay: "-3s",
            animationDuration: "12s",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[14%] h-7 w-7 rounded-full animate-orbit-slow sm:h-9 sm:w-9"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.75), rgba(163,81,57,0.32) 55%, rgba(163,81,57,0.1))",
            boxShadow:
              "0 6px 20px -3px rgba(163,81,57,0.28), inset 0 -2px 5px rgba(27,38,50,0.06), inset 0 1px 3px rgba(255,255,255,0.5)",
            animationDelay: "-7s",
            animationDuration: "14s",
          }}
        />
        <div
          className="absolute bottom-[26%] right-[12%] h-6 w-6 rounded-full animate-orbit-slow"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.75), rgba(255,177,98,0.22) 50%, rgba(44,59,77,0.1))",
            boxShadow:
              "0 4px 16px -3px rgba(255,177,98,0.22), inset 0 -1px 4px rgba(27,38,50,0.06), inset 0 1px 2px rgba(255,255,255,0.5)",
            animationDelay: "-5s",
            animationDuration: "16s",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-4 pb-10 pt-[calc(var(--site-header-offset,6rem)+1rem)] sm:px-6 sm:pb-14 lg:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <RevealOnScroll>
            <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.38em] text-secondary">
              HKR Biotech Labs
            </p>

            <h1 className="mx-auto mt-6 max-w-3xl text-center font-display text-[2.4rem] font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]">
              Precision{" "}
              <span className="gradient-text-shimmer">Chemistry</span>
              <br />
              Traceable from Route to Release
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
              Rare building blocks, API-related impurities, and nucleotide chemistry — with
              analytics that hold up to scrutiny and timelines that respect your milestone.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/products"
                className="rounded-full px-10 shadow-primary-glow-lg"
              >
                Explore Catalogue
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                className="rounded-full border-border-strong/50 bg-card/90 px-10 shadow-sm backdrop-blur-md"
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
                  className="flex items-center gap-3 rounded-full border border-border-strong/40 bg-card/90 px-5 py-2.5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ background: s.orb, boxShadow: s.shadow }}
                  />
                  <span className="font-display text-lg font-bold text-foreground">{s.value}</span>
                  <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
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
        <div className="flex h-10 w-6 justify-center rounded-full border border-border-strong/50 bg-card/90 shadow-sm backdrop-blur-md">
          <span className="mt-2 h-2 w-0.5 animate-bounce rounded-full bg-primary-deep" />
        </div>
      </div>
    </section>
  );
}
