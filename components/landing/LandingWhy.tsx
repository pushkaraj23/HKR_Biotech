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
    chipColor: "text-primary-mid",
    shadow: "shadow-[0_0_40px_-20px_rgba(255,177,98,0.7)]",
  },
  secondary: {
    stripe: "from-secondary via-accent to-tint-accent",
    ring: "ring-secondary/40",
    border: "border-secondary/25 hover:border-secondary/50",
    numColor: "text-on-dark",
    numBg: "bg-secondary/30",
    chipColor: "text-on-dark/85",
    shadow: "shadow-[0_0_40px_-20px_rgba(44,59,77,0.55)]",
  },
  danger: {
    stripe: "from-danger via-primary-deep to-tint-danger",
    ring: "ring-danger/40",
    border: "border-danger/25 hover:border-danger/50",
    numColor: "text-on-dark",
    numBg: "bg-danger/30",
    chipColor: "text-primary-mid",
    shadow: "shadow-[0_0_40px_-20px_rgba(163,81,57,0.55)]",
  },
};

export function LandingWhy() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-on-dark/20 bg-[rgba(18,25,35,0.58)] px-6 py-10 text-center shadow-[0_18px_44px_-14px_rgba(18,25,35,0.55)] backdrop-blur-md sm:px-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(18,25,35,0.72) 0%, rgba(27,38,50,0.6) 48%, rgba(44,59,77,0.52) 100%)",
            }}
          >
            <div className="mx-auto mb-5 flex w-fit items-center gap-2.5 rounded-full border border-on-dark/25 bg-on-dark/[0.08] px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-on-dark">
                Why teams choose HKR
              </span>
            </div>

            <h2
              className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-on-dark md:text-4xl"
              style={{ textShadow: "0 2px 16px rgba(18,25,35,0.45)" }}
            >
              Rigor you can cite.{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary-mid">Partnership</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-2.5 rounded-full bg-primary/40 blur-[8px]"
                />
              </span>{" "}
              you can feel.
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-on-dark/90 sm:text-lg">
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
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-[rgba(18,25,35,0.74)] shadow-[0_14px_36px_-14px_rgba(8,13,20,0.8)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_-14px_rgba(8,13,20,0.9)] ${a.border} ${a.shadow}`}
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(18,25,35,0.82) 0%, rgba(26,36,50,0.74) 52%, rgba(38,52,70,0.68) 100%)",
                  }}
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

                    <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-on-dark">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-dark/78">
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
