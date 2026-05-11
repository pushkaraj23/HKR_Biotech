import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Small label above the heading, e.g. "01 / Capabilities" */
  eyebrow: string;
  /** Main heading text; pass JSX to highlight parts */
  heading: ReactNode;
  /** Optional description under the heading */
  description?: ReactNode;
  /** Optional trailing content (e.g. a link) on desktop */
  action?: ReactNode;
  /** Text alignment */
  align?: "left" | "center";
  /** Max width for the heading block */
  maxWidth?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  description,
  action,
  align = "left",
  maxWidth = "max-w-3xl",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-3 ${action ? "lg:flex-row lg:items-end lg:justify-between" : ""}`}>
      <div className={`flex flex-col ${alignClass}`}>
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-deep" />
          </span>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary/90">{eyebrow}</p>
        </div>

        <h2
          className={`mt-2 font-display text-[2.25rem] font-extrabold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.05] ${maxWidth}`}
        >
          {heading}
        </h2>

        <span
          aria-hidden
          className={`mt-3 block h-0.5 w-14 rounded-full ${align === "center" ? "mx-auto" : ""}`}
          style={{
            background: "linear-gradient(90deg, var(--primary-deep) 0%, var(--accent) 100%)",
          }}
        />

        {description && (
          <p className={`mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem] ${maxWidth}`}>
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}
