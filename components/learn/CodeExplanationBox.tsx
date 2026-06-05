"use client";

import { useState } from "react";

export interface CodeExplanationBlock {
  label: string;
  summary: string;
  code: string;
}

interface CodeExplanationBoxProps {
  title: string;
  intro: string;
  blocks: CodeExplanationBlock[];
}

function CommentedCode({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
      {code.split("\n").map((line, i) => {
        const trimmed = line.trimStart();
        const isComment = trimmed.startsWith("#");
        return (
          <div
            key={i}
            className={isComment ? "text-emerald-400/95" : "text-zinc-100"}
          >
            {line || "\u00a0"}
          </div>
        );
      })}
    </pre>
  );
}

function CopyableBlock({ label, summary, code }: CodeExplanationBlock) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-700 bg-zinc-800/80 px-4 py-2.5">
        <div>
          <p className="text-sm font-semibold text-zinc-100">{label}</p>
          <p className="text-xs text-zinc-400">{summary}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded px-2 py-0.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
        >
          {copied ? "✓ 복사됨" : "복사"}
        </button>
      </div>
      <CommentedCode code={code} />
    </div>
  );
}

export default function CodeExplanationBox({ title, intro, blocks }: CodeExplanationBoxProps) {
  return (
    <section className="space-y-4 rounded-lg border border-violet-200 bg-violet-50/80 p-4">
      <div>
        <h3 className="text-base font-semibold text-violet-950">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-violet-900/90">{intro}</p>
      </div>
      <div className="space-y-4">
        {blocks.map((block) => (
          <CopyableBlock key={block.label} {...block} />
        ))}
      </div>
      <p className="text-xs text-violet-800/80">
        초록색 줄은 주석입니다. Colab에서 그대로 붙여 넣어 실행해 보면서, 각 줄이 무엇을 하는지
        따라 읽어 보세요.
      </p>
    </section>
  );
}
