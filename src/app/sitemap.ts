import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { models, photosOf, photosOfModel } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (p: string) => `${site.url}${p}`;
  return [
    { url: u("/"), lastModified: now, changeFrequency: "monthly", priority: 1, images: [u("/og.jpg")] },
    { url: u("/galeria"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: u("/galeria/pesca"), lastModified: now, changeFrequency: "monthly", priority: 0.9, images: photosOf("pesca").map((p) => u(p.src)) },
    { url: u("/galeria/turismo"), lastModified: now, changeFrequency: "monthly", priority: 0.9, images: photosOf("turismo").map((p) => u(p.src)) },
    { url: u("/galeria/deportivas"), lastModified: now, changeFrequency: "monthly", priority: 0.9, images: photosOf("deportivas").map((p) => u(p.src)) },
    ...models.map((m) => ({ url: u(`/modelos/${m.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8, images: photosOfModel(m.slug).map((p) => u(p.src)) })),
    { url: u("/privacidad"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/terminos"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
