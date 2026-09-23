import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/sanity/content";
import { siteUrl, basePath } from "@/lib/paths";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `${siteUrl}${basePath}`;

  const staticRoutes = ["", "/hakkimizda", "/hizmetler", "/projeler", "/iletisim"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    }),
  );

  const slugs = await getProjectSlugs();
  const projectRoutes = slugs.map((slug) => ({
    url: `${base}/projeler/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
