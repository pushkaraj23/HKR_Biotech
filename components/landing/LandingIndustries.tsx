import Link from "next/link";
import { industries } from "@/data/industries";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const CARD_STYLES = [
  {
    stripe: "from-primary via-primary-mid to-tint-primary",
    border: "border-primary/22 hover:border-primary/45",
    ring: "ring-primary/40",
    chipBg: "bg-tint-primary",
    chipText: "text-on-dark",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--surface) 84%, var(--primary) 16%) 0%, color-mix(in srgb, var(--primary) 76%, var(--surface) 24%) 52%, color-mix(in srgb, var(--primary-mid) 68%, var(--surface) 32%) 100%)",
    title: "text-on-dark",
    body: "text-on-dark/78",
    learn: "text-on-dark/82 group-hover:text-on-dark",
  },
  {
    stripe: "from-accent via-[#7AE38D] to-tint-accent",
    border: "border-accent/28 hover:border-accent/52",
    ring: "ring-accent/40",
    chipBg: "bg-white/76",
    chipText: "text-foreground",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--accent) 76%, white 24%) 0%, color-mix(in srgb, var(--accent) 64%, var(--primary-mid) 36%) 52%, color-mix(in srgb, var(--accent) 72%, var(--light) 28%) 100%)",
    title: "text-foreground",
    body: "text-foreground/82",
    learn: "text-foreground/78 group-hover:text-foreground",
  },
  {
    stripe: "from-light via-[#F3F7FA] to-tint-accent",
    border: "border-white/55 hover:border-primary/35",
    ring: "ring-primary/30",
    chipBg: "bg-primary/12",
    chipText: "text-foreground",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--light) 88%, var(--secondary) 12%) 0%, color-mix(in srgb, var(--light) 74%, var(--accent) 26%) 58%, color-mix(in srgb, var(--light) 82%, var(--primary-mid) 18%) 100%)",
    title: "text-foreground",
    body: "text-foreground/80",
    learn: "text-foreground/72 group-hover:text-foreground/90",
  },
  {
    stripe: "from-primary-deep via-primary to-primary-mid",
    border: "border-primary-deep/22 hover:border-primary-deep/40",
    ring: "ring-primary-deep/40",
    chipBg: "bg-tint-primary",
    chipText: "text-on-dark",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--surface) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--primary) 78%, var(--surface) 22%) 52%, color-mix(in srgb, var(--primary-mid) 70%, var(--surface) 30%) 100%)",
    title: "text-on-dark",
    body: "text-on-dark/78",
    learn: "text-on-dark/75 group-hover:text-on-dark",
  },
  {
    stripe: "from-light via-tint-accent to-accent",
    border: "border-accent/25 hover:border-accent/50",
    ring: "ring-accent/40",
    chipBg: "bg-white/75",
    chipText: "text-foreground",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 0%, color-mix(in srgb, var(--light) 68%, var(--accent) 32%) 55%, color-mix(in srgb, var(--accent) 58%, var(--primary-mid) 42%) 100%)",
    title: "text-foreground",
    body: "text-foreground/82",
    learn: "text-foreground/78 group-hover:text-foreground",
  },
] as const;

export function LandingIndustries() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/45 px-6 py-8 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.3)] backdrop-blur-md sm:px-10"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--light) 74%, var(--primary-mid) 26%) 45%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
            }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground/70">Industries</p>
            <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Where this <span className="text-accent">chemistry</span> lands
            </h2>
            <p className="mt-3 max-w-2xl text-base text-foreground/75">Aligned to how your sector buys and reviews science.</p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            const num = `0${i + 1}`;
            const initial = ind.title.replace(/[^A-Za-z]/g, "").charAt(0) || "?";
            return (
              <RevealOnScroll key={ind.slug} delay={i * 80}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border shadow-[0_14px_36px_-14px_rgba(18,50,90,0.58)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-14px_rgba(18,50,90,0.7)] ${style.border}`}
                  style={{ background: style.cardBg }}
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${style.stripe}`} />

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-extrabold ring-2 ${style.ring} shadow-elevated-sm ${style.title} ${style.chipBg}`}
                        aria-hidden
                      >
                        {initial}
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.22em] ${style.chipBg} ${style.chipText}`}
                      >
                        {num}
                      </span>
                    </div>

                    <h3 className={`mt-6 font-display text-xl font-extrabold tracking-tight md:text-2xl ${style.title}`}>{ind.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${style.body}`}>{ind.description}</p>

                    <div className="mt-auto flex items-center justify-between pt-6">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${style.learn}`}>
                        Details
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                      <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-current opacity-40" />
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="mt-12 flex justify-center">
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-[color-mix(in_srgb,var(--light)_78%,var(--primary)_22%)] px-8 py-3 text-sm font-semibold text-foreground shadow-[0_10px_28px_-14px_rgba(18,50,90,0.5)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_16px_30px_-14px_rgba(18,50,90,0.6)]"
          >
            All industries
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
