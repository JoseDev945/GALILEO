import raw from "./photos.json";
import { models, type Boat, type BoatModel, type Category, type Photo } from "./models";

export * from "./models";

export const photos = raw as Photo[];

export const byId = (id: string) => photos.find((p) => p.id === id)!;
/** Fotos de todos los modelos que sirven para ese uso (un bote puede estar en varias secciones). */
export const photosOf = (c: Category) => {
  const slugs = new Set(models.filter((m) => m.uses.includes(c)).map((m) => m.slug));
  return photos.filter((p) => p.category !== "proceso" && slugs.has(p.model));
};
export const photosOfModel = (slug: string) => photos.filter((p) => p.model === slug && p.category !== "proceso");

/** Un bote con sus fotos, su número («Bote 3») y la dirección de su sección. */
export type BoatView = Boat & { num: number; label: string; href: string; photos: Photo[]; cover: Photo };
/** Botes del modelo que tienen fotos. El primero se ve en /modelos/{modelo}; los demás en /modelos/{modelo}/{bote}. */
export const boatsOf = (m: BoatModel): BoatView[] =>
  (m.boats ?? [])
    .map((b, i) => {
      const list = photosOfModel(m.slug).filter((p) => p.boat === b.id);
      return {
        ...b,
        num: i + 1,
        label: b.name ? `Bote ${i + 1} · ${b.name}` : `Bote ${i + 1}`,
        href: i === 0 ? `/modelos/${m.slug}` : `/modelos/${m.slug}/${b.id}`,
        photos: list,
        cover: list[0],
      };
    })
    .filter((b) => b.photos.length > 0);
/** Dirección de la sección del bote al que pertenece una foto (o la del modelo si no tiene bote). */
export const hrefOfPhoto = (m: BoatModel, photoId: string) =>
  boatsOf(m).find((b) => b.id === byId(photoId).boat)?.href ?? `/modelos/${m.slug}`;
