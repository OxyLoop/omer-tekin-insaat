import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase",
            light ? "text-charcoal/60" : "text-muted",
            align === "center" && "justify-center",
          )}
        >
          <span
            className={cn(
              "h-px w-8",
              light ? "bg-charcoal/40" : "bg-line-strong",
            )}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          light ? "text-charcoal" : "text-offwhite",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-charcoal/70" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
