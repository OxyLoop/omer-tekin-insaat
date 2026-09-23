import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId: projectId || "", dataset });

/** Sanity görsel referansından optimize edilmiş bir CDN URL'si üretir. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Sabit genişlikte, web formatına dönüştürülmüş, kaliteli bir görsel URL'si üretir. */
export function imageUrl(source: SanityImageSource | undefined | null, width = 1600): string | undefined {
  if (!source) return undefined;
  try {
    return urlFor(source).width(width).auto("format").fit("max").url();
  } catch {
    return undefined;
  }
}
