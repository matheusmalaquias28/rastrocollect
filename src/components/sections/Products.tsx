"use client";

import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import BoosterPack from "@/components/ui/BoosterPack";
import { packs, type Pack } from "@/lib/packs";

type Item = {
  name: string;
  tone: "roxo" | "rosa" | "lilas" | "ink" | "holo";
  /** Fotos reais dos boosters da marca (leque de 3). Sem fotos, mostra o placeholder. */
  packs?: [Pack, Pack, Pack];
};

const items: Item[] = [
  { name: "Pokémon", tone: "rosa", packs: [packs.pokemonFogo, packs.pokemonHerois, packs.pokemonAmigos] },
  { name: "Disney Lorcana", tone: "roxo", packs: [packs.lorcanaFirst, packs.lorcanaWilds, packs.lorcanaInklands] },
  { name: "Yu-Gi-Oh!", tone: "ink", packs: [packs.yugiohInfinite, packs.yugiohServo, packs.yugiohTactical] },
  { name: "One Piece", tone: "holo", packs: [packs.onePieceOp12, packs.onePieceOp13, packs.onePieceOp17] },
  { name: "Magic", tone: "lilas", packs: [packs.magicSuperHeroes, packs.magicSenhorDosAneis, packs.magicFinalFantasy] },
  { name: "e outros títulos", tone: "roxo" },
];

/** Lista de universos estilo "pílulas": a ativa fica preta e o booster ao lado troca. */
export default function Products() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Depois que a pessoa escolhe uma categoria, a troca automática para de vez
  const [picked, setPicked] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  // Troca automática até o usuário interagir
  useEffect(() => {
    if (paused || picked || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % items.length), 2600);
    return () => window.clearInterval(id);
  }, [paused, picked]);

  // Seta acompanha a pílula ativa (desktop) e o carrossel centraliza a ativa (celular)
  useEffect(() => {
    const ul = listRef.current;
    const li = ul?.children[active] as HTMLElement | undefined;
    if (!ul || !li) return;
    const arrow = arrowRef.current;
    if (arrow) arrow.style.transform = `translateY(${li.offsetTop + li.offsetHeight / 2}px) translateY(-50%)`;
    // Rola só o carrossel na horizontal, sem mexer no scroll da página
    if (ul.scrollWidth > ul.clientWidth) {
      ul.scrollTo({ left: li.offsetLeft - (ul.clientWidth - li.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active]);

  const pick = (i: number) => {
    setActive(i);
    setPicked(true);
  };

  return (
    <section id="produtos" className="section overflow-x-clip">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow n="04">Produtos</Eyebrow>
            <h2 data-split className="t-h2 mt-8">
              Um universo inteiro dentro de uma <em>única experiência.</em>
            </h2>
          </div>
        </div>

        <div className="mt-14 grid items-center gap-10 md:mt-24 md:grid-cols-12 md:gap-8">
          {/* Lista */}
          <div className="relative min-w-0 md:col-span-7" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
            <span
              ref={arrowRef}
              aria-hidden
              className="absolute left-0 top-0 hidden text-rosa transition-transform duration-700 ease-[var(--ease-expo)] md:block"
            >
              <svg width="44" height="30" viewBox="0 0 44 30" fill="none">
                <path d="M2 15h36m0 0L26 3m12 12L26 27" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {/* Celular: carrossel horizontal com snap. Desktop: lista vertical */}
            <ul
              ref={listRef}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-col md:items-start md:gap-2.5 md:overflow-visible md:px-0 md:pb-0 md:pl-20"
            >
              {items.map((it, i) => (
                <li key={it.name} className="shrink-0 snap-center">
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    data-cursor={it.name}
                    className={`whitespace-nowrap rounded-[16px] border-[2px] px-4 py-1.5 text-left text-[1.45rem] md:border-[2.5px] md:text-[clamp(1.7rem,3.6vw,3.6rem)] font-semibold leading-[1.15] tracking-[-0.045em] transition-[background-color,color,border-color,transform] duration-500 ease-[var(--ease-expo)] md:rounded-[22px] md:px-6 ${
                      active === i ? "border-ink bg-ink text-white md:translate-x-2" : "border-ink/15 bg-white text-ink/70 hover:border-ink/40"
                    }`}
                  >
                    {it.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Booster (no celular fica acima das categorias) */}
          <div className="relative order-first md:order-none md:col-span-5">
            <div className="relative mx-auto aspect-[10/16] w-[min(56%,220px)] md:w-[min(72%,340px)]">
              {items.map((it, i) => (
                <div
                  key={it.name}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-expo)] ${
                    active === i ? "" : "pointer-events-none"
                  }`}
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "translateY(0) rotate(-4deg)" : `translateY(40px) rotate(${i % 2 ? 6 : -10}deg) scale(.92)`,
                  }}
                  aria-hidden={active !== i}
                >
                  {it.packs ? <PackFan packs={it.packs} /> : <Booster name={it.name} tone={it.tone} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-ink/10 pt-10 md:mt-28 md:grid-cols-12">
          <p data-reveal="up" className="t-lead text-ink/75 md:col-span-5">
            A operação começa com a venda de boosters originais e lacrados de diferentes universos do TCG.
          </p>
          <p data-reveal="up" className="t-body text-muted md:col-span-3 md:col-start-7">
            Uma seleção pensada para atender desde quem está começando a colecionar até quem já acompanha esse mercado há anos.
          </p>
          <p data-reveal="up" className="text-[0.9rem] leading-relaxed text-muted md:col-span-3 md:col-start-10">
            Novos formatos e produtos poderão ser incorporados à operação conforme a expansão da Rastro Collect.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Leque com 3 boosters reais da marca: o do meio na frente, os laterais inclinados atrás. */
function PackFan({ packs: [left, center, right] }: { packs: [Pack, Pack, Pack] }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="absolute w-[62%] -translate-x-[42%] translate-y-[4%] -rotate-[13deg] hover:z-20">
        <BoosterPack pack={left} />
      </div>
      <div className="absolute w-[62%] translate-x-[42%] translate-y-[4%] rotate-[13deg] hover:z-20">
        <BoosterPack pack={right} />
      </div>
      <div className="absolute z-10 w-[70%] -translate-y-[2%] rotate-[2deg] hover:z-20">
        <BoosterPack pack={center} />
      </div>
    </div>
  );
}

/** Pacote de booster placeholder. Trocar pela foto recortada (PNG) do booster real. */
function Booster({ name, tone }: { name: string; tone: Item["tone"] }) {
  return (
    <div className={`booster tcg-${tone} size-full`}>
      <div className="booster-shine" />
      <div
        className={`absolute inset-[10%_9%] z-[1] flex flex-col justify-between rounded-[4cqw] border p-[7cqw] ${
          tone === "lilas" || tone === "holo" ? "border-ink/15 text-ink" : "border-white/30 text-white"
        }`}
      >
        <span className="text-[5cqw] font-bold uppercase tracking-[0.18em] opacity-80">Booster</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/rastro-mark.svg" alt="" className="mx-auto w-[46%] drop-shadow-[0_20px_30px_rgb(0_0_0/0.3)]" />
        <div>
          <p className="text-[11cqw] font-bold leading-[0.95] tracking-[-0.04em] [text-wrap:balance]">{name}</p>
          <p className="mt-[3cqw] text-[4cqw] font-medium opacity-70">Foto do booster original aqui</p>
        </div>
      </div>
    </div>
  );
}
