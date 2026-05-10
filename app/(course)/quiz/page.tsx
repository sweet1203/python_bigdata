"use client";

import { useMemo, useState } from "react";
import InlineMarkdown from "@/components/learn/InlineMarkdown";
import { unitContents } from "@/lib/unitContent";
import { units } from "@/lib/units";
import { saveQuizResult } from "@/lib/progressStorage";

export default function QuizPage() {
  const [selectedUnitId, setSelectedUnitId] = useState("1");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const content = useMemo(() => unitContents[selectedUnitId] ?? unitContents["1"], [selectedUnitId]);

  const handleSubmit = () => {
    if (!selectedOptionId) {
      setMessage("먼저 답안을 선택해 주세요.");
      return;
    }
    const next = saveQuizResult(selectedUnitId, selectedOptionId, content.quiz.answerId);
    const result = next.quizResults[selectedUnitId];
    setMessage(result.correct ? "정답입니다! 결과가 저장되었습니다." : "오답입니다. 결과는 저장되었고 다시 시도할 수 있습니다.");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">퀴즈</h1>
        <p className="text-slate-600">차시를 선택해 이해도 점검 퀴즈를 풀고 결과를 저장하세요. 정답 시 왼쪽 목차에 완료 표시가 나타납니다.</p>

        <div className="space-y-2">
          <label htmlFor="unit-select" className="text-sm font-medium text-slate-800">
            차시 선택
          </label>
          <select
            id="unit-select"
            value={selectedUnitId}
            onChange={(e) => {
              setSelectedUnitId(e.target.value);
              setSelectedOptionId(null);
              setMessage("");
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <InlineMarkdown text={content.quiz.question} className="text-sm font-semibold text-slate-900" />
          <div className="space-y-2">
            {content.quiz.options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200"
              >
                <input
                  type="radio"
                  name="quiz-option"
                  value={option.id}
                  checked={selectedOptionId === option.id}
                  onChange={() => setSelectedOptionId(option.id)}
                />
                <InlineMarkdown text={option.label} className="text-sm text-slate-700" inline />
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            결과 저장하기
          </button>
          {message && <p className="rounded-lg bg-white px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">{message}</p>}
        </div>
      </section>
    </div>
  );
}
