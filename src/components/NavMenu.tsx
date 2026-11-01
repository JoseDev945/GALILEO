"use client";

import { useEffect, useState } from "react";
import { useOpenUntilNavigate } from "./useOpenUntilNavigate";

/** Menú desplegable: se abre con un clic y queda abierto hasta otro clic en el botón, Esc o al elegir una opción. */
export function NavMenu({ label, children, panelClassName = "" }: { label: string; children: React.ReactNode; panelClassName?: string }) {
  const [open, setOpen] = useOpenUntilNavigate();
  // El contenido del menú (con sus fotos) solo se dibuja la primera vez que la persona se acerca a él:
  // así la página inicial pesa menos y carga más rápido. Después queda listo para abrir al instante.
  const [armed, setArmed] = useState(false);
  const arm = () => setArmed(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <li
      data-open={open}
      className="group"
      onFocusCapture={arm}
      // Pasar el mouse solo prepara el contenido; el menú se abre y se cierra únicamente con clic en el botón.
      onPointerEnter={arm}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => { arm(); setOpen((o) => !o); }}
        className="flex items-center gap-1.5 py-6 hover:text-white group-data-[open=true]:text-white"
      >
        {label}
        <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-data-[open=true]:rotate-180">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <div
        onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}
        className={`invisible absolute top-full z-50 opacity-0 shadow-2xl transition group-data-[open=true]:visible group-data-[open=true]:opacity-100 ${panelClassName}`}
      >
        {armed && children}
      </div>
    </li>
  );
}
