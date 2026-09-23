import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import StructuredData from "@/components/seo/StructuredData";
import ThemeScript from "@/components/theme/ThemeScript";
import { getServices } from "@/lib/sanity/content";
import { getSiteSettings } from "@/lib/sanity/content";
import { siteUrl, getAssetPath } from "@/lib/paths";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo, company } = await getSiteSettings();
  const title = seo.title || `${company.name} | ${company.location}`;
  const description = seo.description || "";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${company.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: company.name,
      locale: "tr_TR",
      type: "website",
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    icons: {
      icon: getAssetPath("/logo.png"),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  return (
    <html lang="tr" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-charcoal text-offwhite">
        <ThemeScript />
        <StructuredData settings={settings} />
        <Navbar
          nav={settings.nav}
          contact={settings.contact}
          logoUrl={settings.company.logoUrl}
          companyShortName={settings.company.shortName}
        />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} services={services} />
        <WhatsAppButton whatsapp={settings.contact.whatsapp} />
      </body>
    </html>
  );
}
