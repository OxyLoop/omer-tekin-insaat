import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { getAboutPage } from "@/lib/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAboutPage();
  return {
    title: seo.title || "Hakkımızda",
    description:
      seo.description ||
      "Ömer Tekin Mühendislik ve İnşaat'ın yaklaşımı, mühendislik disiplini ve kurumsal değerleri hakkında bilgi edinin.",
    openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
  };
}

export default async function HakkimizdaPage() {
  const page = await getAboutPage();

  return (
    <div>
      <section className="border-b border-line bg-charcoal-dark pt-36 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-site">
          <span className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            <span className="h-px w-8 bg-line-strong" />
            Kurumsal
          </span>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {page.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {page.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Yaklaşımımız" title={page.philosophyHeading} />
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted sm:text-lg">
              {page.philosophyBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative aspect-4/5 w-full overflow-hidden border border-line lg:aspect-auto lg:h-full">
              <ImageWithFallback
                src={page.philosophyImage}
                alt="Ömer Tekin Mühendislik ve İnşaat logolu baret, inşaat sahasında proje çizimleriyle birlikte"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[55%_65%]"
                fallbackLabel="Kurumsal Görsel"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {page.stats.show && page.stats.items.length > 0 && (
        <section className="border-t border-y border-line bg-charcoal-dark">
          <div className="container-site">
            <div className="grid grid-cols-1 divide-y divide-line border-x border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {page.stats.items.map((stat, index) => (
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
      )}

      <section className="section-y">
        <div className="container-site">
          <Reveal>
            <div className="flex flex-col gap-6 border border-line p-8 sm:flex-row sm:items-start sm:gap-10 sm:p-10">
              <div className="shrink-0">
                <span className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
                  Yetkili Mühendis
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-offwhite">
                  {page.founder.name}
                </h3>
                <p className="mt-1 text-sm text-stone">{page.founder.title}</p>
                <p className="mt-1 text-sm text-muted">{page.founder.education}</p>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {page.founder.bio}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal>
            <SectionHeading eyebrow="Mühendislik" title={page.engineeringHeading} className="max-w-3xl" />
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {page.engineeringBody}
            </p>
          </Reveal>
        </div>
      </section>

      {page.values.length > 0 && (
        <section className="section-y border-t border-line bg-charcoal-dark">
          <div className="container-site">
            <SectionHeading eyebrow="Değerlerimiz" title="Bizi Tanımlayan İlkeler" align="center" className="mx-auto" />
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {page.values.map((value, index) => (
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
      )}
    </div>
  );
}
