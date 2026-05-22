const icons = {
  chart: (
    <>
      <rect x="3" y="12" width="4" height="9" rx="1" fill="currentColor" opacity=".4" />
      <rect x="10" y="7" width="4" height="14" rx="1" fill="currentColor" opacity=".7" />
      <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" />
    </>
  ),
  books: (
    <>
      <path
        d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 19a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
    </>
  ),
  memo: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
      <line x1="8" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 9v4l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 3v2M12 21v2M4 13H2M22 13h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" opacity=".6" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M8 11l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  check: (
    <path d="M5 12l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  brain: (
    <>
      <path
        d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1.5 3.5C6 11.5 5 13 5 15c0 3 2.5 5 5 5h4c2.5 0 5-2 5-5 0-2-1-3.5-2.5-4.5C17.5 9.5 18 8.5 18 7c0-2.5-2.5-5-6-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 2v18M8 6.5c1 .5 3 .5 4 0M8 14c1-.5 3-.5 4 0M12 6.5c1 .5 3 .5 4 0M12 14c1-.5 3-.5 4 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".5"
      />
    </>
  ),
} as const;

export type IconName = keyof typeof icons;

export default function Icon({ name, size = 16, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`} aria-hidden>
      {icons[name]}
    </svg>
  );
}
