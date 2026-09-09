import Reveal from "@/components/motion/Reveal";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function QualityStatement() {
  return (
    <section className="relative overflow-hidden bg-ink-strong">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/engineering-quality.png"
          alt="Gün batımında inşaat sahasında vinç, iskelet halindeki bina ve mühendislik çizimleri"
          fill
          sizes="100vw"
          className="object-cover object-[75%_45%]"
          fallbackLabel="Mühendislik Görseli"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      <div className="container-site relative section-y">
        <div className="max-w-3xl">
          <Reveal>
            <span className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-on-ink-soft uppercase">
              <span className="h-px w-8 bg-ink-line-strong" />
              Mühendislik Anlayışımız
            </span>
            <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-on-ink sm:text-4xl lg:text-[2.75rem]">
              Her detayda mühendislik,
              <br />
              her yapıda güven.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-on-ink-soft sm:text-lg">
              Projelerimizi planlama, teknik gereklilikler ve uygulama
              kalitesini birlikte değerlendirerek ele alıyoruz. Amacımız
              yalnızca yapı üretmek değil, güvenli ve uzun ömürlü yaşam
              alanları ortaya koymaktır.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
