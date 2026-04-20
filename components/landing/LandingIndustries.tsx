import Image from "next/image";
import Link from "next/link";
import { industries } from "@/data/industries";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const CARD_STYLES = [
  {
    stripe: "from-primary via-primary-mid to-tint-primary",
    border: "border-primary/22 hover:border-primary/45",
    ring: "ring-primary/40",
    chipBg: "bg-tint-primary",
    chipText: "text-primary-deep",
    image:
      "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=300&h=300&fit=crop&q=80&auto=format",
  },
  {
    stripe: "from-secondary via-accent to-tint-accent",
    border: "border-secondary/22 hover:border-secondary/45",
    ring: "ring-secondary/40",
    chipBg: "bg-tint-accent",
    chipText: "text-secondary",
    image:
      "https://plus.unsplash.com/premium_photo-1681426676206-0f2c02b48aff?w=300&h=300&fit=crop&q=80&auto=format",
  },
  {
    stripe: "from-danger via-primary-deep to-tint-danger",
    border: "border-danger/22 hover:border-danger/45",
    ring: "ring-danger/40",
    chipBg: "bg-tint-danger",
    chipText: "text-danger",
    image:
      "https://images.unsplash.com/photo-1582560486415-e67bced0ca2d?w=300&h=300&fit=crop&q=80&auto=format",
  },
  {
    stripe: "from-primary-deep via-primary to-primary-mid",
    border: "border-primary-deep/22 hover:border-primary-deep/40",
    ring: "ring-primary-deep/40",
    chipBg: "bg-tint-primary",
    chipText: "text-primary-deep",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=300&fit=crop&q=80&auto=format",
  },
  {
    stripe: "from-accent via-secondary to-tint-accent",
    border: "border-accent/25 hover:border-accent/50",
    ring: "ring-accent/40",
    chipBg: "bg-tint-accent",
    chipText: "text-secondary",
    image:
      "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=300&h=300&fit=crop&q=80&auto=format",
  },
] as const;

export function LandingIndustries() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-on-dark/20 bg-[rgba(18,25,35,0.56)] px-6 py-8 shadow-[0_16px_42px_-14px_rgba(18,25,35,0.5)] backdrop-blur-md sm:px-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(18,25,35,0.72) 0%, rgba(27,38,50,0.58) 45%, rgba(44,59,77,0.5) 100%)",
            }}
          >
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-on-dark/25 bg-on-dark/[0.08] px-4 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-on-dark">
                03 / Industries
              </span>
            </div>
            <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">
              Where This <span className="text-primary-mid">Chemistry</span> Lands
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-dark/90 sm:text-lg">
              From pharma CMC to oligo programs — we align deliverables to your governance model
              and reviewer expectations.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            const num = `0${i + 1}`;
            return (
              <RevealOnScroll key={ind.slug} delay={i * 80}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-[rgba(18,25,35,0.74)] shadow-[0_14px_36px_-14px_rgba(8,13,20,0.8)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_-14px_rgba(8,13,20,0.9)] ${style.border}`}
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(18,25,35,0.82) 0%, rgba(26,36,50,0.74) 52%, rgba(38,52,70,0.68) 100%)",
                  }}
                >
                  {/* Coloured stripe */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${style.stripe}`} />

                  <div className="flex flex-1 flex-col p-7">
                    {/* Top row: icon + number */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`relative h-14 w-14 overflow-hidden rounded-2xl ring-2 ${style.ring} shadow-elevated-sm`}
                      >
                        <Image
                          src={style.image}
                          alt={ind.title}
                          fill
                          sizes="56px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.22em] ${style.chipBg} ${style.chipText}`}
                      >
                        {num}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-on-dark">
                      {ind.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-dark/78">
                      {ind.description}
                    </p>

                    {/* Footer CTA */}
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-mid transition-colors group-hover:text-on-dark"
                      >
                        Learn more
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="h-px w-10 bg-gradient-to-r from-transparent to-primary-mid opacity-60"
                      />
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
            className="group inline-flex items-center gap-2 rounded-full border border-on-dark/25 bg-[rgba(20,28,40,0.72)] px-8 py-3 text-sm font-semibold text-on-dark shadow-[0_10px_28px_-14px_rgba(8,13,20,0.95)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-primary/55 hover:shadow-[0_16px_30px_-14px_rgba(8,13,20,0.95)]"
          >
            Industry overview
            <span
              aria-hidden
              className="grid h-5 w-5 place-items-center rounded-full bg-primary/18 text-primary-mid transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
