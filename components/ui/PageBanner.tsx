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
        "relative overflow-hidden rounded-3xl border border-border-subtle bg-surface-glass-strong px-8 py-14 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] backdrop-blur-sm md:px-14 md:py-16",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
