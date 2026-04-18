import { cn } from "@/lib/cn";

type PageBannerProps = {
  title: string;
  description?: string;
  className?: string;
};

export function PageBanner({ title, description, className }: PageBannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-14 shadow-elevated-sm backdrop-blur-sm md:px-14 md:py-16",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "var(--banner-glow)" }}
      />
      <div className="relative max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
