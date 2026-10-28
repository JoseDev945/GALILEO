"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Menú desplegable que se abre con clic o al pasar el mouse, y se cierra con Esc, clic afuera o al navegar. */
export function NavMenu({ label, children, panelClassName = "" }: { label: string; children: React.ReactNode; panelClassName?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <li ref={ref} data-open={open} className="group">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 py-6 hover:text-white group-data-[open=true]:text-white"
      >
        {label}
        <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="transition-transform group-hover:rotate-180 group-data-[open=true]:rotate-180">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <div
        onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}
        className={`invisible absolute top-full z-50 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100 group-data-[open=true]:visible group-data-[open=true]:opacity-100 ${panelClassName}`}
      >
        {children}
      </div>
    </li>
  );
}
