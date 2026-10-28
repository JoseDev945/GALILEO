export default function GaleriaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20">{children}</div>
    </div>
  );
}
