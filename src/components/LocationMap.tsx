import { site } from "@/config/site";

/** Mapa de Google con la ubicación del taller y botón para abrir la ruta. */
export function LocationMap({ className = "" }: { className?: string }) {
  const { lat, lng } = site.geo;
  const embed = `https://www.google.com/maps?q=${lat},${lng}&z=16&hl=es&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  return (
    <div className={className}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-line sm:aspect-[16/9] lg:aspect-[21/8]">
        <iframe
          src={embed}
          title={`Mapa: ubicación del taller de ${site.name} en ${site.address.locality}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
          allowFullScreen
        />
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
