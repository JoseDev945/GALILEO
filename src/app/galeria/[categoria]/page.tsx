import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryHeader } from "@/components/GalleryHeader";
import { ModelAccordion } from "@/components/ModelAccordion";
import { JsonLd } from "@/components/JsonLd";
import { byId, categories, categoryOrder, modelName, photosOf, type Category } from "@/data/catalog";
import { site, whatsappLink } from "@/config/site";

type Props = { params: Promise<{ categoria: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(categories).map((categoria) => ({ categoria }));
}

const isCategory = (c: string): c is Category => c in categories;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  if (!isCategory(categoria)) return {};
  const cat = categories[categoria];
  const img = byId(cat.heroId);
  return {
    title: `${cat.title} en Panamá | Galería`,
    description: `${cat.lead} Fotos reales de nuestro taller.`,
    alternates: { canonical: `/galeria/${categoria}` },
    openGraph: { title: `${cat.title} | ${site.name}`, description: cat.lead, images: [{ url: img.src, width: img.width, height: img.height, alt: img.alt }] },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  if (!isCategory(categoria)) notFound();
  const cat = categories[categoria];
  const list = photosOf(categoria).map((p) => ({ ...p, modelLabel: modelName(p.model) }));
  const others = categoryOrder.filter((c) => c !== categoria);

  const ld = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${cat.title} | ${site.name}`,
    url: `${site.url}/galeria/${categoria}`,
    image: list.map((p) => ({ "@type": "ImageObject", contentUrl: `${site.url}${p.src}`, caption: p.alt, width: p.width, height: p.height })),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: "Galería", item: `${site.url}/galeria` },
      { "@type": "ListItem", position: 3, name: cat.title, item: `${site.url}/galeria/${categoria}` },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={crumbs} />
      <nav aria-label="Ruta" className="mb-6 text-sm text-mist">
        <Link href="/" className="hover:text-ink">Inicio</Link> / <Link href="/galeria" className="hover:text-ink">Galería</Link> / <span className="text-ink">{cat.title}</span>
      </nav>
      <GalleryHeader title={cat.title} lead={`${cat.lead} Abre cada modelo para ver sus fotos.`} />
      <ModelAccordion category={categoria} openFirst />

      <div className="mt-16 flex flex-col gap-4 rounded-2xl bg-night p-8 text-white sm:flex-row sm:items-center sm:justify-between">
        <p className="font-serif text-2xl font-bold">¿Te gusta alguno? Lo hacemos a tu medida.</p>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappLink(`Hola, vi la galería de ${cat.title.toLowerCase()} y quiero cotizar.`)} target="_blank" rel="noopener noreferrer" className="btn bg-teal hover:bg-teal-600">
            Cotizar por WhatsApp
          </a>
          {others.map((o) => (
            <Link key={o} href={`/galeria/${o}`} className="btn border border-white hover:bg-white hover:text-ink">
              Ver {categories[o].title.toLowerCase()}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
