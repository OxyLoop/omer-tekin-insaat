import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Proje",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Proje Adı",
      type: "string",
      validation: (Rule) => Rule.required().error("Proje adı zorunludur."),
    }),
    defineField({
      name: "slug",
      title: "Bağlantı (Slug)",
      type: "slug",
      description: "Projenin web adresinde görünecek kısmı. Sağdaki 'Generate' düğmesiyle otomatik oluşturabilirsiniz.",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Bağlantı (slug) zorunludur."),
    }),
    defineField({
      name: "status",
      title: "Durum",
      type: "string",
      options: {
        list: [
          { title: "Tamamlandı", value: "completed" },
          { title: "Devam Ediyor", value: "ongoing" },
        ],
        layout: "radio",
      },
      initialValue: "completed",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Proje Türü",
      type: "string",
      description: "Örn: Konut, Villa, Ticari",
      validation: (Rule) => Rule.required().error("Proje türü zorunludur."),
    }),
    defineField({
      name: "location",
      title: "Konum",
      type: "string",
      validation: (Rule) => Rule.required().error("Konum zorunludur."),
    }),
    defineField({
      name: "year",
      title: "Yıl",
      type: "string",
      description: "Örn: 2024",
      validation: (Rule) => Rule.required().error("Yıl zorunludur."),
    }),
    defineField({
      name: "area",
      title: "Alan (m²)",
      type: "string",
      description: "Örn: 4.500 m² (opsiyonel)",
    }),
    defineField({
      name: "client",
      title: "Müşteri",
      type: "string",
      description: "Örn: Özel Yatırımcı (opsiyonel)",
    }),
    defineField({
      name: "summary",
      title: "Kısa Açıklama",
      type: "text",
      rows: 2,
      description: "Proje kartlarında ve arama motorlarında görünen kısa özet.",
      validation: (Rule) => Rule.required().max(220).error("Kısa açıklama zorunludur (en fazla 220 karakter)."),
    }),
    defineField({
      name: "description",
      title: "Detaylı Açıklama",
      type: "text",
      rows: 8,
      description: "Proje detay sayfasında gösterilen uzun açıklama metni.",
      validation: (Rule) => Rule.required().error("Detaylı açıklama zorunludur."),
    }),
    defineField({
      name: "coverImage",
      title: "Kapak Görseli",
      type: "galleryImage",
      description: "Proje kartlarında ve detay sayfasının üst kısmında gösterilen ana görsel.",
      validation: (Rule) => Rule.required().error("Kapak görseli zorunludur."),
    }),
    defineField({
      name: "gallery",
      title: "Proje Galerisi",
      type: "array",
      of: [{ type: "galleryImage" }],
      description: "Proje detay sayfasındaki fotoğraf galerisi. Görselleri sürükleyerek sıralayabilirsiniz.",
      options: { layout: "grid" },
    }),
    defineField({
      name: "featured",
      title: "Ana Sayfada Öne Çıkar",
      type: "boolean",
      description: "Açıksa bu proje ana sayfadaki 'Seçili Projeler' bölümünde gösterilir.",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Yayında",
      type: "boolean",
      description: "Kapatılırsa proje, silinmeden herkese açık siteden gizlenir.",
      initialValue: true,
    }),
    defineField({
      name: "orderRank",
      title: "Sıra",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "seo",
      title: "SEO (Arama Motoru Ayarları)",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Görüntülenme Sırası",
      name: "orderRankAsc",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "location",
      media: "coverImage",
      active: "active",
    },
    prepare({ title, subtitle, media, active }) {
      return {
        title: active === false ? `${title} (Yayında Değil)` : title,
        subtitle,
        media,
      };
    },
  },
});
