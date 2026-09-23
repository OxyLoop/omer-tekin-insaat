import { defineField, defineType } from "sanity";

export default defineType({
  name: "socialLink",
  title: "Sosyal Medya Bağlantısı",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform Adı",
      type: "string",
      description: "Örn: Facebook, LinkedIn, YouTube",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Bağlantı (URL)",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["http", "https"] }).error("Geçerli bir bağlantı (https://...) girin."),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "url" },
  },
});
