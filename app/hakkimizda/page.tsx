import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { aboutPage, companyValues } from "@/data/company";
import { aboutStats } from "@/data/stats";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Ömer Tekin Mühendislik ve İnşaat'ın yaklaşımı, mühendislik disiplini ve kurumsal değerleri hakkında bilgi edinin.",
};

export default function HakkimizdaPage() {
  return (
    <div>
      <section className="border-b border-line bg-charcoal-dark pt-36 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-site">
          <span className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            <span className="h-px w-8 bg-line-strong" />
            Kurumsal
          </span>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {aboutPage.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {aboutPage.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Yaklaşımımız" title={aboutPage.philosophyHeading} />
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted sm:text-lg">
              {aboutPage.philosophyBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative aspect-4/5 w-full overflow-hidden border border-line lg:aspect-auto lg:h-full">
              <ImageWithFallback
                src="/images/about.jpg"
                alt="Ömer Tekin Mühendislik ve İnşaat saha ekibi"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                fallbackLabel="Kurumsal Görsel"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-y border-line bg-charcoal-dark">
        <div className="container-site">
          <div className="grid grid-cols-1 divide-y divide-line border-x border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {aboutStats.map((stat, index) => (
              <Reveal key={stat.id} delay={index * 0.08} className="px-8 py-12 text-center">
                <p className="text-4xl font-semibold tracking-tight text-offwhite sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs tracking-[0.15em] text-muted uppercase sm:text-sm">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal>
            <SectionHeading eyebrow="Mühendislik" title={aboutPage.engineeringHeading} className="max-w-3xl" />
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {aboutPage.engineeringBody}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y border-t border-line bg-charcoal-dark">
        <div className="container-site">
          <SectionHeading eyebrow="Değerlerimiz" title="Bizi Tanımlayan İlkeler" align="center" className="mx-auto" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {companyValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06} className="border border-line p-7">
                <h3 className="text-lg font-semibold tracking-tight text-offwhite">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
