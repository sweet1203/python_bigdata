import AssessmentPathList from "@/components/assessment/AssessmentPathList";

export default function AssessmentIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <section className="space-y-6 rounded-xl border border-amber-200/80 bg-gradient-to-b from-white to-amber-50/30 p-6 shadow-sm lg:p-8">
        <header className="border-b border-amber-100 pb-5">
          <p className="text-sm font-medium text-amber-800">3학년 빅데이터분석 · 2차 수행평가</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            데이터 시각화 포트폴리오 안내
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            아래 주소를 브라우저에 <strong className="font-semibold text-slate-800">직접 입력</strong>해
            이동합니다. 사이드바 메뉴와 연결되어 있지 않습니다.
          </p>
        </header>

        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">시작 경로</p>
          <p className="mt-1 font-mono text-primary-800">/assessment/overview</p>
          <p className="mt-2 text-slate-600">
            데이터 선택·불러오기: <span className="font-mono text-primary-800">/assessment/datasets</span>
            ( <code className="rounded bg-slate-100 px-1">import seaborn</code> →{" "}
            <code className="rounded bg-slate-100 px-1">sns.load_dataset</code> )
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-slate-800">안내 페이지 목록</h2>
          <AssessmentPathList />
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">제출</p>
          <p className="mt-1">
            리로스쿨·Google 폼 등은 수업 안내를 따릅니다. 제출 경로는{" "}
            <span className="font-mono text-slate-800">/assessment/submit</span> 에 정리되어 있습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
