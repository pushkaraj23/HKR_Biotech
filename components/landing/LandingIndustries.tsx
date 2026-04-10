import Link from "next/link";
import { industries } from "@/data/industries";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const CARD_STYLES = [
  {
    tint: "from-teal-50/50 to-white",
    orb: "radial-gradient(circle at 35% 35%, rgba(153,246,228,0.85), rgba(20,184,166,0.65) 55%, rgba(15,118,110,0.45))",
    orbShadow: "0 6px 20px -4px rgba(20,184,166,0.35)",
    dot: "bg-teal-500",
  },
  {
    tint: "from-violet-50/50 to-white",
    orb: "radial-gradient(circle at 35% 35%, rgba(196,181,253,0.85), rgba(124,58,237,0.65) 55%, rgba(91,33,182,0.45))",
    orbShadow: "0 6px 20px -4px rgba(91,33,182,0.3)",
    dot: "bg-violet-500",
  },
  {
    tint: "from-rose-50/50 to-white",
    orb: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.85), rgba(225,29,72,0.65) 55%, rgba(159,18,57,0.45))",
    orbShadow: "0 6px 20px -4px rgba(159,18,57,0.28)",
    dot: "bg-rose-500",
  },
  {
    tint: "from-teal-50/40 to-violet-50/30",
    orb: "radial-gradient(circle at 35% 35%, rgba(167,243,208,0.85), rgba(20,184,166,0.55) 50%, rgba(91,33,182,0.3))",
    orbShadow: "0 6px 20px -4px rgba(20,184,166,0.3)",
    dot: "bg-teal-400",
  },
  {
    tint: "from-violet-50/40 to-rose-50/30",
    orb: "radial-gradient(circle at 35% 35%, rgba(221,214,254,0.85), rgba(124,58,237,0.5) 50%, rgba(159,18,57,0.25))",
    orbShadow: "0 6px 20px -4px rgba(91,33,182,0.25)",
    dot: "bg-violet-400",
  },
] as const;

export function LandingIndustries() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-700">
            Industries
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Where This Chemistry Lands
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            From pharma CMC to oligo programs — we align deliverables to your governance model.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            return (
              <RevealOnScroll key={ind.slug} delay={i * 70}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border border-white/60 bg-gradient-to-b ${style.tint} p-7 shadow-[0_6px_28px_-8px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_-14px_rgba(15,23,42,0.12)]`}
                >
                  {/* Mini orb */}
                  <div
                    className="mb-5 h-10 w-10 rounded-full"
                    style={{
                      background: style.orb,
                      boxShadow: `${style.orbShadow}, inset 0 -1px 4px rgba(0,0,0,0.06)`,
                    }}
                  />
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {ind.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
                    Learn more
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="mt-10 flex justify-center">
          <Link
            href="/industries"
            className="rounded-full border border-white/60 bg-white/70 px-8 py-3 text-sm font-semibold text-slate-900 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all hover:shadow-[0_8px_28px_-8px_rgba(20,184,166,0.12)]"
          >
            Industry overview →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
