export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

/** Sanity yapılandırılmış mı? Yapılandırılmamışsa site, kodda gömülü yedek içerikle çalışmaya devam eder. */
export const isSanityConfigured = Boolean(projectId);
