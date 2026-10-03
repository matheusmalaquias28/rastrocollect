import { instagramUrl, nav, site, whatsappUrl } from "@/lib/site";

export default function Footer() {
  const contacts = [
    { label: "WhatsApp", href: whatsappUrl, external: true },
    { label: "E-mail", href: `mailto:${site.email}`, external: false },
    { label: "Instagram", href: instagramUrl, external: true },
  ];

  return (
    <footer className="pb-8 pt-20 md:pt-28">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[clamp(1.8rem,2.8vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{site.tagline}</p>
            <p className="t-body mt-4 text-muted">Universo TCG em um novo formato de varejo.</p>
          </div>
          <nav aria-label="Rodapé" className="md:col-span-3 md:col-start-7">
            <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink/40">Navegação</p>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-[1.05rem] font-medium transition-colors hover:text-roxo">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink/40">Contato</p>
            <ul className="space-y-2">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    data-cursor={c.label}
                    data-cursor-tone="rosa"
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-2 text-[1.05rem] font-medium transition-colors hover:text-rosa"
                  >
                    {c.label}
                    <span className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Assinatura gigante */}
        <a href="#topo" aria-label="Voltar ao topo" data-cursor="Topo" className="mt-20 block md:mt-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-reveal="up"
            src="/brand/rastro-collect.svg"
            alt="Rastro Collect"
            width={1934}
            height={436}
            className="h-auto w-full"
          />
        </a>

        {/* Crédito da agência */}
        <a
          href="https://www.energymidia.com.br"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Energy"
          data-cursor-tone="ink"
          className="group mt-14 flex flex-col items-center justify-center gap-3 rounded-[28px] border border-ink/10 bg-paper px-6 py-7 text-center transition-colors duration-500 hover:border-ink/25 hover:bg-white sm:flex-row sm:gap-4 md:mt-20 md:py-9"
        >
          <span className="text-[1.05rem] font-semibold tracking-[-0.02em] text-ink/80 md:text-[1.25rem]">
            Desenvolvido com{" "}
            <span aria-hidden className="inline-block transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
              ⚡
            </span>{" "}
            pela
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/energy.png"
            alt="Energy"
            width={819}
            height={307}
            className="h-8 w-auto transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-105 md:h-10"
          />
        </a>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-ink/10 pt-6 text-[0.8rem] text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
            <span className="mx-2 text-ink/25">·</span>
            CNPJ {site.cnpj}
          </p>
          <p>Pokémon, Disney Lorcana, Yu-Gi-Oh!, One Piece e Magic são marcas de seus respectivos proprietários.</p>
        </div>
      </div>
    </footer>
  );
}
