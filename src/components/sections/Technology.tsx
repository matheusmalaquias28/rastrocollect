import Eyebrow from "@/components/ui/Eyebrow";
import Dashboard from "@/components/ui/Dashboard";

const metrics = ["Volume de vendas", "Estoque disponível", "Necessidade de reposição", "Desempenho da unidade"];

export default function Technology() {
  return (
    <section id="tecnologia" className="relative bg-ink pb-[clamp(6rem,13vw,13rem)] text-white">
      <div className="wrap">
        <Eyebrow n="07" dark>
          Tecnologia e controle
        </Eyebrow>
        <h2 data-split className="t-h2 mt-8 max-w-[18ch]">
          Informação em <span className="text-rosa">tempo real</span> para uma operação mais eficiente.
        </h2>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p data-reveal="up" className="t-body max-w-[38ch] text-white/65">
              A Rastro Collect utiliza um sistema próprio de acompanhamento da máquina. A operação pode monitorar à distância:
            </p>
            <ul className="mt-8">
              {metrics.map((m, i) => (
                <li key={m} className="relative flex items-center gap-4 py-4">
                  <span data-draw className="absolute inset-x-0 top-0 block h-px bg-white/12" />
                  <span data-reveal="up" className="text-[0.75rem] font-semibold text-rosa">
                    0{i + 1}
                  </span>
                  <span data-reveal="up" className="text-[1.15rem] font-semibold tracking-[-0.02em]">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
            <p data-reveal="up" className="t-body mt-10 max-w-[40ch] text-white/50">
              Isso permite uma gestão mais eficiente e reduz a necessidade de acompanhamento presencial constante.
            </p>
          </div>

          <div className="md:col-span-8">
            <Dashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
