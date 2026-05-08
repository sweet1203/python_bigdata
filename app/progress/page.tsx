"use client";

import { useMemo, useRef, useState } from "react";
import { loadProgress, clearProgress, saveProgress, type LearningProgressState } from "@/lib/progressStorage";
import { units } from "@/lib/units";

export default function ProgressPage() {
  const [progress, setProgress] = useState<LearningProgressState>(() => loadProgress());
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const quizSolvedCount = useMemo(() => Object.keys(progress.quizResults).length, [progress.quizResults]);
  const quizCorrectCount = useMemo(
    () => Object.values(progress.quizResults).filter((item) => item.correct).length,
    [progress.quizResults]
  );

  const progressRate = Math.round((progress.visitedUnitIds.length / units.length) * 100);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ac-data-progress.json";
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
    <section className="w-full space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-bold">내 학습 현황</h1>
      <p className="text-zinc-700">학습 진도, 실습 완료 여부, 퀴즈 결과를 한 번에 확인합니다.</p>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-700">
          방문 차시: <span className="font-semibold">{progress.visitedUnitIds.length}</span> / {units.length}
        </div>
        <div className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-700">
          퀴즈 완료: <span className="font-semibold">{quizSolvedCount}</span> / {units.length}
        </div>
        <div className="rounded-md bg-zinc-100 px-4 py-3 text-sm text-zinc-700">
          퀴즈 정답:{" "}
          <span className="font-semibold">
            {quizCorrectCount}
            {quizSolvedCount > 0 ? ` / ${quizSolvedCount}` : ""}
          </span>
        </div>
      </div>

      <div className="space-y-2 rounded-md border border-zinc-200 p-4">
        <p className="text-sm font-medium text-zinc-800">전체 진도율</p>
        <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200">
          <div className="h-full bg-emerald-500" style={{ width: `${progressRate}%` }} />
        </div>
        <p className="text-xs text-zinc-600">{progressRate}% 완료</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-base font-semibold">차시별 방문 현황</h2>
        <ul className="space-y-2">
          {units.map((unit) => {
            const visited = progress.visitedUnitIds.includes(unit.id);
            return (
              <li key={unit.id} className="rounded-md border border-zinc-200 px-4 py-2 text-sm">
                <span className={visited ? "text-emerald-700" : "text-zinc-500"}>
                  {visited ? "완료" : "미완료"}
                </span>{" "}
                - {unit.label}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleExport}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          진도 내보내기
        </button>
        <button
          onClick={handleImportClick}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          진도 가져오기
        </button>
        <button
          onClick={handleReset}
          className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
        >
          기록 초기화
        </button>
        <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImportChange} />
      </div>
    </section>
  );
}
