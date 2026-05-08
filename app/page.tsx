import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full space-y-6 rounded-xl border border-zinc-200 bg-white p-8">
      <p className="text-sm font-medium text-emerald-700">중등 파이썬 데이터 분석 수업 코스웨어</p>
      <h1 className="text-3xl font-bold leading-tight">차시형 빅데이터-파이썬 실습 코스웨어</h1>
      <p className="max-w-2xl text-zinc-700">
        차시별 마크다운 교안과 실습 예제를 바탕으로 개념 이해부터 데이터 처리, 시각화, EDA까지 단계적으로 학습할 수 있습니다.
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
