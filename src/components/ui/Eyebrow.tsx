export default function Eyebrow({ n, children, dark = false, className = "" }: { n?: string; children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      data-reveal="up"
      className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[0.78rem] font-semibold tracking-[0.01em] ${
        dark ? "border-white/15 text-white/80" : "border-ink/10 text-ink/70"
      } ${className}`}
    >
      <span className="size-1.5 rounded-full bg-rosa" />
      {n && <span className={dark ? "text-white/40" : "text-ink/35"}>{n}</span>}
      {children}
    </p>
  );
}
