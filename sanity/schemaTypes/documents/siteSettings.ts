import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  groups: [
    { name: "company", title: "Şirket Bilgileri", default: true },
    { name: "navigation", title: "Menü Etiketleri" },
    { name: "contact", title: "İletişim" },
    { name: "social", title: "Sosyal Medya" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO (Varsayılan)" },
  ],
  fields: [
    // --- Şirket Bilgileri ---
    defineField({
      name: "companyName",
      title: "Şirket Adı",
      type: "string",
      group: "company",
      validation: (Rule) => Rule.required().error("Şirket adı zorunludur."),
    }),
    defineField({
      name: "shortName",
      title: "Kısa Ad",
      type: "string",
      description: "Örn: Ömer Tekin",
      group: "company",
    }),
    defineField({
      name: "shortLocation",
      title: "Kısa Konum",
      type: "string",
      description: "Örn: Yatağan / Muğla — footer ve kurumsal bilgilerde kullanılır.",
      group: "company",
    }),
    defineField({
      name: "foundedYear",
      title: "Kuruluş Yılı",
      type: "string",
      description: "Opsiyonel. Belirtilirse ileride site içeriğinde kullanılabilir.",
      group: "company",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Navbar ve footer'da kullanılan logo görseli.",
      group: "company",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Tarayıcı sekmesinde görünen küçük simge. Kare (1:1) bir görsel yükleyin.",
      group: "company",
    }),

    // --- Menü Etiketleri ---
    defineField({
      name: "navHomeLabel",
      title: "Ana Sayfa",
      type: "string",
      initialValue: "Ana Sayfa",
      group: "navigation",
    }),
    defineField({
      name: "navAboutLabel",
      title: "Hakkımızda",
      type: "string",
      initialValue: "Hakkımızda",
      group: "navigation",
    }),
    defineField({
      name: "navServicesLabel",
      title: "Hizmetler",
      type: "string",
      initialValue: "Hizmetler",
      group: "navigation",
    }),
    defineField({
      name: "navProjectsLabel",
      title: "Projeler",
      type: "string",
      initialValue: "Projeler",
      group: "navigation",
    }),
    defineField({
      name: "navContactLabel",
      title: "İletişim",
      type: "string",
      initialValue: "İletişim",
      group: "navigation",
    }),
    defineField({
      name: "navContactCta",
      title: "İletişim Butonu Yazısı",
      type: "string",
      description: "Navbar'daki iletişim butonunun yazısı.",
      initialValue: "İletişime Geç",
      group: "navigation",
    }),

    // --- İletişim ---
    defineField({
      name: "phoneDisplay",
      title: "Telefon (Görünen)",
      type: "string",
      description: "Örn: +90 5XX XXX XX XX",
      group: "contact",
    }),
    defineField({
      name: "phone",
      title: "Telefon (Arama İçin)",
      type: "string",
      description: "Boşluksuz, ülke koduyla birlikte. Örn: +905XXXXXXXXX",
      group: "contact",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Numarası",
      type: "string",
      description: "Boşluksuz, başında + olmadan. Örn: 905XXXXXXXXX",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "E-posta Adresi",
      type: "string",
      validation: (Rule) => Rule.email().warning("Geçerli bir e-posta adresi giriniz."),
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Açık Adres",
      type: "text",
      rows: 2,
      group: "contact",
    }),
    defineField({
      name: "mapsQuery",
      title: "Google Haritalar Adres Sorgusu",
      type: "string",
      description: "Haritanın ve 'Yol Tarifi Al' linkinin oluşturulduğu adres metni. Koordinat gerekmez.",
      group: "contact",
    }),
    defineField({
      name: "workingDays",
      title: "Çalışma Günleri",
      type: "string",
      description: "Örn: Pazartesi – Cumartesi",
      group: "contact",
    }),
    defineField({
      name: "workingHours",
      title: "Çalışma Saatleri",
      type: "string",
      description: "Örn: 09:00 – 18:00",
      group: "contact",
    }),

    // --- Sosyal Medya ---
    defineField({
      name: "instagramUrl",
      title: "Instagram Bağlantısı",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
      group: "social",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Kullanıcı Adı",
      type: "string",
      description: "Örn: @omertekinmuhendislik",
      group: "social",
    }),
    defineField({
      name: "otherSocialLinks",
      title: "Diğer Sosyal Medya Hesapları",
      type: "array",
      of: [{ type: "socialLink" }],
      group: "social",
    }),

    // --- Footer ---
    defineField({
      name: "footerDescription",
      title: "Footer Açıklama Metni",
      type: "text",
      rows: 3,
      group: "footer",
    }),
    defineField({
      name: "copyrightSuffix",
      title: "Telif Hakkı Metni",
      type: "string",
      description: "Yıl ve şirket adından sonra gelen kısım. Örn: Tüm hakları saklıdır.",
      initialValue: "Tüm hakları saklıdır.",
      group: "footer",
    }),

    // --- SEO ---
    defineField({
      name: "defaultSeo",
      title: "Varsayılan SEO Ayarları",
      type: "seo",
      description: "Sayfaya özel bir SEO ayarı girilmediğinde kullanılır.",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Ayarları" };
    },
  },
});
