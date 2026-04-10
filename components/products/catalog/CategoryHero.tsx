import { cn } from "@/lib/cn";
import type { ProductCategory } from "@/lib/types/catalog";

type CategoryHeroProps = {
  category: ProductCategory;
  className?: string;
};

export function CategoryHero({ category, className }: CategoryHeroProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute -inset-[1px] overflow-hidden rounded-[2rem] opacity-100"
        aria-hidden
      >
        <div
          className="absolute -left-[18%] -top-[35%] h-[min(26rem,80vw)] w-[min(26rem,80vw)] rounded-full blur-[96px]"
          style={{
            background:
              "radial-gradient(circle, rgba(15,118,110,0.2) 0%, rgba(20,184,166,0.06) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-[12%] top-[5%] h-[min(22rem,70vw)] w-[min(22rem,70vw)] rounded-full blur-[88px] animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(91,33,182,0.14) 0%, rgba(124,58,237,0.06) 50%, transparent 72%)",
          }}
        />
      </div>

      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] border border-teal-200/60",
          "bg-gradient-to-br from-white via-white to-teal-50/25",
          "shadow-[0_4px_32px_-8px_rgba(15,23,42,0.08)] backdrop-blur-sm",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,118,110,0.05)_0%,transparent_42%,rgba(91,33,182,0.035)_100%)]"
          aria-hidden
        />
        <div className="relative px-8 py-12 md:px-14 md:py-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-teal-800">
            Product family
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-medium leading-relaxed text-teal-900/90">
            {category.tagline}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg">
            {category.description}
          </p>
        </div>
      </div>
    </div>
  );
}
