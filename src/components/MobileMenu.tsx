"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "./LogoLink";
import { SocialLinks } from "./SocialLinks";
import { WaIcon } from "./WaIcon";

type Item = { href: string; label: string };

function Group({ title, items }: { title: string; items: Item[] }) {
  return (
    <details className="group border-b border-white/10">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <svg aria-hidden width="14" height="14" viewBox="0 0 12 12" className="transition-transform group-open:rotate-180">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </summary>
      <ul className="pb-3">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="block py-2.5 pl-3 text-white/80 active:text-white">{i.label}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function MobileMenu({ models, whatsapp }: { models: Item[]; whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="menu-movil"
        aria-label="Abrir menú"
        className="grid size-11 place-items-center rounded-xl border border-white/25 text-white"
      >
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" /></svg>
      </button>

      <div
        id="menu-movil"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        hidden={!open}
        onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}
        className="fixed inset-0 z-[60] flex flex-col bg-night text-white"
      >
        <div className="flex h-[74px] shrink-0 items-center justify-between border-b border-white/10 px-4">
          <LogoLink label="Botes Galileo, inicio"><Image src="/logo-galileo.png" alt="Botes Galileo" width={720} height={452} className="h-12 w-auto" /></LogoLink>
          <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar menú" className="grid size-11 place-items-center rounded-xl border border-white/25">
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" /></svg>
          </button>
        </div>
        <nav aria-label="Principal móvil" className="flex-1 overflow-y-auto px-5 pb-6">
          <Group title="Modelos" items={models} />
          <ul className="text-lg font-semibold">
            <li className="border-b border-white/10"><Link href="/galeria" className="block py-4">Galería</Link></li>
            <li className="border-b border-white/10"><Link href="/#proceso" className="block py-4">Cómo trabajamos</Link></li>
            <li className="border-b border-white/10"><Link href="/#nosotros" className="block py-4">Nosotros</Link></li>
            <li className="border-b border-white/10"><Link href="/#contacto" className="block py-4">Contacto</Link></li>
          </ul>
        </nav>
        <div className="grid shrink-0 gap-3 border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-wa wa-follow py-3.5"><WaIcon />Cotiza tu bote por WhatsApp</a>
          <SocialLinks className="justify-center pt-1 text-white" />
        </div>
      </div>
    </div>
  );
}
