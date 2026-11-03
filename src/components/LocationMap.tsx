"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";

/**
 * Ubicación del taller. Siempre se ve una foto del mapa (OpenStreetMap, sin cookies) con el taller marcado;
 * el mapa de Google, que se puede mover, solo se carga si la persona toca «Mostrar mapa».
 */
export function LocationMap({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(false);
  const { lat, lng } = site.geo;
  const embed = `https://www.google.com/maps?q=${lat},${lng}&z=16&hl=es&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  return (
    <div className={className}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-line sm:aspect-[16/9] lg:aspect-[21/8]">
        {show ? (
          <iframe
            src={embed}
            title={`Mapa: ubicación del taller de ${site.name} en ${site.address.locality}`}
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src="/img/mapa-taller.webp"
              alt={`Mapa del taller de ${site.name} en ${site.address.street}, ${site.address.locality}`}
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              quality={80}
              className="object-cover"
            />
            {/* Marca del taller en el centro del mapa */}
            <svg aria-hidden width="48" height="48" viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-[#c8102e] drop-shadow-lg">
              <path fill="currentColor" stroke="white" strokeWidth="1.2" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-white/95 via-white/80 to-transparent px-4 pb-4 pt-10 text-center">
              <button type="button" onClick={() => setShow(true)} className="btn bg-teal text-white shadow-lg hover:bg-teal-600">
                Mostrar mapa interactivo
              </button>
              <p className="max-w-md text-xs text-ink/75">
                Ese mapa lo carga Google y puede usar cookies. <Link href="/privacidad" className="underline">Más información</Link>.
              </p>
            </div>
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="absolute right-0 top-0 rounded-bl-md bg-white/85 px-1.5 py-0.5 text-[11px] text-ink/80">
              © OpenStreetMap
            </a>
          </>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p>
          <strong>{site.name}</strong>
          <br />
          <span className="text-mist">{site.address.street}, {site.address.locality}, {site.address.region}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          <a href={directions} target="_blank" rel="noopener noreferrer" className="btn bg-teal text-white hover:bg-teal-600">Cómo llegar</a>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn border border-ink/80 hover:bg-ink hover:text-white">Ver en Google Maps</a>
        </div>
      </div>
    </div>
  );
}
