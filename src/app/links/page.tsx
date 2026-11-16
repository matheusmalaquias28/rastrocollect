import type { Metadata } from "next";
import FloatingCards, { type FloatingItem } from "@/components/ui/FloatingCards";
import { packs } from "@/lib/packs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Links | Rastro Collect",
  description: site.description,
  alternates: { canonical: "/links" },
};

const whatsappMessage = "Olá, vim através do site e gostaria de saber mais!";
const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
const resaleGroupHref = "https://chat.whatsapp.com/BpYb4Av6KH96CCO25ITZzQ?s=cl&p=i&iam=2";
const instagramHandle = "jonasrastro";

// Boosters da home flutuando nas laterais (desktop)
const sideCards: FloatingItem[] = [
  { x: "12%", y: "20%", w: "clamp(120px, 11vw, 190px)", r: -16, depth: 0.9, pack: packs.pokemonHerois },
  { x: "24%", y: "52%", w: "clamp(100px, 8.5vw, 150px)", r: 10, depth: 0.45, pack: packs.lorcanaFirst, blur: 1 },
  { x: "10%", y: "82%", w: "clamp(110px, 10vw, 170px)", r: -8, depth: 0.7, pack: packs.yugiohInfinite },
  { x: "88%", y: "22%", w: "clamp(118px, 11vw, 185px)", r: 15, depth: 0.8, pack: packs.lorcanaWilds },
  { x: "76%", y: "55%", w: "clamp(100px, 8.5vw, 150px)", r: -12, depth: 0.4, pack: packs.magicFinalFantasy, blur: 1 },
  { x: "90%", y: "84%", w: "clamp(110px, 10vw, 170px)", r: 9, depth: 1, pack: packs.pokemonFogo },
];

// No celular: dois espiando pelas bordas do topo...
const mobileEdge: FloatingItem[] = [
  { x: "2%", y: "9%", w: "96px", r: -16, depth: 0.6, pack: packs.pokemonHerois },
  { x: "98%", y: "15%", w: "104px", r: 14, depth: 0.8, pack: packs.lorcanaWilds },
];

// ...e um leque abaixo dos botões
const mobileFan: FloatingItem[] = [
  { x: "24%", y: "50%", w: "96px", r: -16, depth: 0.5, pack: packs.lorcanaFirst },
  { x: "50%", y: "45%", w: "112px", r: 3, depth: 0.8, pack: packs.pokemonEquilibrio },
  { x: "76%", y: "50%", w: "96px", r: 15, depth: 0.5, pack: packs.pokemonFogo },
];

type LinkItem = {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tone: "ink" | "rosa" | "roxo";
  external?: boolean;
};

const links: LinkItem[] = [
  {
    href: "/",
    title: "Conheça a Rastro Collect",
    subtitle: "Acesse nosso site",
    icon: <GlobeIcon />,
    tone: "ink",
  },
  {
    href: whatsappHref,
    title: "Fale com a gente",
    subtitle: `WhatsApp ${site.phone}`,
    icon: <WhatsappIcon />,
    tone: "rosa",
    external: true,
  },
  {
    href: resaleGroupHref,
    title: "Grupo de revenda",
    subtitle: "Entre no grupo do WhatsApp",
    icon: <UsersIcon />,
    tone: "roxo",
    external: true,
  },
];

const tones = {
  ink: "bg-ink text-white hover:bg-roxo",
  rosa: "bg-rosa text-white hover:bg-ink",
  roxo: "bg-roxo text-white hover:bg-ink",
};

export default function LinksPage() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-paper">
      {/* Brilho de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-lilas/60 blur-[120px]"
      />

      <FloatingCards items={sideCards} delay={0.3} drift={0.3} className="hidden md:block" />
      <FloatingCards items={mobileEdge} delay={0.3} drift={0.2} className="md:hidden" />

      <div className="relative z-20 mx-auto flex w-full max-w-[460px] flex-1 flex-col px-5 pb-8 pt-14 md:pt-20">
        <header className="flex flex-col items-center text-center">
          <div className="grid size-24 place-items-center rounded-[28px] bg-white shadow-[0_20px_50px_-20px_rgba(102,50,239,0.45)] ring-1 ring-ink/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/rastro-mark.svg" alt="" width={64} height={64} className="size-14" />
          </div>
          <h1 className="mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/rastro-collect.svg" alt={site.name} width={1934} height={436} className="mx-auto h-auto w-56" />
          </h1>
          <p className="mt-4 text-[0.95rem] font-medium text-muted">{site.tagline}</p>
        </header>

        <nav aria-label="Links" className="mt-10">
          <ul className="space-y-3.5">
            {links.map((l) => (
              <li key={l.title}>
                <a
                  href={l.href}
                  data-cursor="Abrir"
                  data-cursor-tone={l.tone === "rosa" ? "rosa" : undefined}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group flex items-center gap-4 rounded-[22px] p-2.5 pr-5 transition-colors duration-500 ${tones[l.tone]}`}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/12">{l.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.05rem] font-semibold leading-tight tracking-[-0.01em]">{l.title}</span>
                    <span className="mt-0.5 block truncate text-[0.85rem] text-white/70">{l.subtitle}</span>
                  </span>
                  <span
                    aria-hidden
                    className="text-lg transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative mt-4 h-[230px] w-full md:hidden">
          <FloatingCards items={mobileFan} delay={0.5} drift={0.15} />
        </div>

        <footer className="mt-auto pt-10 text-center md:pt-14">
          <a
            href={`https://instagram.com/${instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Instagram"
            data-cursor-tone="rosa"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-[0.95rem] font-semibold transition-colors duration-500 hover:border-rosa hover:text-rosa"
          >
            <InstagramIcon />@{instagramHandle}
          </a>
          <p className="mt-5 text-[0.75rem] text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
        </footer>
      </div>
    </main>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9.5" r="2.5" />
      <path d="M16.5 14.6A5 5 0 0 1 21.5 20" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm.01 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}
