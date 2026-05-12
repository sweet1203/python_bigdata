"use client";

/**
 * 브라우저는 보안상 스크립트로 Ctrl+F5(캐시 무시 새로고침)와 동일한 동작을 대신 실행할 수 없어, 단축키 안내만 표시합니다.
 */
export default function RefreshHintBar() {
  return (
    <div className="shrink-0 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600">
      <p className="leading-relaxed">
        수정 반영이 안 보이면{" "}
        <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5 font-mono text-[11px] text-slate-800">
          Ctrl
        </kbd>
        +
        <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5 font-mono text-[11px] text-slate-800">
          F5
        </kbd>
        (Windows) 또는{" "}
        <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5 font-mono text-[11px] text-slate-800">
          Cmd
        </kbd>
        +
        <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5 font-mono text-[11px] text-slate-800">
          Shift
        </kbd>
        +
        <kbd className="rounded border border-slate-300 bg-white px-1 py-0.5 font-mono text-[11px] text-slate-800">
          R
        </kbd>
        (Mac)으로 <strong className="font-semibold text-slate-800">강력 새로고침</strong>을 해 보세요.
      </p>
    </div>
  );
}
