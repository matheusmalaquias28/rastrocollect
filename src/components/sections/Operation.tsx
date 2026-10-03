import Eyebrow from "@/components/ui/Eyebrow";
import Icon, { type IconName } from "@/components/ui/Icon";

const needs: { icon: IconName; label: string }[] = [
  { icon: "plug", label: "Energia elétrica" },
  { icon: "wifi", label: "Conexão Wi-Fi" },
];

const handled: { icon: IconName; title: string; text: string }[] = [
  { icon: "radar", title: "Monitoramento remoto", text: "Acompanhamento de vendas e estoque por meio de sistema próprio." },
  {
    icon: "refresh",
    title: "Reposição programada",
    text: "A equipe identifica remotamente a necessidade de reposição e realiza o abastecimento dos produtos.",
  },
  { icon: "lock", title: "Operação selada", text: "O equipamento permanece fechado e possui acesso restrito à equipe responsável." },
  {
    icon: "pulse",
    title: "Baixa necessidade de intervenção",
    text: "A máquina foi desenvolvida para funcionar de forma contínua e autônoma durante a operação.",
  },
];

export default function Operation() {
  return (
    <section id="operacao" className="section relative bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10vw] -top-[10vw] size-[50vw] rounded-full bg-[radial-gradient(closest-side,rgb(102_50_239/0.35),transparent)]" />
      </div>

      <div className="wrap relative">
        <Eyebrow n="06" dark>
          Operação
        </Eyebrow>
        <h2 data-split className="t-display mt-8 max-w-[13ch]">
          Simples para o shopping. <span className="text-lilas">Gerenciada pela Rastro.</span>
        </h2>
        <p data-reveal="up" className="t-lead mt-10 max-w-[36ch] text-white/65">
          Toda a operação é acompanhada pela própria equipe da Rastro Collect.
        </p>

        {/* O que a máquina precisa */}
        <div className="mt-20 grid gap-5 md:mt-28 md:grid-cols-12 md:gap-6">
          <div className="flex flex-col justify-end md:col-span-4">
            <p data-reveal="up" className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-white/45">
              A máquina precisa apenas de
            </p>
          </div>
          {needs.map((n, i) => (
            <div
              key={n.label}
              data-reveal="up"
              className={`relative overflow-hidden rounded-[28px] p-7 md:col-span-4 md:rounded-[36px] md:p-10 ${
                i === 0 ? "bg-lilas text-ink" : "bg-[linear-gradient(140deg,#fc11a4,#b93ced)] text-white"
              }`}
            >
              <Icon name={n.icon} className="size-12 md:size-16" />
              <p className="mt-16 text-[clamp(2rem,3.4vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.045em] md:mt-24">
                {n.label.split(" ").map((w, k) => (
                  <span key={k} className="whitespace-nowrap">
                    {w}{" "}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <p data-fill className="mt-20 max-w-[22ch] text-[clamp(1.8rem,3.6vw,3.8rem)] font-semibold leading-[1.08] tracking-[-0.04em] md:mt-32">
          Todo o restante fica sob responsabilidade da operação Rastro.
        </p>

        {/* O que fica com a Rastro */}
        <ul className="mt-16 md:mt-24">
          {handled.map((h, i) => (
            <li key={h.title} className="group relative grid gap-4 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
              <span data-draw className="absolute inset-x-0 top-0 block h-px bg-white/15" />
              <span data-reveal="up" className="text-[0.8rem] font-semibold text-rosa md:col-span-1">
                0{i + 1}
              </span>
              <div data-reveal="up" className="flex items-center gap-5 md:col-span-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/15 text-lilas transition-colors duration-500 group-hover:border-lilas group-hover:bg-lilas group-hover:text-ink">
                  <Icon name={h.icon} className="size-5" />
                </span>
                <h3 className="text-[clamp(1.5rem,2.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">{h.title}</h3>
              </div>
              <p data-reveal="up" className="t-body text-white/60 md:col-span-5">
                {h.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
