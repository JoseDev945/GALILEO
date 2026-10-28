import { site } from "@/config/site";

/** Formas de pago y condiciones (50 % al empezar, 50 % al entregar). */
export function PaymentInfo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <div className={`rounded-2xl border p-5 ${dark ? "border-white/15 bg-white/5" : "border-line bg-white"} ${className}`}>
      <p className={`eyebrow ${dark ? "text-white/60" : "text-mist"}`}>Formas de pago</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {site.payment.methods.map((m) => (
          <li key={m} className={`rounded-full px-3.5 py-1 text-sm font-semibold ${dark ? "bg-white text-ink" : "bg-teal text-white"}`}>{m}</li>
        ))}
      </ul>
      <ol className={`mt-4 grid gap-3 sm:grid-cols-2 ${dark ? "text-white/85" : ""}`}>
        <li className="flex gap-3">
          <span className={`grid size-10 shrink-0 place-items-center rounded-full text-[11px] font-bold ${dark ? "bg-teal text-white" : "bg-teal-100 text-teal"}`}>50%</span>
          <span className="text-sm leading-snug">Al confirmar el pedido, para <strong>empezar a construir</strong> tu bote.</span>
        </li>
        <li className="flex gap-3">
          <span className={`grid size-10 shrink-0 place-items-center rounded-full text-[11px] font-bold ${dark ? "bg-teal text-white" : "bg-teal-100 text-teal"}`}>50%</span>
          <span className="text-sm leading-snug">Cuando el bote está <strong>terminado</strong>, antes de la entrega.</span>
        </li>
      </ol>
    </div>
  );
}
