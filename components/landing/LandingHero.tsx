import { HeroFloatingGraphics } from "@/components/landing/HeroFloatingGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

const STATS = [
  { value: "200+", label: "Products" },
  { value: "99.5%", label: "Purity" },
  { value: "50+", label: "Countries" },
  { value: "15+", label: "Years" },
] as const;

const TRUST_CHIPS = ["ALCOA+ records", "QC you can cite"] as const;

export function LandingHero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <HeroFloatingGraphics />

      {/* Floating decorative glass orbs */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
        <div
          className="absolute left-[7%] top-[20%] h-20 w-20 rounded-full animate-orbit-slow sm:h-24 sm:w-24"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.85), rgba(255,177,98,0.48) 50%, rgba(163,81,57,0.18))",
            boxShadow:
              "0 12px 40px -6px rgba(255,177,98,0.45), inset 0 -3px 10px rgba(27,38,50,0.1), inset 0 3px 6px rgba(255,255,255,0.6)",
          }}
        />
        <div
          className="absolute right-[9%] top-[26%] h-14 w-14 rounded-full animate-orbit-slow"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.85), rgba(155,168,183,0.55) 50%, rgba(44,59,77,0.22))",
            boxShadow:
              "0 10px 28px -5px rgba(44,59,77,0.4), inset 0 -2px 6px rgba(27,38,50,0.1), inset 0 2px 4px rgba(255,255,255,0.55)",
            animationDelay: "-3s",
            animationDuration: "12s",
          }}
        />
        <div
          className="absolute bottom-[22%] left-[12%] h-9 w-9 rounded-full animate-orbit-slow sm:h-11 sm:w-11"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.8), rgba(163,81,57,0.42) 55%, rgba(163,81,57,0.14))",
            boxShadow:
              "0 8px 22px -3px rgba(163,81,57,0.35), inset 0 -2px 5px rgba(27,38,50,0.08), inset 0 1px 3px rgba(255,255,255,0.55)",
            animationDelay: "-7s",
            animationDuration: "14s",
          }}
        />
        <div
          className="absolute bottom-[28%] right-[10%] h-7 w-7 rounded-full animate-orbit-slow"
          style={{
            background:
              "radial-gradient(circle at 32% 32%, rgba(255,255,255,0.8), rgba(255,177,98,0.32) 50%, rgba(44,59,77,0.12))",
            boxShadow:
              "0 6px 18px -3px rgba(255,177,98,0.28), inset 0 -1px 4px rgba(27,38,50,0.08), inset 0 1px 2px rgba(255,255,255,0.55)",
            animationDelay: "-5s",
            animationDuration: "16s",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-4 pb-14 pt-[calc(var(--site-header-offset,6rem)+1.5rem)] sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <RevealOnScroll>
            {/* Live status badge */}
            <div className="mx-auto mb-8 flex w-fit items-center gap-2.5 rounded-full border border-on-dark/30 bg-[rgba(18,25,35,0.45)] px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-mid opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-on-dark">
                Open for projects
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="mx-auto max-w-4xl text-center font-display text-[2.85rem] font-extrabold leading-[1.02] tracking-tight text-on-dark sm:text-[3.5rem] lg:text-[4.35rem]"
              style={{ textShadow: "0 2px 18px rgba(18,25,35,0.45)" }}
            >
              Precision{" "}
              <span className="gradient-text-shimmer">Chemistry</span>,
              <br />
              Traceable from{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Route</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-2 rounded-full bg-primary/45 blur-[6px]"
                />
              </span>{" "}
              to Release.
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-on-dark sm:text-xl"
              style={{ textShadow: "0 1px 12px rgba(18,25,35,0.4)" }}
            >
              Rare building blocks, impurities, and nucleotide chemistry — with{" "}
              <span className="font-semibold text-accent">analytics that hold up</span> and timelines that match your milestones.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ButtonLink
                href="/products"
                className="rounded-full px-10 py-3.5 text-base shadow-primary-glow-lg hover:-translate-y-0.5"
              >
                Explore Catalogue
                <span aria-hidden className="text-base">→</span>
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                className="rounded-full border-on-dark/40 bg-[rgba(18,25,35,0.5)] px-10 py-3.5 text-base font-semibold text-on-dark backdrop-blur-md hover:border-primary/60 hover:bg-[rgba(18,25,35,0.7)] hover:!text-on-dark"
              >
                Start an Enquiry
              </ButtonLink>
            </div>

            {/* Trust chips */}
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-on-dark">
              {TRUST_CHIPS.map((chip, i) => (
                <li key={chip} className="flex items-center gap-2">
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5 text-primary"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.09l6.79-6.8a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{chip}</span>
                  {i < TRUST_CHIPS.length - 1 && (
                    <span aria-hidden className="hidden h-1 w-1 rounded-full bg-on-dark/45 sm:inline-block" />
                  )}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Stats row with elegant dividers */}
          <RevealOnScroll delay={150}>
            <div className="mx-auto mt-16 max-w-4xl">
              <div
                className="relative rounded-[1.75rem] border border-on-dark/25 px-6 py-6 shadow-[0_16px_40px_-12px_rgba(18,25,35,0.5)] backdrop-blur-md sm:px-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(18,25,35,0.65) 0%, rgba(27,38,50,0.55) 50%, rgba(44,59,77,0.5) 100%)",
                }}
              >
                {/* Subtle top accent line */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,177,98,0.75) 50%, transparent 100%)",
                  }}
                />

                <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-on-dark/20 sm:gap-y-0">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center gap-1 px-2 sm:px-4"
                    >
                      <dt className="font-display text-3xl font-extrabold tracking-tight text-on-dark sm:text-4xl">
                        {s.value}
                      </dt>
                      <dd className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-on-dark/85">
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden flex-col items-center gap-2 -translate-x-1/2 sm:flex"
        aria-hidden
      >
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.35em] text-on-dark-muted">
          Scroll
        </span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-on-dark/30 bg-on-dark/[0.06] backdrop-blur-md">
          <span className="mt-1.5 h-1.5 w-0.5 animate-bounce rounded-full bg-primary-mid" />
        </div>
      </div>
    </section>
  );
}
