"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Valores puramente ilustrativos do painel (não são dados reais)
const sales = [38, 52, 44, 61, 57, 72, 66, 84, 78, 92, 88, 100];
const stock = [
  { name: "Pokémon", v: 82, c: "#fc11a4" },
  { name: "Lorcana", v: 64, c: "#6632ef" },
  { name: "Yu-Gi-Oh!", v: 47, c: "#b93ced" },
  { name: "One Piece", v: 23, c: "#fc11a4" },
  { name: "Magic", v: 71, c: "#6632ef" },
];

/** Mockup do sistema de monitoramento remoto. Substituir por print real quando houver. */
export default function Dashboard() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", toggleActions: "play none none none" } });
        tl.from("[data-panel]", { y: 60, opacity: 0, rotateX: 12, duration: 1.4, ease: "expo.out" })
          .from("[data-bar]", { scaleY: 0, transformOrigin: "50% 100%", duration: 1.2, ease: "expo.out", stagger: 0.04 }, 0.3)
          .from("[data-stock]", { scaleX: 0, transformOrigin: "0% 50%", duration: 1.4, ease: "expo.out", stagger: 0.08 }, 0.5)
          .from("[data-ring]", { strokeDashoffset: 2 * Math.PI * 34, duration: 1.8, ease: "expo.out" }, 0.5)
          .from("[data-chip]", { y: 20, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1 }, 0.8);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const ring = 2 * Math.PI * 34;

  return (
    <div ref={root} className="relative [perspective:1400px]" data-cursor="Painel Rastro" data-cursor-tone="light">
      <div data-panel className="rounded-[28px] bg-white p-4 text-ink shadow-[0_60px_120px_-40px_rgb(102_50_239/0.6)] md:rounded-[36px] md:p-6">
        {/* Topo */}
        <div className="flex items-center justify-between gap-4 px-2 pb-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/rastro-mark.svg" alt="" className="h-7 w-auto" />
            <div>
              <p className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em]">Unidade 01</p>
              <p className="text-[0.75rem] text-muted">Painel de monitoramento</p>
            </div>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-lilas-50 px-3 py-1.5 text-[0.75rem] font-semibold text-roxo">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-roxo/60" />
              <span className="relative size-2 rounded-full bg-roxo" />
            </span>
            Online
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          {/* Vendas */}
          <div className="rounded-[20px] bg-paper p-5 md:col-span-3">
            <div className="flex items-baseline justify-between">
              <p className="text-[0.8rem] font-semibold text-muted">Volume de vendas</p>
              <p className="text-[0.75rem] text-muted">12 semanas</p>
            </div>
            <div className="mt-6 flex h-36 items-end gap-1.5 md:h-44">
              {sales.map((v, i) => (
                <span
                  key={i}
                  data-bar
                  className="flex-1 rounded-t-[6px]"
                  style={{
                    height: `${v}%`,
                    background: i === sales.length - 1 ? "#fc11a4" : i > sales.length - 4 ? "#6632ef" : "#d9c9ff",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desempenho */}
          <div className="flex flex-col items-center justify-center rounded-[20px] bg-ink p-5 text-white md:col-span-2">
            <p className="self-start text-[0.8rem] font-semibold text-white/60">Desempenho da unidade</p>
            <svg viewBox="0 0 80 80" className="mt-4 size-32 -rotate-90">
              <circle cx="40" cy="40" r="34" stroke="rgb(255 255 255 / .1)" strokeWidth="8" fill="none" />
              <circle
                data-ring
                cx="40"
                cy="40"
                r="34"
                stroke="url(#ring)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={ring}
                strokeDashoffset={ring * 0.22}
              />
              <defs>
                <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#d9c9ff" />
                  <stop offset="1" stopColor="#fc11a4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Estoque */}
          <div className="rounded-[20px] bg-paper p-5 md:col-span-3">
            <p className="text-[0.8rem] font-semibold text-muted">Estoque disponível</p>
            <ul className="mt-5 space-y-3">
              {stock.map((s) => (
                <li key={s.name} className="grid grid-cols-[84px_1fr] items-center gap-3 text-[0.8rem] font-medium">
                  <span className="truncate">{s.name}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-ink/[0.06]">
                    <span data-stock className="block h-full rounded-full" style={{ width: `${s.v}%`, background: s.c }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reposição */}
          <div className="flex flex-col justify-between gap-6 rounded-[20px] bg-lilas-50 p-5 md:col-span-2">
            <p className="text-[0.8rem] font-semibold text-muted">Necessidade de reposição</p>
            <div className="space-y-2">
              <p data-chip className="flex items-center justify-between rounded-full bg-white px-3.5 py-2 text-[0.78rem] font-semibold">
                One Piece <span className="text-rosa">Repor</span>
              </p>
              <p data-chip className="flex items-center justify-between rounded-full bg-white px-3.5 py-2 text-[0.78rem] font-semibold">
                Yu-Gi-Oh! <span className="text-roxo">Programada</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-right text-[0.72rem] text-white/35">Interface ilustrativa</p>
    </div>
  );
}
