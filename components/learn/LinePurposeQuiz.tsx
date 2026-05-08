"use client";

import { useMemo, useState } from "react";

interface Option {
  id: string;
  label: string;
}

interface LinePurposeQuizProps {
  question: string;
  options: Option[];
  answerId: string;
}

export default function LinePurposeQuiz({ question, options, answerId }: LinePurposeQuizProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const resultText = useMemo(() => {
    if (!selectedId) return "";
    return selectedId === answerId
      ? "정답입니다! 데이터의 앞부분을 빠르게 확인하려는 목적입니다."
      : "아직 아니에요. 데이터 확인 목적에 가장 가까운 선택지를 다시 골라보세요.";
  }, [selectedId, answerId]);

  return (
    <section className="space-y-3 rounded-lg border border-violet-200 bg-violet-50 p-4">
      <h3 className="text-base font-semibold text-violet-900">이 줄은 왜 필요할까?</h3>
      <p className="text-sm text-zinc-800">{question}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedId(option.id)}
            className={`block w-full rounded-md border px-3 py-2 text-left text-sm ${
              selectedId === option.id
                ? "border-violet-400 bg-white text-violet-900"
                : "border-violet-200 bg-white text-zinc-700 hover:bg-violet-100"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selectedId && <p className="rounded-md bg-white px-3 py-2 text-sm text-zinc-700">{resultText}</p>}
    </section>
  );
}
