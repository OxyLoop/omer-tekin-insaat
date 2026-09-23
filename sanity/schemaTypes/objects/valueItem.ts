import { defineField, defineType } from "sanity";

export default defineType({
  name: "valueItem",
  title: "Kurumsal Değer",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      description: "Örn: Güven, Kalite, Mühendislik",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
