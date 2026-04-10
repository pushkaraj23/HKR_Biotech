import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { PageBanner } from "@/components/ui/PageBanner";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PageAmbientGraphics } from "@/components/ui/PageAmbientGraphics";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom synthesis, contract research, analytical services, impurity profiling, and method development at HKR Biotech Labs.",
};

export default function ServicesPage() {
  return (
    <div className="relative overflow-x-hidden px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <PageAmbientGraphics variant="right" />
      <div className="relative z-10 mx-auto max-w-6xl space-y-14">
        <PageBanner
          title="Services"
          description="Composable scientific services — from exploratory FTE blocks to filing-ready analytical packages — unified under one project team."
        />
        <SectionWrapper className="py-0">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
