import { Gallery } from "@/components/Gallery";
import { modelName, models, photos, type Category } from "@/data/catalog";

/** Lista de acordeones: un modelo por fila; al abrirlo se ven sus fotos de esa categoría. */
export function ModelAccordion({ category, openFirst = false }: { category: Category; openFirst?: boolean }) {
  const groups = models
    .map((m) => ({ m, list: m.uses.includes(category) ? photos.filter((p) => p.category !== "proceso" && p.model === m.slug) : [] }))
    .filter((g) => g.list.length > 0);

  return (
    <div className="space-y-4">
      {groups.map(({ m, list }, i) => (
        <details key={m.slug} open={openFirst && i === 0} className="group overflow-hidden rounded-2xl border border-[#c9cdd0] bg-[#dcdcdc] open:bg-[#e6e7e8]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-xl font-extrabold uppercase underline decoration-teal decoration-2 underline-offset-4 sm:text-3xl">
              {modelName(m.slug)}
            </span>
            <span className="flex items-center gap-4">
              <span className="hidden text-sm text-ink/75 sm:inline">{list.length} {list.length === 1 ? "foto" : "fotos"}</span>
              <span aria-hidden className="relative grid size-12 shrink-0 place-items-center rounded-full bg-[#bdbdbd] text-teal sm:size-14">
                <span className="absolute h-0.5 w-5 bg-current" />
                <span className="absolute h-5 w-0.5 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
              </span>
            </span>
          </summary>
          <div className="border-t border-[#c9cdd0] bg-white p-3 sm:p-7">
            <Gallery photos={list.map((p) => ({ ...p, modelLabel: modelName(p.model) }))} priorityCount={0} />
          </div>
        </details>
      ))}
    </div>
  );
}
