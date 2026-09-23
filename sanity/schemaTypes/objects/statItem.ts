import { defineField, defineType } from "sanity";

export default defineType({
  name: "statItem",
  title: "İstatistik",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Değer",
      type: "string",
      description: "Örn: 10+, 20.000 m², %100",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Etiket",
      type: "string",
      description: "Örn: Tamamlanan Proje",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
