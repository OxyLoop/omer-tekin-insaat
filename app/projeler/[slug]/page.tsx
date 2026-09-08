import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ProjectGallery from "@/components/projects/ProjectGallery";
import Reveal from "@/components/motion/Reveal";
import { getProjectBySlug, projects } from "@/data/projects";
import { statusLabels } from "@/lib/project-status";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const infoItems = [
    { label: "Konum", value: project.location },
    { label: "Yıl", value: project.year },
    { label: "Proje Türü", value: project.category },
    { label: "Durum", value: statusLabels[project.status] },
    ...(project.area ? [{ label: "Alan", value: project.area }] : []),
    ...(project.client ? [{ label: "Müşteri", value: project.client }] : []),
  ];

  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-charcoal-dark pt-32">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={project.coverImage}
            alt={`${project.name} kapak görseli`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            fallbackLabel="Proje Görseli"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/10" />
        </div>

        <div className="container-site relative z-10 pb-12 sm:pb-16">
          <Link
            href="/projeler"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone transition-colors hover:text-offwhite"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tüm Projeler
          </Link>
          <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {project.name}
          </h1>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
          <Reveal>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border border-line p-8 sm:grid-cols-1 sm:p-10 lg:sticky lg:top-32">
              {infoItems.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs tracking-[0.15em] text-muted uppercase">{item.label}</dt>
                  <dd className="mt-2 text-lg text-offwhite">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted sm:text-xl">
              {project.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line pb-20 sm:pb-28">
        <div className="container-site pt-16 sm:pt-20">
          <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl">
            Proje Galerisi
          </h2>
          <ProjectGallery images={project.images} projectName={project.name} />
        </div>
      </section>
    </div>
  );
}
