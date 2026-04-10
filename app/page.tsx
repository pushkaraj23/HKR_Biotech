import { LandingBento } from "@/components/landing/LandingBento";
import { LandingCategories } from "@/components/landing/LandingCategories";
import { LandingFinale } from "@/components/landing/LandingFinale";
import { HomeAmbientMolecules } from "@/components/landing/HomeAmbientMolecules";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingIndustries } from "@/components/landing/LandingIndustries";
import { LandingLabStory } from "@/components/landing/LandingLabStory";
import { LandingWhy } from "@/components/landing/LandingWhy";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden">
      <HomeAmbientMolecules />
      <div className="relative z-10">
        <LandingHero />
        <LandingWhy />
        <LandingCategories />
        <LandingBento />
        <LandingIndustries />
        <LandingLabStory />
        <LandingFinale />
      </div>
    </div>
  );
}
