import { cn } from "@/lib/cn";

type GlassProductsHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  tagline?: string;
  className?: string;
};

export function GlassProductsHero({
  title,
  description,
  eyebrow,
  tagline,
  className,
}: GlassProductsHeroProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute -inset-[1px] overflow-hidden rounded-[2rem] opacity-100"
        aria-hidden
      >
        <div
          className="absolute -left-[20%] -top-[40%] h-[min(28rem,85vw)] w-[min(28rem,85vw)] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(15,118,110,0.22) 0%, rgba(20,184,166,0.06) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-[15%] top-[10%] h-[min(24rem,75vw)] w-[min(24rem,75vw)] rounded-full blur-[90px] animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(91,33,182,0.16) 0%, rgba(124,58,237,0.08) 50%, transparent 72%)",
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[30%] h-[min(20rem,60vw)] w-[min(20rem,60vw)] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(159,18,57,0.1) 0%, transparent 65%)",
          }}
        />
      </div>

      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] border border-teal-200/60",
          "bg-gradient-to-br from-white via-white to-teal-50/30",
          "shadow-[0_4px_32px_-8px_rgba(15,23,42,0.08),0_2px_8px_-2px_rgba(15,23,42,0.04)]",
          "backdrop-blur-sm",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,118,110,0.05)_0%,transparent_45%,rgba(91,33,182,0.04)_100%)]"
          aria-hidden
        />
        <div className="relative px-8 py-12 md:px-14 md:py-16">
          {eyebrow ? (
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-accent-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-[3.25rem]",
              eyebrow ? "mt-3" : "",
            )}
          >
            {title}
          </h1>
          {tagline ? (
            <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-accent-deep md:text-lg">
              {tagline}
            </p>
          ) : null}
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg",
              tagline ? "mt-4" : "mt-5",
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
