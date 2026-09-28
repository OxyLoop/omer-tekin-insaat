export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Yalnızca kök alan adı (origin) — proje yolu (basePath) DAHİL DEĞİLDİR.
// Mutlak site URL'si gereken yerlerde her zaman `${siteUrl}${basePath}`
// olarak birleştirilir (bkz. app/robots.ts, app/sitemap.ts) — böylece hem
// kullanıcı sitesi (basePath boş) hem de proje sitesi (ör. /omer-tekin-insaat)
// için doğru sonuç üretilir ve yol asla iki kez eklenmez.
// Özel alan adı bağlandığında yalnızca bu değer güncellenmelidir.
export const siteUrl = "https://oxyloop.github.io";

/**
 * next/image ve next/link basePath'i otomatik ekler. Bu fonksiyon yalnızca
 * düz <img>, OpenGraph/metadata veya manifest gibi otomatik ön ek almayan
 * yerlerde public/ altındaki dosyalara referans verirken kullanılır.
 */
export function getAssetPath(path: string): string {
  // Mutlak URL'ler (ör. Sanity CDN'den gelen görseller) olduğu gibi bırakılır;
  // yalnızca /public altındaki göreli yollara basePath eklenir.
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
