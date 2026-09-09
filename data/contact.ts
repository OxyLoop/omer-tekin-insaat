import { ContactInfo } from "@/types";

const mapsQuery =
  "Konak Mahallesi Nevzat Özsoy Caddesi No:27/B Yatağan Muğla 48500";

// Tüm iletişim bilgileri bu dosyadan yönetilir. Gerçek bilgiler netleştiğinde
// yalnızca bu dosyayı güncellemeniz yeterlidir.
export const contactInfo: ContactInfo = {
  // TODO: Gerçek telefon numarası eklenecek. Değer girilene kadar bileşenler
  // (footer, navbar, iletişim sayfası) bu alanı otomatik olarak gizler.
  phone: null,
  phoneDisplay: null,
  // TODO: Gerçek WhatsApp numarası eklenecek. Değer girilene kadar yüzen
  // WhatsApp butonu ve ilgili linkler otomatik olarak gizlenir.
  whatsapp: null,
  // TODO: Gerçek e-posta adresi eklenecek.
  email: null,
  instagram: "https://www.instagram.com/omertekinmuhendislik/",
  instagramHandle: "@omertekinmuhendislik",
  address: "Konak Mahallesi, Nevzat Özsoy Caddesi No:27/B, 48500 Yatağan / Muğla",
  workingHours: {
    days: "Pazartesi – Cumartesi",
    hours: "09:00 – 18:00",
  },
  mapsQuery,
  // Google Maps API anahtarı gerektirmeyen, adres sorgusuna dayalı yerleştirme
  // linki. Koordinat uydurulmadı; doğrudan gerçek adres metni kullanılıyor.
  mapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`,
  mapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
};

export const whatsappDefaultMessage =
  "Merhaba, Ömer Tekin Mühendislik ve İnşaat hakkında bilgi almak istiyorum.";

/** WhatsApp numarası henüz tanımlı değilse null döner; çağıran taraf bu durumu ele almalıdır. */
export function getWhatsAppLink(message: string = whatsappDefaultMessage): string | null {
  if (!contactInfo.whatsapp) return null;
  return `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}
