import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { boatTitle, boatsOf, modelName, models, photos, type Category } from "@/data/catalog";

/**
 * Lista de acordeones: un modelo por fila. Al abrirlo se ven sus fotos separadas por bote
 * (como en las carpetas), cada grupo con un enlace a la sección de ese bote.
 */
export function ModelAccordion({ category, openFirst = false }: { category: Category; openFirst?: boolean }) {
  // Solo las fotos de esta sección: un bote con tina va en pesca y no se repite en turismo
  const groups = models
    .map((m) => {
      const inCat = (p: { category: string }) => p.category === category;
      const list = photos.filter((p) => p.model === m.slug && inCat(p));
      const boats = boatsOf(m)
        .map((b) => ({ ...b, photos: b.photos.filter(inCat) }))
        .filter((b) => b.photos.length > 0);
      return { m, list, boats: boats.length ? boats : [{ id: "todas", name: undefined, size: undefined, href: `/modelos/${m.slug}`, photos: list }] };
    })
    .filter((g) => g.list.length > 0);

  return (
    <div className="space-y-4">
      {groups.map(({ m, list, boats }, i) => (
        <details key={m.slug} open={openFirst && i === 0} className="group overflow-hidden rounded-2xl border border-[#c9cdd0] bg-[#dcdcdc] open:bg-[#e6e7e8]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-xl font-extrabold uppercase underline decoration-teal decoration-2 underline-offset-4 sm:text-3xl">
              {modelName(m.slug)}
            </span>
            <span className="flex items-center gap-4">
              <span className="hidden text-sm text-ink/75 sm:inline">
                {boats.length > 1 && `${boats.length} botes · `}
                {list.length} {list.length === 1 ? "foto" : "fotos"}
              </span>
              <span aria-hidden className="relative grid size-12 shrink-0 place-items-center rounded-full bg-[#bdbdbd] text-teal sm:size-14">
                <span className="absolute h-0.5 w-5 bg-current" />
                <span className="absolute h-5 w-0.5 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
              </span>
            </span>
          </summary>
          <div className="divide-y divide-line border-t border-[#c9cdd0] bg-white">
            {boats.map((b) => (
              <section key={b.id} aria-label={boatTitle(m, b)} className="p-3 sm:p-7">
                {b.id !== "todas" && (
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-serif text-lg font-extrabold sm:text-xl">
                      {boatTitle(m, b)}
                      <span className="ml-2 font-sans text-sm font-normal text-mist">{b.name && b.size ? `${b.size} · ` : ""}{b.photos.length} {b.photos.length === 1 ? "foto" : "fotos"}</span>
                    </h3>
                    <Link href={b.href} className="text-sm font-semibold text-teal underline underline-offset-4">Ver este bote</Link>
                  </div>
                )}
                <Gallery photos={b.photos.map((p) => ({ ...p, modelLabel: modelName(p.model) }))} priorityCount={0} />
              </section>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
