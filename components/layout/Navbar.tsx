"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/lib/paths";
import { navLinks } from "./nav-links";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || menuOpen
            ? "border-b border-line bg-charcoal/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          className="container-site flex h-20 items-center justify-between md:h-24"
          aria-label="Ana navigasyon"
        >
          <Link href="/" className="relative z-10 flex items-center gap-3" aria-label="Ömer Tekin Mühendislik ve İnşaat - Ana Sayfa">
            <Image
              src={getAssetPath("/logo.png")}
              alt="Ömer Tekin Mühendislik ve İnşaat logosu"
              width={44}
              height={44}
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
              priority
            />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-wide text-offwhite">
                ÖMER TEKİN
              </span>
              <span className="text-[10px] tracking-[0.2em] text-muted uppercase">
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
                      isActive ? "text-offwhite" : "text-muted hover:text-offwhite",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-offwhite transition-transform duration-300 group-hover:scale-x-100",
                        isActive && "scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/iletisim"
              className="hidden border border-line-strong px-5 py-2.5 text-sm font-medium tracking-wide text-offwhite transition-colors duration-300 hover:border-offwhite lg:inline-flex"
            >
              İletişime Geç
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
                  "h-px w-6 bg-offwhite transition-transform duration-300",
                  menuOpen && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-6 bg-offwhite transition-transform duration-300",
                  menuOpen && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}
