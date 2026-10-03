"use client";

import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
// Evita recalcular tudo quando a barra de endereço do celular aparece/some
ScrollTrigger.config({ ignoreMobileResize: true });

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });
export const useLenis = () => useContext(LenisContext);

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll suave sincronizado com o ticker do GSAP
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Recalcula as posições do ScrollTrigger quando a altura da página muda depois do
  // carregamento (imagens, SVGs, fontes). Sem isso, gatilhos do fim da página ficam
  // com posições antigas e as animações de lá não disparam.
  useEffect(() => {
    let timer = 0;
    let lastHeight = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - lastHeight) < 2) return;
      lastHeight = h;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // Links âncora usam o scroll suave
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      const target = id === "#" || id === "#topo" ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      if (lenisRef.current) lenisRef.current.scrollTo(target, { offset: -40, duration: 1.6 });
      else if (target === 0) window.scrollTo({ top: 0 });
      else target.scrollIntoView();
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Animações declarativas via data-attributes
  useGSAP(() => {
    const mm = gsap.matchMedia();
    let splits: SplitText[] = [];

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Blocos que sobem. Usamos IntersectionObserver em vez de ScrollTrigger.batch:
      // o observer sempre usa a posição real do elemento, enquanto o ScrollTrigger guarda
      // posições calculadas no último refresh. Quando a altura da página muda depois disso
      // (imagens e SVGs carregando), elementos do fim da página, como a logo do rodapé,
      // ficavam presos em opacity 0.
      // Elementos que entram juntos sobem em sequência (stagger), como antes.
      let queue: HTMLElement[] = [];
      let flush = 0;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            io.unobserve(entry.target);
            queue.push(entry.target as HTMLElement);
          });
          if (!queue.length || flush) return;
          flush = requestAnimationFrame(() => {
            const batch = queue;
            queue = [];
            flush = 0;
            gsap.fromTo(
              batch,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.08,
                delay: parseFloat(batch[0].dataset.delay || "0"),
              },
            );
          });
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      document.querySelectorAll('[data-reveal="up"]').forEach((el) => io.observe(el));

      // Conteúdo do topo: anima no carregamento, sem depender do scroll
      // (em telas baixas os botões ficam abaixo da linha de disparo do batch)
      gsap.fromTo(
        '[data-reveal="intro"]',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "expo.out", stagger: 0.09, delay: 0.45 },
      );

      // Imagens com cortina + zoom interno
      gsap.utils.toArray<HTMLElement>('[data-reveal="img"]').forEach((el) => {
        const inner = el.querySelector("[data-media-inner]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
        tl.fromTo(
          el,
          { clipPath: "inset(18% 10% 0% 10% round 2rem)" },
          { clipPath: "inset(0% 0% 0% 0% round 0rem)", duration: 1.6, ease: "expo.out" },
        );
        if (inner) tl.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 2, ease: "expo.out" }, 0);
      });

      // Mídia que cresce com o scroll
      gsap.utils.toArray<HTMLElement>("[data-grow]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: parseFloat(el.dataset.grow || "0.86") },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 25%", scrub: true },
          },
        );
      });

      // Linhas horizontais que se desenham
      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: "expo.inOut",
            transformOrigin: "0% 50%",
            scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
          },
        );
      });
      return () => {
        io.disconnect();
        cancelAnimationFrame(flush);
      };
    });

    // Parallax só a partir do tablet
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "10");
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Títulos e textos que dependem da fonte carregada para medir certo
    document.fonts.ready.then(() => {
      const reduce = reducedMotion();

      // Títulos: palavras sobem dentro de linhas mascaradas
      splits = gsap.utils.toArray<HTMLElement>("[data-split]").map((el) => {
        gsap.set(el, { opacity: 1 });
        return SplitText.create(el, {
          type: "lines,words",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            if (reduce) return;
            return gsap.from(self.words, {
              yPercent: 118,
              rotate: 4,
              duration: 1.4,
              ease: "expo.out",
              stagger: 0.045,
              delay: parseFloat(el.dataset.delay || "0"),
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            });
          },
        });
      });

      // Parágrafos que "acendem" palavra por palavra com o scroll
      gsap.utils.toArray<HTMLElement>("[data-fill]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        splits.push(split);
        if (reduce) return;
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
      });

      ScrollTrigger.refresh();
    });

    return () => {
      splits.forEach((s) => s.revert());
      mm.revert();
    };
  });

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
