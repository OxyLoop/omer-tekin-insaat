import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import ServiceListItem from "@/components/sections/ServiceListItem";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim proje ve tadilat & renovasyon hizmetlerimiz.",
};

export default function HizmetlerPage() {
  return (
    <div>
      <section className="border-b border-line bg-charcoal-dark pt-36 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-site">
          <span className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            <span className="h-px w-8 bg-line-strong" />
            Neler Yapıyoruz
          </span>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Hizmetlerimiz
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim
            proje ve tadilat alanlarında sunduğumuz hizmetler.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 4) * 0.06}>
              <ServiceListItem service={service} description="long" />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
