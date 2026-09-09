import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import StructuredData from "@/components/seo/StructuredData";
import ThemeScript from "@/components/theme/ThemeScript";
import { siteUrl, getAssetPath } from "@/lib/paths";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ömer Tekin Mühendislik ve İnşaat | Yatağan, Muğla",
    template: "%s | Ömer Tekin Mühendislik ve İnşaat",
  },
  description:
    "Ömer Tekin Mühendislik ve İnşaat; Yatağan, Muğla'da mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim proje ve tadilat hizmetleri sunmaktadır.",
  openGraph: {
    title: "Ömer Tekin Mühendislik ve İnşaat | Yatağan, Muğla",
    description:
      "Ömer Tekin Mühendislik ve İnşaat; Yatağan, Muğla'da mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim proje ve tadilat hizmetleri sunmaktadır.",
    url: siteUrl,
    siteName: "Ömer Tekin Mühendislik ve İnşaat",
    locale: "tr_TR",
    type: "website",
  },
  icons: {
    icon: getAssetPath("/logo.png"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-charcoal text-offwhite">
        <ThemeScript />
        <StructuredData />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
