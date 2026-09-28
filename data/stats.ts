import { Stat } from "@/types";

// Doğrulanmış gerçek istatistik değerleri henüz yoktur. Sahte/uydurma
// rakam göstermemek için bu diziler bilerek boş bırakılmıştır — Stats.tsx
// ve hakkimizda/page.tsx bileşenleri, dizi boşsa istatistik bölümünü
// tamamen gizler (bkz. `if (!stats.length) return null;`). Gerçek rakamlar
// belirlendiğinde buraya eklenebilir veya Sanity > Ana Sayfa/Hakkımızda >
// İstatistikler alanından girilebilir.
export const homeStats: Stat[] = [];

export const aboutStats: Stat[] = [];
