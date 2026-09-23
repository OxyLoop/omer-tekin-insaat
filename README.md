# Ömer Tekin Mühendislik ve İnşaat — Kurumsal Web Sitesi

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion ile geliştirilmiş,
GitHub Pages üzerinde statik olarak yayınlanan kurumsal web sitesi.

Site içeriği (metinler, görseller, projeler, hizmetler, iletişim bilgileri)
**Sanity CMS** ile yönetilir ve `/admin` adresindeki yönetim panelinden
düzenlenir. Tasarım (bileşenler, renkler, yerleşim) kodda; içerik ise CMS'te
yaşar — yönetici kod yazmadan, HTML/CSS bilmeden içerik güncelleyebilir.

Bu doküman, teknik bilgisi sınırlı bir geliştiricinin bile siteyi kurup
yönetim panelini yapılandırabilmesi için hazırlanmıştır. Site sahibi için
günlük kullanım talimatları **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** dosyasındadır.

---

## İçindekiler

1. [Kurulum](#1-kurulum)
2. [Geliştirme Sunucusunu Çalıştırma](#2-geliştirme-sunucusunu-çalıştırma)
3. [Yönetim Paneli Kurulumu (Sanity CMS)](#3-yönetim-paneli-kurulumu-sanity-cms)
4. [Mevcut İçeriği Sanity'ye Aktarma (Seed)](#4-mevcut-i̇çeriği-sanityye-aktarma-seed)
5. [İçerik Mimarisi: Tasarım Kodda, İçerik CMS'te](#5-i̇çerik-mimarisi-tasarım-kodda-i̇çerik-cmste)
6. [Formspree (İletişim Formu) Yapılandırması](#6-formspree-i̇letişim-formu-yapılandırması)
7. [GitHub Pages'e Deploy Etme](#7-github-pagese-deploy-etme)
8. [İçerik Değiştiğinde Otomatik Yayınlama (Webhook)](#8-i̇çerik-değiştiğinde-otomatik-yayınlama-webhook)
9. [NEXT_PUBLIC_BASE_PATH Nasıl Çalışır?](#9-next_public_base_path-nasıl-çalışır)
10. [/admin Erişimi ve Güvenlik](#10-admin-erişimi-ve-güvenlik)
11. [Müşteri Teslimi (Hesap Devri)](#11-müşteri-teslimi-hesap-devri)
12. [Proje Yapısı](#12-proje-yapısı)

---

## 1. Kurulum

Node.js 20 veya üzeri gereklidir.

```bash
npm install
```

Ardından `.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
cp .env.example .env.local
```

`.env.local` içindeki değerlerin nasıl doldurulacağı bölüm 3'te (Sanity) ve
bölüm 6'da (Formspree) ayrıntılı olarak anlatılmaktadır.

## 2. Geliştirme Sunucusunu Çalıştırma

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini,
yönetim paneli için [http://localhost:3000/admin](http://localhost:3000/admin)
adresini açın.

Diğer yararlı komutlar:

```bash
npm run lint    # ESLint kontrolü
npm run build   # Production build + statik export (out/ klasörü oluşur)
npm run seed    # Mevcut içeriği Sanity'ye aktarır (bkz. bölüm 4)
```

**Önemli:** Sanity henüz yapılandırılmamışsa (aşağıdaki bölüm 3
tamamlanmamışsa) site **bozulmaz** — tüm sayfalar, kodda gömülü olan gerçek
yedek içerikle (mevcut proje, hizmet ve iletişim bilgileriyle) çalışmaya
devam eder. `/admin` ise "İçerik yönetim sistemi henüz yapılandırılmadı"
mesajı gösterir.

## 3. Yönetim Paneli Kurulumu (Sanity CMS)

Bu bölümdeki adımları **sırasıyla** takip edin. Her adımda tam olarak nereye
tıklayacağınız belirtilmiştir.

### 3.1 Sanity Hesabı Oluşturma

1. [sanity.io](https://www.sanity.io) adresine gidin.
2. **Get started free** butonuna tıklayın.
3. Google, GitHub veya e-posta ile ücretsiz bir hesap oluşturun.

### 3.2 Sanity Projesi Oluşturma

1. Giriş yaptıktan sonra **sanity.io/manage** adresine gidin.
2. **Create project** (veya **+ New project**) butonuna tıklayın.
3. Projeye bir isim verin, örneğin: `Omer Tekin Site`.
4. Proje oluşturulduğunda otomatik olarak bir **dataset** (veri seti)
   oluşturulur; adı genellikle `production` olur. Bu isim aşağıda
   kullanılacaktır.

### 3.3 Project ID'yi Bulma

1. **sanity.io/manage** → oluşturduğunuz proje → **Project ID** başlığının
   altında görünen kodu kopyalayın (örnek: `ab12cd34`).
2. `.env.local` dosyanızda:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ab12cd34
   ```

### 3.4 Dataset Adını Ayarlama

1. Aynı proje sayfasında sol menüden **Datasets** sekmesine girin.
2. Kullanmak istediğiniz dataset'in adını (genellikle `production`) not edin.
3. Veri setinin **Dataset visibility** (görünürlük) ayarının **Public**
   olduğundan emin olun — bu, herkese açık web sitesinin API anahtarı
   olmadan yayınlanmış içeriği okuyabilmesini sağlar (yazma işlemleri her
   zaman kimlik doğrulaması gerektirir, bu ayarla ilgisizdir).
4. `.env.local` dosyanızda:
   ```
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### 3.5 CORS Origin Ekleme (Zorunlu)

Sanity, hangi web adreslerinin Studio'ya (yönetim paneline) API isteği
atabileceğini bilmek ister. Bu adım atlanırsa `/admin` paneli veri
yükleyemez/kaydedemez.

1. **sanity.io/manage** → proje → **API** sekmesi.
2. **CORS Origins** bölümünde **+ Add CORS origin** butonuna tıklayın.
3. Yerel geliştirme için:
   - Origin: `http://localhost:3000`
   - **Allow credentials** kutucuğunu **işaretleyin**.
   - **Save**.
4. Canlı site için (GitHub Pages adresinizle, ör. `https://kullaniciadi.github.io`):
   - Aynı şekilde **+ Add CORS origin** ile canlı adresinizi ekleyin.
   - **Allow credentials** işaretli olsun.
   - Özel alan adınız (custom domain) varsa onu da ayrı bir origin olarak ekleyin.

### 3.6 Yöneticiyi (Administrator) Ekleme

Bu projede **tek bir yönetici** olacaktır. Sanity Studio'nun kendi kimlik
doğrulamasını kullanır — özel bir kullanıcı adı/parola sistemi YOKTUR.

1. **sanity.io/manage** → proje → **Members** (Üyeler) sekmesi.
2. Zaten projeyi oluşturan hesap otomatik olarak **Administrator** rolüyle
   üyedir — başka bir e-posta adresiyle giriş yapılmasını istiyorsanız
   **Invite members** ile o e-postayı **Administrator** rolüyle davet edin.
3. Yönetici, `/admin` adresini açtığında Sanity'nin kendi giriş ekranından
   (Google/GitHub/e-posta) giriş yapar. Sadece bu şekilde davet edilmiş
   kişiler içeriği görüntüleyebilir/düzenleyebilir; başka hiç kimse yazma
   yetkisine sahip olamaz.

### 3.7 Ortam Değişkenlerini Tamamlama

`.env.local` dosyanız artık şöyle görünmelidir:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ab12cd34
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

`SANITY_API_READ_TOKEN` ve `SANITY_API_WRITE_TOKEN` alanlarını bu aşamada
BOŞ bırakabilirsiniz (yalnızca bölüm 4'teki içerik aktarımı için write
token'a ihtiyacınız olacak).

### 3.8 Yerel Olarak Test Etme

```bash
npm run dev
```

[http://localhost:3000/admin](http://localhost:3000/admin) adresini açın,
Sanity hesabınızla giriş yapın. Şu an içerik boş görünecektir (henüz hiçbir
şey oluşturmadınız) — bir sonraki bölümde mevcut içeriği otomatik olarak
aktaracaksınız.

## 4. Mevcut İçeriği Sanity'ye Aktarma (Seed)

Bu adım, sitede hâlihazırda var olan gerçek içeriği (Tekin Residence, Modern
Villa, hizmetler, iletişim bilgileri, ana sayfa metinleri ve tüm mevcut
görseller) tek seferde Sanity'ye yükler. **Yalnızca bir kez** çalıştırmanız
yeterlidir.

1. **sanity.io/manage** → proje → **API** → **Tokens** → **Add API token**.
   - İsim: `seed-script` (istediğiniz bir isim).
   - Permissions: **Editor**.
   - **Save** — gösterilen token'ı kopyalayın (bu ekrandan bir daha
     görüntülenemez).
2. `.env.local` dosyanıza ekleyin:
   ```
   SANITY_API_WRITE_TOKEN=sk...buraya_yapıştırın
   ```
3. Script'i çalıştırın:
   ```bash
   npm run seed
   ```
4. Script; şirket bilgilerini, ana sayfa/hakkımızda içeriğini, 5 hizmeti ve
   6 projeyi (görselleriyle birlikte `public/` klasöründen otomatik
   yükleyerek) Sanity'ye aktarır.
5. İşlem bitince `/admin` panelini yenileyin — tüm içeriğin dolu geldiğini
   göreceksiniz.

Script **idempotenttir** (tekrar tekrar çalıştırılabilir, veriyi
tekrarlamaz) — ancak normalde yalnızca bir kez çalıştırmanız yeterlidir;
sonraki tüm değişiklikleri doğrudan `/admin` panelinden yapacaksınız.

Güvenlik için `SANITY_API_WRITE_TOKEN` değerini yalnızca bu aktarım
sırasında kullanın; isterseniz işlem bittikten sonra
**sanity.io/manage → API → Tokens** üzerinden token'ı silebilir veya
`.env.local` dosyanızdan kaldırabilirsiniz (dosya zaten Git'e commit
edilmez).

## 5. İçerik Mimarisi: Tasarım Kodda, İçerik CMS'te

- **`sanity/schemaTypes/`** — İçerik modelleri (Proje, Hizmet, Ana Sayfa,
  Hakkımızda, Site Ayarları). Yönetim panelindeki form alanlarını bu
  dosyalar belirler.
- **`lib/sanity/content.ts`** — Sitenin TEK içerik erişim katmanı. Sayfalar
  Sanity'yi doğrudan sorgulamaz; yalnızca bu dosyadaki fonksiyonları
  (`getProjects()`, `getSiteSettings()` vb.) çağırır. Sanity'ye
  ulaşılamazsa (veya henüz yapılandırılmamışsa) bu fonksiyonlar otomatik
  olarak `data/*.ts` içindeki gerçek yedek içeriğe döner — site asla boş
  görünmez.
- **`data/*.ts`** — Artık CANLI SİTE tarafından doğrudan kullanılmaz;
  yalnızca (a) `npm run seed` script'inin kaynağı ve (b) Sanity'ye
  ulaşılamadığında devreye giren yedek içerik olarak görev yapar.
- **`app/admin/[[...tool]]/page.tsx`** — Sanity Studio'yu `/admin` adresinde
  barındıran statik export uyumlu sayfa.

Yeni bir proje/hizmet eklemek veya mevcut içeriği düzenlemek için artık
`data/` klasörünü elle düzenlemeniz **gerekmez** — `/admin` panelini
kullanın (bkz. [ADMIN_GUIDE.md](ADMIN_GUIDE.md)).

## 6. Formspree (İletişim Formu) Yapılandırması

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
   tanımlamanız gerekir (bkz. bölüm 7).

Bu değişken tanımlanmadığı sürece form; geliştirme ortamında ekranda bir
uyarı gösterir ve gerçek bir mesaj göndermez (bu davranış kasıtlıdır — form
asla "çalışıyormuş gibi" davranmaz).

## 7. GitHub Pages'e Deploy Etme

Depo, `.github/workflows/deploy.yml` içinde hazır bir GitHub Actions iş akışı
ile gelir. Kurulum adımları:

1. Projeyi bir GitHub deposuna push edin.
2. Depo ayarlarında **Settings → Pages → Build and deployment → Source**
   kısmından **GitHub Actions** seçeneğini işaretleyin.
3. **Settings → Secrets and variables → Actions → Secrets** sekmesinden şu
   gizli değerleri ekleyin:
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (bkz. bölüm 6)
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` (bkz. bölüm 3.3)
   - `SANITY_API_READ_TOKEN` — yalnızca veri setinizi **Private** yaparsanız
     gereklidir; **Public** dataset kullanıyorsanız boş bırakabilirsiniz.
4. Veri seti adınız `production` değilse, **Settings → Secrets and
   variables → Actions → Variables** sekmesinden `NEXT_PUBLIC_SANITY_DATASET`
   adında bir **variable** (secret değil) ekleyin.
5. `main` dalına push yaptığınızda site otomatik olarak build edilip
   yayınlanır.

İş akışı, deponuzun adını otomatik algılayarak doğru `NEXT_PUBLIC_BASE_PATH`
değerini kendisi ayarlar (bkz. bölüm 9) — genellikle elle bir şey yapmanız
gerekmez.

## 8. İçerik Değiştiğinde Otomatik Yayınlama (Webhook)

Site statik (GitHub Pages) olduğu için, `/admin` panelinden bir içerik
kaydedildiğinde sitenin **yeniden derlenip yayınlanması** gerekir. Bu adımı
kurduğunuzda bu işlem otomatik olur (genellikle ~1 dakika içinde) — yönetici
hiçbir ek işlem yapmaz, yalnızca "Kaydet" der.

### 8.1 GitHub Kişisel Erişim Anahtarı (PAT) Oluşturma

1. GitHub'da **Settings** (hesap ayarları, sağ üstteki profil menüsünden) →
   **Developer settings** → **Personal access tokens** → **Fine-grained tokens**
   → **Generate new token**.
2. **Repository access**: yalnızca bu depoyu seçin.
3. **Permissions → Repository permissions → Contents**: **Read and write**
   olarak ayarlayın (repository_dispatch tetiklemek için gereklidir).
4. Token'ı oluşturup kopyalayın (bir daha görüntülenemez).

### 8.2 Sanity Webhook Oluşturma

1. **sanity.io/manage** → proje → **API** → **Webhooks** → **Create webhook**.
2. **Name**: `GitHub yeniden derleme`.
3. **URL**:
   ```
   https://api.github.com/repos/KULLANICI_ADI/DEPO_ADI/dispatches
   ```
   (`KULLANICI_ADI/DEPO_ADI` kısmını kendi GitHub kullanıcı adı ve deponuzun
   adıyla değiştirin.)
4. **Dataset**: kullandığınız dataset'i seçin (`production`).
5. **Trigger on**: **Create**, **Update**, **Delete** hepsini işaretleyin.
6. **HTTP method**: `POST`.
7. **HTTP Headers** kısmına iki header ekleyin:
   - `Authorization` → `Bearer GITHUB_PAT_DEĞERİNİZ`
   - `Accept` → `application/vnd.github+json`
8. **Payload** kısmına şunu yapıştırın:
   ```json
   { "event_type": "sanity-content-updated" }
   ```
9. **Save**.

Bundan sonra `/admin` panelinde bir kayıt yapıldığında, Sanity bu webhook'u
tetikler → GitHub Actions otomatik olarak yeni bir build+deploy başlatır →
değişiklik canlı sitede görünür. Bu adımı atlarsanız site yine de çalışır,
yalnızca içerik değişikliklerinin yayınlanması için `main` dalına manuel bir
push yapmanız (veya **Actions** sekmesinden iş akışını elle çalıştırmanız)
gerekir.

## 9. NEXT_PUBLIC_BASE_PATH Nasıl Çalışır?

GitHub Pages, bir siteyi iki şekilde yayınlayabilir:

- **Kullanıcı/organizasyon sitesi:** `kullaniciadi.github.io` (kök adres,
  başında ek bir yol yoktur) → `NEXT_PUBLIC_BASE_PATH` **boş** olmalıdır.
- **Proje sitesi:** `kullaniciadi.github.io/repo-adi` → `NEXT_PUBLIC_BASE_PATH`
  değeri `/repo-adi` olmalıdır.

`.github/workflows/deploy.yml` içindeki iş akışı bu ayrımı depo adına bakarak
otomatik yapar; repo adı `.github.io` ile bitmiyorsa `/repo-adi` değerini
otomatik ekler.

## 10. /admin Erişimi ve Güvenlik

- `/admin` adresi herkese açık navbar/footer üzerinden **hiçbir yerde
  bağlantı olarak gösterilmez** — ancak bu, tek başına bir güvenlik önlemi
  DEĞİLDİR. Gerçek güvenlik, Sanity'nin kendi kimlik doğrulamasından gelir:
  yalnızca projeye üye olarak eklenmiş kişiler (bkz. bölüm 3.6) giriş
  yapabilir ve içerik değiştirebilir.
- `/admin` sayfası `noindex, nofollow` meta etiketiyle işaretlidir ve
  `robots.txt` içinde `Disallow: /admin` olarak tanımlıdır — arama
  motorları bu sayfayı indekslemez.
- Herkese açık site yalnızca **okuma** yapar; yazma (oluşturma/düzenleme/
  silme) işlemleri yalnızca `/admin` üzerinden, kimliği doğrulanmış
  yönetici tarafından yapılabilir.
- `/admin` doğrudan açıldığında veya tarayıcıda yenilendiğinde (F5) çalışır;
  statik GitHub Pages barındırmasında bu, `404.html` dosyasının akıllıca
  kullanılmasıyla sağlanır (bkz. `app/not-found.tsx`) — ek bir sunucu
  yapılandırması gerekmez.
- Hiçbir parola, gizli anahtar veya yazma token'ı frontend koduna veya
  tarayıcıya gönderilen JavaScript paketine dahil edilmez.

## 11. Müşteri Teslimi (Hesap Devri)

Bu proje üçüncü taraf hesaplara bağımlıdır. Site müşteriye teslim edilirken
aşağıdaki hesapların **müşterinin kendi** hesapları olması (veya
geliştiriciden müşteriye devredilmesi) önerilir:

| Servis | Neden gerekli | Devir/Erişim |
|---|---|---|
| **GitHub** | Kaynak kod deposu ve otomatik deploy | Depoyu müşterinin GitHub hesabına aktarın veya müşteriyi "Owner" olarak ekleyin. |
| **Sanity** | İçerik yönetimi (CMS) | Müşteriyi proje üyesi olarak **Administrator** rolüyle ekleyin (bkz. bölüm 3.6); isterseniz kendi hesabınızı sonradan projeden çıkarabilirsiniz. |
| **Formspree** | İletişim formu gönderimleri | Hesabı müşteriye devredin veya müşterinin kendi hesabıyla yeni bir form oluşturup endpoint'i güncelleyin. |
| **Alan adı sağlayıcı (varsa)** | Özel alan adı (custom domain) | Alan adı müşterinin kendi kayıt sağlayıcısı hesabında olmalıdır. |
| **GitHub Pages** | Barındırma | Ek bir hesap gerekmez — GitHub deposunun bir parçasıdır. |

Teslimden sonra sistem, geliştiricinin kişisel hesaplarına bağımlı
kalmamalıdır.

## 12. Proje Yapısı

```
app/                  Next.js App Router sayfaları (rotalar)
  admin/               Sanity Studio'yu barındıran /admin rotası
components/
  layout/              Navbar, Footer, MobileMenu, WhatsAppButton
  sections/            Ana sayfa ve diğer sayfalardaki büyük bölümler
  projects/            Proje kartı, galeri, lightbox, filtreler
  contact/             İletişim formu ve harita
  admin/               /admin rotasının istemci tarafı Studio sarmalayıcısı
  ui/                  Buton, başlık, görsel yer tutucu gibi genel bileşenler
  motion/              Framer Motion scroll-reveal sarmalayıcısı
sanity/
  schemaTypes/         İçerik modelleri (proje, hizmet, ana sayfa, vb.)
  structure/           Yönetim paneli menü yapısı
lib/
  sanity/              İçerik erişim katmanı (client, sorgular, tipler, yedek mantığı)
  paths.ts, utils.ts    Genel yardımcı fonksiyonlar
data/                  Seed script kaynağı ve Sanity'ye ulaşılamazsa kullanılan yedek içerik
types/                 Paylaşılan TypeScript tipleri
scripts/
  seed-sanity.mjs      Mevcut içeriği Sanity'ye aktaran bir kerelik script
public/                Statik dosyalar (logo, görseller)
```

Günlük içerik güncellemeleri artık `/admin` panelinden yapılır — bkz.
**[ADMIN_GUIDE.md](ADMIN_GUIDE.md)**.
