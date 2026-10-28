import type { Metadata } from "next";
import Link from "next/link";
import { GalleryHeader } from "@/components/GalleryHeader";
import { ModelAccordion } from "@/components/ModelAccordion";
import { categories, categoryOrder, photosOf, type Category } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Galería: botes para turismo, pesca y lanchas deportivas",
  description: "Fotos reales de pangas y lanchas de fibra de vidrio fabricadas en nuestro taller en Panamá: botes para turismo, botes para pesca y lanchas deportivas, por modelo.",
  alternates: { canonical: "/galeria" },
};

const order: Category[] = categoryOrder;

export default function GaleriaPage() {
  return (
    <>
      <GalleryHeader title="Galería de la flota" lead="Abre cada modelo para ver sus fotos. Toca cualquier foto para verla en grande." />
      {order.map((c, i) => (
        <section key={c} id={c} aria-labelledby={`t-${c}`} className={`scroll-mt-24 ${i > 0 ? "mt-20" : ""}`}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id={`t-${c}`} className="font-serif text-3xl font-extrabold sm:text-4xl">{categories[c].title}</h2>
              <p className="mt-2 max-w-2xl text-mist">{categories[c].lead} {photosOf(c).length} fotos.</p>
            </div>
            <Link href={`/galeria/${c}`} className="text-sm font-semibold text-teal underline underline-offset-4">Ver solo {categories[c].title.toLowerCase()}</Link>
          </div>
          <ModelAccordion category={c} />
        </section>
      ))}
    </>
  );
}
