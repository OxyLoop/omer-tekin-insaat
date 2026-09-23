import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hizmet Adı",
      type: "string",
      validation: (Rule) => Rule.required().error("Hizmet adı zorunludur."),
    }),
    defineField({
      name: "slug",
      title: "Bağlantı (Slug)",
      type: "slug",
      description: "Hizmetler sayfasında bu hizmete bağlantı vermek için kullanılır.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Bağlantı (slug) zorunludur."),
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama",
      type: "text",
      rows: 2,
      description: "Ana sayfadaki hizmet kartında gösterilen kısa açıklama.",
      validation: (Rule) => Rule.required().max(160).error("Kısa açıklama zorunludur."),
    }),
    defineField({
      name: "longDescription",
      title: "Detaylı Açıklama",
      type: "text",
      rows: 4,
      description: "Hizmetler sayfasında gösterilen daha ayrıntılı açıklama.",
      validation: (Rule) => Rule.required().error("Detaylı açıklama zorunludur."),
    }),
    defineField({
      name: "active",
      title: "Yayında",
      type: "boolean",
      description: "Kapatılırsa hizmet, silinmeden herkese açık siteden gizlenir.",
      initialValue: true,
    }),
    defineField({
      name: "orderRank",
      title: "Sıra",
      type: "string",
      hidden: true,
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
    select: { title: "title", subtitle: "shortDescription", active: "active" },
    prepare({ title, subtitle, active }) {
      return {
        title: active === false ? `${title} (Yayında Değil)` : title,
        subtitle,
      };
    },
  },
});
