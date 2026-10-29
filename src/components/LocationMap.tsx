"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";

/**
 * Mapa de Google con la ubicación del taller. No se carga hasta que la persona toca «Mostrar mapa»,
 * así el sitio no envía datos a Google ni recibe sus cookies sin permiso.
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
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_40%,#e3eef0,#dfe3e6)] p-6 text-center">
            <div>
              <svg aria-hidden width="44" height="44" viewBox="0 0 24 24" className="mx-auto text-teal">
                <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
              <p className="mt-3 font-semibold">{site.address.street}, {site.address.locality}</p>
              <button type="button" onClick={() => setShow(true)} className="btn mt-4 bg-teal text-white hover:bg-teal-600">
                Mostrar mapa
              </button>
              <p className="mx-auto mt-3 max-w-sm text-sm text-mist">
                El mapa lo carga Google y puede usar cookies. <Link href="/privacidad" className="underline">Más información sobre el mapa y tu privacidad</Link>.
              </p>
            </div>
          </div>
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
