import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Galeri Görseli",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternatif Metin (Alt Text)",
      type: "string",
      description: "Görme engelli ziyaretçiler ve arama motorları için görseli kısaca tanımlayın. Örn: 'Tekin Residence gün batımında cephe görünümü'",
      validation: (Rule) => Rule.required().error("Her görsel için bir alternatif metin girilmelidir."),
    }),
  ],
  preview: {
    select: { imageUrl: "asset.url", title: "alt" },
  },
});
