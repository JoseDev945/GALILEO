export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl bg-paper px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl font-extrabold sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-mist">Última actualización: {updated}</p>
      <div className="mt-10 space-y-5 leading-relaxed [&_h2]:font-serif [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </article>
  );
}
