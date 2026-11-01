import type { CSSProperties } from "react";
import type { BoatModel } from "@/data/catalog";

/**
 * Nombre del modelo y al lado lo que mide (ej. "GALILEO 30.5 pies", "DELPHIN 18 pies doble realce").
 * La medida va en cursiva y del color del bote; `light` usa el tono claro (para fondos oscuros).
 */
export function ModelTitle({ m, className = "", light = false }: { m: BoatModel; className?: string; light?: boolean }) {
  return (
    <span className={`model-title ${className}`} style={{ "--num-color": light ? m.accent[1] : m.accent[0] } as CSSProperties}>
      {m.word}
      {m.num && " "}
      {m.num && <span className="model-num">{m.num}</span>}
      {m.num && <span className="model-unit"> pies</span>}
      {m.suffix && <span className="model-unit"> {m.suffix}</span>}
    </span>
  );
}
