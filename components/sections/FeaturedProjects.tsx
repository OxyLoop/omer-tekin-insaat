import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects.length) return null;

  return (
    <section className="section-y bg-charcoal">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Portföyümüz" title="Seçili Projeler" />
          <Button href="/projeler" variant="secondary" showArrow className="shrink-0">
            Tüm Projeleri Gör
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={index * 0.08}
              className={index === 0 || index === 3 ? "lg:col-span-2" : ""}
            >
              <ProjectCard project={project} size={index === 0 || index === 3 ? "large" : "normal"} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
