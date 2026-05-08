import Link from "next/link";
import { Unit } from "@/lib/units";

interface SidebarProps {
  items: Unit[];
  activeUnitId?: string;
}

export default function Sidebar({ items, activeUnitId }: SidebarProps) {
  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:h-fit">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Course Roadmap</p>
      <h2 className="mt-1 mb-3 text-sm font-semibold text-zinc-900">차시별 학습</h2>
      <ul className="space-y-2.5">
        {items.map((unit) => {
          const isActive = unit.id === activeUnitId;
          const title = unit.label.replace(`${unit.id}차시. `, "");
          return (
            <li key={unit.id}>
              <Link
                href={`/learn?unit=${unit.id}`}
                className={`group flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-zinc-200 bg-zinc-50/60 text-zinc-700 hover:border-emerald-200 hover:bg-emerald-50/60"
                }`}
              >
                <span
                  className={`mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
                    isActive ? "bg-emerald-600 text-white" : "bg-white text-zinc-600 ring-1 ring-zinc-200"
                  }`}
                >
                  {unit.id}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{title}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
