/**
 * Sanity Studio yapılandırması.
 *
 * Bu dosya, /admin altında çalışan içerik yönetim panelinin (Sanity Studio)
 * yapılandırmasıdır. Buradaki ayarlar TASARIM değil, panelin hangi içerik
 * modellerini hangi menü yapısıyla göstereceğini belirler.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";

import { schema, singletonTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

// Sanity projesi henüz yapılandırılmamışsa (env değişkenleri eksikse) bile bu
// dosyanın içe aktarılabilmesi (derlenebilmesi) için geçerli biçimli bir
// yer tutucu kullanılır. Gerçek Studio arayüzü yalnızca proje gerçekten
// yapılandırıldığında render edilir (bkz. components/admin/StudioClient.tsx).
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-project";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// GitHub Pages proje sitesi olarak barındırıldığında (ör. /omer-tekin-insaat)
// Next.js'in basePath'i URL'nin başına eklenir. Studio'nun kendi istemci
// tarafı yönlendiricisi, basePath'ini tarayıcının GERÇEK yoluyla
// karşılaştırır; burası "/admin" olarak sabit kalırsa gerçek yol
// "/omer-tekin-insaat/admin" ile eşleşmez ve Studio "Workspace not found"
// hatası verir.
//
// Bunu derleme zamanı NEXT_PUBLIC_BASE_PATH değişkeniyle sabit metin olarak
// hesaplamak yerine ÇALIŞMA ZAMANINDA tarayıcının gerçek window.location
// yolundan türetiyoruz: Next-Sanity/Turbopack'in Studio'yu dinamik olarak
// böldüğü parçalarda derleme zamanı sabitleri her zaman aynı şekilde
// gömülmeyebiliyor, ama window.location her zaman tutarlıdır.
function resolveStudioBasePath(): string {
  const marker = "/admin";
  if (typeof window === "undefined") return marker;
  const { pathname } = window.location;
  const markerIndex = pathname.indexOf(marker);
  return markerIndex >= 0 ? pathname.slice(0, markerIndex) + marker : marker;
}
const basePath = resolveStudioBasePath();

export default defineConfig({
  name: "omer-tekin-admin",
  title: "Ömer Tekin Yönetim Paneli",
  projectId,
  dataset,
  basePath,
  schema,
  plugins: [structureTool({ structure }), media()],
  document: {
    // Yöneticinin karşılaştığı iş akışını sadeleştirmek için "Unpublish"
    // (yayından kaldır) her belge türünde gizlenir — bu proje için "Yayında"
    // kutucuğu yeterlidir (bkz. project/service şemaları). Kalan tek
    // birincil eylem Sanity'nin varsayılan "Publish" düğmesidir; tıklandığında
    // değişiklik anında yayınlanır, ayrı bir "yayınla" adımı yoktur.
    // Tekil (singleton) belgeler — Ana Sayfa, Hakkımızda, Site Ayarları —
    // silinemez veya çoğaltılamaz; yalnızca düzenlenip kaydedilebilir.
    actions: (input, context) => {
      const withoutUnpublish = input.filter((action) => action.action !== "unpublish");

      if (singletonTypes.has(context.schemaType)) {
        return withoutUnpublish.filter(({ action }) => !["delete", "duplicate"].includes(action ?? ""));
      }
      return withoutUnpublish;
    },
    // Tekil belgeler için "Yeni Belge Oluştur" menüsünde ayrı bir seçenek
    // gösterilmez (zaten Studio menüsünden doğrudan açılabiliyorlar).
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global" || creationContext.type === "structure") {
        return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId));
      }
      return prev;
    },
  },
});
