import type { StructureBuilder, StructureResolverContext } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export function structure(S: StructureBuilder, context: StructureResolverContext) {
  return S.list()
    .title("İçerik Yönetimi")
    .items([
      S.listItem()
        .title("Ana Sayfa")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Hakkımızda")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "project",
        title: "Projeler",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "service",
        title: "Hizmetler",
        S,
        context,
      }),
      S.divider(),
      S.listItem()
        .title("Site Ayarları")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
}
