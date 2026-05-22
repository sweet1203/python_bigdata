import { Suspense } from "react";
import CourseShell from "@/components/layout/CourseShell";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
          불러오는 중…
        </div>
      }
    >
      <CourseShell>{children}</CourseShell>
    </Suspense>
  );
}
