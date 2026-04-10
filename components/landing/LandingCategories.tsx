import Link from "next/link";
import { productCategories } from "@/data/catalog";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const FEATURED_GRADIENTS = [
  {
    bg: "linear-gradient(135deg, rgba(153,246,228,0.55) 0%, rgba(167,139,250,0.45) 50%, rgba(196,181,253,0.5) 100%)",
    orb: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(20,184,166,0.55) 55%, rgba(91,33,182,0.3))",
    orbShadow: "0 8px 28px -4px rgba(20,184,166,0.4)",
    hoverBorder: "hover:border-teal-300/70",
  },
  {
    bg: "linear-gradient(135deg, rgba(196,181,253,0.5) 0%, rgba(253,164,175,0.4) 50%, rgba(252,205,211,0.45) 100%)",
    orb: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(124,58,237,0.55) 55%, rgba(159,18,57,0.3))",
    orbShadow: "0 8px 28px -4px rgba(91,33,182,0.35)",
    hoverBorder: "hover:border-violet-300/70",
  },
] as const;

const PILL_COLORS = [
  "border-teal-200/80 bg-teal-50/60 text-teal-900 hover:bg-teal-100/80 hover:border-teal-300/60",
  "border-violet-200/80 bg-violet-50/60 text-violet-900 hover:bg-violet-100/80 hover:border-violet-300/60",
  "border-rose-200/80 bg-rose-50/60 text-rose-900 hover:bg-rose-100/80 hover:border-rose-300/60",
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
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-700">
                Catalogue
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Product Families
              </h2>
              <p className="mt-3 max-w-lg text-base text-slate-600">
                Carbohydrates, impurities, linkers, intermediates, and more — each
                with full listings and analytical documentation.
              </p>
            </div>
            <Link
              href="/products"
              className="shrink-0 rounded-full border border-white/60 bg-white/70 px-7 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all hover:shadow-[0_8px_28px_-8px_rgba(15,118,110,0.15)]"
            >
              Full catalogue →
            </Link>
          </div>
        </RevealOnScroll>

        {/* Two featured gradient cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((cat, i) => {
            const style = FEATURED_GRADIENTS[i];
            return (
              <RevealOnScroll key={cat.slug} delay={i * 100}>
                <Link
                  href={`/products/${cat.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border border-white/50 p-8 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_56px_-16px_rgba(15,23,42,0.16)] sm:p-10 ${style.hoverBorder}`}
                  style={{ background: style.bg }}
                >
                  {/* Floating orb */}
                  <div
                    className="mb-6 h-14 w-14 rounded-full"
                    style={{
                      background: style.orb,
                      boxShadow: `${style.orbShadow}, inset 0 -2px 6px rgba(0,0,0,0.06)`,
                    }}
                  />
                  <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                    {cat.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {cat.tagline}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                    Explore category
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Remaining categories as pills */}
        <RevealOnScroll delay={220}>
          <div className="mt-6 flex flex-wrap gap-3">
            {rest.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className={`group rounded-full border px-5 py-3 text-sm font-medium shadow-[0_2px_12px_-4px_rgba(15,23,42,0.06)] backdrop-blur-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.1)] ${PILL_COLORS[i % PILL_COLORS.length]}`}
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
