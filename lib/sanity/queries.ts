import { groq } from "next-sanity";

const seoFragment = /* groq */ `{
  title,
  description,
  "ogImage": ogImage.asset->url
}`;

const galleryImageFragment = /* groq */ `{
  "asset": asset,
  alt,
  hotspot
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  companyName,
  shortName,
  shortLocation,
  foundedYear,
  "logo": logo.asset->url,
  "favicon": favicon.asset->url,
  navHomeLabel,
  navAboutLabel,
  navServicesLabel,
  navProjectsLabel,
  navContactLabel,
  navContactCta,
  phoneDisplay,
  phone,
  whatsapp,
  email,
  address,
  mapsQuery,
  workingDays,
  workingHours,
  instagramUrl,
  instagramHandle,
  otherSocialLinks[]{ platform, url },
  footerDescription,
  copyrightSuffix,
  defaultSeo ${seoFragment}
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroImage ${galleryImageFragment},
  ctaPrimaryLabel,
  ctaPrimaryLink,
  ctaSecondaryLabel,
  ctaSecondaryLink,
  infoBlocks,
  aboutEyebrow,
  aboutHeading,
  aboutBody,
  aboutImage ${galleryImageFragment},
  showStats,
  stats[]{ "id": _key, value, label },
  qualityEyebrow,
  qualityHeading,
  qualityBody,
  qualityImage ${galleryImageFragment},
  ctaHeading,
  ctaBody,
  ctaButtonLabel,
  ctaButtonLink,
  seo ${seoFragment}
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  heroTitle,
  heroSubtitle,
  philosophyHeading,
  philosophyBody,
  philosophyImage ${galleryImageFragment},
  showStats,
  stats[]{ "id": _key, value, label },
  founderName,
  founderTitle,
  founderEducation,
  founderBio,
  engineeringHeading,
  engineeringBody,
  values[]{ "id": _key, title, description },
  seo ${seoFragment}
}`;

export const servicesQuery = groq`*[_type == "service" && active != false] | order(orderRank asc){
  "id": _id,
  title,
  "slug": slug.current,
  shortDescription,
  longDescription
}`;

const projectProjection = /* groq */ `{
  "id": _id,
  name,
  "slug": slug.current,
  status,
  category,
  location,
  year,
  area,
  client,
  summary,
  description,
  coverImage ${galleryImageFragment},
  gallery[] ${galleryImageFragment},
  featured,
  seo ${seoFragment}
}`;

export const projectsQuery = groq`*[_type == "project" && active != false] | order(orderRank asc) ${projectProjection}`;

export const featuredProjectsQuery = groq`*[_type == "project" && active != false && featured == true] | order(orderRank asc) [0...$limit] ${projectProjection}`;

export const projectBySlugQuery = groq`*[_type == "project" && active != false && slug.current == $slug][0] ${projectProjection}`;

export const projectSlugsQuery = groq`*[_type == "project" && active != false]{ "slug": slug.current }`;
