import type { NavLabels } from "@/lib/sanity/content";

export interface NavLink {
  href: string;
  label: string;
}

/**
 * Menü bağlantılarının hedef adresleri (route yapısı) TASARIM/mimari
 * kararıdır ve sabittir. Yalnızca görünen ETİKET metinleri, Site Ayarları
 * üzerinden yönetilebilir içeriktir (bkz. lib/sanity/content.ts NavLabels).
 */
export function buildNavLinks(nav: NavLabels): NavLink[] {
  return [
    { href: "/", label: nav.home },
    { href: "/hakkimizda", label: nav.about },
    { href: "/hizmetler", label: nav.services },
    { href: "/projeler", label: nav.projects },
    { href: "/iletisim", label: nav.contact },
  ];
}
