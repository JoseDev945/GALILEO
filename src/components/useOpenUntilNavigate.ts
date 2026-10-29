"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

/**
 * Estado abierto/cerrado de un menú que se cierra solo al cambiar de página.
 * Guarda en qué ruta se abrió: si la ruta cambia, el menú queda cerrado sin necesidad de un efecto.
 */
export function useOpenUntilNavigate() {
  const path = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === path;
  const setOpen = useCallback(
    (next: boolean | ((current: boolean) => boolean)) =>
      setOpenAt((prev) => {
        const value = typeof next === "function" ? next(prev === path) : next;
        return value ? path : null;
      }),
    [path],
  );
  return [open, setOpen] as const;
}
