import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/data/catalog";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const FEATURED_STYLES = [
  {
    bg: "linear-gradient(135deg, rgba(255,177,98,0.18) 0%, rgba(201,193,177,0.14) 50%, rgba(238,233,223,0.95) 100%)",
    hoverBorder: "hover:border-primary/35",
    image:
      "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=800&h=500&fit=crop&q=80&auto=format",
  },
  {
    bg: "linear-gradient(135deg, rgba(44,59,77,0.12) 0%, rgba(155,168,183,0.12) 50%, rgba(238,233,223,0.95) 100%)",
    hoverBorder: "hover:border-secondary/35",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop&q=80&auto=format",
  },
] as const;

const PILL_COLORS = [
  "border-primary/30 bg-primary/12 text-primary-deep hover:bg-primary/18 hover:border-primary/45",
  "border-secondary/25 bg-secondary/10 text-secondary hover:bg-secondary/16 hover:border-secondary/40",
  "border-danger/28 bg-danger/10 text-danger hover:bg-danger/16 hover:border-danger/40",
] as const;

export async function LandingCategories() {
  const productCategories = await getAllCategories();
  const featured = productCategories.slice(0, 2);
  const rest = productCategories.slice(2);

  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
                Catalogue
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Product Families
              </h2>
              <p className="mt-3 max-w-lg text-base text-muted-foreground">
                Carbohydrates, impurities, linkers, intermediates, and more — each
                with full listings and analytical documentation.
              </p>
            </div>
            <Link
              href="/products"
              className="shrink-0 rounded-full border border-border-strong/50 bg-card/95 px-7 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition-all hover:border-primary/35 hover:shadow-md"
            >
              Full catalogue →
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((cat, i) => {
            const style = FEATURED_STYLES[i];
            return (
              <RevealOnScroll key={cat.slug} delay={i * 100}>
                <Link
                  href={`/products/${cat.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border border-border-strong/45 bg-card/40 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${style.hoverBorder}`}
                  style={{ background: style.bg }}
                >
                  <div className="relative h-44 w-full overflow-hidden sm:h-52">
                    <Image
                      src={style.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(27,38,50,0.82) 0%, rgba(27,38,50,0.28) 40%, transparent 100%)",
                      }}
                    />
                  </div>

                  <div className="p-8 pt-4 sm:p-10 sm:pt-5">
                    <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {cat.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-deep">
                      Explore category
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll delay={220}>
          <div className="mt-6 flex flex-wrap gap-3">
            {rest.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className={`group rounded-full border px-5 py-3 text-sm font-medium shadow-[0_2px_12px_-4px_rgba(0,0,0,0.2)] backdrop-blur-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)] ${PILL_COLORS[i % PILL_COLORS.length]}`}
              >
                {cat.name}
                <span className="ml-2 text-xs opacity-60 transition-transform group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
