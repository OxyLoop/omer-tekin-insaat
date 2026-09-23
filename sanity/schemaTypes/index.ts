import { type SchemaTypeDefinition } from "sanity";

import seo from "./objects/seo";
import statItem from "./objects/statItem";
import valueItem from "./objects/valueItem";
import socialLink from "./objects/socialLink";
import galleryImage from "./objects/galleryImage";

import siteSettings from "./documents/siteSettings";
import homePage from "./documents/homePage";
import aboutPage from "./documents/aboutPage";
import service from "./documents/service";
import project from "./documents/project";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objeler
    seo,
    statItem,
    valueItem,
    socialLink,
    galleryImage,
    // Belgeler (Documents)
    siteSettings,
    homePage,
    aboutPage,
    service,
    project,
  ],
};

export const singletonTypes = new Set(["siteSettings", "homePage", "aboutPage"]);
