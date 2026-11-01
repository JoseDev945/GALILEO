// Modelos, categorías y textos. No importa las fotos, así los componentes del navegador no descargan la lista completa.
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
  /** Bote al que pertenece la foto (id de `BoatModel.boats`, ej. "bote-2"). */
  boat?: string;
};

/** Un bote real fabricado de un modelo. Cada uno tiene su propia sección con sus fotos. */
export type Boat = {
  /** Va en la dirección: /modelos/{modelo}/{id}. El primero de la lista se ve en /modelos/{modelo}. */
  id: string;
  /** Nombre o rótulo del bote (ej. "El Chombito"). Si falta se muestra solo "Bote N". */
  name?: string;
};


export type Spec = { label: string; value: string };

export type BoatModel = {
  slug: string;
  /** Largo en pies que va al lado del nombre (ej. "30.5" → "Galileo 30.5 pies"). */
  num: string;
  /** Tipo de embarcación para títulos y Google (por defecto "Panga"). */
  kind?: "Panga" | "Lancha";
  /** true si el nombre es masculino ("el Delphin"); por defecto se dice "la Corvina". */
  masc?: boolean;
  /** Texto que va después del nombre o la medida (ej. "Doble realce"). */
  suffix?: string;
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
  /** Botes fabricados de este modelo, en el orden de las carpetas («BOTE 1», «BOTE 2»…). */
  boats?: Boat[];
  /** Una foto por cada bote distinto del modelo: en el carrusel y en «La línea» sale una tarjeta por bote. Si falta, se usa la portada. */
  boatCovers?: string[];
  /** false para no mostrar el modelo en el carrusel de inicio (sigue en el menú y en su página). */
  inHero?: boolean;
  featured?: boolean;
  /** Colores del bote para el carrusel: [oscuro para fondos con texto blanco, claro para detalles] */
  accent: [string, string];
};

// Precios del taller (casco en fibra). Corvina: 14 pies $1,600 y cada pie extra +$200.
const corvina = (feet: number) => 1600 + (feet - 14) * 200;

export const models: BoatModel[] = [
  {
    slug: "galileo-30",
    num: "30.5",
    word: "GALILEO",
    badge: "La más grande",
    uses: ["pesca", "turismo"],
    summary: "Nuestra panga más grande: 30.5 pies de largo y 7 de ancho para tours, traslados o pesca de altura.",
    description:
      "La Galileo es la panga grande de la casa. Sus 30.5 pies de largo y 7 de ancho dan espacio para grupos de turistas con toldo o para faenas largas de pesca. Se rotula con la marca de tu negocio y los colores que elijas.",
    specs: [
      { label: "Largo", value: "30.5'" },
      { label: "Ancho", value: "7'" },
      { label: "Versión", value: "Sencilla" },
      { label: "Colores", value: "A elección" },
    ],
    priceFrom: 9100,
    priceNote: "Precio de la versión sencilla.",
    cover: "galileo-30-02",
    boatCovers: ["galileo-30-01", "galileo-30-03"],
    boats: [
      { id: "bote-1", name: "Monkey Tours" },
      { id: "bote-2", name: "Monky Tour MG2" },
    ],
    accent: ["#a3121f", "#f2525f"],
    featured: true,
  },
  {
    slug: "corvina-14",
    num: "14",
    word: "CORVINA",
    badge: "Pesca ligera",
    uses: ["pesca"],
    summary: "Liviana y fácil de remolcar. Ideal para pescar en ríos, esteros y cerca de la costa.",
    description:
      "La Corvina de 14 pies es nuestra panga de pesca más accesible. Su casco liviano se remolca sin esfuerzo y entra donde las pangas grandes no llegan. Se puede pedir más larga: cada pie extra suma $200.",
    specs: [
      { label: "Largo", value: "14'" },
      { label: "Ancho", value: "4'" },
      { label: "Altura", value: "3'" },
      { label: "Extra por pie", value: "+$200" },
    ],
    priceFrom: corvina(14),
    priceNote: "Cada pie adicional suma $200.",
    cover: "corvina-14-04",
    accent: ["#3f7a12", "#9fe05a"],
    featured: true,
  },
  {
    slug: "corvina-18",
    num: "18",
    word: "CORVINA",
    badge: "Pesca con techo",
    uses: ["pesca"],
    summary: "La Corvina alargada a 18 pies. Admite techo fijo para pescar a la sombra.",
    description:
      "Misma línea de casco que la Corvina de 14 pies, con cuatro pies más de largo. Es la opción de quien necesita más espacio para pescar y un techo fijo para el sol, sin pasar a una panga grande.",
    specs: [
      { label: "Largo", value: "18'" },
      { label: "Ancho", value: "4'" },
      { label: "Altura", value: "3'" },
      { label: "Techo", value: "Opcional" },
    ],
    priceFrom: 2300,
    cover: "corvina-18-04",
    accent: ["#1f5fa8", "#6fa8ef"],
  },
  {
    slug: "delphin-18",
    num: "18",
    word: "DELPHIN",
    masc: true,
    badge: "Pesca y turismo",
    uses: ["pesca", "turismo"],
    summary: "La panga de todos los días: 18 pies de largo y 5 de ancho, para pescar o pasear.",
    description:
      "El Delphin de 18 pies es la panga de todos los días. Con 5 pies de ancho es estable y espaciosa; se entrega con bancas laminadas, piso antideslizante y el rotulado que identifica tu bote. Sirve igual para pesca que para paseos con toldo.",
    specs: [
      { label: "Largo", value: "18'" },
      { label: "Ancho", value: "5'" },
      { label: "Altura", value: "3'" },
      { label: "Toldo", value: "Opcional" },
    ],
    priceFrom: 2700,
    cover: "galileo-18-96",
    accent: ["#0c6f96", "#46c4f5"],
    featured: true,
  },
  {
    slug: "delphin-doble-realce",
    num: "",
    word: "DELPHIN",
    masc: true,
    suffix: "Doble realce",
    boats: [
      { id: "bote-1" },
      { id: "bote-2" },
      { id: "bote-3", name: "Delfín de Gaiza" },
      { id: "bote-4", name: "13-PC-648" },
      { id: "bote-5", name: "Carlos Daniel" },
      { id: "bote-6", name: "El Chombito" },
      { id: "bote-7", name: "Azul con marlín" },
      { id: "bote-8", name: "Azul y blanco" },
    ],
    badge: "Borda elevada",
    uses: ["pesca", "turismo"],
    summary: "El Delphin con doble realce: borda más alta para que entre menos agua con mar picado.",
    description:
      "El doble realce sube la borda del Delphin para que entre menos agua cuando el mar se pone picado. Es la panga de quien sale lejos o lleva pasajeros y quiere más protección sin perder estabilidad. Se puede pedir en cualquier medida del Delphin por $1,000 extra.",
    specs: [
      { label: "Largo", value: "18' a 24'" },
      { label: "Ancho", value: "5'" },
      { label: "Borda", value: "Doble realce" },
      { label: "Toldo", value: "Opcional" },
    ],
    priceFrom: 3700,
    priceNote: "Precio del Delphin de 18 pies ($2,700) más el doble realce ($1,000). En otras medidas se suman $1,000 al precio del Delphin.",
    cover: "galileo-18-doble-realce-03",
    accent: ["#0d6c70", "#3fc6c9"],
    featured: true,
  },
  {
    slug: "delphin-20",
    num: "20",
    word: "DELPHIN",
    masc: true,
    badge: "Pesca y traslados",
    uses: ["pesca", "turismo"],
    summary: "Dos pies más de cubierta: más espacio para equipo, hielo o pasajeros.",
    description:
      "El Delphin de 20 pies es dos pies más largo que el de 18 y se nota en la cubierta: más espacio para equipo, hielo o pasajeros. Funciona igual de bien como panga de pesca que como bote de paseo o traslado a islas.",
    specs: [
      { label: "Largo", value: "20'" },
      { label: "Ancho", value: "5'" },
      { label: "Altura", value: "3'" },
      { label: "Toldo", value: "Opcional" },
    ],
    priceFrom: 3200,
    cover: "galileo-20-01",
    accent: ["#1d3f9e", "#7d99f0"],
  },
  {
    slug: "pesquero-25",
    num: "25",
    word: "PESQUERO",
    masc: true,
    badge: "Mar abierto",
    uses: ["pesca", "turismo"],
    summary: "Proa alta y 7 pies de ancho para mar abierto. Disponible en 25 y 28 pies.",
    description:
      "El Pesquero tiene proa alta para romper la ola en mar abierto y 7 pies de ancho para trabajar cómodo en faenas largas o llevar pasajeros. Se fabrica en 25 pies ($6,100) y en 28 pies ($9,100).",
    specs: [
      { label: "Largo", value: "25' / 28'" },
      { label: "Ancho", value: "7'" },
      { label: "Proa", value: "Alta" },
      { label: "28 pies", value: "$9,100" },
    ],
    priceFrom: 6100,
    priceNote: "La versión de 28 pies cuesta $9,100.",
    cover: "pesquero-25-03",
    accent: ["#5b2a7a", "#b77fe0"],
    featured: true,
  },
  {
    slug: "rana-20",
    num: "20",
    word: "RANA",
    kind: "Lancha",
    badge: "Pesca deportiva",
    uses: ["deportivas", "pesca", "turismo"],
    summary: "Lancha deportiva de 6 pies de ancho: estable, liviana y con consola central para salir a pescar por deporte.",
    description:
      "La Rana de 20 pies es nuestra lancha para pesca deportiva. Sus 6 pies de ancho la hacen muy estable, y su borda baja de pie y medio facilita lanzar y subir la pesca. Trae consola central y bancas laminadas, y se rotula con el nombre y los colores que elijas.",
    specs: [
      { label: "Largo", value: "20'" },
      { label: "Ancho", value: "6'" },
      { label: "Altura", value: "1.5'" },
      { label: "Consola", value: "Central" },
    ],
    priceFrom: 3000,
    cover: "ranita-20-01",
    accent: ["#0c5797", "#42a5fa"],
    featured: true,
  },
];

export const categories: Record<Category, { title: string; lead: string; heroId: string }> = {
  pesca: {
    title: "Botes para pesca",
    lead: "Pangas de trabajo, de 14 a 30.5 pies, laminadas para aguantar la faena todos los días.",
    heroId: "galileo-18-doble-realce-03",
  },
  turismo: {
    title: "Botes para turismo",
    lead: "Pangas con toldo o techo, bancas para pasajeros y la pintura que identifica a tu negocio.",
    heroId: "galileo-30-01",
  },
  deportivas: {
    title: "Lanchas deportivas",
    lead: "Lanchas anchas y estables para pesca deportiva, con consola central y rotulado a tu gusto.",
    heroId: "ranita-20-01",
  },
};

/** Orden en que se muestran las categorías en la galería y los menús. */
export const categoryOrder: Category[] = ["turismo", "pesca", "deportivas"];
/** Nombre corto de cada uso, para etiquetas y formularios. */
export const useLabel: Record<Category, string> = { pesca: "Pesca", turismo: "Turismo", deportivas: "Deportiva" };

export const modelBySlug = (slug: string) => models.find((m) => m.slug === slug);
export const modelName = (slug: string) => {
  const m = modelBySlug(slug);
  return m ? `${m.word.charAt(0)}${m.word.slice(1).toLowerCase()}${m.num ? ` ${m.num} pies` : ""}${m.suffix ? ` ${m.suffix}` : ""}` : "";
};
/** "la Corvina 14 pies" o "el Delphin 18 pies". */
export const theName = (slug: string) => `${modelBySlug(slug)?.masc ? "el" : "la"} ${modelName(slug)}`;
/** "de la Corvina 14 pies" o "del Delphin 18 pies". */
export const ofName = (slug: string) => (modelBySlug(slug)?.masc ? `del ${modelName(slug)}` : `de la ${modelName(slug)}`);
export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
export const priceLabel = (m: BoatModel) => (m.priceFrom ? usd(m.priceFrom) : "A cotizar");
