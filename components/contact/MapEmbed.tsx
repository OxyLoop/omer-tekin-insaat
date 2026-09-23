interface MapEmbedProps {
  mapsEmbedUrl: string;
  className?: string;
  title?: string;
}

export default function MapEmbed({ mapsEmbedUrl, className, title = "Konum haritası" }: MapEmbedProps) {
  return (
    <div className={className}>
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
