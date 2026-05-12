"use client";

import { useState } from "react";
import InlineMarkdown from "@/components/learn/InlineMarkdown";

interface ExerciseBoxProps {
  title: string;
  prompt: string;
  interpretation: string;
  hint: string;
  answer: string;
  /** practice: 변형 실습, challenge: 도전 문제 */
  variant?: "practice" | "challenge";
}

export default function ExerciseBox({
  title,
  prompt,
  interpretation,
  hint,
  answer,
  variant = "practice",
}: ExerciseBoxProps) {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const isChallenge = variant === "challenge";
  const shell = isChallenge
    ? "rounded-lg border border-amber-300 bg-amber-50/90 p-4"
    : "rounded-lg border border-primary-200 bg-primary-50 p-4";
  const titleCls = isChallenge ? "text-base font-semibold text-amber-950" : "text-base font-semibold text-primary-900";
  const hintBtn = isChallenge
    ? "rounded-md border border-amber-400 bg-white px-3 py-1.5 text-sm font-medium text-amber-950 hover:bg-amber-100"
    : "rounded-md border border-primary-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-800 hover:bg-primary-100";
  const readBox = isChallenge
    ? "rounded-lg border border-amber-200/90 bg-amber-100/60 px-3 py-3 text-sm text-zinc-800"
    : "rounded-lg border border-emerald-200/90 bg-emerald-50/80 px-3 py-3 text-sm text-zinc-800";
  const readTitle = isChallenge ? "mb-2 font-semibold text-amber-950" : "mb-2 font-semibold text-emerald-900";

  return (
    <section className={`space-y-3 ${shell}`}>
      <h3 className={titleCls}>{title}</h3>
      <InlineMarkdown text={prompt} className="text-sm text-zinc-800" />
      <div className={readBox}>
        <p className={readTitle}>실행 후, 출력 이렇게 읽어 보세요</p>
        <InlineMarkdown text={interpretation} className="text-sm leading-relaxed text-zinc-800" />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowHint((prev) => !prev)}
          className={hintBtn}
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
          <p className="mb-2 text-xs text-zinc-500">
            <strong className="font-medium text-zinc-700">+ 코드</strong>를 눌러 새 셀을 추가한 뒤, 아래 코드를 입력해 보세요. 위에서는 교안·데이터 준비 셀을 이미 실행한 상태라고 가정합니다.
          </p>
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-md bg-zinc-50 p-3 font-mono text-xs leading-relaxed text-zinc-800">
            {answer}
          </pre>
        </div>
      )}
    </section>
  );
}
