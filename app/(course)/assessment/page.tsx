import AssessmentShell from "@/components/assessment/AssessmentShell";
import LessonMarkdown from "@/components/learn/LessonMarkdown";
import { assessmentPages } from "@/lib/assessmentCatalog";
import { loadAssessmentMarkdown, parseMainHeading, stripLeadingH1 } from "@/lib/loadAssessment";

export default async function AssessmentIndexPage() {
  let body = "안내 내용을 불러올 수 없습니다.";
  let title = "2차 수행평가 안내";

  try {
    const raw = await loadAssessmentMarkdown("overview");
    title = parseMainHeading(raw) ?? title;
    body = stripLeadingH1(raw);
  } catch {
    /* keep defaults */
  }

  return (
    <AssessmentShell
      currentSlug="overview"
      badge="3학년 빅데이터분석 · 2차 수행평가"
      title={title}
      subtitle="왼쪽 메뉴에서 단계별 안내를 이어서 읽고, Classroom 사본 노트북에 작성한 뒤 제출하세요."
    >
      <LessonMarkdown markdown={body} />
    </AssessmentShell>
  );
}
