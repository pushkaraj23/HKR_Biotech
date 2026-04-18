import Image from "next/image";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const PILLARS = [
  {
    title: "Analytical First",
    copy: "Characterization packages designed for regulatory and discovery reviewers alike.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop&q=80&auto=format",
    ring: "ring-primary/35 shadow-[0_8px_24px_-4px_rgba(255,177,98,0.28)]",
    tint: "from-tint-primary/30 to-surface/80",
  },
  {
    title: "Transparent Batches",
    copy: "Digital records, clear lineage, and reproducible isolation strategies.",
    image:
      "https://plus.unsplash.com/premium_photo-1681426676206-0f2c02b48aff?w=400&h=400&fit=crop&q=80&auto=format",
    ring: "ring-violet-500/30 shadow-[0_8px_24px_-4px_rgba(91,33,182,0.25)]",
    tint: "from-tint-accent/30 to-surface/80",
  },
  {
    title: "Scientific Partnership",
    copy: "PhD-level route dialogue — not a black-box vendor relationship.",
    image:
      "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=400&h=400&fit=crop&q=80&auto=format",
    ring: "ring-danger/35 shadow-[0_8px_24px_-4px_rgba(163,81,57,0.22)]",
    tint: "from-tint-danger/30 to-surface/80",
  },
] as const;

export function LandingWhy() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
            Why teams choose HKR
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Rigor you can cite. Partnership you can feel.
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
          {PILLARS.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 80}>
              <div
                className={`group relative h-full overflow-hidden rounded-[1.75rem] border border-border-strong/40 bg-gradient-to-b ${p.tint} p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
              >
                <div
                  className={`relative mb-6 h-14 w-14 overflow-hidden rounded-full ring-2 ${p.ring}`}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
