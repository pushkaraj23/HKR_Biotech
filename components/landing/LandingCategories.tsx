import Image from "next/image";
import Link from "next/link";
import { productCategories } from "@/data/catalog";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const FEATURED_STYLES = [
  {
    bg: "linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(124,58,237,0.12) 50%, rgba(91,33,182,0.15) 100%)",
    hoverBorder: "hover:border-teal-500/30",
    image:
      "https://images.unsplash.com/photo-1694230155228-cdde50083573?w=800&h=500&fit=crop&q=80&auto=format",
  },
  {
    bg: "linear-gradient(135deg, rgba(91,33,182,0.15) 0%, rgba(159,18,57,0.12) 50%, rgba(190,24,93,0.12) 100%)",
    hoverBorder: "hover:border-violet-500/30",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop&q=80&auto=format",
  },
] as const;

const PILL_COLORS = [
  "border-teal-500/25 bg-teal-500/10 text-teal-300 hover:bg-teal-500/20 hover:border-teal-500/40",
  "border-violet-500/25 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/40",
  "border-rose-500/25 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/40",
] as const;

export function LandingCategories() {
  const featured = productCategories.slice(0, 2);
  const rest = productCategories.slice(2);

  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-400">
                Catalogue
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                Product Families
              </h2>
              <p className="mt-3 max-w-lg text-base text-slate-400">
                Carbohydrates, impurities, linkers, intermediates, and more — each
                with full listings and analytical documentation.
              </p>
            </div>
            <Link
              href="/products"
              className="shrink-0 rounded-full border border-white/[0.1] bg-white/[0.06] px-7 py-2.5 text-sm font-semibold text-slate-200 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:shadow-[0_8px_28px_-8px_rgba(15,118,110,0.15)]"
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
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_56px_-16px_rgba(0,0,0,0.3)] ${style.hoverBorder}`}
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
                          "linear-gradient(to top, rgba(7,14,27,0.85) 0%, rgba(7,14,27,0.3) 40%, transparent 100%)",
                      }}
                    />
                  </div>

                  <div className="p-8 pt-4 sm:p-10 sm:pt-5">
                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {cat.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
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
