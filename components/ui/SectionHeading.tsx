import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl md:mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/90">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
