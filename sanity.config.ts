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

export default defineConfig({
  name: "omer-tekin-admin",
  title: "Ömer Tekin Yönetim Paneli",
  projectId,
  dataset,
  basePath: "/admin",
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
