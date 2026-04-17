import Image from "next/image";
import Link from "next/link";
import { industries } from "@/data/industries";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const CARD_STYLES = [
  {
    tint: "from-teal-950/25 to-bg-secondary/80",
    ring: "ring-teal-500/30",
    shadow: "shadow-[0_6px_20px_-4px_rgba(20,184,166,0.25)]",
    image:
      "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=200&h=200&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-violet-950/25 to-bg-secondary/80",
    ring: "ring-violet-500/30",
    shadow: "shadow-[0_6px_20px_-4px_rgba(91,33,182,0.2)]",
    image:
      "https://plus.unsplash.com/premium_photo-1681426676206-0f2c02b48aff?w=200&h=200&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-rose-950/25 to-bg-secondary/80",
    ring: "ring-rose-500/30",
    shadow: "shadow-[0_6px_20px_-4px_rgba(159,18,57,0.18)]",
    image:
      "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=200&h=200&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-teal-950/20 to-violet-950/15",
    ring: "ring-teal-500/25",
    shadow: "shadow-[0_6px_20px_-4px_rgba(20,184,166,0.2)]",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=200&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-violet-950/20 to-rose-950/15",
    ring: "ring-violet-500/25",
    shadow: "shadow-[0_6px_20px_-4px_rgba(91,33,182,0.18)]",
    image:
      "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=200&h=200&fit=crop&q=80&auto=format",
  },
] as const;

export function LandingIndustries() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-400">
            Industries
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Where This Chemistry Lands
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-400">
            From pharma CMC to oligo programs — we align deliverables to your governance model.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            return (
              <RevealOnScroll key={ind.slug} delay={i * 70}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b ${style.tint} p-7 shadow-[0_6px_28px_-8px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_-14px_rgba(0,0,0,0.3)]`}
                >
                  <div
                    className={`relative mb-5 h-12 w-12 overflow-hidden rounded-full ring-2 ${style.ring} ${style.shadow}`}
                  >
                    <Image
                      src={style.image}
                      alt={ind.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {ind.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 transition-colors group-hover:text-white">
                    Learn more
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll className="mt-10 flex justify-center">
          <Link
            href="/industries"
            className="rounded-full border border-white/[0.1] bg-white/[0.06] px-8 py-3 text-sm font-semibold text-slate-200 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:shadow-[0_8px_28px_-8px_rgba(20,184,166,0.12)]"
          >
            Industry overview →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
