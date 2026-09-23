import Reveal from "@/components/motion/Reveal";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { QualityStatementContent } from "@/lib/sanity/content";

interface QualityStatementProps {
  content: QualityStatementContent;
}

export default function QualityStatement({ content }: QualityStatementProps) {
  const headingLines = content.heading.split("\n").filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-ink-strong">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={content.image}
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
              {content.eyebrow}
            </span>
            <h2 className="text-3xl leading-[1.15] font-semibold tracking-tight text-balance text-on-ink sm:text-4xl lg:text-[2.75rem]">
              {headingLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-on-ink-soft sm:text-lg">
              {content.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
