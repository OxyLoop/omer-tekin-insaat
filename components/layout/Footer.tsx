"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { buildNavLinks } from "./nav-links";
import { getAssetPath } from "@/lib/paths";
import type { SiteSettingsContent } from "@/lib/sanity/content";
import type { Service } from "@/types";

interface FooterProps {
  settings: SiteSettingsContent;
  services: Service[];
}

export default function Footer({ settings, services }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const navLinks = buildNavLinks(settings.nav);
  const { contact, company, footer } = settings;

  // Yönetim paneli (/admin) kendi tam ekran arayüzünü kullanır; herkese açık
  // site footer'ı orada gösterilmez.
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-line bg-charcoal-dark">
      <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr] lg:gap-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#1a1b1e] p-1.5">
              <Image
                src={company.logoUrl || getAssetPath("/logo.png")}
                alt={`${company.name} logosu`}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide text-offwhite">
                {company.shortName}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-muted uppercase">
                Mühendislik | İnşaat
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{footer.description}</p>
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
              <a href={`tel:${contact.phone}`} className="flex items-start gap-3 transition-colors hover:text-offwhite">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-start gap-3 transition-colors hover:text-offwhite">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{contact.address}</span>
            </li>
            <li>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-offwhite"
              >
                <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {contact.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {currentYear} {company.name}. {footer.copyrightSuffix}
          </p>
          <p>{company.location}</p>
        </div>
      </div>
    </footer>
  );
}
