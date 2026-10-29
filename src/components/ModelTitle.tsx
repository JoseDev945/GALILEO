import type { CSSProperties } from "react";
import type { BoatModel } from "@/data/catalog";

/**
 * Nombre del modelo primero y luego el número (ej. "CORVINA 14", "GALILEO 18 DOBLE REALCE").
 * El número va en cursiva y del color del bote; `light` usa el tono claro (para fondos oscuros).
 */
export function ModelTitle({ m, className = "", light = false }: { m: BoatModel; className?: string; light?: boolean }) {
  return (
    <span className={`model-title ${className}`} style={{ "--num-color": light ? m.accent[1] : m.accent[0] } as CSSProperties}>
      {m.word}
      {m.num && " "}
      {m.num && <span className="model-num">{m.num}</span>}
      {m.suffix && ` ${m.suffix}`}
    </span>
  );
}
