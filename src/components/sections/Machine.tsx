import Eyebrow from "@/components/ui/Eyebrow";
import Media from "@/components/ui/Media";

const without = ["Sem filas.", "Sem atendimento obrigatório.", "Sem complicação."];

export default function Machine() {
  return (
    <section id="maquina" className="section bg-paper">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        {/* Foto da máquina fixa enquanto o texto rola */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Media
              src="/images/maquina-frontal.jpg"
              alt="Lateral da máquina Rastro Collect vista de baixo, com a arte colorida da marca, em um shopping"
              sizes="(min-width: 768px) 34vw, 100vw"
              label="Foto frontal da Rastro Collect Machine"
              labelAt="top"
              tone="lilas"
              parallax={6}
              className="aspect-[3/4] rounded-[28px] md:aspect-[3/4.2] md:rounded-[40px]"
            >
              {/* Selo giratório */}
              <div className="absolute bottom-5 right-5 grid size-28 place-items-center md:bottom-7 md:right-7 md:size-36">
                <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 size-full">
                  <defs>
                    <path id="selo" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
                  </defs>
                  <circle cx="50" cy="50" r="50" fill="#0a0e15" />
                  <text fontSize="9.4" fontWeight="700" letterSpacing="2.2" fill="#fff">
                    <textPath href="#selo">100% AUTÔNOMA ✦ 100% AUTÔNOMA ✦</textPath>
                  </text>
                </svg>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/rastro-mark.svg" alt="" className="relative w-[38%]" />
              </div>
            </Media>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-10">
          <Eyebrow n="02">A máquina</Eyebrow>
          <h2 data-split className="t-h2 mt-8">
            Uma nova experiência para quem <em className="rosa">coleciona</em>.
          </h2>
          <p data-reveal="up" className="t-lead mt-10 max-w-[38ch] text-ink/70">
            A Rastro Collect Machine é uma solução autônoma para venda de boosters de TCG em ambientes de grande circulação.
          </p>
          <p data-reveal="up" className="t-body mt-6 max-w-[42ch] text-muted">
            O cliente escolhe o produto, realiza o pagamento e recebe o booster na hora.
          </p>

          <ul className="mt-16 md:mt-24">
            {without.map((t, i) => (
              <li key={t} className="relative py-6 md:py-8">
                <span data-draw className="absolute inset-x-0 top-0 block h-px bg-ink/12" />
                <div className="flex items-baseline gap-5">
                  <span data-reveal="up" className="w-8 shrink-0 text-[0.8rem] font-semibold text-rosa">
                    0{i + 1}
                  </span>
                  <p data-split className="text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[1] tracking-[-0.045em]">
                    {t}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal="up" className="mt-12 rounded-[28px] bg-ink p-8 text-white md:mt-16 md:rounded-[36px] md:p-12">
            <p className="bg-[linear-gradient(90deg,#d9c9ff,#fc11a4)] bg-clip-text text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em] text-transparent">
              100% autônoma.
            </p>
            <p className="t-lead mt-6 text-white/70">
              Simples para o cliente. <br className="hidden sm:block" />
              Prática para a operação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
