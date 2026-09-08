# Ömer Tekin Mühendislik ve İnşaat — Kurumsal Web Sitesi

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion ile geliştirilmiş,
GitHub Pages üzerinde statik olarak yayınlanabilen kurumsal web sitesi.

Bu doküman, teknik bilgisi sınırlı bir geliştiricinin bile siteyi kurup
içeriğini güncelleyebilmesi için hazırlanmıştır.

---

## İçindekiler

1. [Kurulum](#1-kurulum)
2. [Geliştirme Sunucusunu Çalıştırma](#2-geliştirme-sunucusunu-çalıştırma)
3. [Logoyu Değiştirme](#3-logoyu-değiştirme)
4. [Proje Görsellerini Ekleme](#4-proje-görsellerini-ekleme)
5. [Projects.ts İçine Yeni Proje Ekleme](#5-projectsts-içine-yeni-proje-ekleme)
6. [Telefon / E-posta / Adres Bilgilerini Değiştirme](#6-telefon--e-posta--adres-bilgilerini-değiştirme)
7. [Google Maps Yapılandırması](#7-google-maps-yapılandırması)
8. [Formspree (İletişim Formu) Yapılandırması](#8-formspree-iletişim-formu-yapılandırması)
9. [GitHub Pages'e Deploy Etme](#9-github-pagese-deploy-etme)
10. [NEXT_PUBLIC_BASE_PATH Nasıl Çalışır?](#10-next_public_base_path-nasıl-çalışır)
11. [Proje Yapısı](#11-proje-yapısı)

---

## 1. Kurulum

Node.js 20 veya üzeri gereklidir.

```bash
npm install
```

Ardından `.env.example` dosyasını `.env.local` olarak kopyalayın ve gerekli
değerleri girin (bkz. bölüm 8 ve 10):

```bash
cp .env.example .env.local
```

## 2. Geliştirme Sunucusunu Çalıştırma

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

Diğer yararlı komutlar:

```bash
npm run lint    # ESLint kontrolü
npm run build   # Production build + statik export (out/ klasörü oluşur)
```

## 3. Logoyu Değiştirme

Logo dosyası `public/logo.png` konumunda bulunur. Yeni logonuzu aynı isimle
(`logo.png`) bu klasöre koymanız yeterlidir; kod tarafında herhangi bir
değişiklik gerekmez. Logo; navbar (`components/layout/Navbar.tsx`) ve footer
(`components/layout/Footer.tsx`) içinde otomatik olarak kullanılır.

## 4. Proje Görsellerini Ekleme

Görseller şu klasör yapısında beklenir:

```
public/images/hero.jpg
public/images/about.jpg
public/images/quality.jpg
public/images/projects/project-1/cover.jpg
public/images/projects/project-1/01.jpg
public/images/projects/project-1/02.jpg
...
```

**Önemli:** Görsel dosyaları henüz eklenmemiş olsa bile site bozulmaz. Her
görsel, `components/ui/ImageWithFallback.tsx` bileşeni üzerinden gösterilir;
dosya bulunamazsa otomatik olarak zarif bir yer tutucu (placeholder) görsel
gösterilir. Gerçek görselleri eklediğinizde herhangi bir kod değişikliği
gerekmeden görseller otomatik olarak devreye girer.

Önerilen görsel oranları:
- Hero / kapak görselleri: geniş (16:9 veya daha geniş)
- Proje galeri görselleri: dikey/kare (4:5)

## 5. projects.ts İçine Yeni Proje Ekleme

Tüm proje verileri `data/projects.ts` dosyasında tutulur. Yeni bir proje
eklemek için diziye aşağıdaki gibi bir obje ekleyin:

```ts
{
  id: 7,
  slug: "yeni-proje-adi", // URL'de kullanılacak, benzersiz olmalı
  name: "Yeni Proje Adı",
  location: "Konum Bilgisi",
  year: "2026",
  category: "Konut", // Konut, Villa, Ticari vb.
  status: "ongoing", // "completed" | "ongoing"
  summary: "Kısa özet cümlesi.",
  description: "Detay sayfasında görünecek uzun açıklama metni.",
  coverImage: "/images/projects/project-7/cover.jpg",
  images: [
    { src: "/images/projects/project-7/01.jpg", alt: "Açıklayıcı alt metin" },
  ],
  area: "XXXX m²", // opsiyonel
  client: "Müşteri Adı", // opsiyonel
  featured: false, // true ise ana sayfada da gösterilir
}
```

Proje eklendiğinde `/projeler/yeni-proje-adi` adresinde otomatik olarak yeni
bir detay sayfası oluşur (statik export sırasında `generateStaticParams`
fonksiyonu bu işi otomatik yapar) — ekstra bir route dosyası oluşturmanıza
gerek yoktur.

## 6. Telefon / E-posta / Adres Bilgilerini Değiştirme

Tüm iletişim bilgileri tek bir dosyada toplanmıştır: `data/contact.ts`.

```ts
export const contactInfo: ContactInfo = {
  phone: "+905XXXXXXXXX",       // tel: linki için (boşluksuz, + ile)
  phoneDisplay: "+90 5XX XXX XX XX", // ekranda görünen format
  whatsapp: "905XXXXXXXXX",     // wa.me linki için (+ olmadan)
  email: "info@omertekin.com",
  instagram: "https://instagram.com/omertekininsaat",
  instagramHandle: "@omertekininsaat",
  address: "[Adres bilgisi buraya gelecek]",
  workingHours: { days: "Pazartesi – Cumartesi", hours: "09:00 – 18:00" },
  mapsEmbedUrl: "...", // bkz. bölüm 7
};
```

Bu dosyayı güncellediğinizde navbar, footer, iletişim sayfası, WhatsApp
butonu ve mobil menü gibi tüm bileşenler otomatik olarak güncellenir.

## 7. Google Maps Yapılandırması

1. [Google Maps](https://maps.google.com) üzerinde işletme adresinizi arayın.
2. **Paylaş > Harita yerleştir** seçeneğine tıklayın.
3. Verilen `<iframe src="...">` linkini kopyalayın (yalnızca `src` içindeki URL).
4. `data/contact.ts` dosyasındaki `mapsEmbedUrl` değerini bu URL ile değiştirin.

Harita, koyu tema ile uyumlu görünmesi için hafif bir CSS filtresiyle
gösterilir (`components/contact/MapEmbed.tsx`).

## 8. Formspree (İletişim Formu) Yapılandırması

İletişim formu, statik site uyumlu bir üçüncü parti servis olan
[Formspree](https://formspree.io) üzerinden gerçek e-posta gönderimi yapar.

1. [formspree.io](https://formspree.io) üzerinde ücretsiz bir hesap açın.
2. Yeni bir form oluşturun ve size verilen endpoint adresini kopyalayın
   (örnek: `https://formspree.io/f/xxxxxxxx`).
3. `.env.local` dosyanıza şu satırı ekleyin:

   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```

4. GitHub Pages'e deploy ederken bu değeri **GitHub Secrets** üzerinden de
   tanımlamanız gerekir (bkz. bölüm 9).

Bu değişken tanımlanmadığı sürece form; geliştirme ortamında ekranda bir
uyarı gösterir ve gerçek bir mesaj göndermez (bu davranış kasıtlıdır — form
asla "çalışıyormuş gibi" davranmaz).

## 9. GitHub Pages'e Deploy Etme

Depo, `.github/workflows/deploy.yml` içinde hazır bir GitHub Actions iş akışı
ile gelir. Kurulum adımları:

1. Projeyi bir GitHub deposuna push edin.
2. Depo ayarlarında **Settings → Pages → Build and deployment → Source**
   kısmından **GitHub Actions** seçeneğini işaretleyin.
3. Formspree kullanıyorsanız **Settings → Secrets and variables → Actions**
   kısmından `NEXT_PUBLIC_FORMSPREE_ENDPOINT` adında bir secret ekleyin.
4. `main` dalına push yaptığınızda site otomatik olarak build edilip
   yayınlanır.

İş akışı, deponuzun adını otomatik algılayarak doğru `NEXT_PUBLIC_BASE_PATH`
değerini kendisi ayarlar (bkz. bölüm 10) — genellikle elle bir şey yapmanız
gerekmez.

## 10. NEXT_PUBLIC_BASE_PATH Nasıl Çalışır?

GitHub Pages, bir siteyi iki şekilde yayınlayabilir:

- **Kullanıcı/organizasyon sitesi:** `kullaniciadi.github.io` (kök adres,
  başında ek bir yol yoktur) → `NEXT_PUBLIC_BASE_PATH` **boş** olmalıdır.
- **Proje sitesi:** `kullaniciadi.github.io/repo-adi` → `NEXT_PUBLIC_BASE_PATH`
  değeri `/repo-adi` olmalıdır.

`.github/workflows/deploy.yml` içindeki iş akışı bu ayrımı depo adına bakarak
otomatik yapar; repo adı `.github.io` ile bitmiyorsa `/repo-adi` değerini
otomatik ekler. Kendi bilgisayarınızda basePath'li bir build denemek
isterseniz:

```bash
NEXT_PUBLIC_BASE_PATH=/repo-adi npm run build
```

Kod tarafında bu değer `lib/paths.ts` içindeki `getAssetPath()` fonksiyonu ve
`next.config.ts` içindeki `basePath` ayarı ile tüm sayfa linklerine, statik
dosyalara ve görsellere otomatik olarak uygulanır.

## 11. Proje Yapısı

```
app/                  Next.js App Router sayfaları (rotalar)
components/
  layout/              Navbar, Footer, MobileMenu, WhatsAppButton
  sections/            Ana sayfa ve diğer sayfalardaki büyük bölümler
  projects/            Proje kartı, galeri, lightbox, filtreler
  contact/             İletişim formu ve harita
  ui/                  Buton, başlık, görsel yer tutucu gibi genel bileşenler
  motion/              Framer Motion scroll-reveal sarmalayıcısı
data/                  Tüm düzenlenebilir içerik (projeler, hizmetler,
                       iletişim bilgileri, istatistikler, şirket metinleri)
lib/                   Yardımcı fonksiyonlar (basePath, sınıf birleştirme vb.)
types/                 Paylaşılan TypeScript tipleri
public/                Statik dosyalar (logo, görseller)
```

İçerik güncellemelerinin neredeyse tamamı `data/` klasöründeki dosyalar
üzerinden yapılır; komponent kodlarına dokunmanız gerekmez.
