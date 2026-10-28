import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
      <h1 className="font-serif text-5xl font-extrabold sm:text-6xl">Página no encontrada</h1>
      <p className="mt-6 text-lg text-mist">Esta dirección no existe o cambió. Puedes seguir desde la galería.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/galeria/pesca" className="btn bg-teal text-white">Botes para pesca</Link>
        <Link href="/galeria/turismo" className="btn border border-ink">Botes para turismo</Link>
      </div>
    </div>
  );
}
