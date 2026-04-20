import Link from "next/link";
import { cn } from "@/lib/cn";
import type { BreadcrumbItem } from "@/lib/types/catalog";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-on-dark/72">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 ? (
                <span className="text-on-dark/45" aria-hidden>
                  /
                </span>
              ) : null}
              {last || !item.href ? (
                <span
                  className={cn(last ? "font-medium text-on-dark" : "text-on-dark/72")}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-primary-mid transition hover:text-primary hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
