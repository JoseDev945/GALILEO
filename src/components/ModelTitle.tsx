import type { BoatModel } from "@/data/catalog";

export function ModelTitle({ m, className = "" }: { m: BoatModel; className?: string }) {
  return (
    <span className={`model-title ${className}`}>
      {m.num && <span className="model-num">{m.num}</span>}
      {m.num && " "}
      {m.word}
    </span>
  );
}
