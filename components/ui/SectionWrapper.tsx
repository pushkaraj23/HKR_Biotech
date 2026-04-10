import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionWrapperProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean;
};

export function SectionWrapper({ id, children, className, bleed }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28",
        bleed ? "px-0" : "px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      <div className={cn(!bleed && "mx-auto max-w-6xl")}>{children}</div>
    </section>
  );
}
