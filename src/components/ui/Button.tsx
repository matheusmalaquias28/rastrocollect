type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline" | "rosa";
  size?: "md" | "lg";
  cursor?: string;
  external?: boolean;
  className?: string;
};

const variants = {
  dark: "bg-ink text-white hover:bg-roxo",
  rosa: "bg-rosa text-white hover:bg-ink",
  light: "bg-white text-ink hover:bg-lilas",
  outline: "border border-ink/15 bg-white/60 text-ink backdrop-blur hover:border-ink",
};

const arrowBg = {
  dark: "bg-white text-ink",
  rosa: "bg-white text-rosa",
  light: "bg-ink text-white",
  outline: "bg-ink text-white",
};

export default function Button({ href, children, variant = "dark", size = "md", cursor, external, className = "" }: ButtonProps) {
  return (
    <a
      href={href}
      data-cursor={cursor}
      data-cursor-tone={variant === "rosa" ? "rosa" : undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 rounded-full font-semibold tracking-[-0.01em] transition-colors duration-500 ${
        size === "lg" ? "py-2.5 pl-7 pr-2.5 text-[1.05rem]" : "py-2 pl-5 pr-2 text-[0.95rem]"
      } ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${size === "lg" ? "size-11" : "size-9"} ${arrowBg[variant]}`}
      >
        <Arrow className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-[150%] group-hover:-translate-y-[150%]" />
        <Arrow className="absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </a>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M3.5 10.5 10.5 3.5M4.5 3.5h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
