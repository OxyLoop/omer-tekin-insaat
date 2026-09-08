"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project, ProjectStatus } from "@/types";
import { statusFilterLabels } from "@/lib/project-status";
import { cn } from "@/lib/utils";

type FilterValue = "all" | ProjectStatus;

const filterValues: FilterValue[] = ["all", "completed", "ongoing"];

interface ProjectsExplorerProps {
  projects: Project[];
}

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.status === filter);
  }, [projects, filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Proje filtreleri">
        {filterValues.map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={filter === value}
            onClick={() => setFilter(value)}
            className={cn(
              "border px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300",
              filter === value
                ? "border-offwhite bg-offwhite text-charcoal"
                : "border-line-strong text-muted hover:border-offwhite hover:text-offwhite",
            )}
          >
            {statusFilterLabels[value]}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className={project.featured && index % 5 === 0 ? "sm:col-span-2" : ""}
            >
              <ProjectCard project={project} size={project.featured && index % 5 === 0 ? "large" : "normal"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <p className="mt-12 border border-line px-8 py-16 text-center text-muted">
          Bu kategoride henüz proje bulunmuyor.
        </p>
      )}
    </div>
  );
}
