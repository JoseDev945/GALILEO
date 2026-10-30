import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { WhatsAppTracker } from "@/components/WhatsAppTracker";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export const metadata: Metadata = {
  // Código de verificación de Google Search Console (se configura como variable de entorno en Vercel)
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  metadataBase: new URL(site.url),
  title: { default: `Botes en Panamá: pangas de fibra de vidrio | ${site.name}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["botes", "botes Panamá", "botes en Panamá", "pangas", "pangas Panamá", "botes de fibra de vidrio", "botes de pesca", "botes de turismo", "lanchas", "La Chorrera", "Panamá Oeste"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: `Botes en Panamá: pangas de fibra de vidrio | ${site.name}`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Panga de turismo azul con toldo fabricada por Botes Galileo" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#1646a0", width: "device-width", initialScale: 1 };

const orgLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#negocio`,
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/og.jpg`,
  telephone: `+${site.whatsapp}`,
  email: site.email,
  priceRange: "$$",
  paymentAccepted: site.payment.methods.join(", "),
  sameAs: [site.social.facebookPage, site.social.tiktok],
  currenciesAccepted: "USD",
  address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: site.address.country },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.mapsUrl,
  areaServed: { "@type": "Country", name: "Panamá" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PA">
      <body className="min-h-dvh antialiased">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Saltar al contenido
        </a>
        <JsonLd data={orgLd} />
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <WhatsAppFab />
        <WhatsAppTracker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
