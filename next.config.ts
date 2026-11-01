import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Content Security Policy: solo se permite cargar recursos del propio sitio.
// Las fuentes están auto-alojadas (sin Google Fonts). Vercel Analytics usa el propio dominio en producción;
// va.vercel-scripts.com solo se usa en desarrollo.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "frame-src https://www.google.com https://maps.google.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Permite abrir el modo desarrollo (pnpm dev) desde la red local o un túnel (devtunnels, ngrok).
  // Solo afecta a "pnpm dev"; no tiene efecto en producción.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.devtunnels.ms", "*.use2.devtunnels.ms", "*.ngrok-free.app"],
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Tamaños hasta 4K para que en pantallas grandes (o retina) las fotos se vean nítidas
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560, 3200],
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    // El CSS va dentro del HTML: el navegador no espera otro archivo para pintar la página (mejor LCP en móvil)
    inlineCss: true,
  },
  // Direcciones viejas → nuevas. Los modelos son 6 (sin medida en el nombre); las medidas van en cada bote.
  async redirects() {
    const old: [string, string][] = [
      ["galileo-18-doble-realce", "delphin-doble-realce"],
      ["delphin-18-doble-realce", "delphin-doble-realce"],
      ["galileo-24", "delphin-doble-realce/bote-8"],
      ["delphin-24", "delphin-doble-realce/bote-8"],
      ["galileo-30", "galileo"],
      ["corvina-14", "corvina"],
      ["corvina-18", "corvina/18-pies-1"],
      ["galileo-18", "delphin"],
      ["delphin-18", "delphin"],
      ["galileo-20", "delphin/cabanas-cholita"],
      ["delphin-20", "delphin/cabanas-cholita"],
      ["pesquero-25", "pesquero"],
      ["ranita-20", "rana"],
      ["rana-20", "rana"],
      // Secciones de bote de los modelos viejos
      ["galileo-30/bote-1", "galileo"],
      ["galileo-30/bote-2", "galileo/bote-2"],
      ["corvina-14/bote-1", "corvina"],
      ["corvina-18/bote-1", "corvina/18-pies-1"],
      ["corvina-18/bote-2", "corvina/18-pies-2"],
      ["delphin-18/bote-1", "delphin"],
      ["delphin-18/bote-2", "delphin/verde-con-interior-celeste"],
      ["delphin-18/bote-3", "delphin/dona-hilda-1"],
      ["delphin-18/bote-4", "delphin/buena-vibra-1"],
      ["delphin-18/bote-5", "delphin/azul-con-delfin-y-toldo"],
      ["delphin-18/bote-6", "delphin/popa-de-palmeras-rosada"],
      ["delphin-18/bote-8", "delphin/popa-con-atardecer"],
      ["delphin-18/bote-9", "delphin/azul-con-lona"],
      ["delphin-18/bote-10", "delphin/popa-verde-y-amarilla"],
      ["delphin-18/bote-11", "delphin/maydel"],
      ["delphin-18/bote-12", "delphin/popa-de-palmeras-azul-noche"],
      ["delphin-18/bote-13", "delphin/popa-de-palmeras-verde"],
      ["delphin-18/bote-14", "delphin/popa-de-palmeras-celeste"],
      ["delphin-18/bote-15", "delphin/popa-roja"],
      ["delphin-18/bote-16", "delphin/popa-roja"],
      ["delphin-18/bote-17", "delphin/proa-celeste"],
      ["delphin-18/bote-18", "delphin/lidia-17"],
      ["delphin-18/bote-19", "delphin/la-tropa"],
      ["delphin-18/bote-20", "delphin/rosado-bp-2703-a"],
      ["delphin-18/bote-21", "delphin/jorge"],
      ["delphin-20/bote-1", "delphin/cabanas-cholita"],
      ["delphin-20/bote-2", "delphin/madagascar-2"],
      ["delphin-20/bote-3", "delphin/madagascar-2"],
      ["delphin-20/bote-4", "delphin/kendra-pauleth"],
      ["delphin-20/bote-5", "delphin/yaci-1"],
      ["delphin-20/bote-6", "delphin/johey-1"],
      ["delphin-20/bote-7", "delphin/interior-verde-menta"],
      ["delphin-20/bote-8", "delphin/celeste-con-rayas"],
      ["delphin-20/bote-9", "delphin/don-zapaton"],
      ["delphin-20/bote-10", "delphin/la-esperanza"],
      ["delphin-20/bote-11", "delphin/caribena"],
      ["pesquero-25/bote-1", "pesquero"],
      ["pesquero-25/bote-2", "pesquero/bote-2"],
      ["pesquero-25/bote-3", "pesquero/bote-3"],
      ["rana-20/bote-1", "rana"],
      // Botes que eran el mismo
      ["delphin/delfines-azul", "delphin/madagascar-2"],
      ["delphin/interior-gris-con-bandera", "delphin/popa-roja"],
      // Las fotos del «13-PC-648» son del bote «Carlos Daniel»
      ["delphin-doble-realce/bote-4", "delphin-doble-realce/bote-5"],
    ];
    return [
      ...old.map(([from, to]) => ({ source: `/modelos/${from}`, destination: `/modelos/${to}`, permanent: true })),
      // El primer bote de cada modelo es la página del modelo
      { source: "/modelos/:slug/bote-1", destination: "/modelos/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
