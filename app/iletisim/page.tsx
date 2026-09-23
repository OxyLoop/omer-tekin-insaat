import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import { getWhatsAppLink } from "@/data/contact";
import { getSiteSettings } from "@/lib/sanity/content";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Projeleriniz ve mühendislik ihtiyaçlarınız için Ömer Tekin Mühendislik ve İnşaat ile iletişime geçin.",
};

export default async function IletisimPage() {
  const { contact } = await getSiteSettings();
  const mapsDirectionsUrl = contact.mapsDirectionsUrl;

  return (
    <div>
      <section className="border-b border-line bg-charcoal-dark pt-36 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-site">
          <span className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            <span className="h-px w-8 bg-line-strong" />
            Bize Ulaşın
          </span>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            İletişim
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Projeleriniz ve mühendislik ihtiyaçlarınız için bizimle iletişime
            geçebilirsiniz.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-8">
              <ul className="flex flex-col gap-6">
                <li className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                  <div>
                    <p className="text-xs tracking-[0.15em] text-muted uppercase">Adres</p>
                    <p className="mt-1 text-lg text-offwhite">{contact.address}</p>
                    <a
                      href={mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-stone underline underline-offset-4 transition-colors hover:text-offwhite"
                    >
                      Yol Tarifi Al
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <InstagramIcon className="mt-1 h-5 w-5 shrink-0 text-muted" />
                  <div>
                    <p className="text-xs tracking-[0.15em] text-muted uppercase">Instagram</p>
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-lg text-offwhite hover:opacity-70"
                    >
                      {contact.instagramHandle}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                  <div>
                    <p className="text-xs tracking-[0.15em] text-muted uppercase">Telefon</p>
                    <a href={`tel:${contact.phone}`} className="mt-1 block text-lg text-offwhite hover:opacity-70">
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="mt-1 h-5 w-5 shrink-0 fill-muted"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.32 4.94L2.05 22l5.29-1.38a9.9 9.9 0 0 0 4.7 1.19h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.11c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.58-.36.77-.36h.55c.18 0 .42-.03.65.5.24.55.8 1.9.87 2.04.07.14.11.3.02.49-.08.19-.13.3-.26.46-.13.16-.27.35-.39.47-.13.13-.26.27-.11.53.14.26.63 1.04 1.36 1.68.94.83 1.72 1.09 1.98 1.21.26.13.41.11.56-.06.16-.18.68-.79.86-1.06.18-.27.35-.22.59-.13.24.08 1.55.73 1.82.86.26.13.43.19.5.3.06.13.06.71-.18 1.39Z" />
                  </svg>
                  <div>
                    <p className="text-xs tracking-[0.15em] text-muted uppercase">WhatsApp</p>
                    <a
                      href={getWhatsAppLink(undefined, contact.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-lg text-offwhite hover:opacity-70"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                  <div>
                    <p className="text-xs tracking-[0.15em] text-muted uppercase">E-posta</p>
                    <a href={`mailto:${contact.email}`} className="mt-1 block text-lg text-offwhite hover:opacity-70">
                      {contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                  <div>
                    <p className="text-xs tracking-[0.15em] text-muted uppercase">Çalışma Saatleri</p>
                    <p className="mt-1 text-lg text-offwhite">
                      {contact.workingHours.days}
                      <br />
                      {contact.workingHours.hours}
                    </p>
                  </div>
                </li>
              </ul>

              <div className="h-72 border border-line sm:h-96">
                <MapEmbed mapsEmbedUrl={contact.mapsEmbedUrl} className="h-full w-full" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-line p-8 sm:p-10">
              <h2 className="mb-8 text-2xl font-semibold tracking-tight">Bize Yazın</h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
