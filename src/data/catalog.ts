import raw from "./photos.json";

export type Category = "pesca" | "turismo" | "deportivas";
export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  category: Category | "proceso";
  model: string;
  alt: string;
  blur: string;
};

export const photos = raw as Photo[];

export type Spec = { label: string; value: string };

export type BoatModel = {
  slug: string;
  /** Número que se muestra en cursiva antes del nombre (ej. "14"). Vacío si no aplica. */
  num: string;
  /** Nombre del modelo en mayúsculas (ej. "CORVINA"). */
  word: string;
  badge: string;
  uses: Category[];
  summary: string;
  description: string;
  specs: Spec[];
  priceFrom?: number;
  priceNote?: string;
  cover: string;
  featured?: boolean;
  /** Colores del bote para el carrusel: [oscuro para fondos con texto blanco, claro para detalles] */
  accent: [string, string];
};

// Corvina: 14 pies desde $1,500; cada pie extra +$200 (ancho 4 pies, altura 3 pies)
const corvina = (feet: number) => 1500 + (feet - 14) * 200;
const ASK = "Consultar";

export const models: BoatModel[] = [
  {
    slug: "corvina-14",
    num: "14",
    word: "CORVINA",
    badge: "Ligera y versátil",
    uses: ["pesca", "turismo"],
    summary: "Liviana y fácil de remolcar. Para ríos, esteros y paseos cortos con toldo.",
    description:
      "La Corvina 14 es nuestra panga más accesible. Su casco liviano se remolca sin esfuerzo y entra donde las pangas grandes no llegan. Se puede pedir abierta para pesca o con toldo para paseos.",
    specs: [
      { label: "Largo", value: "14'" },
      { label: "Ancho", value: "4'" },
      { label: "Altura", value: "3'" },
      { label: "Extra por pie", value: "+$200" },
    ],
    priceFrom: corvina(14),
    priceNote: "Cada pie adicional suma $200.",
    cover: "turismo-corvina-14-04",
    accent: ["#3f7a12", "#9fe05a"],
    featured: true,
  },
  {
    slug: "corvina-18",
    num: "18",
    word: "CORVINA",
    badge: "Techo para pasajeros",
    uses: ["pesca", "turismo"],
    summary: "La Corvina alargada. Admite techo fijo para llevar pasajeros a la sombra.",
    description:
      "Misma línea de casco que la Corvina 14, con cuatro pies más de eslora. Es la opción favorita de quienes necesitan techo fijo y espacio para pasajeros sin pasar a una panga grande.",
    specs: [
      { label: "Largo", value: "18'" },
      { label: "Ancho", value: "4'" },
      { label: "Altura", value: "3'" },
      { label: "Techo", value: "Opcional" },
    ],
    priceFrom: corvina(18),
    cover: "turismo-corvina-18-10",
    accent: ["#1f5fa8", "#6fa8ef"],
  },
  {
    slug: "costa-18",
    num: "18",
    word: "COSTA",
    badge: "Pesca costera",
    uses: ["pesca"],
    summary: "Panga de trabajo diario para pesca costera, con bancas laminadas.",
    description:
      "La Costa 18 está hecha para salir a pescar todos los días. Bancas laminadas al casco, piso con gelcoat antideslizante y el rotulado que identifica tu bote en el muelle.",
    specs: [
      { label: "Largo", value: "18'" },
      { label: "Ancho", value: ASK },
      { label: "Altura", value: ASK },
      { label: "Bancas", value: "Laminadas" },
    ],
    cover: "pesca-costa-18-51",
    accent: ["#0c6f96", "#46c4f5"],
  },
  {
    slug: "costa-20",
    num: "20",
    word: "COSTA",
    badge: "Pesca y traslados",
    uses: ["pesca", "turismo"],
    summary: "Más espacio de cubierta. Popular para pesca y para traslados a islas.",
    description:
      "Dos pies más que la Costa 18 se notan en la cubierta: más espacio para equipo, hielo o pasajeros. Funciona igual de bien como panga de pesca que como bote de traslado.",
    specs: [
      { label: "Largo", value: "20'" },
      { label: "Ancho", value: ASK },
      { label: "Altura", value: ASK },
      { label: "Toldo", value: "Opcional" },
    ],
    cover: "pesca-costa-20-26",
    accent: ["#1d3f9e", "#7d99f0"],
  },
  {
    slug: "costa-24",
    num: "24",
    word: "COSTA",
    badge: "Turismo en grupo",
    uses: ["pesca", "turismo"],
    summary: "Nuestra panga grande de turismo: toldo completo y bancas para grupos.",
    description:
      "La Costa 24 es la panga para operadores de turismo: toldo de proa a popa, bancas corridas para grupos y una cubierta amplia. También se pide abierta para pesca de altura.",
    specs: [
      { label: "Largo", value: "24'" },
      { label: "Ancho", value: ASK },
      { label: "Altura", value: ASK },
      { label: "Toldo", value: "Completo" },
    ],
    cover: "turismo-costa-24-32",
    accent: ["#1f4f99", "#6f9ce0"],
    featured: true,
  },
  {
    slug: "doble-realce",
    num: "",
    word: "DOBLE REALCE",
    badge: "Borda elevada",
    uses: ["pesca", "turismo"],
    summary: "Doble realce en la borda para más altura y menos agua adentro con mar picado.",
    description:
      "El doble realce sube la borda para que entre menos agua cuando el mar se pone picado. Es la panga de quien sale lejos y necesita más protección sin perder estabilidad.",
    specs: [
      { label: "Largo", value: ASK },
      { label: "Borda", value: "Doble realce" },
      { label: "Altura", value: "Elevado" },
      { label: "Toldo", value: "Opcional" },
    ],
    cover: "pesca-doble-realce-39",
    accent: ["#0d6c70", "#3fc6c9"],
    featured: true,
  },
  {
    slug: "faena-25",
    num: "25",
    word: "FAENA",
    badge: "Mar abierto",
    uses: ["pesca"],
    summary: "Proa alta para mar abierto y faenas largas. Opción de consola central.",
    description:
      "La Faena tiene proa alta para romper la ola en mar abierto y espacio para faenas largas. Disponible en 25 y 28 pies, con opción de consola central.",
    specs: [
      { label: "Largo", value: "25' / 28'" },
      { label: "Ancho", value: ASK },
      { label: "Proa", value: "Alta" },
      { label: "Consola", value: "Opcional" },
    ],
    cover: "pesca-faena-25-16",
    accent: ["#5b2a7a", "#b77fe0"],
    featured: true,
  },
  {
    slug: "ranita-20",
    num: "20",
    word: "RANITA",
    badge: "Pesca deportiva",
    uses: ["deportivas"],
    summary: "Lancha deportiva de 6 pies de ancho: estable, liviana y con consola central para salir a pescar por deporte.",
    description:
      "La Ranita 20 es nuestra lancha para pesca deportiva. Sus 6 pies de ancho la hacen muy estable, y su borda baja de 2 pies facilita lanzar y subir la pesca. Trae consola central y bancas laminadas, y se rotula con el nombre y los colores que elijas.",
    specs: [
      { label: "Largo", value: "20'" },
      { label: "Ancho", value: "6'" },
      { label: "Altura", value: "2'" },
      { label: "Consola", value: "Central" },
    ],
    cover: "deportivas-ranita-20-01",
    accent: ["#0c5797", "#42a5fa"],
    featured: true,
  },
  {
    slug: "paseo",
    num: "",
    word: "PASEO",
    badge: "Tours",
    uses: ["turismo"],
    summary: "Casco de líneas suaves con toldo, pensado para tours y avistamiento.",
    description:
      "La Paseo se diseña a la medida de tu operación de turismo: toldo, colores y rotulado con la marca de tu negocio para que tus clientes la reconozcan desde la orilla.",
    specs: [
      { label: "Largo", value: "A medida" },
      { label: "Toldo", value: "Incluido" },
      { label: "Rotulado", value: "Tu marca" },
      { label: "Colores", value: "A elección" },
    ],
    cover: "turismo-paseo-00",
    accent: ["#a3121f", "#f2525f"],
  },
];

export const categories: Record<Category, { title: string; lead: string; heroId: string }> = {
  pesca: {
    title: "Botes para pesca",
    lead: "Pangas de trabajo, de 14 a 28 pies, laminadas para aguantar la faena todos los días.",
    heroId: "pesca-doble-realce-39",
  },
  turismo: {
    title: "Botes para turismo",
    lead: "Pangas con toldo o techo, bancas para pasajeros y la pintura que identifica a tu negocio.",
    heroId: "turismo-costa-24-32",
  },
  deportivas: {
    title: "Lanchas deportivas",
    lead: "Lanchas anchas y estables para pesca deportiva, con consola central y rotulado a tu gusto.",
    heroId: "deportivas-ranita-20-01",
  },
};

/** Orden en que se muestran las categorías en la galería y los menús. */
export const categoryOrder: Category[] = ["turismo", "pesca", "deportivas"];
/** Nombre corto de cada uso, para etiquetas y formularios. */
export const useLabel: Record<Category, string> = { pesca: "Pesca", turismo: "Turismo", deportivas: "Deportiva" };

export const byId = (id: string) => photos.find((p) => p.id === id)!;
export const photosOf = (c: Category) => photos.filter((p) => p.category === c);
export const photosOfModel = (slug: string) => photos.filter((p) => p.model === slug && p.category !== "proceso");
export const modelBySlug = (slug: string) => models.find((m) => m.slug === slug);
export const modelName = (slug: string) => {
  const m = modelBySlug(slug);
  return m ? `${m.word.charAt(0)}${m.word.slice(1).toLowerCase()}${m.num ? " " + m.num : ""}` : "";
};
export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
export const priceLabel = (m: BoatModel) => (m.priceFrom ? usd(m.priceFrom) : "A cotizar");
