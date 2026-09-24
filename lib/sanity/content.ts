import "server-only";

import type { ContactInfo, PageSeo, Project, Service, Stat, CompanyValue } from "@/types";
import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";
import { imageUrl } from "./image";
import {
  aboutPageQuery,
  featuredProjectsQuery,
  homePageQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
  servicesQuery,
  siteSettingsQuery,
} from "./queries";
import type {
  SanityAboutPage,
  SanityGalleryImage,
  SanityHomePage,
  SanityProject,
  SanitySeo,
  SanitySiteSettings,
} from "./types";
import { coverObjectPositionBySlug, galleryObjectPositionBySlug } from "./object-position-overrides";

import { contactInfo as fallbackContactInfo } from "@/data/contact";
import { companyInfo as fallbackCompanyInfo, companyIntro as fallbackCompanyIntro, aboutPage as fallbackAboutPage, companyValues as fallbackCompanyValues, founder as fallbackFounder } from "@/data/company";
import { homeStats as fallbackHomeStats, aboutStats as fallbackAboutStats } from "@/data/stats";
import { services as fallbackServices } from "@/data/services";
import { projects as fallbackProjects, getFeaturedProjects as fallbackGetFeaturedProjects, getProjectBySlug as fallbackGetProjectBySlug } from "@/data/projects";

/**
 * Bu dosya, herkese açık sitenin TEK içerik erişim katmanıdır. Bileşenler
 * Sanity'yi doğrudan sorgulamaz — yalnızca bu fonksiyonların döndürdüğü,
 * mevcut TypeScript tiplerine (types/index.ts) uygun, sade veriyi kullanır.
 *
 * Sanity yapılandırılmamışsa veya derleme sırasında API'ye ulaşılamazsa,
 * her fonksiyon sorunsuz şekilde /data içindeki mevcut (gerçek) içeriğe
 * geri döner — böylece site asla boş/bozuk görünmez.
 */

async function safeFetch<T>(query: string, params: Record<string, unknown> | undefined, label: string): Promise<T | null> {
  if (!isSanityConfigured || !sanityClient) return null;
  try {
    const result = await sanityClient.fetch<T>(query, params ?? {});
    return result ?? null;
  } catch (error) {
    console.warn(`[sanity] "${label}" alınamadı, mevcut yedek içerik kullanılıyor.`, error);
    return null;
  }
}

function normalizeSeo(seo: SanitySeo | undefined): PageSeo | undefined {
  if (!seo) return undefined;
  return { title: seo.title, description: seo.description, ogImage: seo.ogImage };
}

function normalizeGalleryImage(
  image: SanityGalleryImage | undefined,
  fallbackSrc: string,
  fallbackAlt: string,
  objectPosition?: string,
) {
  // Not: burada getAssetPath() KULLANILMAZ. Yedek yollar, ImageWithFallback
  // bileşenine olduğu gibi (basePath eklenmeden) iletilir; basePath, o
  // bileşen içinde TEK SEFERDE eklenir. Burada da eklenirse yol iki kez
  // önekli olur (ör. /repo/repo/gorsel.png) ve görsel 404 verir.
  const src = imageUrl(image, 1600) ?? fallbackSrc;
  return {
    src,
    alt: image?.alt || fallbackAlt,
    objectPosition,
  };
}

// ---------------------------------------------------------------------------
// Site Ayarları (İletişim, Şirket, Navigasyon, Footer)
// ---------------------------------------------------------------------------

export interface NavLabels {
  home: string;
  about: string;
  services: string;
  projects: string;
  contact: string;
  contactCta: string;
}

export interface FooterContent {
  description: string;
  copyrightSuffix: string;
}

export interface CompanySettings {
  name: string;
  shortName: string;
  location: string;
  founded: string;
  logoUrl?: string;
  faviconUrl?: string;
}

export interface SiteSettingsContent {
  company: CompanySettings;
  contact: ContactInfo;
  nav: NavLabels;
  footer: FooterContent;
  seo: PageSeo;
}

function buildContactInfo(settings: SanitySiteSettings | null): ContactInfo {
  if (!settings) return fallbackContactInfo;

  const mapsQuery = settings.mapsQuery || fallbackContactInfo.mapsQuery;

  return {
    phone: settings.phone || fallbackContactInfo.phone,
    phoneDisplay: settings.phoneDisplay || fallbackContactInfo.phoneDisplay,
    whatsapp: settings.whatsapp || fallbackContactInfo.whatsapp,
    email: settings.email || fallbackContactInfo.email,
    instagram: settings.instagramUrl || fallbackContactInfo.instagram,
    instagramHandle: settings.instagramHandle || fallbackContactInfo.instagramHandle,
    address: settings.address || fallbackContactInfo.address,
    workingHours: {
      days: settings.workingDays || fallbackContactInfo.workingHours.days,
      hours: settings.workingHours || fallbackContactInfo.workingHours.hours,
    },
    mapsQuery,
    mapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`,
    mapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
  };
}

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  const settings = await safeFetch<SanitySiteSettings>(siteSettingsQuery, undefined, "siteSettings");

  return {
    company: {
      name: settings?.companyName || fallbackCompanyInfo.name,
      shortName: settings?.shortName || fallbackCompanyInfo.shortName,
      location: settings?.shortLocation || fallbackCompanyInfo.location,
      founded: settings?.foundedYear || fallbackCompanyInfo.founded,
      logoUrl: settings?.logo,
      faviconUrl: settings?.favicon,
    },
    contact: buildContactInfo(settings),
    nav: {
      home: settings?.navHomeLabel || "Ana Sayfa",
      about: settings?.navAboutLabel || "Hakkımızda",
      services: settings?.navServicesLabel || "Hizmetler",
      projects: settings?.navProjectsLabel || "Projeler",
      contact: settings?.navContactLabel || "İletişim",
      contactCta: settings?.navContactCta || "İletişime Geç",
    },
    footer: {
      description:
        settings?.footerDescription ||
        `${fallbackCompanyInfo.name}; mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim proje ve tadilat hizmetleri sunmaktadır.`,
      copyrightSuffix: settings?.copyrightSuffix || "Tüm hakları saklıdır.",
    },
    seo: normalizeSeo(settings?.defaultSeo) || {
      title: "Ömer Tekin Mühendislik ve İnşaat | Yatağan, Muğla",
      description:
        "Ömer Tekin Mühendislik ve İnşaat; Yatağan, Muğla'da mühendislik, müteahhitlik, kat karşılığı inşaat, anahtar teslim proje ve tadilat hizmetleri sunmaktadır.",
    },
  };
}

// ---------------------------------------------------------------------------
// Ana Sayfa
// ---------------------------------------------------------------------------

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  ctaPrimaryLabel: string;
  ctaPrimaryLink: string;
  ctaSecondaryLabel: string;
  ctaSecondaryLink: string;
  infoBlocks: string[];
}

export interface AboutSummaryContent {
  eyebrow: string;
  heading: string;
  body: string[];
  image: string;
}

export interface QualityStatementContent {
  eyebrow: string;
  heading: string;
  body: string;
  image: string;
}

export interface CtaContent {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonLink: string;
}

export interface StatsContent {
  show: boolean;
  items: Stat[];
}

export interface HomePageContent {
  hero: HeroContent;
  aboutSummary: AboutSummaryContent;
  stats: StatsContent;
  quality: QualityStatementContent;
  cta: CtaContent;
  seo: PageSeo;
}

export async function getHomePage(): Promise<HomePageContent> {
  const page = await safeFetch<SanityHomePage>(homePageQuery, undefined, "homePage");

  const hero: HeroContent = {
    eyebrow: page?.heroEyebrow || "Ömer Tekin Mühendislik & İnşaat",
    title: page?.heroTitle || "Sağlam Temeller.\nGüvenilir Yapılar.",
    subtitle:
      page?.heroSubtitle ||
      "Mühendislikten uygulamaya, projelerinizi güvenli ve nitelikli yapılara dönüştürüyoruz.",
    image: imageUrl(page?.heroImage, 2000) ?? "/hero-project.png",
    ctaPrimaryLabel: page?.ctaPrimaryLabel || "Projelerimizi İnceleyin",
    ctaPrimaryLink: page?.ctaPrimaryLink || "/projeler",
    ctaSecondaryLabel: page?.ctaSecondaryLabel || "İletişime Geçin",
    ctaSecondaryLink: page?.ctaSecondaryLink || "/iletisim",
    infoBlocks: page?.infoBlocks?.length ? page.infoBlocks : ["Mühendislik", "Müteahhitlik", "Anahtar Teslim", "Tadilat"],
  };

  const aboutSummary: AboutSummaryContent = {
    eyebrow: page?.aboutEyebrow || fallbackCompanyIntro.eyebrow,
    heading: page?.aboutHeading || fallbackCompanyIntro.heading,
    body: page?.aboutBody?.length ? page.aboutBody : fallbackCompanyIntro.body,
    image: imageUrl(page?.aboutImage, 1600) ?? "/corporate-engineering.png",
  };

  const stats: StatsContent = {
    show: Boolean(page?.showStats),
    items: page?.stats?.length
      ? page.stats.map((item) => ({ id: item.id, value: item.value, label: item.label, isPlaceholder: false }))
      : fallbackHomeStats,
  };

  const quality: QualityStatementContent = {
    eyebrow: page?.qualityEyebrow || "Mühendislik Anlayışımız",
    heading: page?.qualityHeading || "Her detayda mühendislik,\nher yapıda güven.",
    body:
      page?.qualityBody ||
      "Projelerimizi planlama, teknik gereklilikler ve uygulama kalitesini birlikte değerlendirerek ele alıyoruz. Amacımız yalnızca yapı üretmek değil, güvenli ve uzun ömürlü yaşam alanları ortaya koymaktır.",
    image: imageUrl(page?.qualityImage, 2000) ?? "/engineering-quality.png",
  };

  const cta: CtaContent = {
    heading: page?.ctaHeading || "Yeni projenizi birlikte hayata geçirelim.",
    body:
      page?.ctaBody ||
      "Projeniz hakkında konuşmak ve ihtiyaçlarınıza uygun çözümleri değerlendirmek için bizimle iletişime geçin.",
    buttonLabel: page?.ctaButtonLabel || "İletişime Geçin",
    buttonLink: page?.ctaButtonLink || "/iletisim",
  };

  return { hero, aboutSummary, stats, quality, cta, seo: normalizeSeo(page?.seo) || {} };
}

// ---------------------------------------------------------------------------
// Hakkımızda Sayfası
// ---------------------------------------------------------------------------

export interface FounderContent {
  name: string;
  title: string;
  education: string;
  bio: string;
}

export interface AboutPageContent {
  heroTitle: string;
  heroSubtitle: string;
  philosophyHeading: string;
  philosophyBody: string[];
  philosophyImage: string;
  stats: StatsContent;
  founder: FounderContent;
  engineeringHeading: string;
  engineeringBody: string;
  values: CompanyValue[];
  seo: PageSeo;
}

export async function getAboutPage(): Promise<AboutPageContent> {
  const page = await safeFetch<SanityAboutPage>(aboutPageQuery, undefined, "aboutPage");

  return {
    heroTitle: page?.heroTitle || fallbackAboutPage.heroTitle,
    heroSubtitle: page?.heroSubtitle || fallbackAboutPage.heroSubtitle,
    philosophyHeading: page?.philosophyHeading || fallbackAboutPage.philosophyHeading,
    philosophyBody: page?.philosophyBody?.length ? page.philosophyBody : fallbackAboutPage.philosophyBody,
    philosophyImage: imageUrl(page?.philosophyImage, 1600) ?? "/corporate-engineering.png",
    stats: {
      show: Boolean(page?.showStats),
      items: page?.stats?.length
        ? page.stats.map((item) => ({ id: item.id, value: item.value, label: item.label, isPlaceholder: false }))
        : fallbackAboutStats,
    },
    founder: {
      name: page?.founderName || fallbackFounder.name,
      title: page?.founderTitle || fallbackFounder.title,
      education: page?.founderEducation || fallbackFounder.education,
      bio: page?.founderBio || fallbackFounder.bio,
    },
    engineeringHeading: page?.engineeringHeading || fallbackAboutPage.engineeringHeading,
    engineeringBody: page?.engineeringBody || fallbackAboutPage.engineeringBody,
    values: page?.values?.length
      ? page.values.map((item) => ({ title: item.title, description: item.description }))
      : fallbackCompanyValues,
    seo: normalizeSeo(page?.seo) || {},
  };
}

// ---------------------------------------------------------------------------
// Hizmetler
// ---------------------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  const services = await safeFetch<Array<{ id: string; title: string; slug: string; shortDescription: string; longDescription: string }>>(
    servicesQuery,
    undefined,
    "services",
  );

  if (!services || services.length === 0) return fallbackServices;

  return services.map((service, index) => ({
    id: service.id,
    slug: service.slug,
    number: String(index + 1).padStart(2, "0"),
    title: service.title,
    shortDescription: service.shortDescription,
    longDescription: service.longDescription,
  }));
}

// ---------------------------------------------------------------------------
// Projeler
// ---------------------------------------------------------------------------

function normalizeProject(project: SanityProject): Project {
  const slug = project.slug || "";
  const galleryOverrides = galleryObjectPositionBySlug[slug];

  return {
    id: project.id,
    slug,
    name: project.name || "",
    location: project.location || "",
    year: project.year || "",
    category: project.category || "",
    status: project.status || "completed",
    summary: project.summary || "",
    description: project.description || "",
    coverImage: normalizeGalleryImage(project.coverImage, "/hero-project.png", `${project.name} kapak görseli`).src,
    coverImageObjectPosition: coverObjectPositionBySlug[slug],
    images: (project.gallery || []).map((image, index) =>
      normalizeGalleryImage(image, "/hero-project.png", `${project.name} galeri görseli ${index + 1}`, galleryOverrides?.[index]),
    ),
    area: project.area,
    client: project.client,
    featured: project.featured,
    seo: normalizeSeo(project.seo),
  };
}

export async function getProjects(): Promise<Project[]> {
  const projects = await safeFetch<SanityProject[]>(projectsQuery, undefined, "projects");
  if (!projects || projects.length === 0) return fallbackProjects;
  return projects.map(normalizeProject);
}

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  const projects = await safeFetch<SanityProject[]>(featuredProjectsQuery, { limit }, "featuredProjects");
  if (!projects || projects.length === 0) return fallbackGetFeaturedProjects(limit);
  return projects.map(normalizeProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const project = await safeFetch<SanityProject>(projectBySlugQuery, { slug }, "projectBySlug");
  if (!project) return fallbackGetProjectBySlug(slug);
  return normalizeProject(project);
}

export async function getProjectSlugs(): Promise<string[]> {
  const slugs = await safeFetch<Array<{ slug: string }>>(projectSlugsQuery, undefined, "projectSlugs");
  if (!slugs || slugs.length === 0) return fallbackProjects.map((project) => project.slug);
  return slugs.map((item) => item.slug).filter(Boolean);
}
