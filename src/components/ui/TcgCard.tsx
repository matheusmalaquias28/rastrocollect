"use client";

import Image from "next/image";
import { useRef } from "react";

export type CardTone = "roxo" | "rosa" | "lilas" | "ink" | "holo";

type TcgCardProps = {
  /** Nome no topo da carta (ex.: universo). */
  title: string;
  /** Texto pequeno de rodapé. */
  label?: string;
  tone?: CardTone;
  /** Arte real da carta. Sem src, mostra o símbolo da Rastro. */
  src?: string;
  className?: string;
  /** Inclinação 3D seguindo o mouse. */
  tilt?: boolean;
};

/** Carta placeholder no formato TCG (63 × 88). Troque por fotos passando `src`. */
export default function TcgCard({ title, label = "Rastro Collect", tone = "roxo", src, className = "", tilt = true }: TcgCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!tilt || e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - py) * 18}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 22}deg`);
  };
  const onLeave = () => {
    const el = ref.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor={tilt ? title : undefined}
      data-cursor-tone={tone === "rosa" ? "rosa" : "roxo"}
      className={`tcg tcg-${tone} ${className}`}
    >
      <div className="tcg-frame">
        <div className="tcg-top">
          <span className="truncate">{title}</span>
          <i />
        </div>
        <div className="tcg-art">
          {src ? (
            <Image src={src} alt={title} fill sizes="300px" className="object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/brand/rastro-mark.svg" alt="" className="mark" draggable={false} />
          )}
        </div>
        <div className="tcg-lines">
          <i />
          <i />
          <i />
        </div>
        <span className="tcg-label">{label}</span>
      </div>
    </div>
  );
}
