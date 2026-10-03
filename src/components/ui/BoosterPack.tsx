"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Pack } from "@/lib/packs";

/** Pacote de booster real: sombra sutil, inclina seguindo o mouse e cresce no hover. */
export default function BoosterPack({ pack, priority }: { pack: Pack; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 22}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 26}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
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
      data-cursor={pack.title}
      className="pack group relative"
    >
      <Image
        src={pack.src}
        alt={`Booster ${pack.title}`}
        width={pack.w}
        height={pack.h}
        sizes="(min-width: 768px) 22vw, 240px"
        priority={priority}
        loading={priority ? undefined : "eager"}
        draggable={false}
        className="pack-img block h-auto w-full select-none"
      />
      {/* Reflexo que acompanha o mouse */}
      <span aria-hidden className="pack-shine" style={{ ["--mask" as string]: `url(${pack.src})` }} />
    </div>
  );
}
