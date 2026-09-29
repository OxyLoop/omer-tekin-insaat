import "server-only";

import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/sanity/content";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/**
 * Bir sayfanın openGraph meta verisini üretir.
 *
 * Next.js, sayfada tanımlanan `openGraph` nesnesini layout'takiyle
 * BİRLEŞTİRMEZ, tamamen değiştirir. Bu yüzden site genelindeki ortak
 * değerler (siteName, locale, type, varsayılan görsel) burada tekrar eklenir
 * ve sayfaya özel `url` verilir. `url` göreli yazılır; layout'taki
 * metadataBase ile mutlak adrese çözümlenir. og:title ve og:description
 * belirtilmezse Next.js bunları sayfanın kendi title/description değerinden
 * alır.
 */
export async function pageOpenGraph(path: string, overrides: OpenGraph = {}): Promise<OpenGraph> {
  const { seo, company } = await getSiteSettings();
  return {
    siteName: company.name,
    locale: "tr_TR",
    type: "website",
    images: seo.ogImage ? [seo.ogImage] : undefined,
    url: path,
    ...overrides,
  };
}
