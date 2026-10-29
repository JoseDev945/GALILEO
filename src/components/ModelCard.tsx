import Image from "next/image";
import Link from "next/link";
import { byId, ofName, priceLabel, useLabel, type BoatModel } from "@/data/catalog";
import { ModelTitle } from "./ModelTitle";

export function ModelCard({ m, wide = false }: { m: BoatModel; wide?: boolean }) {
  const p = byId(m.cover);
  return (
    <article className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-white ${wide ? "md:col-span-2 md:flex-row" : ""}`}>
      <Link href={`/modelos/${m.slug}`} tabIndex={-1} aria-hidden className={`group relative block aspect-[16/9] overflow-hidden bg-night ${wide ? "md:aspect-auto md:min-h-[420px] md:w-1/2 md:shrink-0" : ""}`}>
        <Image src={p.src} alt={p.alt} fill placeholder="blur" blurDataURL={p.blur} sizes="(min-width: 768px) 50vw, 100vw" quality={90} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="eyebrow absolute left-4 top-4 rounded-full bg-night/85 px-3 py-1.5 text-white">{m.badge}</span>
      </Link>
      <div className={`flex flex-1 flex-col p-6 sm:p-8 ${wide ? "md:justify-center lg:p-10" : ""}`}>
        <h3 className="text-3xl sm:text-4xl">
          <Link href={`/modelos/${m.slug}`} className="hover:text-teal">
            <ModelTitle m={m} />
          </Link>
        </h3>
        <p className="mt-3 text-mist">{m.summary}</p>

        <dl className="mt-6 grid grid-cols-2 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
          {m.specs.map((s) => (
            <div key={s.label}>
              <dt className="eyebrow text-mist">{s.label}</dt>
              <dd className="mt-1 text-lg">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1 text-mist">Uso</span>
          {m.uses.map((u) => (
            <Link key={u} href={`/galeria/${u}`} className="eyebrow rounded-full border border-teal px-3 py-1 text-teal hover:bg-teal hover:text-white">
              {useLabel[u]}
            </Link>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <div>
            <p className="eyebrow text-mist">{m.priceFrom ? "Desde" : "Precio"}</p>
            <p className="mt-1 text-xl font-semibold">{priceLabel(m)}</p>
          </div>
          <Link href={`/modelos/${m.slug}`} className="btn shrink-0 border border-ink/80 text-center hover:bg-ink hover:text-white" aria-label={`Ver fotos ${ofName(m.slug)}`}>
            Ver fotos<span className="hidden lg:inline">&nbsp;{ofName(m.slug)}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
