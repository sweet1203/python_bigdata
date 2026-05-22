/** 수행평가 안내 페이지 (URL 직접 접속, 사이드바 미연결) */
export const assessmentPages = [
  {
    slug: "overview",
    title: "평가 개요",
    description: "2차 포트폴리오 평가 안내, 일정, 구성",
    path: "/assessment/overview",
  },
  {
    slug: "rubric",
    title: "성취기준·채점표",
    description: "12빅분03-03~05, 40·30·30 루브릭",
    path: "/assessment/rubric",
  },
  {
    slug: "submit",
    title: "제출 안내",
    description: "파일·서술 제출물, 파일명, 유의 사항",
    path: "/assessment/submit",
  },
  {
    slug: "checklist",
    title: "제출 전 점검",
    description: "자기점검 체크리스트",
    path: "/assessment/checklist",
  },
  {
    slug: "datasets",
    title: "데이터셋 선택",
    description: "seaborn load_dataset 6종, penguins 제외",
    path: "/assessment/datasets",
  },
  {
    slug: "colab-outline",
    title: "Colab 노트북 구성",
    description: "셀별 작성 가이드 (load_dataset)",
    path: "/assessment/colab-outline",
  },
] as const;

export type AssessmentSlug = (typeof assessmentPages)[number]["slug"];

export const assessmentPlanPage = {
  slug: "plan",
  title: "구현·운영 계획",
  description: "교사·개발용 일정·단계 (학생 필수 아님)",
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
