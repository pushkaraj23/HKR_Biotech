import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/types";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className={cn("group block", className)}>
      <GlassCard className="h-full">
        <h3 className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
        <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
          {service.benefits.slice(0, 3).map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-mid/80" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex text-sm font-medium text-primary">
          View service →
        </span>
      </GlassCard>
    </Link>
  );
}
