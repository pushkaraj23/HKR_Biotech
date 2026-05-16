import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { LANDING_CONTAINER, LANDING_SECTION } from "@/components/landing/landingSection";

const PILLARS = [
  {
    num: "01",
    title: "NMR-backed quality",
    copy: "1D and 2D NMR, HRMS, and HPLC — with CoA and technical reports you can cite.",
    accent: "primary" as const,
  },
  {
    num: "02",
    title: "Custom synthesis",
    copy: "Glycans, protected sugars, phosphoramidites, and impurities from milligram to scale-up.",
    accent: "secondary" as const,
  },
  {
    num: "03",
    title: "Scientific partnership",
    copy: "PhD-led teams for academia, biotech, and pharma — clear timelines and route-level dialogue.",
    accent: "danger" as const,
  },
] as const;

const ACCENT_STYLES = {
  primary: {
    stripe: "from-primary via-primary-mid to-tint-primary",
    ring: "ring-primary/40",
    border: "border-primary/25 hover:border-primary/55",
    numColor: "text-on-dark",
    numBg: "bg-primary/28",
    shadow: "shadow-[0_0_40px_-20px_rgba(26,115,232,0.65)]",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--surface) 84%, var(--primary) 16%) 0%, color-mix(in srgb, var(--primary) 76%, var(--surface) 24%) 52%, color-mix(in srgb, var(--primary-mid) 68%, var(--surface) 32%) 100%)",
    title: "text-on-dark",
    copy: "text-on-dark/82",
  },
  secondary: {
    stripe: "from-accent via-[#7AE38D] to-tint-accent",
    ring: "ring-accent/40",
    border: "border-accent/30 hover:border-accent/55",
    numColor: "text-foreground",
    numBg: "bg-white/75",
    shadow: "shadow-[0_0_40px_-20px_rgba(43,196,138,0.55)]",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--accent) 76%, white 24%) 0%, color-mix(in srgb, var(--accent) 64%, var(--primary-mid) 36%) 52%, color-mix(in srgb, var(--accent) 72%, var(--light) 28%) 100%)",
    title: "text-foreground",
    copy: "text-foreground/82",
  },
  danger: {
    stripe: "from-light via-[#F3F7FA] to-tint-accent",
    ring: "ring-primary/30",
    border: "border-white/55 hover:border-primary/35",
    numColor: "text-foreground",
    numBg: "bg-primary/12",
    shadow: "shadow-[0_0_40px_-20px_rgba(27,50,77,0.25)]",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--light) 88%, var(--secondary) 12%) 0%, color-mix(in srgb, var(--light) 74%, var(--accent) 26%) 58%, color-mix(in srgb, var(--light) 82%, var(--primary-mid) 18%) 100%)",
    title: "text-foreground",
    copy: "text-foreground/80",
  },
};

export function LandingWhy() {
  return (
    <section className={LANDING_SECTION}>
      <div className={LANDING_CONTAINER}>
        <RevealOnScroll>
          <div
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/45 px-6 py-10 text-center shadow-[0_16px_42px_-14px_rgba(18,50,90,0.3)] backdrop-blur-md sm:px-10 sm:py-12"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--light) 74%, var(--primary-mid) 26%) 45%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
            }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/70">Why HKR</p>
            <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Chemistry you can{" "}
              <span className="text-primary">document</span>. Support you can reach.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              We combine custom carbohydrate and nucleoside synthesis with characterization that stands up to regulatory and publication review.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-7">
          {PILLARS.map((p, i) => {
            const a = ACCENT_STYLES[p.accent];
            return (
              <RevealOnScroll key={p.title} delay={i * 100}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border shadow-[0_14px_36px_-14px_rgba(18,50,90,0.58)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-14px_rgba(18,50,90,0.7)] ${a.border} ${a.shadow}`}
                  style={{ background: a.cardBg }}
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${a.stripe}`} />
                  <div className="flex flex-1 flex-col p-7">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-extrabold tabular-nums ring-2 ${a.ring} ${a.numBg} ${a.numColor}`}
                    >
                      {p.num}
                    </span>
                    <h3 className={`mt-6 font-display text-xl font-extrabold tracking-tight md:text-2xl ${a.title}`}>{p.title}</h3>
                    <p className={`mt-3 text-base leading-relaxed sm:text-lg ${a.copy}`}>{p.copy}</p>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
