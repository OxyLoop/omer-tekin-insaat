import type { Metadata } from "next";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description: "Tamamlanan ve devam eden projelerimizi keşfedin.",
};

export default function ProjelerPage() {
  return (
    <div>
      <section className="border-b border-line bg-charcoal-dark pt-36 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-site">
          <span className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            <span className="h-px w-8 bg-line-strong" />
            Portföyümüz
          </span>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Projelerimiz
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Tamamlanan ve devam eden projelerimizi keşfedin.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <ProjectsExplorer projects={projects} />
        </div>
      </section>
    </div>
  );
}
