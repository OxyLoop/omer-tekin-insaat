"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import PlaceholderImage from "./PlaceholderImage";
import { cn } from "@/lib/utils";
import { getAssetPath } from "@/lib/paths";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError" | "alt"> {
  alt: string;
  fallbackLabel?: string;
  wrapperClassName?: string;
}

export default function ImageWithFallback({
  fallbackLabel,
  wrapperClassName,
  className,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={cn("relative h-full w-full", wrapperClassName)}>
        <PlaceholderImage label={fallbackLabel} className="absolute inset-0" />
      </div>
    );
  }

  // next/image ile "unoptimized: true" kullanıldığında yerel görsellerin
  // src'sine basePath otomatik eklenmez (GitHub Pages alt yol desteği için
  // gereklidir), bu nedenle string yollar için manuel olarak ekliyoruz.
  const resolvedSrc = typeof src === "string" ? getAssetPath(src) : src;

  return (
    <div className={cn("relative h-full w-full", wrapperClassName)}>
      <Image
        {...props}
        src={resolvedSrc}
        alt={alt}
        className={className}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
