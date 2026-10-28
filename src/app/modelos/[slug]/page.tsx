import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ModelCard } from "@/components/ModelCard";
import { ModelTitle } from "@/components/ModelTitle";
import { PaymentInfo } from "@/components/PaymentInfo";
import { byId, modelBySlug, modelName, models, photosOfModel, priceLabel } from "@/data/catalog";
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
    title: `Panga ${name}: ${m.badge.toLowerCase()}`,
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
    name: `Panga ${name}`,
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
        <Image src={cover.src} alt={cover.alt} fill priority placeholder="blur" blurDataURL={cover.blur} sizes="100vw" quality={90} className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/50 to-night/10" />
        <div className="mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-4 pb-14 pt-32 sm:px-6">
          <nav aria-label="Ruta" className="mb-6 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Inicio</Link> / <Link href="/#modelos" className="hover:text-white">Modelos</Link> / <span className="text-white">{name}</span>
          </nav>
          <span className="inline-block w-fit rounded-full bg-teal px-4 py-1.5 text-sm font-semibold">{m.badge}</span>
          <h1 className="mt-5 text-[clamp(2.8rem,7vw,5.25rem)]"><ModelTitle m={m} /></h1>
          <p className="mt-5 max-w-xl text-lg text-white/90 sm:text-xl">{m.summary}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl font-extrabold">Sobre este modelo</h2>
            <p className="mt-4 text-lg leading-relaxed text-mist">{m.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-y-6 border-y border-line py-6 sm:grid-cols-4">
              {m.specs.map((s) => (
                <div key={s.label}>
                  <dt className="eyebrow text-mist">{s.label}</dt>
                  <dd className="mt-1 text-xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="h-fit rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <p className="eyebrow text-mist">{m.priceFrom ? "Desde" : "Precio"}</p>
            <p className="mt-1 text-4xl font-bold">{priceLabel(m)}</p>
            {m.priceNote && <p className="mt-2 text-mist">{m.priceNote}</p>}
            <p className="mt-4 text-sm text-mist">Precio referencial del casco en fibra. Te confirmamos el precio final por escrito.</p>
            <div className="mt-6 flex flex-col gap-3">
              <a href={whatsappLink(`Hola, quiero cotizar el modelo ${name}.`)} target="_blank" rel="noopener noreferrer" className="btn bg-teal text-white hover:bg-teal-600">
                Cotizar por WhatsApp
              </a>
            </div>
            <PaymentInfo className="mt-6 !p-4" />
          </aside>
        </div>
      </section>

      {list.length > 0 && (
        <section className="bg-paper">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
            <h2 className="font-serif text-3xl font-extrabold">Fotos de la {name}</h2>
            <div className="mt-8"><Gallery photos={list} priorityCount={0} /></div>
          </div>
        </section>
      )}

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
