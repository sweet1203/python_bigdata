"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import CourseSidebar from "@/components/layout/CourseSidebar";
import RefreshHintBar from "@/components/layout/RefreshHintBar";
import CourseLogo from "@/components/icons/CourseLogo";

export default function CourseShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative flex h-screen">
      <a
        href="#main-content"
        className="sr-only absolute left-3 top-3 z-[60] rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white focus:not-sr-only focus:px-3 focus:py-2"
      >
        본문으로 건너뛰기
      </a>
      <CourseSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="메뉴 열기"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <CourseLogo className="h-6 w-6 shrink-0" />
          <span className="font-semibold text-slate-800">GOO&apos;s 데이터 분석 with 파이썬</span>
        </header>

        <main id="main-content" ref={mainRef} className="flex flex-1 flex-col overflow-y-auto" tabIndex={-1}>
          <RefreshHintBar />
          <div className="min-h-0 flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
