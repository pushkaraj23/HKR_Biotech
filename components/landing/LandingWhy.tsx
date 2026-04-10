import Image from "next/image";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const PILLARS = [
  {
    title: "Analytical First",
    copy: "Characterization packages designed for regulatory and discovery reviewers alike.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop&q=80&auto=format",
    ring: "ring-teal-300/50 shadow-[0_8px_24px_-4px_rgba(20,184,166,0.3)]",
    tint: "from-teal-50/60 to-white",
  },
  {
    title: "Transparent Batches",
    copy: "Digital records, clear lineage, and reproducible isolation strategies.",
    image:
      "https://plus.unsplash.com/premium_photo-1681426676206-0f2c02b48aff?w=400&h=400&fit=crop&q=80&auto=format",
    ring: "ring-violet-300/50 shadow-[0_8px_24px_-4px_rgba(91,33,182,0.25)]",
    tint: "from-violet-50/60 to-white",
  },
  {
    title: "Scientific Partnership",
    copy: "PhD-level route dialogue — not a black-box vendor relationship.",
    image:
      "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=400&h=400&fit=crop&q=80&auto=format",
    ring: "ring-rose-300/50 shadow-[0_8px_24px_-4px_rgba(159,18,57,0.22)]",
    tint: "from-rose-50/60 to-white",
  },
] as const;

export function LandingWhy() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-700">
            Why teams choose HKR
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Rigor you can cite. Partnership you can feel.
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
          {PILLARS.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 80}>
              <div
                className={`group relative h-full overflow-hidden rounded-[1.75rem] border border-white/60 bg-gradient-to-b ${p.tint} p-7 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(15,23,42,0.12)]`}
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

                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.copy}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
