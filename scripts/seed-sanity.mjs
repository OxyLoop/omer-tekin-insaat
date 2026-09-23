#!/usr/bin/env node
/**
 * Ömer Tekin Mühendislik ve İnşaat — Sanity içerik taşıma (seed) script'i.
 *
 * Bu script, sitenin mevcut kodda (data/*.ts, public/*.png) gömülü olan
 * GERÇEK içeriğini Sanity veri setine bir kerelik olarak aktarır. Böylece
 * CMS entegrasyonundan sonra site BOŞ görünmez — Tekin Residence, Modern
 * Villa ve diğer tüm mevcut içerik doğrudan yönetim panelinde düzenlenebilir
 * hale gelir.
 *
 * Kullanım (yalnızca yerel makinede, bir kez çalıştırılır):
 *   node scripts/seed-sanity.mjs
 *
 * Gereksinim: .env.local içinde NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET ve YAZMA yetkisi olan SANITY_API_WRITE_TOKEN.
 * Bu token'ı yalnızca bu script kullanır, siteye asla dahil edilmez.
 *
 * Script idempotenttir: singleton belgeler (siteSettings/homePage/aboutPage)
 * ve sabit ID'li proje/hizmet belgeleri "createOrReplace" ile yazılır, bu
 * yüzden birden fazla kez çalıştırmak güvenlidir (görseller tekrar
 * yüklenmez, zaten var olan asset referansları yeniden kullanılır).
 */

import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("HATA: NEXT_PUBLIC_SANITY_PROJECT_ID ve SANITY_API_WRITE_TOKEN .env.local içinde tanımlı olmalı.");
  console.error("Ayrıntılar için README.md > 'Yönetim Paneli Kurulumu' bölümüne bakın.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const assetCache = new Map();

async function uploadImage(publicRelativePath) {
  if (assetCache.has(publicRelativePath)) return assetCache.get(publicRelativePath);

  const filePath = path.join(PUBLIC_DIR, publicRelativePath);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ! Görsel bulunamadı, atlanıyor: public/${publicRelativePath}`);
    return null;
  }

  console.log(`  ↑ Yükleniyor: public/${publicRelativePath}`);
  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename: path.basename(publicRelativePath),
  });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  assetCache.set(publicRelativePath, ref);
  return ref;
}

async function imageWithAlt(publicRelativePath, alt) {
  const image = await uploadImage(publicRelativePath);
  if (!image) return undefined;
  return { ...image, alt };
}

async function seedSiteSettings() {
  console.log("\n📇 Site Ayarları...");
  const logo = await uploadImage("logo.png");

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "Ömer Tekin Mühendislik ve İnşaat",
    shortName: "Ömer Tekin",
    shortLocation: "Yatağan / Muğla",
    foundedYear: "",
    logo,
    navHomeLabel: "Ana Sayfa",
    navAboutLabel: "Hakkımızda",
    navServicesLabel: "Hizmetler",
    navProjectsLabel: "Projeler",
    navContactLabel: "İletişim",
    navContactCta: "İletişime Geç",
    phoneDisplay: "+90 5XX XXX XX XX",
    phone: "+905XXXXXXXXX",
    whatsapp: "905XXXXXXXXX",
    email: "info@omertekin.com",
    address: "Konak Mahallesi, Nevzat Özsoy Caddesi No:27/B, 48500 Yatağan / Muğla",
    mapsQuery: "Konak Mahallesi Nevzat Özsoy Caddesi No:27/B Yatağan Muğla 48500",
    workingDays: "Pazartesi – Cumartesi",
    workingHours: "09:00 – 18:00",
    instagramUrl: "https://www.instagram.com/omertekinmuhendislik/",
    instagramHandle: "@omertekinmuhendislik",
    otherSocialLinks: [],
    footerDescription:
      "Ömer Tekin Mühendislik ve İnşaat; mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim proje ve tadilat hizmetleri sunmaktadır.",
    copyrightSuffix: "Tüm hakları saklıdır.",
    defaultSeo: {
      title: "Ömer Tekin Mühendislik ve İnşaat | Yatağan, Muğla",
      description:
        "Ömer Tekin Mühendislik ve İnşaat; Yatağan, Muğla'da mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim proje ve tadilat hizmetleri sunmaktadır.",
    },
  });
  console.log("  ✓ Site Ayarları kaydedildi.");
}

async function seedHomePage() {
  console.log("\n🏠 Ana Sayfa...");
  const heroImage = await imageWithAlt(
    "hero-project.png",
    "Ömer Tekin Mühendislik ve İnşaat tarafından uygulanan, deniz manzaralı modern bir konut projesi",
  );
  const aboutImage = await imageWithAlt(
    "corporate-engineering.png",
    "Ömer Tekin Mühendislik ve İnşaat logolu baret, inşaat sahasında proje çizimleriyle birlikte",
  );
  const qualityImage = await imageWithAlt(
    "engineering-quality.png",
    "Gün batımında inşaat sahasında vinç, iskelet halindeki bina ve mühendislik çizimleri",
  );

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Ömer Tekin Mühendislik & İnşaat",
    heroTitle: "Sağlam Temeller.\nGüvenilir Yapılar.",
    heroSubtitle: "Mühendislikten uygulamaya, projelerinizi güvenli ve nitelikli yapılara dönüştürüyoruz.",
    heroImage,
    ctaPrimaryLabel: "Projelerimizi İnceleyin",
    ctaPrimaryLink: "/projeler",
    ctaSecondaryLabel: "İletişime Geçin",
    ctaSecondaryLink: "/iletisim",
    infoBlocks: ["Mühendislik", "Müteahhitlik", "Anahtar Teslim", "Tadilat"],
    aboutEyebrow: "Biz Kimiz?",
    aboutHeading: "Yapının her aşamasında mühendislik disiplinini merkeze alıyoruz.",
    aboutBody: [
      "Ömer Tekin Mühendislik ve İnşaat; mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim proje ve tadilat alanlarında hizmet vermektedir.",
      "Projelendirmeden uygulamaya kadar yapının farklı aşamalarında mühendislik yaklaşımını merkeze alan firma, işlevsel, güvenli ve uzun ömürlü yapılar ortaya koymayı hedeflemektedir.",
    ],
    aboutImage,
    showStats: false,
    stats: [
      { _key: "stat-1", value: "10+", label: "Tamamlanan Proje" },
      { _key: "stat-2", value: "XX.XXX m²", label: "Toplam İnşaat Alanı" },
      { _key: "stat-3", value: "XX+", label: "Yıllık Tecrübe" },
      { _key: "stat-4", value: "%100", label: "Mühendislik Odaklı" },
    ],
    qualityEyebrow: "Mühendislik Anlayışımız",
    qualityHeading: "Her detayda mühendislik,\nher yapıda güven.",
    qualityBody:
      "Projelerimizi planlama, teknik gereklilikler ve uygulama kalitesini birlikte değerlendirerek ele alıyoruz. Amacımız yalnızca yapı üretmek değil, güvenli ve uzun ömürlü yaşam alanları ortaya koymaktır.",
    qualityImage,
    ctaHeading: "Yeni projenizi birlikte hayata geçirelim.",
    ctaBody: "Projeniz hakkında konuşmak ve ihtiyaçlarınıza uygun çözümleri değerlendirmek için bizimle iletişime geçin.",
    ctaButtonLabel: "İletişime Geçin",
    ctaButtonLink: "/iletisim",
  });
  console.log("  ✓ Ana Sayfa kaydedildi.");
}

async function seedAboutPage() {
  console.log("\n👤 Hakkımızda...");
  const philosophyImage = await imageWithAlt(
    "corporate-engineering.png",
    "Ömer Tekin Mühendislik ve İnşaat logolu baret, inşaat sahasında proje çizimleriyle birlikte",
  );

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "Hakkımızda",
    heroSubtitle: "Yatağan, Muğla merkezli; mühendislik disiplinini merkeze alan bir mühendislik ve inşaat firmasıyız.",
    philosophyHeading: "Yaklaşımımız",
    philosophyBody: [
      "Ömer Tekin Mühendislik ve İnşaat; mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim proje ve tadilat alanlarında hizmet vermektedir.",
      "Projelendirmeden uygulamaya kadar yapının farklı aşamalarında mühendislik yaklaşımını merkeze alan firma, işlevsel, güvenli ve uzun ömürlü yapılar ortaya koymayı hedeflemektedir.",
    ],
    philosophyImage,
    showStats: false,
    stats: [
      { _key: "stat-1", value: "10+", label: "Tamamlanan Proje" },
      { _key: "stat-2", value: "XX+", label: "Yıllık Tecrübe" },
      { _key: "stat-3", value: "XX+", label: "Uzman Ekip Üyesi" },
    ],
    founderName: "Ömer Tekin",
    founderTitle: "İnşaat Mühendisi",
    founderEducation: "Dokuz Eylül Üniversitesi – İnşaat Mühendisliği",
    founderBio:
      "İnşaat Mühendisi Ömer Tekin tarafından yürütülen mühendislik ve inşaat hizmetlerinde, teknik gereklilikler ile uygulama kalitesinin birlikte ele alınması esas alınmaktadır.",
    engineeringHeading: "Mühendislik Yaklaşımı",
    engineeringBody:
      "Projelerimizi planlama, teknik gereklilikler ve uygulama kalitesini birlikte değerlendirerek ele alıyoruz. Amacımız yalnızca yapı üretmek değil, güvenli ve uzun ömürlü yaşam alanları ortaya koymaktır.",
    values: [
      { _key: "value-1", title: "Güven", description: "Müşterilerimizle kurduğumuz ilişkiyi şeffaflık ve dürüstlük üzerine inşa ediyoruz." },
      { _key: "value-2", title: "Kalite", description: "Malzeme seçiminden işçilik standartlarına kadar her adımda yüksek kalite anlayışını sürdürüyoruz." },
      { _key: "value-3", title: "Mühendislik", description: "Her projeyi güçlü bir mühendislik altyapısı ve teknik hesaplarla temellendiriyoruz." },
      { _key: "value-4", title: "Şeffaflık", description: "Proje süreçlerinde müşterilerimizi düzenli olarak bilgilendiriyor, net iletişim kuruyoruz." },
      { _key: "value-5", title: "Sürdürülebilirlik", description: "Uzun ömürlü ve çevresel etkileri gözeten yapı çözümlerini önceliklendiriyoruz." },
    ],
  });
  console.log("  ✓ Hakkımızda kaydedildi.");
}

const servicesData = [
  { id: "muhendislik", title: "Mühendislik", shortDescription: "Projelendirme ve uygulama süreçlerinde teknik gereklilikleri esas alan çözümler.", longDescription: "Yapıların projelendirme ve uygulama süreçlerinde teknik gereklilikleri esas alan mühendislik çözümleri sunuyoruz." },
  { id: "muteahhitlik", title: "Müteahhitlik", shortDescription: "Planlama, koordinasyon ve uygulama süreçlerinin bütüncül yürütülmesi.", longDescription: "Planlama, koordinasyon ve uygulama süreçlerinin bütüncül şekilde yürütüldüğü müteahhitlik hizmetleri sunuyoruz." },
  { id: "kat-karsiligi-insaat", title: "Kat Karşılığı İnşaat", shortDescription: "Arsa sahipleriyle yürütülen kat karşılığı projelerde uçtan uca hizmet.", longDescription: "Arsa sahipleriyle yürütülen kat karşılığı projelerde planlamadan yapım sürecine kadar kapsamlı hizmet veriyoruz." },
  { id: "anahtar-teslim-proje", title: "Anahtar Teslim Proje", shortDescription: "Projelendirme, uygulama ve teslim süreçlerinin tek noktadan yönetimi.", longDescription: "Projelendirme, uygulama ve teslim süreçlerinin tek noktadan yönetildiği anahtar teslim yapı çözümleri sunuyoruz." },
  { id: "tadilat-renovasyon", title: "Tadilat & Renovasyon", shortDescription: "Mevcut yapıların ihtiyaca uygun şekilde yenilenmesi ve modernize edilmesi.", longDescription: "Mevcut yapıların ihtiyaçlara uygun şekilde yenilenmesi, geliştirilmesi ve modernize edilmesi hizmetini sunuyoruz." },
];

async function seedServices() {
  console.log("\n🛠️  Hizmetler...");
  for (let i = 0; i < servicesData.length; i++) {
    const service = servicesData[i];
    await client.createOrReplace({
      _id: `service-${service.id}`,
      _type: "service",
      title: service.title,
      slug: { current: service.id },
      shortDescription: service.shortDescription,
      longDescription: service.longDescription,
      active: true,
      orderRank: String(i + 1).padStart(5, "0"),
    });
    console.log(`  ✓ ${service.title}`);
  }
}

const projectsData = [
  {
    id: "tekin-residence",
    name: "Tekin Residence",
    location: "Konum Bilgisi",
    year: "2024",
    category: "Konut",
    status: "completed",
    summary: "Modern cephe tasarımı ve yüksek yapı kalitesiyle öne çıkan konut projesi.",
    description:
      "Tekin Residence, modern mimari çizgileri güçlü mühendislik altyapısıyla bir araya getiren bir konut projesidir. Proje sürecinde statik güvenlik, malzeme kalitesi ve enerji verimliliği bir arada değerlendirilmiştir. // TODO: Replace with real company information.",
    cover: "tekin-residance-hero.png",
    gallery: [
      { file: "tekin-residence-1.png", alt: "Tekin Residence gün batımında cephe görünümü" },
      { file: "tekin-residence-2.png", alt: "Tekin Residence giriş holü ve peyzaj detayı" },
      { file: "tekin-residence-3.png", alt: "Tekin Residence deniz manzaralı köşe cephesi" },
      { file: "tekin-residence-4.png", alt: "Tekin Residence tepe konumundan gece görünümü" },
    ],
    area: "XXXX m²",
    client: "Özel Yatırımcı",
    featured: true,
  },
  {
    id: "modern-villa",
    name: "Modern Villa",
    location: "Konum Bilgisi",
    year: "2023",
    category: "Villa",
    status: "completed",
    summary: "Geniş yaşam alanları ve minimalist mimarisiyle tasarlanmış müstakil villa.",
    description:
      "Modern Villa projesi, açık plan yaşam alanları ve doğal malzeme kullanımıyla dikkat çeken bir villa uygulamasıdır. Statik ve mimari projeler birlikte geliştirilerek yapının uzun ömürlü olması hedeflenmiştir. // TODO: Replace with real company information.",
    cover: "modern-villa.png",
    gallery: [],
    area: "XXX m²",
    client: "Özel Yatırımcı",
    featured: true,
  },
  {
    id: "merkez-konutlari",
    name: "Merkez Konutları",
    location: "Konum Bilgisi",
    year: "2025",
    category: "Konut",
    status: "ongoing",
    summary: "Şehir merkezinde yükselen, çok bloklu modern konut kompleksi.",
    description:
      "Merkez Konutları, şehir merkezinde konumlanan çok bloklu bir konut projesidir. Proje halihazırda uygulama aşamasında olup, mühendislik ve kalite kontrol süreçleri saha ekiplerimizce takip edilmektedir. // TODO: Replace with real company information.",
    cover: null,
    gallery: [],
    area: "XXXXX m²",
    client: "Kurumsal Yatırımcı",
    featured: true,
  },
  {
    id: "park-yasam",
    name: "Park Yaşam",
    location: "Konum Bilgisi",
    year: "2025",
    category: "Konut",
    status: "ongoing",
    summary: "Yeşil alanlarla iç içe planlanmış aile odaklı konut projesi.",
    description:
      "Park Yaşam projesi, geniş yeşil alanları ve sosyal donatılarıyla aile yaşamına uygun bir konut kompleksi olarak planlanmıştır. Uygulama süreci mühendislik ekibimiz tarafından yakından takip edilmektedir. // TODO: Replace with real company information.",
    cover: null,
    gallery: [],
    area: "XXXX m²",
    client: "Özel Yatırımcı",
    featured: true,
  },
  {
    id: "ofis-projesi",
    name: "Ofis Projesi",
    location: "Konum Bilgisi",
    year: "2024",
    category: "Ticari",
    status: "completed",
    summary: "Kurumsal kimliğe uygun, işlevsel bir ofis binası uygulaması.",
    description:
      "Ofis Projesi kapsamında; açık ofis düzenleri, verimli sirkülasyon alanları ve modern cephe sistemleri bir araya getirilmiştir. Yapı, ticari kullanıma uygun mühendislik standartlarıyla teslim edilmiştir. // TODO: Replace with real company information.",
    cover: null,
    gallery: [],
    area: "XXXX m²",
    client: "Kurumsal Müşteri",
    featured: false,
  },
  {
    id: "yeni-yasam-konutlari",
    name: "Yeni Yaşam Konutları",
    location: "Konum Bilgisi",
    year: "2022",
    category: "Konut",
    status: "completed",
    summary: "Aile yaşamına uygun planlanmış, tamamlanmış konut projesi.",
    description:
      "Yeni Yaşam Konutları, işlevsel daire planları ve dayanıklı yapı malzemeleriyle tamamlanmış bir konut projesidir. Proje, teslim sonrası kullanıcı geri bildirimleriyle de olumlu sonuçlar almıştır. // TODO: Replace with real company information.",
    cover: null,
    gallery: [],
    area: "XXXX m²",
    client: "Özel Yatırımcı",
    featured: false,
  },
];

async function seedProjects() {
  console.log("\n🏗️  Projeler...");
  for (let i = 0; i < projectsData.length; i++) {
    const project = projectsData[i];
    const coverImage = project.cover
      ? await imageWithAlt(project.cover, `${project.name} kapak görseli`)
      : undefined;
    const gallery = [];
    for (const item of project.gallery) {
      const image = await imageWithAlt(item.file, item.alt);
      if (image) gallery.push(image);
    }

    await client.createOrReplace({
      _id: `project-${project.id}`,
      _type: "project",
      name: project.name,
      slug: { current: project.id },
      status: project.status,
      category: project.category,
      location: project.location,
      year: project.year,
      area: project.area,
      client: project.client,
      summary: project.summary,
      description: project.description,
      coverImage,
      gallery,
      featured: project.featured,
      active: true,
      orderRank: String(i + 1).padStart(5, "0"),
    });
    console.log(`  ✓ ${project.name}`);
  }
}

async function main() {
  console.log(`Sanity projesine bağlanılıyor: ${projectId} / ${dataset}`);
  await seedSiteSettings();
  await seedHomePage();
  await seedAboutPage();
  await seedServices();
  await seedProjects();
  console.log("\n✅ Tüm mevcut içerik Sanity'ye aktarıldı. Artık /admin üzerinden düzenleyebilirsiniz.");
}

main().catch((error) => {
  console.error("\n❌ İçerik aktarımı sırasında hata oluştu:", error);
  process.exit(1);
});
