import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  label?: string;
  className?: string;
}

export default function PlaceholderImage({
  label = "Proje Görseli",
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-charcoal-dark via-charcoal to-[#26272b] text-muted",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <Building2 className="h-8 w-8 opacity-40" strokeWidth={1.25} aria-hidden="true" />
      <span className="text-xs tracking-[0.2em] uppercase opacity-60">{label}</span>
    </div>
  );
}
