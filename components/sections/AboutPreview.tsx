import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { companyIntro } from "@/data/company";

export default function AboutPreview() {
  return (
    <section className="section-y bg-charcoal">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <span className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            <span className="h-px w-8 bg-line-strong" />
            {companyIntro.eyebrow}
          </span>
          <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.6rem]">
            {companyIntro.heading}
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted sm:text-lg">
            {companyIntro.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/hakkimizda"
            className="group mt-8 inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm font-medium tracking-wide text-offwhite transition-colors hover:border-offwhite"
          >
            Hakkımızda
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-4/5 w-full overflow-hidden border border-line lg:aspect-auto lg:h-full">
            <ImageWithFallback
              src="/images/about.jpg"
              alt="Ömer Tekin Mühendislik ve İnşaat ekibi saha çalışmasında"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              fallbackLabel="Kurumsal Görsel"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
