import Link from "next/link";
import { industries } from "@/data/industries";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { LANDING_CONTAINER, LANDING_SECTION } from "@/components/landing/landingSection";
import { glassButtonCn } from "@/lib/ui/glassButton";

const CARD_STYLES = [
  {
    stripe: "from-primary via-primary-mid to-tint-primary",
    border: "border-primary/22",
    ring: "ring-primary/40",
    chipBg: "bg-tint-primary",
    chipText: "text-on-dark",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--surface) 84%, var(--primary) 16%) 0%, color-mix(in srgb, var(--primary) 76%, var(--surface) 24%) 52%, color-mix(in srgb, var(--primary-mid) 68%, var(--surface) 32%) 100%)",
    title: "text-on-dark",
    body: "text-on-dark/78",
  },
  {
    stripe: "from-accent via-[#7AE38D] to-tint-accent",
    border: "border-accent/28",
    ring: "ring-accent/40",
    chipBg: "bg-white/76",
    chipText: "text-foreground",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--accent) 76%, white 24%) 0%, color-mix(in srgb, var(--accent) 64%, var(--primary-mid) 36%) 52%, color-mix(in srgb, var(--accent) 72%, var(--light) 28%) 100%)",
    title: "text-foreground",
    body: "text-foreground/82",
  },
  {
    stripe: "from-light via-[#F3F7FA] to-tint-accent",
    border: "border-white/55",
    ring: "ring-primary/30",
    chipBg: "bg-primary/12",
    chipText: "text-foreground",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--light) 88%, var(--secondary) 12%) 0%, color-mix(in srgb, var(--light) 74%, var(--accent) 26%) 58%, color-mix(in srgb, var(--light) 82%, var(--primary-mid) 18%) 100%)",
    title: "text-foreground",
    body: "text-foreground/80",
  },
  {
    stripe: "from-primary-deep via-primary to-primary-mid",
    border: "border-primary-deep/22",
    ring: "ring-primary-deep/40",
    chipBg: "bg-tint-primary",
    chipText: "text-on-dark",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--surface) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--primary) 78%, var(--surface) 22%) 52%, color-mix(in srgb, var(--primary-mid) 70%, var(--surface) 30%) 100%)",
    title: "text-on-dark",
    body: "text-on-dark/78",
  },
  {
    stripe: "from-light via-tint-accent to-accent",
    border: "border-accent/25",
    ring: "ring-accent/40",
    chipBg: "bg-white/75",
    chipText: "text-foreground",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--light) 82%, var(--accent) 18%) 0%, color-mix(in srgb, var(--light) 68%, var(--accent) 32%) 55%, color-mix(in srgb, var(--accent) 58%, var(--primary-mid) 42%) 100%)",
    title: "text-foreground",
    body: "text-foreground/82",
  },
] as const;

export function LandingIndustries() {
  return (
    <section className={LANDING_SECTION}>
      <div className={LANDING_CONTAINER}>
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/45 px-6 py-8 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.3)] backdrop-blur-md sm:px-10"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--light) 74%, var(--primary-mid) 26%) 45%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
            }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-foreground/70">Who we work with</p>
            <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Trusted by <span className="text-accent">research-driven</span> teams
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              Pharmaceutical, biotech, CRO, academic, and specialty chemistry programs — with documentation aligned to how your sector reviews science.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            const num = `0${i + 1}`;
            const initial = ind.title.replace(/[^A-Za-z]/g, "").charAt(0) || "?";
            return (
              <RevealOnScroll key={ind.slug} delay={i * 80}>
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border shadow-[0_14px_36px_-14px_rgba(18,50,90,0.58)] backdrop-blur-md ${style.border}`}
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
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="mt-10 flex justify-center md:mt-12">
          <Link
            href="/contact"
            className={glassButtonCn("green", "dark", "group rounded-full px-8 py-3.5 text-base")}
          >
            Discuss your program
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
