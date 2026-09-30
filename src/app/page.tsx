import Hero from "@/components/sections/Hero";
import AboutIntro from "@/components/sections/AboutIntro";
import SectorsSection from "@/components/sections/SectorsSection";
import LeadershipStrip from "@/components/sections/LeadershipStrip";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProcessSection from "@/components/sections/ProcessSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import EliteSection from "@/components/sections/EliteSection";
import WhySection from "@/components/sections/WhySection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <SectorsSection />
      <LeadershipStrip />
      <ServicesGrid />
      <FeaturedProjects />
      <ProcessSection />
      <EliteSection />
      <WhySection />
      <CTASection />
    </>
  );
}
