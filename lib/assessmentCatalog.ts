/** 수행평가 안내 (사이드바 메뉴 없음, /assessment 내부 링크 네비게이션) */

export const assessmentPages = [
  {
    slug: "overview",
    step: 1,
    title: "평가 개요",
    description: "2차 포트폴리오 평가 안내, 일정, 구성",
    path: "/assessment/overview",
  },
  {
    slug: "datasets",
    step: 2,
    title: "데이터셋 선택",
    description: "seaborn load_dataset 6종, penguins 제외",
    path: "/assessment/datasets",
  },
  {
    slug: "rubric",
    step: 3,
    title: "성취기준·채점표",
    description: "12빅분03-03~05, 40·30·30 루브릭",
    path: "/assessment/rubric",
  },
  {
    slug: "colab-outline",
    step: 4,
    title: "Colab 노트북 구성",
    description: "셀별 작성 가이드 (load_dataset)",
    path: "/assessment/colab-outline",
  },
  {
    slug: "checklist",
    step: 5,
    title: "제출 전 점검",
    description: "자기점검 체크리스트",
    path: "/assessment/checklist",
  },
  {
    slug: "submit",
    step: 6,
    title: "제출 안내",
    description: "Classroom·파일·서술 제출",
    path: "/assessment/submit",
  },
] as const;

export type AssessmentSlug = (typeof assessmentPages)[number]["slug"];

export const assessmentPlanPage = {
  slug: "plan",
  title: "구현·운영 계획",
  description: "교사·개발용 (학생 필수 아님)",
  path: "/assessment/plan",
} as const;

export const allAssessmentSlugs = [
  ...assessmentPages.map((p) => p.slug),
  assessmentPlanPage.slug,
] as const;

export type AllAssessmentSlug = (typeof allAssessmentSlugs)[number];

export function getAssessmentMeta(slug: string) {
  if (slug === assessmentPlanPage.slug) return assessmentPlanPage;
  return assessmentPages.find((p) => p.slug === slug) ?? null;
}

export function getAssessmentStepNeighbors(slug: AssessmentSlug) {
  const idx = assessmentPages.findIndex((p) => p.slug === slug);
  if (idx < 0) return { prev: null, next: null };
  return {
    prev: idx > 0 ? assessmentPages[idx - 1] : null,
    next: idx < assessmentPages.length - 1 ? assessmentPages[idx + 1] : null,
  };
}
