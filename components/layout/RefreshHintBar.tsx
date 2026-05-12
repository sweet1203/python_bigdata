"use client";

/**
 * 브라우저는 보안상 스크립트로 Ctrl+F5(캐시 무시 새로고침)와 완전히 같은 동작을 할 수 없습니다.
 * 단축키 안내 + 일반 새로고침 버튼을 함께 둡니다.
 */
export default function RefreshHintBar() {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600">
      <p className="min-w-0 leading-relaxed">
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
      <button
        type="button"
        title="일반 새로고침입니다. 브라우저 캐시까지 비우려면 왼쪽 안내의 Ctrl+F5 또는 Cmd+Shift+R을 사용하세요."
        onClick={() => window.location.reload()}
        className="shrink-0 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-800 hover:bg-slate-100"
      >
        페이지 새로고침
      </button>
    </div>
  );
}
