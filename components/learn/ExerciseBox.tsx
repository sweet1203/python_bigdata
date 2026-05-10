"use client";

import { useState } from "react";
import InlineMarkdown from "@/components/learn/InlineMarkdown";

interface ExerciseBoxProps {
  title: string;
  prompt: string;
  hint: string;
  answer: string;
}

export default function ExerciseBox({ title, prompt, hint, answer }: ExerciseBoxProps) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <section className="space-y-3 rounded-lg border border-primary-200 bg-primary-50 p-4">
      <h3 className="text-base font-semibold text-primary-900">{title}</h3>
      <InlineMarkdown text={prompt} className="text-sm text-zinc-800" />
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
      {showAnswer && <p className="rounded-md bg-white px-3 py-2 text-sm text-zinc-700">정답 예시: {answer}</p>}
    </section>
  );
}
