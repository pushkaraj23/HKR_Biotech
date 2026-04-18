import Image from "next/image";
import Link from "next/link";
import { capabilitySections } from "@/data/capabilities";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const bentoBlocks = capabilitySections
  .flatMap((s) => s.blocks.map((b) => ({ ...b, section: s.heading })))
  .slice(0, 5);

const CARD_ACCENTS = [
  "from-tint-primary/30 via-surface to-tint-primary/15",
  "from-tint-accent/30 via-surface to-tint-accent/15",
  "from-tint-danger/25 via-surface to-tint-danger/15",
  "from-tint-primary/20 via-tint-accent/15 to-surface",
  "from-tint-accent/20 via-tint-danger/15 to-surface",
] as const;

const CARD_IMAGES: (string | null)[] = [
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=600&h=400&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=600&h=400&fit=crop&q=80&auto=format",
  null,
  null,
  null,
];

const ORB_STYLES = [
  { bg: "radial-gradient(circle at 45% 40%, rgba(255,177,98,0.42), rgba(163,81,57,0.12) 55%, transparent 70%)" },
  { bg: "radial-gradient(circle at 45% 40%, rgba(44,59,77,0.38), rgba(74,93,114,0.1) 55%, transparent 70%)" },
  { bg: "radial-gradient(circle at 45% 40%, rgba(163,81,57,0.34), rgba(200,120,95,0.08) 55%, transparent 70%)" },
  { bg: "radial-gradient(circle at 45% 40%, rgba(255,177,98,0.32), rgba(44,59,77,0.1) 55%, transparent 70%)" },
  { bg: "radial-gradient(circle at 45% 40%, rgba(155,168,183,0.34), rgba(163,81,57,0.08) 55%, transparent 70%)" },
] as const;

export function LandingBento() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
            Infrastructure
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
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
                  className={`group relative h-full overflow-hidden rounded-[1.75rem] border border-border-strong/40 bg-gradient-to-br ${accent} shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
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
                            "linear-gradient(to top, rgba(27,38,50,0.88) 0%, rgba(27,38,50,0.38) 50%, transparent 100%)",
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

                    <p className="relative font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-caption-foreground">
                      {block.section}
                    </p>
                    <h3 className="relative mt-3 font-display text-lg font-semibold text-foreground">
                      {block.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                      {block.description}
                    </p>

                    {block.metrics && block.metrics.length > 0 && (
                      <dl className="relative mt-4 flex flex-wrap gap-2.5">
                        {block.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="rounded-full border border-border-strong/45 bg-card/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-sm"
                          >
                            <dt className="font-mono text-[9px] uppercase tracking-wider text-caption-foreground">
                              {m.label}
                            </dt>
                            <dd className="font-semibold text-foreground">{m.value}</dd>
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
            className="rounded-full border border-border-strong/50 bg-card/95 px-8 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:border-secondary/35 hover:shadow-md"
          >
            All capabilities →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
