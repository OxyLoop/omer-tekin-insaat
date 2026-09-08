import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="section-y bg-charcoal">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 border border-line px-8 py-14 sm:px-12 sm:py-16 lg:flex-row lg:items-center lg:gap-16">
            <div className="max-w-xl">
              <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl">
                Yeni projenizi birlikte hayata geçirelim.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                Projeniz hakkında konuşmak ve ihtiyaçlarınıza uygun çözümleri
                değerlendirmek için bizimle iletişime geçin.
              </p>
            </div>
            <Button href="/iletisim" variant="primary" showArrow className="shrink-0">
              İletişime Geçin
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
