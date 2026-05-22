import Link from "next/link";
import { assessmentPages } from "@/lib/assessmentCatalog";
import LessonMarkdown from "@/components/learn/LessonMarkdown";
import { loadAssessmentMarkdown, parseMainHeading, stripLeadingH1 } from "@/lib/loadAssessment";

export default async function AssessmentOverviewPage() {
  let body = "안내 내용을 불러올 수 없습니다.";
  let title = "2차 수행평가 안내";

  try {
    const raw = await loadAssessmentMarkdown("overview");
    title = parseMainHeading(raw) ?? title;
    body = stripLeadingH1(raw);
  } catch {
    /* keep defaults */
  }

  const stepsAfterOverview = assessmentPages.filter((p) => p.slug !== "overview");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-slate-50">
      <header className="border-b border-amber-100/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              3학년 빅데이터분석
            </p>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">데이터 시각화 포트폴리오</h1>
          </div>
          <Link
            href="/assessment"
            className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            전체 목차
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 pb-16">
        <section className="mb-8 rounded-2xl border border-amber-200/80 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-amber-800">시작하기</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            이 페이지는 <strong>차시 사이드 메뉴 없이</strong> 보는 수행평가 전용 안내입니다.
            아래 단계를 순서대로 진행하세요.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/assessment/datasets"
              className="inline-flex items-center rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
            >
              2단계: 데이터셋 선택 →
            </Link>
            <Link
              href="/assessment/rubric"
              className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-white"
            >
              채점표 보기
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">학습 단계</h2>
          <ol className="space-y-2">
            {stepsAfterOverview.map((page) => (
              <li key={page.slug}>
                <Link
                  href={page.path}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition-all hover:border-amber-400 hover:shadow-md"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-900">
                    {page.step}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-900">{page.title}</span>
                    <span className="block text-sm text-slate-500">{page.description}</span>
                  </span>
                  <span className="shrink-0 text-sm font-medium text-primary-700">열기</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <LessonMarkdown markdown={body} />
        </section>

        <p className="mt-8 text-center text-sm text-slate-500">
          <Link href="/learn?unit=7" className="text-primary-700 hover:underline">
            7차시 교안
          </Link>
          {" · "}
          <Link href="/" className="text-primary-700 hover:underline">
            코스웨어 홈
          </Link>
        </p>
      </main>
    </div>
  );
}
