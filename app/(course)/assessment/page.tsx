import AssessmentPathList from "@/components/assessment/AssessmentPathList";
import AssessmentShell from "@/components/assessment/AssessmentShell";
import Link from "next/link";
import { assessmentPages } from "@/lib/assessmentCatalog";

export default function AssessmentIndexPage() {
  return (
    <AssessmentShell
      currentSlug={null}
      badge="3학년 빅데이터분석 · 2차 수행평가"
      title="데이터 시각화 포트폴리오 안내"
      subtitle="아래 순서대로 페이지를 읽고, Classroom 사본 노트북에 작성한 뒤 제출하세요."
    >
      <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-4 text-sm text-amber-950">
        <p className="font-semibold">빠른 시작</p>
        <p className="mt-1 leading-relaxed">
          처음이면{" "}
          <Link href="/assessment/overview" className="font-semibold underline decoration-amber-400">
            평가 개요
          </Link>
          부터, 이어서{" "}
          <Link href="/assessment/datasets" className="font-semibold underline decoration-amber-400">
            데이터셋 선택
          </Link>
          을 확인하세요.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-bold text-slate-800">안내 페이지</h2>
        <AssessmentPathList />
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">학습 순서 (6단계)</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {assessmentPages.map((p) => (
            <li key={p.slug}>
              <Link href={p.path} className="text-primary-700 hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </AssessmentShell>
  );
}
