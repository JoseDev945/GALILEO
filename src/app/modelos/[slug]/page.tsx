import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelView } from "@/components/ModelView";
import { boatsOf, byId, modelBySlug, modelName, models, priceLabel } from "@/data/catalog";
import { site } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = modelBySlug(slug);
  if (!m) return {};
  const p = boatsOf(m)[0]?.cover ?? byId(m.cover);
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
  return <ModelView m={m} />;
}
