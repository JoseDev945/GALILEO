import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelView } from "@/components/ModelView";
import { boatsOf, modelBySlug, modelName, models } from "@/data/catalog";
import { site } from "@/config/site";

// Sección de un bote en particular (el primer bote de cada modelo se ve en /modelos/{modelo})
type Props = { params: Promise<{ slug: string; bote: string }> };

const find = (slug: string, bote: string) => {
  const m = modelBySlug(slug);
  const b = m ? boatsOf(m).find((x) => x.id === bote && x.num > 1) : undefined;
  return m && b ? { m, b } : undefined;
};

export const dynamicParams = false;
export function generateStaticParams() {
  return models.flatMap((m) => boatsOf(m).slice(1).map((b) => ({ slug: m.slug, bote: b.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, bote } = await params;
  const f = find(slug, bote);
  if (!f) return {};
  const { m, b } = f;
  const name = modelName(m.slug);
  const title = `${name}, ${b.name ? `bote «${b.name}»` : `bote ${b.num}`}`;
  return {
    title: `${m.kind ?? "Panga"} ${title}: fotos del bote en Panamá`,
    description: `${b.photos.length} fotos ${b.name ? `del bote «${b.name}», ` : ""}un ${name} fabricado en fibra de vidrio por ${site.name} en La Chorrera, Panamá. ${m.summary}`,
    alternates: { canonical: b.href },
    openGraph: { title: `${title} | ${site.name}`, description: m.summary, images: [{ url: b.cover.src, width: b.cover.width, height: b.cover.height, alt: b.cover.alt }] },
  };
}

export default async function BotePage({ params }: Props) {
  const { slug, bote } = await params;
  const f = find(slug, bote);
  if (!f) notFound();
  return <ModelView m={f.m} boat={f.b} />;
}
