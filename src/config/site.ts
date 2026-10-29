// ─────────────────────────────────────────────────────────────
// DATOS DEL NEGOCIO — edita SOLO este archivo para cambiarlos.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: "Botes Galileo",
  shortName: "Botes Galileo",
  description:
    "Fabricamos pangas de fibra de vidrio a mano en Panamá: botes para pesca artesanal y botes para turismo, con rotulado y pintura personalizada.",
  // Dominio público. En Vercel se toma solo; para un dominio propio, define NEXT_PUBLIC_SITE_URL (sin barra al final).
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  locale: "es_PA",

  whatsapp: "50769065914", // formato internacional sin "+" ni espacios
  phoneDisplay: "+507 6906-5914",
  email: "botes.galileo@gmail.com",
  social: {
    tiktok: "https://www.tiktok.com/@humbertohbc",
    facebookPage: "https://www.facebook.com/share/1DofD243TX/",
    facebookContact: "https://www.facebook.com/share/1SZMbzSA3P/",
  },
  payment: {
    methods: ["Efectivo", "Yappy"],
    terms: "Se paga la mitad (50 %) para empezar a construir el bote y la otra mitad cuando está terminado.",
  },
  address: {
    street: "Barriada La Amistad",
    locality: "La Chorrera",
    region: "Panamá Oeste",
    country: "PA",
  },
  geo: { lat: 8.8755185, lng: -79.7142958 },
  mapsUrl: "https://maps.app.goo.gl/gomN1Qm7oMdYJp6v9",
  // TODO: escribe el horario real de atención (ej. "Lunes a sábado, 7:00 a. m. – 5:00 p. m."). Vacío = no se muestra.
  hours: "",
  // TODO: completa estos datos (responsable del sitio y de los datos, Ley 81 de 2019). Vacíos = no se muestran.
  legalOwner: "", // nombre del propietario o razón social
  legalId: "", // RUC o cédula
  lastLegalUpdate: "29 de octubre de 2026",
};

/** "Nombre (RUC)" del responsable, o el nombre comercial si aún no se completó. */
export function responsible() {
  if (!site.legalOwner) return site.name;
  return site.legalId ? `${site.legalOwner} (RUC/cédula ${site.legalId})` : site.legalOwner;
}

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
