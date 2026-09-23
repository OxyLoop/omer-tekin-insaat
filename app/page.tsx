import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import Stats from "@/components/sections/Stats";
import ServicesPreview from "@/components/sections/ServicesPreview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import QualityStatement from "@/components/sections/QualityStatement";
import CTASection from "@/components/sections/CTASection";
import ContactPreview from "@/components/sections/ContactPreview";
import { getFeaturedProjects, getHomePage, getServices, getSiteSettings } from "@/lib/sanity/content";

export default async function Home() {
  const [homePage, services, featuredProjects, settings] = await Promise.all([
    getHomePage(),
    getServices(),
    getFeaturedProjects(4),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero content={homePage.hero} />
      <AboutPreview content={homePage.aboutSummary} />
      {homePage.stats.show && <Stats stats={homePage.stats.items} />}
      <ServicesPreview services={services} />
      <FeaturedProjects projects={featuredProjects} />
      <QualityStatement content={homePage.quality} />
      <CTASection content={homePage.cta} />
      <ContactPreview contact={settings.contact} />
    </>
  );
}
