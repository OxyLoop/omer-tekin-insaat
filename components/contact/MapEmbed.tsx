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
        className="h-full w-full grayscale-[40%] contrast-[1.05] invert-[92%] hue-rotate-180"
        style={{ border: 0 }}
      />
    </div>
  );
}
