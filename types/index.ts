export type ProjectStatus = "completed" | "ongoing";

export interface ProjectImage {
  src: string;
  alt: string;
  /** CSS object-position value (ör. "60% 40%") — ana obje kadraj dışına taşarsa kullanılır. */
  objectPosition?: string;
}

export interface Project {
  id: number;
  slug: string;
  name: string;
  location: string;
  year: string;
  category: string;
  status: ProjectStatus;
  description: string;
  summary: string;
  coverImage: string;
  /** Kapak görseli için CSS object-position değeri (ör. "center 40%"). */
  coverImageObjectPosition?: string;
  images: ProjectImage[];
  area?: string;
  client?: string;
  featured?: boolean;
}

export interface Service {
  id: number;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  longDescription: string;
}

export interface Stat {
  id: number;
  value: string;
  label: string;
  isPlaceholder: boolean;
}

export interface CompanyValue {
  title: string;
  description: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  address: string;
  workingHours: {
    days: string;
    hours: string;
  };
  mapsEmbedUrl: string;
}
