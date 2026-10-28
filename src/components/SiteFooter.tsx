import Image from "next/image";
import Link from "next/link";
import { site, whatsappLink } from "@/config/site";
import { models, modelName } from "@/data/catalog";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="bg-night text-white/75">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 pb-36 pt-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:pb-16">
        <div className="col-span-2 md:col-span-1">
          <Image src="/logo-galileo.png" alt={site.name} width={720} height={452} className="h-20 w-auto" />
          <p className="mt-4 max-w-xs">Pangas de fibra de vidrio hechas a mano en {site.address.locality}, {site.address.region}, para pesca, turismo y pesca deportiva.</p>
          <SocialLinks className="mt-6 text-white" />
          <p className="mt-6 text-sm">Pagos en efectivo o Yappy: 50 % al empezar y 50 % al terminar.</p>
        </div>
        <div>
          <p className="eyebrow mb-4 text-white">Modelos</p>
          <ul className="space-y-2">
            {models.map((m) => (
              <li key={m.slug}><Link href={`/modelos/${m.slug}`} className="hover:text-white">{modelName(m.slug)}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-white">Galería</p>
          <ul className="space-y-2">
            <li><Link href="/galeria/pesca" className="hover:text-white">Botes para pesca</Link></li>
            <li><Link href="/galeria/turismo" className="hover:text-white">Botes para turismo</Link></li>
            <li><Link href="/galeria/deportivas" className="hover:text-white">Lanchas deportivas</Link></li>
          </ul>
          <p className="eyebrow mb-4 mt-8 text-white">Legal</p>
          <ul className="space-y-2">
            <li><Link href="/privacidad" className="hover:text-white">Política de privacidad</Link></li>
            <li><Link href="/terminos" className="hover:text-white">Términos y condiciones</Link></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="eyebrow mb-4 text-white">Contacto</p>
          <ul className="space-y-2">
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp {site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li><a href={site.social.facebookContact} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a> · <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a></li>
            <li><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">{site.address.street}, {site.address.locality}, {site.address.region}</a></li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 pr-20 text-sm text-white/50 sm:px-6 md:pr-6">
          © {new Date().getFullYear()} {site.name}. Fotos de trabajos reales del taller. Precios referenciales en USD, sujetos a cotización.
        </p>
      </div>
    </footer>
  );
}
