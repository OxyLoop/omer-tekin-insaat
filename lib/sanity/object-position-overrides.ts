/**
 * Görsel kırpma odağı (CSS object-position) bir TASARIM kararıdır ve CMS
 * üzerinden düzenlenebilir bir alan olarak SUNULMAZ (bkz. proje ilkesi:
 * "tasarım kodda yaşar, içerik CMS'te yaşar"). Bu dosya yalnızca, siteye
 * ilk kurulumda manuel olarak eklenmiş gerçek fotoğrafların görsel
 * çerçevelemesini korumak için proje slug'ı bazında sabit değerler tutar.
 * Yeni projeler için varsayılan olarak ortalanmış kırpma (center) kullanılır.
 */
export const coverObjectPositionBySlug: Record<string, string> = {
  "tekin-residence": "center 42%",
  "modern-villa": "60% 45%",
};

export const galleryObjectPositionBySlug: Record<string, string[]> = {
  "tekin-residence": ["center 45%", "65% 50%", "40% 42%", "50% 40%"],
};
