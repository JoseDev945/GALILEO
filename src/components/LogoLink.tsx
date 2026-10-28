"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const HERO_RESET_EVENT = "galileo:hero-reset";

/** Enlace del logo: lleva al inicio y reinicia el carrusel desde el primer modelo. */
export function LogoLink({ children, className, label }: { children: React.ReactNode; className?: string; label: string }) {
  const path = usePathname();
  return (
    <Link
      href="/"
      aria-label={label}
      className={className}
      onClick={() => {
        window.dispatchEvent(new Event(HERO_RESET_EVENT));
        if (path === "/") window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </Link>
  );
}
