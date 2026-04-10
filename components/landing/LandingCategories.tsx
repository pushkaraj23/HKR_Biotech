import Link from "next/link";
import { productCategories } from "@/data/product-categories";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function LandingCategories() {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-sky-700/90">
                Catalogue
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Three product families
              </h2>
              <p className="mt-3 max-w-lg text-slate-600">
                Each opens a dedicated overview with full listings — pick a lane and go deep.
              </p>
            </div>
            <Link
              href="/products"
              className="shrink-0 rounded-full border border-slate-200/90 bg-white/70 px-5 py-2.5 text-sm font-semibold text-sky-800 shadow-sm backdrop-blur-sm transition hover:border-sky-300/80 hover:bg-sky-50"
            >
              Full catalogue →
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {productCategories.map((cat, i) => (
            <RevealOnScroll key={cat.slug} delay={i * 70}>
              <Link
                href={`/products/${cat.slug}`}
                className="group relative block h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/50 p-7 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-sky-300/50 hover:shadow-[0_20px_50px_-24px_rgba(14,165,233,0.35)]"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition-opacity group-hover:opacity-100 opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)",
                  }}
                  aria-hidden
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-slate-900 group-hover:text-sky-900">
                  {cat.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{cat.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                  Open category
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
