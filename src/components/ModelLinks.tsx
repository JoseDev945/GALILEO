import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/config/site";
import { byId, hrefOfPhoto, modelName, models, priceLabel } from "@/data/catalog";

/** Enlaces rápidos + tarjetas de modelos (foto, nombre, descripción). Se usa en el menú y en la sección de inicio. */
export function ModelLinks({ size = "menu" }: { size?: "menu" | "section" }) {
  const big = size === "section";
  return (
    <div className={`grid gap-8 ${big ? "lg:grid-cols-[220px_1fr]" : "grid-cols-[200px_1fr]"}`}>
      <div>
        <p className="font-serif text-xl font-extrabold uppercase">Enlaces rápidos</p>
        <ul className={`mt-5 text-[17px] ${big ? "flex flex-wrap gap-x-6 gap-y-3 lg:block lg:space-y-4" : "space-y-4"}`}>
          <li><a href={whatsappLink("Hola, quiero cotizar un bote.")} target="_blank" rel="noopener noreferrer" className="hover:text-teal">Cotizar por WhatsApp</a></li>
          <li><Link href="/galeria/pesca" className="hover:text-teal">Galería de pesca</Link></li>
          <li><Link href="/galeria/turismo" className="hover:text-teal">Galería de turismo</Link></li>
          <li><Link href="/galeria/deportivas" className="hover:text-teal">Lanchas deportivas</Link></li>
        </ul>
      </div>
      <ul className={`grid gap-4 ${big ? "md:grid-cols-2" : "grid-cols-2"}`}>
        {/* Una tarjeta por cada bote distinto del modelo (la Galileo tiene dos) */}
        {models.flatMap((m) => (m.boatCovers ?? [m.cover]).map((id) => ({ m, p: byId(id), href: hrefOfPhoto(m, id) }))).map(({ m, p, href }) => {
          return (
            <li key={p.id}>
              <Link href={href} className={`group/card flex h-full gap-5 rounded-2xl border border-line bg-paper p-3 transition-colors hover:border-teal ${big ? "flex-col sm:flex-row sm:items-center" : "items-center"}`}>
                <Image
                  src={p.src}
                  alt={big ? p.alt : ""}
                  width={big ? 640 : 176}
                  height={big ? 360 : 112}
                  sizes={big ? "(min-width: 640px) 192px, 100vw" : "144px"}
                  placeholder={big ? "blur" : "empty"}
                  blurDataURL={p.blur}
                  className={`shrink-0 rounded-xl object-cover ${big ? "aspect-[16/9] h-auto w-full sm:aspect-auto sm:h-32 sm:w-48" : "h-24 w-36"}`}
                />
                <span className={`min-w-0 ${big ? "px-1 pb-1 sm:p-0" : ""}`}>
                  <span className="block text-lg font-semibold underline decoration-1 underline-offset-4 group-hover/card:text-teal">{modelName(m.slug)}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-mist">{m.summary}</span>
                  {big && (
                    <span className="mt-2 block text-sm font-semibold">
                      {m.priceFrom ? `Desde ${priceLabel(m)}` : "Precio a cotizar"}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
