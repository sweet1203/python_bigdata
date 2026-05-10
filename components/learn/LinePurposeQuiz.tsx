"use client";

import { useEffect, useMemo, useState } from "react";
import { loadProgress, saveQuizResult } from "@/lib/progressStorage";

interface Option {
  id: string;
  label: string;
}

interface LinePurposeQuizProps {
  unitId: string;
  question: string;
  options: Option[];
  answerId: string;
}

export default function LinePurposeQuiz({ unitId, question, options, answerId }: LinePurposeQuizProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadProgress().quizResults[unitId]?.selectedId ?? null;
    setSelectedId(saved);
  }, [unitId]);

  useEffect(() => {
    if (!selectedId) return;
    saveQuizResult(unitId, selectedId, answerId);
  }, [selectedId, unitId, answerId]);

  const resultText = useMemo(() => {
    if (!selectedId) return "";
    return selectedId === answerId
      ? "정답입니다! 결과가 저장되었습니다."
      : "아직 아니에요. 다시 골라 보세요. (선택한 답은 저장됩니다.)";
  }, [selectedId, answerId]);

  return (
    <section className="space-y-3 rounded-lg border border-primary-200 bg-primary-50 p-4">
      <h3 className="text-base font-semibold text-primary-900">차시 이해도 퀴즈</h3>
      <p className="text-sm text-slate-800">{question}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelectedId(option.id)}
            className={`block w-full rounded-md border px-3 py-2 text-left text-sm ${
              selectedId === option.id
                ? "border-primary-400 bg-white text-primary-900"
                : "border-primary-200 bg-white text-slate-700 hover:bg-primary-100"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selectedId && <p className="rounded-md bg-white px-3 py-2 text-sm text-slate-700">{resultText}</p>}
    </section>
  );
}
