import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** Abstract gradient panel — no photographic assets. */
export function LandingLabStory() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <RevealOnScroll className="relative order-2 lg:order-1">
          <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 shadow-[0_28px_60px_-24px_rgba(15,23,42,0.55)]">
            <div
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(56,189,248,0.45) 0%, transparent 65%)",
              }}
              aria-hidden
            />
            <div
              className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
              aria-hidden
            />
            <div className="relative flex h-full min-h-[280px] flex-col justify-end p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-sky-300/90">
                Operations
              </p>
              <p className="mt-3 max-w-sm font-display text-xl font-semibold leading-snug text-white">
                Controlled environments, redundant characterization, traceable release.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="order-1 space-y-6 lg:order-2">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-sky-800/90">
              Inside HKR
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Infrastructure built for reproducibility
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Dedicated project leadership, redundant characterization, and digital batch records — an
              environment designed for traceable science, not just throughput.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <ul className="space-y-3 text-sm text-slate-700">
              {[
                "Phase-appropriate documentation with ALCOA+ alignment",
                "Segregated synthesis lines with inert gas distribution",
                "Prep HPLC & crystallization with barcode traceability",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span
                    className="mt-2 h-1 w-4 shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <ButtonLink href="/about" variant="secondary" className="rounded-full">
              Company story
            </ButtonLink>
            <Link href="/contact" className="ml-4 text-sm font-semibold text-sky-800 hover:underline">
              Talk to us →
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
