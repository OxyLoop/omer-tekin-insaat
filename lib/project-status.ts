import { ProjectStatus } from "@/types";

export const statusLabels: Record<ProjectStatus, string> = {
  completed: "Tamamlandı",
  ongoing: "Devam Ediyor",
};

export const statusFilterLabels: Record<"all" | ProjectStatus, string> = {
  all: "Tümü",
  completed: "Tamamlanan Projeler",
  ongoing: "Devam Eden Projeler",
};
