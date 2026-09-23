import type { Metadata } from "next";
import StudioClient from "@/components/admin/StudioClient";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  description: "Ömer Tekin Mühendislik ve İnşaat içerik yönetim paneli.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// Statik export ile uyumlu olması için tek bir kabuk (shell) sayfa üretilir;
// Sanity Studio kendi iç yönlendirmesini (belge düzenleme, listeler vb.)
// tamamen istemci tarafında yönetir.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function AdminPage() {
  return <StudioClient />;
}
