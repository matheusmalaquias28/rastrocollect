import Eyebrow from "@/components/ui/Eyebrow";
import Media, { type MediaTone } from "@/components/ui/Media";

const audiences: {
  lead: string;
  word: string;
  note?: string;
  media: string;
  src: string;
  alt: string;
  tone: MediaTone;
  offset: string;
}[] = [
  {
    lead: "Para alguns, é",
    word: "entretenimento.",
    media: "Família abrindo um booster junta",
    src: "/images/mercado-entretenimento.jpg",
    alt: "Menino abrindo um booster de Pokémon com os pais, sorrindo, em uma mesa no shopping",
    tone: "rosa",
    offset: "md:mt-0",
  },
  {
    lead: "Para outros,",
    word: "coleção.",
    media: "Fichário de cartas organizadas de um colecionador",
    src: "/images/mercado-colecao.jpg",
    alt: "Estante iluminada com coleção de boosters, caixas e bonecos de Pokémon",
    tone: "lilas",
    offset: "md:mt-24",
  },
  {
    lead: "Para muitos, é",
    word: "uma comunidade",
    note: "que acompanha lançamentos, raridades, novos produtos e diferentes franquias.",
    media: "Grupo de jovens trocando e comparando cards",
    src: "/images/mercado-comunidade.jpg",
    alt: "Multidão em um evento de Pokémon com um Pikachu inflável gigante sobre o público",
    tone: "roxo",
    offset: "md:mt-48",
  },
];

export default function Market() {
  return (
    <section id="mercado" className="section bg-paper">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow n="09">Mercado</Eyebrow>
            <h2 data-split className="t-h2 mt-8">
              Um universo que conecta <em>diferentes gerações.</em>
            </h2>
          </div>
          <p data-reveal="up" className="t-lead self-end text-ink/70 md:col-span-4 md:col-start-9">
            O mercado de cards colecionáveis reúne públicos muito diferentes.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-6">
          {audiences.map((a) => (
            <figure key={a.word} className={a.offset}>
              <Media src={a.src} alt={a.alt} sizes="(min-width: 768px) 27vw, 100vw" label={a.media} tone={a.tone} parallax={8} className="aspect-[4/5] rounded-[28px] md:rounded-[36px]" />
              <figcaption data-reveal="up" className="mt-6">
                <span className="block text-[1rem] font-medium text-muted">{a.lead}</span>
                <span className="block text-[clamp(2rem,3.2vw,3.3rem)] font-semibold leading-[1] tracking-[-0.045em]">{a.word}</span>
                {a.note && <span className="t-body mt-3 block max-w-[34ch] text-muted">{a.note}</span>}
              </figcaption>
            </figure>
          ))}
        </div>


        <p data-fill className="mt-24 max-w-[22ch] text-[clamp(1.9rem,4vw,4.4rem)] font-semibold leading-[1.08] tracking-[-0.04em] md:mt-40">
          A Rastro Collect surge para tornar esse universo ainda mais <span className="text-roxo">acessível</span> no varejo físico.
        </p>
      </div>
    </section>
  );
}
