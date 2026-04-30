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
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--surface) 84%, var(--primary) 16%) 0%, color-mix(in srgb, var(--primary) 76%, var(--surface) 24%) 52%, color-mix(in srgb, var(--primary-mid) 68%, var(--surface) 32%) 100%)",
    title: "text-on-dark",
    body: "text-on-dark/78",
    metricWrap: "border-on-dark/20 bg-on-dark/[0.08]",
    metricLabel: "text-on-dark/72",
    metricValue: "text-on-dark",
  },
  {
    stripe: "from-accent via-[#7AE38D] to-tint-accent",
    border: "border-accent/28 hover:border-accent/52",
    chipBg: "bg-white/72",
    chipText: "text-foreground",
    dot: "bg-accent",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--accent) 76%, white 24%) 0%, color-mix(in srgb, var(--accent) 64%, var(--primary-mid) 36%) 52%, color-mix(in srgb, var(--accent) 72%, var(--light) 28%) 100%)",
    title: "text-foreground",
    body: "text-foreground/82",
    metricWrap: "border-foreground/15 bg-white/45",
    metricLabel: "text-foreground/72",
    metricValue: "text-foreground",
  },
  {
    stripe: "from-light via-[#F3F7FA] to-tint-accent",
    border: "border-white/55 hover:border-primary/35",
    chipBg: "bg-primary/12",
    chipText: "text-foreground",
    dot: "bg-primary-mid",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--light) 88%, var(--secondary) 12%) 0%, color-mix(in srgb, var(--light) 74%, var(--accent) 26%) 58%, color-mix(in srgb, var(--light) 82%, var(--primary-mid) 18%) 100%)",
    title: "text-foreground",
    body: "text-foreground/80",
    metricWrap: "border-foreground/15 bg-white/52",
    metricLabel: "text-foreground/72",
    metricValue: "text-foreground",
  },
  {
    stripe: "from-primary-deep via-primary to-primary-mid",
    border: "border-primary-deep/22 hover:border-primary-deep/40",
    chipBg: "bg-primary-deep/34",
    chipText: "text-on-dark",
    dot: "bg-primary-deep",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--surface) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--primary) 78%, var(--surface) 22%) 52%, color-mix(in srgb, var(--primary-mid) 70%, var(--surface) 30%) 100%)",
    title: "text-on-dark",
    body: "text-on-dark/78",
    metricWrap: "border-on-dark/20 bg-on-dark/[0.08]",
    metricLabel: "text-on-dark/72",
    metricValue: "text-on-dark",
  },
  {
    stripe: "from-light via-tint-accent to-accent",
    border: "border-accent/26 hover:border-accent/50",
    chipBg: "bg-white/75",
    chipText: "text-foreground",
    dot: "bg-accent",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 0%, color-mix(in srgb, var(--light) 68%, var(--accent) 32%) 55%, color-mix(in srgb, var(--accent) 58%, var(--primary-mid) 42%) 100%)",
    title: "text-foreground",
    body: "text-foreground/82",
    metricWrap: "border-foreground/15 bg-white/45",
    metricLabel: "text-foreground/72",
    metricValue: "text-foreground",
  },
] as const;

const CARD_IMAGES: (string | null)[] = [
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=800&h=450&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&h=450&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=800&h=450&fit=crop&q=80&auto=format",
  "https://plus.unsplash.com/premium_photo-1681426676206-0f2c02b48aff?w=800&h=450&fit=crop&q=80&auto=format",
];

export function LandingBento() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/45 bg-[color-mix(in_srgb,var(--light)_82%,var(--primary)_18%)] px-6 py-8 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.3)] backdrop-blur-md sm:px-10"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--light) 74%, var(--primary-mid) 26%) 45%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
            }}
          >
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-on-dark/25 bg-on-dark/[0.08] px-4 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/85">
                02 / Infrastructure
              </span>
            </div>
            <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              A Lattice of <span className="text-accent">Controlled</span> Environments
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/82 sm:text-lg">
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
            return (
              <RevealOnScroll
                key={`${block.title}-${i}`}
                delay={i * 80}
                className={spans}
              >
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border shadow-[0_14px_36px_-14px_rgba(18,50,90,0.58)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-14px_rgba(18,50,90,0.7)] ${theme.border}`}
                  style={{ background: theme.cardBg }}
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
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-7">
                    {/* Top row with section + number */}
                    <div className="flex items-center">
                      <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                    </div>

                    <h3 className={`mt-3 font-display text-lg font-bold tracking-tight ${theme.title} sm:text-xl`}>
                      {block.title}
                    </h3>
                    <p className={`mt-2.5 text-sm leading-relaxed ${theme.body}`}>
                      {block.description}
                    </p>

                    {block.metrics && block.metrics.length > 0 && (
                      <dl className="mt-5 flex flex-wrap gap-2">
                        {block.metrics.map((m) => (
                          <div key={m.label} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${theme.metricWrap}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                            <dt className={`font-mono text-[9px] font-semibold uppercase tracking-[0.18em] ${theme.metricLabel}`}>
                              {m.label}
                            </dt>
                            <dd className={`text-xs font-bold ${theme.metricValue}`}>
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
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-[color-mix(in_srgb,var(--light)_78%,var(--primary)_22%)] px-8 py-3 text-sm font-semibold text-foreground shadow-[0_10px_28px_-14px_rgba(18,50,90,0.5)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_16px_30px_-14px_rgba(18,50,90,0.6)]"
          >
            All capabilities
            <span
              aria-hidden
              className="grid h-5 w-5 place-items-center rounded-full bg-primary/18 text-primary transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
