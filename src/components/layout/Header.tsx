"use client";

import { useEffect, useState } from "react";
import { nav, universes, whatsappUrl } from "@/lib/site";

const ticker = [
  "Boosters originais e lacrados",
  ...universes,
  "Compra 100% autônoma",
  "Cartão, aproximação ou Pix",
  "Universo TCG em um novo formato de varejo",
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Esconde ao rolar para baixo, volta ao rolar para cima
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 300);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Faixa com letreiro */}
        <div className="overflow-hidden bg-ink py-1.5 text-[0.72rem] font-medium text-white/80">
          <div className="marquee" style={{ ["--speed" as string]: "55s" }}>
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
                {[...ticker, ...ticker].map((t, i) => (
                  <span key={i} className="flex items-center gap-6 pr-6">
                    {t}
                    <span className={i % 2 ? "text-lilas" : "text-rosa"}>✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            scrolled || open ? "bg-white/80 shadow-[0_1px_0_rgb(10_14_21/0.06)] backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <div className="wrap flex h-16 items-center justify-between gap-6 md:h-[74px]">
            <a href="#topo" aria-label="Rastro Collect, voltar ao topo" data-cursor="Topo" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/rastro-collect.svg" alt="Rastro Collect" width={1934} height={436} className="h-7 w-auto md:h-8" />
            </a>

            <nav aria-label="Principal" className="hidden items-center gap-1 rounded-full border border-ink/[0.07] bg-white/70 p-1 backdrop-blur-md lg:flex">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  data-cursor="Ir"
                  className="rounded-full px-4 py-2 text-[0.9rem] font-medium text-ink/70 transition-colors duration-300 hover:bg-lilas-50 hover:text-ink"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="WhatsApp"
                data-cursor-tone="rosa"
                className="hidden rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-semibold text-white transition-colors duration-300 hover:bg-rosa sm:inline-flex"
              >
                Falar com a Rastro
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                className="flex h-10 items-center gap-2 rounded-full border border-ink/10 bg-white px-4 text-[0.9rem] font-semibold lg:hidden"
              >
                {open ? "Fechar" : "Menu"}
                <span className="relative block h-2.5 w-4">
                  <span className={`absolute left-0 block h-[1.5px] w-full bg-ink transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 block h-[1.5px] w-full bg-ink transition-transform duration-500 ${open ? "top-1 -rotate-45" : "top-2"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col justify-end bg-white px-5 pb-10 pt-32 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[...nav, { href: "#contato", label: "Contato" }].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`border-b border-ink/10 py-4 text-[2.2rem] font-semibold tracking-[-0.04em] transition-[transform,opacity] duration-700 ease-[var(--ease-expo)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 rounded-full bg-ink py-4 text-center font-semibold text-white"
        >
          Falar com a Rastro
        </a>
      </div>
    </>
  );
}
