import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import Stats from "@/components/sections/Stats";
import ServicesPreview from "@/components/sections/ServicesPreview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import QualityStatement from "@/components/sections/QualityStatement";
import CTASection from "@/components/sections/CTASection";
import ContactPreview from "@/components/sections/ContactPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Stats />
      <ServicesPreview />
      <FeaturedProjects />
      <QualityStatement />
      <CTASection />
      <ContactPreview />
    </>
  );
}
