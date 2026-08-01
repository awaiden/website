import { MetadataRoute } from "next";

const locales = ["en", "tr", "es", "de", "fr", "it", "ja", "zh"];
const routes = ["", "/projects", "/about", "/stats", "/contact"];
const baseUrl = "https://awaiden.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" || route === "/projects" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
