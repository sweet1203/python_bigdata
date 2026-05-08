import Link from "next/link";
import { Unit } from "@/lib/units";

interface SidebarProps {
  items: Unit[];
  activeUnitId?: string;
}

export default function Sidebar({ items, activeUnitId }: SidebarProps) {
  return (
    <aside className="rounded-xl border border-zinc-200 bg-white p-4">
      <h2 className="mb-3 text-sm font-semibold text-zinc-900">차시 목록</h2>
      <ul className="space-y-2">
        {items.map((unit) => {
          const isActive = unit.id === activeUnitId;
          return (
            <li key={unit.id}>
              <Link
                href={`/learn?unit=${unit.id}`}
                className={`block rounded-md px-3 py-2 text-sm ${
                  isActive
                    ? "bg-emerald-100 font-semibold text-emerald-800"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                {unit.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
