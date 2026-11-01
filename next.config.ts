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
  // Los modelos de 18, 20 y 24 pies ahora se llaman Delphin y la Ranita se llama Rana: los enlaces viejos siguen sirviendo
  async redirects() {
    const old: [string, string][] = [
      ["galileo-18-doble-realce", "delphin-doble-realce"],
      ["delphin-18-doble-realce", "delphin-doble-realce"],
      ["galileo-18", "delphin-18"],
      ["galileo-20", "delphin-20"],
      ["galileo-24", "delphin-24"],
      ["ranita-20", "rana-20"],
    ];
    return old.map(([from, to]) => ({ source: `/modelos/${from}`, destination: `/modelos/${to}`, permanent: true }));
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
