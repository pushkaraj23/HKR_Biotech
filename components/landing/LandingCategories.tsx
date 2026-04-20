import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/data/catalog";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const FEATURED_STYLES = [
  {
    tag: "Flagship",
    border: "border-primary/25 hover:border-primary/50",
    stripe: "from-primary via-primary-mid to-tint-primary",
    tagClass: "bg-primary text-primary-foreground",
    linkColor: "text-primary-mid",
    image:
      "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=900&h=600&fit=crop&q=80&auto=format",
  },
  {
    tag: "Signature",
    border: "border-secondary/22 hover:border-secondary/45",
    stripe: "from-secondary via-accent to-tint-accent",
    tagClass: "bg-secondary text-secondary-foreground",
    linkColor: "text-on-dark/90",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&h=600&fit=crop&q=80&auto=format",
  },
] as const;

const PILL_STYLES = [
  "border-primary/40 bg-primary/16 text-on-dark hover:bg-primary/22 hover:border-primary/60",
  "border-secondary/35 bg-secondary/15 text-on-dark hover:bg-secondary/22 hover:border-secondary/55",
  "border-danger/35 bg-danger/15 text-on-dark hover:bg-danger/22 hover:border-danger/55",
] as const;

export async function LandingCategories() {
  const productCategories = await getAllCategories();
  const featured = productCategories.slice(0, 2);
  const rest = productCategories.slice(2);

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
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-on-dark/25 bg-on-dark/[0.08] px-4 py-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-on-dark">
                    01 / Catalogue
                  </span>
                </div>
                <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">
                  Product <span className="text-primary-mid">Families</span>
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-dark/90 sm:text-lg">
                  Carbohydrates, impurities, linkers, intermediates, and more — each with full
                  listings and analytical documentation.
                </p>
              </div>
              <Link
                href="/products"
                className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-on-dark/35 bg-[rgba(18,25,35,0.45)] px-6 py-3 text-sm font-semibold text-on-dark shadow-elevated-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-[rgba(18,25,35,0.62)] hover:shadow-elevated-md lg:self-end"
              >
                Full catalogue
                <span
                  aria-hidden
                  className="grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary-mid transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </RevealOnScroll>

        {/* Featured categories */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-7">
          {featured.map((cat, i) => {
            const style = FEATURED_STYLES[i];
            return (
              <RevealOnScroll key={cat.slug} delay={i * 120}>
                <Link
                  href={`/products/${cat.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[2rem] border bg-[rgba(18,25,35,0.74)] shadow-[0_14px_36px_-14px_rgba(8,13,20,0.8)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_-14px_rgba(8,13,20,0.9)] ${style.border}`}
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(18,25,35,0.82) 0%, rgba(26,36,50,0.74) 52%, rgba(38,52,70,0.68) 100%)",
                  }}
                >
                  {/* Top gradient stripe */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${style.stripe}`} />

                  {/* Image with corner tag */}
                  <div className="relative h-48 w-full overflow-hidden sm:h-56">
                    <Image
                      src={style.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(27,38,50,0.8) 0%, rgba(27,38,50,0.24) 45%, transparent 100%)",
                      }}
                    />
                    {/* Tag */}
                    <span
                      className={`absolute left-5 top-5 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] shadow-elevated-sm ${style.tagClass}`}
                    >
                      {style.tag}
                    </span>
                  </div>

                  <div className="p-8 pt-6 sm:p-10 sm:pt-7">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-on-dark sm:text-[1.65rem]">
                      {cat.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-on-dark/78">
                      {cat.tagline}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-on-dark/15 pt-5">
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-semibold ${style.linkColor}`}
                      >
                        Explore category
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-on-dark/55">
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Sub-category pills */}
        {rest.length > 0 && (
          <RevealOnScroll delay={250}>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-on-dark/65">
                Also available
              </span>
              <div className="flex flex-wrap gap-2.5">
                {rest.map((cat, i) => (
                  <Link
                    key={cat.slug}
                    href={`/products/${cat.slug}`}
                    className={`group rounded-full border px-5 py-2.5 text-sm font-medium shadow-elevated-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated-md ${PILL_STYLES[i % PILL_STYLES.length]}`}
                  >
                    {cat.name}
                    <span
                      className="ml-2 text-xs opacity-55 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
