import Link from "next/link";
import { whatsappLink } from "@/config/site";
import { WaIcon } from "@/components/WaIcon";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
      <p className="eyebrow text-teal">Error 404</p>
      <h1 className="mt-3 font-serif text-5xl font-extrabold sm:text-6xl">Página no encontrada</h1>
      <p className="mt-6 text-lg text-mist">Esta dirección no existe o cambió. Puedes seguir desde aquí:</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn bg-teal text-white hover:bg-teal-600">Ir al inicio</Link>
        <Link href="/#modelos" className="btn border border-ink hover:bg-ink hover:text-white">Ver modelos</Link>
        <Link href="/galeria" className="btn border border-ink hover:bg-ink hover:text-white">Galería</Link>
        <Link href="/#contacto" className="btn border border-ink hover:bg-ink hover:text-white">Contacto</Link>
      </div>
      <a href={whatsappLink("Hola, quiero información sobre sus botes.")} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-6">
        <WaIcon size={20} />
        Escríbenos por WhatsApp
      </a>
    </div>
  );
}
