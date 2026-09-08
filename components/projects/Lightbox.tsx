"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { ProjectImage } from "@/types";

interface LightboxProps {
  images: ProjectImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const isOpen = index !== null;

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  if (!images.length) return null;
  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 flex flex-col bg-charcoal/97 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Proje görsel galerisi"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const delta = event.changedTouches[0].clientX - touchStartX.current;
            if (delta > 60) goPrev();
            if (delta < -60) goNext();
            touchStartX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <span className="text-sm tracking-widest text-stone tabular-nums">
              {String(index! + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Galeriyi kapat"
              className="flex h-10 w-10 items-center justify-center border border-line-strong text-offwhite transition-colors hover:border-offwhite"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-10">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Önceki görsel"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line-strong text-offwhite transition-colors hover:border-offwhite sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full max-h-[75vh] w-full max-w-5xl"
            >
              <ImageWithFallback
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                fallbackLabel="Proje Görseli"
              />
            </motion.div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Sonraki görsel"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line-strong text-offwhite transition-colors hover:border-offwhite sm:right-6"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
