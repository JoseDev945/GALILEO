import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ModelCard } from "@/components/ModelCard";
import { ModelTitle } from "@/components/ModelTitle";
import { PaymentInfo } from "@/components/PaymentInfo";
import { WaIcon } from "@/components/WaIcon";
import { byId, modelBySlug, ofName, theName, modelName, models, photosOfModel, priceLabel, useLabel } from "@/data/catalog";
import { site, whatsappLink } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = modelBySlug(slug);
  if (!m) return {};
  const p = byId(m.cover);
  const name = modelName(m.slug);
  return {
    title: `${m.kind ?? "Panga"} ${name}: bote de fibra de vidrio en Panamá`,
    description: `${m.summary} ${m.priceFrom ? `Desde ${priceLabel(m)}.` : "Precio a cotizar."} Fabricada a mano en Panamá.`,
    alternates: { canonical: `/modelos/${m.slug}` },
    openGraph: { title: `${name} | ${site.name}`, description: m.summary, images: [{ url: p.src, width: p.width, height: p.height, alt: p.alt }] },
  };
}

export default async function ModeloPage({ params }: Props) {
  const { slug } = await params;
  const m = modelBySlug(slug);
  if (!m) notFound();
  const cover = byId(m.cover);
  const list = photosOfModel(m.slug).map((p) => ({ ...p, modelLabel: modelName(p.model) }));
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
      ? { offers: { "@type": "Offer", price: m.priceFrom, priceCurrency: "USD", availability: "https://schema.org/MadeToOrder", url: `${site.url}/modelos/${m.slug}` } }
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
            <div className="mt-8"><Gallery photos={list} priorityCount={2} /></div>
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
