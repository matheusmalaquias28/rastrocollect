import Eyebrow from "@/components/ui/Eyebrow";
import Icon, { type IconName } from "@/components/ui/Icon";
import Media from "@/components/ui/Media";

const benefits: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "box",
    title: "Baixa ocupação de espaço",
    text: "Uma estrutura compacta, com dimensões semelhantes às de uma máquina autônoma convencional.",
  },
  {
    icon: "auto",
    title: "Operação autônoma",
    text: "Não é necessário manter um atendente dedicado à máquina.",
  },
  {
    icon: "sparkle",
    title: "Apelo visual",
    text: "Uma experiência diferente, colorida e naturalmente conectada a um universo de alto engajamento.",
  },
  {
    icon: "users",
    title: "Público diverso",
    text: "De crianças acompanhadas pelos pais a adultos que já fazem parte do universo dos colecionáveis.",
  },
  {
    icon: "flow",
    title: "Potencial de circulação",
    text: "Uma nova atração dentro do shopping, capaz de estimular visitas, permanência e consumo em outras operações do empreendimento.",
  },
];

export default function ForMalls() {
  return (
    <section id="shopping" className="section bg-paper">
      <div className="wrap">
        <Eyebrow n="05">Para o shopping</Eyebrow>
        <h2 data-split className="t-display mt-8 max-w-[14ch]">
          Uma operação compacta. <em className="rosa">Um público que já existe.</em>
        </h2>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
          <p data-reveal="up" className="t-lead text-ink/75 md:col-span-5">
            A Rastro Collect foi pensada para se integrar de forma simples ao ambiente do shopping.
          </p>
          <p data-reveal="up" className="t-body text-muted md:col-span-5 md:col-start-8">
            A máquina ocupa pouco espaço, não exige equipe fixa no local e cria um novo ponto de interesse para crianças, jovens, adultos e
            colecionadores.
          </p>
        </div>

        {/* Bento */}
        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-6 md:gap-5">
          <Media
            src="/images/arte-rastro.jpg"
            alt="Arte da marca Rastro Collect com o símbolo R, raios coloridos e a frase Mais que cartas, conexões reais"
            sizes="(min-width: 768px) 55vw, 100vw"
            label="Máquina instalada no corredor do shopping, com público ao redor"
            labelAt="top"
            tone="lilas"
            parallax={8}
            className="aspect-[4/3] rounded-[28px] md:col-span-4 md:row-span-2 md:aspect-auto md:min-h-[40vw] md:rounded-[36px]"
          >
            <div className="absolute inset-x-4 bottom-4 rounded-[22px] bg-white/85 p-6 backdrop-blur-md md:inset-x-auto md:bottom-6 md:left-6 md:max-w-[440px] md:p-8">
              <p className="text-[clamp(1.25rem,1.8vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
                Mais do que uma compra, ela cria um motivo para <span className="text-roxo">parar, descobrir e interagir.</span>
              </p>
            </div>
          </Media>

          {benefits.map((b, i) => (
            <article
              key={b.title}
              data-reveal="up"
              className={`group flex flex-col justify-between gap-12 rounded-[28px] p-7 transition-colors duration-500 md:rounded-[36px] md:p-9 ${
                i === 0 ? "bg-ink text-white md:col-span-2" : i === 1 ? "bg-rosa text-white md:col-span-2" : "bg-white md:col-span-2"
              }`}
            >
              <span
                className={`grid size-12 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-[-12deg] group-hover:scale-110 ${
                  i < 2 ? "bg-white/12" : "bg-lilas-50 text-roxo"
                }`}
              >
                <Icon name={b.icon} className="size-6" />
              </span>
              <div>
                <h3 className="text-[clamp(1.35rem,1.7vw,1.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{b.title}</h3>
                <p className={`mt-3 text-[0.98rem] leading-relaxed ${i < 2 ? "text-white/70" : "text-muted"}`}>{b.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
