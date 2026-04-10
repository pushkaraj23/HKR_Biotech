import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function LandingFinale() {
  return (
    <section className="relative px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/40 p-10 shadow-[0_16px_64px_-16px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-14"
          style={{
            background:
              "linear-gradient(140deg, rgba(153,246,228,0.45) 0%, rgba(167,139,250,0.4) 35%, rgba(196,181,253,0.4) 55%, rgba(253,164,175,0.35) 100%)",
          }}
        >
          {/* Decorative orbs */}
          <div
            className="pointer-events-none absolute -left-6 top-8 h-20 w-20 rounded-full sm:h-24 sm:w-24"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(20,184,166,0.5) 55%, rgba(15,118,110,0.3))",
              boxShadow: "0 10px 32px -6px rgba(20,184,166,0.35), inset 0 -2px 8px rgba(0,0,0,0.06)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-4 bottom-6 h-14 w-14 rounded-full sm:h-18 sm:w-18"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(124,58,237,0.5) 55%, rgba(91,33,182,0.3))",
              boxShadow: "0 8px 24px -4px rgba(91,33,182,0.3), inset 0 -2px 6px rgba(0,0,0,0.06)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-1/4 top-4 h-8 w-8 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(225,29,72,0.45) 55%, rgba(159,18,57,0.25))",
              boxShadow: "0 4px 16px -3px rgba(159,18,57,0.2), inset 0 -1px 3px rgba(0,0,0,0.06)",
            }}
            aria-hidden
          />

          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,23,42,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.2) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
            aria-hidden
          />

          <div className="relative text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-700">
              Next batch
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Partner on Your Next Critical Route
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
              Share structures, quantity bands, and analytical expectations — we respond
              with scientific questions, not just pricing.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                className="rounded-full px-10 shadow-[0_14px_40px_-10px_rgba(15,118,110,0.35)]"
              >
                Request RFQ
              </ButtonLink>
              <ButtonLink
                href="/products"
                variant="secondary"
                className="rounded-full px-10"
              >
                Browse Products
              </ButtonLink>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
