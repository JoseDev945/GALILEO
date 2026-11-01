"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Cuenta los clics en cualquier botón o enlace de WhatsApp (evento "whatsapp_click" en Vercel Analytics),
 * con la página y el modelo del mensaje, para saber qué genera consultas. Sin cookies ni datos personales.
 */
export function WhatsAppTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!a) return;
      const text = new URL(a.href).searchParams.get("text") ?? "";
      const model = text.match(/modelo (.+?)\.?$/)?.[1] ?? text.match(/deportiva (.+?)\.?$/)?.[1] ?? "";
      track("whatsapp_click", { page: window.location.pathname, model: model || "general" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
