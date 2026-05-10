import { units } from "@/lib/units";

export const COURSE_MODULE = {
  id: "python-basics",
  title: "파이썬으로 데이터 읽기·다루기·시각화",
  description: "Google Colab에서 pandas로 표 데이터를 다루고, 정리하고, 시각화하는 흐름을 차시별로 익힙니다.",
  icon: "chart" as const,
  color: "primary" as const,
};

/** 차시당 예상 분(대략) — 홈 통계용 */
export const UNIT_DURATION_MIN: Record<string, number> = {
  "1": 20,
  "2": 25,
  "3": 20,
  "4": 25,
  "5": 25,
  "6": 20,
  "7": 25,
  "8": 35,
};

export const totalLessons = units.length;

export function getTotalDurationMinutes(): number {
  return units.reduce((sum, u) => sum + (UNIT_DURATION_MIN[u.id] ?? 20), 0);
}
