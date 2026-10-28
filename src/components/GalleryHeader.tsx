export function GalleryHeader({ title, lead }: { title: string; lead: string }) {
  return (
    <header className="mb-10 lg:mb-14">
      <span className="inline-block rounded-full bg-teal px-4 py-1.5 text-sm font-bold uppercase text-white">Fotos</span>
      <h1 className="mt-5 font-serif text-[2.1rem] leading-tight font-extrabold uppercase sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg">{lead}</p>
    </header>
  );
}
