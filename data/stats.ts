import { Stat } from "@/types";

// TODO: Replace with real company information. Aşağıdaki tüm değerler yer tutucudur (placeholder).
// NOT: Gerçek rakamlar netleşene kadar bu istatistikler hiçbir sayfada
// render edilmiyor (bkz. app/page.tsx, app/hakkimizda/page.tsx). Veri yapısı
// ileride gerçek değerlerle kolayca yeniden bağlanabilmesi için korunmuştur.
export const homeStats: Stat[] = [
  {
    id: 1,
    value: "10+",
    label: "Tamamlanan Proje",
    isPlaceholder: true,
  },
  {
    id: 2,
    value: "XX.XXX m²",
    label: "Toplam İnşaat Alanı",
    isPlaceholder: true,
  },
  {
    id: 3,
    value: "XX+",
    label: "Yıllık Tecrübe",
    isPlaceholder: true,
  },
  {
    id: 4,
    value: "%100",
    label: "Mühendislik Odaklı",
    isPlaceholder: true,
  },
];

// TODO: Replace with real company information.
export const aboutStats: Stat[] = [
  {
    id: 1,
    value: "10+",
    label: "Tamamlanan Proje",
    isPlaceholder: true,
  },
  {
    id: 2,
    value: "XX+",
    label: "Yıllık Tecrübe",
    isPlaceholder: true,
  },
  {
    id: 3,
    value: "XX+",
    label: "Uzman Ekip Üyesi",
    isPlaceholder: true,
  },
];
