"use client";

import { useEffect, useState } from "react";
import { useOpenUntilNavigate } from "./useOpenUntilNavigate";

/**
 * Menú desplegable. Con mouse se abre al pasar por encima y se cierra al salir.
 * Un clic en el botón lo deja fijo: queda abierto (aunque salgas con el mouse) hasta otro clic en el botón,
 * Esc o al elegir una opción.
 */
export function NavMenu({ label, children, panelClassName = "" }: { label: string; children: React.ReactNode; panelClassName?: string }) {
  const [pinned, setPinned] = useOpenUntilNavigate();
  const [hover, setHover] = useState(false);
  const open = pinned || hover;
  const close = () => { setPinned(false); setHover(false); };
  // El contenido del menú (con sus fotos) solo se dibuja la primera vez que la persona se acerca a él:
  // así la página inicial pesa menos y carga más rápido. Después queda listo para abrir al instante.
  const [armed, setArmed] = useState(false);
  const arm = () => setArmed(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setPinned(false); setHover(false); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setPinned]);

  return (
    <li
      data-open={open}
      className="group"
      onFocusCapture={arm}
      onPointerEnter={(e) => { arm(); if (e.pointerType === "mouse") setHover(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setHover(false); }}
    >
      <button
        type="button"
        aria-expanded={open}
        // Primer clic: lo deja fijo abierto. Otro clic: lo cierra.
        onClick={() => { arm(); if (pinned) close(); else setPinned(true); }}
        className="flex items-center gap-1.5 py-6 hover:text-white group-data-[open=true]:text-white"
      >
        {label}
        <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-data-[open=true]:rotate-180">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <div
        onClick={(e) => { if ((e.target as HTMLElement).closest("a")) close(); }}
        className={`invisible absolute top-full z-50 opacity-0 shadow-2xl transition group-data-[open=true]:visible group-data-[open=true]:opacity-100 ${panelClassName}`}
      >
        {armed && children}
      </div>
    </li>
  );
}
