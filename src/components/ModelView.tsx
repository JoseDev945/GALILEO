import Image from "next/image";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ModelCard } from "@/components/ModelCard";
import { ModelTitle } from "@/components/ModelTitle";
import { PaymentInfo } from "@/components/PaymentInfo";
import { WaIcon } from "@/components/WaIcon";
import { boatsOf, byId, ofName, theName, modelName, models, photosOfModel, priceLabel, useLabel, type BoatModel, type BoatView } from "@/data/catalog";
import { site, whatsappLink } from "@/config/site";

/**
 * Página de un modelo. Si el modelo tiene botes separados, muestra solo las fotos de un bote
 * y debajo «Mismos modelos» con una tarjeta por cada otro bote, que lleva a su propia sección.
 */
export function ModelView({ m, boat }: { m: BoatModel; boat?: BoatView }) {
  const boats = boatsOf(m);
  const current = boat ?? boats[0];
  const cover = current ? current.cover : byId(m.cover);
  const list = (current ? current.photos : photosOfModel(m.slug)).map((p) => ({ ...p, modelLabel: modelName(p.model) }));
  const siblings = boats.filter((b) => b.id !== current?.id);
  const others = models.filter((o) => o.slug !== m.slug && o.uses.some((u) => m.uses.includes(u))).slice(0, 2);
  const name = modelName(m.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${m.kind ?? "Panga"} ${name}`,
    description: m.description,
    image: list.map((p) => `${site.url}${p.src}`),
    brand: { "@type": "Brand", name: site.name },
    category: "Embarcación de fibra de vidrio",
    ...(m.priceFrom
      ? { offers: { "@type": "Offer", price: m.priceFrom, priceCurrency: "USD", availability: "https://schema.org/MadeToOrder", url: `${site.url}${current?.href ?? `/modelos/${m.slug}`}` } }
      : {}),
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src={cover.src} alt={cover.alt} fill preload fetchPriority="high" loading="eager" placeholder="blur" blurDataURL={cover.blur} sizes="100vw" quality={90} className="-z-20 object-cover" />
        {/* Sombra suave solo abajo, para que el nombre se lea sin tapar el bote */}
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-night/70 to-transparent" />
        <div className="mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-4 pb-8 pt-24 sm:px-6 sm:pb-12 lg:min-h-[calc(100svh-74px)]">
          <h1 className="text-[clamp(2.6rem,7vw,5.25rem)] [text-shadow:0_2px_18px_rgb(0_0_0/0.55)]"><ModelTitle m={m} light /></h1>
        </div>
      </section>

      {/* 1. Fotos del modelo */}
      {list.length > 0 && (
        <section id="fotos" className="bg-paper">
          <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 sm:pt-14 lg:py-20">
            <h2 className="font-serif text-2xl font-extrabold sm:text-3xl">Fotos {ofName(m.slug)}</h2>
            <p className="mt-2 text-mist">Toca una foto para verla en grande y hacer zoom.</p>
            {current?.name && (
              <h3 className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-serif text-xl font-extrabold sm:text-2xl">
                {current.name}
                <span className="font-sans text-sm font-normal text-mist">· {list.length} {list.length === 1 ? "foto" : "fotos"}</span>
              </h3>
            )}
            <div className={current?.name ? "mt-4" : "mt-8"}><Gallery photos={list} priorityCount={2} /></div>

            {siblings.length > 0 && (
              <div className="mt-14 border-t border-line pt-10">
                <h3 className="font-serif text-2xl font-extrabold uppercase tracking-wide sm:text-3xl">Mismos modelos</h3>
                <p className="mt-2 text-mist">Otros botes {ofName(m.slug)} que hemos fabricado. Toca uno para ver sus fotos.</p>
                <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {siblings.map((b) => (
                    <li key={b.id}>
                      <Link href={b.href} className="group block h-full overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-teal">
                        <span className="relative block aspect-[4/3] overflow-hidden bg-night">
                          <Image src={b.cover.src} alt={b.cover.alt} fill placeholder="blur" blurDataURL={b.cover.blur} sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw" quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                        </span>
                        <span className="block p-4">
                          <span className="block font-serif text-lg font-extrabold leading-tight group-hover:text-teal">{b.name ?? `${modelName(m.slug)}`}</span>
                          <span className="mt-1 block text-sm text-mist">{b.photos.length} {b.photos.length === 1 ? "foto" : "fotos"} · Ver bote →</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 2. Datos del modelo */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
          <h2 className="font-serif text-3xl font-extrabold">Sobre este modelo</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-mist">{m.description}</p>
          <dl className="mt-8 grid grid-cols-2 gap-y-6 border-y border-line py-6 sm:grid-cols-4">
            {m.specs.map((s) => (
              <div key={s.label}>
                <dt className="eyebrow text-mist">{s.label}</dt>
                <dd className="mt-1 text-xl">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-1 text-mist">Uso</span>
            {m.uses.map((u) => (
              <Link key={u} href={`/galeria/${u}`} className="eyebrow rounded-full border border-teal px-3 py-1 text-teal hover:bg-teal hover:text-white">
                {useLabel[u]}
              </Link>
            ))}
          </p>
        </div>
      </section>

      {/* 3. Cotizar */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:py-20">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-extrabold">Cotiza {theName(m.slug)}</h2>
            <p className="eyebrow mt-6 text-mist">{m.priceFrom ? "Desde" : "Precio"}</p>
            <p className="mt-1 text-4xl font-bold">{priceLabel(m)}</p>
            {m.priceNote && <p className="mt-2 text-mist">{m.priceNote}</p>}
            <p className="mt-4 text-sm text-mist">Precio referencial del casco en fibra. Te confirmamos el precio final por escrito.</p>
            <a href={whatsappLink(`Hola, quiero cotizar el modelo ${name}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-6 w-full py-4 text-lg">
              <WaIcon size={22} />
              Cotizar por WhatsApp
            </a>
          </div>
          <PaymentInfo />
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
            <h2 className="font-serif text-3xl font-extrabold">Otros modelos</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {others.map((o) => <ModelCard key={o.slug} m={o} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
