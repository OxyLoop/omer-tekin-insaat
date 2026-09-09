import { companyInfo } from "@/data/company";
import { contactInfo } from "@/data/contact";
import { siteUrl } from "@/lib/paths";

// TODO: Telefon bilgisi netleşince "telephone" alanı eklenebilir.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: companyInfo.name,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nevzat Özsoy Caddesi No:27/B",
    addressLocality: "Yatağan",
    addressRegion: "Muğla",
    postalCode: "48500",
    addressCountry: "TR",
  },
  areaServed: companyInfo.location,
  sameAs: [contactInfo.instagram],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
