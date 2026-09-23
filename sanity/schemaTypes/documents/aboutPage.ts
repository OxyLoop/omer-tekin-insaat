import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  groups: [
    { name: "hero", title: "Üst Bölüm", default: true },
    { name: "philosophy", title: "Yaklaşımımız" },
    { name: "stats", title: "İstatistikler" },
    { name: "founder", title: "Yetkili Mühendis" },
    { name: "engineering", title: "Mühendislik Yaklaşımı" },
    { name: "values", title: "Değerlerimiz" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Başlık",
      type: "string",
      initialValue: "Hakkımızda",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Alt Başlık",
      type: "text",
      rows: 2,
      group: "hero",
    }),

    defineField({
      name: "philosophyHeading",
      title: "Bölüm Başlığı",
      type: "string",
      initialValue: "Yaklaşımımız",
      group: "philosophy",
    }),
    defineField({
      name: "philosophyBody",
      title: "Paragraflar",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "philosophy",
    }),
    defineField({
      name: "philosophyImage",
      title: "Görsel",
      type: "galleryImage",
      group: "philosophy",
    }),

    defineField({
      name: "showStats",
      title: "İstatistikleri Göster",
      type: "boolean",
      initialValue: false,
      group: "stats",
    }),
    defineField({
      name: "stats",
      title: "İstatistikler",
      type: "array",
      of: [{ type: "statItem" }],
      group: "stats",
    }),

    defineField({
      name: "founderName",
      title: "Ad Soyad",
      type: "string",
      group: "founder",
    }),
    defineField({
      name: "founderTitle",
      title: "Unvan",
      type: "string",
      description: "Örn: İnşaat Mühendisi",
      group: "founder",
    }),
    defineField({
      name: "founderEducation",
      title: "Eğitim Bilgisi",
      type: "string",
      description: "Örn: Dokuz Eylül Üniversitesi – İnşaat Mühendisliği",
      group: "founder",
    }),
    defineField({
      name: "founderBio",
      title: "Kısa Biyografi",
      type: "text",
      rows: 3,
      group: "founder",
    }),

    defineField({
      name: "engineeringHeading",
      title: "Bölüm Başlığı",
      type: "string",
      initialValue: "Mühendislik Yaklaşımı",
      group: "engineering",
    }),
    defineField({
      name: "engineeringBody",
      title: "Açıklama",
      type: "text",
      rows: 4,
      group: "engineering",
    }),

    defineField({
      name: "values",
      title: "Değerler",
      type: "array",
      of: [{ type: "valueItem" }],
      group: "values",
    }),

    defineField({
      name: "seo",
      title: "SEO (Bu Sayfaya Özel)",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hakkımızda" };
    },
  },
});
