import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ButtonLink } from "@/components/ui/ButtonLink";

const LAB_IMAGE =
  "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=1200&h=900&fit=crop&q=80&auto=format";

const FEATURES = [
  {
    title: "ALCOA+ Alignment",
    copy: "Phase-appropriate documentation that stands up to regulatory review.",
    accent: "primary" as const,
  },
  {
    title: "Segregated Lines",
    copy: "Dedicated synthesis suites with inert gas distribution and contamination control.",
    accent: "secondary" as const,
  },
  {
    title: "Prep & Traceability",
    copy: "Prep HPLC and crystallization with barcode-linked batch records.",
    accent: "danger" as const,
  },
] as const;

const ACCENT_CLASSES = {
  primary: {
    bar: "from-primary to-primary-deep",
    itemBg: "bg-primary/14 border-primary/32",
    title: "text-on-dark",
    copy: "text-on-dark/86",
  },
  secondary: {
    bar: "from-accent to-[#7AE38D]",
    itemBg: "bg-accent/18 border-accent/36",
    title: "text-on-dark",
    copy: "text-on-dark/88",
  },
  danger: {
    bar: "from-light to-tint-accent",
    itemBg: "bg-white/84 border-white/55",
    title: "text-foreground",
    copy: "text-foreground/82",
  },
};

const STATS = [
  { value: "99.7%", label: "QC Pass" },
  { value: "< 48h", label: "RFQ Response" },
  { value: "14+", label: "Route Steps Avg." },
];

export function LandingLabStory() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-16">
        {/* Image side */}
        <RevealOnScroll className="relative order-2 lg:order-1">
          <div className="relative h-full min-h-[520px] overflow-hidden rounded-[2rem] border border-border-strong/50 shadow-[var(--elev-card-stack)] sm:min-h-[580px] lg:min-h-[700px]">
            <Image
              src={LAB_IMAGE}
              alt="Laboratory research work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Richer gradient scrim */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(27,38,50,0.85) 0%, rgba(27,38,50,0.35) 45%, rgba(27,38,50,0.04) 75%, transparent 100%)",
              }}
            />

            {/* Floating orbs */}
            <div
              className="absolute right-6 top-6 h-14 w-14 rounded-full animate-orbit-slow"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), rgba(255,177,98,0.38) 55%, rgba(163,81,57,0.1))",
                boxShadow:
                  "0 8px 24px -4px rgba(255,177,98,0.34), inset 0 -2px 6px rgba(27,38,50,0.1)",
              }}
              aria-hidden
            />
            <div
              className="absolute left-8 top-1/3 h-8 w-8 rounded-full animate-orbit-slow"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), rgba(74,93,114,0.4) 55%, rgba(44,59,77,0.1))",
                boxShadow:
                  "0 4px 14px -3px rgba(44,59,77,0.3), inset 0 -1px 4px rgba(27,38,50,0.1)",
                animationDelay: "-4s",
                animationDuration: "14s",
              }}
              aria-hidden
            />

            {/* Top-left badge */}
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-on-dark/30 bg-[rgba(18,25,35,0.48)] px-3 py-1.5 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-on-dark">
                Live ops
              </span>
            </div>

            {/* Caption (kept above stats strip) */}
            <div className="absolute inset-x-0 bottom-28 p-8 sm:bottom-32 sm:p-10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">
                Operations
              </p>
              <p className="mt-3 max-w-md font-display text-xl font-bold leading-snug text-on-dark sm:text-2xl">
                Controlled environments. Redundant characterization. Traceable release.
              </p>
            </div>

            {/* Stats strip overlay */}
            <div
              className="absolute inset-x-5 bottom-5 hidden gap-0 rounded-2xl border border-on-dark/25 bg-[rgba(18,25,35,0.62)] shadow-[0_14px_32px_-10px_rgba(18,25,35,0.62)] backdrop-blur-md sm:flex"
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 px-5 py-4 ${i !== STATS.length - 1 ? "border-r border-on-dark/20" : ""}`}
                >
                  <p className="font-display text-xl font-bold tracking-tight text-on-dark">
                    {s.value}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-on-dark/80">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Copy side */}
        <div className="order-1 lg:order-2">
          <RevealOnScroll>
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/45 bg-[color-mix(in_srgb,var(--light)_82%,var(--accent)_18%)] px-6 py-8 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.3)] backdrop-blur-md sm:px-10"
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
                  04 / Inside HKR
                </span>
              </div>
              <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Infrastructure Built for <span className="text-primary-deep">Reproducibility</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/82 sm:text-lg">
                Dedicated project leadership, redundant characterization, and digital batch records
                — an environment designed for traceable science at any scale.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <ul className="mt-8 space-y-4">
              {FEATURES.map((f) => {
                const a = ACCENT_CLASSES[f.accent];
                return (
                  <li
                    key={f.title}
                    className={`group flex gap-4 rounded-2xl border p-4 shadow-[0_10px_24px_-12px_rgba(18,50,90,0.45)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(18,50,90,0.55)] ${a.itemBg}`}
                  >
                    <span
                      aria-hidden
                      className={`mt-1 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b ${a.bar}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-display text-sm font-bold ${a.title}`}>
                          {f.title}
                        </h3>
                      </div>
                      <p className={`mt-1 text-sm leading-relaxed ${a.copy}`}>
                        {f.copy}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={180}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink
                href="/about"
                variant="secondary"
                className="rounded-full border-primary/30 bg-white/80 text-foreground hover:border-primary/55 hover:bg-white"
              >
                Company story
              </ButtonLink>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-on-dark"
              >
                Talk to us
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
