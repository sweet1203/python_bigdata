/** data_literacy 사이드바와 동일한 차트형 로고 */
export default function CourseLogo({ className = "w-7 h-7 shrink-0" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="course-logo-g1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="course-logo-g2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id="course-logo-g3" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#f0f9ff" stroke="#bfdbfe" strokeWidth="1.5" />
      <rect x="12" y="34" width="8" height="16" rx="2" fill="url(#course-logo-g3)" />
      <rect x="23" y="24" width="8" height="26" rx="2" fill="url(#course-logo-g2)" />
      <rect x="34" y="16" width="8" height="34" rx="2" fill="url(#course-logo-g1)" />
      <path
        d="M16 33 L27 23 L38 15 L52 10"
        fill="none"
        stroke="#2563eb"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="33" r="2.5" fill="#fff" stroke="#2563eb" strokeWidth="1.5" />
      <circle cx="27" cy="23" r="2.5" fill="#fff" stroke="#2563eb" strokeWidth="1.5" />
      <circle cx="38" cy="15" r="2.5" fill="#fff" stroke="#2563eb" strokeWidth="1.5" />
      <circle cx="52" cy="10" r="3" fill="#2563eb" />
      <circle cx="48" cy="40" r="8" fill="none" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="48" cy="40" r="5" fill="#dbeafe" opacity="0.5" />
      <line x1="54" y1="46" x2="59" y2="51" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
