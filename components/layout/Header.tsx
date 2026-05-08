import Link from "next/link";

const navItems = [
  { href: "/learn", label: "학습하기" },
  { href: "/data", label: "데이터" },
  { href: "/quiz", label: "퀴즈" },
  { href: "/progress", label: "내 학습 현황" },
  { href: "/help", label: "도움말" },
];

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-base font-bold text-zinc-900 sm:text-lg">
          AC-DATA 코스웨어
        </Link>
        <nav
          aria-label="주요 메뉴"
          className="flex w-full items-center gap-3 overflow-x-auto pb-1 text-sm text-zinc-700 sm:w-auto sm:gap-4 sm:overflow-visible sm:pb-0"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap rounded px-1 py-1 hover:text-zinc-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
