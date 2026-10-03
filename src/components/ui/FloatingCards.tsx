"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TcgCard, { type CardTone } from "@/components/ui/TcgCard";
import BoosterPack from "@/components/ui/BoosterPack";
import type { Pack } from "@/lib/packs";

export type FloatingItem = {
  /** Posição do centro da carta, em % do container. */
  x: string;
  y: string;
  /** Largura (aceita clamp). */
  w: string;
  /** Rotação base em graus. */
  r: number;
  /** 0 a 1: quanto reage ao mouse/scroll. Valores altos = mais perto da câmera. */
  depth: number;
  tone?: CardTone;
  title?: string;
  /** Foto real de booster no lugar da carta placeholder. */
  pack?: Pack;
  src?: string;
  /** Desfoque em px para dar profundidade de campo. */
  blur?: number;
  /** Esconde no celular para não brigar com o texto. */
  hideMobile?: boolean;
};

type Props = {
  items: FloatingItem[];
  className?: string;
  delay?: number;
  /** Multiplicador do parallax de scroll (0 desliga). */
  drift?: number;
};

export default function FloatingCards({
  items,
  className = "",
  delay = 0.2,
  drift = 1,
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const els = gsap.utils.toArray<HTMLElement>("[data-fc]");

        els.forEach((el, i) => {
          const depth = parseFloat(el.dataset.depth || "0.5");
          const inner = el.querySelector("[data-fc-inner]");
          const float = el.querySelector("[data-fc-float]");

          // Entrada: sobe girando e termina no ângulo base da carta.
          // (o GSAP zera a propriedade CSS `rotate` e assume o ângulo no transform;
          // a propriedade CSS só vale quando não há animação, ex.: reduced motion)
          const baseRotate = parseFloat(el.dataset.r || "0");
          gsap.fromTo(
            inner,
            {
              y: 220,
              opacity: 0,
              rotate: gsap.utils.random(-30, 30),
              scale: 0.8,
            },
            {
              y: 0,
              opacity: 1,
              rotate: baseRotate,
              scale: 1,
              duration: 1.8,
              ease: "expo.out",
              delay: delay + i * 0.07,
              scrollTrigger: {
                trigger: root.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );

          // Flutuação contínua
          gsap.to(float, {
            y: 10 + depth * 16,
            rotation: gsap.utils.random(-4, 4),
            duration: gsap.utils.random(2.8, 4.6),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: gsap.utils.random(0, 1.5),
          });

          // Parallax de scroll: as mais próximas andam mais
          gsap.fromTo(
            el,
            { y: depth * 90 * drift },
            {
              y: -depth * 160 * drift,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        // Parallax de mouse
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const movers = els.map((el) => {
          const m = el.querySelector("[data-fc-mouse]");
          const d = parseFloat(el.dataset.depth || "0.5");
          return {
            d,
            x: gsap.quickTo(m, "x", { duration: 1.2, ease: "power3" }),
            y: gsap.quickTo(m, "y", { duration: 1.2, ease: "power3" }),
          };
        });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(-nx * m.d * 80);
            m.y(-ny * m.d * 60);
          });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {items.map((it, i) => (
        <div
          key={i}
          data-fc
          data-depth={it.depth}
          data-r={it.r}
          className={`absolute ${it.hideMobile ? "hidden md:block" : ""}`}
          style={{
            left: it.x,
            top: it.y,
            width: it.w,
            zIndex: Math.round(it.depth * 10),
            filter: it.blur ? `blur(${it.blur}px)` : undefined,
          }}
        >
          {/* Centraliza no ponto x/y. Fica num wrapper próprio porque o GSAP anima o
              transform do [data-fc] e leria o -50% antes da imagem carregar (altura 0) */}
          <div className="-translate-x-1/2 -translate-y-1/2">
            <div data-fc-mouse>
              <div data-fc-float>
                <div
                  data-fc-inner
                  style={{ rotate: `${it.r}deg` }}
                  className={it.blur ? "" : "pointer-events-auto"}
                >
                  {it.pack ? (
                    <BoosterPack pack={it.pack} />
                  ) : (
                    <TcgCard
                      title={it.title ?? ""}
                      tone={it.tone}
                      src={it.src}
                      tilt={!it.blur}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
