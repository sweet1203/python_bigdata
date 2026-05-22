"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/common/Icon";
import { loadProgress, clearProgress, saveProgress, type LearningProgressState } from "@/lib/progressStorage";
import { units } from "@/lib/units";

export default function ProgressPage() {
  const [progress, setProgress] = useState<LearningProgressState>(() => loadProgress());
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const sync = () => setProgress(loadProgress());
    window.addEventListener("goo-learning-progress", sync);
    return () => window.removeEventListener("goo-learning-progress", sync);
  }, []);

  const quizSolvedCount = useMemo(() => Object.keys(progress.quizResults).length, [progress.quizResults]);
  const quizCorrectCount = useMemo(
    () => Object.values(progress.quizResults).filter((item) => item.correct).length,
    [progress.quizResults]
  );

  const visitRate = Math.round((progress.visitedUnitIds.length / units.length) * 100);
  const quizCorrectRate = Math.round((quizCorrectCount / units.length) * 100);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "goo-python-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const parsed = JSON.parse(text) as LearningProgressState;
      saveProgress(parsed);
      setProgress(loadProgress());
    } catch {
      alert("진도 파일 형식이 올바르지 않습니다.");
    }
    event.target.value = "";
  };

  const handleReset = () => {
    clearProgress();
    setProgress(loadProgress());
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">내 학습 현황</h1>
        <p className="text-slate-600">
          왼쪽 사이드바의 체크 표시는 <strong className="text-slate-800">차시별 마무리 퀴즈 정답</strong> 기준입니다. 방문
          기록과 퀴즈 결과를 함께 확인할 수 있습니다.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            방문 차시: <span className="font-semibold text-primary-700">{progress.visitedUnitIds.length}</span> /{" "}
            {units.length}
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            퀴즈 응시: <span className="font-semibold text-primary-700">{quizSolvedCount}</span> / {units.length}
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            퀴즈 정답:{" "}
            <span className="font-semibold text-accent-600">
              {quizCorrectCount}
              {quizSolvedCount > 0 ? ` / ${quizSolvedCount}` : ""}
            </span>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-800">차시 방문률</p>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${visitRate}%` }} />
          </div>
          <p className="text-xs text-slate-500">{visitRate}% (학습하기 페이지 방문 기준)</p>
        </div>

        <div className="space-y-3 rounded-lg border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-800">퀴즈 정답률 (사이드바 진행률과 동일)</p>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-accent-500 transition-all" style={{ width: `${quizCorrectRate}%` }} />
          </div>
          <p className="text-xs text-slate-500">
            {quizCorrectCount}/{units.length}차시 정답 처리됨
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold text-slate-800">차시별 요약</h2>
          <ul className="space-y-2">
            {units.map((unit) => {
              const visited = progress.visitedUnitIds.includes(unit.id);
              const quiz = progress.quizResults[unit.id];
              const ok = quiz?.correct === true;
              return (
                <li key={unit.id} className="flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                      ok ? "border-accent-500 bg-accent-500 text-white" : "border-slate-300 text-transparent"
                    }`}
                  >
                    {ok ? <Icon name="check" size={12} className="text-white" /> : ""}
                  </span>
                  <div>
                    <p className="font-medium text-slate-800">{unit.label}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      방문: {visited ? "예" : "아니오"} · 퀴즈:{" "}
                      {!quiz ? "미응시" : quiz.correct ? "정답" : "오답(저장됨)"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            진도 파일로 저장
          </button>
          <button
            type="button"
            onClick={handleImportClick}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            진도 가져오기
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            기록 초기화
          </button>
          <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImportChange} />
        </div>
      </section>
    </div>
  );
}
