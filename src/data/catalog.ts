import raw from "./photos.json";
import { modelName, models, type Boat, type BoatModel, type Category, type Photo } from "./models";

export * from "./models";

export const photos = raw as Photo[];

export const byId = (id: string) => photos.find((p) => p.id === id)!;
/** Fotos de todos los modelos que sirven para ese uso (un bote puede estar en varias secciones). */
export const photosOf = (c: Category) => {
  const slugs = new Set(models.filter((m) => m.uses.includes(c)).map((m) => m.slug));
  return photos.filter((p) => p.category !== "proceso" && slugs.has(p.model));
};
export const photosOfModel = (slug: string) => photos.filter((p) => p.model === slug && p.category !== "proceso");

/** Un bote con sus fotos, su posición en la lista y la dirección de su sección. */
export type BoatView = Boat & { num: number; href: string; photos: Photo[]; cover: Photo };
/** Botes del modelo que tienen fotos. El primero se ve en /modelos/{modelo}; los demás en /modelos/{modelo}/{bote}. */
export const boatsOf = (m: BoatModel): BoatView[] => {
  if (!m.boats?.length) return [];
  const all = photosOfModel(m.slug);
  const ids = new Set(m.boats.map((b) => b.id));
  // Fotos del modelo que todavía no tienen bote: van juntas al final
  const loose = all.filter((p) => !p.boat || !ids.has(p.boat));
  const list: Boat[] = loose.length ? [...m.boats, { id: "otras", name: "Más fotos" }] : m.boats;
  return list
    .map((b) => ({ b, photos: b.id === "otras" ? loose : all.filter((p) => p.boat === b.id) }))
    .filter((x) => x.photos.length > 0)
    .map(({ b, photos }, i) => ({
      ...b,
      num: i + 1,
      href: i === 0 ? `/modelos/${m.slug}` : `/modelos/${m.slug}/${b.id}`,
      photos,
      // La portada del modelo, si es de este bote; si no, su primera foto
      cover: photos.find((p) => p.id === m.cover) ?? photos[0],
    }));
};
/** Dirección de la sección del bote al que pertenece una foto (o la del modelo si no tiene bote). */
export const hrefOfPhoto = (m: BoatModel, photoId: string) =>
  boatsOf(m).find((b) => b.id === byId(photoId).boat)?.href ?? `/modelos/${m.slug}`;
/** Cómo se llama un bote en títulos y tarjetas: su nombre, o «Corvina de 14 pies» si no tiene. */
export const boatTitle = (m: BoatModel, b: Boat) =>
  b.name ?? (b.size ? `${modelName(m.slug)} de ${b.size}` : modelName(m.slug));
