import type { SiteSettingsContent } from "@/lib/sanity/content";
import { siteUrl } from "@/lib/paths";

interface StructuredDataProps {
  settings: SiteSettingsContent;
}

export default function StructuredData({ settings }: StructuredDataProps) {
  const { company, contact } = settings;

  // TODO: Telefon bilgisi netleşince "telephone" alanı eklenebilir.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.name,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressRegion: "Muğla",
      addressCountry: "TR",
    },
    areaServed: company.location,
    sameAs: [contact.instagram].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
