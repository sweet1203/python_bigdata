"use client";

import { useMemo, useState } from "react";
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
    <section className="w-full space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="text-2xl font-bold">퀴즈</h1>
      <p className="text-zinc-700">차시를 선택해 이해도 점검 퀴즈를 풀고 결과를 저장하세요.</p>

      <div className="space-y-2">
        <label htmlFor="unit-select" className="text-sm font-medium text-zinc-800">
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
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
        >
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-sm font-semibold text-zinc-900">{content.quiz.question}</p>
        <div className="space-y-2">
          {content.quiz.options.map((option) => (
            <label key={option.id} className="flex cursor-pointer items-center gap-2 rounded-md bg-white px-3 py-2 text-sm text-zinc-700">
              <input
                type="radio"
                name="quiz-option"
                value={option.id}
                checked={selectedOptionId === option.id}
                onChange={() => setSelectedOptionId(option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          결과 저장하기
        </button>
        {message && <p className="rounded-md bg-white px-3 py-2 text-sm text-zinc-700">{message}</p>}
      </div>
    </section>
  );
}
