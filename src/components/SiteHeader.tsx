import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { models, modelName } from "@/data/catalog";
import { NavMenu } from "./NavMenu";
import { MobileMenu } from "./MobileMenu";
import { WaIcon } from "./WaIcon";
import { LogoLink } from "./LogoLink";
import { whatsappLink } from "@/config/site";
import { ModelLinks } from "./ModelLinks";


function Dropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return (
    <NavMenu label={label} panelClassName="min-w-56 overflow-hidden rounded-xl border border-white/10 bg-night py-2">
      <ul>
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="block px-5 py-2.5 text-white/80 hover:bg-white/5 hover:text-white">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </NavMenu>
  );
}

function ModelsMenu() {
  return (
    <NavMenu label="Modelos" panelClassName="inset-x-4 overflow-hidden rounded-2xl bg-white text-ink">
      <div className="max-h-[calc(100vh-90px)] overflow-y-auto p-8">
        <ModelLinks />
      </div>
    </NavMenu>
  );
}

export function SiteHeader() {
  const modelItems = models.map((m) => ({ href: `/modelos/${m.slug}`, label: modelName(m.slug) }));
  return (
    <header className="sticky top-0 z-50 bg-night text-white/85">
      <div className="relative mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <LogoLink label={`${site.name}, inicio`} className="shrink-0">
          <Image src="/logo-galileo.png" alt={site.name} width={720} height={452} priority className="h-10 w-auto sm:h-12" />
        </LogoLink>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[15px] font-medium">
            <ModelsMenu />
            <li><Link href="/galeria" className="hover:text-white">Galería</Link></li>
            <li><Link href="/#proceso" className="hover:text-white">Cómo trabajamos</Link></li>
            <li><Link href="/#nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link href="/#contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </nav>

        <a href={whatsappLink("Hola, quiero cotizar un bote.")} target="_blank" rel="noopener noreferrer" className="btn btn-wa wa-follow hidden lg:inline-flex">
          <WaIcon />
          Cotiza tu bote
        </a>

        <MobileMenu models={modelItems} whatsapp={whatsappLink("Hola, quiero información sobre sus botes.")} />
      </div>
    </header>
  );
}
