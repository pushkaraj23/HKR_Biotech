import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/data/catalog";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { LANDING_CONTAINER, LANDING_SECTION } from "@/components/landing/landingSection";

const FEATURED_STYLES = [
  {
    tag: "Flagship",
    border: "border-primary/25 hover:border-primary/50",
    stripe: "from-primary via-primary-mid to-tint-primary",
    tagClass: "bg-primary text-on-dark",
    linkColor: "text-on-dark/88",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--surface) 84%, var(--primary) 16%) 0%, color-mix(in srgb, var(--primary) 76%, var(--surface) 24%) 52%, color-mix(in srgb, var(--primary-mid) 68%, var(--surface) 32%) 100%)",
    title: "text-on-dark",
    body: "text-on-dark/78",
    image:
      "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=900&h=600&fit=crop&q=80&auto=format",
  },
  {
    tag: "Greenline",
    border: "border-accent/28 hover:border-accent/52",
    stripe: "from-accent via-[#7AE38D] to-tint-accent",
    tagClass: "bg-white/78 text-foreground",
    linkColor: "text-foreground/78",
    cardBg:
      "linear-gradient(155deg, color-mix(in srgb, var(--accent) 76%, white 24%) 0%, color-mix(in srgb, var(--accent) 64%, var(--primary-mid) 36%) 52%, color-mix(in srgb, var(--accent) 72%, var(--light) 28%) 100%)",
    title: "text-foreground",
    body: "text-foreground/82",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&h=600&fit=crop&q=80&auto=format",
  },
] as const;

const PILL_STYLES = [
  "border-primary/42 bg-primary/16 text-on-dark hover:bg-primary/22 hover:border-primary/60",
  "border-accent/45 bg-[color-mix(in_srgb,var(--primary)_74%,var(--accent)_26%)] text-on-dark hover:bg-[color-mix(in_srgb,var(--primary)_64%,var(--accent)_36%)] hover:border-accent/62",
  "border-white/60 bg-white/84 text-foreground hover:bg-white hover:border-primary/35",
] as const;

export async function LandingCategories() {
  const productCategories = await getAllCategories();
  const featured = productCategories.slice(0, 2);
  const rest = productCategories.slice(2);

  return (
    <section className={LANDING_SECTION}>
      <div className={LANDING_CONTAINER}>
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/45 bg-[color-mix(in_srgb,var(--light)_82%,var(--primary)_18%)] px-6 py-8 shadow-[0_16px_42px_-14px_rgba(18,50,90,0.3)] backdrop-blur-md sm:px-10"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--light) 86%, var(--primary) 14%) 0%, color-mix(in srgb, var(--light) 74%, var(--primary-mid) 26%) 45%, color-mix(in srgb, var(--light) 78%, var(--accent) 22%) 100%)",
            }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/70">Catalogue</p>
                <h2 className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  Product <span className="text-primary-deep">families</span>
                </h2>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl">
                  Browse in-stock and custom compounds by family — with specs, CAS, and enquiry-ready documentation.
                </p>
              </div>
              <Link
                href="/products"
                className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-primary/30 bg-white/80 px-6 py-3 text-sm font-semibold text-foreground shadow-elevated-sm transition-all hover:-translate-y-0.5 hover:border-primary/55 hover:bg-white hover:shadow-elevated-md lg:self-end"
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-12 sm:gap-7">
          {featured.map((cat, i) => {
            const style = FEATURED_STYLES[i];
            return (
              <RevealOnScroll key={cat.slug} delay={i * 120}>
                <Link
                  href={`/products/${cat.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[2rem] border shadow-[0_14px_36px_-14px_rgba(18,50,90,0.55)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_-14px_rgba(18,50,90,0.68)] ${style.border}`}
                  style={{ background: style.cardBg }}
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
                    <h3 className={`font-display text-2xl font-extrabold tracking-tight ${style.title} sm:text-3xl`}>
                      {cat.name}
                    </h3>
                    <p className={`mt-2 line-clamp-2 text-sm leading-snug ${style.body}`}>
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
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-current/85">
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
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-on-dark/65">
                More
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
                      className="ml-2 text-xs opacity-85 transition-transform group-hover:translate-x-0.5"
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
