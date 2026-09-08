import Reveal from "@/components/motion/Reveal";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function QualityStatement() {
  return (
    <section className="relative overflow-hidden bg-charcoal-dark">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/engineering-quality.png"
          alt="Gün batımında inşaat sahasında vinç, iskelet halindeki bina ve mühendislik çizimleri"
          fill
          sizes="100vw"
          className="object-cover object-[75%_45%]"
          fallbackLabel="Mühendislik Görseli"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-charcoal/20" />
        <div className="absolute inset-0 bg-charcoal/25" />
      </div>

      <div className="container-site relative section-y">
        <div className="max-w-3xl">
          <Reveal>
            <span className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-stone uppercase">
              <span className="h-px w-8 bg-line-strong" />
              Mühendislik Anlayışımız
            </span>
            <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              Her detayda mühendislik,
              <br />
              her yapıda güven.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone sm:text-lg">
              Projelerimizi; planlama, malzeme kalitesi, mühendislik standartları ve
              uygulama denetimi süreçlerini bir arada değerlendirerek yürütüyoruz.
              Bu yaklaşım, teslim ettiğimiz her yapının uzun vadede güvenli ve
              işlevsel kalmasını sağlar.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
