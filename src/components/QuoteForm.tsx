"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { submitQuote, type QuoteState } from "@/app/actions/quote";
import { categoryOrder, models, modelName, useLabel } from "@/data/catalog";

const initial: QuoteState = { status: "idle" };

const field = "mt-1 w-full rounded-xl border border-ink/20 bg-white px-3 py-3 text-base outline-none focus:border-teal focus:ring-2 focus:ring-teal/30";

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, initial);
  const [t, setT] = useState(0);
  useEffect(() => setT(Date.now()), []);
  const err = state.fieldErrors ?? {};

  if (state.status === "ok") {
    return (
      <div role="status" className="rounded-lg rounded-2xl border-2 border-teal bg-white p-6">
        <p className="font-serif text-2xl font-bold">Solicitud enviada</p>
        <p className="mt-2 text-mist">{state.message ?? "Te contactamos pronto."}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="t" value={t} />
      {/* Honeypot anti-bots: oculto para personas */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Empresa<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="block">
        <span className="font-medium">Nombre</span>
        <input name="name" required maxLength={80} autoComplete="name" className={field} aria-invalid={!!err.name} aria-describedby="e-name" />
        {err.name && <span id="e-name" className="mt-1 block text-sm text-[#b42318]">{err.name}</span>}
      </label>

      <label className="block">
        <span className="font-medium">Teléfono o WhatsApp</span>
        <input name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder="+507" className={field} aria-invalid={!!err.phone} aria-describedby="e-phone" />
        {err.phone && <span id="e-phone" className="mt-1 block text-sm text-[#b42318]">{err.phone}</span>}
      </label>

      <label className="block">
        <span className="font-medium">Correo <span className="font-normal text-mist">(opcional)</span></span>
        <input name="email" type="email" maxLength={120} autoComplete="email" className={field} aria-invalid={!!err.email} aria-describedby="e-email" />
        {err.email && <span id="e-email" className="mt-1 block text-sm text-[#b42318]">{err.email}</span>}
      </label>

      <fieldset>
        <legend className="font-medium">Uso del bote</legend>
        <div className="mt-1 grid grid-cols-3 gap-2">
          {categoryOrder.map((u) => (
            <label key={u} className="flex cursor-pointer items-center gap-2 rounded-xl border border-ink/20 px-2.5 py-3 text-sm sm:text-base has-[:checked]:border-teal has-[:checked]:bg-teal-100">
              <input type="radio" name="use" value={u} required className="accent-teal" />
              <span>{useLabel[u]}</span>
            </label>
          ))}
        </div>
        {err.use && <span className="mt-1 block text-sm text-[#b42318]">{err.use}</span>}
      </fieldset>

      <label className="block sm:col-span-2">
        <span className="font-medium">Modelo que te interesa <span className="font-normal text-mist">(opcional)</span></span>
        <select name="model" className={field} defaultValue="">
          <option value="">Todavía no sé</option>
          {models.map((m) => (
            <option key={m.slug} value={m.slug}>{modelName(m.slug)}</option>
          ))}
        </select>
      </label>

      <label className="block sm:col-span-2">
        <span className="font-medium">Cuéntanos qué necesitas</span>
        <textarea name="message" rows={4} maxLength={1500} placeholder="Largo, motor que usarás, colores, nombre a rotular, fecha…" className={field} />
        {err.message && <span className="mt-1 block text-sm text-[#b42318]">{err.message}</span>}
      </label>

      <label className="flex items-start gap-3 sm:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 size-5 accent-teal" />
        <span className="text-sm text-mist">
          Autorizo a Botes Galileo a usar estos datos solo para responder mi solicitud, según la{" "}
          <Link href="/privacidad" className="underline">política de privacidad</Link>.
        </span>
      </label>
      {err.consent && <span className="-mt-3 text-sm text-[#b42318] sm:col-span-2">{err.consent}</span>}

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending} className="rounded-xl bg-teal px-7 py-3 font-semibold text-white hover:bg-teal-600 disabled:opacity-60">
          {pending ? "Enviando…" : "Enviar solicitud"}
        </button>
        {state.status === "error" && state.message && (
          <p role="alert" className="text-sm text-[#b42318]">{state.message}</p>
        )}
      </div>
    </form>
  );
}
