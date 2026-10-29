import raw from "./photos.json";
import { models, type Category, type Photo } from "./models";

export * from "./models";

export const photos = raw as Photo[];

export const byId = (id: string) => photos.find((p) => p.id === id)!;
/** Fotos de todos los modelos que sirven para ese uso (un bote puede estar en varias secciones). */
export const photosOf = (c: Category) => {
  const slugs = new Set(models.filter((m) => m.uses.includes(c)).map((m) => m.slug));
  return photos.filter((p) => p.category !== "proceso" && slugs.has(p.model));
};
export const photosOfModel = (slug: string) => photos.filter((p) => p.model === slug && p.category !== "proceso");
