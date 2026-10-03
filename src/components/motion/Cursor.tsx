"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Tone = "roxo" | "rosa" | "ink" | "light";

const toneClass: Record<Tone, string> = {
  roxo: "bg-roxo text-white",
  rosa: "bg-rosa text-white",
  ink: "bg-ink text-white",
  light: "bg-white text-ink",
};

/**
 * Cursor estilo "multiplayer": seta + etiqueta que aparece sobre elementos interativos.
 * Use `data-cursor="Texto"` em qualquer elemento para trocar a etiqueta
 * e `data-cursor-tone="rosa|roxo|ink|light"` para trocar a cor.
 */
export default function Cursor() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [tone, setTone] = useState<Tone>("roxo");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const arrow = arrowRef.current!;
    const chip = chipRef.current!;
    const ax = gsap.quickTo(arrow, "x", { duration: 0.12, ease: "power3" });
    const ay = gsap.quickTo(arrow, "y", { duration: 0.12, ease: "power3" });
    const cx = gsap.quickTo(chip, "x", { duration: 0.5, ease: "power3" });
    const cy = gsap.quickTo(chip, "y", { duration: 0.5, ease: "power3" });
    let visible = false;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        gsap.set([arrow, chip], { x: e.clientX, y: e.clientY });
        gsap.to([arrow, chip], { autoAlpha: 1, duration: 0.25 });
        visible = true;
      }
      ax(e.clientX);
      ay(e.clientY);
      cx(e.clientX);
      cy(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-cursor], a, button");
      if (!el) {
        setLabel(null);
        return;
      }
      setLabel(el.dataset.cursor ?? (el.tagName === "A" ? "Abrir" : "Clique"));
      setTone((el.dataset.cursorTone as Tone) ?? "roxo");
    };
    const leave = () => {
      gsap.to([arrow, chip], { autoAlpha: 0, duration: 0.2 });
      visible = false;
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div ref={chipRef} className="invisible absolute left-0 top-0 opacity-0">
        <div
          className={`cursor-chip ml-[22px] mt-[24px] whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold tracking-[-0.01em] shadow-[0_10px_30px_-8px_rgb(48_14_110/0.45)] ${toneClass[tone]}`}
          style={{ transform: label ? "scale(1)" : "scale(0.2)", opacity: label ? 1 : 0 }}
        >
          {label ?? " "}
        </div>
      </div>
      <div ref={arrowRef} className="invisible absolute left-0 top-0 opacity-0">
        <svg
          width="26"
          height="28"
          viewBox="0 0 26 28"
          className="-ml-[3px] -mt-[3px] drop-shadow-[0_4px_10px_rgb(10_14_21/0.25)] transition-transform duration-300 ease-[var(--ease-expo)]"
          style={{ transform: `scale(${pressed ? 0.82 : label ? 1.08 : 1}) rotate(${label ? -8 : 0}deg)` }}
        >
          <path
            d="M3.2 2.6 22.4 12.1c1 .5.9 2-.2 2.3l-7.6 2.2c-.4.1-.7.4-.9.8l-3.2 7.4c-.5 1.1-2 1-2.3-.1L2.1 3.8c-.2-.8.4-1.5 1.1-1.2Z"
            fill={label && tone === "rosa" ? "#fc11a4" : "#0a0e15"}
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
