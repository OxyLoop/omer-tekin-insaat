import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { Project } from "@/types";
import { statusLabels } from "@/lib/project-status";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  size?: "large" | "normal";
  priority?: boolean;
}

export default function ProjectCard({ project, size = "normal", priority = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projeler/${project.slug}`}
      className="group relative block overflow-hidden border border-line"
    >
      <div className={cn("relative w-full overflow-hidden", size === "large" ? "aspect-16/10" : "aspect-4/5")}>
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ImageWithFallback
            src={project.coverImage}
            alt={`${project.name} proje görseli`}
            fill
            priority={priority}
            sizes={size === "large" ? "100vw" : "(min-width: 1024px) 50vw, 100vw"}
            className="object-cover"
            style={project.coverImageObjectPosition ? { objectPosition: project.coverImageObjectPosition } : undefined}
            fallbackLabel="Proje Görseli"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

        <span
          className={cn(
            "absolute top-5 left-5 border px-3 py-1 text-[11px] font-medium tracking-[0.15em] uppercase backdrop-blur-sm",
            project.status === "completed"
              ? "border-ink-line-strong bg-ink/50 text-on-ink"
              : "border-on-ink/40 bg-on-ink/10 text-on-ink",
          )}
        >
          {statusLabels[project.status]}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
          <div className="transition-transform duration-300 group-hover:-translate-y-1">
            <h3 className="text-xl font-semibold tracking-tight text-on-ink sm:text-2xl">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-on-ink-soft">
              {project.location} — {project.year}
            </p>
          </div>
          <ArrowUpRight
            className="h-6 w-6 shrink-0 text-on-ink opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
