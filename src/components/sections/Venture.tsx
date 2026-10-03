import Eyebrow from "@/components/ui/Eyebrow";

const pillars = ["Operação compacta.", "Gestão própria.", "Experiência autônoma."];

export default function Venture() {
  return (
    <section id="empreendimento" className="section overflow-hidden">
      <div className="wrap grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow n="10">Para o empreendimento</Eyebrow>
          <h2 data-split className="t-h2 mt-8">
            Uma nova operação para complementar o <em>mix do shopping.</em>
          </h2>
        </div>
        <div className="space-y-6 self-end md:col-span-4 md:col-start-9">
          <p data-reveal="up" className="t-lead text-ink/75">
            A proposta da Rastro Collect é criar um formato simples de implantação, com baixo impacto operacional e uma experiência diferente
            para o público.
          </p>
          <p data-reveal="up" className="t-body text-muted">
            O modelo comercial pode ser estruturado de acordo com as características e necessidades de cada empreendimento.
          </p>
        </div>
      </div>

      {/* Faixas em movimento */}
      <div className="mt-24 -rotate-2 space-y-3 md:mt-36" aria-label={pillars.join(" ")}>
        {[0, 1].map((row) => (
          <div key={row} className={`overflow-hidden py-4 md:py-6 ${row ? "bg-lilas text-ink" : "bg-ink text-white"}`} aria-hidden>
            <div className={`marquee ${row ? "marquee-reverse" : ""}`} style={{ ["--speed" as string]: "38s" }}>
              {[0, 1].map((k) => (
                <div key={k} className="flex shrink-0 items-center">
                  {[...pillars, ...pillars].map((p, i) => (
                    <span key={i} className="flex items-center gap-8 pr-8 text-[clamp(2.4rem,5.4vw,5.6rem)] font-semibold tracking-[-0.045em]">
                      {p}
                      <span className={row ? "text-roxo" : "text-rosa"}>✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
