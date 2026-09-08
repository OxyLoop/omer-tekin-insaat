import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl, basePath } from "@/lib/paths";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `${siteUrl}${basePath}`;

  const staticRoutes = ["", "/hakkimizda", "/hizmetler", "/projeler", "/iletisim"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    }),
  );

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projeler/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
