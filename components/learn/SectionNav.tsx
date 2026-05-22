import Link from "next/link";

interface SectionNavProps {
  prevHref?: string;
  nextHref?: string;
}

export default function SectionNav({ prevHref, nextHref }: SectionNavProps) {
  return (
    <nav className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
      {prevHref ? (
        <Link href={prevHref} className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
          이전 차시
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-slate-400">이전 차시 없음</span>
      )}
      {nextHref ? (
        <Link href={nextHref} className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
          다음 차시
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-slate-400">다음 차시 없음</span>
      )}
    </nav>
  );
}
