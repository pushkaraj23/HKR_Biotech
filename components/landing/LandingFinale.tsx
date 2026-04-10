import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function LandingFinale() {
  return (
    <section className="relative px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/60 bg-gradient-to-br from-sky-100/90 via-white to-violet-100/80 p-10 shadow-[0_24px_80px_-32px_rgba(14,165,233,0.35)] backdrop-blur-xl md:p-14">
        <div
          className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(56,189,248,0.35), transparent 65%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 right-0 h-80 w-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.22), transparent 68%)",
          }}
          aria-hidden
        />
        <RevealOnScroll className="relative text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-sky-800/80">
            Next batch
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Partner on your next critical route
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Share structures, quantity bands, and analytical expectations — we respond with scientific
            questions, not just pricing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" className="rounded-full px-10 shadow-lg">
              Request RFQ
            </ButtonLink>
            <ButtonLink href="/products" variant="secondary" className="rounded-full px-10">
              Browse products
            </ButtonLink>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
