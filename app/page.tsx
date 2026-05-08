import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full space-y-6 rounded-xl border border-zinc-200 bg-white p-8">
      <p className="text-sm font-medium text-emerald-700">코랩 실습 중심 수업 플랫폼</p>
      <h1 className="text-3xl font-bold leading-tight">동물의 숲 데이터로 배우는 빅데이터 분석</h1>
      <p className="max-w-2xl text-zinc-700">
        코드를 복사해 코랩에서 실행하고, 코드 구조를 쉽게 해석하며, 수행평가까지 연결되는 학습을 제공합니다.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/learn"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          학습 시작하기
        </Link>
        <Link
          href="/progress"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
        >
          내 학습 현황 보기
        </Link>
      </div>
    </div>
  );
}
