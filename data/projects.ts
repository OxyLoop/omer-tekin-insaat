import { Project } from "@/types";

// Proje görselleri henüz eklenmemişse arayüz otomatik olarak yer tutucu
// (placeholder) görsel gösterir; bu nedenle dosyaların eksik olması siteyi
// bozmaz. Gerçek görseller eklendiğinde yollar aynı kalabilir.
export const projects: Project[] = [
  {
    id: 1,
    slug: "tekin-residence",
    name: "Tekin Residence",
    location: "Konum Bilgisi",
    year: "2024",
    category: "Konut",
    status: "completed",
    summary: "Modern cephe tasarımı ve yüksek yapı kalitesiyle öne çıkan konut projesi.",
    description:
      "Tekin Residence, modern mimari çizgileri güçlü mühendislik altyapısıyla bir araya getiren bir konut projesidir. Proje sürecinde statik güvenlik, malzeme kalitesi ve enerji verimliliği bir arada değerlendirilmiştir. // TODO: Replace with real company information.",
    coverImage: "/tekin-residance-hero.png",
    coverImageObjectPosition: "center 42%",
    images: [
      {
        src: "/tekin-residence-1.png",
        alt: "Tekin Residence gün batımında cephe görünümü",
        objectPosition: "center 45%",
      },
      {
        src: "/tekin-residence-2.png",
        alt: "Tekin Residence giriş holü ve peyzaj detayı",
        objectPosition: "65% 50%",
      },
      {
        src: "/tekin-residence-3.png",
        alt: "Tekin Residence deniz manzaralı köşe cephesi",
        objectPosition: "40% 42%",
      },
      {
        src: "/tekin-residence-4.png",
        alt: "Tekin Residence tepe konumundan gece görünümü",
        objectPosition: "50% 40%",
      },
    ],
    area: "XXXX m²",
    client: "Özel Yatırımcı",
    featured: true,
  },
  {
    id: 2,
    slug: "modern-villa",
    name: "Modern Villa",
    location: "Konum Bilgisi",
    year: "2023",
    category: "Villa",
    status: "completed",
    summary: "Geniş yaşam alanları ve minimalist mimarisiyle tasarlanmış müstakil villa.",
    description:
      "Modern Villa projesi, açık plan yaşam alanları ve doğal malzeme kullanımıyla dikkat çeken bir villa uygulamasıdır. Statik ve mimari projeler birlikte geliştirilerek yapının uzun ömürlü olması hedeflenmiştir. // TODO: Replace with real company information.",
    coverImage: "/modern-villa.png",
    coverImageObjectPosition: "60% 45%",
    images: [
      { src: "/images/projects/project-2/01.jpg", alt: "Modern Villa dış görünüm" },
      { src: "/images/projects/project-2/02.jpg", alt: "Modern Villa bahçe alanı" },
      { src: "/images/projects/project-2/03.jpg", alt: "Modern Villa iç mekan" },
    ],
    area: "XXX m²",
    client: "Özel Yatırımcı",
    featured: true,
  },
  {
    id: 3,
    slug: "merkez-konutlari",
    name: "Merkez Konutları",
    location: "Konum Bilgisi",
    year: "2025",
    category: "Konut",
    status: "ongoing",
    summary: "Şehir merkezinde yükselen, çok bloklu modern konut kompleksi.",
    description:
      "Merkez Konutları, şehir merkezinde konumlanan çok bloklu bir konut projesidir. Proje halihazırda uygulama aşamasında olup, mühendislik ve kalite kontrol süreçleri saha ekiplerimizce takip edilmektedir. // TODO: Replace with real company information.",
    coverImage: "/images/projects/project-3/cover.jpg",
    images: [
      { src: "/images/projects/project-3/01.jpg", alt: "Merkez Konutları inşaat alanı" },
      { src: "/images/projects/project-3/02.jpg", alt: "Merkez Konutları vaziyet planı" },
    ],
    area: "XXXXX m²",
    client: "Kurumsal Yatırımcı",
    featured: true,
  },
  {
    id: 4,
    slug: "park-yasam",
    name: "Park Yaşam",
    location: "Konum Bilgisi",
    year: "2025",
    category: "Konut",
    status: "ongoing",
    summary: "Yeşil alanlarla iç içe planlanmış aile odaklı konut projesi.",
    description:
      "Park Yaşam projesi, geniş yeşil alanları ve sosyal donatılarıyla aile yaşamına uygun bir konut kompleksi olarak planlanmıştır. Uygulama süreci mühendislik ekibimiz tarafından yakından takip edilmektedir. // TODO: Replace with real company information.",
    coverImage: "/images/projects/project-4/cover.jpg",
    images: [
      { src: "/images/projects/project-4/01.jpg", alt: "Park Yaşam inşaat süreci" },
      { src: "/images/projects/project-4/02.jpg", alt: "Park Yaşam peyzaj alanı" },
    ],
    area: "XXXX m²",
    client: "Özel Yatırımcı",
    featured: true,
  },
  {
    id: 5,
    slug: "ofis-projesi",
    name: "Ofis Projesi",
    location: "Konum Bilgisi",
    year: "2024",
    category: "Ticari",
    status: "completed",
    summary: "Kurumsal kimliğe uygun, işlevsel bir ofis binası uygulaması.",
    description:
      "Ofis Projesi kapsamında; açık ofis düzenleri, verimli sirkülasyon alanları ve modern cephe sistemleri bir araya getirilmiştir. Yapı, ticari kullanıma uygun mühendislik standartlarıyla teslim edilmiştir. // TODO: Replace with real company information.",
    coverImage: "/images/projects/project-5/cover.jpg",
    images: [
      { src: "/images/projects/project-5/01.jpg", alt: "Ofis Projesi dış cephe" },
      { src: "/images/projects/project-5/02.jpg", alt: "Ofis Projesi lobi alanı" },
    ],
    area: "XXXX m²",
    client: "Kurumsal Müşteri",
    featured: false,
  },
  {
    id: 6,
    slug: "yeni-yasam-konutlari",
    name: "Yeni Yaşam Konutları",
    location: "Konum Bilgisi",
    year: "2022",
    category: "Konut",
    status: "completed",
    summary: "Aile yaşamına uygun planlanmış, tamamlanmış konut projesi.",
    description:
      "Yeni Yaşam Konutları, işlevsel daire planları ve dayanıklı yapı malzemeleriyle tamamlanmış bir konut projesidir. Proje, teslim sonrası kullanıcı geri bildirimleriyle de olumlu sonuçlar almıştır. // TODO: Replace with real company information.",
    coverImage: "/images/projects/project-6/cover.jpg",
    images: [
      { src: "/images/projects/project-6/01.jpg", alt: "Yeni Yaşam Konutları dış görünüm" },
      { src: "/images/projects/project-6/02.jpg", alt: "Yeni Yaşam Konutları sosyal alan" },
    ],
    area: "XXXX m²",
    client: "Özel Yatırımcı",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit: number = 4): Project[] {
  const featured = projects.filter((project) => project.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}
