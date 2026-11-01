import Image from "next/image";
import Link from "next/link";
import { byId, categories, modelName, ofName, theName, models, photos, photosOf, priceLabel } from "@/data/catalog";
import { site, whatsappLink } from "@/config/site";
import { Hero } from "@/components/Hero";
import { ModelTitle } from "@/components/ModelTitle";
import { ModelCard } from "@/components/ModelCard";
import { WhatsAppQuote } from "@/components/WhatsAppQuote";
import { SocialLinks } from "@/components/SocialLinks";
import { PaymentInfo } from "@/components/PaymentInfo";
import { LocationMap } from "@/components/LocationMap";

const steps = [
  { id: "proceso-molde-56", title: "Molde", text: "Cada modelo sale de un molde propio, encerado y revisado antes de cada casco." },
  { id: "proceso-laminado-57", title: "Laminado", text: "Capas de fibra de vidrio y resina, aplicadas a mano y compactadas con rodillo." },
  { id: "proceso-estructura-59", title: "Estructura", text: "Bancas, cuadernas y cajones se laminan al casco para darle rigidez." },
  { id: "proceso-gelcoat-27", title: "Gelcoat", text: "Acabado antideslizante en piso y bancas, resistente al sol y al agua salada." },
  { id: "proceso-consola-44", title: "Accesorios", text: "Consola, cajas de hielo o toldo, según el uso que le vayas a dar." },
  { id: "proceso-acabado-63", title: "Pintura y rótulo", text: "Colores, franjas y el nombre de tu bote pintado a mano. Luego, la entrega." },
];

export default function Home() {
  // Carrusel: todos los modelos, empezando por la Galileo (30.5 pies)
  const first = "galileo-30";
  const slides = [...models.filter((m) => m.slug === first), ...models.filter((m) => m.slug !== first)]
    .filter((m) => m.inHero !== false)
    .map((m) => ({
      model: m,
      name: modelName(m.slug),
      ofName: ofName(m.slug),
      photo: byId(m.heroCover ?? m.cover),
      price: m.priceFrom ? `Desde ${priceLabel(m)}` : "Precio a cotizar",
      eslora: m.specs.find((s) => s.label === "Largo" && !["Consultar", "A medida"].includes(s.value))?.value ?? "",
    }));
  const strip = ["corvina-18-08", "galileo-30-06", "galileo-24-01", "galileo-18-doble-realce-01", "corvina-14-02", "galileo-18-80"].map(byId);
  const total = photos.filter((p) => p.category !== "proceso").length;
  const sport = models.find((m) => m.slug === "rana-20")!;
  const sportCover = byId(sport.cover);
  const sportPhotos = photosOf("deportivas").filter((p) => p.model === sport.slug);

  return (
    <>
      <Hero slides={slides} />

      {/* LÍNEA DE MODELOS */}
      <section id="modelos" aria-labelledby="modelos-titulo" className="scroll-mt-20 bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-2xl">
            <h2 id="modelos-titulo" className="font-serif text-4xl font-extrabold sm:text-5xl">La línea</h2>
            <p className="mt-4 text-lg text-mist">
              Nueve modelos de botes, pangas y lanchas de fibra de vidrio, de 14 a 30 pies, fabricados en Panamá. Todos se fabrican sobre pedido con el largo, los colores y los accesorios que necesites.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {models.map((m, i) => (
              <ModelCard key={m.slug} m={m} wide={models.length % 2 === 1 && i === models.length - 1} />
            ))}
          </div>
          <p className="mt-6 text-sm text-mist">Precios referenciales en USD para el casco en fibra. El precio final y lo que incluye se confirman por escrito al cotizar.</p>
        </div>
      </section>

      {/* LANCHAS DEPORTIVAS */}
      <section id="deportivas" aria-labelledby="deportivas-titulo" className="scroll-mt-20 bg-night text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <span className="inline-block rounded-full bg-teal px-4 py-1.5 text-sm font-semibold">Nuevo</span>
          <h2 id="deportivas-titulo" className="mt-5 font-serif text-4xl font-extrabold sm:text-5xl">Lanchas deportivas</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/75">{categories.deportivas.lead}</p>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-3">
              <Link href={`/modelos/${sport.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-night-2">
                <Image src={sportCover.src} alt={sportCover.alt} fill placeholder="blur" blurDataURL={sportCover.blur} quality={90} sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </Link>
              <ul className="grid grid-cols-3 gap-3">
                {sportPhotos.filter((p) => p.id !== sportCover.id).slice(0, 3).map((p) => (
                  <li key={p.id} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-night-2">
                    <Link href="/galeria/deportivas" aria-label={`Ver en la galería: ${p.alt}`}>
                      <Image src={p.src} alt={p.alt} fill placeholder="blur" blurDataURL={p.blur} sizes="(min-width: 1024px) 19vw, 33vw" className="object-cover" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-4xl sm:text-5xl"><ModelTitle m={sport} light /></h3>
              <p className="mt-5 text-lg leading-relaxed text-white/80">{sport.description}</p>
              <dl className="mt-8 grid grid-cols-2 gap-y-5 border-y border-white/15 py-6">
                {sport.specs.map((sp) => (
                  <div key={sp.label}>
                    <dt className="eyebrow text-white/60">{sp.label}</dt>
                    <dd className="mt-1 text-xl">{sp.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappLink(`Hola, quiero cotizar la lancha deportiva ${modelName(sport.slug)}.`)} target="_blank" rel="noopener noreferrer" className="btn bg-teal text-white hover:bg-teal-600">
                  Cotizar por WhatsApp
                </a>
                <Link href={`/modelos/${sport.slug}`} className="btn border border-white text-white hover:bg-white hover:text-ink">Ver {theName(sport.slug)}</Link>
                <Link href="/galeria/deportivas" className="btn text-white underline underline-offset-4 hover:text-white/80">Ver fotos</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section id="proceso" aria-labelledby="proceso-titulo" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-2xl">
            <h2 id="proceso-titulo" className="font-serif text-4xl font-extrabold sm:text-5xl">Cómo trabajamos</h2>
            <p className="mt-4 text-lg text-mist">Del molde a la entrega, todo pasa por las mismas manos en nuestro taller.</p>
          </div>
          <ol className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => {
              const p = byId(s.id);
              return (
                <li key={s.id}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                    <Image src={p.src} alt={p.alt} fill placeholder="blur" blurDataURL={p.blur} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <h3 className="mt-5 flex items-baseline gap-3 font-serif text-2xl font-bold">
                    <span className="italic text-teal">{i + 1}</span>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-mist">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* GALERÍA (adelanto) */}
      <section aria-labelledby="galeria-titulo" className="bg-night text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 id="galeria-titulo" className="font-serif text-4xl font-extrabold sm:text-5xl">Galería</h2>
              <p className="mt-4 text-lg text-white/75">{total} fotos de botes que salieron de nuestro taller, separadas en turismo, pesca y lanchas deportivas.</p>
            </div>
            <Link href="/galeria" className="btn bg-teal text-white hover:bg-teal-600">Ver la galería</Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {strip.map((p) => (
              <li key={p.id} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-night-2">
                <Image src={p.src} alt={p.alt} fill placeholder="blur" blurDataURL={p.blur} sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" aria-labelledby="nosotros-titulo" className="scroll-mt-20 bg-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:py-24 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
            <Image src={byId("corvina-18-11").src} alt={byId("corvina-18-11").alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 id="nosotros-titulo" className="font-serif text-4xl font-extrabold sm:text-5xl">Acerca de {site.name}</h2>
            <p className="mt-6 text-lg leading-relaxed text-mist">
              Somos un taller de La Chorrera, Panamá Oeste, que fabrica botes y pangas de fibra de vidrio a mano. Trabajamos para pescadores artesanales que salen todos los días y para operadores de turismo que necesitan un bote seguro, cómodo y con su marca bien visible.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-mist">
              Cada bote se hace sobre pedido: eliges el modelo, el largo, los colores y el nombre, y nosotros lo laminamos, lo pintamos y lo rotulamos en nuestro taller.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" aria-labelledby="contacto-titulo" className="scroll-mt-20 border-t border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:py-24 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="contacto-titulo" className="font-serif text-4xl font-extrabold sm:text-5xl">Obtén tu cotización</h2>
            <p className="mt-4 max-w-md text-lg text-mist">Escríbenos por WhatsApp: te respondemos con precio y tiempo de entrega.</p>
            <dl className="mt-8 space-y-4">
              <div><dt className="eyebrow text-mist">WhatsApp</dt><dd className="mt-1 text-lg"><a href={whatsappLink("Hola, quiero cotizar un bote.")} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-teal">{site.phoneDisplay}</a></dd></div>
              <div><dt className="eyebrow text-mist">Correo</dt><dd className="mt-1 text-lg"><a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-teal">{site.email}</a></dd></div>
              <div><dt className="eyebrow text-mist">Taller</dt><dd className="mt-1 text-lg"><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-teal">{site.address.street}, {site.address.locality}, {site.address.region}</a></dd></div>
              {site.hours && <div><dt className="eyebrow text-mist">Horario</dt><dd className="mt-1 text-lg">{site.hours}</dd></div>}
            </dl>
            <div className="mt-8">
              <p className="eyebrow text-mist">Redes sociales</p>
              <SocialLinks variant="list" className="mt-3 text-lg" />
            </div>
            <PaymentInfo className="mt-8" />
          </div>
          <WhatsAppQuote />
        </div>
        <div id="ubicacion" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 lg:pb-24">
          <h2 className="font-serif text-3xl font-extrabold sm:text-4xl">Visita el taller</h2>
          <p className="mt-3 max-w-2xl text-lg text-mist">Puedes venir a ver los botes en construcción. Escríbenos antes por WhatsApp para coordinar tu visita.</p>
          <LocationMap className="mt-8" />
        </div>
      </section>
    </>
  );
}
