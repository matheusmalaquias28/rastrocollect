const paths: Record<string, React.ReactNode> = {
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0V8Z" />
      <path d="M12 17v4" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9a14 14 0 0 1 19 0" />
      <path d="M5.5 12.5a9.5 9.5 0 0 1 13 0" />
      <path d="M8.7 16a5 5 0 0 1 6.6 0" />
      <circle cx="12" cy="19.5" r="1" fill="currentColor" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12 18 6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.6-4.5L4 8" />
      <path d="M4 3v5h5" />
      <path d="M4 13a8 8 0 0 0 14.6 4.5L20 16" />
      <path d="M20 21v-5h-5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
      <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
    </>
  ),
  pulse: <path d="M2.5 12h4l2.5-6 4 12 2.5-6h6" />,
  box: (
    <>
      <path d="M12 2.8 20 7v10l-8 4.2L4 17V7l8-4.2Z" />
      <path d="M4 7l8 4.2L20 7M12 11.2v10" />
    </>
  ),
  auto: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <rect x="7.5" y="6.5" width="9" height="6" rx="1.5" />
      <path d="M8 16.5h3M14 16.5h2" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" />
      <path d="M19 15.5c.25 1.5 1 2.25 2.5 2.5-1.5.25-2.25 1-2.5 2.5-.25-1.5-1-2.25-2.5-2.5 1.5-.25 2.25-1 2.5-2.5Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9.5" r="2.5" />
      <path d="M16.5 14.6A5 5 0 0 1 21.5 20" />
    </>
  ),
  flow: (
    <>
      <path d="M3 7h12a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h12" />
      <path d="m18 16 3 3-3 3" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19M6 15h4" />
    </>
  ),
  tap: (
    <>
      <path d="M8 10a4 4 0 0 1 8 0" />
      <path d="M5 10a7 7 0 0 1 14 0" />
      <rect x="9" y="12" width="6" height="9" rx="1.5" />
    </>
  ),
  pix: (
    <>
      <path d="m12 3 3.5 3.5L12 10 8.5 6.5 12 3ZM12 14l3.5 3.5L12 21l-3.5-3.5L12 14Z" />
      <path d="m3 12 3.5-3.5L10 12l-3.5 3.5L3 12ZM14 12l3.5-3.5L21 12l-3.5 3.5L14 12Z" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export default function Icon({ name, className = "size-6" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
