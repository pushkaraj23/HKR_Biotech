import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

const BULLET_COLORS = [
  "from-teal-400 to-teal-600",
  "from-violet-400 to-violet-600",
  "from-rose-400 to-rose-600",
] as const;

export function LandingLabStory() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        {/* Visual card — gradient glass */}
        <RevealOnScroll className="relative order-2 lg:order-1">
          <div
            className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/50 p-8 shadow-[0_12px_48px_-12px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-10"
            style={{
              background:
                "linear-gradient(145deg, rgba(153,246,228,0.4) 0%, rgba(167,139,250,0.35) 40%, rgba(253,164,175,0.3) 100%)",
            }}
          >
            {/* Decorative orbs */}
            <div
              className="absolute right-8 top-8 h-16 w-16 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(20,184,166,0.5) 55%, rgba(15,118,110,0.3))",
                boxShadow: "0 8px 24px -4px rgba(20,184,166,0.35), inset 0 -2px 6px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="absolute bottom-10 left-10 h-10 w-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(124,58,237,0.5) 55%, rgba(91,33,182,0.3))",
                boxShadow: "0 6px 20px -4px rgba(91,33,182,0.3), inset 0 -1px 4px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />
            <div
              className="absolute bottom-24 right-16 h-7 w-7 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(225,29,72,0.5) 55%, rgba(159,18,57,0.3))",
                boxShadow: "0 4px 16px -3px rgba(159,18,57,0.25), inset 0 -1px 3px rgba(0,0,0,0.06)",
              }}
              aria-hidden
            />

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 rounded-[2rem] opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,23,42,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.15) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
              aria-hidden
            />

            <div className="relative flex h-full min-h-[240px] flex-col justify-end">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-700">
                Operations
              </p>
              <p className="mt-3 max-w-sm font-display text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                Controlled environments, redundant characterization, traceable release.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Text content */}
        <div className="order-1 space-y-6 lg:order-2">
          <RevealOnScroll>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-700">
              Inside HKR
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Infrastructure Built for Reproducibility
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Dedicated project leadership, redundant characterization, and digital batch
              records — an environment designed for traceable science.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <ul className="space-y-3.5 text-sm font-medium text-slate-700">
              {[
                "Phase-appropriate documentation with ALCOA+ alignment",
                "Segregated synthesis lines with inert gas distribution",
                "Prep HPLC & crystallization with barcode traceability",
              ].map((line, i) => (
                <li key={line} className="flex gap-3">
                  <span
                    className={`mt-2 h-1.5 w-5 shrink-0 rounded-full bg-gradient-to-r ${BULLET_COLORS[i]} shadow-sm`}
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="flex items-center gap-4">
              <ButtonLink href="/about" variant="secondary" className="rounded-full">
                Company story
              </ButtonLink>
              <Link
                href="/contact"
                className="text-sm font-semibold text-rose-800 transition hover:text-rose-950 hover:underline"
              >
                Talk to us →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
