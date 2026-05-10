"use client";

import { useState } from "react";
import InlineMarkdown from "@/components/learn/InlineMarkdown";

interface ExerciseBoxProps {
  title: string;
  prompt: string;
  interpretation: string;
  hint: string;
  answer: string;
}

export default function ExerciseBox({ title, prompt, interpretation, hint, answer }: ExerciseBoxProps) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <section className="space-y-3 rounded-lg border border-primary-200 bg-primary-50 p-4">
      <h3 className="text-base font-semibold text-primary-900">{title}</h3>
      <InlineMarkdown text={prompt} className="text-sm text-zinc-800" />
      <div className="rounded-lg border border-emerald-200/90 bg-emerald-50/80 px-3 py-3 text-sm text-zinc-800">
        <p className="mb-2 font-semibold text-emerald-900">실행 후, 출력 이렇게 읽어 보세요</p>
        <InlineMarkdown text={interpretation} className="text-sm leading-relaxed text-zinc-800" />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowHint((prev) => !prev)}
          className="rounded-md border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-800 hover:bg-primary-100"
        >
          {showHint ? "힌트 숨기기" : "힌트 보기"}
        </button>
        <button
          onClick={() => setShowAnswer((prev) => !prev)}
          className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          {showAnswer ? "정답 숨기기" : "정답 보기"}
        </button>
      </div>
      {showHint && (
        <p className="rounded-md bg-white px-3 py-2 text-sm text-zinc-700">
          <span className="font-medium text-zinc-800">힌트: </span>
          <InlineMarkdown text={hint} className="text-inherit" inline />
        </p>
      )}
      {showAnswer && (
        <div className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
          <p className="mb-2 font-medium text-zinc-800">정답 예시 코드</p>
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-md bg-zinc-50 p-3 font-mono text-xs leading-relaxed text-zinc-800">
            {answer}
          </pre>
        </div>
      )}
    </section>
  );
}
