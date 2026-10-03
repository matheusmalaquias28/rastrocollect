import Eyebrow from "@/components/ui/Eyebrow";
import Media from "@/components/ui/Media";

export default function About() {
  return (
    <section id="sobre" className="section">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Eyebrow n="01">Sobre a Rastro</Eyebrow>
            <h2 data-split className="t-h2 mt-8 max-w-[11ch]">
              Muito além de uma <em>máquina</em> de vendas.
            </h2>
          </div>
          <div className="flex items-end md:col-span-5">
            <p data-reveal="up" className="t-lead max-w-[34ch] text-ink/70">
              A Rastro Collect nasceu para aproximar o público do universo TCG de uma forma simples, acessível e diferente.
            </p>
          </div>
        </div>

        <p data-fill className="mt-24 max-w-[24ch] text-[clamp(1.9rem,4vw,4.4rem)] font-semibold leading-[1.08] tracking-[-0.04em] md:mt-36">
          Pokémon, Disney Lorcana, Yu-Gi-Oh!, One Piece, Magic e outros universos fazem parte de um mercado movido por{" "}
          <span className="text-roxo">coleção</span>, <span className="text-rosa">entretenimento</span>,{" "}
          <span className="text-violeta">descoberta</span> e <span className="text-roxo">comunidade</span>.
        </p>

        <div className="mt-24 grid gap-5 md:mt-36 md:grid-cols-12 md:gap-6">
          <Media
            src="/images/crianca-maquina.jpg"
            alt="Criança com as mãos no vidro da máquina Rastro Collect, encantada com os boosters de Pokémon"
            label="Pessoas descobrindo boosters na frente da máquina"
            tone="lilas"
            sizes="(min-width: 768px) 47vw, 100vw"
            parallax={10}
            className="aspect-[4/3] rounded-[28px] md:col-span-7 md:aspect-auto md:min-h-[38vw] md:rounded-[36px]"
          />
          <div className="flex flex-col gap-5 md:col-span-5 md:gap-6">
            <Media
              src="/images/booster-mao.jpg"
              alt="Mão segurando vários boosters de Pokémon lacrados no corredor de um shopping"
              sizes="(min-width: 768px) 34vw, 100vw"
              label="Detalhe: booster lacrado na mão do cliente"
              tone="rosa"
              parallax={10}
              className="aspect-[4/3] rounded-[28px] md:rounded-[36px]"
            />
            <div data-reveal="up" className="flex flex-1 flex-col justify-between gap-10 rounded-[28px] bg-lilas-50 p-7 md:rounded-[36px] md:p-10">
              <span className="text-[0.8rem] font-semibold text-roxo">A proposta</span>
              <p className="t-h3 max-w-[20ch]">
                Transformar esse interesse em uma nova experiência dentro do varejo físico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
