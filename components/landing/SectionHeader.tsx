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

/**
 * Shared section header: mono eyebrow with accent dot, display heading
 * with an animated gradient underline, optional description, optional
 * inline action on the right (desktop).
 */
export function SectionHeader({
  eyebrow,
  heading,
  description,
  action,
  align = "left",
  maxWidth = "max-w-2xl",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div
      className={`flex flex-col gap-4 ${action ? "lg:flex-row lg:items-end lg:justify-between" : ""}`}
    >
      <div className={`flex flex-col ${alignClass}`}>
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-deep" />
          </span>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-secondary">
            {eyebrow}
          </p>
        </div>

        <h2
          className={`mt-3 font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem] ${maxWidth}`}
        >
          {heading}
        </h2>

        <span
          aria-hidden
          className={`mt-4 block h-[3px] w-16 rounded-full ${
            align === "center" ? "mx-auto" : ""
          }`}
          style={{
            background:
              "linear-gradient(90deg, var(--primary-deep) 0%, var(--primary) 55%, var(--primary-mid) 100%)",
          }}
        />

        {description && (
          <p
            className={`mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg ${maxWidth}`}
          >
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}
