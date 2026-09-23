# Yönetim Paneli Kullanım Kılavuzu

Bu kılavuz, **Ömer Tekin Mühendislik ve İnşaat** web sitesinin içeriğini
(projeler, hizmetler, iletişim bilgileri, ana sayfa metinleri) kod bilgisi
gerektirmeden nasıl güncelleyeceğinizi anlatır.

---

## 1. Yönetim Paneline Giriş

1. Tarayıcınızda sitenizin adresinin sonuna `/admin` ekleyerek açın.
   Örnek: `https://sizinsiteniz.com/admin`
2. Karşınıza bir giriş ekranı gelecektir. Size tanımlanan yöntemle
   (Google, GitHub veya e-posta) giriş yapın.
3. Giriş yaptıktan sonra sol tarafta bir menü göreceksiniz:
   - **Ana Sayfa**
   - **Hakkımızda**
   - **Projeler**
   - **Hizmetler**
   - **Site Ayarları**

> Not: Bu panele yalnızca size özel olarak tanımlanmış hesap giriş
> yapabilir. Panelin adresini bilen başka biri giriş yapamaz.

---

## 2. Yeni Proje Ekleme

1. Sol menüden **Projeler**'e tıklayın.
2. Sağ üstteki **+ Create** (veya **+**) butonuna tıklayın.
3. Açılan formda şu bilgileri doldurun:
   - **Proje Adı** — örn. "Yeni Konut Projesi"
   - **Bağlantı (Slug)** — proje adının yanındaki **Generate** butonuna
     tıklayarak otomatik oluşturabilirsiniz.
   - **Durum** — Tamamlandı / Devam Ediyor
   - **Proje Türü** — örn. Konut, Villa, Ticari
   - **Konum**, **Yıl**
   - **Kısa Açıklama** — proje kartlarında görünen kısa cümle
   - **Detaylı Açıklama** — proje sayfasında görünen uzun metin
   - **Kapak Görseli** — aşağıdaki "Görsel Yükleme" bölümüne bakın
   - **Proje Galerisi** — proje detay sayfasındaki fotoğraflar
4. **Ana Sayfada Öne Çıkar** kutucuğunu işaretlerseniz proje ana sayfada da
   gösterilir.
5. Sağ üstteki **Kaydet** (veya **Publish**) butonuna tıklayın.
6. Birkaç dakika içinde (genellikle 1 dakikadan az) proje canlı sitede
   görünür.

---

## 3. Mevcut Bir Projeyi Düzenleme

1. Sol menüden **Projeler**'e girin.
2. Düzenlemek istediğiniz projeye (örn. "Tekin Residence") tıklayın.
3. İstediğiniz alanı değiştirin.
4. Sağ üstteki **Kaydet** butonuna tıklayın.
5. Ekranın altında/üstünde **"Değişiklikler kaydedildi ve sitede
   yayınlandı."** mesajını göreceksiniz.

---

## 4. Fotoğraf Yükleme (Görsel Yükleme)

1. **Kapak Görseli** veya **Proje Galerisi** alanının üzerine tıklayın.
2. Açılan pencerede:
   - Bilgisayarınızdan bir dosyayı sürükleyip bırakabilir **veya**
   - **Upload** (Yükle) sekmesinden dosya seçebilirsiniz.
3. Desteklenen dosya türleri: **JPG, JPEG, PNG, WEBP**.
4. Görsel yüklendikten sonra otomatik olarak bir küçük önizleme (thumbnail)
   gösterilir.
5. Her görsel için bir **Alternatif Metin (Alt Text)** girmeniz istenir —
   bu, görseli kısaca tanımlayan bir cümledir (örn. "Tekin Residence gün
   batımında cephe görünümü"). Bu, hem erişilebilirlik hem de Google
   aramalarında görselin bulunabilmesi için önemlidir.
6. **Kaydet**'e tıklayın.

### Fotoğraf Kaldırma

1. Kaldırmak istediğiniz görselin üzerine gelin.
2. Görselin sağ üst köşesinde çıkan çöp kutusu / **X** simgesine tıklayın.
3. **Kaydet**'e tıklayın.

### Fotoğrafları Sıralama (Galeri Sırası)

1. Proje Galerisi alanındaki görsellerden birinin üzerine **basılı tutup**
   sürükleyin.
2. İstediğiniz sıraya bırakın.
3. **Kaydet**'e tıklayın — sıralama, sitedeki galeri sırasıyla birebir
   aynıdır.

### Kapak Görselini Değiştirme

**Kapak Görseli** alanına tıklayıp yeni bir görsel seçmeniz yeterlidir;
eski kapak görseli otomatik olarak değiştirilir.

---

## 5. Projeleri Sıralama (Hangi Proje Önce Görünsün?)

1. Sol menüden **Projeler** listesine girin (proje detayına girmeden, liste
   ekranındayken).
2. Listedeki bir projenin solundaki tutamaçtan (⠿ simgesi) basılı tutup
   sürükleyerek yukarı/aşağı taşıyın.
3. Bu sıralama, `/projeler` sayfasındaki ve ana sayfadaki proje sırasını
   belirler.

Aynı yöntem **Hizmetler** listesi için de geçerlidir.

---

## 6. Bir Projeyi Silme

1. Silmek istediğiniz projeyi açın.
2. Sağ üstteki **⋮** (üç nokta) menüsünden **Delete** seçeneğine tıklayın.
3. Karşınıza projenin adını (ör. "Tekin Residence") gösteren bir onay
   penceresi çıkar ve silme işlemini gerçekten yapmak isteyip istemediğiniz
   sorulur.
4. **Cancel** (İptal) veya **Delete** (Sil) seçeneklerinden birini seçin.

> ⚠️ Silme işlemi geri alınamaz. Projeyi tamamen kaldırmak yerine yalnızca
> siteden gizlemek isterseniz, projeyi silmek yerine formdaki **Yayında**
> kutucuğunun işaretini kaldırıp **Kaydet**'e tıklayabilirsiniz — bu şekilde
> proje veritabanında kalır ama sitede görünmez, istediğiniz zaman tekrar
> açabilirsiniz.

---

## 7. Ana Sayfayı Düzenleme

Sol menüden **Ana Sayfa**'ya girin. Sayfanın üstünde sekmeler (gruplar)
göreceksiniz:

- **Hero (Üst Bölüm)** — Başlık, alt başlık, buton yazıları/bağlantıları,
  arka plan görseli, kısa etiketler (Mühendislik, Müteahhitlik vb.)
- **Biz Kimiz?** — Kısa tanıtım metni ve görseli
- **İstatistikler** — "10+ Tamamlanan Proje" gibi rakamlar (gerçek rakamlar
  belirlenene kadar **İstatistikleri Göster** kutucuğu kapalı tutulabilir)
- **Mühendislik Anlayışı** — "Her detayda mühendislik..." bölümü
- **Çağrı Bölümü** — Sayfanın altındaki "Yeni projenizi birlikte hayata
  geçirelim" bölümü

Her alanı düzenledikten sonra **Kaydet**'e tıklamanız yeterlidir.

---

## 8. Hakkımızda Sayfasını Düzenleme

Sol menüden **Hakkımızda**'ya girin. Burada:

- Sayfa başlığı ve alt başlığı
- "Yaklaşımımız" bölümü metinleri ve görseli
- İstatistikler (isteğe bağlı, ana sayfadaki gibi)
- **Yetkili Mühendis** bilgileri (ad, unvan, eğitim, kısa biyografi)
- "Mühendislik Yaklaşımı" bölümü
- **Değerlerimiz** listesi (Güven, Kalite, Mühendislik vb. — ekleyip
  çıkarabilir, sıralayabilirsiniz)

düzenlenebilir.

---

## 9. İletişim Bilgilerini Değiştirme

1. Sol menüden **Site Ayarları**'na girin.
2. Sayfanın üstündeki sekmelerden **İletişim**'i seçin.
3. Telefon, WhatsApp, e-posta, adres, çalışma saatleri gibi bilgileri
   güncelleyin.
4. **Sosyal Medya** sekmesinden Instagram bağlantınızı ve varsa diğer
   sosyal medya hesaplarınızı düzenleyin.
5. **Kaydet**'e tıklayın.

Bu bilgiler; navbar, footer, iletişim sayfası, mobil menü ve yüzen WhatsApp
butonu dahil sitedeki **her yerde otomatik olarak** güncellenir — aynı
bilgiyi birden fazla yerde ayrı ayrı değiştirmenize gerek yoktur.

### Adres / Harita Değiştirme

**İletişim** sekmesindeki **Google Haritalar Adres Sorgusu** alanına açık
adresinizi yazmanız yeterlidir (koordinat girmenize gerek yoktur) — harita
ve "Yol Tarifi Al" bağlantısı bu adresten otomatik olarak oluşturulur.

---

## 10. Hizmetleri Düzenleme

1. Sol menüden **Hizmetler**'e girin.
2. Yeni hizmet eklemek için **+ Create**, düzenlemek için mevcut bir
   hizmete tıklayın.
3. Hizmet Adı, Kısa Açıklama (ana sayfa kartında görünür) ve Detaylı
   Açıklama (Hizmetler sayfasında görünür) alanlarını doldurun.
4. **Kaydet**.
5. Sıralamak için hizmet listesindeyken sürükleyin (bkz. bölüm 5).

---

## 11. Kaydetme Nasıl Çalışır?

Her formda yalnızca **tek bir buton** ile ilgilenmeniz yeterlidir: sağ üstteki
yeşil **Publish** (Yayınla) butonu.

Bu butona tıkladığınızda:
1. Değişiklikleriniz kaydedilir.
2. Aynı anda sitede **yayınlanır** (ayrı bir taslak/önizleme adımı yoktur —
   Sanity'nin dahili taslak sistemini hiç görmezsiniz).
3. Buton kısa süreliğine bir onay animasyonu gösterir ve "Published just
   now" (az önce yayınlandı) ibaresi görünür.
4. Değişiklik, otomatik yayınlama kurulduysa (bkz. README.md bölüm 8)
   genellikle **1 dakika içinde**, kurulmadıysa geliştiricinizin manuel
   olarak yeniden yayınlamasıyla canlı sitede görünür.

Eğer kaydetme sırasında bir hata olursa (örn. zorunlu bir alan boş
bırakıldıysa), formda hangi alanın eksik/hatalı olduğu açıkça belirtilir.

---

## 12. Panelden Çıkış Yapma

Sağ üst köşedeki profil simgenize (veya adınıza) tıklayın ve **Sign out**
/ **Çıkış Yap** seçeneğini seçin.

---

## 13. Değiştiremeyeceğiniz Şeyler (ve Neden)

Yönetim paneli, sitenin **tasarımını** değiştirmenize izin vermez —
renkler, yazı tipleri, sayfa yerleşimi gibi unsurlar sabittir. Bu kasıtlı
bir tercihtir: tasarımın bozulmasını önler ve sitenin her zaman profesyonel
görünmesini garanti eder. Panelden yalnızca **metinleri, görselleri ve
listeleri** (projeler, hizmetler vb.) değiştirebilirsiniz.

Tasarımda bir değişiklik yapılması gerekirse (örn. yeni bir bölüm eklenmesi,
renk paletinin değiştirilmesi), bu bir geliştirici tarafından kodda
yapılmalıdır.

---

## Bir Sorunla mı Karşılaştınız?

- Kaydet butonuna bastığınızda hata alıyorsanız, ekranda çıkan mesajı
  okuyun — genellikle hangi alanın eksik olduğunu söyler.
- Bir görsel yüklenmiyorsa, dosyanın JPG/PNG/WEBP formatında ve çok büyük
  olmadığından emin olun.
- Sayfa hiç açılmıyorsa veya "İçerik yönetim sistemi henüz
  yapılandırılmadı" mesajı görüyorsanız, geliştiricinizle iletişime geçin.
