import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Media from "@/components/ui/Media";

const steps: { n: string; title: string; text: string; media: string; src?: string; alt?: string; tone: "lilas" | "rosa" | "roxo" }[] = [
  {
    n: "01",
    title: "Escolha",
    text: "O cliente seleciona o booster desejado diretamente na máquina.",
    media: "Tela de escolha do booster na máquina",
    src: "/images/boosters-maquina.webp",
    alt: "Boosters de Pokémon expostos nas espirais numeradas da máquina Rastro Collect",
    tone: "lilas",
  },
  {
    n: "02",
    title: "Pague",
    text: "Pagamento via cartão, aproximação ou Pix.",
    media: "Cliente pagando por aproximação",
    src: "/images/pagamento-aproximacao.png",
    alt: "Cliente aproximando o cartão do leitor de pagamento da máquina Rastro Collect",
    tone: "rosa",
  },
  {
    n: "03",
    title: "Receba",
    text: "O produto é liberado imediatamente após a confirmação da compra.",
    media: "Booster sendo liberado na bandeja",
    src: "/images/booster-bandeja.png",
    alt: "Cliente retirando o booster liberado na bandeja da máquina Rastro Collect",
    tone: "roxo",
  },
];

const payments = [
  { icon: "card" as const, label: "Cartão" },
  { icon: "tap" as const, label: "Aproximação" },
  { icon: "pix" as const, label: "Pix" },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="wrap">
        <div>
          <Eyebrow n="03">Como funciona</Eyebrow>
          <h2 data-split className="t-display mt-8">
            Comprar é <em>simples.</em>
          </h2>
        </div>

        <ol className="mt-16 grid gap-5 md:mt-24 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <li
              key={s.n}
              data-reveal="up"
              className="group flex flex-col rounded-[28px] border border-ink/[0.07] bg-white p-3 transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgb(48_14_110/0.35)] md:rounded-[36px]"
              data-cursor={`Passo ${s.n}`}
            >
              <Media
                src={s.src}
                alt={s.alt}
                label={s.media}
                tone={s.tone}
                sizes="(min-width: 768px) 26vw, 100vw"
                className="aspect-[4/3.4] rounded-[22px] md:rounded-[28px]">
                <span className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white text-[0.95rem] font-bold shadow-sm">
                  {s.n}
                </span>
              </Media>
              <div className="flex flex-1 flex-col p-5 pt-7 md:p-7">
                <div className="flex items-center gap-3">
                  <h3 className="t-h3">{s.title}</h3>
                  {i < steps.length - 1 && (
                    <svg width="28" height="12" viewBox="0 0 28 12" fill="none" className="text-ink/25 transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden>
                      <path d="M0 6h26m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </div>
                <p className="t-body mt-3 max-w-[30ch] text-muted">{s.text}</p>
                {s.n === "02" && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {payments.map((p) => (
                      <li key={p.label} className="flex items-center gap-2 rounded-full bg-lilas-50 px-3.5 py-2 text-[0.85rem] font-semibold text-roxo">
                        <Icon name={p.icon} className="size-4" />
                        {p.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
