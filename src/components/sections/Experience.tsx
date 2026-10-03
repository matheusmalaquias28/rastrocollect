import Eyebrow from "@/components/ui/Eyebrow";
import FloatingCards, { type FloatingItem } from "@/components/ui/FloatingCards";
import Media from "@/components/ui/Media";

const tags = ["Cores", "Personagens", "Coleções", "Raridades", "Lançamentos"];

const cards: FloatingItem[] = [
  { x: "4%", y: "18%", w: "clamp(90px, 10vw, 170px)", r: -12, depth: 0.8, tone: "holo", title: "Raridade" },
  { x: "96%", y: "40%", w: "clamp(84px, 9vw, 160px)", r: 10, depth: 0.6, tone: "rosa", title: "Lançamento" },
  { x: "88%", y: "92%", w: "clamp(70px, 7vw, 120px)", r: -8, depth: 0.3, tone: "lilas", title: "Coleção", blur: 4, hideMobile: true },
  { x: "10%", y: "88%", w: "clamp(70px, 7vw, 130px)", r: 14, depth: 0.95, tone: "roxo", title: "Personagem", hideMobile: true },
];

export default function Experience() {
  return (
    <section id="experiencia" className="section overflow-x-clip">
      <div className="wrap">
        <div className="mx-auto max-w-[62rem] text-center">
          <Eyebrow n="08">Experiência</Eyebrow>
          <h2 data-split className="t-display mt-8">
            Um ponto de venda que também <em>chama atenção.</em>
          </h2>
        </div>

        <div className="relative mt-16 md:mt-24">
          <Media
            src="/images/maquina-noite.jpg"
            unoptimized
            alt="Máquina Rastro Collect iluminada em um corredor de shopping à noite, com pessoas passando"
            label="Máquina iluminada no shopping, cores e cards em destaque"
            labelAt="top"
            tone="roxo"
            className="aspect-[4/5] rounded-[28px] sm:aspect-[2184/1228] md:rounded-[40px]"
          >
            {/* Tags flutuando sobre a imagem */}
            <ul className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2 md:inset-x-auto md:bottom-auto md:right-8 md:top-8 md:max-w-[420px] md:justify-end">
              {tags.map((t, i) => (
                <li
                  key={t}
                  data-reveal="up"
                  className={`rounded-full px-4 py-2 text-[0.9rem] font-semibold backdrop-blur-md md:text-[1rem] ${
                    i % 2 ? "bg-rosa text-white" : "bg-white/90 text-ink"
                  }`}
                >
                  {t}
                </li>
              ))}
            </ul>
          </Media>
          <FloatingCards items={cards} className="z-10" />
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <p data-split className="text-[clamp(2rem,3.4vw,3.6rem)] font-semibold leading-[1] tracking-[-0.045em] md:col-span-5">
            O universo TCG é extremamente visual.
          </p>
          <div className="space-y-6 md:col-span-6 md:col-start-7">
            <p data-reveal="up" className="t-lead text-ink/75">
              Cores, personagens, coleções, raridades e lançamentos fazem parte da experiência. Por isso, a máquina da Rastro Collect não foi
              pensada apenas para vender.
            </p>
            <p data-reveal="up" className="t-body text-muted">
              Ela também funciona como um ponto de descoberta dentro do shopping, despertando curiosidade mesmo de quem ainda não conhece o
              universo dos cards colecionáveis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
