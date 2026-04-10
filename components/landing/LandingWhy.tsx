import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const PILLARS = [
  {
    title: "Analytical First",
    copy: "Characterization packages designed for regulatory and discovery reviewers alike.",
    gradient:
      "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.9), rgba(20,184,166,0.7) 55%, rgba(15,118,110,0.5))",
    shadow: "rgba(20,184,166,0.35)",
    tint: "from-teal-50/60 to-white",
  },
  {
    title: "Transparent Batches",
    copy: "Digital records, clear lineage, and reproducible isolation strategies.",
    gradient:
      "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.9), rgba(124,58,237,0.7) 55%, rgba(91,33,182,0.5))",
    shadow: "rgba(91,33,182,0.3)",
    tint: "from-violet-50/60 to-white",
  },
  {
    title: "Scientific Partnership",
    copy: "PhD-level route dialogue — not a black-box vendor relationship.",
    gradient:
      "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.9), rgba(225,29,72,0.7) 55%, rgba(159,18,57,0.5))",
    shadow: "rgba(159,18,57,0.28)",
    tint: "from-rose-50/60 to-white",
  },
] as const;

export function LandingWhy() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-700">
            Why teams choose HKR
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Rigor you can cite. Partnership you can feel.
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
          {PILLARS.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 80}>
              <div
                className={`group relative h-full overflow-hidden rounded-[1.75rem] border border-white/60 bg-gradient-to-b ${p.tint} p-7 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(15,23,42,0.12)]`}
              >
                {/* Glass orb */}
                <div
                  className="mb-6 h-12 w-12 rounded-full shadow-lg"
                  style={{
                    background: p.gradient,
                    boxShadow: `0 8px 24px -4px ${p.shadow}, inset 0 -2px 6px rgba(0,0,0,0.08)`,
                  }}
                />

                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.copy}</p>

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
                  style={{ background: p.gradient }}
                  aria-hidden
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
