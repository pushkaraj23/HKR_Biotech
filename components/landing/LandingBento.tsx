import Image from "next/image";
import Link from "next/link";
import { capabilitySections } from "@/data/capabilities";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const bentoBlocks = capabilitySections
  .flatMap((s) => s.blocks.map((b) => ({ ...b, section: s.heading })))
  .slice(0, 5);

/** Per-card theming (stripe, border, stats dot, chip bg/color). */
const CARD_THEMES = [
  {
    stripe: "from-primary via-primary-mid to-tint-primary",
    border: "border-primary/25 hover:border-primary/50",
    chipBg: "bg-primary/26",
    chipText: "text-on-dark",
    dot: "bg-primary",
  },
  {
    stripe: "from-secondary via-accent to-tint-accent",
    border: "border-secondary/22 hover:border-secondary/45",
    chipBg: "bg-secondary/26",
    chipText: "text-on-dark",
    dot: "bg-secondary",
  },
  {
    stripe: "from-danger via-primary-deep to-tint-danger",
    border: "border-danger/22 hover:border-danger/45",
    chipBg: "bg-danger/28",
    chipText: "text-on-dark",
    dot: "bg-danger",
  },
  {
    stripe: "from-primary-deep via-primary to-primary-mid",
    border: "border-primary-deep/22 hover:border-primary-deep/40",
    chipBg: "bg-primary-deep/34",
    chipText: "text-on-dark",
    dot: "bg-primary-deep",
  },
  {
    stripe: "from-accent via-secondary to-tint-accent",
    border: "border-accent/25 hover:border-accent/50",
    chipBg: "bg-accent/28",
    chipText: "text-on-dark",
    dot: "bg-accent",
  },
] as const;

const CARD_IMAGES: (string | null)[] = [
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=800&h=450&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&h=450&fit=crop&q=80&auto=format",
  null,
  null,
  null,
];

export function LandingBento() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-on-dark/20 bg-[rgba(18,25,35,0.56)] px-6 py-8 shadow-[0_16px_42px_-14px_rgba(18,25,35,0.5)] backdrop-blur-md sm:px-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(18,25,35,0.72) 0%, rgba(27,38,50,0.58) 45%, rgba(44,59,77,0.5) 100%)",
            }}
          >
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-on-dark/25 bg-on-dark/[0.08] px-4 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-on-dark">
                02 / Infrastructure
              </span>
            </div>
            <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">
              A Lattice of <span className="text-primary-mid">Controlled</span> Environments
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-dark/90 sm:text-lg">
              Segregated synthesis suites, digital batch records, and redundant characterization
              — the foundation for process reproducibility at every scale.
            </p>
          </div>
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

            const theme = CARD_THEMES[i % CARD_THEMES.length];
            const image = CARD_IMAGES[i] ?? null;
            const blockNum = `0${i + 1}`;

            return (
              <RevealOnScroll
                key={`${block.title}-${i}`}
                delay={i * 80}
                className={spans}
              >
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-[rgba(18,25,35,0.74)] shadow-[0_14px_36px_-14px_rgba(8,13,20,0.8)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-14px_rgba(8,13,20,0.9)] ${theme.border}`}
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(18,25,35,0.82) 0%, rgba(26,36,50,0.74) 52%, rgba(38,52,70,0.68) 100%)",
                  }}
                >
                  {/* Accent stripe */}
                  <div className={`h-1 w-full bg-gradient-to-r ${theme.stripe}`} />

                  {image && (
                    <div className="relative h-40 w-full overflow-hidden sm:h-44">
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
                            "linear-gradient(to top, rgba(27,38,50,0.78) 0%, rgba(27,38,50,0.2) 55%, transparent 100%)",
                        }}
                      />
                      <span
                        className={`absolute left-4 top-4 rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] shadow-elevated-sm ${theme.chipBg} ${theme.chipText}`}
                      >
                        {blockNum}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-7">
                    {/* Top row with section + number */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                        <p className={`font-mono text-[10px] font-semibold uppercase tracking-[0.25em] ${theme.chipText}`}>
                          {block.section}
                        </p>
                      </div>
                      {!image && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.22em] ${theme.chipBg} ${theme.chipText}`}
                        >
                          {blockNum}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-on-dark sm:text-xl">
                      {block.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-on-dark/78">
                      {block.description}
                    </p>

                    {block.metrics && block.metrics.length > 0 && (
                      <dl className="mt-5 flex flex-wrap gap-2">
                        {block.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="inline-flex items-center gap-2 rounded-full border border-on-dark/20 bg-on-dark/[0.08] px-3 py-1.5"
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                            <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-on-dark/72">
                              {m.label}
                            </dt>
                            <dd className="text-xs font-bold text-on-dark">
                              {m.value}
                            </dd>
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

        <RevealOnScroll className="mt-12 flex justify-center">
          <Link
            href="/capabilities"
            className="group inline-flex items-center gap-2 rounded-full border border-on-dark/25 bg-[rgba(20,28,40,0.72)] px-8 py-3 text-sm font-semibold text-on-dark shadow-[0_10px_28px_-14px_rgba(8,13,20,0.95)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-secondary/55 hover:shadow-[0_16px_30px_-14px_rgba(8,13,20,0.95)]"
          >
            All capabilities
            <span
              aria-hidden
              className="grid h-5 w-5 place-items-center rounded-full bg-secondary/15 text-secondary transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
