import { contactInfo } from "@/data/contact";

interface MapEmbedProps {
  className?: string;
  title?: string;
}

export default function MapEmbed({ className, title = "Konum haritası" }: MapEmbedProps) {
  return (
    <div className={className}>
      <iframe
        src={contactInfo.mapsEmbedUrl}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
        style={{ border: 0, filter: "var(--raw-map-filter)" }}
      />
    </div>
  );
}
