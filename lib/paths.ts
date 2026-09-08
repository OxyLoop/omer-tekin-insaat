export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const siteUrl = "https://example.github.io"; // TODO: Replace with real production domain.

/**
 * next/image ve next/link basePath'i otomatik ekler. Bu fonksiyon yalnızca
 * düz <img>, OpenGraph/metadata veya manifest gibi otomatik ön ek almayan
 * yerlerde public/ altındaki dosyalara referans verirken kullanılır.
 */
export function getAssetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
