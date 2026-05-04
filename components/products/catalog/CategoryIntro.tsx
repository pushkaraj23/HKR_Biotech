import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/types/catalog";

type CategoryIntroProps = {
  category: ProductCategory;
  className?: string;
};

/** Solid fills + soft outer glow — cycles when there are more than three highlights. */
const CHARACTER_CARD_STYLES = [
  {
    surface: "#1a73e8",
    card:
      "border-white/35 text-white shadow-[0_8px_28px_-6px_rgba(13,71,161,0.55),0_0_32px_-10px_rgba(26,115,232,0.42)] hover:border-white/50 hover:shadow-[0_12px_36px_-6px_rgba(13,71,161,0.62),0_0_40px_-8px_rgba(26,115,232,0.52)]",
    sphere:
      "radial-gradient(circle at 30% 26%, #ffffff 0%, #f0f8ff 6%, #7eb8ff 32%, #1a73e8 58%, #0a3a78 100%)",
    sphereShell:
      "ring-white/45 shadow-[0_5px_16px_rgba(0,30,80,0.45),inset_0_4px_10px_rgba(255,255,255,0.55),inset_0_-10px_18px_rgba(0,25,70,0.35)]",
  },
  {
    surface: "#22a884",
    card:
      "border-white/30 text-white shadow-[0_8px_28px_-6px_rgba(8,105,78,0.5),0_0_32px_-10px_rgba(43,196,138,0.38)] hover:border-white/45 hover:shadow-[0_12px_36px_-6px_rgba(8,105,78,0.58),0_0_40px_-8px_rgba(43,196,138,0.48)]",
    sphere:
      "radial-gradient(circle at 28% 24%, #ffffff 0%, #e8fff6 8%, #7ee8c4 34%, #22a884 56%, #064d3a 100%)",
    sphereShell:
      "ring-white/40 shadow-[0_5px_16px_rgba(0,55,40,0.42),inset_0_4px_10px_rgba(255,255,255,0.5),inset_0_-10px_18px_rgba(0,45,32,0.32)]",
  },
  {
    surface: "#e8f4ef",
    card:
      "border-white/60 text-[#0d2137] shadow-[0_8px_26px_-8px_rgba(23,50,77,0.16),0_0_36px_-12px_rgba(255,255,255,0.55)] hover:border-white/80 hover:shadow-[0_12px_32px_-8px_rgba(23,50,77,0.2),0_0_44px_-10px_rgba(255,255,255,0.7)]",
    sphere:
      "radial-gradient(circle at 30% 26%, #ffffff 0%, #eef6ff 8%, #9ec5ff 30%, #1a73e8 56%, #0c3a72 100%)",
    sphereShell:
      "ring-[#17324d]/15 shadow-[0_5px_14px_rgba(23,50,77,0.22),inset_0_4px_10px_rgba(255,255,255,0.65),inset_0_-10px_16px_rgba(10,40,90,0.22)]",
  },
] as const;

/**
 * Unified intro for `/products/[category]`: one glass surface, two columns on large screens
 * (story + overview on the left, highlight “cards” on the right).
 */
export function CategoryIntro({ category, className }: CategoryIntroProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-white/35 shadow-[0_20px_48px_-18px_rgba(2,10,99,0.55)] backdrop-blur-xl",
        className,
      )}
      aria-labelledby="category-intro-heading"
    >
      {/* Soft colour wash — single surface, no horizontal seam */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "linear-gradient(135deg,",
            "color-mix(in srgb, var(--surface) 72%, #020A63 28%) 0%,",
            "color-mix(in srgb, var(--primary) 38%, #041238 62%) 42%,",
            "color-mix(in srgb, var(--surface) 58%, color-mix(in srgb, var(--accent) 22%, #020A63)) 100%)",
          ].join(" "),
        }}
        aria-hidden
      />
      {category.imageUrl ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.14] mix-blend-overlay"
            style={{ backgroundImage: `url("${category.imageUrl}")` }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(2,10,99,0.82)_0%,rgba(4,20,48,0.55)_48%,rgba(2,28,42,0.75)_100%)]"
            aria-hidden
          />
        </>
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_38%,color-mix(in_srgb,var(--accent)_12%,transparent)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[12%] -top-[20%] h-[min(22rem,75vw)] w-[min(22rem,75vw)] rounded-full blur-[90px] opacity-90"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0%, color-mix(in srgb, var(--primary) 22%, transparent) 45%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[20%] -right-[8%] h-[min(18rem,60vw)] w-[min(18rem,60vw)] rounded-full blur-[80px] opacity-80 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative grid gap-10 p-7 sm:p-9 lg:grid-cols-12 lg:gap-12 lg:p-11 xl:p-12">
        {/* Left: hierarchy + narrative */}
        <div className="flex flex-col lg:col-span-7">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-primary-mid">
            Product family
          </p>
          <h1
            id="category-intro-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-on-dark sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08]"
          >
            {category.name}
          </h1>
          <p className="mt-3 max-w-xl text-lg font-medium leading-snug text-on-dark/92 sm:text-xl">{category.tagline}</p>

          <div className="mt-8 space-y-4 border-t border-white/18 pt-8">
            <h2 id="category-overview-heading" className="sr-only">
              About {category.name}
            </h2>
            <p className="max-w-prose text-base leading-relaxed text-on-dark/88">{category.description}</p>
            <p className="max-w-prose text-[0.9375rem] leading-relaxed text-on-dark/78 sm:text-base">
              {category.overview}
            </p>
          </div>
        </div>

        {/* Right: characteristic cards */}
        <aside className="flex flex-col lg:col-span-5 lg:border-l lg:border-white/14 lg:pl-10 xl:pl-12">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-on-dark/65">
            Family characteristics
          </p>
          <p className="mt-1 text-sm text-on-dark/72">What procurement and R&D teams typically verify first.</p>
          <ul className="mt-5 flex flex-col gap-3">
            {category.highlights.map((h, i) => {
              const s = CHARACTER_CARD_STYLES[i % CHARACTER_CARD_STYLES.length];
              return (
                <li
                  key={h}
                  style={{ backgroundColor: s.surface }}
                  className={cn(
                    "rounded-2xl border px-4 py-3.5 transition-shadow duration-300",
                    s.card,
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "h-9 w-9 shrink-0 rounded-full ring-2 sm:h-10 sm:w-10",
                        s.sphereShell,
                      )}
                      style={{ background: s.sphere }}
                      aria-hidden
                    />
                    <span className="min-w-0 text-sm font-semibold leading-snug">{h}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </article>
  );
}
