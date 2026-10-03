import Button from "@/components/ui/Button";
import FloatingCards, { type FloatingItem } from "@/components/ui/FloatingCards";
import Media from "@/components/ui/Media";
import { packs } from "@/lib/packs";
import { universes, whatsappUrl } from "@/lib/site";

// Pacotes reais de booster flutuando, cada um num ângulo
const cards: FloatingItem[] = [
  { x: "7%", y: "26%", w: "clamp(117px, 12.3vw, 215px)", r: -18, depth: 0.9, pack: packs.pokemonHerois },
  { x: "2%", y: "66%", w: "clamp(100px, 9.8vw, 170px)", r: 12, depth: 0.4, pack: packs.lorcanaFirst, hideMobile: true },
  { x: "16%", y: "90%", w: "clamp(86px, 8.5vw, 146px)", r: -9, depth: 0.6, pack: packs.pokemonAmigos, hideMobile: true },
  { x: "93%", y: "23%", w: "clamp(112px, 11.7vw, 205px)", r: 16, depth: 0.75, pack: packs.lorcanaWilds },
  { x: "99%", y: "62%", w: "clamp(100px, 10vw, 177px)", r: -14, depth: 0.35, pack: packs.pokemonFogo, hideMobile: true },
  { x: "85%", y: "88%", w: "clamp(90px, 9.1vw, 160px)", r: 8, depth: 1, pack: packs.lorcanaInklands, hideMobile: true },
];

// No celular os pacotes viram um leque abaixo dos botões, para não cobrir o título
const mobileCards: FloatingItem[] = [
  { x: "24%", y: "46%", w: "104px", r: -16, depth: 0.5, pack: packs.lorcanaFirst },
  { x: "50%", y: "42%", w: "120px", r: 3, depth: 0.8, pack: packs.pokemonEquilibrio },
  { x: "76%", y: "46%", w: "104px", r: 15, depth: 0.5, pack: packs.pokemonFogo },
];

// No celular, alguns pacotes espiam pelas bordas, atrás do título, para já ter imagem na primeira tela
const mobileEdge: FloatingItem[] = [
  { x: "0%", y: "12%", w: "118px", r: -16, depth: 0.6, pack: packs.pokemonHerois },
  { x: "100%", y: "21%", w: "126px", r: 14, depth: 0.8, pack: packs.lorcanaWilds },
];

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-x-clip pt-[140px] md:pt-[150px]">
      {/* Halo de cor */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[120vh]">
        <div className="absolute left-1/2 top-[8%] h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(217_201_255/0.55),transparent)] blur-2xl" />
        <div className="absolute left-[62%] top-[30%] h-[40vh] w-[36vw] rounded-full bg-[radial-gradient(closest-side,rgb(252_17_164/0.12),transparent)] blur-2xl" />
      </div>

      <div className="relative min-h-[calc(100svh-170px)]">
        <FloatingCards items={cards} delay={0.5} className="hidden md:block" />
        <FloatingCards items={mobileEdge} delay={0.3} drift={0.4} className="md:hidden" />

        <div className="wrap relative z-20 flex flex-col items-center pb-16 pt-6 text-center md:pt-10">
          <p data-reveal="intro" className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 text-[0.8rem] font-semibold shadow-[0_0_0_1px_rgb(10_14_21/0.06)] backdrop-blur">
            <span className="rounded-full bg-lilas-50 px-2.5 py-1 text-roxo">TCG</span>
            <span>
              Máquinas <span className="hidden sm:inline">autônomas </span>para shopping centers
            </span>
          </p>

          <h1 data-split className="t-display mx-auto max-w-[15ch] md:!text-[clamp(2.9rem,min(7.4vw,11svh),8.75rem)]">
            O universo dos cards colecionáveis em um <em>novo formato</em> de varejo.
          </h1>

          <p data-reveal="intro" className="t-lead mx-auto mt-7 max-w-[44ch] md:mt-8 text-ink/70">
            A Rastro Collect leva o universo TCG para dentro dos shopping centers por meio de uma experiência de compra autônoma, moderna e
            visualmente atrativa.
          </p>

          <div data-reveal="intro" className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="#sobre" size="lg" cursor="Conhecer">
              Conheça a Rastro Collect
            </Button>
            <Button href={whatsappUrl} external size="lg" variant="outline" cursor="WhatsApp">
              Falar com a Rastro
            </Button>
          </div>

          <div className="relative mt-6 h-[370px] w-full md:hidden">
            <FloatingCards items={mobileCards} delay={0.6} drift={0.25} />
          </div>

          <p data-reveal="intro" className="t-body mx-auto mt-4 max-w-[52ch] text-muted md:mt-10">
            Boosters originais, compra rápida e uma operação pensada para ocupar pouco espaço e gerar novas possibilidades de fluxo e consumo.
          </p>
        </div>
      </div>

      {/* Universos */}
      <div className="wrap relative z-20 mt-6 flex flex-col items-center gap-5 md:flex-row md:justify-between">
        <span data-reveal="up" className="text-[0.8rem] font-medium text-ink/45">
          Universos que fazem parte
        </span>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12">
          {[...universes, "e outros"].map((u) => (
            <li key={u} data-reveal="up" className="text-[1.05rem] font-bold tracking-[-0.03em] text-ink/35 md:text-[1.35rem]">
              {u}
            </li>
          ))}
        </ul>
      </div>

      {/* Mídia principal */}
      <div className="wrap relative z-10 mt-14 md:mt-20">
        <div data-grow="0.88" className="origin-top">
          <Media
            src="/images/maquina-shopping-hd.jpg"
            unoptimized
            alt="Máquina Rastro Collect instalada no corredor de um shopping, com boosters de Pokémon expostos"
            sizes="80vw"
            label="Vídeo ou foto da máquina Rastro Collect instalada em um shopping"
            tone="roxo"
            reveal={false}
            parallax={0}
            priority
            className="aspect-[4/5] rounded-[28px] sm:aspect-[3081/1731] md:rounded-[40px]"
          />
        </div>
      </div>
    </section>
  );
}
