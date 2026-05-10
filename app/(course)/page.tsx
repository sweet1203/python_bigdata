"use client";

import Link from "next/link";
import { useState } from "react";
import ProgressBadge from "@/components/common/ProgressBadge";
import Icon from "@/components/common/Icon";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { COURSE_MODULE, getTotalDurationMinutes, totalLessons, UNIT_DURATION_MIN } from "@/lib/courseConstants";
import { units } from "@/lib/units";

const DATA_FILES = [
  { label: "MBTI 샘플 (선택)", file: "MBTI.csv", path: "/data/MBTI.csv" },
  { label: "학생 CSV (선택)", file: "students.csv", path: "/data/students.csv" },
  { label: "결측 샘플 (선택)", file: "students_with_missing.csv", path: "/data/students_with_missing.csv" },
] as const;

const unitSummaries: Record<string, string> = {
  "1": "데이터와 정보의 차이를 이해하고 pandas·코랩 실습 흐름을 시작합니다.",
  "2": "Series와 DataFrame 구조를 익히고 CSV를 읽어 기본 정보를 확인합니다.",
  "3": "정렬과 기초 통계로 데이터의 분포와 패턴을 빠르게 파악합니다.",
  "4": "loc·iloc 인덱싱으로 원하는 행·열을 정확하게 추출합니다.",
  "5": "조건 필터링과 groupby 집계로 질문에 맞는 데이터를 분석합니다.",
  "6": "결측치 확인·삭제·대체를 통해 분석 가능한 데이터로 정제합니다.",
  "7": "막대·선·산점도·히스토그램 등 시각화를 목적에 맞게 사용합니다.",
  "8": "EDA 5단계로 실제 데이터 분석 미니 프로젝트를 완성합니다.",
};

const colorMap = {
  primary: {
    card: "border-primary-200 hover:border-primary-400 hover:shadow-md",
    badge: "bg-primary-100 text-primary-700",
    num: "bg-primary-500",
    iconColor: "text-primary-500",
  },
  accent: {
    card: "border-accent-200 hover:border-accent-400 hover:shadow-md",
    badge: "bg-accent-100 text-accent-700",
    num: "bg-accent-500",
    iconColor: "text-accent-500",
  },
  warm: {
    card: "border-warm-200 hover:border-warm-400 hover:shadow-md",
    badge: "bg-warm-100 text-warm-700",
    num: "bg-warm-500",
    iconColor: "text-warm-600",
  },
} as const;

type ColorKey = keyof typeof colorMap;

export default function HomePage() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const { getCompletedCount, getTotalProgress, isLessonCompleted, isUnitVisited, getModuleProgress } =
    useLearningProgress();

  const completedCount = getCompletedCount();
  const totalProgress = getTotalProgress();
  const moduleProgress = getModuleProgress();
  const approxHours = Math.round(getTotalDurationMinutes() / 60);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-600">
          seaborn 내장 데이터로 CSV 업로드 없이 실습하는 파이썬 데이터 분석 수업
        </div>
        <h1 className="mb-4 text-4xl font-bold text-slate-800">GOO&apos;s 데이터 분석 with 파이썬</h1>
        <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          데이터를 읽고, 질문하고, 분석하고, 검증하는 힘을 키우세요.
          <br />
          <strong className="text-slate-700">Google Colab</strong>에서{" "}
          <code className="rounded bg-slate-100 px-1 text-base text-slate-800">sns.load_dataset</code>으로{" "}
          <strong className="text-slate-700">펭귄·mpg</strong> 데이터를 바로 불러와 실습합니다.
        </p>

        <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="inline-flex items-center gap-1">
              <Icon name="books" size={16} className="text-slate-400" />1개 코스
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="memo" size={16} className="text-slate-400" />
              {totalLessons}개 차시
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Icon name="timer" size={16} className="text-slate-400" />약 {approxHours}시간
            </span>
          </div>
          <Link
            href="/help"
            className="inline-flex items-center gap-1.5 rounded-lg border border-accent-200 bg-accent-50 px-3 py-1.5 font-medium text-accent-800 transition-colors hover:border-accent-300 hover:bg-accent-100"
          >
            <Icon name="memo" size={16} className="text-accent-600" />
            학습 안내
          </Link>
          <button
            type="button"
            onClick={() => setDownloadOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <Icon name="download" size={16} className="text-slate-400" />
            자료 다운받기
            <span className={`inline-block transition-transform ${downloadOpen ? "rotate-180" : ""}`}>▼</span>
          </button>
        </div>

        {downloadOpen && (
          <div className="mb-2 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            {DATA_FILES.map(({ label, file, path }) => (
              <a
                key={path}
                href={path}
                download={file}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
              >
                <Icon name="download" size={18} className="text-slate-400" />
                {label} ({file})
              </a>
            ))}
          </div>
        )}

        {completedCount > 0 && (
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-sm">
            <span className="text-sm text-slate-500">학습 진행</span>
            <div className="h-2.5 w-36 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-accent-500 transition-all duration-700"
                style={{ width: `${Math.round(totalProgress * 100)}%` }}
              />
            </div>
            <span className="text-sm font-bold text-accent-600">
              {completedCount}/{totalLessons}
            </span>
          </div>
        )}
      </div>

      <div className="mb-8 px-4">
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">학습 로드맵</p>
        <div className="flex items-center justify-center gap-1 overflow-x-auto py-2">
          {units.map((unit, i) => {
            const done = isLessonCompleted(unit.id);
            const started = isUnitVisited(unit.id) && !done;
            return (
              <div key={unit.id} className="flex shrink-0 items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-accent-500 text-white"
                      : started
                        ? "bg-primary-100 text-primary-600"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {done ? <Icon name="check" size={14} className="text-white" /> : i + 1}
                </div>
                {i < units.length - 1 && (
                  <div className={`h-0.5 w-8 ${done ? "bg-accent-400" : "bg-slate-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-2 text-center">
        <p className="text-sm font-semibold text-slate-600">{COURSE_MODULE.title}</p>
        <p className="mt-1 text-xs text-slate-500">{COURSE_MODULE.description}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {units.map((unit, i) => {
          const colorKey = (["primary", "accent", "warm"] as ColorKey[])[i % 3];
          const colors = colorMap[colorKey];
          const title = unit.label.replace(`${unit.id}차시. `, "");
          const progress = isLessonCompleted(unit.id) ? 1 : 0;

          return (
            <Link
              key={unit.id}
              href={`/learn?unit=${unit.id}`}
              className={`group block rounded-2xl border-2 bg-white p-5 transition-all hover:shadow-lg ${colors.card}`}
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${colors.num}`}
                >
                  {unit.id}
                </span>
                <Icon name="chart" size={24} className={colors.iconColor} />
              </div>
              <h3 className="mb-1 text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-primary-600">
                {title}
              </h3>
              <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-500">{unitSummaries[unit.id]}</p>
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
                  약 {UNIT_DURATION_MIN[unit.id] ?? 20}분 · Colab
                </span>
                <ProgressBadge progress={progress} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-14 grid gap-6 text-center sm:grid-cols-3">
        <div className="p-4">
          <div className="mb-2 flex justify-center">
            <Icon name="target" size={32} className="text-primary-500" />
          </div>
          <h4 className="mb-1 font-bold text-slate-700">실습 중심</h4>
          <p className="text-xs text-slate-500">
            교안의 코드를 Colab에서 그대로 실행하며 pandas 문법과 데이터 흐름을 익힙니다.
          </p>
        </div>
        <div className="p-4">
          <div className="mb-2 flex justify-center">
            <Icon name="chart" size={32} className="text-accent-500" />
          </div>
          <h4 className="mb-1 font-bold text-slate-700">실제 데이터</h4>
          <p className="text-xs text-slate-500">
            seaborn 예제 표본으로 결측·집계·시각화를 경험하고, 필요 시 데이터 메뉴의 CSV로 확장할 수 있습니다.
          </p>
        </div>
        <div className="p-4">
          <div className="mb-2 flex justify-center">
            <Icon name="brain" size={32} className="text-warm-600" />
          </div>
          <h4 className="mb-1 font-bold text-slate-700">사고력 중심</h4>
          <p className="text-xs text-slate-500">
            코드 실행 결과를 해석하고, 다음 분석 단계를 스스로 설계하는 연습을 합니다.
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
        <p>
          대성여자고등학교 정보 · GOO&apos;s 데이터 분석 with 파이썬 · 진도는 이 브라우저에만 저장됩니다.
        </p>
        <p className="mt-1">
          전체 코스 진행률: {Math.round(moduleProgress * 100)}% ({completedCount}/{totalLessons}차시 퀴즈 정답 처리됨)
        </p>
      </div>
    </div>
  );
}
