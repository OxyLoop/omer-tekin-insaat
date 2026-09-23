import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceListItem from "./ServiceListItem";
import type { Service } from "@/types";

interface ServicesPreviewProps {
  services: Service[];
}

export default function ServicesPreview({ services }: ServicesPreviewProps) {
  const preview = services.slice(0, 6);

  if (!preview.length) return null;

  return (
    <section className="section-y bg-charcoal">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Neler Yapıyoruz" title="Hizmetlerimiz" />
          <Button href="/hizmetler" variant="secondary" showArrow className="shrink-0">
            Tüm Hizmetler
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.06}>
              <ServiceListItem service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
