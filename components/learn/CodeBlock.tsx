"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "python" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 text-sm">
      <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-2">
        <span className="font-mono text-xs text-zinc-400">{language}</span>
        <button
          onClick={handleCopy}
          className="rounded px-2 py-0.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
        >
          {copied ? "✓ 복사됨" : "복사"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono leading-relaxed text-zinc-100">{code}</pre>
    </div>
  );
}
