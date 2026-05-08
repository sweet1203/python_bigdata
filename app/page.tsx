import Link from "next/link";
import { units } from "@/lib/units";

const unitSummaries: Record<string, string> = {
  "1": "데이터와 정보의 차이를 이해하고 pandas·코랩 실습 흐름을 시작합니다.",
  "2": "Series와 DataFrame 구조를 익히고 CSV를 읽어 기본 정보를 확인합니다.",
  "3": "정렬과 기초 통계로 데이터의 분포와 패턴을 빠르게 파악합니다.",
  "4": "loc·iloc 인덱싱으로 원하는 행/열을 정확하게 추출합니다.",
  "5": "조건 필터링과 groupby 집계로 질문에 맞는 데이터를 분석합니다.",
  "6": "결측치 확인·삭제·대체를 통해 분석 가능한 데이터로 정제합니다.",
  "7": "막대/선/산점도/히스토그램 등 시각화를 목적에 맞게 사용합니다.",
  "8": "EDA 5단계로 실제 데이터 분석 미니 프로젝트를 완성합니다.",
};

export default function Home() {
  return (
    <div className="w-full space-y-8">
      <section className="rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-emerald-50/40 p-8 shadow-sm lg:p-10">
        <p className="text-sm font-semibold text-emerald-700">모두를 위한 실습 중심 데이터 수업</p>
        <h1 className="mt-2 text-balance text-4xl font-bold leading-tight text-zinc-900">
          GOO's 데이터 분석 with 파이썬
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-700">
          데이터를 읽고, 질문하고, 분석하고, 검증하는 힘을 기르는 실습형 수업 사이트입니다. 교안을 읽고 바로 실행하며 자연스럽게 익힐 수 있습니다.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
          <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-zinc-200">8개 차시</span>
          <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-zinc-200">차시별 교안 + 실습</span>
          <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-zinc-200">퀴즈 + 진도 관리</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/learn"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            1차시부터 시작하기
          </Link>
          <Link
            href="/data"
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
          >
            실습 데이터 받기
          </Link>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-zinc-900">차시별 학습 로드맵</h2>
        <p className="text-sm text-zinc-600">수업 차시에 맞춰 필요한 개념과 실습을 한 화면에서 확인할 수 있습니다.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {units.map((unit) => (
            <Link
              key={unit.id}
              href={`/learn?unit=${unit.id}`}
              className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <p className="text-xs font-semibold text-emerald-700">차시 {unit.id}</p>
              <h3 className="mt-1 font-semibold text-zinc-900">{unit.label.replace(`${unit.id}차시. `, "")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{unitSummaries[unit.id]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h3 className="font-semibold text-zinc-900">실습 중심</h3>
          <p className="mt-2 text-sm text-zinc-600">교안을 읽고 바로 코드 셀을 실행하며 개념을 바로 확인합니다.</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h3 className="font-semibold text-zinc-900">실제 수업 흐름</h3>
          <p className="mt-2 text-sm text-zinc-600">수업 차시 순서 그대로 구성되어 교실 운영과 학습 동선이 일치합니다.</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h3 className="font-semibold text-zinc-900">학습 추적</h3>
          <p className="mt-2 text-sm text-zinc-600">퀴즈와 진도 기록으로 학생이 어디까지 왔는지 쉽게 점검할 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
