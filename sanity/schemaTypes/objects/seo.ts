import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Başlığı",
      type: "string",
      description: "Boş bırakılırsa sayfanın ana başlığı kullanılır.",
    }),
    defineField({
      name: "description",
      title: "Meta Açıklama",
      type: "text",
      rows: 3,
      description: "Arama motorlarında ve paylaşımlarda görünen kısa açıklama (150-160 karakter önerilir).",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "ogImage",
      title: "Paylaşım Görseli (OpenGraph)",
      type: "image",
      description: "Sosyal medyada paylaşıldığında görünecek görsel. Boş bırakılırsa varsayılan görsel kullanılır.",
      options: { hotspot: true },
    }),
  ],
  options: { collapsible: true, collapsed: true },
});
