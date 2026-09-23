import type { SanityImageSource } from "@sanity/image-url";

export type SanityGalleryImage = SanityImageSource & {
  alt?: string;
};

export interface SanitySeo {
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface SanityStatItem {
  id: string;
  value: string;
  label: string;
}

export interface SanityValueItem {
  id: string;
  title: string;
  description: string;
}

export interface SanitySocialLink {
  platform: string;
  url: string;
}

export interface SanitySiteSettings {
  companyName?: string;
  shortName?: string;
  shortLocation?: string;
  foundedYear?: string;
  logo?: string;
  favicon?: string;
  navHomeLabel?: string;
  navAboutLabel?: string;
  navServicesLabel?: string;
  navProjectsLabel?: string;
  navContactLabel?: string;
  navContactCta?: string;
  phoneDisplay?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  mapsQuery?: string;
  workingDays?: string;
  workingHours?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  otherSocialLinks?: SanitySocialLink[];
  footerDescription?: string;
  copyrightSuffix?: string;
  defaultSeo?: SanitySeo;
}

export interface SanityHomePage {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityGalleryImage;
  ctaPrimaryLabel?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
  infoBlocks?: string[];
  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutBody?: string[];
  aboutImage?: SanityGalleryImage;
  showStats?: boolean;
  stats?: SanityStatItem[];
  qualityEyebrow?: string;
  qualityHeading?: string;
  qualityBody?: string;
  qualityImage?: SanityGalleryImage;
  ctaHeading?: string;
  ctaBody?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;
  seo?: SanitySeo;
}

export interface SanityAboutPage {
  heroTitle?: string;
  heroSubtitle?: string;
  philosophyHeading?: string;
  philosophyBody?: string[];
  philosophyImage?: SanityGalleryImage;
  showStats?: boolean;
  stats?: SanityStatItem[];
  founderName?: string;
  founderTitle?: string;
  founderEducation?: string;
  founderBio?: string;
  engineeringHeading?: string;
  engineeringBody?: string;
  values?: SanityValueItem[];
  seo?: SanitySeo;
}

export interface SanityService {
  id: string;
  title?: string;
  slug?: string;
  shortDescription?: string;
  longDescription?: string;
}

export interface SanityProject {
  id: string;
  name?: string;
  slug?: string;
  status?: "completed" | "ongoing";
  category?: string;
  location?: string;
  year?: string;
  area?: string;
  client?: string;
  summary?: string;
  description?: string;
  coverImage?: SanityGalleryImage;
  gallery?: SanityGalleryImage[];
  featured?: boolean;
  seo?: SanitySeo;
}
