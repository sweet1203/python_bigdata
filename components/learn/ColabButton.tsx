"use client";

const MAIN_COLAB = "https://colab.research.google.com/";

interface ColabButtonProps {
  href: string;
}

export default function ColabButton({ href }: ColabButtonProps) {
  const isPlaceholder = !href || href === MAIN_COLAB;

  if (isPlaceholder) {
    return (
      <span
        title="차시 전용 노트북 URL을 lib/unitContent.ts의 colabUrl에 입력하세요."
        className="inline-flex cursor-default items-center gap-1.5 rounded-md border border-dashed border-warm-400 bg-warm-50 px-4 py-2 text-sm font-semibold text-warm-800"
      >
        ⚠ 코랩 링크 미설정
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
    >
      코랩에서 열기
    </a>
  );
}
