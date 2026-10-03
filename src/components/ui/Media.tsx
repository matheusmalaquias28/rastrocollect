import Image from "next/image";

export type MediaTone = "lilas" | "rosa" | "roxo" | "ink" | "mist";

type MediaProps = {
  /** Caminho da imagem final. Sem src, renderiza o placeholder. */
  src?: string;
  alt?: string;
  /** Descrição da foto que deve entrar aqui (aparece no placeholder). */
  label: string;
  tone?: MediaTone;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Serve o arquivo original, sem recompressão do Next (máxima qualidade, arquivo mais pesado). */
  unoptimized?: boolean;
  /** Cortina de entrada ao rolar. */
  reveal?: boolean;
  /** Intensidade do parallax interno (0 desliga). */
  parallax?: number;
  /** Onde fica a etiqueta do placeholder. */
  labelAt?: "bottom" | "top";
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/** Bloco de imagem com placeholder descritivo. Passe `src` quando a foto real chegar. */
export default function Media({
  src,
  alt = "",
  label,
  tone = "lilas",
  className = "",
  sizes = "80vw",
  priority,
  unoptimized,
  reveal = true,
  parallax = 0,
  labelAt = "bottom",
  children,
  style,
}: MediaProps) {
  const dark = tone === "roxo" || tone === "ink";
  return (
    <div
      className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative "}overflow-hidden ${className}`}
      data-reveal={reveal ? "img" : undefined}
      style={style}
    >
      <div data-media-inner className="absolute inset-0">
        <div className={`absolute ${parallax ? "-inset-y-[12%] inset-x-0" : "inset-0"}`} data-parallax={parallax || undefined}>
          {src ? (
            <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={unoptimized} className="object-cover" />
          ) : (
            <div className={`media-ph tone-${tone} absolute inset-0`} role="img" aria-label={alt || label}>
              <div className="absolute inset-0 grid place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/rastro-mark.svg" alt="" className={`w-[min(18%,120px)] ${dark ? "opacity-25" : "opacity-[0.14] grayscale"}`} />
              </div>
            </div>
          )}
        </div>
      </div>
      {!src && (
        <span
          className={`pointer-events-none absolute z-[1] max-w-[75%] ${labelAt === "top" ? "left-4 top-4" : "bottom-4 left-4"} flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.7rem] font-medium leading-tight backdrop-blur-md ${
            dark ? "bg-white/10 text-white/75" : "bg-white/70 text-ink/60"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <circle cx="9" cy="10" r="2" />
            <path d="m21 16-5-5-9 9" />
          </svg>
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
