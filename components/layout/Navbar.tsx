"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/lib/paths";
import { buildNavLinks } from "./nav-links";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "@/components/theme/ThemeToggle";
import type { NavLabels } from "@/lib/sanity/content";
import type { ContactInfo } from "@/types";

interface NavbarProps {
  nav: NavLabels;
  contact: ContactInfo;
  logoUrl?: string;
  companyShortName?: string;
}

export default function Navbar({ nav, contact, logoUrl, companyShortName = "ÖMER TEKİN" }: NavbarProps) {
  const navLinks = buildNavLinks(nav);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ana sayfa ve proje detay sayfaları, navbar'ın üzerinde durduğu tam genişlikte
  // bir mimari fotoğraf ile açılır. Bu fotoğraflar her iki temada da kasıtlı
  // olarak koyu kalır (bkz. globals.css "ink" ailesi); bu yüzden navbar henüz
  // kaydırılmamışken (fotoğrafın üzerindeyken) metin rengi de sabit açık
  // kalmalı — aksi halde aydınlık modda koyu metin, koyu fotoğrafın üzerinde
  // kaybolur. Diğer sayfalarda üst bant tema-duyarlı olduğundan navbar da
  // normal şekilde temayla birlikte değişebilir.
  const hasPhotoHero =
    pathname === "/" || (pathname.startsWith("/projeler/") && pathname !== "/projeler/");

  const solid = scrolled || menuOpen;
  const useFixedLightText = hasPhotoHero && !solid;

  // Yönetim paneli (/admin) kendi tam ekran arayüzünü kullanır; herkese açık
  // site navbar'ı orada gösterilmez.
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-line bg-charcoal/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {useFixedLightText && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/70 to-transparent"
            aria-hidden="true"
          />
        )}
        <nav
          className="container-site flex h-20 items-center justify-between md:h-24"
          aria-label="Ana navigasyon"
        >
          <Link href="/" className="relative z-10 flex items-center gap-3" aria-label="Ömer Tekin Mühendislik ve İnşaat - Ana Sayfa">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1a1b1e] p-1.5 sm:h-11 sm:w-11">
              <Image
                src={logoUrl || getAssetPath("/logo.png")}
                alt="Ömer Tekin Mühendislik ve İnşaat logosu"
                width={44}
                height={44}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className={cn("text-sm font-semibold tracking-wide", useFixedLightText ? "text-on-ink" : "text-offwhite")}>
                {companyShortName}
              </span>
              <span className={cn("text-[10px] tracking-[0.2em] uppercase", useFixedLightText ? "text-on-ink-muted" : "text-muted")}>
                Mühendislik | İnşaat
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                      useFixedLightText
                        ? isActive
                          ? "text-on-ink"
                          : "text-on-ink-muted hover:text-on-ink"
                        : isActive
                          ? "text-offwhite"
                          : "text-muted hover:text-offwhite",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                        useFixedLightText ? "bg-on-ink" : "bg-offwhite",
                        isActive && "scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle
              className={cn(
                "h-9 w-9 rounded-md border transition-colors duration-300",
                useFixedLightText
                  ? "border-ink-line-strong text-on-ink hover:border-on-ink"
                  : "border-line-strong text-offwhite hover:border-offwhite",
              )}
              iconClassName="h-4 w-4"
            />
            <Link
              href="/iletisim"
              className={cn(
                "hidden border px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 lg:inline-flex",
                useFixedLightText
                  ? "border-ink-line-strong text-on-ink hover:border-on-ink"
                  : "border-line-strong text-offwhite hover:border-offwhite",
              )}
            >
              {nav.contactCta}
            </Link>
            <button
              type="button"
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span
                className={cn(
                  "h-px w-6 transition-transform duration-300",
                  useFixedLightText ? "bg-on-ink" : "bg-offwhite",
                  menuOpen && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-6 transition-transform duration-300",
                  useFixedLightText ? "bg-on-ink" : "bg-offwhite",
                  menuOpen && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
        navLinks={navLinks}
        contact={contact}
      />
    </>
  );
}
