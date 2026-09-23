import { Clock, Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import MapEmbed from "@/components/contact/MapEmbed";
import type { ContactInfo } from "@/types";

interface ContactPreviewProps {
  contact: ContactInfo;
}

export default function ContactPreview({ contact }: ContactPreviewProps) {
  const items = [
    { icon: Phone, label: "Telefon", value: contact.phoneDisplay, href: `tel:${contact.phone}` },
    { icon: Mail, label: "E-posta", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: "Adres", value: contact.address, href: undefined },
    {
      icon: Clock,
      label: "Çalışma Saatleri",
      value: `${contact.workingHours.days} · ${contact.workingHours.hours}`,
      href: undefined,
    },
  ];

  return (
    <section className="section-y border-t border-line bg-charcoal-dark">
      <div className="container-site">
        <SectionHeading eyebrow="İletişim" title="Bir Projeniz mi Var?" align="center" className="mx-auto max-w-2xl" />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-10 border border-line p-8 sm:p-10">
              <ul className="flex flex-col gap-6">
                {items.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <div className="flex items-start gap-4">
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                      <div>
                        <p className="text-xs tracking-[0.15em] text-muted uppercase">{label}</p>
                        <p className="mt-1 text-base text-offwhite">{value}</p>
                      </div>
                    </div>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a href={href} className="transition-opacity hover:opacity-70">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="/iletisim" showArrow className="w-full sm:w-auto">
                  İletişim Sayfası
                </Button>
                <Button href={contact.instagram} external variant="secondary" className="w-full sm:w-auto">
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-80 border border-line lg:h-full lg:min-h-[420px]">
              <MapEmbed mapsEmbedUrl={contact.mapsEmbedUrl} className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
