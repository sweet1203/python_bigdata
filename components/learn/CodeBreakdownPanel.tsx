"use client";

import { useState } from "react";

interface CodeBreakdownPanelProps {
  input: string;
  process: string;
  output: string;
}

export default function CodeBreakdownPanel({ input, process, output }: CodeBreakdownPanelProps) {
  const [selected, setSelected] = useState<"input" | "process" | "output">("input");

  const contentMap = {
    input,
    process,
    output,
  };

  return (
    <section className="space-y-3 rounded-lg border border-sky-200 bg-sky-50 p-4">
      <h3 className="text-base font-semibold text-sky-900">코드 구조 해체 패널</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelected("input")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            selected === "input" ? "bg-sky-600 text-white" : "bg-white text-sky-800 hover:bg-sky-100"
          }`}
        >
          입력
        </button>
        <button
          onClick={() => setSelected("process")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            selected === "process" ? "bg-sky-600 text-white" : "bg-white text-sky-800 hover:bg-sky-100"
          }`}
        >
          처리
        </button>
        <button
          onClick={() => setSelected("output")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${
            selected === "output" ? "bg-sky-600 text-white" : "bg-white text-sky-800 hover:bg-sky-100"
          }`}
        >
          출력
        </button>
      </div>
      <p className="rounded-md bg-white px-3 py-2 text-sm text-zinc-700">{contentMap[selected]}</p>
    </section>
  );
}
