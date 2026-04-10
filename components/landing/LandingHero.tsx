import { HeroFloatingGraphics } from "@/components/landing/HeroFloatingGraphics";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Full viewport below site header (header is a sibling in layout).
 * `--site-header-offset` approximates sticky header height; card is flex-centered vertically.
 */
export function LandingHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-var(--site-header-offset,6rem))] flex-col overflow-hidden">
      <HeroFloatingGraphics />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto w-full max-w-4xl -translate-y-4 sm:-translate-y-6">
          <RevealOnScroll>
            <div
              className={[
                "rounded-[2rem] border border-white/40 bg-gradient-to-b from-white/35 via-white/20 to-white/10",
                "px-6 py-10 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.35),inset_0_1px_0_0_rgba(255,255,255,0.65)]",
                "backdrop-blur-2xl sm:px-12 sm:py-12",
                "ring-1 ring-white/50",
              ].join(" ")}
            >
              <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-sky-900/80">
                HKR Biotech Labs
              </p>
              <h1 className="mt-5 text-center font-display text-[2.1rem] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.1rem]">
                Chemistry programs that stay{" "}
                <span className="gradient-text">traceable</span>
                <br />
                from route to release.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-slate-700">
                Rare building blocks, API-related impurities, and nucleotide chemistry — with analytics
                that hold up to scrutiny and timelines that respect your milestone.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/products" className="rounded-full px-9 shadow-lg shadow-sky-900/20">
                  Explore catalogue
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" className="rounded-full px-9">
                  Start an enquiry
                </ButtonLink>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md">
          <span className="mt-2 h-2 w-0.5 animate-bounce rounded-full bg-sky-600/70" />
        </div>
      </div>
    </section>
  );
}
