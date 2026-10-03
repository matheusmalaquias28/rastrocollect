import Button from "@/components/ui/Button";
import FloatingCards, { type FloatingItem } from "@/components/ui/FloatingCards";
import { site, whatsappUrl } from "@/lib/site";

const cards: FloatingItem[] = [
  { x: "6%", y: "20%", w: "clamp(80px, 8.5vw, 150px)", r: -16, depth: 0.85, tone: "rosa", title: "Pokémon", hideMobile: true },
  { x: "4%", y: "78%", w: "clamp(70px, 7vw, 120px)", r: 8, depth: 0.4, tone: "lilas", title: "Magic", blur: 4, hideMobile: true },
  { x: "95%", y: "12%", w: "clamp(70px, 7vw, 120px)", r: 14, depth: 0.5, tone: "ink", title: "Yu-Gi-Oh!", hideMobile: true },
  { x: "94%", y: "76%", w: "clamp(84px, 9.5vw, 170px)", r: -9, depth: 1, tone: "holo", title: "One Piece", hideMobile: true },
];

export default function FinalCta() {
  return (
    <section id="contato" className="pb-6 pt-[clamp(2rem,6vw,6rem)]">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[32px] bg-[radial-gradient(120%_120%_at_50%_0%,#f5f0ff_0%,#d9c9ff_45%,#b99cff_100%)] px-6 py-24 md:rounded-[48px] md:py-40">
          <div aria-hidden className="absolute left-1/2 top-full size-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(252_17_164/0.35),transparent)]" />
          <FloatingCards items={cards} />
          <div className="relative z-20 mx-auto flex max-w-[60rem] flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-reveal="up" src="/brand/rastro-mark.svg" alt="" className="mb-10 h-14 w-auto md:h-16" />
            <h2 data-split className="t-display max-w-[13ch] !text-[clamp(2.7rem,6.4vw,7.5rem)]">
              Vamos levar a Rastro Collect para o seu <em>shopping?</em>
            </h2>
            <p data-reveal="up" className="t-lead mt-9 max-w-[42ch] text-ink/70">
              Conheça o projeto, a estrutura da operação e as possibilidades de instalação da Rastro Collect no seu empreendimento.
            </p>
            <div data-reveal="up" className="mt-11 flex flex-wrap justify-center gap-3">
              <Button href={whatsappUrl} external size="lg" variant="dark" cursor="WhatsApp">
                Falar com a Rastro Collect
              </Button>
              <Button href={`mailto:${site.email}`} size="lg" variant="light" cursor="E-mail">
                Enviar e-mail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
