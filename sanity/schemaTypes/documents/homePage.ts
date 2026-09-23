import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero (Üst Bölüm)", default: true },
    { name: "about", title: "Biz Kimiz?" },
    { name: "stats", title: "İstatistikler" },
    { name: "quality", title: "Mühendislik Anlayışı" },
    { name: "cta", title: "Çağrı Bölümü" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Hero ---
    defineField({
      name: "heroEyebrow",
      title: "Küçük Üst Yazı",
      type: "string",
      description: "Örn: Ömer Tekin Mühendislik & İnşaat",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Başlık",
      type: "text",
      rows: 2,
      description: "Ana başlık. Yeni bir satıra geçmek için Enter tuşunu kullanabilirsiniz.",
      validation: (Rule) => Rule.required().error("Hero başlığı zorunludur."),
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Alt Başlık",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Görseli",
      type: "galleryImage",
      description: "Ana sayfanın en üstündeki tam genişlikte görsel.",
      group: "hero",
    }),
    defineField({
      name: "ctaPrimaryLabel",
      title: "Birincil Buton Yazısı",
      type: "string",
      initialValue: "Projelerimizi İnceleyin",
      group: "hero",
    }),
    defineField({
      name: "ctaPrimaryLink",
      title: "Birincil Buton Bağlantısı",
      type: "string",
      initialValue: "/projeler",
      group: "hero",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "İkincil Buton Yazısı",
      type: "string",
      initialValue: "İletişime Geçin",
      group: "hero",
    }),
    defineField({
      name: "ctaSecondaryLink",
      title: "İkincil Buton Bağlantısı",
      type: "string",
      initialValue: "/iletisim",
      group: "hero",
    }),
    defineField({
      name: "infoBlocks",
      title: "Kısa Etiketler",
      type: "array",
      of: [{ type: "string" }],
      description: "Hero altındaki kısa kutucuklar. Örn: Mühendislik, Müteahhitlik, Anahtar Teslim, Tadilat",
      group: "hero",
    }),

    // --- Biz Kimiz? ---
    defineField({
      name: "aboutEyebrow",
      title: "Küçük Üst Yazı",
      type: "string",
      initialValue: "Biz Kimiz?",
      group: "about",
    }),
    defineField({
      name: "aboutHeading",
      title: "Başlık",
      type: "text",
      rows: 2,
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "Paragraflar",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "Her satır ayrı bir paragraf olarak gösterilir.",
      group: "about",
    }),
    defineField({
      name: "aboutImage",
      title: "Görsel",
      type: "galleryImage",
      group: "about",
    }),

    // --- İstatistikler ---
    defineField({
      name: "showStats",
      title: "İstatistikleri Göster",
      type: "boolean",
      description: "Gerçek rakamlar netleşmeden yayınlamak istemiyorsanız kapalı bırakın.",
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

    // --- Mühendislik Anlayışı ---
    defineField({
      name: "qualityEyebrow",
      title: "Küçük Üst Yazı",
      type: "string",
      initialValue: "Mühendislik Anlayışımız",
      group: "quality",
    }),
    defineField({
      name: "qualityHeading",
      title: "Başlık",
      type: "text",
      rows: 2,
      group: "quality",
    }),
    defineField({
      name: "qualityBody",
      title: "Açıklama",
      type: "text",
      rows: 4,
      group: "quality",
    }),
    defineField({
      name: "qualityImage",
      title: "Arka Plan Görseli",
      type: "galleryImage",
      group: "quality",
    }),

    // --- Çağrı Bölümü (CTA) ---
    defineField({
      name: "ctaHeading",
      title: "Başlık",
      type: "string",
      initialValue: "Yeni projenizi birlikte hayata geçirelim.",
      group: "cta",
    }),
    defineField({
      name: "ctaBody",
      title: "Açıklama",
      type: "text",
      rows: 2,
      group: "cta",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "Buton Yazısı",
      type: "string",
      initialValue: "İletişime Geçin",
      group: "cta",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "Buton Bağlantısı",
      type: "string",
      initialValue: "/iletisim",
      group: "cta",
    }),

    defineField({
      name: "seo",
      title: "SEO (Ana Sayfaya Özel)",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Ana Sayfa" };
    },
  },
});
