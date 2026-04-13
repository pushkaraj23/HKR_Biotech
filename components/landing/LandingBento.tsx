import Image from "next/image";
import Link from "next/link";
import { capabilitySections } from "@/data/capabilities";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const bentoBlocks = capabilitySections
  .flatMap((s) => s.blocks.map((b) => ({ ...b, section: s.heading })))
  .slice(0, 5);

const CARD_ACCENTS = [
  "from-teal-950/30 via-[#0c1526] to-teal-950/15",
  "from-violet-950/30 via-[#0c1526] to-violet-950/15",
  "from-rose-950/25 via-[#0c1526] to-rose-950/15",
  "from-teal-950/20 via-violet-950/15 to-[#0c1526]",
  "from-violet-950/20 via-rose-950/15 to-[#0c1526]",
] as const;

const CARD_IMAGES: (string | null)[] = [
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=600&h=400&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=600&h=400&fit=crop&q=80&auto=format",
  null,
  null,
  null,
];

const ORB_STYLES = [
  { bg: "radial-gradient(circle at 45% 40%, rgba(20,184,166,0.45), rgba(15,118,110,0.12) 55%, transparent 70%)" },
  { bg: "radial-gradient(circle at 45% 40%, rgba(91,33,182,0.4), rgba(124,58,237,0.1) 55%, transparent 70%)" },
  { bg: "radial-gradient(circle at 45% 40%, rgba(159,18,57,0.35), rgba(190,24,93,0.08) 55%, transparent 70%)" },
  { bg: "radial-gradient(circle at 45% 40%, rgba(20,184,166,0.35), rgba(91,33,182,0.1) 55%, transparent 70%)" },
  { bg: "radial-gradient(circle at 45% 40%, rgba(124,58,237,0.35), rgba(159,18,57,0.08) 55%, transparent 70%)" },
] as const;

export function LandingBento() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-400">
            Infrastructure
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            A Lattice of Controlled Environments
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-6">
          {bentoBlocks.map((block, i) => {
            const spans = [
              "md:col-span-3",
              "md:col-span-3",
              "md:col-span-2",
              "md:col-span-2",
              "md:col-span-2",
            ][i] ?? "md:col-span-2";

            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            const orb = ORB_STYLES[i % ORB_STYLES.length];
            const image = CARD_IMAGES[i] ?? null;

            return (
              <RevealOnScroll key={`${block.title}-${i}`} delay={i * 60} className={spans}>
                <article
                  className={`group relative h-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-br ${accent} shadow-[0_6px_28px_-8px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-14px_rgba(0,0,0,0.3)]`}
                >
                  {image && (
                    <div className="relative h-36 w-full overflow-hidden sm:h-40">
                      <Image
                        src={image}
                        alt={block.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(7,14,27,0.9) 0%, rgba(7,14,27,0.4) 50%, transparent 100%)",
                        }}
                      />
                    </div>
                  )}

                  <div className="relative p-7">
                    <div
                      className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full blur-3xl opacity-50 transition-opacity duration-300 group-hover:opacity-80"
                      style={{ background: orb.bg }}
                      aria-hidden
                    />

                    <p className="relative font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
                      {block.section}
                    </p>
                    <h3 className="relative mt-3 font-display text-lg font-semibold text-white">
                      {block.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-slate-400">
                      {block.description}
                    </p>

                    {block.metrics && block.metrics.length > 0 && (
                      <dl className="relative mt-4 flex flex-wrap gap-2.5">
                        {block.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="rounded-full border border-white/[0.1] bg-white/[0.06] px-3.5 py-1.5 text-xs shadow-[0_2px_10px_-4px_rgba(0,0,0,0.2)] backdrop-blur-lg"
                          >
                            <dt className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
                              {m.label}
                            </dt>
                            <dd className="font-semibold text-slate-200">{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="mt-10 flex justify-center">
          <Link
            href="/capabilities"
            className="rounded-full border border-white/[0.1] bg-white/[0.06] px-8 py-3 text-sm font-semibold text-slate-200 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:shadow-[0_8px_28px_-8px_rgba(91,33,182,0.12)]"
          >
            All capabilities →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
