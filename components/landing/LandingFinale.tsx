import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function LandingFinale() {
  return (
    <section className="relative px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <div
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-border-strong/45 bg-card/60 p-10 shadow-[var(--elev-card-stack)] backdrop-blur-md sm:p-14"
          style={{
            background:
              "linear-gradient(140deg, rgba(255,177,98,0.14) 0%, rgba(201,193,177,0.12) 32%, rgba(238,233,223,0.92) 55%, rgba(155,168,183,0.1) 100%)",
          }}
        >
          {/* Decorative orbs */}
          <div
            className="pointer-events-none absolute -left-6 top-8 h-20 w-20 rounded-full sm:h-24 sm:w-24"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(255,177,98,0.45) 55%, rgba(163,81,57,0.2))",
              boxShadow: "0 10px 32px -6px rgba(255,177,98,0.28), inset 0 -2px 8px rgba(27,38,50,0.06)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-4 bottom-6 h-14 w-14 rounded-full sm:h-18 sm:w-18"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(74,93,114,0.42) 55%, rgba(44,59,77,0.22))",
              boxShadow: "0 8px 24px -4px rgba(44,59,77,0.26), inset 0 -2px 6px rgba(27,38,50,0.06)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-1/4 top-4 h-8 w-8 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(163,81,57,0.38) 55%, rgba(163,81,57,0.15))",
              boxShadow: "0 4px 16px -3px rgba(163,81,57,0.18), inset 0 -1px 3px rgba(27,38,50,0.06)",
            }}
            aria-hidden
          />

          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(27,38,50,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(27,38,50,0.35) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
            aria-hidden
          />

          <div className="relative text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-secondary">
              Next batch
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Partner on Your Next Critical Route
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Share structures, quantity bands, and analytical expectations — we respond
              with scientific questions, not just pricing.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                className="rounded-full px-10 shadow-primary-glow-lg"
              >
                Request RFQ
              </ButtonLink>
              <ButtonLink
                href="/products"
                variant="secondary"
                className="rounded-full border-border-strong/50 bg-card/95 px-10 backdrop-blur-md"
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
