import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { navLinks } from "./nav-links";
import { contactInfo } from "@/data/contact";
import { companyInfo } from "@/data/company";
import { services } from "@/data/services";
import { getAssetPath } from "@/lib/paths";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-charcoal-dark">
      <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr] lg:gap-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={getAssetPath("/logo.png")}
              alt="Ömer Tekin Mühendislik ve İnşaat logosu"
              width={48}
              height={48}
              className="h-11 w-11 object-contain"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide text-offwhite">
                ÖMER TEKİN
              </span>
              <span className="text-[10px] tracking-[0.2em] text-muted uppercase">
                Mühendislik | İnşaat
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            {companyInfo.name}; mühendislik, müteahhitlik, kat karşılığı inşaat,
            anahtar teslim proje ve tadilat hizmetleri sunmaktadır.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-xs font-semibold tracking-[0.2em] text-offwhite uppercase">
            Site Haritası
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted transition-colors hover:text-offwhite">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xs font-semibold tracking-[0.2em] text-offwhite uppercase">
            Hizmetler
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {services.slice(0, 5).map((service) => (
              <li key={service.id}>
                <Link
                  href={`/hizmetler#${service.slug}`}
                  className="text-muted transition-colors hover:text-offwhite"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xs font-semibold tracking-[0.2em] text-offwhite uppercase">
            İletişim
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-muted">
            <li>
              <a href={`tel:${contactInfo.phone}`} className="flex items-start gap-3 transition-colors hover:text-offwhite">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {contactInfo.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactInfo.email}`} className="flex items-start gap-3 transition-colors hover:text-offwhite">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{contactInfo.address}</span>
            </li>
            <li>
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-offwhite"
              >
                <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {contactInfo.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {currentYear} {companyInfo.name}. Tüm hakları saklıdır.
          </p>
          <p>Yatağan / Muğla</p>
        </div>
      </div>
    </footer>
  );
}
