import { ContactInfo } from "@/types";

// TODO: Replace with real company information.
// Tüm iletişim bilgileri bu dosyadan yönetilir. Gerçek bilgiler netleştiğinde
// yalnızca bu dosyayı güncellemeniz yeterlidir.
export const contactInfo: ContactInfo = {
  phone: "+905XXXXXXXXX",
  phoneDisplay: "+90 5XX XXX XX XX",
  whatsapp: "905XXXXXXXXX",
  email: "info@omertekin.com",
  instagram: "https://instagram.com/omertekininsaat",
  instagramHandle: "@omertekininsaat",
  address: "[Adres bilgisi buraya gelecek]",
  workingHours: {
    days: "Pazartesi – Cumartesi",
    hours: "09:00 – 18:00",
  },
  // TODO: Replace with real company information. Şirket adresi netleştiğinde
  // Google Maps üzerinden alınacak "Haritayı Yerleştir" embed linki ile değiştirin.
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24112.977!2d29.0!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOcKwMDAnMDAuMCJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str",
};

export const whatsappDefaultMessage =
  "Merhaba, Ömer Tekin Mühendislik ve İnşaat hakkında bilgi almak istiyorum.";

export function getWhatsAppLink(message: string = whatsappDefaultMessage) {
  return `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}
