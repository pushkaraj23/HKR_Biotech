import Image from "next/image";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const PILLARS = [
  {
    num: "01",
    title: "Analytical First",
    copy: "Characterization packages designed for regulatory and discovery reviewers alike — NMR, HRMS, HPLC-PDA as standard.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=600&fit=crop&q=80&auto=format",
    accent: "primary" as const,
  },
  {
    num: "02",
    title: "Transparent Batches",
    copy: "Digital records, clear lineage, and reproducible isolation strategies — traceable from route selection to vial.",
    image:
      "https://plus.unsplash.com/premium_photo-1681426676206-0f2c02b48aff?w=600&h=600&fit=crop&q=80&auto=format",
    accent: "secondary" as const,
  },
  {
    num: "03",
    title: "Scientific Partnership",
    copy: "PhD-level route dialogue — not a black-box vendor relationship. We challenge assumptions and share data.",
    image:
      "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=600&h=600&fit=crop&q=80&auto=format",
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
    chipColor: "text-on-dark/85",
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
    chipColor: "text-foreground/75",
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
    chipColor: "text-muted-foreground",
    shadow: "shadow-[0_0_40px_-20px_rgba(27,50,77,0.25)]",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--light) 88%, var(--secondary) 12%) 0%, color-mix(in srgb, var(--light) 74%, var(--accent) 26%) 58%, color-mix(in srgb, var(--light) 82%, var(--primary-mid) 18%) 100%)",
    title: "text-foreground",
    copy: "text-foreground/80",
  },
};

export function LandingWhy() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/45 bg-[color-mix(in_srgb,var(--light)_82%,var(--primary)_18%)] px-6 py-10 text-center shadow-[0_16px_42px_-14px_rgba(18,50,90,0.3)] backdrop-blur-md sm:px-10"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--light) 74%, var(--primary-mid) 26%) 45%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
            }}
          >
            <div className="mx-auto mb-5 flex w-fit items-center gap-2.5 rounded-full border border-on-dark/25 bg-on-dark/[0.08] px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/85">
                Why teams choose HKR
              </span>
            </div>

            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
              Rigor you can cite.{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Partnership</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-2.5 rounded-full bg-primary/40 blur-[8px]"
                />
              </span>{" "}
              you can feel.
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-foreground/82 sm:text-lg">
              Three principles that show up in every RFQ reply, every spec sheet, and every
              release decision we make.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-7">
          {PILLARS.map((p, i) => {
            const a = ACCENT_STYLES[p.accent];
            return (
              <RevealOnScroll key={p.title} delay={i * 100}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border shadow-[0_14px_36px_-14px_rgba(18,50,90,0.58)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_-14px_rgba(18,50,90,0.7)] ${a.border} ${a.shadow}`}
                  style={{ background: a.cardBg }}
                >
                  {/* Coloured gradient stripe */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${a.stripe}`} />

                  <div className="flex flex-1 flex-col p-7">
                    {/* Top row: image + number chip */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`relative h-16 w-16 overflow-hidden rounded-2xl ring-2 ${a.ring} shadow-elevated-sm`}
                      >
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="64px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] ${a.numBg} ${a.numColor}`}
                      >
                        {p.num}
                      </span>
                    </div>

                    <h3 className={`mt-6 font-display text-xl font-bold tracking-tight ${a.title}`}>
                      {p.title}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed ${a.copy}`}>
                      {p.copy}
                    </p>

                    {/* Footer chip */}
                    <div className="mt-auto flex items-center gap-2 pt-6">
                      <div
                        className={`h-px flex-1 bg-gradient-to-r from-transparent to-current opacity-20 ${a.chipColor}`}
                      />
                      <span
                        className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${a.chipColor}`}
                      >
                        Principle {p.num}
                      </span>
                    </div>
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
