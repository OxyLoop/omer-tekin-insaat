import { cn } from "@/lib/utils";

interface MapEmbedProps {
  mapsEmbedUrl: string;
  className?: string;
  title?: string;
}

export default function MapEmbed({ mapsEmbedUrl, className, title = "Konum haritası" }: MapEmbedProps) {
  return (
    // min-w-0: <iframe> elementinin tarayıcı varsayılanı (300px) içeriği,
    // bu div bir grid/flex öğesinin (dolaylı) alt öğesi olduğunda min-width:
    // auto nedeniyle üst kapsayıcıyı dar ekranlarda (320-360px) taşırıyordu.
    // min-w-0, bu içerik tabanlı minimum genişlik hesaplamasını burada keser.
    <div className={cn("min-w-0", className)}>
      <iframe
        src={mapsEmbedUrl}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
        style={{ border: 0, filter: "var(--raw-map-filter)" }}
      />
    </div>
  );
}
