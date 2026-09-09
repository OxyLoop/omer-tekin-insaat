import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import QualityStatement from "@/components/sections/QualityStatement";
import CTASection from "@/components/sections/CTASection";
import ContactPreview from "@/components/sections/ContactPreview";

// NOT: İstatistik bölümü (tamamlanan proje sayısı, deneyim yılı vb.) gerçek
// rakamlar netleşene kadar kaldırılmıştır. Bkz. data/stats.ts — veri yapısı
// korunmuştur, gerçek değerler girilince <Stats /> bileşeni tekrar eklenebilir.
export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedProjects />
      <QualityStatement />
      <CTASection />
      <ContactPreview />
    </>
  );
}
