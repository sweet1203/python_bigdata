"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { COURSE_MODULE } from "@/lib/courseConstants";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import CourseLogo from "@/components/icons/CourseLogo";
import Icon from "@/components/common/Icon";
import { units } from "@/lib/units";

const iconColorMap = {
  primary: "text-primary-500",
  accent: "text-accent-500",
  warm: "text-warm-600",
} as const;

const bottomNav = [
  { href: "/quiz", label: "퀴즈" },
  { href: "/progress", label: "내 학습 현황" },
  { href: "/help", label: "도움말" },
] as const;

function isRouteActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function CourseSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeUnitId = searchParams.get("unit") ?? "1";
  const { isLessonCompleted } = useLearningProgress();

  const progress = units.filter((u) => isLessonCompleted(u.id)).length / units.length;
  const progressPct = Math.round(progress * 100);
  const moduleIconColor = iconColorMap[COURSE_MODULE.color];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          role="presentation"
          aria-hidden
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 border-b border-slate-100 px-5 py-4"
          onClick={onClose}
        >
          <CourseLogo className="h-7 w-7 shrink-0" />
          <span className="text-lg font-bold text-slate-800">GOO&apos;s 데이터 분석 with 파이썬</span>
        </Link>

        <nav className="p-3">
          <div className="mb-2">
            <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
              <Icon name="chart" size={16} className={moduleIconColor} />
              <span className="min-w-0 flex-1 truncate">{COURSE_MODULE.title}</span>
              {progressPct > 0 && <span className="text-xs font-normal text-primary-500">{progressPct}%</span>}
            </div>

            {progressPct > 0 && (
              <div className="mx-3 mb-1 h-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-primary-500 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            )}

            <ul className="space-y-0.5">
              {units.map((unit) => {
                const isActive = pathname.startsWith("/learn") && activeUnitId === unit.id;
                const completed = isLessonCompleted(unit.id);
                const title = unit.label.replace(`${unit.id}차시. `, "");

                return (
                  <li key={unit.id}>
                    <Link
                      href={`/learn?unit=${unit.id}`}
                      onClick={onClose}
                      className={`mx-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-primary-50 font-medium text-primary-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          completed
                            ? "border-accent-500 bg-accent-500 text-white"
                            : isActive
                              ? "border-primary-400"
                              : "border-slate-300"
                        }`}
                      >
                        {completed && <Icon name="check" size={12} className="text-white" />}
                      </span>
                      <span className="min-w-0 flex-1 truncate">
                        <span className="mr-1.5 shrink-0 font-medium text-slate-400">{unit.id}</span>
                        {title}
                      </span>
                      <span className="shrink-0" title="Google Colab 실습 교안">
                        📓
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">빠른 이동</p>
            <ul className="space-y-0.5">
              {bottomNav.map((item) => {
                const active = isRouteActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`mx-1 block rounded-lg px-3 py-2 text-sm transition-colors ${
                        active ? "bg-slate-100 font-medium text-slate-900" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
