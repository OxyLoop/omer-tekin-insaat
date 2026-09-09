"use client";

import { useState } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Lightbox from "./Lightbox";
import { ProjectImage } from "@/types";

interface ProjectGalleryProps {
  images: ProjectImage[];
  projectName: string;
}

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-4/5 w-full overflow-hidden border border-line focus-visible:outline-2 focus-visible:outline-offwhite"
            aria-label={`${projectName} galerisini ${index + 1}. görselden aç`}
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
              fallbackLabel="Proje Görseli"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
