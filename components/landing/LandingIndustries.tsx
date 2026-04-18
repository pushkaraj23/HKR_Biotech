import Image from "next/image";
import Link from "next/link";
import { industries } from "@/data/industries";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const CARD_STYLES = [
  {
    tint: "from-tint-primary/25 to-surface/80",
    ring: "ring-primary/35",
    shadow: "shadow-[0_6px_20px_-4px_rgba(255,177,98,0.22)]",
    image:
      "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=200&h=200&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-tint-accent/25 to-surface/80",
    ring: "ring-secondary/35",
    shadow: "shadow-[0_6px_20px_-4px_rgba(44,59,77,0.2)]",
    image:
      "https://plus.unsplash.com/premium_photo-1681426676206-0f2c02b48aff?w=200&h=200&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-tint-danger/25 to-surface/80",
    ring: "ring-danger/35",
    shadow: "shadow-[0_6px_20px_-4px_rgba(163,81,57,0.18)]",
    image:
      "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=200&h=200&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-tint-primary/20 to-tint-accent/15",
    ring: "ring-primary/30",
    shadow: "shadow-[0_6px_20px_-4px_rgba(255,177,98,0.18)]",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=200&fit=crop&q=80&auto=format",
  },
  {
    tint: "from-tint-accent/20 to-tint-danger/15",
    ring: "ring-secondary/30",
    shadow: "shadow-[0_6px_20px_-4px_rgba(44,59,77,0.16)]",
    image:
      "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=200&h=200&fit=crop&q=80&auto=format",
  },
] as const;

export function LandingIndustries() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
            Industries
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Where This Chemistry Lands
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
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
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border border-border-strong/40 bg-gradient-to-b ${style.tint} p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
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
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {ind.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
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
            className="rounded-full border border-border-strong/50 bg-card/95 px-8 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:border-primary/35 hover:shadow-md"
          >
            Industry overview →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
