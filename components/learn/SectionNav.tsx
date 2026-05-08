import Link from "next/link";

interface SectionNavProps {
  prevHref?: string;
  nextHref?: string;
}

export default function SectionNav({ prevHref, nextHref }: SectionNavProps) {
  return (
    <nav className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3">
      {prevHref ? (
        <Link href={prevHref} className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
          이전 단원
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-zinc-400">이전 단원 없음</span>
      )}
      {nextHref ? (
        <Link href={nextHref} className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
          다음 단원
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-zinc-400">다음 단원 없음</span>
      )}
    </nav>
  );
}
